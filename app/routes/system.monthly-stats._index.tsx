import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, useLocation } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { users, evaluations } from "~/db/schema";
import { desc, sql, inArray, and, eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import { calculateSalaryWithConfig } from "~/lib/salary-calculator.server";
import { BarChart3, TrendingUp, Calendar, ArrowLeft } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { getMajorityWeeksInMonth, getMajorityWeeksWithDates } from "~/lib/evaluation-calculator";

type MonthlyStats = {
  month: string;
  totalPayment: number;
  minPayment: number;
  maxPayment: number;
  avgPayment: number;
  organizationalEfficiency: number;
  totalPoints: number;
  userCount: number;
  pointsPerEvaluation: number;
  weeks: string[]; // 追加
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized, [object Object] status: 403");
  }

  const url = new URL(request.url);
  
  // 前月度を計算
  const now = new Date();
  const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonthStr = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
  
  const startMonth = url.searchParams.get("startMonth") || '2024-01';
  const endMonth = url.searchParams.get("endMonth") || lastMonthStr;

  // 指定期間の月リストを生成
  const generateMonthList = (start: string, end: string) => {
    const months = [];
    const [startYear, startMonth] = start.split('-').map(Number);
    const [endYear, endMonth] = end.split('-').map(Number);
    
    let currentYear = startYear;
    let currentMonth = startMonth;
    
    while (currentYear < endYear || (currentYear === endYear && currentMonth <= endMonth)) {
      months.push(`${currentYear}-${currentMonth.toString().padStart(2, '0')}`);
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
    }
    
    return months;
  };

  const monthList = generateMonthList(startMonth, endMonth);
  console.log(`Analyzing months: ${monthList.join(', ')}`);

  // 各月の統計を計算
  const monthlyStats: MonthlyStats[] = await Promise.all(
    monthList.map(async (month) => {
      // 指定月の週数を計算
      const getWeeksInMonth = (yearMonth: string) => {
        const [year, month] = yearMonth.split('-').map(Number);
        // month-1: 0-based
        return getMajorityWeeksInMonth(year, month - 1);
      };
      
      const weeks = getWeeksInMonth(month);
      const expectedEvaluationsPerMonth = weeks.length;

      // 指定月時点での有効ユーザーを動的に算出
      // created_at <= month AND (retiredAt IS NULL OR retiredAt > month)
      let allUsers = await db
        .select()
        .from(users)
        .where(
          sql`${users.createdAt} <= ${month + '-31'} AND (${users.retiredAt} IS NULL OR ${users.retiredAt} > ${month})`
        )
        .orderBy(desc(users.createdAt));
        allUsers = allUsers.filter(user => !user.retiredAt);
        allUsers = allUsers.filter(user => user.isEvaluated);

      const usersWithPoints = await Promise.all(
        allUsers.map(async (user) => {
          // evaluations.week IN (該当週リスト) で評価を取得
          const monthlyEvaluations = await db
            .select()
            .from(evaluations)
            .where(
              and(
                eq(evaluations.userId, user.id),
                inArray(evaluations.week, weeks)
              )
            );
          // 月次総合ポイントを集計
          const monthlyTotalPoints = monthlyEvaluations.reduce((sum, evaluation) => {
            return sum + (evaluation.totalPoints || 0);
          }, 0);
          // 評価達成率を計算（ADMINは除外）
          const evaluationCompletionRate = user.isEvaluated? 0 : 
            Math.round((monthlyEvaluations.length / weeks.length) * 100);
          return {
            ...user,
            monthlyTotalPoints,
            evaluationCount: monthlyEvaluations.length,
            evaluationCompletionRate
          };
        })
      );
      
      // 全ユーザーのポイントを収集（インセンティブ計算用、ADMINは除外）
      // const allUsersPoints = usersWithPoints.filter(u => u.role !== "ADMIN").map(u => u.monthlyTotalPoints || 0);

      // 各ユーザーの給与計算をサーバーサイドで実行
      const allUsersWithPoints = usersWithPoints.map(u => ({
        role: u.role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
        tier: u.tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
        employmentType: u.employmentType as "Employee" | "Contracted",
        monthlyTotalPoints: u.monthlyTotalPoints
      }));
      const usersWithSalary = await Promise.all(
        usersWithPoints.map(async (user) => {
          const sameRoleUsers = allUsersWithPoints.filter(u => u.role === user.role);
          const salary = await calculateSalaryWithConfig(
            {
              role: user.role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
              tier: user.tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
              employmentType: user.employmentType as "Employee" | "Contracted"
            },
            user.monthlyTotalPoints || 0,
            [],
            month,
            sameRoleUsers
          );
          return {
            ...user,
            salary
          };
        })
      );

      // 統計を計算（ADMINは除外）
      const userSalaries = usersWithSalary.filter(user => user.isEvaluated);
      const totalPayment = userSalaries.reduce((sum, u) => sum + Math.round(((u.salary.baseSalary || 0) + (u.salary.incentiveAmount || 0) + (u.salary.allowance || 0)) * 0.9), 0);
      const totalPoints = userSalaries.reduce((sum, u) => sum + (u.monthlyTotalPoints || 0), 0);
      const totalEvaluations = userSalaries.reduce((sum, u) => sum + (u.evaluationCount || 0), 0);
      
      // 組織効率を計算（評価件数補正済み）
      const organizationalEfficiency = totalPayment > 0 && totalEvaluations > 0 
        ? (totalPoints / totalEvaluations) / (totalPayment / totalEvaluations) 
        : 0;

      // const [year, m] = month.split('-').map(Number);
      // const weeks = getMajorityWeeksInMonth(year, m - 1);

      return {
        month,
        totalPayment,
        minPayment: userSalaries.length > 0 ? Math.min(...userSalaries.map(u => u.salary.netAmount)) : 0,
        maxPayment: userSalaries.length > 0 ? Math.max(...userSalaries.map(u => u.salary.netAmount)) : 0,
        avgPayment: userSalaries.length > 0 ? Math.round(userSalaries.reduce((sum, u) => sum + u.salary.netAmount, 0) / userSalaries.length) : 0,
        organizationalEfficiency,
        totalPoints,
        userCount: userSalaries.length,
        pointsPerEvaluation: totalEvaluations > 0 ? Math.round(totalPoints / totalEvaluations) : 0,
        weeks, // 追加
      };
    })
  );

  return json({ 
    monthlyStats,
    startMonth,
    endMonth
  });
}

