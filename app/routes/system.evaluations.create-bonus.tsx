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
  Save,
  User,
  Star
} from "lucide-react";
import { createId } from "@paralleldrive/cuid2";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized", { status: 403 });
  }
  const now = new Date();
  const currentWeek = getWeekString(now);
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
  return json({ user, evaluatees, currentWeek });
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
    const bonusPoints = parseFloat(formData.get("bonusPoints") as string) || 0;
    const bonusReason = formData.get("bonusReason") as string;
    const comments = formData.get("comments") as string;
    if (!evaluateeId || !week || !bonusReason) {
      return json({ error: "必須項目を入力してください" }, { status: 400 });
    }
    try {
      await db.insert(weeklyPreEvaluations).values({
        id: createId(),
        evaluatorId: user.id,
        evaluateeId,
        week,
        evaluationType: "bonus",
        evaluatorRole: "admin",
        bonusPoints,
        bonusReason,
        comments,
        status: "completed",
        dueDate: new Date().toISOString(),
        completedAt: new Date().toISOString(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      return json({ success: "ボーナス評価を作成しました" });
    } catch (error) {
      return json({ error: "ボーナス評価の作成に失敗しました" }, { status: 500 });
    }
  }
  return json({ error: "無効なアクションです" }, { status: 400 });
}

function getWeekString(date: Date): string {
  const year = date.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((date.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

export default function CreateBonusPage() {
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
          <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-yellow-400 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            <Star className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create Bonus Evaluation</h1>
            <p className="text-muted-foreground">
              Create a bonus evaluation (ADMIN only)
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
        {/* ボーナス評価 */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="w-5 h-5 text-green-600" />
              Bonus Evaluation
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="bonusPoints">Bonus Points (positive value)</Label>
                <Input
                  id="bonusPoints"
                  name="bonusPoints"
                  type="number"
                  step="0.1"
                  defaultValue="0"
                  required
                  placeholder="100"
                />
                <p className="text-xs text-gray-500">
                  Please enter a positive value (e.g. 50, 100)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bonusReason">Bonus Reason *</Label>
                <Textarea
                  id="bonusReason"
                  name="bonusReason"
                  required
                  placeholder="Please describe the reason for the bonus"
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
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="default"
            disabled={isSubmitting}
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            {isSubmitting ? "Creating..." : "Create Bonus Evaluation"}
          </Button>
        </div>
      </Form>
    </div>
  );
} 