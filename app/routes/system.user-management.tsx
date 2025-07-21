import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Form, useActionData, useNavigation } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState, useEffect } from "react";
import { createId } from "@paralleldrive/cuid2";
import bcrypt from "bcryptjs";
import { Users, ArrowUpDown, ArrowUp, ArrowDown, UserX, Plus, BarChart3, Edit } from "lucide-react";
import { useNavigate } from "@remix-run/react";

type ActionData = 
  | { error: string }
  | { success: string; initialPassword?: string; userEmail?: string }
  | undefined;

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }
  // usersテーブルから全ユーザーを取得
  const allUsers = await db.select().from(users).orderBy(desc(users.createdAt));
  return json({
    users: allUsers,
    managerOptions: allUsers.map(u => ({ id: u.id, name: u.name, role: u.role, tier: u.tier }))
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

  if (action === "create") {
    // 新規ユーザー作成
    const email = formData.get("email") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const tier = formData.get("tier") as string;
    const employmentType = formData.get("employmentType") as string;
    const skills = formData.get("skills") as string;
    const capabilityManagerId = formData.get("capabilityManagerId") as string | null;
    const projectManagerId = formData.get("projectManagerId") as string | null;
    
    // バリデーション
    if (!email || !name || !role || !tier || !employmentType) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    // 月額給与計算関数（タカ単位）
    const calculateMonthlySalary = (role: string, tier: string): number => {
      const tierBaseSalary = {
        "T0": 20000, "T1": 30000, "T2": 40000, "T3": 50000, "T4": 60000, "T5": 70000, "T6": 80000, "T7": 90000,
      };
      const roleAllowance = {
        "CORP": 0, "ENGINEER": 0, "DESIGNER": 0, "OPERATOR": 0,
      };
      const baseSalary = tierBaseSalary[tier as keyof typeof tierBaseSalary] || 20000;
      const allowance = roleAllowance[role as keyof typeof roleAllowance] || 0;
      return baseSalary + allowance;
    };

    try {
      // 初期パスワードを生成
      const generatePassword = () => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let password = '';
        for (let i = 0; i < 8; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
      };

      const initialPassword = generatePassword();
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      
      const monthlySalary = calculateMonthlySalary(role, tier);
      
      const profile = {
        skills: skills ? skills.split(',').map(s => s.trim()) : [],
        preferences: {
          totalPoints: 0,
          completedProjects: 0,
          averageScore: 0,
        },
      };

      await db.insert(users).values({
        id: createId(),
        email,
        name,
        password: hashedPassword,
        role: role as "ADMIN" | "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR" | "SUPERUSER",
        tier: tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
        monthlySalary,
        employmentType: employmentType as "Employee" | "Contracted" | "Exective" | "Assignee" | "Guest",
        profile,
        retiredAt: null,
        capabilityManagerId: capabilityManagerId || null,
        projectManagerId: projectManagerId || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return json({ 
        success: "ユーザーを作成しました", 
        initialPassword,
        userEmail: email
      });
    } catch (error) {
      return json({ error: "ユーザーの作成に失敗しました" }, { status: 500 });
    }
  }

  if (action === "update") {
    // ユーザー編集
    const userId = formData.get("userId") as string;
    const name = formData.get("name") as string;
    const role = formData.get("role") as string;
    const tier = formData.get("tier") as string;
    const employmentType = formData.get("employmentType") as string;
    const skills = formData.get("skills") as string;
    const capabilityManagerId = formData.get("capabilityManagerId") as string | null;
    const projectManagerId = formData.get("projectManagerId") as string | null;
    
    if (!userId || !name || !role || !tier || !employmentType) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    try {
      // 月額給与計算関数（タカ単位）
      const calculateMonthlySalary = (role: string, tier: string): number => {
        const tierBaseSalary = {
          "T0": 20000, "T1": 30000, "T2": 40000, "T3": 50000, "T4": 60000, "T5": 70000, "T6": 80000, "T7": 90000,
        };
        const roleAllowance = {
          "CORP": 0, "ENGINEER": 0, "DESIGNER": 0, "OPERATOR": 0,
        };
        const baseSalary = tierBaseSalary[tier as keyof typeof tierBaseSalary] || 20000;
        const allowance = roleAllowance[role as keyof typeof roleAllowance] || 0;
        return baseSalary + allowance;
      };

      const monthlySalary = calculateMonthlySalary(role, tier);
      
      const profile = {
        skills: skills ? skills.split(',').map(s => s.trim()) : [],
        preferences: {
          totalPoints: 0,
          completedProjects: 0,
          averageScore: 0,
        },
      };

      await db
        .update(users)
        .set({
          name,
          role: role as"ADMIN" | "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR" | "SUPERUSER",
          tier: tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
          monthlySalary,
          employmentType: employmentType as "Employee" | "Contracted" | "Exective" | "Assignee" | "Guest",
          profile,
          capabilityManagerId: capabilityManagerId || null,
          projectManagerId: projectManagerId || null,
          updatedAt: new Date().toISOString()
        })
        .where(eq(users.id, userId));

      return json({ success: "ユーザー情報を更新しました" });
    } catch (error) {
      return json({ error: "ユーザー情報の更新に失敗しました" }, { status: 500 });
    }
  }

  if (action === "retire") {
    // 退職処理
    const userId = formData.get("userId") as string;
    const retiredAt = formData.get("retiredAt") as string;
    
    if (!userId || !retiredAt) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    try {
      await db
        .update(users)
        .set({ 
          retiredAt,
          updatedAt: new Date().toISOString()
        })
        .where(eq(users.id, userId));

      return json({ success: "退職処理を完了しました" });
    } catch (error) {
      return json({ error: "退職処理に失敗しました" }, { status: 500 });
    }
  }

  return json({ error: "無効なアクションです" }, { status: 400 });
}

export default function UserManagement() {
  const { users, managerOptions } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>() as ActionData;
  const navigation = useNavigation();
  const navigate = useNavigate();
  
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isRetireDialogOpen, setIsRetireDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<typeof users[0] | null>(null);
  const [selectedRole, setSelectedUserRole] = useState("ENGINEER");
  const [roleFilter, setRoleFilter] = useState("all");
  const [showRetired, setShowRetired] = useState(false);
  const [sortField, setSortField] = useState("tier");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const roles = ["ADMIN", "CORP", "ENGINEER", "DESIGNER", "OPERATOR", "REQUESTOR", "SUPERUSER"];
  const allTiers = ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"];

  const getFilteredAndSortedUsers = () => {
    let filtered = users;

    // ロールフィルター
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // 退職者フィルター
    if (!showRetired) {
      filtered = filtered.filter(user => !user.retiredAt);
    }

    // ソート
    filtered.sort((a, b) => {
      let aValue: string | number = a[sortField as keyof typeof a] as string | number;
      let bValue: string | number = b[sortField as keyof typeof b] as string | number;

      if (sortField === "name" || sortField === "email") {
        aValue = String(aValue).toLowerCase();
        bValue = String(bValue).toLowerCase();
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

    return filtered;
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const getAvailableTiers = (role: string) => {
    if (role === "DESIGNER" || role === "OPERATOR") {
      return allTiers.slice(0, 5); // T0-T4
    }
    if (role === "CORP") {
      return allTiers.slice(0, 7); // T0-T6
    }
    if (role === "ENGINEER" || role === "REQUESTOR") {
      return allTiers; // T0-T7
    }
    return allTiers;
  };

  // ロールごとのバッジ色
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN": return { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" };
      case "CORP": return { variant: "default" as const, className: "bg-blue-100 text-blue-800 border-blue-200" };
      case "ENGINEER": return { variant: "secondary" as const, className: "bg-green-100 text-green-800 border-green-200" };
      case "DESIGNER": return { variant: "outline" as const, className: "bg-purple-100 text-purple-800 border-purple-200" };
      case "OPERATOR": return { variant: "default" as const, className: "bg-orange-100 text-orange-800 border-orange-200" };
      case "REQUESTOR": return { variant: "outline" as const, className: "bg-gray-100 text-gray-800 border-gray-200" };
      case "SUPERUSER": return { className: "bg-black text-yellow-300 border-yellow-400" };
      default: return { variant: "outline" as const, className: "" };
    }
  };

  // ティアごとのバッジ色
  const getTierBadgeVariant = (tier: string) => {
    const tierNum = parseInt(tier.replace("T", ""));
    if (tierNum === 7) return { className: "bg-black text-white border-gray-800" };
    if (tierNum >= 6) return { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" };
    if (tierNum >= 4) return { variant: "default" as const, className: "bg-blue-100 text-blue-800 border-blue-200" };
    if (tierNum === 0) return { variant: "outline" as const, className: "bg-gray-100 text-gray-800 border-gray-200" };
    return { variant: "secondary" as const, className: "bg-green-100 text-green-800 border-green-200" };
  };

  // 雇用形態バッジ色
  const getEmploymentBadgeVariant = (employmentType: string) => {
    if (employmentType === "Employee") return { variant: "default" as const, className: "bg-green-100 text-green-800 border-green-200" };
    if (employmentType === "Contracted") return { variant: "outline" as const, className: "bg-yellow-100 text-yellow-800 border-yellow-200" };
    return { variant: "outline" as const, className: "" };
  };

  // 上司バッジ色
  const getManagerBadgeVariant = (type: "capability" | "project") => {
    return type === "capability"
      ? { variant: "outline" as const, className: "bg-cyan-100 text-cyan-800 border-cyan-200" }
      : { variant: "outline" as const, className: "bg-yellow-100 text-yellow-800 border-yellow-200" };
  };

  const filteredUsers = getFilteredAndSortedUsers();

  // 上司情報取得関数
  const getManagerInfo = (managerId: string | null | undefined) => {
    if (!managerId || managerId === "") return "-";
    const found = managerOptions.find((m) => String(m.id).trim() === String(managerId).trim());
    return found ? `${found.name}（${found.role}／${found.tier}）` : `ID: ${managerId}（該当なし）`;
  };

  // 編集ダイアログ自動クローズ
  useEffect(() => {
    if (actionData && 'success' in actionData && isEditDialogOpen) {
      setIsEditDialogOpen(false);
      setSelectedUser(null);
    }
  }, [actionData, isEditDialogOpen]);

  return (
    <div className="w-full p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-2 sm:gap-4">
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold">ユーザー管理</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">
            システム内のユーザーを管理します
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 w-full sm:w-auto flex-wrap">
          <Button 
            variant="outline" 
            onClick={() => navigate("/system/users")}
            className="flex items-center gap-2"
          >
            <Users className="w-4 h-4" />
            給与管理
          </Button>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                新規ユーザー作成
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>新規ユーザー作成</DialogTitle>
                <DialogDescription>
                  新しいユーザーアカウントを作成します
                </DialogDescription>
              </DialogHeader>
              <Form method="post" className="space-y-4">
                <input type="hidden" name="action" value="create" />
                
                <div className="space-y-2">
                  <Label htmlFor="email">メールアドレス</Label>
                  <Input id="email" name="email" type="email" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">名前</Label>
                  <Input id="name" name="name" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role">ロール</Label>
                  <Select name="role" required onValueChange={setSelectedUserRole}>
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
                      {getAvailableTiers(selectedRole).map(tier => (
                        <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="employmentType">雇用形態</Label>
                  <Select name="employmentType" required>
                    <SelectTrigger>
                      <SelectValue placeholder="雇用形態を選択" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Employee">Employee</SelectItem>
                      <SelectItem value="Contracted">Contracted</SelectItem>
                      <SelectItem value="Exective">役員</SelectItem>
                      <SelectItem value="Assignee">出向者</SelectItem>
                      <SelectItem value="Guest">評価利用者</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skills">スキル（カンマ区切り）</Label>
                  <Textarea id="skills" name="skills" placeholder="TypeScript, React, Node.js" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="number">社員番号</Label>
                  <Input id="number" name="number" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="title">役職</Label>
                  <Input id="title" name="title" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">部署</Label>
                  <Input id="department" name="department" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="joiningDate">入社日</Label>
                  <Input id="joiningDate" name="joiningDate" type="date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fte">FTE(稼働率)</Label>
                  <Input id="fte" name="fte" type="number" step="0.01" min="0" max="1" />
                </div>
                <div className="space-y-2 flex items-center gap-2">
                  <input id="isEvaluated" name="isEvaluated" type="checkbox" className="w-4 h-4" />
                  <Label htmlFor="isEvaluated">評価対象</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="capabilityManagerId">Capability評価者</Label>
                  <Select name="capabilityManagerId">
                    <SelectTrigger>
                      <SelectValue placeholder="Capability評価者を選択（任意）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-">（なし）</SelectItem>
                      {managerOptions.map((mgr) => (
                        <SelectItem key={mgr.id} value={mgr.id}>{mgr.name}（{mgr.role}/{mgr.tier}）</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="projectManagerId">Project評価者</Label>
                  <Select name="projectManagerId">
                    <SelectTrigger>
                      <SelectValue placeholder="Project評価者を選択（任意）" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-">（なし）</SelectItem>
                      {managerOptions.map((mgr) => (
                        <SelectItem key={mgr.id} value={mgr.id}>{mgr.name}（{mgr.role}/{mgr.tier}）</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
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
      </div>

      {/* フィルタ・ソート機能 */}
      <div className="mb-6 w-full">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ArrowUpDown className="w-5 h-5 text-gray-600" />
              フィルタ・ソート
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4 items-center w-full">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">ロール:</span>
                <Select value={roleFilter} onValueChange={setRoleFilter}>
                  <SelectTrigger className="w-32">
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
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">退職者:</span>
                <Select value={showRetired ? "show" : "hide"} onValueChange={(value) => setShowRetired(value === "show")}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hide">非表示</SelectItem>
                    <SelectItem value="show">表示</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-700">ソート:</span>
                <Select value={sortField} onValueChange={handleSort}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">名前</SelectItem>
                    <SelectItem value="email">メールアドレス</SelectItem>
                    <SelectItem value="role">ロール</SelectItem>
                    <SelectItem value="tier">ティア</SelectItem>
                    <SelectItem value="createdAt">作成日</SelectItem>
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
              
              <div className="text-sm text-gray-500">
                表示中: {filteredUsers.length}人 / {users.length}人
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {actionData && 'error' in actionData && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{actionData.error}</p>
        </div>
      )}

      {actionData && 'success' in actionData && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-green-600">{actionData.success}</p>
          {actionData.initialPassword && (
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm font-medium text-yellow-800 mb-1">初期パスワード</p>
              <p className="text-sm text-yellow-700 mb-2">
                メールアドレス: <span className="font-mono">{actionData.userEmail}</span>
              </p>
              <p className="text-sm text-yellow-700">
                パスワード: <span className="font-mono font-bold text-lg">{actionData.initialPassword}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ユーザーリスト */}
      <div className="grid gap-4 w-full">
        {filteredUsers.map((user) => (
          <Card key={user.id} className={`border-2 w-full ${user.retiredAt ? "opacity-60 border-gray-200 bg-gray-50" : "border-blue-100 bg-blue-50"}`}>
            <CardContent className="p-4 sm:p-6 w-full">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">
                <div className="flex flex-col gap-2 w-full">
                  {/* 1行目: 名前・社員番号・役職・退職 */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <h3 className="text-lg font-bold">{user.name}</h3>
                    {user.number && (
                      <Badge variant="outline" className="text-xs bg-gray-200 text-gray-700 border-gray-300">No.{user.number}</Badge>
                    )}
                    {user.title && (
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">{user.title}</Badge>
                    )}
                    {user.retiredAt && (
                      <Badge variant="destructive" className="text-xs">退職済み ({new Date(user.retiredAt).toLocaleDateString()})</Badge>
                    )}
                  </div>
                  {/* 2行目: 部署・入社日・FTE・雇用形態・ティア・ロール */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {user.department && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 border-blue-200">{user.department}</Badge>
                    )}
                    {user.joiningDate && (
                      <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">入社日: {user.joiningDate}</Badge>
                    )}
                    {user.fte !== undefined && user.fte !== null && (
                      <Badge variant="secondary" className="text-xs bg-green-200 text-green-900 border-green-300">
                        FTE: {typeof user.fte === "number" ? `${(user.fte * 100).toFixed(0)}％` : user.fte}
                      </Badge>
                    )}
                    <Badge {...getEmploymentBadgeVariant(user.employmentType)} className="text-xs">{user.employmentType}</Badge>
                    <Badge {...getTierBadgeVariant(user.tier)} className="text-xs">{user.tier}</Badge>
                    <Badge {...getRoleBadgeVariant(user.role)} className="text-xs">{user.role}</Badge>
                  </div>
                  {/* 3行目: 参考給与・評価対象・上司情報 */}
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {user.isEvaluated ? (
                      <Badge variant="secondary" className="text-xs bg-indigo-100 text-indigo-800 border-indigo-200">評価対象</Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs bg-gray-100 text-gray-500 border-gray-200">評価対象外</Badge>
                    )}
                    <Badge {...getManagerBadgeVariant("capability")} className="text-xs">Capability評価者: {getManagerInfo(user.capabilityManagerId)}</Badge>
                    <Badge {...getManagerBadgeVariant("project")} className="text-xs">Project評価者: {getManagerInfo(user.projectManagerId)}</Badge>
                  </div>
                  {/* 4行目: スキル */}
                  {(user.skill || user.profile?.skills?.length) && (
                    <div className="text-xs text-gray-500 mb-1">
                      スキル: {user.skill ? user.skill : user.profile?.skills?.join(", ")}
                    </div>
                  )}
                  {/* メールアドレス */}
                  <p className="text-sm text-gray-600 mb-0">{user.email}</p>
                </div>
                {/* 右端: アクションボタン */}
                <div className="flex flex-col sm:flex-row items-end gap-2 sm:gap-4 min-w-[120px]">
                  <div className="text-right">
                    <p className="text-xs text-blue-700 font-semibold">作成日</p>
                    <p className="text-sm font-bold text-blue-900">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate(`/system/ranking/${user.id}`)}
                    >
                      <BarChart3 className="w-4 h-4" />
                      詳細
                    </Button>
                    
                    <Dialog open={isEditDialogOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                      setIsEditDialogOpen(open);
                      if (!open) setSelectedUser(null);
                    }}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setIsEditDialogOpen(true);
                          }}
                        >
                          <Edit className="w-4 h-4" />
                          編集
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>ユーザー編集</DialogTitle>
                          <DialogDescription>
                            ユーザー情報を編集します
                          </DialogDescription>
                        </DialogHeader>
                        <Form method="post" className="space-y-4">
                          <input type="hidden" name="action" value="update" />
                          <input type="hidden" name="userId" value={user.id} />
                          
                          <div className="space-y-2">
                            <Label htmlFor="edit-name">名前</Label>
                            <Input id="edit-name" name="name" defaultValue={user.name} required />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-role">ロール</Label>
                            <Select name="role" defaultValue={user.role} required>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {roles.map(role => (
                                  <SelectItem key={role} value={role}>{role}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-tier">ティア</Label>
                            <Select name="tier" defaultValue={user.tier} required>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {getAvailableTiers(user.role).map(tier => (
                                  <SelectItem key={tier} value={tier}>{tier}</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-employmentType">雇用形態</Label>
                            <Select name="employmentType" defaultValue={user.employmentType} required>
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Employee">Employee</SelectItem>
                                <SelectItem value="Contracted">Contracted</SelectItem>
                                <SelectItem value="Exective">役員</SelectItem>
                                <SelectItem value="Assignee">出向者</SelectItem>
                                <SelectItem value="Guest">評価利用者</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-skills">スキル（カンマ区切り）</Label>
                            <Textarea 
                              id="edit-skills" 
                              name="skills" 
                              defaultValue={user.profile?.skills?.join(", ") || ""}
                              placeholder="TypeScript, React, Node.js" 
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-number">社員番号</Label>
                            <Input id="edit-number" name="number" defaultValue={user.number || ""} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">役職</Label>
                            <Input id="edit-title" name="title" defaultValue={user.title || ""} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-department">部署</Label>
                            <Input id="edit-department" name="department" defaultValue={user.department || ""} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-joiningDate">入社日</Label>
                            <Input id="edit-joiningDate" name="joiningDate" type="date" defaultValue={user.joiningDate || ""} />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-fte">FTE(稼働率)</Label>
                            <Input id="edit-fte" name="fte" type="number" step="0.01" min="0" max="1" defaultValue={user.fte ?? ""} />
                          </div>
                          <div className="space-y-2 flex items-center gap-2">
                            <input id="edit-isEvaluated" name="isEvaluated" type="checkbox" className="w-4 h-4" defaultChecked={user.isEvaluated} />
                            <Label htmlFor="edit-isEvaluated">評価対象</Label>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="edit-capabilityManagerId">Capability評価者</Label>
                            <Select name="capabilityManagerId" defaultValue={user.capabilityManagerId || "-"}>
                              <SelectTrigger>
                                <SelectValue placeholder="Capability評価者を選択（任意）" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="-">（なし）</SelectItem>
                                {managerOptions.map((mgr) => (
                                  <SelectItem key={mgr.id} value={mgr.id}>{mgr.name}（{mgr.role}/{mgr.tier}）</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="edit-projectManagerId">Project評価者</Label>
                            <Select name="projectManagerId" defaultValue={user.projectManagerId || "-"}>
                              <SelectTrigger>
                                <SelectValue placeholder="Project評価者を選択（任意）" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="-">（なし）</SelectItem>
                                {managerOptions.map((mgr) => (
                                  <SelectItem key={mgr.id} value={mgr.id}>{mgr.name}（{mgr.role}/{mgr.tier}）</SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={() => {
                              setIsEditDialogOpen(false);
                              setSelectedUser(null);
                            }}>
                              キャンセル
                            </Button>
                            <Button type="submit" disabled={navigation.state === "submitting"}>
                              {navigation.state === "submitting" ? "更新中..." : "更新"}
                            </Button>
                          </div>
                        </Form>
                      </DialogContent>
                    </Dialog>
                    
                    {!user.retiredAt && (
                      <Dialog open={isRetireDialogOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                        setIsRetireDialogOpen(open);
                        if (!open) setSelectedUser(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
                          >
                            <UserX className="w-4 h-4" />
                            退職処理
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>退職処理</DialogTitle>
                            <DialogDescription>
                              {user.name}さんの退職日を設定します
                            </DialogDescription>
                          </DialogHeader>
                          <Form method="post" className="space-y-4">
                            <input type="hidden" name="action" value="retire" />
                            <input type="hidden" name="userId" value={user.id} />
                            
                            <div className="space-y-2">
                              <Label htmlFor="retiredAt">退職日</Label>
                              <Input 
                                id="retiredAt" 
                                name="retiredAt" 
                                type="date" 
                                required 
                                min={new Date().toISOString().split('T')[0]}
                              />
                            </div>

                            <div className="flex justify-end space-x-2">
                              <Button type="button" variant="outline" onClick={() => {
                                setIsRetireDialogOpen(false);
                                setSelectedUser(null);
                              }}>
                                キャンセル
                              </Button>
                              <Button type="submit" disabled={navigation.state === "submitting"}>
                                {navigation.state === "submitting" ? "処理中..." : "退職処理"}
                              </Button>
                            </div>
                          </Form>
                        </DialogContent>
                      </Dialog>
                    )}
                  </div>
                </div>
              </div>
              
              {/* 前月度の評価情報（不要なら削除） */}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-gray-500">該当するユーザーが見つかりません</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 