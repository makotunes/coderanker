import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { weeklyPreEvaluations, users } from "~/db/schema";
import { eq, and, desc } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Target,
  Brain,
  GitBranch,
  Users,
  AlertTriangle,
  Plus,
  Eye
} from "lucide-react";
import { useState, useMemo } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // // ADMINのみアクセス可能
  // if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
  //   throw new Response("Unauthorized, [object Object] status: 403");
  // }
  
  // 現在の週を取得
  const now = new Date();
  const currentWeek = getWeekString(now);
  
  // 評価者の役割を判定
  const evaluatorRole = getUserEvaluatorRole(user.role);
  
  // 上司が自分のものだけ表示: evaluateeIdが自分が上司のユーザーidリストに含まれるもののみ
  type TaskType = {
    id: string;
    evaluateeId: string;
    evaluatorId: string;
    week: string;
    evaluationType: string;
    evaluatorRole: string;
    status: string;
    dueDate: string;
    completedAt: string | null;
    evaluatee: {
      id: string;
      name: string;
      role: string;
      tier: string;
      capabilityManagerId: string | null;
      projectManagerId: string | null;
    };
  };
  let evaluationTasks: TaskType[] = [];
  
  // 全ユーザー共通：自分が評価者として設定されているタスクを取得
  evaluationTasks = await db
    .select({
      id: weeklyPreEvaluations.id,
      evaluateeId: weeklyPreEvaluations.evaluateeId,
      evaluatorId: weeklyPreEvaluations.evaluatorId,
      week: weeklyPreEvaluations.week,
      evaluationType: weeklyPreEvaluations.evaluationType,
      evaluatorRole: weeklyPreEvaluations.evaluatorRole,
      status: weeklyPreEvaluations.status,
      dueDate: weeklyPreEvaluations.dueDate,
      completedAt: weeklyPreEvaluations.completedAt,
      evaluatee: {
        id: users.id,
        name: users.name,
        role: users.role,
        tier: users.tier,
        capabilityManagerId: users.capabilityManagerId,
        projectManagerId: users.projectManagerId,
      }
    })
    .from(weeklyPreEvaluations)
    .innerJoin(users, eq(weeklyPreEvaluations.evaluateeId, users.id))
    .where(
      and(
        eq(weeklyPreEvaluations.week, currentWeek),
        eq(weeklyPreEvaluations.evaluatorId, user.id)
      )
    )
    .orderBy(desc(weeklyPreEvaluations.createdAt));

  // ADMIN用：全ユーザーの評価タスクを取得（デバッグ用）
  let allEvaluationTasks: TaskType[] = [];
  if (user.role === "ADMIN" || user.role === "SUPERUSER") {
    allEvaluationTasks = await db
      .select({
        id: weeklyPreEvaluations.id,
        evaluateeId: weeklyPreEvaluations.evaluateeId,
        evaluatorId: weeklyPreEvaluations.evaluatorId,
        week: weeklyPreEvaluations.week,
        evaluationType: weeklyPreEvaluations.evaluationType,
        evaluatorRole: weeklyPreEvaluations.evaluatorRole,
        status: weeklyPreEvaluations.status,
        dueDate: weeklyPreEvaluations.dueDate,
        completedAt: weeklyPreEvaluations.completedAt,
        evaluatee: {
          id: users.id,
          name: users.name,
          role: users.role,
          tier: users.tier,
          capabilityManagerId: users.capabilityManagerId,
          projectManagerId: users.projectManagerId,
        }
      })
      .from(weeklyPreEvaluations)
      .innerJoin(users, eq(weeklyPreEvaluations.evaluateeId, users.id))
      .where(eq(weeklyPreEvaluations.week, currentWeek))
      .orderBy(desc(weeklyPreEvaluations.createdAt));
  }

  // 統計情報を計算
  const stats = {
    total: evaluationTasks.length,
    pending: evaluationTasks.filter(task => task.status === "pending").length,
    completed: evaluationTasks.filter(task => task.status === "completed").length,
    overdue: evaluationTasks.filter(task => task.status === "overdue").length,
  };

  // ADMIN用：全体統計
  const allStats = (user.role === "ADMIN" || user.role === "SUPERUSER") ? {
    total: allEvaluationTasks.length,
    pending: allEvaluationTasks.filter(task => task.status === "pending").length,
    completed: allEvaluationTasks.filter(task => task.status === "completed").length,
    overdue: allEvaluationTasks.filter(task => task.status === "overdue").length,
  } : null;

  // 全ユーザー取得（上司情報用）
  const allUsers = await db.select().from(users);
  // ユーザーID→ユーザーデータMap
  type UserType = typeof allUsers[number];
  const userMap = new Map<string, UserType>();
  allUsers.forEach(u => userMap.set(u.id, u));

  // evaluatorIdは既にデータベースクエリで取得済み
  const evaluationTasksWithEvaluator = evaluationTasks;
  const allEvaluationTasksWithEvaluator = allEvaluationTasks;

  return json({ 
    user, 
    evaluationTasks: evaluationTasksWithEvaluator, 
    allEvaluationTasks: allEvaluationTasksWithEvaluator,
    currentWeek, 
    evaluatorRole, 
    stats,
    allStats,
    allUsers
  });
}

