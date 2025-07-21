import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, useActionData, useNavigation } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { baseSalaryConfigs, incentiveConfigs, allowanceConfigs, users } from "~/db/schema";
import { desc, lte, sql } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import { createId } from "@paralleldrive/cuid2";
import { History, DollarSign, TrendingUp, Users } from "lucide-react";
import { calculateSalaryWithConfig } from "~/lib/salary-calculator.server";

type ActionData = 
  | { error: string }
  | { success: string }
  | undefined;

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }

  // 現在の月を取得（YYYY-MM形式）
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // 基本給設定の履歴を取得
  const baseSalaryHistory = await db
    .select()
    .from(baseSalaryConfigs)
    .orderBy(desc(baseSalaryConfigs.effectiveMonth), desc(baseSalaryConfigs.createdAt));

  // インセンティブ設定の履歴を取得
  const incentiveHistory = await db
    .select()
    .from(incentiveConfigs)
    .orderBy(desc(incentiveConfigs.effectiveMonth), desc(incentiveConfigs.createdAt));

  // 手当設定の履歴を取得
  const allowanceHistory = await db
    .select()
    .from(allowanceConfigs)
    .orderBy(desc(allowanceConfigs.effectiveMonth), desc(allowanceConfigs.createdAt));

  // 現在適用されている設定を取得
  const currentBaseSalary = await db
    .select()
    .from(baseSalaryConfigs)
    .where(lte(baseSalaryConfigs.effectiveMonth, currentMonth))
    .orderBy(desc(baseSalaryConfigs.effectiveMonth), desc(baseSalaryConfigs.createdAt));

  const currentIncentive = await db
    .select()
    .from(incentiveConfigs)
    .where(lte(incentiveConfigs.effectiveMonth, currentMonth))
    .orderBy(desc(incentiveConfigs.effectiveMonth), desc(incentiveConfigs.createdAt));

  const currentAllowance = await db
    .select()
    .from(allowanceConfigs)
    .where(lte(allowanceConfigs.effectiveMonth, currentMonth))
    .orderBy(desc(allowanceConfigs.effectiveMonth), desc(allowanceConfigs.createdAt));

  // 予想支払い総額計算用: 現在有効なユーザー一覧を取得（ADMIN/REQUESTOR/退職者除外）
  let validUsers = await db
    .select()
    .from(users)
    .where(sql`${users.role} != 'ADMIN' AND ${users.role} != 'REQUESTOR' AND (${users.retiredAt} IS NULL OR ${users.retiredAt} > ${currentMonth})`);
  
  validUsers = validUsers.filter(user => !user.retiredAt);
  validUsers = validUsers.filter(user => user.isEvaluated);

  // 各ユーザーの給与（ポイント0仮定）を計算
  const allUsersForSalary = validUsers.map(u => ({
    role: u.role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
    tier: u.tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
    employmentType: u.employmentType as "Employee" | "Contracted",
    monthlyTotalPoints: 0
  }));
  const salaryResults = await Promise.all(
    validUsers.map(async (user) => {
      const sameRoleUsers = allUsersForSalary.filter(u => u.role === user.role);
      const salary = await calculateSalaryWithConfig(
        {
          role: user.role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
          tier: user.tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
          employmentType: user.employmentType as "Employee" | "Contracted"
        },
        0,
        [],
        currentMonth,
        sameRoleUsers
      );
      return salary.netAmount;
    })
  );
  const totalPredictedPayment = salaryResults.reduce((sum, n) => sum + n, 0);

  // 各ロールごとの人数を集計
  const roleCounts: Record<string, number> = { CORP: 0, ENGINEER: 0, DESIGNER: 0, OPERATOR: 0 };
  validUsers.forEach(u => { if (roleCounts[u.role] !== undefined) roleCounts[u.role] += 1; });
  const totalUserCount = validUsers.length;

  return json({ 
    baseSalaryHistory, 
    incentiveHistory, 
    allowanceHistory,
    currentBaseSalary: currentBaseSalary[0] || null,
    currentIncentive: currentIncentive[0] || null,
    currentAllowance: currentAllowance[0] || null,
    currentMonth,
    totalPredictedPayment,
    roleCounts,
    totalUserCount
  });
}

