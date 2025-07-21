import { json, type ActionFunctionArgs, type LoaderFunctionArgs } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { authenticator } from "~/auth.server";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Lock, Mail, Eye, EyeOff, User } from "lucide-react";
import { useState } from "react";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { sessionStorage } from "~/db/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
  // 既にログインしている場合はダッシュボードにリダイレクト
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/system/ranking",
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const name = formData.get("name") as string;
  const role = formData.get("role") as string;

  try {
    // バリデーション
    if (!email || !password || !name || !role) {
      return json(
        { error: "すべての必須項目を入力してください。" },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return json(
        { error: "パスワードは6文字以上で入力してください。" },
        { status: 400 }
      );
    }

    // 既存ユーザーチェック
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });

    if (existingUser) {
      return json(
        { error: "このメールアドレスは既に使用されています。" },
        { status: 400 }
      );
    }

    // ユーザーの作成
    const userId = `user-${role}-${Date.now()}`;
    const hashedPassword = await bcrypt.hash(password, 10);

    // DBのrole enumに合わせて大文字で保存
    type DBRole = 'ENGINEER' | 'ADMIN' | 'CORP' | 'DESIGNER' | 'OPERATOR' | 'REQUESTOR' | 'SUPERUSER';
    let dbRole: DBRole = "ENGINEER";
    if (role === "admin") dbRole = "ADMIN";
    else if (role === "corp") dbRole = "CORP";
    else if (role === "designer") dbRole = "DESIGNER";
    else if (role === "operator") dbRole = "OPERATOR";
    else if (role === "requestor") dbRole = "REQUESTOR";
    else if (role === "superuser") dbRole = "SUPERUSER";
    // デフォルトはENGINEER

    await db.insert(users).values({
      id: userId,
      email,
      password: hashedPassword,
      name,
      role: dbRole,
      tier: "T3",
      monthlySalary: 0,
      employmentType: "Employee",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // 自動ログイン（手動でセッションをセット）
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    // 作成したユーザー情報を取得
    const user = await db.query.users.findFirst({ where: eq(users.email, email) });
    if (user) {
      session.set("user", user);
      const headers = new Headers();
      headers.append("Set-Cookie", await sessionStorage.commitSession(session));
      return new Response(null, {
        status: 302,
        headers: {
          Location: "/dashboard",
          "Set-Cookie": headers.get("Set-Cookie")!,
        },
      });
    } else {
      return json({ error: "登録後の自動ログインに失敗しました。" }, { status: 500 });
    }

  } catch (error) {
    console.error("Registration error:", error);
    return json(
      { error: "登録に失敗しました。もう一度お試しください。" },
      { status: 500 }
    );
  }
}

export default function Register() {
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* ヘッダー */}
        <div className="text-center">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Code Ranker</h1>
          </Link>
          <p className="text-gray-600">Community Demo</p>
        </div>

        {/* 登録フォーム */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
            <CardDescription className="text-center">
              Create your Code Ranker account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              {actionData?.error && (
                <Alert variant="destructive">
                  <AlertDescription>{
                    actionData.error === "すべての必須項目を入力してください。"
                      ? "Please fill in all required fields."
                      : actionData.error === "パスワードは6文字以上で入力してください。"
                      ? "Password must be at least 6 characters."
                      : actionData.error === "このメールアドレスは既に使用されています。"
                      ? "This email address is already in use."
                      : actionData.error === "登録後の自動ログインに失敗しました。"
                      ? "Failed to log in automatically after registration."
                      : actionData.error === "登録に失敗しました。もう一度お試しください。"
                      ? "Registration failed. Please try again."
                      : actionData.error
                  }</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="example@company.com"
                    required
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                 <Label htmlFor="role">Role</Label>
                 <select
                   id="role"
                   name="role"
                   required
                   className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                 >
                   <option value="">Select a role</option>
                   <option value="engineer">Engineer</option>
                   <option value="admin">Admin</option>
                   <option value="corp">Corporate</option>
                   <option value="designer">Designer</option>
                   <option value="operator">Operator</option>
                   <option value="requestor">Requestor</option>
                   <option value="superuser">Superuser</option>
                 </select>
               </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Create Account"}
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                  Log in
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 