// 週文字列を取得する関数（例: 2024-W27）
function getWeekString(date: Date): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

// ユーザーの役割から評価者役割を判定
function getUserEvaluatorRole(userRole: string): string {
  switch (userRole) {
    case "SUPERUSER":
      return "superuser";
    case "ADMIN":
      return "admin";
    case "CORP":
      return "capability_supervisor";
    case "ENGINEER":
      return "project_supervisor";
    default:
      return "project_supervisor";
  }
}

// 評価タイプの表示名を取得
function getEvaluationTypeLabel(type: string): string {
  switch (type) {
    case "quality":
      return "Quality Evaluation";
    case "quantity":
      return "Quantity Evaluation";
    case "satisfaction":
      return "Satisfaction Evaluation";
    case "penalty":
      return "Penalty Evaluation";
    default:
      return type;
  }
}

// 評価タイプのアイコンを取得
function getEvaluationTypeIcon(type: string) {
  switch (type) {
    case "quality":
      return <Brain className="w-4 h-4 text-blue-600" />;
    case "quantity":
      return <GitBranch className="w-4 h-4 text-green-600" />;
    case "satisfaction":
      return <Users className="w-4 h-4 text-purple-600" />;
    case "penalty":
      return <AlertTriangle className="w-4 h-4 text-red-600" />;
    default:
      return <Target className="w-4 h-4" />;
  }
}

