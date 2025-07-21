import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import { weeklyPreEvaluations, evaluations, users } from "~/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { 
  getMajorityWeeksInMonth, 
  calculateEvaluationPoints, 
  getMonthFromWeek, 
  getHalfFromMonth,
  type EvaluationData 
} from "~/lib/evaluation-calculator";

export async function loader({ request }: LoaderFunctionArgs) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (!authHeader || !cronSecret || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== cronSecret) {
    throw new Response("Unauthorized", { status: 401 });
  }

  try {
    // 前月を取得
    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    
    // 4日以上その月に属する週のみを取得
    const weeks = getMajorityWeeksInMonth(previousYear, previousMonth);
    const monthString = `${previousYear}-${(previousMonth + 1).toString().padStart(2, "0")}`;
    
    console.log(`Processing previous month: ${monthString} with ${weeks.length} weeks:`, weeks);

    // 対象ユーザーを取得（ADMINとREQUESTOR以外、isEvaluatedがtrueのユーザーのみ）
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        tier: users.tier,
        capabilityManagerId: users.capabilityManagerId,
        projectManagerId: users.projectManagerId,
        isEvaluated: users.isEvaluated,
      })
      .from(users)
      .where(
        and(
          ne(users.role, "ADMIN"),
          ne(users.role, "REQUESTOR"),
          eq(users.isEvaluated, true) // isEvaluatedがtrueのユーザーのみ
        )
      );

    const currentTime = new Date().toISOString();
    const createdPreEvaluations: Record<string, unknown>[] = [];
    const createdEvaluations: Record<string, unknown>[] = [];

    // 各週、各ユーザーに対してpre-evaluationを作成
    for (const week of weeks) {
      console.log(`Processing week: ${week}`);
      
      for (const user of allUsers) {
        // 1. Quality評価を作成
        const qualityId = `quality-${user.id}-${week}-${Date.now()}`;
        const qualityScore = Math.floor(Math.random() * 20) + 70; // 70-89
        const requirementCoverage = Math.floor(Math.random() * 20) + 70; // 70-89
        const testCoverage = Math.floor(Math.random() * 20) + 70; // 70-89
        const seniorReviewScore = Math.floor(Math.random() * 20) + 70; // 70-89
        const aiCrossEvaluation = Math.floor(Math.random() * 20) + 70; // 70-89

        await db.insert(weeklyPreEvaluations).values({
          id: qualityId,
          evaluatorId: "admin-user-id",
          evaluateeId: user.id,
          week: week,
          evaluationType: "quality",
          evaluatorRole: "capability_supervisor",
          status: "completed", // 完了済みの評価のみ作成
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: currentTime,
          qualityScore: qualityScore,
          requirementCoverage: requirementCoverage,
          testCoverage: testCoverage,
          seniorReviewScore: seniorReviewScore,
          aiCrossEvaluation: aiCrossEvaluation,
          comments: "コードの品質は良好です。適切なコーディング規約に従い、テストカバレッジも十分です。",
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        // 2. Quantity評価を作成
        const quantityId = `quantity-${user.id}-${week}-${Date.now()}`;
        const quantityPoints = Math.floor(Math.random() * 30) + 20; // 20-49
        const commitQuality = Math.floor(Math.random() * 20) + 70; // 70-89
        const processConsistency = Math.floor(Math.random() * 20) + 70; // 70-89
        const developmentRhythm = Math.floor(Math.random() * 20) + 70; // 70-89
        const problemSolvingApproach = Math.floor(Math.random() * 20) + 70; // 70-89
        const functionFp = Math.floor(Math.random() * 100) + 50; // 50-149
        const addedLines = Math.floor(Math.random() * 1000) + 100; // 100-1099
        const deletedLines = Math.floor(Math.random() * 200) + 10; // 10-209
        const commitCount = Math.floor(Math.random() * 20) + 5; // 5-24

        await db.insert(weeklyPreEvaluations).values({
          id: quantityId,
          evaluatorId: "admin-user-id",
          evaluateeId: user.id,
          week: week,
          evaluationType: "quantity",
          evaluatorRole: "capability_supervisor",
          status: "completed", // 完了済みの評価のみ作成
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: currentTime,
          quantityPoints: quantityPoints,
          commitQuality: commitQuality,
          processConsistency: processConsistency,
          developmentRhythm: developmentRhythm,
          problemSolvingApproach: problemSolvingApproach,
          functionFp: functionFp,
          addedLines: addedLines,
          deletedLines: deletedLines,
          commitCount: commitCount,
          comments: "タスクの完了度は期待通りです。適切なペースで作業を進め、コミット頻度も良好です。",
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        // 3. Satisfaction評価を作成
        const satisfactionId = `satisfaction-${user.id}-${week}-${Date.now()}`;
        const satisfactionScore = Math.floor(Math.random() * 20) + 70; // 70-89
        const requirementAlignment = Math.floor(Math.random() * 20) + 70; // 70-89
        const processQuality = Math.floor(Math.random() * 20) + 70; // 70-89
        const businessValue = Math.floor(Math.random() * 20) + 70; // 70-89
        const usability = Math.floor(Math.random() * 20) + 70; // 70-89

        await db.insert(weeklyPreEvaluations).values({
          id: satisfactionId,
          evaluatorId: "admin-user-id",
          evaluateeId: user.id,
          week: week,
          evaluationType: "satisfaction",
          evaluatorRole: "project_supervisor",
          status: "completed", // 完了済みの評価のみ作成
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          completedAt: currentTime,
          satisfactionScore: satisfactionScore,
          requirementAlignment: requirementAlignment,
          processQuality: processQuality,
          businessValue: businessValue,
          usability: usability,
          comments: "クライアントからの評価も良好です。要件の理解が適切で、ビジネス価値も高いです。",
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        // 4. ペナルティ評価を作成（一部のユーザーに対して）
        if (Math.random() < 0.1) { // 10%の確率でペナルティ
          const penaltyId = `penalty-${user.id}-${week}-${Date.now()}`;
          const penaltyPoints = -(Math.floor(Math.random() * 20) + 10); // -10 to -29
          const penaltyRate = Math.floor(Math.random() * 20) + 10; // 10-29%

          await db.insert(weeklyPreEvaluations).values({
            id: penaltyId,
            evaluatorId: "admin-user-id",
            evaluateeId: user.id,
            week: week,
            evaluationType: "penalty",
            evaluatorRole: "admin",
            status: "completed", // 完了済みの評価のみ作成
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: currentTime,
            penaltyPoints: penaltyPoints,
            penaltyRate: penaltyRate,
            penaltyReason: "期限超過によるペナルティ",
            comments: "評価期限を超過したためペナルティが適用されました。",
            createdAt: currentTime,
            updatedAt: currentTime,
          });
        }

        // 5. ボーナス評価を作成（一部のユーザーに対して）
        if (Math.random() < 0.05) { // 5%の確率でボーナス
          const bonusId = `bonus-${user.id}-${week}-${Date.now()}`;
          const bonusPoints = Math.floor(Math.random() * 20) + 10; // 10-29

          await db.insert(weeklyPreEvaluations).values({
            id: bonusId,
            evaluatorId: "admin-user-id",
            evaluateeId: user.id,
            week: week,
            evaluationType: "bonus",
            evaluatorRole: "admin",
            status: "completed", // 完了済みの評価のみ作成
            dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
            completedAt: currentTime,
            bonusPoints: bonusPoints,
            bonusReason: "優秀な成果に対するボーナス",
            comments: "期待を上回る優秀な成果を上げたためボーナスが適用されました。",
            createdAt: currentTime,
            updatedAt: currentTime,
          });
        }

        // 6. 週次評価を計算してevaluationsテーブルに保存
        const weekEvaluations = await db
          .select()
          .from(weeklyPreEvaluations)
          .where(
            and(
              eq(weeklyPreEvaluations.evaluateeId, user.id),
              eq(weeklyPreEvaluations.week, week),
              eq(weeklyPreEvaluations.status, "completed")
            )
          );

        // 評価タイプ別にデータを整理
        const qualityEval = weekEvaluations.find((e) => e.evaluationType === "quality");
        const quantityEval = weekEvaluations.find((e) => e.evaluationType === "quantity");
        const satisfactionEval = weekEvaluations.find((e) => e.evaluationType === "satisfaction");
        const penaltyEval = weekEvaluations.find((e) => e.evaluationType === "penalty");
        const bonusEval = weekEvaluations.find((e) => e.evaluationType === "bonus");

        // 評価ポイント計算
        const points = calculateEvaluationPoints(
          qualityEval as EvaluationData,
          quantityEval as EvaluationData,
          satisfactionEval as EvaluationData,
          penaltyEval as EvaluationData,
          bonusEval as EvaluationData,
          user.role
        );

        // 月次計算
        const monthStr = getMonthFromWeek(week);

        // evaluationsテーブルに保存
        const evaluationId = createId();
        await db.insert(evaluations).values({
          id: evaluationId,
          userId: user.id,
          week: week,
          month: monthStr,
          half: getHalfFromMonth(monthStr),
          evaluationType: "weekly",
          totalPoints: points.finalTotalPoints,
          qualityScore: points.qualityScore,
          quantityPoints: points.quantityPoints,
          satisfactionScore: points.satisfactionScore,
          // 詳細スコア
          requirementCoverage: qualityEval?.requirementCoverage ?? 50,
          testCoverage: qualityEval?.testCoverage ?? 50,
          seniorReviewScore: qualityEval?.seniorReviewScore ?? 50,
          aiCrossEvaluation: qualityEval?.aiCrossEvaluation ?? 50,
          commitQuality: quantityEval?.commitQuality ?? 0,
          processConsistency: quantityEval?.processConsistency ?? 0,
          developmentRhythm: quantityEval?.developmentRhythm ?? 0,
          problemSolvingApproach: quantityEval?.problemSolvingApproach ?? 0,
          functionFp: quantityEval?.functionFp ?? 0,
          addedLines: quantityEval?.addedLines ?? 0,
          deletedLines: quantityEval?.deletedLines ?? 0,
          commitCount: quantityEval?.commitCount ?? 0,
          requirementAlignment: satisfactionEval?.requirementAlignment ?? 50,
          processQuality: satisfactionEval?.processQuality ?? 50,
          businessValue: satisfactionEval?.businessValue ?? 50,
          usability: satisfactionEval?.usability ?? 50,
          penaltyPoints: points.penaltyPoints,
          penaltyRate: penaltyEval?.penaltyRate ?? 0,
          penaltyReason: penaltyEval?.penaltyReason ?? null,
          bonusPoints: points.bonusPoints,
          bonusReason: bonusEval?.bonusReason ?? null,
          comments: qualityEval?.comments || quantityEval?.comments || satisfactionEval?.comments || null,
          createdAt: currentTime,
          updatedAt: currentTime,
        });

        createdEvaluations.push({
          userId: user.id,
          userName: user.name,
          week: week,
          finalTotalPoints: points.finalTotalPoints,
          evaluationId: evaluationId,
        });

        createdPreEvaluations.push({
          userId: user.id,
          userName: user.name,
          week: week,
          qualityId: qualityId,
          quantityId: quantityId,
          satisfactionId: satisfactionId,
        });
      }
    }

    return json({
      success: true,
      message: `Created ${createdPreEvaluations.length} pre-evaluations and ${createdEvaluations.length} weekly evaluations for ${monthString}`,
      month: monthString,
      weeks: weeks,
      createdPreEvaluations,
      createdEvaluations,
    });

  } catch (error) {
    console.error("Error in monthly salary API:", error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 