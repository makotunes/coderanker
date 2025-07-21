import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Progress } from "~/components/ui/progress";
import { 
  ArrowLeft, 
  Trophy, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  Star,
  BarChart3,
  Calendar,
  Target,
  Users,
  Brain,
  GitBranch,
  Crown,
  Activity,
  Clock,
  Repeat,
  UserCheck,
  Circle,
  CircleDot,
  Dot,
  Square,
  Diamond
} from "lucide-react";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { evaluations } from "~/db/schema";
import { eq, inArray } from "drizzle-orm";
import { requireUser } from "~/auth.server";
import type { WeeklyPreEvaluation } from "~/db/schema";

// ティア定義
const TIER_LEVELS = {
  'tier0': {
    name: 'Trial',
    shortName: 'T0',
    color: 'bg-white text-slate-700 border-slate-300',
    description: 'Trial/Training',
    icon: Dot,
    iconSize: 10
  },
  'tier1': { 
    name: 'Assistant', 
    shortName: 'T1', 
    color: 'bg-gray-100 text-gray-700 border-gray-300',
    description: 'Beginner Programmer',
    icon: Dot,
    iconSize: 12
  },
  'tier2': { 
    name: 'Junior', 
    shortName: 'T2', 
    color: 'bg-green-100 text-green-700 border-green-300',
    description: '1-2 years of practical experience',
    icon: Circle,
    iconSize: 12
  },
  'tier3': { 
    name: 'Middle', 
    shortName: 'T3', 
    color: 'bg-blue-100 text-blue-700 border-blue-300',
    description: '3-5 years of practical experience',
    icon: CircleDot,
    iconSize: 14
  },
  'tier4': { 
    name: 'Senior', 
    shortName: 'T4', 
    color: 'bg-purple-100 text-purple-700 border-purple-300',
    description: '5-8 years of practical experience',
    icon: Square,
    iconSize: 12
  },
  'tier5': { 
    name: 'Lead', 
    shortName: 'T5', 
    color: 'bg-orange-100 text-orange-700 border-orange-300',
    description: '8-12 years of practical experience',
    icon: Diamond,
    iconSize: 14
  },
  'tier6': { 
    name: 'Principal', 
    shortName: 'T6', 
    color: 'bg-red-100 text-red-700 border-red-300',
    description: '12-15 years of practical experience',
    icon: Star,
    iconSize: 14
  },
  'tier7': { 
    name: 'Fellow', 
    shortName: 'T7', 
    color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    description: '15 years or more of practical experience',
    icon: Crown,
    iconSize: 16
  },
} as const;

type TierLevel = keyof typeof TIER_LEVELS;

// ティアバッジを取得する関数
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

interface DeveloperDetail {
  id: string;
  name: string;
  rank: number;
  // 3軸評価スコア
  deepScore: number;
  shallowPoints: number; // 成果量評価は絶対値のポイント
  humanScore: number;
  totalScore: number; // 総合ポイント（成果量評価の絶対値ポイント）
  processQualityScore: number;
  consistencyScore: number;
  // 基本情報
  deviationScore: number; // 偏差値
  trend: 'up' | 'down' | 'stable';
  completedProjects: number;
  tier: string; // 肩書き（T0〜T7）
  role: string; // ロール
  skills: string[];
  // 評価詳細
  evaluationBreakdown: {
    deepEvaluation: {
      requirementCoverage: number;
      testCoverage: number;
      seniorReviewScore: number;
      aiCrossEvaluation: number;
    };
    shallowEvaluation: {
      commitQuality: number;
      processConsistency: number;
      developmentRhythm: number;
      problemSolvingApproach: number;
    };
    humanEvaluation: {
      requirementAlignment: number;
      processQuality: number;
      businessValue: number;
      usability: number;
    };
  };
  // プロセスメトリクス
  processMetrics: {
    totalCommits: number;
    purposefulCommits: number;
    averageCommitFrequency: number;
    developmentContinuity: number;
  } | null;
  // プロジェクト詳細
  recentProjects: Array<{
    id: string;
    name: string;
    status: string;
    deepScore: number;
    shallowPoints: number;
    humanScore: number;
    totalScore: number; // 総合ポイント
    completedDate: string | null;
    evaluationSummary: string;
  }>;
  evaluationHistory: Array<{
    id: string;
    projectName: string;
    evaluationDate: string;
    deepScore: number;
    shallowPoints: number;
    humanScore: number;
    totalScore: number; // 総合ポイント
    feedback: string;
  }>;
  // 上司情報
  capabilityManager: { name: string; role: string; tier: string } | null;
  projectManager: { name: string; role: string; tier: string } | null;
  // 給与情報
  monthlySalary?: number;
  // pre-evaluation
  preEvaluations?: (WeeklyPreEvaluation & { evaluatorName: string })[];
}



function average(arr: number[]): number {
  if (!arr.length) return 0;
  return arr.reduce((a, b) => a + b, 0) / arr.length;
}
function sum(arr: number[]): number {
  return arr.reduce((a, b) => a + b, 0);
}

