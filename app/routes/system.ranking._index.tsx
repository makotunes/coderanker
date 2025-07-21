import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Brain,
  GitBranch,
  Users,
  Star,
  BarChart3,
  Crown,
  Dot,
  Square,
  Diamond,
  Circle,
  CircleDot
} from "lucide-react";
import { db } from "~/db/db.server";
import { evaluations } from "~/db/schema";
import { eq, inArray } from "drizzle-orm";
import { requireUser } from "~/auth.server";
import { getMajorityWeeksInMonth, getMajorityWeeksWithDates } from "~/lib/evaluation-calculator";
import React from "react"; // Added for useState

interface RankingData {
  id: string;
  name: string;
  rank: number;
  totalPoints: number;
  deviationScore: number; // 偏差値
  // 3軸評価スコア
  deepScore: number;
  shallowPoints: number; // 成果量評価は絶対値のポイント
  humanScore: number;
  totalScore: number; // 総合ポイント（成果量評価の絶対値ポイント）
  processQualityScore: number;
  // 従来の評価項目（後方互換性）
  codeQuality: number;
  testCoverage: number;
  documentation: number;
  requirementUnderstanding: number;
  deliverableQuality: number;
  communication: number;
  // 基本情報
  trend: 'up' | 'down' | 'stable';
  completedProjects: number;
  tier: string; // ティアレベル
  role: string; // ロール
  skills: string[];
  evaluationCount: number;
  lastEvaluationDate?: string;
}

// 偏差値を計算する関数
function calculateDeviationScore(points: number, allPoints: number[]): number {
  const mean = allPoints.reduce((sum, p) => sum + p, 0) / allPoints.length;
  const variance = allPoints.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / allPoints.length;
  const standardDeviation = Math.sqrt(variance);
  
  if (standardDeviation === 0) return 50; // 標準偏差が0の場合は50を返す
  
  const deviationScore = 50 + 10 * (points - mean) / standardDeviation;
  return Math.round(deviationScore * 10) / 10; // 小数点1桁まで
}

// 偏差値に基づく色分け
function getDeviationScoreColor(deviationScore: number): string {
  if (deviationScore >= 70) return "text-red-600"; // 優秀
  if (deviationScore >= 60) return "text-orange-600"; // 良好
  if (deviationScore >= 50) return "text-blue-600"; // 平均
  if (deviationScore >= 40) return "text-yellow-600"; // やや低い
  return "text-gray-600"; // 低い
}

// ティア定義
const TIER_LEVELS = {
  'tier0': {
    name: 'Tryout',
    shortName: 'T0',
    color: 'bg-white text-slate-700 border-slate-300',
    description: 'Trial / Training',
    icon: Dot,
    iconSize: 10
  },
  'tier1': { 
    name: 'Assistant', 
    shortName: 'T1', 
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    description: 'Programming Beginner',
    icon: Dot,
    iconSize: 12
  },
  'tier2': { 
    name: 'Junior', 
    shortName: 'T2', 
    color: 'bg-green-100 text-green-700 border-green-300',
    description: '1-2 years experience',
    icon: Circle,
    iconSize: 12
  },
  'tier3': { 
    name: 'Middle', 
    shortName: 'T3', 
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    description: '3-5 years experience',
    icon: CircleDot,
    iconSize: 14
  },
  'tier4': { 
    name: 'Senior', 
    shortName: 'T4', 
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    description: '5-8 years experience',
    icon: Square,
    iconSize: 12
  },
  'tier5': { 
    name: 'Lead', 
    shortName: 'T5', 
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    description: '8-12 years experience',
    icon: Diamond,
    iconSize: 14
  },
  'tier6': { 
    name: 'Principal', 
    shortName: 'T6', 
    color: 'bg-red-100 text-red-700 border-red-300',
    description: '12-15 years experience',
    icon: Star,
    iconSize: 14
  },
  'tier7': { 
    name: 'Fellow', 
    shortName: 'T7', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    description: '15+ years experience',
    icon: Crown,
    iconSize: 16
  },
} as const;