export async function action({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }

  const formData = await request.formData();
  const action = formData.get("action") as string;

  if (action === "createBaseSalary") {
    // 基本給設定作成
    const role = formData.get("role") as string;
    const tier = formData.get("tier") as string;
    const baseSalary = parseInt(formData.get("baseSalary") as string);
    const effectiveMonth = formData.get("effectiveMonth") as string;
    
    if (!role || !tier || !baseSalary || !effectiveMonth) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    try {
      await db.insert(baseSalaryConfigs).values({
        id: createId(),
        role: role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
        tier: tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
        baseSalary,
        effectiveMonth,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return json({ success: "基本給設定を作成しました" });
    } catch (error) {
      return json({ error: "基本給設定の作成に失敗しました" }, { status: 500 });
    }
  }

  if (action === "createIncentive") {
    // インセンティブ設定作成
    const role = formData.get("role") as string;
    const minIncentive = parseInt(formData.get("minIncentive") as string);
    const maxIncentive = parseInt(formData.get("maxIncentive") as string);
    const effectiveMonth = formData.get("effectiveMonth") as string;
    
    if (!role || !minIncentive || !maxIncentive || !effectiveMonth) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    if (minIncentive >= maxIncentive) {
      return json({ error: "最小値は最大値より小さくしてください" }, { status: 400 });
    }

    try {
      await db.insert(incentiveConfigs).values({
        id: createId(),
        role: role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
        minIncentive,
        maxIncentive,
        effectiveMonth,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return json({ success: "インセンティブ設定を作成しました" });
    } catch (error) {
      return json({ error: "インセンティブ設定の作成に失敗しました" }, { status: 500 });
    }
  }

  if (action === "createAllowance") {
    // 手当設定作成
    const employmentType = formData.get("employmentType") as string;
    const allowance = parseInt(formData.get("allowance") as string);
    const effectiveMonth = formData.get("effectiveMonth") as string;
    
    if (!employmentType || !allowance || !effectiveMonth) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    try {
      await db.insert(allowanceConfigs).values({
        id: createId(),
        employmentType: employmentType as "Employee" | "Contracted",
        allowance,
        effectiveMonth,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return json({ success: "手当設定を作成しました" });
    } catch (error) {
      return json({ error: "手当設定の作成に失敗しました" }, { status: 500 });
    }
  }

  return json({ error: "無効なアクションです" }, { status: 400 });
}

export default function SalaryConfigManagement() {
  const { 
    baseSalaryHistory, 
    incentiveHistory, 
    allowanceHistory,
    currentBaseSalary,
    currentAllowance,
    currentMonth,
    totalPredictedPayment,
    roleCounts: serverRoleCounts,
    totalUserCount: serverTotalUserCount
  } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>() as ActionData;
  const navigation = useNavigation();
  
  const [isBaseSalaryDialogOpen, setIsBaseSalaryDialogOpen] = useState(false);
  const [isAllowanceDialogOpen, setIsAllowanceDialogOpen] = useState(false);

  const roles = ["CORP", "ENGINEER", "DESIGNER", "OPERATOR"];
  const tiers = ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"];
  const employmentTypes = ["Employee", "Contracted"];

  // 基本給テーブルを構築
  const buildBaseSalaryTable = () => {
    // 現在適用されている設定を取得
    const currentConfigs = baseSalaryHistory.filter(config => 
      config.effectiveMonth <= currentMonth
    ).reduce((acc, config) => {
      if (!acc[config.role]) acc[config.role] = {};
      acc[config.role][config.tier] = config.baseSalary;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    return currentConfigs;
  };

  const baseSalaryTable = buildBaseSalaryTable();

  // インセンティブ設定の履歴をロールごとに分ける
  type IncentiveConfigType = typeof incentiveHistory[number];
  const incentiveHistoryByRole: Record<string, IncentiveConfigType[]> = {};
  roles.forEach(role => {
    incentiveHistoryByRole[role] = incentiveHistory.filter((c: IncentiveConfigType) => c.role === role);
  });

  // 現在のインセンティブ設定もロールごとに
  const currentIncentiveByRole: Record<string, IncentiveConfigType | null> = {};
  roles.forEach(role => {
    currentIncentiveByRole[role] = incentiveHistoryByRole[role][0] || null;
  });

  // クライアント側でもフィルタして人数集計
  // ここではAPIから取得したユーザー一覧がないため、サーバー値をそのまま使うが、
  // もし将来的にユーザー一覧を取得する場合は下記のようにフィルタする
  // const filteredUsers = users.filter(u => roles.includes(u.role) && (!u.retiredAt || u.retiredAt > currentMonth));
  // const clientRoleCounts = roles.reduce((acc, role) => ({ ...acc, [role]: filteredUsers.filter(u => u.role === role).length }), {} as Record<string, number>);
  // const clientTotalUserCount = filteredUsers.length;
  // 今回はサーバー値をそのまま表示
  const roleCounts = serverRoleCounts;
  const totalUserCount = serverTotalUserCount;

  return (
    <div className="container p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold">給与設定管理</h1>
          <p className="text-muted-foreground">
            基本給、インセンティブ、手当の設定を管理します
          </p>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            現在の月: {currentMonth}
          </p>
        </div>
      </div>

      {actionData && 'error' in actionData && (
        <div className="mb-4 p-2 sm:p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{actionData.error}</p>
        </div>
      )}

      {actionData && 'success' in actionData && (
        <div className="mb-4 p-2 sm:p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600">{actionData.success}</p>
        </div>
      )}

      <div>
        {/* 設定履歴の上に予想支払い総額と人数統計を表示 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              予想支払い総額(AIT10%税抜)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-700">
              ৳{totalPredictedPayment.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              ※現時点の有効ユーザー・現行設定・ポイント0で計算した概算値です
            </div>
          <div className="mt-4">
            <div className="flex flex-wrap gap-4 items-center text-sm">
              {roles.map(role => (
                <div key={role} className="flex items-center gap-1">
                  <span className="font-bold">{role}:</span>
                  <span>{roleCounts[role] || 0}人</span>
                </div>
              ))}
              <div className="flex items-center gap-1 ml-4">
                <span className="font-bold">合計:</span>
                <span>{totalUserCount}人</span>
              </div>
            </div>
          </div>
          </CardContent>
        </Card>
      </div>

      {/* 現在の設定 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6 mb-8">
        {/* 基本給設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-blue-600" />
              基本給設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">適用月:</span>
                <Badge variant="outline">
                  {currentBaseSalary?.effectiveMonth || "未設定"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">設定数:</span>
                <span className="text-sm font-medium">
                  {Object.keys(baseSalaryTable).length} ロール
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Dialog open={isBaseSalaryDialogOpen} onOpenChange={setIsBaseSalaryDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    基本給設定を追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>基本給設定追加</DialogTitle>
                    <DialogDescription>
                      新しい基本給設定を作成します
                    </DialogDescription>
                  </DialogHeader>
                  <Form method="post" className="space-y-4">
                    <input type="hidden" name="action" value="createBaseSalary" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="role">ロール</Label>
                      <Select name="role" required>
                        <SelectTrigger>
                          <SelectValue placeholder="ロールを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {roles.map(role => (
                            <SelectItem key={role} value={role}>{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="tier">ティア</Label>
                      <Select name="tier" required>
                        <SelectTrigger>
                          <SelectValue placeholder="ティアを選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {tiers.map(tier => (
                            <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="baseSalary">基本給（タカ）</Label>
                      <Input 
                        id="baseSalary" 
                        name="baseSalary" 
                        type="number" 
                        min="0" 
                        required 
                        placeholder="例: 30000"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="effectiveMonth">適用月</Label>
                      <Input 
                        id="effectiveMonth" 
                        name="effectiveMonth" 
                        type="month" 
                        required 
                        defaultValue={currentMonth}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsBaseSalaryDialogOpen(false)}>
                        キャンセル
                      </Button>
                      <Button type="submit" disabled={navigation.state === "submitting"}>
                        {navigation.state === "submitting" ? "作成中..." : "作成"}
                      </Button>
                    </div>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* インセンティブ設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              インセンティブ設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {roles.map(role => (
                <div key={role} className="mb-2 p-2 border rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">ロール:</span>
                    <Badge variant="outline">{role}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">適用月:</span>
                    <Badge variant="outline">
                      {currentIncentiveByRole[role]?.effectiveMonth || "未設定"}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">レンジ:</span>
                    <span className="text-sm font-medium">
                      {currentIncentiveByRole[role] ? `৳${currentIncentiveByRole[role].minIncentive.toLocaleString()} - ৳${currentIncentiveByRole[role].maxIncentive.toLocaleString()}` : "未設定"}
                    </span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className="w-full mt-2">
                        インセンティブ設定を追加
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>インセンティブ設定追加（{role}）</DialogTitle>
                        <DialogDescription>
                          新しいインセンティブ設定を作成します
                        </DialogDescription>
                      </DialogHeader>
                      <Form method="post" className="space-y-4">
                        <input type="hidden" name="action" value="createIncentive" />
                        <input type="hidden" name="role" value={role} />
                        <div className="space-y-2">
                          <Label htmlFor="minIncentive">最小インセンティブ（タカ）</Label>
                          <Input 
                            id="minIncentive" 
                            name="minIncentive" 
                            type="number" 
                            min="0" 
                            required 
                            placeholder="例: 10000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="maxIncentive">最大インセンティブ（タカ）</Label>
                          <Input 
                            id="maxIncentive" 
                            name="maxIncentive" 
                            type="number" 
                            min="0" 
                            required 
                            placeholder="例: 50000"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="effectiveMonth">適用月</Label>
                          <Input 
                            id="effectiveMonth" 
                            name="effectiveMonth" 
                            type="month" 
                            required 
                            defaultValue={currentMonth}
                          />
                        </div>
                        <div className="flex justify-end space-x-2">
                          <Button type="button" variant="outline" onClick={() => setIsAllowanceDialogOpen(false)}>
                            キャンセル
                          </Button>
                          <Button type="submit" disabled={navigation.state === "submitting"}>
                            {navigation.state === "submitting" ? "作成中..." : "作成"}
                          </Button>
                        </div>
                      </Form>
                    </DialogContent>
                  </Dialog>
                  {/* 履歴 */}
                  <div className="mt-2 text-xs text-gray-500">
                    <div>履歴:</div>
                    <ul>
                      {incentiveHistoryByRole[role].map((config, idx) => (
                        <li key={config.id}>
                          {config.effectiveMonth}: ৳{config.minIncentive} - ৳{config.maxIncentive}
                          {idx === 0 && <span className="ml-2 text-green-600">(最新)</span>}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 手当設定 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-orange-600" />
              手当設定
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">適用月:</span>
                <Badge variant="outline">
                  {currentAllowance?.effectiveMonth || "未設定"}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Employee手当:</span>
                <span className="text-sm font-medium">
                  {currentAllowance ? `৳${currentAllowance.allowance.toLocaleString()}` : "未設定"}
                </span>
              </div>
            </div>
            <div className="mt-4">
              <Dialog open={isAllowanceDialogOpen} onOpenChange={setIsAllowanceDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="w-full">
                    手当設定を追加
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>手当設定追加</DialogTitle>
                    <DialogDescription>
                      新しい手当設定を作成します
                    </DialogDescription>
                  </DialogHeader>
                  <Form method="post" className="space-y-4">
                    <input type="hidden" name="action" value="createAllowance" />
                    
                    <div className="space-y-2">
                      <Label htmlFor="employmentType">雇用形態</Label>
                      <Select name="employmentType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="雇用形態を選択" />
                        </SelectTrigger>
                        <SelectContent>
                          {employmentTypes.map(type => (
                            <SelectItem key={type} value={type}>{type}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="allowance">手当（タカ）</Label>
                      <Input 
                        id="allowance" 
                        name="allowance" 
                        type="number" 
                        min="0" 
                        required 
                        placeholder="例: 400"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="effectiveMonth">適用月</Label>
                      <Input 
                        id="effectiveMonth" 
                        name="effectiveMonth" 
                        type="month" 
                        required 
                        defaultValue={currentMonth}
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button type="button" variant="outline" onClick={() => setIsAllowanceDialogOpen(false)}>
                        キャンセル
                      </Button>
                      <Button type="submit" disabled={navigation.state === "submitting"}>
                        {navigation.state === "submitting" ? "作成中..." : "作成"}
                      </Button>
                    </div>
                  </Form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 基本給テーブル */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-blue-600" />
            現在の基本給テーブル
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-xs sm:text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-left">ロール</th>
                  {tiers.map(tier => (
                    <th key={tier} className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">{tier}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {roles.map((role, index) => (
                  <tr key={role} className={index % 2 === 0 ? "" : "bg-gray-50"}>
                    <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 font-medium">{role}</td>
                    {tiers.map(tier => {
                      const salary = baseSalaryTable[role]?.[tier];
                      return (
                        <td key={tier} className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">
                          {salary ? `৳${salary.toLocaleString()}` : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* 設定履歴 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 md:gap-6">
        {/* 基本給履歴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-blue-600" />
              基本給設定履歴
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {baseSalaryHistory.map((config) => (
                <div key={config.id} className="p-2 border rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{config.role} {config.tier}</span>
                    <Badge variant="outline" className="text-xs">
                      {config.effectiveMonth}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    ৳{config.baseSalary.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* インセンティブ履歴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-green-600" />
              インセンティブ設定履歴
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {incentiveHistory.map((config) => (
                <div key={config.id} className="p-2 border rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">インセンティブ</span>
                    <Badge variant="outline" className="text-xs">
                      {config.effectiveMonth}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    ৳{config.minIncentive.toLocaleString()} - ৳{config.maxIncentive.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* 手当履歴 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-orange-600" />
              手当設定履歴
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {allowanceHistory.map((config) => (
                <div key={config.id} className="p-2 border rounded text-sm">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{config.employmentType}</span>
                    <Badge variant="outline" className="text-xs">
                      {config.effectiveMonth}
                    </Badge>
                  </div>
                  <div className="text-gray-600">
                    ৳{config.allowance.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 