// ステータスのバッジを取得
function getStatusBadge(status: string) {
  switch (status) {
    case "completed":
      return <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">Completed</Badge>;
    case "pending":
      return <Badge variant="outline" className="text-yellow-700 border-yellow-400">Pending</Badge>;
    case "overdue":
      return <Badge variant="destructive">Overdue</Badge>;
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

// ステータスのアイコンを取得
function getStatusIcon(status: string) {
  switch (status) {
    case "completed":
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case "pending":
      return <Clock className="w-4 h-4 text-yellow-600" />;
    case "overdue":
      return <AlertCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
}

// ロールごとのバッジ色
const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "ADMIN": return { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" };
    case "CORP": return { variant: "default" as const, className: "bg-blue-100 text-blue-800 border-blue-200" };
    case "ENGINEER": return { variant: "secondary" as const, className: "bg-green-100 text-green-800 border-green-200" };
    case "DESIGNER": return { variant: "outline" as const, className: "bg-purple-100 text-purple-800 border-purple-200" };
    case "OPERATOR": return { variant: "default" as const, className: "bg-orange-100 text-orange-800 border-orange-200" };
    case "REQUESTOR": return { variant: "outline" as const, className: "bg-gray-100 text-gray-800 border-gray-200" };
    default: return { variant: "outline" as const, className: "" };
  }
};

export default function EvaluationsPage() {
  const { user, evaluationTasks, allEvaluationTasks, currentWeek, evaluatorRole, stats, allStats, allUsers } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  
  const [viewMode, setViewMode] = useState<"my" | "all">("my");
  // デバッグ用: ADMINが任意の評価者でフィルタ
  const [selectedEvaluatorId, setSelectedEvaluatorId] = useState<string>("");

  // 表示するタスクを決定
  // ステータス順: overdue > pending > completed
  const statusOrder = { overdue: 0, pending: 1, completed: 2 };
  let displayTasksRaw = viewMode === "all" && (user.role === "ADMIN" || user.role === "SUPERUSER") ? allEvaluationTasks : evaluationTasks;
  
  // ADMINデバッグ: 評価者IDでフィルタ
  if ((user.role === "ADMIN" || user.role === "SUPERUSER") && viewMode === "all" && selectedEvaluatorId && selectedEvaluatorId !== "-") {
    const filteredTasks = displayTasksRaw.filter(task => task.evaluatorId === selectedEvaluatorId);
    console.log(`Filtering by evaluatorId: ${selectedEvaluatorId}`);
    console.log(`Original tasks: ${displayTasksRaw.length}, Filtered tasks: ${filteredTasks.length}`);
    displayTasksRaw = filteredTasks;
  }
  
  const displayTasks = [...displayTasksRaw].sort((a, b) => {
    const aOrder = statusOrder[String(a.status) as keyof typeof statusOrder] ?? 99;
    const bOrder = statusOrder[String(b.status) as keyof typeof statusOrder] ?? 99;
    if (aOrder !== bOrder) return aOrder - bOrder;
    // 期限が近い順
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
  });
  const displayStats = viewMode === "all" && (user.role === "ADMIN" || user.role === "SUPERUSER") ? allStats : stats;

  // id→ユーザー情報Map
  const userMap = useMemo(() => {
    const map = new Map<string, { name: string; role: string; tier: string }>();
    if (allUsers) {
      for (const u of allUsers) {
        map.set(u.id, { name: u.name, role: u.role, tier: u.tier });
      }
    }
    return map;
  }, [allUsers]);

  const getManagerInfo = (managerId: string | null | undefined) => {
    if (!managerId) return "-";
    const mgr = userMap.get(managerId);
    return mgr ? `${mgr.name} (${mgr.role}/${mgr.tier})` : "-";
  };

  return (
    <div className="w-full p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">Weekly Evaluation</h1>
          <a
            href="/docs/organizational-culture"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full mt-2 mb-2 px-4 py-2 rounded bg-cyan-50 border-l-4 border-cyan-400 text-cyan-900 font-bold hover:bg-cyan-100 transition text-xs sm:text-sm"
          >
            <span className="mr-2">View Organizational Culture & Guidelines</span>
            <svg className="w-4 h-4 inline" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 17V7H7"/></svg>
          </a>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Target Week: {currentWeek} | Evaluator Role: {evaluatorRole === "admin" ? "Admin" : 
            evaluatorRole === "capability_supervisor" ? "Capability Supervisor" : "Project Supervisor"}
          </p>
          {(user.role === "ADMIN" || user.role === "SUPERUSER" )&& (
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mt-2 w-full">
              <span className="text-sm text-gray-600">Display Mode:</span>
              <Select value={viewMode} onValueChange={(value: "my" | "all") => setViewMode(value)}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="my">My Evaluation</SelectItem>
                  <SelectItem value="all">All Users (Debug)</SelectItem>
                </SelectContent>
              </Select>
              {/* デバッグ用: 任意の評価者でフィルタ */}
              {viewMode === "all" && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Evaluator Filter:</span>
                  <Select value={selectedEvaluatorId} onValueChange={setSelectedEvaluatorId}>
                    <SelectTrigger className="w-56">
                      <SelectValue placeholder="All Evaluators" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-">All Evaluators</SelectItem>
                      {allUsers?.map(u => (
                        <SelectItem key={u.id} value={u.id}>{u.name} ({u.role}/{u.tier})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {/* デバッグ情報 */}
                  <div className="text-xs text-gray-500">
                    Selected: {selectedEvaluatorId ? getManagerInfo(selectedEvaluatorId) : "None"} | 
                    Tasks: {displayTasksRaw.length} | 
                    Filtered: {selectedEvaluatorId && selectedEvaluatorId !== "-" ? displayTasksRaw.filter(task => task.evaluatorId === selectedEvaluatorId).length : "N/A"}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto flex-wrap">
          {(user.role === "ADMIN" || user.role === "SUPERUSER") && (
            <>
              <Button 
                variant="outline" 
                onClick={() => navigate("/system/evaluations/create-penalty")}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Penalty
              </Button>
              <Button 
                variant="outline" 
                onClick={() => navigate("/system/evaluations/create-bonus")}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4 text-green-600" />
                Create Bonus
              </Button>
            </>
          )}
        </div>
      </div>

      {/* 統計情報 */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              Evaluation Task Statistics
              {viewMode === "all" && (user.role === "ADMIN" || user.role === "SUPERUSER") && (
                <Badge variant="outline" className="text-xs">Debug Mode</Badge>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{displayStats?.total}</div>
                <div className="text-sm text-blue-700">Total Tasks</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <div className="text-2xl font-bold text-yellow-600">{displayStats?.pending}</div>
                <div className="text-sm text-yellow-700">Pending</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{displayStats?.completed}</div>
                <div className="text-sm text-green-700">Completed</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{displayStats?.overdue}</div>
                <div className="text-sm text-red-700">Overdue</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 評価タスク一覧 */}
      <div className="flex flex-col gap-4 w-full">
        <h2 className="text-xl font-semibold">
          Evaluation Task List
          {viewMode === "all" && (user.role === "ADMIN" || user.role === "SUPERUSER") && (
            <span className="text-sm text-gray-500 ml-2">(All Users)</span>
          )}
        </h2>
        
        {displayTasks.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <div className="text-gray-500 mb-4">
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No evaluation tasks for this week</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          displayTasks.map((task) => (
            <Card key={task.id} className="hover:shadow-md transition-shadow w-full">
              {(() => {
                const dueDate = new Date(task.dueDate);
                const now = new Date();
                const msIn24h = 24 * 60 * 60 * 1000;
                const isDueSoon = dueDate.getTime() - now.getTime() < msIn24h && task.status !== 'overdue' && task.status !== 'completed';
                if (isDueSoon) {
                  return (
                    <div className="mb-2 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 font-bold rounded">
                      Less than 24 hours left. If the evaluation is not completed, penalty points will be automatically assigned to both the evaluator and the evaluatee.
                    </div>
                  );
                }
                return null;
              })()}
              <CardContent className="p-4 sm:p-6 w-full">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                      {task.evaluatee.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold">{task.evaluatee.name}</h3>
                        <Badge {...getRoleBadgeVariant(task.evaluatee.role)} className={`text-xs ${getRoleBadgeVariant(task.evaluatee.role).className}`}>
                          {task.evaluatee.role}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.evaluatee.tier}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-cyan-50 text-cyan-800 border-cyan-200">
                          Capability: {getManagerInfo(task.evaluatee.capabilityManagerId)}
                        </Badge>
                        <Badge variant="outline" className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200">
                          Project: {getManagerInfo(task.evaluatee.projectManagerId)}
                        </Badge>
                        {viewMode === "all" && (user.role === "ADMIN" || user.role === "SUPERUSER") && (
                          <>
                            <Badge variant="outline" className="text-xs bg-purple-100 text-purple-700 border-purple-300">
                              {task.evaluatorRole}
                            </Badge>
                            <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-300">
                              Evaluator: {getManagerInfo(task.evaluatorId)}
                            </Badge>
                          </>
                        )}
                      </div>
                      <div className="flex flex-col xs:flex-row flex-wrap items-start xs:items-center gap-2 xs:gap-4 text-sm text-gray-600 mt-1">
                        <div className="flex items-center gap-1">
                          {getEvaluationTypeIcon(task.evaluationType)}
                          <span>{getEvaluationTypeLabel(task.evaluationType)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row items-end gap-2 sm:gap-4">
                    <div className="text-right">
                      <div className="flex items-center gap-2 mb-1">
                        {getStatusIcon(task.status)}
                        {getStatusBadge(task.status)}
                      </div>
                      {task.completedAt && (
                        <p className="text-xs text-gray-500">
                          Completed: {new Date(task.completedAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {viewMode === "all" && (user.role === "ADMIN" || user.role === "SUPERUSER") && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/system/evaluations/${task.id}?debug=true`)}
                          className="flex items-center gap-1"
                        >
                          <Eye className="w-3 h-3" />
                          Detail
                        </Button>
                      )}
                      <Button
                        variant={task.status === "completed" ? "outline" : task.status === "overdue" ? "destructive" : "default"}
                        size="sm"
                        onClick={() => task.status !== "overdue" && navigate(`/system/evaluations/${task.id}`)}
                        disabled={task.status === "overdue"}
                        className={task.status === "overdue" ? "opacity-60 cursor-not-allowed" : ""}
                      >
                        {task.status === "completed" ? "View Detail" : task.status === "overdue" ? "Overdue" : "Evaluate"}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
} 