type TierLevel = keyof typeof TIER_LEVELS;



function average(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

// ISO週の開始日を取得する関数
function getDateOfISOWeek(week: number, year: number) {
  const simple = new Date(year, 0, 1 + (week - 1) * 7);
  const dow = simple.getDay();
  const ISOweekStart = simple;
  if (dow <= 4)
    ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
  else
    ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
  return ISOweekStart;
}

export async function loader({ request }: LoaderFunctionArgs) {
  await requireUser(request);
  const url = new URL(request.url);
  const period = url.searchParams.get('period') || 'week';

  let rankingsData: RankingData[] = [];
  let periodRange: { start: string, end: string, weeks: string[] } | null = null;

  if (period === 'week') {
    // DBに存在する最新の週を取得
    const allWeeks = await db.query.evaluations.findMany({ columns: { week: true } });
    const weekList = Array.from(new Set(allWeeks.map(e => e.week))).sort();
    const targetWeek = weekList[weekList.length - 1];
    // 週の開始日・終了日を取得
    let year = '', weekNum = '';
    if (typeof targetWeek === 'string' && targetWeek.includes('-W')) {
      [year, weekNum] = targetWeek.split('-W');
    }
    const weekNumber = weekNum ? parseInt(weekNum) : 1;
    // ISO週の開始日
    const startDate = getDateOfISOWeek(weekNumber, year ? parseInt(year) : new Date().getFullYear());
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    periodRange = {
      start: `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`,
      end: `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`,
      weeks: targetWeek ? [targetWeek] : [],
    };
    // targetWeekがなければ空配列で返す
    if (!targetWeek) {
      return json({ rankings: [], period, periodRange });
    }
    // 全ユーザーの最新週の評価を取得
    const evals = await db.query.evaluations.findMany({
      where: eq(evaluations.week, targetWeek),
    });
    const allUsers = await db.query.users.findMany({});
    rankingsData = evals.map((ev) => {
      const u = allUsers.find(u => u.id === ev.userId);
      const tierKey = (u?.tier !== undefined && u?.tier !== null && String(u?.tier) !== '')
        ? `tier${String(u.tier).replace('T', '')}`.toLowerCase()
        : 'tier3';
      return {
        id: u?.id || '',
        name: u?.name || '',
        rank: 0, // 後で設定
        totalPoints: Math.floor(ev.totalPoints ?? 0),
        deviationScore: 0, // 後で計算
        deepScore: Math.round((ev.qualityScore ?? 0) * 100) / 100,
        shallowPoints: ev.quantityPoints ?? 0,
        humanScore: ev.satisfactionScore ?? 0,
        totalScore: Math.floor(ev.totalPoints ?? 0),
        processQualityScore: ev.processQualityScore ?? 0,
        codeQuality: 0,
        testCoverage: 0,
        documentation: 0,
        requirementUnderstanding: 0,
        deliverableQuality: 0,
        communication: 0,
        trend: (ev.trend as 'up'|'down'|'stable') ?? 'stable',
        completedProjects: ev.completedProjects ?? 0,
        tier: tierKey,
        role: u?.role || '開発者',
        skills: u?.profile?.skills ?? [],
        evaluationCount: 0,
        lastEvaluationDate: undefined,
      };
    });
    // 偏差値計算（同一ロール内のみ）
    const roleGroups = new Map<string, RankingData[]>();
    rankingsData.forEach(r => {
      if (!roleGroups.has(r.role)) roleGroups.set(r.role, []);
      roleGroups.get(r.role)!.push(r);
    });
    rankingsData.forEach(ranking => {
      const sameRole = roleGroups.get(ranking.role) || [];
      const allPoints = sameRole.map(r => r.totalPoints);
      ranking.deviationScore = calculateDeviationScore(ranking.totalPoints, allPoints);
    });
    rankingsData.sort((a, b) => b.totalPoints - a.totalPoints);
    rankingsData.forEach((ranking, index) => {
      ranking.rank = index + 1;
    });
  } else if (period === 'month') {
    // 前月を取得
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    // const targetMonth = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
    // その月の「4日以上含む週」リストを取得
    const weeksInMonth = getMajorityWeeksInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
    // 週リストから開始日・終了日を取得
    const weeksWithDates = getMajorityWeeksWithDates(prevMonth.getFullYear(), prevMonth.getMonth());
    const firstWeek = weeksWithDates[0];
    const lastWeek = weeksWithDates[weeksWithDates.length - 1];
    const start = firstWeek ? firstWeek.dates[0] : '';
    const end = lastWeek ? lastWeek.dates[lastWeek.dates.length - 1] : '';
    periodRange = {
      start: start ? `${prevMonth.getFullYear()}/${start}` : '',
      end: end ? `${prevMonth.getFullYear()}/${end}` : '',
      weeks: weeksInMonth,
    };
    // 全ユーザーの該当週の評価を取得
    const evals = await db.query.evaluations.findMany({
      where: inArray(evaluations.week, weeksInMonth),
    });
    const allUsers = await db.query.users.findMany({});
    // デバッグ: 月次で取得したevaluationの週番号・日付・件数・合計ポイントを出力
    // console.log('=== 月次ランキング: evaluationデータ ===');
    // evals.forEach(ev => {
    //   console.log(`userId: ${ev.userId}, week: ${ev.week}, date: ${ev.createdAt}, totalPoints: ${ev.totalPoints}`);
    // });
    // console.log('件数:', evals.length, '合計ポイント:', evals.reduce((sum, ev) => sum + (ev.totalPoints ?? 0), 0));
    // ユーザーごとにグループ化し、該当週のevaluation合計をtotalPointsとする
    const grouped = new Map<string, typeof evals>();
    for (const ev of evals) {
      if (!grouped.has(ev.userId)) grouped.set(ev.userId, []);
      grouped.get(ev.userId)!.push(ev);
    }
    rankingsData = Array.from(grouped.entries()).map(([userId, userEvals]) => {
      const u = allUsers.find(u => u.id === userId);
      const tierKey = (u?.tier !== undefined && u?.tier !== null && String(u?.tier) !== '')
        ? `tier${String(u.tier).replace('T', '')}`.toLowerCase()
        : 'tier3';
      const totalPoints = userEvals.reduce((sum, ev) => sum + (ev.totalPoints ?? 0), 0);
      return {
        id: u?.id || '',
        name: u?.name || '',
        rank: 0,
        totalPoints: Math.floor(totalPoints ?? 0),
        deviationScore: 0, // 後で計算
        deepScore: Math.round(average(userEvals.map(e => e.qualityScore ?? 0)) * 100) / 100,
        shallowPoints: sum(userEvals.map(e => e.quantityPoints ?? 0)),
        humanScore: Math.round(average(userEvals.map(e => e.satisfactionScore ?? 0)) * 100) / 100,
        totalScore: Math.floor(totalPoints ?? 0),
        processQualityScore: Math.round(average(userEvals.map(e => e.processQualityScore ?? 0)) * 100) / 100,
        codeQuality: 0,
        testCoverage: 0,
        documentation: 0,
        requirementUnderstanding: 0,
        deliverableQuality: 0,
        communication: 0,
        trend: userEvals[userEvals.length - 1]?.trend as 'up'|'down'|'stable' ?? 'stable',
        completedProjects: sum(userEvals.map(e => e.completedProjects ?? 0)),
        tier: tierKey,
        role: u?.role || '開発者',
        skills: u?.profile?.skills ?? [],
        evaluationCount: userEvals.length,
        lastEvaluationDate: userEvals[userEvals.length - 1]?.createdAt,
      };
    });
    // 偏差値計算（同一ロール内のみ）
    const roleGroups = new Map<string, RankingData[]>();
    rankingsData.forEach(r => {
      if (!roleGroups.has(r.role)) roleGroups.set(r.role, []);
      roleGroups.get(r.role)!.push(r);
    });
    rankingsData.forEach(ranking => {
      const sameRole = roleGroups.get(ranking.role) || [];
      const allPoints = sameRole.map(r => r.totalPoints);
      ranking.deviationScore = calculateDeviationScore(ranking.totalPoints, allPoints);
    });
    rankingsData.sort((a, b) => b.totalPoints - a.totalPoints);
    rankingsData.forEach((ranking, index) => {
      ranking.rank = index + 1;
    });
  } else if (period === 'half') {
    // 例: 2024-FirstHalf or 2024-SecondHalf
    const now = new Date();
    // URLパラメータや今の日付から半期を決定（仮: 直近の半期）
    let targetHalf = '2024-FirstHalf';
    const urlHalf = url.searchParams.get('half');
    if (urlHalf) {
      targetHalf = urlHalf;
    } else {
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      if (month >= 7) {
        // 7月以降ならその年の1-6月（FirstHalf）
        targetHalf = `${year}-FirstHalf`;
      } else {
        // 1-6月なら前年の7-12月（SecondHalf）
        targetHalf = `${year - 1}-SecondHalf`;
      }
    }
    // 半期の開始・終了月を決定
    let yearStr = '', halfStr = '';
    if (typeof targetHalf === 'string' && targetHalf.includes('-')) {
      [yearStr, halfStr] = targetHalf.split('-');
    }
    const year = yearStr ? parseInt(yearStr) : new Date().getFullYear();
    const isFirst = halfStr === 'FirstHalf';
    const startMonth = isFirst ? 0 : 6; // 0-based
    const endMonth = isFirst ? 5 : 11; // 0-based, 1月〜6月 or 7月〜12月
    // 半期に含まれる全週（4日以上含む週）を集める
    let halfWeeks: string[] = [];
    for (let m = startMonth; m <= endMonth; m++) {
      halfWeeks = halfWeeks.concat(getMajorityWeeksInMonth(year, m));
    }
    halfWeeks = Array.from(new Set(halfWeeks)).sort();
    // 週リストから開始日・終了日を取得
    let weeksWithDates: { week: string, dates: string[] }[] = [];
    for (let m = startMonth; m <= endMonth; m++) {
      weeksWithDates = weeksWithDates.concat(getMajorityWeeksWithDates(year, m));
    }
    weeksWithDates = weeksWithDates.filter(w => halfWeeks.includes(w.week));
    weeksWithDates.sort((a, b) => a.week.localeCompare(b.week));
    const firstWeek = weeksWithDates[0];
    const lastWeek = weeksWithDates[weeksWithDates.length - 1];
    const start = firstWeek ? firstWeek.dates[0] : '';
    const end = lastWeek ? lastWeek.dates[lastWeek.dates.length - 1] : '';
    periodRange = {
      start: start ? `${year}/${start}` : '',
      end: end ? `${year}/${end}` : '',
      weeks: halfWeeks,
    };
    // 全ユーザーの該当週の評価を取得
    const evals = await db.query.evaluations.findMany({
      where: inArray(evaluations.week, halfWeeks),
    });
    const allUsers = await db.query.users.findMany({});
    // ユーザーごとにグループ化し、該当週のevaluation合計をtotalPointsとする
    const grouped = new Map<string, typeof evals>();
    for (const ev of evals) {
      if (!grouped.has(ev.userId)) grouped.set(ev.userId, []);
      grouped.get(ev.userId)!.push(ev);
    }
    rankingsData = Array.from(grouped.entries()).map(([userId, userEvals]) => {
      const u = allUsers.find(u => u.id === userId);
      const tierKey = (u?.tier !== undefined && u?.tier !== null && String(u?.tier) !== '')
        ? `tier${String(u.tier).replace('T', '')}`.toLowerCase()
        : 'tier3';
      const totalPointsRaw = userEvals.reduce((sum, ev) => sum + (ev.totalPoints ?? 0), 0);
      const totalPoints = typeof totalPointsRaw === 'number' && !isNaN(totalPointsRaw) ? totalPointsRaw : 0;
      return {
        id: u?.id || '',
        name: u?.name || '',
        rank: 0,
        totalPoints: Math.floor(totalPoints ?? 0),
        deviationScore: 0, // 後で計算
        deepScore: u ? Math.round(average(userEvals.map(e => e.qualityScore ?? 0)) * 100) / 100 : 0,
        shallowPoints: u ? sum(userEvals.map(e => e.quantityPoints ?? 0)) : 0,
        humanScore: u ? Math.round(average(userEvals.map(e => e.satisfactionScore ?? 0)) * 100) / 100 : 0,
        totalScore: Math.floor(totalPoints ?? 0),
        processQualityScore: u ? Math.round(average(userEvals.map(e => e.processQualityScore ?? 0)) * 100) / 100 : 0,
        codeQuality: 0,
        testCoverage: 0,
        documentation: 0,
        requirementUnderstanding: 0,
        deliverableQuality: 0,
        communication: 0,
        trend: u ? (userEvals[userEvals.length - 1]?.trend as 'up'|'down'|'stable' ?? 'stable') : 'stable',
        completedProjects: u ? sum(userEvals.map(e => e.completedProjects ?? 0)) : 0,
        tier: tierKey,
        role: u?.role || '開発者',
        skills: u?.profile?.skills ?? [],
        evaluationCount: u ? userEvals.length : 0,
        lastEvaluationDate: u ? userEvals[userEvals.length - 1]?.createdAt : undefined,
      };
    });
    // 偏差値計算（同一ロール内のみ）
    const roleGroups = new Map<string, RankingData[]>();
    rankingsData.forEach(r => {
      if (!roleGroups.has(r.role)) roleGroups.set(r.role, []);
      roleGroups.get(r.role)!.push(r);
    });
    rankingsData.forEach(ranking => {
      const sameRole = roleGroups.get(ranking.role) || [];
      const allPoints = sameRole.map(r => r.totalPoints);
      ranking.deviationScore = calculateDeviationScore(ranking.totalPoints, allPoints);
    });
    rankingsData.sort((a, b) => b.totalPoints - a.totalPoints);
    rankingsData.forEach((ranking, index) => {
      ranking.rank = index + 1;
    });
  }
  // デバッグ: 各ユーザーのtotalPointsを出力
  console.log('=== RANKING totalPoints ===');
  // 週次・月次・半期以外は空配列（拡張可）
  return json({ rankings: rankingsData, period, periodRange });
}

export default function RankingPage() {
  const { rankings, period, periodRange } = useLoaderData<typeof loader>();
  const location = typeof window !== 'undefined' ? window.location : { search: '' };
  const params = new URLSearchParams(location.search);
  const urlRole = params.get('role');
  const defaultRole = urlRole || 'ENGINEER';
  const [roleFilter, setRoleFilter] = React.useState<string>(defaultRole);
  const roleOptions = [
    { label: 'Engineer', value: 'ENGINEER' },
    { label: 'Corporate', value: 'CORP' },
    { label: 'Designer', value: 'DESIGNER' },
    { label: 'Operator', value: 'OPERATOR' },
  ];
  // URLパラメータをロール切り替え時に更新
  const handleRoleChange = (role: string) => {
    setRoleFilter(role);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set('role', role);
    window.history.replaceState(null, '', `${window.location.pathname}?${newParams.toString()}`);
  };
  let filteredRankings = rankings.filter(r => r.role === roleFilter);
  // 偏差値・順位はフィルタ後に計算
  const allPoints = filteredRankings.map(r => r.totalPoints);
  filteredRankings = filteredRankings.map(r => ({
    ...r,
    deviationScore: calculateDeviationScore(r.totalPoints, allPoints),
    rank: 0, // 一旦0で初期化
  }));
  // 順位を再計算
  filteredRankings.sort((a, b) => b.totalPoints - a.totalPoints);
  filteredRankings = filteredRankings.map((r, i) => ({ ...r, rank: i + 1 }));
  const getTabClass = (active: boolean) =>
    active
      ? "border-b-2 border-blue-600 text-blue-600 font-bold"
      : "text-gray-500 hover:text-blue-600";

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Badge className="bg-yellow-500 text-white">1st</Badge>;
    if (rank === 2) return <Badge className="bg-gray-400 text-white">2nd</Badge>;
    if (rank === 3) return <Badge className="bg-orange-600 text-white">3rd</Badge>;
    return <Badge variant="secondary">{rank}位</Badge>;
  };

  const getTierBadge = (tier: string) => {
    const tierKey = tier as TierLevel;
    const tierInfo = TIER_LEVELS[tierKey] || TIER_LEVELS.tier3; // デフォルトはミドル
    const tierNum = parseInt(tierKey.replace('tier', ''));
    
    return (
      <div className="flex flex-col items-center gap-1">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: tierNum }, (_, i) => (
            <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
          ))}
        </div>
        <span className="text-xs font-medium text-gray-700">{tierInfo.name}</span>
      </div>
    );
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-600";
    if (score >= 80) return "text-blue-600";
    if (score >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      // 'ADMIN': { label: 'ADMIN', color: 'bg-red-100 text-red-800 border-red-200' },
      'CORP': { label: 'CORP', color: 'bg-blue-100 text-blue-800 border-blue-200' },
      'ENGINEER': { label: 'ENGINEER', color: 'bg-green-100 text-green-800 border-green-200' },
      'DESIGNER': { label: 'DESIGNER', color: 'bg-purple-100 text-purple-800 border-purple-200' },
      'OPERATOR': { label: 'OPERATOR', color: 'bg-orange-100 text-orange-800 border-orange-200' },
    };
    
    const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.ENGINEER;
    return (
      <Badge variant="outline" className={`text-xs px-1 py-0.5 ${config.color}`}>
        {config.label}
      </Badge>
    );
  };

  // タブUI
  const periodTabs = [
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
    { label: "Half-year", value: "half" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Code Ranker Evaluation Ranking</h1>
              <p className="text-gray-600 mt-1">Comprehensive Ranking by 3-Axis Evaluation System</p>
            </div>
          </div>
          {/* 期間範囲表示 */}
          {periodRange && (
            <div className="mb-2 text-blue-700 font-semibold text-lg">
              Target Period: {periodRange.start} - {periodRange.end}
            </div>
          )}
        </div>
        {/* ロールフィルタ */}
        <div className="mb-4 flex gap-2 items-center">
          <span className="text-gray-700 font-semibold">Role:</span>
          {roleOptions.map(opt => (
            <button
              key={opt.value}
              className={`px-3 py-1 rounded border ${roleFilter === opt.value ? 'bg-blue-600 text-white' : 'bg-white text-blue-700 border-blue-300'} transition`}
              onClick={() => handleRoleChange(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* タブ */}
        <div className="flex space-x-8 border-b mb-6">
          {periodTabs.map(tab => (
            <Link
              key={tab.value}
              to={`?period=${tab.value}`}
              className={`pb-2 px-1 ${getTabClass(period === tab.value)}`}
              prefetch="intent"
              replace
            >
              {tab.label}
            </Link>
          ))}
        </div>

        {filteredRankings.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">ランキングデータがありません</div>
          </div>
        ) : (
          <>
            {/* ランキング概要 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Total Participants</div>
                      <div className="text-2xl font-bold text-gray-900">{filteredRankings.length}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Average Total Points</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {Math.round(filteredRankings.reduce((sum, r) => sum + r.totalPoints, 0) / filteredRankings.length).toLocaleString()}pt
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* 平均給与カード削除済み */}
              
              {/* <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <Target className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">総プロジェクト数</div>
                      <div className="text-2xl font-bold text-gray-900">
                        {filteredRankings.reduce((sum, r) => sum + r.completedProjects, 0)}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card> */}
            </div>

            {/* ランキング表 */}
            <Card className="border-0 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Code Ranker Individual Ranking
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* PC: テーブル, モバイル: カードリスト */}
                <div className="hidden md:block min-w-[400px]">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Rank</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Developer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Tier</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Role</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Quality Score</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Quantity Score</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Satisfaction</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Total Points</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Deviation</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Trend</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-600">Detail</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRankings.map((ranking) => (
                        <tr key={ranking.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{getRankBadge(ranking.rank)}</td>
                          <td className="py-3 px-4">
                            <div>
                              <Link 
                                to={`/system/ranking/${ranking.id}`}
                                className="font-medium text-blue-600 hover:text-blue-800 hover:underline"
                              >
                                {ranking.name}
                              </Link>
                              <div className="text-xs text-gray-500 mt-1">
                                {ranking.skills.slice(0, 2).join(", ")}
                                {ranking.skills.length > 2 && "..."}
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">{getTierBadge(ranking.tier)}</td>
                          <td className="py-3 px-4">{getRoleBadge(ranking.role)}</td>
                          <td className="py-3 px-4">
                            <div className={`font-bold ${getScoreColor(ranking.deepScore)}`}>{ranking.deepScore.toFixed(2)}pt</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-gray-900">{ranking.shallowPoints.toLocaleString()}pt</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`font-bold ${getScoreColor(ranking.humanScore)}`}>{ranking.humanScore.toFixed(2)}pt</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-lg text-gray-900">{ranking.totalPoints.toLocaleString()}pt</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className={`font-bold text-lg ${getDeviationScoreColor(ranking.deviationScore)}`}>{ranking.deviationScore.toFixed(1)}</div>
                            <div className="text-xs text-gray-500 mt-1">
                              {ranking.deviationScore >= 70 ? "Excellent" : 
                               ranking.deviationScore >= 60 ? "Good" : 
                               ranking.deviationScore >= 50 ? "Average" : 
                               ranking.deviationScore >= 40 ? "Slightly Low" : "Low"}
                            </div>
                          </td>
                          <td className="py-3 px-4">{getTrendIcon(ranking.trend)}</td>
                          <td className="py-3 px-4">
                            <Link
                              to={`/system/ranking/${ranking.id}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline text-sm"
                            >
                              View Detail
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {/* モバイル: カードリスト */}
                <div className="md:hidden flex flex-col gap-4">
                  {filteredRankings.map((ranking) => (
                    <div key={ranking.id} className="rounded-lg border p-4 bg-white shadow-sm flex flex-col gap-2">
                      <div className="flex items-center gap-2 mb-1">
                        {getRankBadge(ranking.rank)}
                        <span className="font-bold text-lg text-gray-900">{ranking.name}</span>
                        {getRoleBadge(ranking.role)}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        {getTierBadge(ranking.tier)}
                        <span>{ranking.skills.slice(0, 2).join(", ")}{ranking.skills.length > 2 && "..."}</span>
                      </div>
                      <div className="flex flex-wrap gap-2 text-sm">
                        <span className="font-bold">Quality: <span className={getScoreColor(ranking.deepScore)}>{ranking.deepScore.toFixed(2)}</span></span>
                        <span className="font-bold">Quantity: <span className="text-gray-900">{ranking.shallowPoints.toLocaleString()}pt</span></span>
                        <span className="font-bold">Satisfaction: <span className={getScoreColor(ranking.humanScore)}>{ranking.humanScore.toFixed(2)}</span></span>
                        <span className="font-bold">Total: <span className="text-gray-900">{ranking.totalPoints.toLocaleString()}pt</span></span>
                        <span className="font-bold">Deviation: <span className={getDeviationScoreColor(ranking.deviationScore)}>{ranking.deviationScore.toFixed(1)}</span></span>
                        <span className="font-bold">{getTrendIcon(ranking.trend)}</span>
                      </div>
                      <div className="flex justify-end mt-2">
                        <Link
                          to={`/system/ranking/${ranking.id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium"
                        >
                          View Detail
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* ティア分布 */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-indigo-600" />
                  Tier Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                  {Object.entries(TIER_LEVELS).map(([tierKey, tierInfo]) => {
                    const count = filteredRankings.filter(r => r.tier === tierKey).length;
                    const percentage = Math.round((count / filteredRankings.length) * 100);
                    
                    // ティア別の色設定
                    const getTierColors = (tier: string) => {
                      switch (tier) {
                        case 'tier0': return { bg: 'bg-white', border: 'border-slate-200', icon: 'text-slate-600', text: 'text-slate-700', name: 'text-slate-600', count: 'text-slate-800', percent: 'text-slate-500' };
                        case 'tier1': return { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600', text: 'text-gray-700', name: 'text-gray-600', count: 'text-gray-800', percent: 'text-gray-500' };
                        case 'tier2': return { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', text: 'text-green-700', name: 'text-green-600', count: 'text-green-800', percent: 'text-green-500' };
                        case 'tier3': return { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', text: 'text-blue-700', name: 'text-blue-600', count: 'text-blue-800', percent: 'text-blue-500' };
                        case 'tier4': return { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', text: 'text-purple-700', name: 'text-purple-600', count: 'text-purple-800', percent: 'text-purple-500' };
                        case 'tier5': return { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', text: 'text-orange-700', name: 'text-orange-600', count: 'text-orange-800', percent: 'text-orange-500' };
                        case 'tier6': return { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', text: 'text-red-700', name: 'text-red-600', count: 'text-red-800', percent: 'text-red-500' };
                        case 'tier7': return { bg: 'bg-yellow-50', border: 'border-yellow-200', icon: 'text-yellow-600', text: 'text-yellow-700', name: 'text-yellow-600', count: 'text-yellow-800', percent: 'text-yellow-500' };
                        default: return { bg: 'bg-gray-50', border: 'border-gray-200', icon: 'text-gray-600', text: 'text-gray-700', name: 'text-gray-600', count: 'text-gray-800', percent: 'text-gray-500' };
                      }
                    };
                    
                    const colors = getTierColors(tierKey);
                    
                    const tierNum = parseInt(tierKey.replace('tier', ''));
                    
                    return (
                      <div key={tierKey} className={`text-center p-3 rounded-lg border ${colors.bg} ${colors.border}`}>
                        <div className="flex flex-col items-center gap-1 mb-2">
                          <div className="flex items-center gap-0.5">
                            {Array.from({ length: tierNum }, (_, i) => (
                              <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                            ))}
                          </div>
                          <span className={`font-semibold text-sm ${colors.text}`}>{tierInfo.name}</span>
                        </div>
                        <div className={`text-lg font-bold ${colors.count}`}>{count} users</div>
                        <div className={`text-xs ${colors.percent}`}>({percentage}%)</div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* 3軸評価の説明 */}
            <Card className="border-0 shadow-sm mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  About the 3-Axis Evaluation System
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Brain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-blue-800 mb-2">Quality Evaluation</h3>
                    <p className="text-sm text-blue-700">
                      Evaluation focused on deliverables and testing<br />
                      Measures code quality, test coverage,<br />
                      and documentation quality
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <GitBranch className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-green-800 mb-2">Quantity Evaluation</h3>
                    <p className="text-sm text-green-700">
                      Focused on development volume and process<br />
                      Measures commit history, development volume,<br />
                      and continuous improvement
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-purple-800 mb-2">Satisfaction Evaluation</h3>
                    <p className="text-sm text-purple-700">
                      Evaluation by managers and clients<br />
                      Measures requirement understanding, deliverable quality,<br />
                      and communication
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        )}
      </div>
    </div>
  );
} 