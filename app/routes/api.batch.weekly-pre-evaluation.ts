import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import { users, weeklyPreEvaluations } from "~/db/schema";
import { eq, and, isNull, inArray } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";

// 週文字列を取得する関数（例: 2024-W27）
function getWeekString(date: Date): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, "0")}`;
}

// 前週を取得する関数
function getPreviousWeek(week: string): string {
  const [year, weekPart] = week.split("-");
  const weekNum = parseInt(weekPart.replace("W", ""));
  if (weekNum === 1) {
    // 年をまたぐ場合
    const prevYear = parseInt(year) - 1;
    return `${prevYear}-W52`;
  } else {
    return `${year}-W${(weekNum - 1).toString().padStart(2, "0")}`;
  }
}

// 評価タイプの表示名を取得
function getEvaluationTypeLabel(type: string): string {
  switch (type) {
    case "quality":
      return "成果物品質評価";
    case "quantity":
      return "成果量評価";
    case "satisfaction":
      return "依頼者評価";
    case "penalty":
      return "ペナルティ評価";
    case "bonus":
      return "ボーナス評価";
    default:
      return type;
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  // CRON_SECRET認証チェック
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!authHeader || !cronSecret || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== cronSecret) {
    throw new Response("Unauthorized", { status: 401 });
  }

  const url = new URL(request.url);
  const targetWeek = url.searchParams.get("week") || getWeekString(new Date());

  // ADMINユーザーのIDを取得
  const adminUser = await db.select().from(users).where(and(
    eq(users.role, "ADMIN"),
    isNull(users.retiredAt)
  )).limit(1);
  
  if (adminUser.length === 0) {
    throw new Response("Admin user not found", { status: 404 });
  }
  
  const adminUserId = adminUser[0].id;

  // 全ユーザー（ADMIN, REQUESTOR以外, 退職者除外）を取得
  const allUsers = await db.select().from(users).where(and(
    isNull(users.retiredAt),
    inArray(users.role, ["CORP", "ENGINEER", "DESIGNER", "OPERATOR"])
  ));

  // 評価タイプ（ペナルティ・ボーナスは除外）
  const evaluationTypes = ["quality", "quantity", "satisfaction"] as const;

  let createdCount = 0;
  for (const user of allUsers) {
    for (const evaluationType of evaluationTypes) {
      // 評価者IDと役割を決定
      let evaluatorId: string;
      let evaluatorRole: "admin" | "capability_supervisor" | "project_supervisor";
      
      switch (evaluationType) {
        case "quality":
        case "quantity":
          // Capabilityライン上司（capabilityManagerId）
          evaluatorId = user.capabilityManagerId || adminUserId;
          evaluatorRole = user.capabilityManagerId ? "capability_supervisor" : "admin";
          break;
        case "satisfaction":
          // Projectライン上司（projectManagerId）
          evaluatorId = user.projectManagerId || adminUserId;
          evaluatorRole = user.projectManagerId ? "project_supervisor" : "admin";
          break;
        default:
          evaluatorId = adminUserId;
          evaluatorRole = "admin";
      }
      
      // 既存チェック（evaluatorIdも含めてチェック）
      const exists = await db.select().from(weeklyPreEvaluations).where(and(
        eq(weeklyPreEvaluations.evaluatorId, evaluatorId),
        eq(weeklyPreEvaluations.evaluateeId, user.id),
        eq(weeklyPreEvaluations.week, targetWeek),
        eq(weeklyPreEvaluations.evaluationType, evaluationType)
      ));
      if (exists.length > 0) continue;
      
      // 作成
      await db.insert(weeklyPreEvaluations).values({
        id: createId(),
        evaluatorId: evaluatorId,
        evaluateeId: user.id,
        week: targetWeek,
        evaluationType,
        evaluatorRole: evaluatorRole,
        status: "pending",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1週間後
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      createdCount++;
    }
  }

  // 前週の期限切れ評価からペナルティ評価を自動生成
  const previousWeek = getPreviousWeek(targetWeek);
  const overdueEvaluations = await db
    .select({
      id: weeklyPreEvaluations.id,
      evaluatorId: weeklyPreEvaluations.evaluatorId,
      evaluateeId: weeklyPreEvaluations.evaluateeId,
      week: weeklyPreEvaluations.week,
      evaluationType: weeklyPreEvaluations.evaluationType,
      evaluatorRole: weeklyPreEvaluations.evaluatorRole,
    })
    .from(weeklyPreEvaluations)
    .where(
      and(
        eq(weeklyPreEvaluations.week, previousWeek),
        eq(weeklyPreEvaluations.status, "overdue")
      )
    );

  let penaltyCount = 0;
  for (const overdueEval of overdueEvaluations) {
    // 被評価者へのペナルティ評価
    const evaluateePenaltyExists = await db.select().from(weeklyPreEvaluations).where(and(
      eq(weeklyPreEvaluations.evaluatorId, adminUserId),
      eq(weeklyPreEvaluations.evaluateeId, overdueEval.evaluateeId),
      eq(weeklyPreEvaluations.week, targetWeek),
      eq(weeklyPreEvaluations.evaluationType, "penalty")
    ));
    
    if (evaluateePenaltyExists.length === 0) {
      await db.insert(weeklyPreEvaluations).values({
        id: createId(),
        evaluatorId: adminUserId,
        evaluateeId: overdueEval.evaluateeId,
        week: targetWeek,
        evaluationType: "penalty",
        evaluatorRole: "admin",
        status: "completed", // 確定ステータス
        penaltyPoints: -50, // デフォルトペナルティ
        penaltyRate: 0.1, // 10%ペナルティ
        penaltyReason: `前週(${previousWeek})の${getEvaluationTypeLabel(overdueEval.evaluationType)}が期限切れのため、自動ペナルティを適用`,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        completedAt: new Date().toISOString(), // 即座に完了
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      penaltyCount++;
    }

    // 評価者へのペナルティ評価（評価者と被評価者が異なる場合のみ）
    if (overdueEval.evaluatorId !== overdueEval.evaluateeId) {
      const evaluatorPenaltyExists = await db.select().from(weeklyPreEvaluations).where(and(
        eq(weeklyPreEvaluations.evaluatorId, adminUserId),
        eq(weeklyPreEvaluations.evaluateeId, overdueEval.evaluatorId),
        eq(weeklyPreEvaluations.week, targetWeek),
        eq(weeklyPreEvaluations.evaluationType, "penalty")
      ));
      
      if (evaluatorPenaltyExists.length === 0) {
        await db.insert(weeklyPreEvaluations).values({
          id: createId(),
          evaluatorId: adminUserId,
          evaluateeId: overdueEval.evaluatorId,
          week: targetWeek,
          evaluationType: "penalty",
          evaluatorRole: "admin",
          status: "completed", // 確定ステータス
          penaltyPoints: -30, // 評価者のペナルティは軽め
          penaltyRate: 0.05, // 5%ペナルティ
          penaltyReason: `前週(${previousWeek})の評価タスクが期限切れとなったため、評価者としてのペナルティを適用`,
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: new Date().toISOString(), // 即座に完了
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        });
        penaltyCount++;
      }
    }
  }

  return json({ success: true, week: targetWeek, createdCount, penaltyCount });
} 