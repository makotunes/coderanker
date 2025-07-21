import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { users, evaluations, baseSalaryConfigs, incentiveConfigs, allowanceConfigs } from "~/db/schema";
import { desc, sql, lte, inArray, and } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "~/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import { calculateSalaryWithConfig } from "~/lib/salary-calculator.server";
import { BarChart3, Users, ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";
import { useNavigate, useLocation } from "@remix-run/react";
import { getMajorityWeeksInMonth, getMajorityWeeksWithDates } from "~/lib/evaluation-calculator";



export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  // console.log("USER=",user)
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }

  const url = new URL(request.url);
  
  // 前月度を計算
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
  
  const selectedMonth = url.searchParams.get("month") || lastMonthStr; // デフォルトは前月度

  // year, monthをselectedMonthから取得
  const [year, month] = selectedMonth.split('-').map(Number);

  // 指定月の週数を計算
  const getWeeksInMonth = (yearMonth: string) => {
    const [year, month] = yearMonth.split('-').map(Number);
    // month-1: 0-based
    return getMajorityWeeksInMonth(year, month - 1).length;
  };
  
  const expectedEvaluationsPerMonth = getWeeksInMonth(selectedMonth);
  // console.log(`Expected evaluations per month for ${selectedMonth}: ${expectedEvaluationsPerMonth}`);

  // 該当週と日付リスト
  const weeksWithDates = getMajorityWeeksWithDates(year, month - 1);
  const weeksInMonth = getMajorityWeeksInMonth(year, month - 1);

  // 指定月時点での有効ユーザーを動的に算出
  // created_at <= selectedMonth AND (retiredAt IS NULL OR retiredAt > selectedMonth)
  const allUsers = await db
    .select()
    .from(users)
    .where(
      sql`${users.createdAt} <= ${selectedMonth + '-31'} AND (${users.retiredAt} IS NULL OR ${users.retiredAt} > ${selectedMonth})`
    )
    .orderBy(desc(users.createdAt));
  // 各ユーザーの月次評価件数を「該当週リスト」で集計
  const usersWithPoints = await Promise.all(
    allUsers.map(async (user) => {
      // 指定月の該当週リストで評価を取得
      const monthlyEvaluations = await db
        .select()
        .from(evaluations)
        .where(
          and(
            sql`${evaluations.userId} = ${user.id}`,
            inArray(evaluations.week, weeksInMonth)
          )
        );
      // 月次総合ポイントを集計
      const monthlyTotalPoints = monthlyEvaluations.reduce((sum, evaluation) => {
        return sum + (evaluation.totalPoints || 0);
      }, 0);
      
      // 評価達成率を計算（評価対象者のみ）
      const evaluationCompletionRate = user.isEvaluated ? 
        Math.round((monthlyEvaluations.length / expectedEvaluationsPerMonth) * 100) : 0;
      return {
        ...user,
        monthlyTotalPoints,
        evaluationCount: monthlyEvaluations.length,
        evaluationCompletionRate
      };
    })
  );
  // 全ユーザーのポイントを収集（インセンティブ計算用、ADMINは除外）
  const allUsersPoints = usersWithPoints.filter(u => u.isEvaluated).map(u => u.monthlyTotalPoints || 0);
  
  // 指定月の給与設定を取得
  const baseSalaryConfigsForMonth = await db
    .select()
    .from(baseSalaryConfigs)
    .where(lte(baseSalaryConfigs.effectiveMonth, selectedMonth))
    .orderBy(desc(baseSalaryConfigs.effectiveMonth), desc(baseSalaryConfigs.createdAt));

  const incentiveConfig = await db
    .select()
    .from(incentiveConfigs)
    .where(lte(incentiveConfigs.effectiveMonth, selectedMonth))
    .orderBy(desc(incentiveConfigs.effectiveMonth), desc(incentiveConfigs.createdAt))
    .limit(1);

  const allowanceConfig = await db
    .select()
    .from(allowanceConfigs)
    .where(lte(allowanceConfigs.effectiveMonth, selectedMonth))
    .orderBy(desc(allowanceConfigs.effectiveMonth), desc(allowanceConfigs.createdAt))
    .limit(1);

  // 各ユーザーの給与計算をサーバーサイドで実行
  const allUsersWithPoints = usersWithPoints.map(u => ({
    role: u.role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
    tier: u.tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
    employmentType: u.employmentType as "Employee" | "Contracted" | "Exective" | "Assignee" | "Guest",
    monthlyTotalPoints: u.monthlyTotalPoints
  }));
  const usersWithSalary = await Promise.all(
    usersWithPoints.map(async (user) => {
      const sameRoleUsers = allUsersWithPoints.filter(u => u.role === user.role);
      const salary = await calculateSalaryWithConfig(
        {
          role: user.role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
          tier: user.tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
          employmentType: user.employmentType as "Employee" | "Contracted" | "Exective" | "Assignee" | "Guest"
        },
        user.monthlyTotalPoints || 0,
        [],
        selectedMonth,
        sameRoleUsers
      );
      return {
        ...user,
        salary
      };
    })
  );

  console.log(usersWithSalary)
  
  // console.log(`Final users count: ${usersWithSalary.length}`);
  // console.log(`Users with evaluations: ${usersWithSalary.filter(u => u.evaluationCount > 0).length}`);
  // console.log(`Users without evaluations: ${usersWithSalary.filter(u => u.evaluationCount === 0).length}`);

  return json({ 
    users: usersWithSalary, 
    selectedMonth, 
    allUsersPoints,
    baseSalaryConfigsForMonth,
    incentiveConfig: incentiveConfig[0] || null,
    allowanceConfig: allowanceConfig[0] || null,
    weeksWithDates, // 追加
    expectedEvaluationsPerMonth, // 追加
    weeksInMonth // 追加
  });
}