export default function MonthlyStats() {
  const { monthlyStats, startMonth, endMonth } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [selectedMetric, setSelectedMetric] = useState("totalPayment");

  const handlePeriodChange = (type: "start" | "end", value: string) => {
    const params = new URLSearchParams(location.search);
    if (type === "start") {
      params.set("startMonth", value);
    } else {
      params.set("endMonth", value);
    }
    navigate(`?${params.toString()}`);
  };

  const getMetricConfig = (metric: string) => {
    switch (metric) {
      case "totalPayment":
        return { label: "支払い総額", color: "#3b82f6", unit: "৳", formatter: (value: number) => `৳${value.toLocaleString()}` };
      case "minPayment":
        return { label: "支払い額最低値", color: "#10b981", unit: "৳", formatter: (value: number) => `৳${value.toLocaleString()}` };
      case "maxPayment":
        return { label: "支払い額最大値", color: "#f59e0b", unit: "৳", formatter: (value: number) => `৳${value.toLocaleString()}` };
      case "avgPayment":
        return { label: "支払い総額平均", color: "#8b5cf6", unit: "৳", formatter: (value: number) => `৳${value.toLocaleString()}` };
      case "organizationalEfficiency":
        return { label: "組織効率", color: "#ec4899", unit: "pt/৳", formatter: (value: number) => value.toFixed(3) };
      case "totalPoints":
        return { label: "総合ポイント合計", color: "#ef4444", unit: "pt", formatter: (value: number) => `${value.toLocaleString()}pt` };
      case "userCount":
        return { label: "総人数", color: "#6b7280", unit: "人", formatter: (value: number) => `${value}人` };
      case "pointsPerEvaluation":
        return { label: "1評価あたりポイント", color: "#06b6d4", unit: "pt", formatter: (value: number) => `${value}pt` };
      default:
        return { label: "指標", color: "#000000", unit: "", formatter: (value: number) => value.toString() };
    }
  };

  const metricConfig = getMetricConfig(selectedMetric);

  // 期間選択や月リストの直後に、選択中の月の該当週と日付リストを表示
  const [year, month] = endMonth.split('-').map(Number);
  const weeksWithDates = getMajorityWeeksWithDates(year, month - 1);

  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6 overflow-x-hidden">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate("/system/users")}
          className="flex items-center gap-2 w-full sm:w-auto mb-2 sm:mb-0"
        >
          <ArrowLeft className="w-4 h-4" />
          ユーザー管理に戻る
        </Button>
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">月次時系列統計</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            組織の月次指標の推移を確認できます
          </p>
          <p className="text-xs sm:text-sm text-gray-600 mt-1">
            ※ 人数は各月時点での有効ユーザー数（追加日〜退職日）を動的に算出
          </p>
        </div>
      </div>

      {/* 期間選択 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gray-600" />
            期間設定
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 w-full">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700">開始月:</span>
              <input
                type="month"
                value={startMonth}
                onChange={e => handlePeriodChange("start", e.target.value)}
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:hover:bg-blue-100 [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer w-full sm:w-auto"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs sm:text-sm font-medium text-gray-700">終了月:</span>
              <input
                type="month"
                value={endMonth}
                onChange={e => handlePeriodChange("end", e.target.value)}
                className="border border-gray-300 rounded px-2 sm:px-3 py-1 sm:py-2 text-xs sm:text-sm bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent [&::-webkit-calendar-picker-indicator]:bg-transparent [&::-webkit-calendar-picker-indicator]:hover:bg-blue-100 [&::-webkit-calendar-picker-indicator]:rounded [&::-webkit-calendar-picker-indicator]:p-1 [&::-webkit-calendar-picker-indicator]:cursor-pointer w-full sm:w-auto"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 指標選択 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-600" />
            表示指標
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedMetric} onValueChange={setSelectedMetric}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="totalPayment">支払い総額</SelectItem>
              <SelectItem value="minPayment">支払い額最低値</SelectItem>
              <SelectItem value="maxPayment">支払い額最大値</SelectItem>
              <SelectItem value="avgPayment">支払い総額平均</SelectItem>
              <SelectItem value="organizationalEfficiency">組織効率(pt/৳)</SelectItem>
              <SelectItem value="totalPoints">総合ポイント合計</SelectItem>
              <SelectItem value="userCount">総人数</SelectItem>
              <SelectItem value="pointsPerEvaluation">1評価あたりポイント</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* グラフ表示 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            {metricConfig.label}の推移
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="month" 
                  tickFormatter={(value) => {
                    const [year, month] = value.split('-');
                    return `${year}/${month}`;
                  }}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [metricConfig.formatter(value), metricConfig.label]}
                  labelFormatter={(label) => {
                    const [year, month] = label.split('-');
                    return `${year}年${month}月`;
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={selectedMetric} 
                  stroke={metricConfig.color} 
                  strokeWidth={3}
                  dot={{ fill: metricConfig.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 統計テーブル */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>月次統計データ</CardTitle>
        <p className="text-xs text-gray-500 mt-1">
          ※ 支払い総額はAIT10%税抜で表示しています
        </p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-3 py-2 text-left">月</th>
                  <th className="border border-gray-300 px-3 py-2 text-left">該当週</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">支払い総額</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">支払い額最低値</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">支払い額最大値</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">支払い総額平均</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">組織効率</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">総合ポイント合計</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">総人数</th>
                  <th className="border border-gray-300 px-3 py-2 text-right">1評価あたりポイント</th>
                </tr>
              </thead>
              <tbody>
                {monthlyStats.map((stat) => (
                  <tr key={stat.month} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-3 py-2">
                      {stat.month.split('-')[0]}年{stat.month.split('-')[1]}月
                    </td>
                    <td className="border border-gray-300 px-3 py-2 text-left">{stat.weeks.join(", ")}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">৳{stat.totalPayment.toLocaleString()}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">৳{stat.minPayment.toLocaleString()}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">৳{stat.maxPayment.toLocaleString()}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">৳{stat.avgPayment.toLocaleString()}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{stat.organizationalEfficiency.toFixed(3)}</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{stat.totalPoints.toLocaleString()}pt</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{stat.userCount}人</td>
                    <td className="border border-gray-300 px-3 py-2 text-right">{stat.pointsPerEvaluation}pt</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 