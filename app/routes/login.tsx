import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { Form, Link, useActionData, useNavigation } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { authenticator } from "~/auth.server";
import { sessionStorage } from "~/db/session.server";

// アクションデータの型定義
type ActionData = {
  error?: string;
} | null;

export async function loader() {
  // ログイン済みでもリダイレクトしない（常にログイン画面を表示）
  return null;
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const user = await authenticator.authenticate("form", request);

    
    // セッションを取得してユーザー情報を保存
    const session = await sessionStorage.getSession(
      request.headers.get("Cookie")
    );
    session.set("user", user);
    
    // リダイレクトヘッダーを設定
    const headers = new Headers();
    headers.append(
      "Set-Cookie",
      await sessionStorage.commitSession(session)
    );

    // URLからredirectパラメータを取得
    const url = new URL(request.url);
    const redirectTo = url.searchParams.get("redirect") || "/system/ranking";
    
    return redirect(redirectTo, {
      headers
    });
  } catch (error) {
    console.error("Authentication error:", error);
    return json({ error: (error as Error).message }, { status: 401 });
  }
}

export default function Login() {
  const actionData = useActionData<ActionData>();
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

        {/* ログインフォーム */}
        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Login</CardTitle>
            <CardDescription className="text-center">
              Sign in to your account to access Code Ranker
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form method="post" className="space-y-4">
              {actionData?.error && (
                <Alert variant="destructive">
                  <AlertDescription>{actionData.error}</AlertDescription>
                </Alert>
              )}

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    required
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
                {isSubmitting ? "Signing in..." : "Sign In"}
              </Button>
            </Form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-blue-600 hover:text-blue-500 font-medium">
                  Sign up
                </Link>
              </p>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
} 