// 偏差値計算関数（system.ranking._index.tsxと同じ）
function calculateDeviationScore(points: number, allPoints: number[]): number {
  if (!allPoints.length) return 50;
  const mean = allPoints.reduce((sum, p) => sum + p, 0) / allPoints.length;
  const variance = allPoints.reduce((sum, p) => sum + Math.pow(p - mean, 2), 0) / allPoints.length;
  const standardDeviation = Math.sqrt(variance);
  if (standardDeviation === 0) return 50;
  const deviationScore = 50 + 10 * (points - mean) / standardDeviation;
  return Math.round(deviationScore * 10) / 10;
}

// ISO週の開始日を取得する関数（loader外に移動）
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

export async function loader({ request, params }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  const developerId = params.id;
  const url = new URL(request.url);
  const period = url.searchParams.get('period') || 'week';
  const roleParam = url.searchParams.get('role');

  if (!developerId) {
    throw new Response("Developer ID is not specified", { status: 400 });
  }

  // 開発者情報を取得
  const developer = await db.query.users.findFirst({
    where: eq(users.id, developerId),
  });
  if (!developer) {
    throw new Response("Developer not found", { status: 404 });
  }

  // 上司情報を取得
  let capabilityManager = null;
  let projectManager = null;
  if (developer.capabilityManagerId) {
    capabilityManager = await db.query.users.findFirst({ where: eq(users.id, developer.capabilityManagerId) });
  }
  if (developer.projectManagerId) {
    projectManager = await db.query.users.findFirst({ where: eq(users.id, developer.projectManagerId) });
  }

  // 期間範囲(periodRange)を計算
  let periodRange: { start: string, end: string, weeks: string[] } | null = null;
  if (period === 'week') {
    // DBに存在する最新の週を取得
    const allWeeks = await db.query.evaluations.findMany({ columns: { week: true } });
    const weekList = Array.from(new Set(allWeeks.map(e => e.week))).sort();
    const targetWeek = weekList[weekList.length - 1];
    const [year, weekNum] = targetWeek.split('-W');
    const weekNumber = parseInt(weekNum);
    // ISO週の開始日
    const startDate = getDateOfISOWeek(weekNumber, parseInt(year));
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    periodRange = {
      start: `${startDate.getFullYear()}/${startDate.getMonth() + 1}/${startDate.getDate()}`,
      end: `${endDate.getFullYear()}/${endDate.getMonth() + 1}/${endDate.getDate()}`,
      weeks: [targetWeek],
    };
  } else if (period === 'month') {
    // 前月を取得
    const now = new Date();
    const prevMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    // その月の「4日以上含む週」リストを取得
    // getMajorityWeeksInMonth, getMajorityWeeksWithDates をimport
    // import { getMajorityWeeksInMonth, getMajorityWeeksWithDates } from "~/lib/evaluation-calculator";
    // 既にimportされていればOK
    const weeksInMonth = (await import("~/lib/evaluation-calculator")).getMajorityWeeksInMonth(prevMonth.getFullYear(), prevMonth.getMonth());
    const weeksWithDates = (await import("~/lib/evaluation-calculator")).getMajorityWeeksWithDates(prevMonth.getFullYear(), prevMonth.getMonth());
    const firstWeek = weeksWithDates[0];
    const lastWeek = weeksWithDates[weeksWithDates.length - 1];
    const start = firstWeek ? firstWeek.dates[0] : '';
    const end = lastWeek ? lastWeek.dates[lastWeek.dates.length - 1] : '';
    periodRange = {
      start: start ? `${prevMonth.getFullYear()}/${start}` : '',
      end: end ? `${prevMonth.getFullYear()}/${end}` : '',
      weeks: weeksInMonth,
    };
  } else if (period === 'half') {
    // 例: 2024-FirstHalf or 2024-SecondHalf
    const now = new Date();
    let targetHalf = '2024-FirstHalf';
    const urlHalf = url.searchParams.get('half');
    if (urlHalf) {
      targetHalf = urlHalf;
    } else {
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      if (month >= 7) {
        targetHalf = `${year}-FirstHalf`;
      } else {
        targetHalf = `${year - 1}-SecondHalf`;
      }
    }
    const [yearStr, halfStr] = targetHalf.split('-');
    const year = parseInt(yearStr);
    const isFirst = halfStr === 'FirstHalf';
    const startMonth = isFirst ? 0 : 6;
    const endMonth = isFirst ? 5 : 11;
    let halfWeeks: string[] = [];
    for (let m = startMonth; m <= endMonth; m++) {
      halfWeeks = halfWeeks.concat((await import("~/lib/evaluation-calculator")).getMajorityWeeksInMonth(year, m));
    }
    halfWeeks = Array.from(new Set(halfWeeks)).sort();
    let weeksWithDates: { week: string, dates: string[] }[] = [];
    for (let m = startMonth; m <= endMonth; m++) {
      weeksWithDates = weeksWithDates.concat((await import("~/lib/evaluation-calculator")).getMajorityWeeksWithDates(year, m));
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
  }

  // periodに応じてevaluationsテーブルからデータを取得
  let developerDetail: DeveloperDetail | null = null;
  let allRankings: Array<{ userId: string; totalPoints: number; name: string; }> = [];
  const roleForRanking = roleParam || developer.role;

  if (period === 'week') {
    // DBに存在する最新の週を取得
    const allWeeks = await db.query.evaluations.findMany({ columns: { week: true } });
    const weekList = Array.from(new Set(allWeeks.map(e => e.week))).sort();
    const targetWeek = weekList[weekList.length - 1];
    // 全ユーザーの最新週の評価を取得
    const evalsAll = await db.query.evaluations.findMany({ where: eq(evaluations.week, targetWeek) });
    const usersAll = await db.query.users.findMany({});
    allRankings = evalsAll
      .map(ev => {
        const u = usersAll.find(u => u.id === ev.userId);
        return {
          userId: ev.userId,
          totalPoints: Math.floor(ev.totalPoints ?? 0),
          name: u?.name || '',
          role: u?.role || '',
        };
      })
      .filter(r => r.role === roleForRanking);
    allRankings.sort((a, b) => b.totalPoints - a.totalPoints);
    const ev = evalsAll.find(ev => ev.userId === developerId);
    if (ev) {
      const tier = (developer.tier !== undefined && developer.tier !== null && String(developer.tier) !== '')
        ? `tier${String(developer.tier).replace('T', '')}`.toLowerCase()
        : 'tier3';
      const profileData = developer.profile ?? {};
      const totalPoints = Math.floor(ev.totalPoints ?? 0);
      const allPoints = allRankings.map(r => r.totalPoints);
      const deviationScore = calculateDeviationScore(totalPoints, allPoints);
      const rank = allRankings.findIndex(r => r.userId === developerId) + 1;
      // pre-evaluation取得（このユーザー・この週の全件）
      let preEvaluations: WeeklyPreEvaluation[] = [];
      if (ev) {
        preEvaluations = await db.query.weeklyPreEvaluations.findMany({
          where: (pre, { eq, and }) =>
            and(
              eq(pre.evaluateeId, ev.userId),
              eq(pre.week, ev.week)
            )
        });
      }
      // 評価者名をusersテーブルから取得
      const evaluatorIds = preEvaluations.map(pre => pre.evaluatorId);
      const evaluators = await db.query.users.findMany({ where: (u, { inArray }) => inArray(u.id, evaluatorIds) });
      const preEvaluationsWithName = preEvaluations.map(pre => ({
        ...pre,
        evaluatorName: evaluators.find(u => u.id === pre.evaluatorId)?.name || pre.evaluatorId,
      }));
      // 型アサーションでevaluatorNameを含める
      type PreEvaluationWithName = WeeklyPreEvaluation & { evaluatorName: string };
      developerDetail = {
        id: developer.id,
        name: developer.name,
        rank,
        deepScore: Math.round((ev.qualityScore ?? 0) * 100) / 100,
        shallowPoints: ev.quantityPoints ?? 0,
        humanScore: Math.round((ev.satisfactionScore ?? 0) * 100) / 100,
        totalScore: totalPoints,
        processQualityScore: Math.round((ev.processQualityScore ?? 0) * 100) / 100,
        consistencyScore: Math.round((ev.consistencyScore ?? 0) * 100) / 100,
        deviationScore,
        trend: (ev.trend as 'up'|'down'|'stable') ?? 'stable',
        completedProjects: ev.completedProjects ?? 0,
        tier,
        role: developer.role,
        skills: profileData?.skills || [],
        evaluationBreakdown: {
          deepEvaluation: {
            requirementCoverage: Math.round((ev.requirementCoverage ?? 0) * 100) / 100,
            testCoverage: Math.round((ev.testCoverage ?? 0) * 100) / 100,
            seniorReviewScore: Math.round((ev.seniorReviewScore ?? 0) * 100) / 100,
            aiCrossEvaluation: Math.round((ev.aiCrossEvaluation ?? 0) * 100) / 100,
          },
          shallowEvaluation: {
            commitQuality: Math.round((ev.commitQuality ?? 0) * 100) / 100,
            processConsistency: Math.round((ev.processConsistency ?? 0) * 100) / 100,
            developmentRhythm: Math.round((ev.developmentRhythm ?? 0) * 100) / 100,
            problemSolvingApproach: Math.round((ev.problemSolvingApproach ?? 0) * 100) / 100,
          },
          humanEvaluation: {
            requirementAlignment: Math.round((ev.requirementAlignment ?? 0) * 100) / 100,
            processQuality: Math.round((ev.processQuality ?? 0) * 100) / 100,
            businessValue: Math.round((ev.businessValue ?? 0) * 100) / 100,
            usability: Math.round((ev.usability ?? 0) * 100) / 100,
          },
        },
        processMetrics: ev.processMetrics as {
          totalCommits: number;
          purposefulCommits: number;
          averageCommitFrequency: number;
          developmentContinuity: number;
        } ?? {
          totalCommits: 0,
          purposefulCommits: 0,
          averageCommitFrequency: 0,
          developmentContinuity: 0,
        },
        recentProjects: Array.isArray(ev.recentProjects) ? ev.recentProjects : [],
        evaluationHistory: Array.isArray(ev.evaluationHistory) ? ev.evaluationHistory : [],
        capabilityManager: capabilityManager ? { name: capabilityManager.name, role: capabilityManager.role, tier: capabilityManager.tier } : null,
        projectManager: projectManager ? { name: projectManager.name, role: projectManager.role, tier: projectManager.tier } : null,
        preEvaluations: preEvaluationsWithName as PreEvaluationWithName[], // ここで型を明示
      };
    }
  } else if (period === 'month' || period === 'half') {
    // 一覧と同じく、該当週リストでinArray検索
    const weeks = periodRange?.weeks || [];
    const evalsAll = weeks.length > 0
      ? await db.query.evaluations.findMany({ where: inArray(evaluations.week, weeks) })
      : [];
    const usersAll = await db.query.users.findMany({});
    allRankings = [];
    usersAll.forEach(u => {
      if (u.role !== roleForRanking) return;
      const userEvals = evalsAll.filter(e => e.userId === u.id);
      if (userEvals.length === 0) return;
      const totalPoints = userEvals.reduce((sum, ev) => sum + (ev.totalPoints ?? 0), 0);
      allRankings.push({ userId: u.id, totalPoints: Math.floor(totalPoints), name: u.name });
    });
    allRankings.sort((a, b) => b.totalPoints - a.totalPoints);
    const userEvals = evalsAll.filter(e => e.userId === developerId);
    if (userEvals.length > 0) {
      const tier = (developer.tier !== undefined && developer.tier !== null && String(developer.tier) !== '')
        ? `tier${String(developer.tier).replace('T', '')}`.toLowerCase()
        : 'tier3';
      const profileData = developer.profile ?? {};
      const totalPoints = Math.floor(userEvals.reduce((sum, ev) => sum + (ev.totalPoints ?? 0), 0));
      const allPoints = allRankings.map(r => r.totalPoints);
      const deviationScore = calculateDeviationScore(totalPoints, allPoints);
      const rank = allRankings.findIndex(r => r.userId === developerId) + 1;
      developerDetail = {
        id: developer.id,
        name: developer.name,
        rank,
        deepScore: Math.round(average(userEvals.map(e => e.qualityScore ?? 0)) * 100) / 100,
        shallowPoints: sum(userEvals.map(e => e.quantityPoints ?? 0)),
        humanScore: Math.round(average(userEvals.map(e => e.satisfactionScore ?? 0)) * 100) / 100,
        totalScore: totalPoints,
        processQualityScore: Math.round(average(userEvals.map(e => e.processQualityScore ?? 0)) * 100) / 100,
        consistencyScore: Math.round(average(userEvals.map(e => e.consistencyScore ?? 0)) * 100) / 100,
        deviationScore,
        trend: (userEvals[userEvals.length - 1]?.trend as 'up'|'down'|'stable') ?? 'stable',
        completedProjects: sum(userEvals.map(e => e.completedProjects ?? 0)),
        tier,
        role: developer.role,
        skills: profileData?.skills || [],
        evaluationBreakdown: {
          deepEvaluation: {
            requirementCoverage: Math.round(average(userEvals.map(e => e.requirementCoverage ?? 0)) * 100) / 100,
            testCoverage: Math.round(average(userEvals.map(e => e.testCoverage ?? 0)) * 100) / 100,
            seniorReviewScore: Math.round(average(userEvals.map(e => e.seniorReviewScore ?? 0)) * 100) / 100,
            aiCrossEvaluation: Math.round(average(userEvals.map(e => e.aiCrossEvaluation ?? 0)) * 100) / 100,
          },
          shallowEvaluation: {
            commitQuality: Math.round(average(userEvals.map(e => e.commitQuality ?? 0)) * 100) / 100,
            processConsistency: Math.round(average(userEvals.map(e => e.processConsistency ?? 0)) * 100) / 100,
            developmentRhythm: Math.round(average(userEvals.map(e => e.developmentRhythm ?? 0)) * 100) / 100,
            problemSolvingApproach: Math.round(average(userEvals.map(e => e.problemSolvingApproach ?? 0)) * 100) / 100,
          },
          humanEvaluation: {
            requirementAlignment: Math.round(average(userEvals.map(e => e.requirementAlignment ?? 0)) * 100) / 100,
            processQuality: Math.round(average(userEvals.map(e => e.processQuality ?? 0)) * 100) / 100,
            businessValue: Math.round(average(userEvals.map(e => e.businessValue ?? 0)) * 100) / 100,
            usability: Math.round(average(userEvals.map(e => e.usability ?? 0)) * 100) / 100,
          },
        },
        processMetrics: {
          totalCommits: sum(userEvals.map(e => {
            const metrics = e.processMetrics as { totalCommits?: number } | null;
            return metrics?.totalCommits ?? 0;
          })),
          purposefulCommits: sum(userEvals.map(e => {
            const metrics = e.processMetrics as { purposefulCommits?: number } | null;
            return metrics?.purposefulCommits ?? 0;
          })),
          averageCommitFrequency: Math.round(average(userEvals.map(e => {
            const metrics = e.processMetrics as { averageCommitFrequency?: number } | null;
            return metrics?.averageCommitFrequency ?? 0;
          })) * 100) / 100,
          developmentContinuity: Math.round(average(userEvals.map(e => {
            const metrics = e.processMetrics as { developmentContinuity?: number } | null;
            return metrics?.developmentContinuity ?? 0;
          })) * 100) / 100,
        },
        recentProjects: [],
        evaluationHistory: [],
        capabilityManager: capabilityManager ? { name: capabilityManager.name, role: capabilityManager.role, tier: capabilityManager.tier } : null,
        projectManager: projectManager ? { name: projectManager.name, role: projectManager.role, tier: projectManager.tier } : null,
        monthlySalary: period === 'month' ? developer.monthlySalary : undefined,
      };
    }
  }
  // 週次・月次・半期以外はnull（拡張可）
  return json({ developer: developerDetail, period, user: { id: user.id }, periodRange });
}

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

const getScoreColor = (score: number) => {
  if (score >= 90) return "text-green-600";
  if (score >= 80) return "text-blue-600";
  if (score >= 70) return "text-yellow-600";
  return "text-red-600";
};

const getRoleBadge = (role: string) => {
  const roleConfig = {
    // 色分けをより明確にしました
    'SUPERUSER': { label: 'SUPERUSER', color: 'bg-pink-100 text-pink-800 border-pink-200' },      // ピンク系（特別感）
    'ADMIN': { label: 'ADMIN', color: 'bg-red-100 text-red-800 border-red-200' },                  // レッド系（管理者）
    'REQUESTOR': { label: 'REQUESTOR', color: 'bg-yellow-100 text-yellow-800 border-yellow-200' }, // イエロー系（依頼者）
    'CORP': { label: 'CORP', color: 'bg-blue-100 text-blue-800 border-blue-200' },                 // ブルー系（法人）
    'ENGINEER': { label: 'ENGINEER', color: 'bg-green-100 text-green-800 border-green-200' },      // グリーン系（エンジニア）
    'DESIGNER': { label: 'DESIGNER', color: 'bg-purple-100 text-purple-800 border-purple-200' },   // パープル系（デザイナー）
    'OPERATOR': { label: 'OPERATOR', color: 'bg-orange-100 text-orange-800 border-orange-200' },   // オレンジ系（オペレーター）
  };
  
  const config = roleConfig[role as keyof typeof roleConfig] || roleConfig.ENGINEER;
  return (
    <Badge variant="outline" className={`text-xs px-1 py-0.5 ${config.color}`}>
      {config.label}
    </Badge>
  );
};

type LoaderData = {
  developer: DeveloperDetail | null;
  period: string;
  user?: { id: string };
};
export default function RankingDetailPage() {
  const { developer, period, user, periodRange } = useLoaderData<LoaderData & { periodRange?: { start: string, end: string } }>();
  const isSelf = user && developer && user.id === developer.id;
  
  const getTabClass = (active: boolean) =>
    active
      ? "border-b-2 border-blue-600 text-blue-600 font-bold"
      : "text-gray-500 hover:text-blue-600";

  // タブUI
  const periodTabs: Array<{ label: string; value: string; href?: string }> = [
    { label: "Weekly", value: "week" },
    { label: "Monthly", value: "month" },
    { label: "Half-year", value: "half" },
    // ...(isSelf ? [{ label: "Salary", value: "salary", href: "/system/users" }] : []),
  ];

  // loader内で定義したPreEvaluationWithName型をコンポーネントスコープにも定義
  type PreEvaluationWithName = WeeklyPreEvaluation & { evaluatorName: string };

  // 評価詳細ブレークダウンのデータソースをpreEvaluations[0]優先に
  const breakdownSource = (period === 'week' && developer?.preEvaluations && developer.preEvaluations.length > 0)
    ? developer.preEvaluations[0]
    : developer?.evaluationBreakdown;

  // breakdownSourceから値を取得するユーティリティ
  function getBreakdownValue(key: string, group?: string) {
    if (!breakdownSource) return 0;
    // preEvaluation（フラット）
    if (period === 'week' && developer?.preEvaluations && developer.preEvaluations.length > 0) {
      return (breakdownSource as any)[key] ?? 0;
    }
    // evaluationBreakdown（ネスト）
    if (group && (breakdownSource as any)[group] && key in (breakdownSource as any)[group]) {
      return (breakdownSource as any)[group][key] ?? 0;
    }
    return 0;
  }

  // pre-evaluation優先、なければevaluationBreakdownで補完
  function getMergedBreakdownValue(key: string, group?: string) {
    // pre-evaluation（週次のみ・1件目）優先
    if (period === 'week' && developer?.preEvaluations && developer.preEvaluations.length > 0) {
      const pre = developer.preEvaluations[0];
      if (pre[key] !== undefined && pre[key] !== null) return pre[key];
    }
    // evaluationBreakdown（集計値）で補完
    if (group && developer?.evaluationBreakdown && developer.evaluationBreakdown[group] && key in developer.evaluationBreakdown[group]) {
      return (developer.evaluationBreakdown as any)[group][key] ?? 0;
    }
    return 0;
  }

  // system.evaluations.$id.tsxを参考にしたパラメータ一覧
  const breakdownParams = [
    // 成果物品質評価
    { key: 'qualityScore', label: 'Requirement/Test Case', unit: 'pt' },
    { key: 'requirementCoverage', label: 'Requirement Coverage', unit: '%' },
    { key: 'testCoverage', label: 'Test Coverage', unit: '%' },
    { key: 'seniorReviewScore', label: 'Senior Review', unit: 'pt' },
    { key: 'aiCrossEvaluation', label: 'AI Cross Evaluation', unit: 'pt' },
    // 成果量評価
    { key: 'quantityPoints', label: 'Implementation Volume', unit: 'pt' },
    { key: 'functionFp', label: 'Function FP', unit: 'FP' },
    { key: 'addedLines', label: 'Added Lines', unit: 'lines' },
    { key: 'deletedLines', label: 'Deleted Lines', unit: 'lines' },
    { key: 'commitCount', label: 'Commit Count', unit: 'times' },
    { key: 'commitQuality', label: 'Requirement Response', unit: 'pt' },
    { key: 'processConsistency', label: 'Process Consistency', unit: 'pt' },
    { key: 'developmentRhythm', label: 'Development Rhythm', unit: 'pt' },
    { key: 'problemSolvingApproach', label: 'Problem Solving', unit: 'pt' },
    // 依頼者評価
    { key: 'satisfactionScore', label: 'Satisfaction', unit: 'pt' },
    { key: 'requirementAlignment', label: 'Requirement Alignment', unit: 'pt' },
    { key: 'processQuality', label: 'Process Quality', unit: 'pt' },
    { key: 'businessValue', label: 'Business Value', unit: 'pt' },
    { key: 'usability', label: 'Usability', unit: 'pt' },
    // ペナルティ・ボーナス
    { key: 'penaltyPoints', label: 'Penalty Points', unit: 'pt' },
    { key: 'penaltyRate', label: 'Penalty Rate', unit: '%' },
    { key: 'penaltyReason', label: 'Penalty Reason', unit: '' },
    { key: 'bonusPoints', label: 'Bonus Points', unit: 'pt' },
    { key: 'bonusReason', label: 'Bonus Reason', unit: '' },
  ];

  // 各評価タイプごとのパラメータ定義
  const breakdownTypeParams = {
    quality: [
      { key: 'qualityScore', label: 'Requirement/Test Case', unit: 'pt' },
      { key: 'requirementCoverage', label: 'Requirement Coverage', unit: '%' },
      { key: 'testCoverage', label: 'Test Coverage', unit: '%' },
      { key: 'seniorReviewScore', label: 'Senior Review', unit: 'pt' },
      { key: 'aiCrossEvaluation', label: 'AI Cross Evaluation', unit: 'pt' },
    ],
    quantity: [
      { key: 'quantityPoints', label: 'Implementation Volume', unit: 'pt' },
      { key: 'functionFp', label: 'Function FP', unit: 'FP' },
      { key: 'addedLines', label: 'Added Lines', unit: 'lines' },
      { key: 'deletedLines', label: 'Deleted Lines', unit: 'lines' },
      { key: 'commitCount', label: 'Commit Count', unit: 'times' },
      { key: 'commitQuality', label: 'Requirement Response', unit: 'pt' },
      { key: 'processConsistency', label: 'Process Consistency', unit: 'pt' },
      { key: 'developmentRhythm', label: 'Development Rhythm', unit: 'pt' },
      { key: 'problemSolvingApproach', label: 'Problem Solving', unit: 'pt' },
    ],
    satisfaction: [
      { key: 'satisfactionScore', label: 'Satisfaction', unit: 'pt' },
      { key: 'requirementAlignment', label: 'Requirement Alignment', unit: 'pt' },
      { key: 'processQuality', label: 'Process Quality', unit: 'pt' },
      { key: 'businessValue', label: 'Business Value', unit: 'pt' },
      { key: 'usability', label: 'Usability', unit: 'pt' },
    ],
    penalty: [
      { key: 'penaltyPoints', label: 'Penalty Points', unit: 'pt' },
      { key: 'penaltyRate', label: 'Penalty Rate', unit: '%' },
      { key: 'penaltyReason', label: 'Penalty Reason', unit: '' },
    ],
    bonus: [
      { key: 'bonusPoints', label: 'Bonus Points', unit: 'pt' },
      { key: 'bonusReason', label: 'Bonus Reason', unit: '' },
    ],
  };
  // タイプ名ラベル
  const typeLabels = {
    quality: 'Quality Evaluation',
    quantity: 'Quantity Evaluation',
    satisfaction: 'Satisfaction Evaluation',
    penalty: 'Penalty Evaluation',
    bonus: 'Bonus Evaluation',
  };
  // preEvaluationsをタイプごとにグループ化
  const preEvalByType: Record<string, PreEvaluationWithName[]> = {};
  if (developer?.preEvaluations) {
    for (const pre of developer.preEvaluations) {
      if (!preEvalByType[pre.evaluationType]) preEvalByType[pre.evaluationType] = [];
      preEvalByType[pre.evaluationType].push(pre);
    }
  }
  // bonus/penalty枠がなければ空配列で必ず用意
  for (const type of ["bonus", "penalty"]) {
    if (!preEvalByType[type]) preEvalByType[type] = [];
  }

  // タイプごとのカード色分けクラス
  const typeCardClass: Record<string, string> = {
    quality: 'bg-blue-50 border-blue-200',
    quantity: 'bg-green-50 border-green-200',
    satisfaction: 'bg-purple-50 border-purple-200',
    penalty: 'bg-red-50 border-red-200',
    bonus: 'bg-yellow-50 border-yellow-200',
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="mb-8">
          <div className="flex flex-col gap-4 mb-4 sm:flex-row sm:items-center sm:gap-6">
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild className="p-2 h-8 w-8 sm:h-auto sm:w-auto">
                <Link to="/system/ranking">
                  <ArrowLeft className="w-5 h-5 sm:w-4 sm:h-4 mr-0 sm:mr-2" />
                  <span className="hidden sm:inline">Back to Ranking List</span>
                </Link>
              </Button>
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 break-words">{developer?.name || 'Developer'} Details</h1>
              <p className="text-gray-600 text-sm sm:text-base">Comprehensive evaluation of developers based on 3-Axis System</p>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2 sm:mt-0">
              {developer && getTierBadge(developer.tier)}
              <div className="text-xs sm:text-sm text-gray-600">
                {developer && (() => {
                  const tierKey = developer.tier as TierLevel;
                  const tierInfo = TIER_LEVELS[tierKey] || TIER_LEVELS.tier3;
                  return tierInfo.name;
                })()}
              </div>
              {developer && getTrendIcon(developer.trend)}
            </div>
          </div>
          {/* 期間範囲表示 */}
          {periodRange && (
            <div className="mb-2 text-blue-700 font-semibold text-lg">
              Period: {periodRange.start} - {periodRange.end}
            </div>
          )}
        </div>

        {/* タブ */}
        <div className="flex space-x-8 border-b mb-6">
          {periodTabs.map(tab => (
            tab.href ? (
              <Link
                key={tab.value}
                to={tab.href}
                className="pb-2 px-1 text-blue-600 font-bold border-b-2 border-blue-600"
              >
                {tab.label}
              </Link>
            ) : (
              <Link
                key={tab.value}
                to={`?period=${tab.value}`}
                className={`pb-2 px-1 ${getTabClass(period === tab.value)}`}
                prefetch="intent"
                replace
              >
                {tab.label}
              </Link>
            )
          ))}
        </div>

        {!developer ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No data for this period</div>
          </div>
        ) : (
          <>
        {/* 3軸評価スコア */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3-Axis Evaluation Scores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-blue-800">Quality Evaluation (Deliverable-focused)</CardTitle>
                <Brain className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">{developer.deepScore.toFixed(2)}pt</div>
                <p className="text-xs text-blue-700 mt-1">
                  Requirement/Test Case, Senior Review
                </p>
                <Progress value={developer.deepScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-green-800">Quantity Evaluation (Process-focused)</CardTitle>
                <GitBranch className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{developer.shallowPoints.toLocaleString()}pt</div>
                <p className="text-xs text-green-700 mt-1">
                  Process/Quantity Focus | Commit History/Continuity
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-purple-800">Satisfaction Evaluation</CardTitle>
                <Users className="h-4 w-4 text-purple-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{developer.humanScore.toFixed(2)}pt</div>
                <p className="text-xs text-purple-700 mt-1">
                  Requirement Alignment/Process Quality
                </p>
                <Progress value={developer.humanScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-yellow-800">
                  Total Points
                </CardTitle>
                <Trophy className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {developer.totalScore.toLocaleString()}pt
                </div>
                <div className="flex items-center justify-between mt-1">
                  <p className="text-xs text-yellow-700">
                    Absolute value points of 3-Axis Evaluation
                  </p>
                  {/* <div className={`text-sm font-medium ${getDeviationScoreColor(developer.deviationScore)}`}>
                    偏差値: {developer.deviationScore.toFixed(1)}
                  </div> */}
                </div>
                {/* <div className="mt-2">
                  <div className="text-xs text-gray-600 mb-1">
                    偏差値
                  </div>
                  <Progress value={developer.deviationScore} className="w-full" />
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  {developer.deviationScore >= 70 ? "優秀" : 
                   developer.deviationScore >= 60 ? "良好" : 
                   developer.deviationScore >= 50 ? "平均" : 
                   developer.deviationScore >= 40 ? "やや低い" : "低い"}
                </div> */}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* 評価詳細ブレークダウン */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Evaluation Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">


                  {/* タイプごとにまとめた評価詳細ブレークダウン */}
                  <div>
                    <div className="space-y-6">
                      {(Object.entries(breakdownTypeParams) as [keyof typeof breakdownTypeParams, typeof breakdownTypeParams[keyof typeof breakdownTypeParams]][]).map(([type, params]) => (
                        <div key={type} className={`border rounded p-3 ${typeCardClass[type] || 'bg-blue-50 border-blue-200'}`}>
                          <div className="font-bold text-blue-900 mb-2">{typeLabels[type as keyof typeof typeLabels]}</div>
                          {/* タイプごとのスコア・ポイントを大きく表示 */}
                          {type === 'quality' && (
                            <div className="text-2xl font-bold text-blue-700 mb-2">{developer.deepScore.toFixed(2)}pt</div>
                          )}
                          {type === 'quantity' && (
                            <div className="text-2xl font-bold text-green-700 mb-2">{developer.shallowPoints.toLocaleString()}pt</div>
                          )}
                          {type === 'satisfaction' && (
                            <div className="text-2xl font-bold text-purple-700 mb-2">{developer.humanScore.toFixed(2)}pt</div>
                          )}
                          {preEvalByType[type]?.length > 0 ? (
                            (() => {
                              const preObjs = preEvalByType[type] as unknown as Record<string, unknown>[];
                              return preObjs.map((pre, idx) => {
                                const preObj = pre as any;
                                return (
                                  <div key={idx} className="mb-2">
                                    <div className="text-xs text-gray-500 mb-1">Evaluator: {String(preObj["evaluatorName"] ?? preObj["evaluatorId"] ?? "-")}</div>
                                    <div className="grid grid-cols-2 gap-4">
                                      {params.map(({ key, label, unit }) => (
                                        <div className="flex justify-between items-center" key={key}>
                                          <span className="text-sm">{label}</span>
                                          <Badge variant="outline">{String(preObj[key] ?? '-')}{unit}</Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                );
                              }) as React.ReactNode[];
                            })()
                          ) : (
                            <div className="text-gray-400 text-sm py-2">No data</div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>



                </div>
              </CardContent>
            </Card>
          </div>

          {/* 基本情報 */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5" />
                  Basic Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Tier</span>
                    <div className="flex flex-col items-end gap-1">
                      <div className="flex items-center gap-0.5">
                            {developer && (() => {
                              const tierKey = developer.tier as TierLevel;
                          const tierNum = parseInt(tierKey.replace('tier', '')) || 0;
                          return Array.from({ length: tierNum }, (_, i) => (
                            <Star key={i} size={10} className="fill-yellow-400 text-yellow-400" />
                          ));
                        })()}
                      </div>
                      <span className="font-bold text-gray-900 text-xs">
                            {developer && (() => {
                              const tierKey = developer.tier as TierLevel;
                          const tierInfo = TIER_LEVELS[tierKey] || TIER_LEVELS.tier3;
                          return tierInfo.name;
                        })()}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Capability Manager</span>
                    <span className="font-bold text-gray-900 text-xs">
                      {developer.capabilityManager ? `${developer.capabilityManager.name} (${developer.capabilityManager.role}/${developer.capabilityManager.tier})` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Project Manager</span>
                    <span className="font-bold text-gray-900 text-xs">
                      {developer.projectManager ? `${developer.projectManager.name} (${developer.projectManager.role}/${developer.projectManager.tier})` : "-"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Points</span>
                    <span className="font-bold text-blue-600">{developer.totalScore.toLocaleString()}</span>
                  </div>
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">偏差値</span>
                    <span className={`font-bold ${getDeviationScoreColor(developer.deviationScore)}`}>
                      {developer.deviationScore.toFixed(1)}
                    </span>
                  </div> */}
                  {/* <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">完了プロジェクト</span>
                        <span className="font-bold text-green-600">{developer.completedProjects || 0}件</span>
                  </div> */}
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Skills</span>
                    <div className="flex flex-wrap gap-1">
                          {developer?.skills.slice(0, 3).map((skill: string, index: number) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Role</span>
                        {developer && getRoleBadge(developer.role)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 個別評価・コメント（週次のみ） */}
        {period === 'week' && developer?.preEvaluations && developer.preEvaluations.length > 0 && (
          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-cyan-600" />
                  Individual Evaluations & Comments (Evidence)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm border">
                    <thead>
                      <tr className="bg-cyan-50">
                        <th className="px-3 py-2 border">Evaluator</th>
                        <th className="px-3 py-2 border">Role</th>
                        <th className="px-3 py-2 border">Type</th>
                        <th className="px-3 py-2 border">Comment</th>
                        <th className="px-3 py-2 border">Evaluation Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {developer.preEvaluations.map((pre: PreEvaluationWithName, idx) => (
                        <tr key={pre.id || idx} className="border-b">
                          <td className="px-3 py-2 border whitespace-nowrap">{
                            pre.evaluatorId === 'admin-user-id'
                              ? 'Debug Batch'
                              : pre.evaluatorName || '-'
                          }</td>
                          <td className="px-3 py-2 border whitespace-nowrap">{
                            pre.evaluatorRole === 'capability_supervisor' ? 'Capability Manager' :
                            pre.evaluatorRole === 'project_supervisor' ? 'Project Manager' :
                            pre.evaluatorRole === 'admin' ? 'Admin' : pre.evaluatorRole || '-'
                          }</td>
                          <td className="px-3 py-2 border text-center">
                            {(() => {
                              switch (pre.evaluationType) {
                                case 'quality': return 'Quality Evaluation';
                                case 'quantity': return 'Quantity Evaluation';
                                case 'satisfaction': return 'Satisfaction Evaluation';
                                case 'penalty': return 'Penalty Evaluation';
                                case 'bonus': return 'Bonus Evaluation';
                                default: return pre.evaluationType;
                              }
                            })()}
                          </td>
                          <td className="px-3 py-2 border whitespace-pre-line break-words max-w-xs">{pre.comments || '-'}</td>
                          <td className="px-3 py-2 border whitespace-nowrap">{pre.completedAt ? new Date(pre.completedAt).toLocaleDateString() : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
          </>
        )}
        {/* 給与情報（自分自身のみ表示） */}
        {/* {isSelf && period === "month" && developer?.monthlySalary !== undefined && (
          <div className="mt-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  給与情報（月次）
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-lg text-gray-900 font-bold">
                  月額給与: {developer.monthlySalary?.toLocaleString()} 円
                </div>
              </CardContent>
            </Card>
          </div>
        )} */}
      </div>
    </div>
  );
} 