export default function UserManagement() {
  const { users, selectedMonth, baseSalaryConfigsForMonth, incentiveConfig, allowanceConfig, weeksWithDates, expectedEvaluationsPerMonth } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const location = useLocation();
  

  
  // フィルタ・ソート状態
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [showRetired, setShowRetired] = useState(false);
  const [sortField, setSortField] = useState<string>("netAmount");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  // 月選択ハンドラー
  const handleMonthChange = (month: string) => {
    const params = new URLSearchParams(location.search);
    params.set("month", month);
    navigate(`?${params.toString()}`);
  };

  // 月名を日本語で表示する関数
  const getMonthTitle = (ym: string) => {
    const [year, month] = ym.split('-').map(Number);
    const payYear = month === 12 ? year + 1 : year;
    const payMonth = month === 12 ? 1 : month + 1;
    return { main: `${year}年${month}月度給与`, pay: `（支払いは${payYear}年${payMonth}月25日）` };
  };

  const roles = ["ADMIN", "CORP", "ENGINEER", "DESIGNER", "OPERATOR", "SUPERUSER"];
  const allTiers = ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"];
  
  // フィルタ・ソート機能付きのユーザーリスト
  const getFilteredAndSortedUsers = () => {
    // サーバーサイドで計算済みの給与データを使用
    const usersWithSalary = users.map(user => {
      if (!user.isEvaluated) {
        return {
          ...user,
          baseSalary: 0,
          netAmount: 0,
          monthlyReward: 0,
          incentiveAmount: 0,
          allowance: 0,
          grossAmount: 0,
          unitPrice: 0
        };
      }
      // サーバーサイドで計算された給与データを使用
      const salary = user.salary || {
        baseSalary: 0,
        incentiveAmount: 0,
        allowance: 0
      };
      // 手当はサーバーサイドで既にemploymentTypeに基づいて計算済み
      const allowance = salary.allowance || 0;
      // 単価（税込）= 基本給 + インセンティブ + 手当
      const unitPrice = (salary.baseSalary || 0) + (salary.incentiveAmount || 0) + allowance;
      // 支払い総額 = 単価 × 0.9 × FTE
      const fte = user.fte || 1;
      const payment = Math.round(unitPrice * 0.9 * fte);
      // console.log(salary)
      // console.log(salary.baseSalary, salary.incentiveAmount, salary.allowance, payment)
      return {
        ...user,
        netAmount: payment,
        baseSalary: salary.baseSalary || 0,
        monthlyReward: salary.baseSalary || 0,
        incentiveAmount: salary.incentiveAmount || 0,
        allowance,
        grossAmount: payment,
        unitPrice: unitPrice
      };
    });

    // ロールフィルタ
    let filteredUsers = usersWithSalary;
    if (roleFilter !== "all") {
      filteredUsers = usersWithSalary.filter(user => user.role === roleFilter);
    }

    // 退職者フィルタ
    if (!showRetired) {
      filteredUsers = filteredUsers.filter(user => !user.retiredAt);
    }

    // ADMIN/REQUESTOR除外
    filteredUsers = filteredUsers.filter(user => user.isEvaluated);

    // ソート
    filteredUsers.sort((a, b) => {
      const aValue = a[sortField as keyof typeof a];
      const bValue = b[sortField as keyof typeof b];
      
      // 数値の場合は数値として比較
      if (typeof aValue === "number" && typeof bValue === "number") {
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue;
      }
      
      // 文字列の場合は文字列として比較
      if (typeof aValue === "string" && typeof bValue === "string") {
        return sortDirection === "asc" 
          ? aValue.localeCompare(bValue) 
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    return filteredUsers;
  };

  const filteredUsers = getFilteredAndSortedUsers();

  // ソート処理
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("desc");
    }
  };

  // 統計データを計算（ADMINは除外）
  const calculateStatistics = () => {
    const userSalaries = filteredUsers.filter(user => user.isEvaluated).map(user => {
      return {
        ...user,
        netAmount: user.netAmount
      };
    });

    // 評価達成率の統計を計算
    const evaluationStats = filteredUsers.filter(user => user.isEvaluated);
    const totalEvaluations = evaluationStats.reduce((sum, u) => sum + (u.evaluationCount || 0), 0);
    const totalExpectedEvaluations = evaluationStats.length * expectedEvaluationsPerMonth; // 実際の週数を使用
    const overallCompletionRate = totalExpectedEvaluations > 0 ? 
      Math.round((totalEvaluations / totalExpectedEvaluations) * 100) : 0;
    const avgCompletionRate = evaluationStats.length > 0 ? 
      Math.round(evaluationStats.reduce((sum, u) => sum + (u.evaluationCompletionRate || 0), 0) / evaluationStats.length) : 0;

    // 総合ポイント合計を計算
    const totalPoints = userSalaries.reduce((sum: number, u) => sum + Math.floor(u.monthlyTotalPoints || 0), 0);
    
    // 支払い総額を計算
    const totalPayment = userSalaries.reduce((sum: number, u) => sum + Math.round(((u.baseSalary || 0) + (u.incentiveAmount || 0) + (u.allowance || 0)) * 0.9), 0);
    
    // 評価件数補正済み組織効率を計算（1評価あたりの効率）
    const adjustedOrganizationalEfficiency = totalPayment > 0 && totalEvaluations > 0 
      ? (totalPoints / totalEvaluations) / (totalPayment / totalEvaluations) 
      : 0;

    // 全ロール統計（ADMIN除外）
    const allRolesStats = {
      totalPayment,
      minPayment: userSalaries.length > 0 ? Math.min(...userSalaries.map(u => u.netAmount)) : 0,
      maxPayment: userSalaries.length > 0 ? Math.max(...userSalaries.map(u => u.netAmount)) : 0,
      avgPayment: userSalaries.length > 0 ? Math.round(userSalaries.reduce((sum: number, u) => sum + u.netAmount, 0) / userSalaries.length) : 0,
      userCount: userSalaries.length,
      totalPoints,
      adjustedOrganizationalEfficiency,
      totalEvaluations,
      overallCompletionRate,
      avgCompletionRate
    };

    // ロールごと統計（ADMIN除外）
    const roleStats = roles.filter(role => role !== "ADMIN").map(role => {
      const roleUsers = userSalaries.filter(u => u.role === role);
      const roleEvaluationUsers = evaluationStats.filter(u => u.role === role);
      
      if (roleUsers.length === 0) {
        return {
          role,
          totalPayment: 0,
          minPayment: 0,
          maxPayment: 0,
          avgPayment: 0,
          userCount: 0,
          totalEvaluations: 0,
          completionRate: 0
        };
      }
      
      const roleTotalEvaluations = roleEvaluationUsers.reduce((sum, u) => sum + (u.evaluationCount || 0), 0);
      const roleExpectedEvaluations = roleEvaluationUsers.length * expectedEvaluationsPerMonth; // 実際の週数を使用
      const roleCompletionRate = roleExpectedEvaluations > 0 ? 
        Math.round((roleTotalEvaluations / roleExpectedEvaluations) * 100) : 0;
      
      return {
        role,
        totalPayment: roleUsers.reduce((sum: number, u) => sum + u.netAmount, 0),
        minPayment: Math.min(...roleUsers.map(u => u.netAmount)),
        maxPayment: Math.max(...roleUsers.map(u => u.netAmount)),
        avgPayment: Math.round(roleUsers.reduce((sum: number, u) => sum + u.netAmount, 0) / roleUsers.length),
        userCount: roleUsers.length,
        totalEvaluations: roleTotalEvaluations,
        completionRate: roleCompletionRate
      };
    });

    return { allRolesStats, roleStats };
  };

  const { allRolesStats, roleStats } = calculateStatistics();
  


  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN": return "destructive";
      case "CORP": return "default";
      case "ENGINEER": return "secondary";
      case "DESIGNER": return "outline";
      case "OPERATOR": return "secondary";
      case "REQUESTOR": return "outline";
      case "SUPERUSER": return "destructive";
      default: return "outline";
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    const tierNum = parseInt(tier.replace("T", ""));
    if (tierNum >= 6) return "destructive";
    if (tierNum >= 4) return "default";
    return "secondary";
  };

  // console.log(filteredUsers)
  return (
    <div className="container p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-4 md:gap-6">
        <div className="w-full sm:w-auto">
          {(() => { const t = getMonthTitle(selectedMonth); return (
            <h1 className="text-2xl sm:text-3xl font-bold">
              {t.main}
              <span className="ml-2 text-base sm:text-lg font-normal text-gray-500 align-middle">{t.pay}</span>
            </h1>
          ); })()}
          <p className="text-muted-foreground">
            ユーザーの給与計算と統計を管理します
          </p>
          <div className="flex items-center gap-1 sm:gap-2 mt-1">
            <span className="text-sm text-gray-500">給与計算対象月:</span>
            <input
              type="month"
              value={selectedMonth}
              onChange={e => handleMonthChange(e.target.value)}
              className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:hover:bg-blue-100 [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
              style={{ width: 120 }}
            />
          </div>
          <p className="text-sm text-gray-500">
            ※ADMINは評価対象外のため、給与・ポイント情報は表示されません
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 w-full sm:w-auto justify-end">
          <Button 
            variant="outline" 
            onClick={() => navigate("/system/monthly-stats")}
            className="flex items-center gap-2"
          >
            <BarChart3 className="w-4 h-4" />
            月次統計
          </Button>
          <Button 
            variant="outline" 
            onClick={() => navigate("/system/user-management")}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            ユーザー管理
          </Button>
          <Dialog>
            {/* <DialogTrigger asChild>
              <Button variant="outline">給与テーブル</Button>
            </DialogTrigger> */}
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>給与テーブル</DialogTitle>
                <DialogDescription>
                  選択月({selectedMonth})時点で適用されているロール・ティアごとの基本給
                </DialogDescription>
              </DialogHeader>
              <div className="overflow-x-auto w-full">
                <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-xs sm:text-sm">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-left">ロール</th>
                      {allTiers.map(tier => (
                        <th key={tier} className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">{tier}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {['CORP', 'ENGINEER', 'DESIGNER', 'OPERATOR'].map(role => (
                      <tr key={role} className={role === 'ENGINEER' || role === 'OPERATOR' ? 'bg-gray-50' : ''}>
                        <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 font-medium">{role}</td>
                        {allTiers.map(tier => {
                          // 適用されている基本給を表示
                          const config = baseSalaryConfigsForMonth.find(
                            config => config.role === role && config.tier === tier
                          );
                          const salary = config?.baseSalary || null;
                          return (
                            <td key={tier} className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">
                              {salary ? `৳${salary.toLocaleString()}` : '-'}
                            </td>
                          );
                        })}
                    </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-2 sm:mt-4 text-xs sm:text-sm text-gray-600">
                <p><strong>インセンティブ:</strong> {incentiveConfig ? `৳${incentiveConfig.minIncentive}〜৳${incentiveConfig.maxIncentive}` : '未設定'}</p>
                <p><strong>手当:</strong> {allowanceConfig ? `${allowanceConfig.employmentType}: ৳${allowanceConfig.allowance}` : '未設定'}</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* 該当週と日付テーブル（美しいデザイン） */}
      <Card className="mb-4">
        <CardHeader>
          <CardTitle className="text-base sm:text-lg">該当週と日付</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[320px] border-collapse border border-gray-200 bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-2 py-1 text-left text-xs sm:text-sm">週番号</th>
                  <th className="border border-gray-200 px-2 py-1 text-left text-xs sm:text-sm">日付</th>
                </tr>
              </thead>
              <tbody>
                {weeksWithDates.map(({ week, dates }) => (
                  <tr key={week}>
                    <td className="border border-gray-200 px-2 py-1 font-mono text-xs sm:text-sm text-blue-700">{week}</td>
                    <td className="border border-gray-200 px-2 py-1">
                      <div className="flex flex-wrap gap-1">
                        {dates.map(date => (
                          <span key={date} className="inline-block bg-blue-100 text-blue-800 rounded px-2 py-0.5 text-xs sm:text-sm font-mono">
                            {date}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* フィルタ・ソート機能 */}
      <div className="mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
              フィルタ・ソート
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 sm:gap-4 items-center">
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm font-medium text-gray-700">ロール:</span>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-24 sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">すべて</SelectItem>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm font-medium text-gray-700">退職者:</span>
                <Select value={showRetired ? "show" : "hide"} onValueChange={(value) => setShowRetired(value === "show")}> 
                  <SelectTrigger className="w-24 sm:w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hide">非表示</SelectItem>
                    <SelectItem value="show">表示</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-sm font-medium text-gray-700">ソート:</span>
                <Select value={sortField} onValueChange={handleSort}>
                  <SelectTrigger className="w-28 sm:w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="netAmount">支払い総額(AIT10%税抜)</SelectItem>
                    <SelectItem value="name">名前</SelectItem>
                    <SelectItem value="role">ロール</SelectItem>
                    <SelectItem value="tier">ティア</SelectItem>
                    <SelectItem value="monthlySalary">基本給</SelectItem>
                    <SelectItem value="monthlyTotalPoints">総合ポイント</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                >
                  {sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                </Button>
              </div>
              <div className="text-xs sm:text-sm text-gray-500">
                表示中: {filteredUsers.length}人 / {users.length}人
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 統計情報 */}
      <div className="mb-8">
        {/* 全ロール統計 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              全ロール統計（ADMIN除外）
            </CardTitle>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">
              ※ 人数は{selectedMonth}時点での有効ユーザー数（追加日〜退職日）を動的に算出
            </p>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 sm:space-y-6">
              {/* 給与関連指標 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">給与関連指標</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                  <div className="text-center p-2 sm:p-4 bg-blue-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-blue-600">
                      ৳{allRolesStats.totalPayment.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-blue-700">支払い総額(AIT10%税抜)</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-green-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-green-600">
                      ৳{allRolesStats.minPayment.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-green-700">支払い額最低値</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-orange-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-orange-600">
                      ৳{allRolesStats.maxPayment.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-orange-700">支払い額最大値</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-purple-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      ৳{allRolesStats.avgPayment.toLocaleString()}
                    </div>
                    <div className="text-xs sm:text-sm text-purple-700">支払い総額平均</div>
                  </div>
                </div>
              </div>

              {/* 生産性・効率指標 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">生産性・効率指標</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                  <div className="text-center p-2 sm:p-4 bg-red-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-red-600">
                      {allRolesStats.totalPoints.toLocaleString()}pt
                    </div>
                    <div className="text-xs sm:text-sm text-red-700">総合ポイント合計</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-purple-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-purple-600">
                      {allRolesStats.adjustedOrganizationalEfficiency.toFixed(3)}
                    </div>
                    <div className="text-xs sm:text-sm text-purple-700">組織効率(pt/৳)</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-indigo-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-indigo-600">
                      {allRolesStats.totalEvaluations}件
                    </div>
                    <div className="text-xs sm:text-sm text-indigo-700">評価総数</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-teal-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-teal-600">
                      {allRolesStats.avgCompletionRate}%
                    </div>
                    <div className="text-xs sm:text-sm text-teal-700">評価達成率</div>
                  </div>
                </div>
              </div>

              {/* 人員指標 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">人員指標</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-4">
                  <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-gray-600">
                      {allRolesStats.userCount}人
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700">総人数</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-gray-600">
                      ৳{allRolesStats.totalPayment > 0 ? Math.round(allRolesStats.totalPayment / allRolesStats.userCount) : 0}
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700">1人あたり支払い額</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-gray-600">
                      {allRolesStats.totalEvaluations > 0 
                        ? Math.round(allRolesStats.totalPoints / allRolesStats.totalEvaluations)
                        : 0}pt
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700">1評価あたりポイント</div>
                  </div>
                  <div className="text-center p-2 sm:p-4 bg-gray-50 rounded-lg">
                    <div className="text-xl sm:text-2xl font-bold text-gray-600">
                      {allRolesStats.userCount > 0 ? Math.round(allRolesStats.totalEvaluations / allRolesStats.userCount) : 0}件
                    </div>
                    <div className="text-xs sm:text-sm text-gray-700">1人あたり評価数</div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ロールごと統計 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600" />
              ロール別統計（ADMIN除外）
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4">
              {roleStats.filter(stat => stat.userCount > 0).map((stat) => (
                <div key={stat.role} className="border rounded-lg p-2 sm:p-4">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <Badge variant="outline" className={getRoleBadgeVariant(stat.role)}>
                      {stat.role}
                    </Badge>
                    <span className="text-xs sm:text-sm text-gray-500">({stat.userCount}人)</span>
                  </div>
                  <div className="space-y-1 sm:space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">支払い総額(AIT10%税抜):</span>
                      <span className="font-medium">৳{stat.totalPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最低値:</span>
                      <span className="font-medium">৳{stat.minPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">最大値:</span>
                      <span className="font-medium">৳{stat.maxPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">平均:</span>
                      <span className="font-medium">৳{stat.avgPayment.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">評価総数:</span>
                      <span className="font-medium">{stat.totalEvaluations}件</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">評価達成率:</span>
                      <span className="font-medium">{stat.completionRate}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 評価未実施ユーザーの概要アラート */}
      {(() => {
        const usersWithoutEvaluations = filteredUsers.filter(
          user => user.isEvaluated && (!user.evaluationCount || user.evaluationCount === 0)
        );
        if (usersWithoutEvaluations.length > 0) {
          return (
            <div className="mb-4 p-2 sm:p-4 bg-yellow-50 border border-yellow-300 rounded-md">
              <div className="flex items-center gap-1 sm:gap-2 mb-2">
                <span className="text-yellow-800 font-semibold">⚠️ 評価未実施ユーザー</span>
                <Badge variant="outline" className="text-yellow-700 border-yellow-400">
                  {usersWithoutEvaluations.length}人
                </Badge>
              </div>
              <p className="text-xs sm:text-sm text-yellow-700 mb-2">
                選択月({selectedMonth})において評価データが存在しないユーザーが{usersWithoutEvaluations.length}人います。
                これらのユーザーは給与計算に影響する可能性があります。
              </p>
              <div className="text-xs text-yellow-600">
                対象ユーザー: {usersWithoutEvaluations.map(u => u.name).join(", ")}
              </div>
            </div>
          );
        }
        return null;
      })()}

      <div className="grid gap-2 sm:gap-4">
        {filteredUsers.map((user) => (
          <Card key={user.id} className={`hover:shadow-md transition-shadow duration-200 ${
            user.isEvaluated && (!user.evaluationCount || user.evaluationCount === 0) 
              ? "border-2 border-yellow-300 bg-yellow-50" 
              : ""
          }`}>
            <CardContent className="p-2 sm:p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 md:gap-6">
                {/* 左側: ユーザー基本情報 */}
                <div className="flex items-center gap-2 sm:gap-4 flex-1">
                  {/* アバター */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-base sm:text-lg">
                    {user.name.charAt(0)}
                  </div>
                  {/* ユーザー情報 */}
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900">{user.name}</h3>
                      <Badge variant={getRoleBadgeVariant(user.role)} className="text-xs px-1 sm:px-2 py-0.5">
                        {user.role}
                      </Badge>
                      <Badge variant={getTierBadgeVariant(user.tier)} className="text-xs px-1 sm:px-2 py-0.5">
                        {user.tier}
                      </Badge>
                      {/* 退職者バッジ */}
                      {user.retiredAt && (
                        <Badge variant="secondary" className="text-xs px-1 sm:px-2 py-0.5 bg-gray-500 text-white">
                          🚪 退職予定: {new Date(user.retiredAt).toLocaleDateString()}
                        </Badge>
                      )}
                      {/* 評価未実施アラート */}
                      {user.isEvaluated && (!user.evaluationCount || user.evaluationCount === 0) && (
                        <Badge variant="destructive" className="text-xs px-1 sm:px-2 py-0.5 animate-pulse">
                          ⚠️ 評価未実施
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">{user.email}</p>
                    <div className="flex flex-wrap items-center gap-1 sm:gap-4 text-xs text-gray-500">
                      <span>雇用形態: {user.employmentType}</span>
                      <span>作成日: {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                    {/* 評価未実施の詳細アラート */}
                    {user.isEvaluated && (!user.evaluationCount || user.evaluationCount === 0) && (
                      <div className="mt-1 sm:mt-2 p-1 sm:p-2 bg-red-100 border border-red-300 rounded-md">
                        <div className="flex items-center gap-1 sm:gap-2 text-xs text-red-700">
                          <span className="font-semibold">⚠️ 評価未実施</span>
                          <span>選択月({selectedMonth})において評価データが存在しません。給与計算に影響する可能性があります。</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {/* 中央: 給与情報（ADMINは除外） */}
                {user.isEvaluated ? (
                  (() => {
                    const base = user.salary?.baseSalary || 0;
                    const incentive = user.salary?.incentiveAmount || 0;
                    const allowance = user.salary?.allowance || 0;
                    const unitPrice = (base + incentive + allowance);
                    const payment = Math.round(unitPrice * 0.9 * (user.fte || 1));
                    return (
                      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 sm:gap-4 md:gap-6">
                        {/* 基本給・ポイント */}
                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">基本給</div>
                          <div className="text-base sm:text-lg font-semibold text-gray-900">৳{base.toLocaleString()}</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">総合ポイント</div>
                          <div className="text-base sm:text-lg font-semibold text-blue-600">{user.monthlyTotalPoints !== undefined ? Math.floor(user.monthlyTotalPoints).toLocaleString() : 0}pt</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">インセンティブ</div>
                          <div className="text-base sm:text-lg font-semibold text-green-600">৳{incentive.toLocaleString()}</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">手当</div>
                          <div className="text-base sm:text-lg font-semibold text-orange-600">৳{allowance.toLocaleString()}</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">単価(税込)</div>
                          <div className="text-base sm:text-lg font-semibold text-purple-600">৳{unitPrice.toLocaleString()}</div>
                        </div>
                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">FTE</div>
                          <div className="text-base sm:text-lg font-semibold text-green-600">
                            {typeof user.fte === "number" ? `${(user.fte * 100).toFixed(0)}％` : "100％"}
                          </div>
                        </div>


                        <div className="text-center min-w-[70px]">
                          <div className="text-xs sm:text-sm font-medium text-gray-600">評価達成率</div>
                          {user.evaluationCount && user.evaluationCount > 0 ? (
                            <>
                              <div className="text-base sm:text-lg font-semibold text-indigo-600">{user.evaluationCompletionRate || 0}%</div>
                              <div className="text-xs text-gray-500">({user.evaluationCount}件)</div>
                            </>
                          ) : (
                            <>
                              <div className="text-base sm:text-lg font-semibold text-red-600">未実施</div>
                              <div className="text-xs text-red-500">(0件)</div>
                            </>
                          )}
                        </div>


                        {/* 支払い総額 */}
                        <div className="text-center bg-blue-50 px-2 sm:px-4 py-1 sm:py-2 rounded-lg min-w-[90px]">
                          <div className="text-xs sm:text-sm font-medium text-blue-700">支払い総額(AIT10%税抜)</div>
                          <div className="text-lg sm:text-xl font-bold text-blue-900">৳{payment.toLocaleString()}</div>
                          <div className="text-xs text-blue-600">単価×0.9×FTE</div>
                        </div>
                      </div>
                    );
                  })()
                ) : (
                  <div className="flex items-center gap-2 sm:gap-6">
                    <div className="text-center">
                      <div className="text-xs sm:text-sm font-medium text-gray-600">評価対象外</div>
                      <div className="text-base sm:text-lg font-semibold text-gray-400">-</div>
                    </div>
                  </div>
                )}
              </div>
              {/* スキル情報 */}
              <div className="mt-2 sm:mt-4 pt-2 sm:pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="text-xs sm:text-sm font-medium text-gray-600">スキル:</span>
                  <div className="flex flex-wrap gap-1">
                    {user.profile?.skills?.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    )) || <span className="text-xs sm:text-sm text-gray-500">スキル情報なし</span>}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 