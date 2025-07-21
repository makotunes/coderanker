import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import { weeklyPreEvaluations, evaluations, users } from "~/db/schema";
import { eq, and } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import { 
  getWeekString, 
  calculateEvaluationPoints, 
  getMonthFromWeek, 
  getHalfFromMonth,
  type EvaluationData 
} from "~/lib/evaluation-calculator";

export async function loader({ request }: LoaderFunctionArgs) {
  // CRON_SECRET認証チェック
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (!authHeader || !cronSecret || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== cronSecret) {
    throw new Response("Unauthorized", { status: 401 });
  }

  if (request.method !== "POST" && request.method !== "GET") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), { status: 405 });
  }

  const url = new URL(request.url);
  const targetWeek = url.searchParams.get("week") || getWeekString(new Date());

  // 1. 指定週の完了済み評価を取得
  const completedEvaluations = await db
    .select({
      id: weeklyPreEvaluations.id,
      evaluateeId: weeklyPreEvaluations.evaluateeId,
      week: weeklyPreEvaluations.week,
      evaluationType: weeklyPreEvaluations.evaluationType,
      status: weeklyPreEvaluations.status,
      // 成果物品質評価
      qualityScore: weeklyPreEvaluations.qualityScore,
      requirementCoverage: weeklyPreEvaluations.requirementCoverage,
      testCoverage: weeklyPreEvaluations.testCoverage,
      seniorReviewScore: weeklyPreEvaluations.seniorReviewScore,
      aiCrossEvaluation: weeklyPreEvaluations.aiCrossEvaluation,
      // 成果量評価
      quantityPoints: weeklyPreEvaluations.quantityPoints,
      commitQuality: weeklyPreEvaluations.commitQuality,
      processConsistency: weeklyPreEvaluations.processConsistency,
      developmentRhythm: weeklyPreEvaluations.developmentRhythm,
      problemSolvingApproach: weeklyPreEvaluations.problemSolvingApproach,
      functionFp: weeklyPreEvaluations.functionFp,
      addedLines: weeklyPreEvaluations.addedLines,
      deletedLines: weeklyPreEvaluations.deletedLines,
      commitCount: weeklyPreEvaluations.commitCount,
      // 依頼者評価
      satisfactionScore: weeklyPreEvaluations.satisfactionScore,
      requirementAlignment: weeklyPreEvaluations.requirementAlignment,
      processQuality: weeklyPreEvaluations.processQuality,
      businessValue: weeklyPreEvaluations.businessValue,
      usability: weeklyPreEvaluations.usability,
      // ペナルティ・ボーナス
      penaltyPoints: weeklyPreEvaluations.penaltyPoints,
      penaltyRate: weeklyPreEvaluations.penaltyRate,
      penaltyReason: weeklyPreEvaluations.penaltyReason,
      bonusPoints: weeklyPreEvaluations.bonusPoints,
      bonusReason: weeklyPreEvaluations.bonusReason,
      // コメント
      comments: weeklyPreEvaluations.comments,
      completedAt: weeklyPreEvaluations.completedAt,
      // 被評価者情報
      evaluatee: {
        id: users.id,
        name: users.name,
        role: users.role,
        tier: users.tier,
      },
    })
    .from(weeklyPreEvaluations)
    .innerJoin(users, eq(weeklyPreEvaluations.evaluateeId, users.id))
    .where(
      and(
        eq(weeklyPreEvaluations.week, targetWeek),
        eq(weeklyPreEvaluations.status, "completed")
      )
    );

  // 2. ユーザー・週単位で評価を集計
  const userWeekGroups = new Map<string, typeof completedEvaluations>();
  for (const evaluation of completedEvaluations) {
    const key = `${evaluation.evaluateeId}-${evaluation.week}`;
    if (!userWeekGroups.has(key)) {
      userWeekGroups.set(key, []);
    }
    userWeekGroups.get(key)!.push(evaluation);
  }

  const results: Array<{
    userId: string;
    userName: string;
    userRole: string;
    week: string;
    qualityScore: number;
    quantityPoints: number;
    satisfactionScore: number;
    provisionalTotalPoints: number;
    roleAdjustmentRate: number;
    adjustedPoints: number;
    penaltyPoints: number;
    bonusPoints: number;
    finalTotalPoints: number;
    evaluationId: string;
  }> = [];
  
  for (const [key, userEvaluations] of userWeekGroups) {
    // keyは"userId-week" の形式なので、最初のハイフンで分割してuserIdを取得し、
    // 残りをweekとして扱う
    const firstDashIndex = key.indexOf("-");
    const userId = key.substring(0, firstDashIndex);
    const week = key.substring(firstDashIndex + 1);
    const evaluatee = userEvaluations[0].evaluatee;

    // 評価タイプ別にデータを整理
    const qualityEval = userEvaluations.find((e: typeof userEvaluations[0]) => e.evaluationType === "quality");
    const quantityEval = userEvaluations.find((e: typeof userEvaluations[0]) => e.evaluationType === "quantity");
    const satisfactionEval = userEvaluations.find((e: typeof userEvaluations[0]) => e.evaluationType === "satisfaction");
    const penaltyEval = userEvaluations.find((e: typeof userEvaluations[0]) => e.evaluationType === "penalty");
    const bonusEval = userEvaluations.find((e: typeof userEvaluations[0]) => e.evaluationType === "bonus");

    // 共通モジュールの計算関数を使用
    // まず各スコアを取得
    const qualityScore = qualityEval?.qualityScore ?? 0;
    const quantityPoints = quantityEval?.quantityPoints ?? 0;
    const satisfactionScore = satisfactionEval?.satisfactionScore ?? 0;
    // 掛け算で合成
    const provisionalTotalPoints = qualityScore * quantityPoints * satisfactionScore;

    // 以降の計算（調整率・ペナルティ・ボーナス加減算）は従来通り
    // roleAdjustmentRate, adjustedPoints, penaltyPoints, bonusPoints, finalTotalPoints などは
    // calculateEvaluationPointsの他の部分を流用するか、必要に応じて修正

    // 既存のcalculateEvaluationPointsを使う場合は、provisionalTotalPointsだけ上書きする形でもOK
    const points = calculateEvaluationPoints(
      qualityEval as EvaluationData,
      quantityEval as EvaluationData,
      satisfactionEval as EvaluationData,
      penaltyEval as EvaluationData,
      bonusEval as EvaluationData,
      evaluatee.role,
      provisionalTotalPoints
    );

    // 月次計算（週から月を抽出）
    const monthString = getMonthFromWeek(week);

    // 8. evaluationsテーブルに保存
    const evaluationId = createId();
    await db.insert(evaluations).values({
      id: evaluationId,
      userId: userId,
      week: week,
      month: monthString,
      half: getHalfFromMonth(monthString),
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
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    results.push({
      userId,
      userName: evaluatee.name,
      userRole: evaluatee.role,
      week,
      qualityScore: points.qualityScore,
      quantityPoints: points.quantityPoints,
      satisfactionScore: points.satisfactionScore,
      provisionalTotalPoints: points.provisionalTotalPoints,
      roleAdjustmentRate: points.roleAdjustmentRate,
      adjustedPoints: points.adjustedPoints,
      penaltyPoints: points.penaltyPoints,
      bonusPoints: points.bonusPoints,
      finalTotalPoints: points.finalTotalPoints,
      evaluationId,
    });
  }

  return json({
    success: true,
    targetWeek,
    processedCount: results.length,
    results,
  });
} 