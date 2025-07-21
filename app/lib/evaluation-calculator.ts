// 職種別調整率
export const ROLE_ADJUSTMENT_RATES = {
  ENGINEER: 1.0,
  CORP: 0.7,
  DESIGNER: 0.6,
  OPERATOR: 0.5,
} as const;

// 週文字列を取得する関数（例: 2024-W27, ISO 8601準拠）
export function getWeekString(date: Date): string {
  // Copy date so don't modify original
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  // Set to nearest Thursday: current date + 4 - current day number
  // Make Sunday's day number 7
  const dayNum = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - dayNum);
  // Get first day of year
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  // Calculate full weeks to nearest Thursday
  const weekNo = Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
  // Return string in format YYYY-Www
  return `${d.getUTCFullYear()}-W${weekNo.toString().padStart(2, "0")}`;
}

// 指定月の「その月に1日でも属する週」をすべて返す（重複なし、ISO週番号）
export function getWeeksInMonth(year: number, month: number): string[] {
  // month: 0-based (0=Jan, 11=Dec)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekSet = new Set<string>();
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    weekSet.add(getWeekString(date));
  }
  return Array.from(weekSet).sort();
}

// 前月の週数を取得する関数（従来のAPI互換）
export function getWeeksInPreviousMonth(): { weeks: string[], month: string } {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth();
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
  const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;
  const weeks = getWeeksInMonth(previousYear, previousMonth);
  const monthString = `${previousYear}-${(previousMonth + 1).toString().padStart(2, "0")}`;
  return { weeks, month: monthString };
}

// 評価データの型定義
export type EvaluationData = {
  qualityScore?: number | null;
  requirementCoverage?: number | null;
  testCoverage?: number | null;
  seniorReviewScore?: number | null;
  aiCrossEvaluation?: number | null;
  quantityPoints?: number | null;
  commitQuality?: number | null;
  processConsistency?: number | null;
  developmentRhythm?: number | null;
  problemSolvingApproach?: number | null;
  functionFp?: number | null;
  satisfactionScore?: number | null;
  requirementAlignment?: number | null;
  processQuality?: number | null;
  businessValue?: number | null;
  usability?: number | null;
  penaltyPoints?: number | null;
  penaltyRate?: number | null;
  penaltyReason?: string | null;
  bonusPoints?: number | null;
  bonusReason?: string | null;
  comments?: string | null;
};

// 評価ポイント計算結果の型定義
export type EvaluationPoints = {
  qualityScore: number;
  quantityPoints: number;
  satisfactionScore: number;
  provisionalTotalPoints: number;
  roleAdjustmentRate: number;
  adjustedPoints: number;
  penaltyPoints: number;
  bonusPoints: number;
  finalTotalPoints: number;
};

