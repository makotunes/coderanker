import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, Form, useNavigation } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { weeklyPreEvaluations, users } from "~/db/schema";
import { ne } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { 
  ArrowLeft, 
  AlertTriangle,
  Save,
  User
} from "lucide-react";
import { createId } from "@paralleldrive/cuid2";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }

  // 現在の週を取得
  const now = new Date();
  const currentWeek = getWeekString(now);
  
  // 評価対象となるユーザーを取得（ADMIN以外）
  const evaluatees = await db
    .select({
      id: users.id,
      name: users.name,
      role: users.role,
      tier: users.tier,
    })
    .from(users)
    .where(ne(users.role, "ADMIN"))
    .orderBy(users.name);

  return json({ 
    user, 
    evaluatees, 
    currentWeek 
  });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }

  const formData = await request.formData();
  const action = formData.get("action") as string;

  if (action === "create") {
    const evaluateeId = formData.get("evaluateeId") as string;
    const week = formData.get("week") as string;
    const penaltyPoints = parseFloat(formData.get("penaltyPoints") as string) || 0;
    const penaltyReason = formData.get("penaltyReason") as string;
    const comments = formData.get("comments") as string;

    if (!evaluateeId || !week || !penaltyReason) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }

    try {
      await db.insert(weeklyPreEvaluations).values({
        id: createId(),
        evaluatorId: user.id,
        evaluateeId,
        week,
        evaluationType: "penalty",
        evaluatorRole: "admin",
        penaltyPoints,
        penaltyReason,
        comments,
        status: "completed",
        dueDate: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      return json({ success: "ペナルティ評価を作成しました" });
    } catch (error) {
      return json({ error: "ペナルティ評価の作成に失敗しました" }, { status: 500 });
    }
  }

  return json({ error: "無効なアクションです" }, { status: 400 });
}

// 週文字列を取得する関数（例: 2024-W27）
function getWeekString(date: Date): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

export default function CreatePenaltyPage() {
  const { evaluatees, currentWeek } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/system/evaluations")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Evaluation List
        </Button>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create Penalty Evaluation</h1>
            <p className="text-muted-foreground">
              Create a penalty evaluation (ADMIN only)
            </p>
          </div>
        </div>
      </div>

      <Form method="post" className="space-y-6">
        <input type="hidden" name="action" value="create" />

        {/* 基本情報 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="evaluateeId">Evaluatee</Label>
                <Select name="evaluateeId" required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select evaluatee" />
                  </SelectTrigger>
                  <SelectContent>
                    {evaluatees.map((evaluatee) => (
                      <SelectItem key={evaluatee.id} value={evaluatee.id}>
                        <div className="flex items-center gap-2">
                          <span>{evaluatee.name}</span>
                          <Badge variant="outline" className="text-xs">
                            {evaluatee.role} / {evaluatee.tier}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="week">Target Week</Label>
                <Input
                  id="week"
                  name="week"
                  type="text"
                  defaultValue={currentWeek}
                  required
                  placeholder="2024-W27"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* ペナルティ評価 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              Penalty Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="penaltyPoints">Penalty Points (negative value)</Label>
                <Input
                  id="penaltyPoints"
                  name="penaltyPoints"
                  type="number"
                  step="0.1"
                  defaultValue="0"
                  required
                  placeholder="-100"
                />
                <p className="text-xs text-gray-500">
                  Please enter a negative value (e.g. -50, -100)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="penaltyReason">Penalty Reason *</Label>
                <Textarea
                  id="penaltyReason"
                  name="penaltyReason"
                  required
                  placeholder="Please describe the reason for the penalty"
                  rows={3}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 評価コメント */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments</Label>
              <Textarea
                id="comments"
                name="comments"
                placeholder="Enter any comments regarding the evaluation"
                rows={4}
              />
            </div>
          </CardContent>
        </Card>

        {/* 送信ボタン */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/system/evaluations")}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <Save className="w-4 h-4" />
                Creating...
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Create Penalty Evaluation
              </>
            )}
          </Button>
        </div>
      </Form>
    </div>
  );
} 