// 評価ポイント計算関数
export function calculateEvaluationPoints(
  qualityEval: EvaluationData | undefined,
  quantityEval: EvaluationData | undefined,
  satisfactionEval: EvaluationData | undefined,
  penaltyEval: EvaluationData | undefined,
  bonusEval: EvaluationData | undefined,
  role: string,
  overrideProvisionalTotalPoints?: number
): EvaluationPoints {
  // 1. 成果物品質スコア計算（0-100）
  let qualityScore = 50; // デフォルト値
  if (qualityEval) {
    const scores = [
      qualityEval.qualityScore ?? 50,
      qualityEval.requirementCoverage ?? 50,
      qualityEval.testCoverage ?? 50,
      qualityEval.seniorReviewScore ?? 50,
      qualityEval.aiCrossEvaluation ?? 50,
    ];
    qualityScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  // 2. 量ポイント計算（絶対量）
  let quantityPoints = 0;
  if (quantityEval) {
    quantityPoints += quantityEval.quantityPoints ?? 0;
    quantityPoints += quantityEval.commitQuality ?? 0;
    quantityPoints += quantityEval.processConsistency ?? 0;
    quantityPoints += quantityEval.developmentRhythm ?? 0;
    quantityPoints += quantityEval.problemSolvingApproach ?? 0;
    quantityPoints += quantityEval.functionFp ?? 0;
  }

  // 3. 依頼者評価スコア計算（0-100）
  let satisfactionScore = 50; // デフォルト値
  if (satisfactionEval) {
    const scores = [
      satisfactionEval.satisfactionScore ?? 50,
      satisfactionEval.requirementAlignment ?? 50,
      satisfactionEval.processQuality ?? 50,
      satisfactionEval.businessValue ?? 50,
      satisfactionEval.usability ?? 50,
    ];
    satisfactionScore = Math.round(scores.reduce((sum, score) => sum + score, 0) / scores.length);
  }

  // 4. ポイント計算
  const provisionalTotalPoints =
    overrideProvisionalTotalPoints !== undefined
      ? overrideProvisionalTotalPoints
      : (qualityScore ?? 0) + (quantityPoints ?? 0) + (satisfactionScore ?? 0);

  // 5. 職種調整率適用
  const roleAdjustmentRate = ROLE_ADJUSTMENT_RATES[role as keyof typeof ROLE_ADJUSTMENT_RATES] ?? 1.0;
  const adjustedPoints = provisionalTotalPoints * roleAdjustmentRate;

  // 6. ペナルティ・ボーナス調整
  const penaltyPoints = penaltyEval?.penaltyPoints ?? 0;
  const bonusPoints = bonusEval?.bonusPoints ?? 0;
  const finalTotalPoints = Math.max(0, adjustedPoints - penaltyPoints + bonusPoints);

  return {
    qualityScore,
    quantityPoints,
    satisfactionScore,
    provisionalTotalPoints,
    roleAdjustmentRate,
    adjustedPoints,
    penaltyPoints,
    bonusPoints,
    finalTotalPoints,
  };
}

// 週から月文字列を取得する関数
export function getMonthFromWeek(week: string): string {
  const weekParts = week.split("-");
  const year = weekParts[0];
  const weekNum = parseInt(weekParts[1].replace("W", ""));
  const month = Math.ceil(weekNum / 4);
  return `${year}-${month.toString().padStart(2, "0")}`;
}

// 月から半期文字列を取得する関数
export function getHalfFromMonth(month: string): string {
  const [year, monthNum] = month.split("-");
  const monthInt = parseInt(monthNum);
  return `${year}-${monthInt <= 6 ? "FirstHalf" : "SecondHalf"}`;
}

// 指定月の「4日以上その月に属する週」を返す（重複・漏れなし、ISO週番号）
export function getMajorityWeeksInMonth(year: number, month: number): string[] {
  // month: 0-based (0=Jan, 11=Dec)
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDayMap = new Map<string, number>(); // 週番号→その月の日数

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const week = getWeekString(date);
    weekDayMap.set(week, (weekDayMap.get(week) || 0) + 1);
  }

  // 4日以上その月に属する週のみ返す
  return Array.from(weekDayMap.entries())
    .filter(([_, count]) => count >= 4)
    .map(([week]) => week)
    .sort();
}

// 指定月の「4日以上その月に属する週」とその日付リストを返す
export function getMajorityWeeksWithDates(year: number, month: number): { week: string, dates: string[] }[] {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const weekDayMap = new Map<string, string[]>(); // 週番号→その月の日付リスト

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const week = getWeekString(date);
    const dateStr = `${month + 1}/${day}`;
    if (!weekDayMap.has(week)) weekDayMap.set(week, []);
    weekDayMap.get(week)!.push(dateStr);
  }

  // 4日以上その月に属する週のみ返す
  return Array.from(weekDayMap.entries())
    .filter(([_, dates]) => dates.length >= 4)
    .map(([week, dates]) => ({ week, dates }))
    .sort((a, b) => a.week.localeCompare(b.week));
} 