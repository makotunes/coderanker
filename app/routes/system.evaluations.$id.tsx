import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, Form, useNavigation, redirect } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { weeklyPreEvaluations, users } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { Textarea } from "~/components/ui/textarea";
import { Progress } from "~/components/ui/progress";
import { 
  ArrowLeft, 
  Brain, 
  GitBranch, 
  Users, 
  AlertTriangle,
  Save,
  CheckCircle
} from "lucide-react";

export async function loader({ request, params }: LoaderFunctionArgs) {
  await requireUser(request);
  const evaluationId = params.id;
  const url = new URL(request.url);
  const isDebugMode = url.searchParams.get('debug') === 'true';

  if (!evaluationId) {
    throw new Response("Evaluation ID is not specified", { status: 400 });
  }

  // // ADMINのみアクセス可能
  // if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
  //   throw new Response("Unauthorized, [object Object] status: 403");
  // }

  // 評価タスクを取得（evaluateeのマネージャーIDも取得）
  const evaluation = await db
    .select()
    .from(weeklyPreEvaluations)
    .innerJoin(users, eq(weeklyPreEvaluations.evaluateeId, users.id))
    .where(eq(weeklyPreEvaluations.id, evaluationId))
    .limit(1);

  if (!evaluation[0]) {
    throw new Response("Evaluation not found", { status: 404 });
  }

  return json({ evaluation: evaluation[0], isDebugMode });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const user = await requireUser(request);
  
  // ADMINのみアクセス可能
  if (user.role !== "ADMIN" && user.role !== "SUPERUSER") {
    throw new Response("Unauthorized, [object Object] status: 403");
  }

  const evaluationId = params.id;

  if (!evaluationId) {
    throw new Response("Evaluation ID is not specified", { status: 400 });
  }

  // 評価タスクとevaluateeのマネージャーIDを取得
  const evaluation = await db
    .select()
    .from(weeklyPreEvaluations)
    .innerJoin(users, eq(weeklyPreEvaluations.evaluateeId, users.id))
    .where(eq(weeklyPreEvaluations.id, evaluationId))
    .limit(1);

  if (!evaluation[0]) {
    throw new Response("Evaluation not found", { status: 404 });
  }

  const formData = await request.formData();
  const action = formData.get("action") as string;

  if (action === "submit") {
    const evaluationType = formData.get("evaluationType") as string;
    const comments = formData.get("comments") as string;

    try {
      let updateData: Record<string, unknown> = {
        comments,
        status: "completed",
        completedAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      // 評価タイプに応じてデータを設定
      switch (evaluationType) {
        case "quality":
          updateData = {
            ...updateData,
            qualityScore: parseFloat(formData.get("qualityScore") as string) || 0,
            requirementCoverage: parseFloat(formData.get("requirementCoverage") as string) || 0,
            testCoverage: parseFloat(formData.get("testCoverage") as string) || 0,
            seniorReviewScore: parseFloat(formData.get("seniorReviewScore") as string) || 0,
            aiCrossEvaluation: parseFloat(formData.get("aiCrossEvaluation") as string) || 0,
          };
          break;
        case "quantity":
          updateData = {
            ...updateData,
            quantityPoints: parseFloat(formData.get("quantityPoints") as string) || 0,
            commitQuality: parseFloat(formData.get("commitQuality") as string) || 0,
            processConsistency: parseFloat(formData.get("processConsistency") as string) || 0,
            developmentRhythm: parseFloat(formData.get("developmentRhythm") as string) || 0,
            problemSolvingApproach: parseFloat(formData.get("problemSolvingApproach") as string) || 0,
            functionFp: formData.get("functionFp") ? parseInt(formData.get("functionFp") as string, 10) : null,
            addedLines: formData.get("addedLines") ? parseInt(formData.get("addedLines") as string, 10) : null,
            deletedLines: formData.get("deletedLines") ? parseInt(formData.get("deletedLines") as string, 10) : null,
            commitCount: formData.get("commitCount") ? parseInt(formData.get("commitCount") as string, 10) : null,
          };
          break;
        case "satisfaction":
          updateData = {
            ...updateData,
            satisfactionScore: parseFloat(formData.get("satisfactionScore") as string) || 0,
            requirementAlignment: parseFloat(formData.get("requirementAlignment") as string) || 0,
            processQuality: parseFloat(formData.get("processQuality") as string) || 0,
            businessValue: parseFloat(formData.get("businessValue") as string) || 0,
            usability: parseFloat(formData.get("usability") as string) || 0,
          };
          break;
        case "penalty":
          updateData = {
            ...updateData,
            penaltyPoints: parseFloat(formData.get("penaltyPoints") as string) || 0,
            penaltyRate: parseFloat(formData.get("penaltyRate") as string) || 0,
            penaltyReason: formData.get("penaltyReason") as string,
          };
          break;
        case "bonus":
          updateData = {
            ...updateData,
            bonusPoints: parseFloat(formData.get("bonusPoints") as string) || 0,
            bonusReason: formData.get("bonusReason") as string,
          };
          break;
      }

      await db
        .update(weeklyPreEvaluations)
        .set(updateData)
        .where(eq(weeklyPreEvaluations.id, evaluationId));

      return redirect("/system/evaluations");
    } catch (error) {
      return json({ error: "Failed to save evaluation" }, { status: 500 });
    }
  }

  return json({ error: "Invalid action" }, { status: 400 });
}

// 評価タイプの表示名を取得
function getEvaluationTypeLabel(type: string): string {
  switch (type) {
    case "quality":
      return "Output Quality Evaluation";
    case "quantity":
      return "Output Quantity Evaluation";
    case "satisfaction":
      return "Client Evaluation";
    case "penalty":
      return "Penalty Evaluation";
    case "bonus":
      return "Bonus Evaluation";
    default:
      return type;
  }
}

// 評価タイプのアイコンを取得
function getEvaluationTypeIcon(type: string) {
  switch (type) {
    case "quality":
      return <Brain className="w-5 h-5 text-blue-600" />;
    case "quantity":
      return <GitBranch className="w-5 h-5 text-green-600" />;
    case "satisfaction":
      return <Users className="w-5 h-5 text-purple-600" />;
    case "penalty":
      return <AlertTriangle className="w-5 h-5 text-red-600" />;
    default:
      return <Brain className="w-5 h-5" />;
  }
}

export default function EvaluationDetailPage() {
  const { evaluation, isDebugMode } = useLoaderData<typeof loader>();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const isSubmitting = navigation.state === "submitting";
  const dueDate = new Date(evaluation.weekly_pre_evaluations?.dueDate);
  const now = new Date();
  const isOverdue = evaluation.weekly_pre_evaluations?.status === "overdue" || now > dueDate;
  const isCompleted = evaluation.weekly_pre_evaluations?.status === "completed";
  const msIn24h = 24 * 60 * 60 * 1000;
  const isDueSoon = !isOverdue && !isCompleted && dueDate.getTime() - now.getTime() < msIn24h;

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <Button variant="ghost" onClick={() => navigate("/system/evaluations")} className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Evaluation List
        </Button>
        {/* 期限警告・ペナルティ注意 */}
        {isDueSoon && (
          <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 font-bold rounded">
            Less than 24 hours left. If the evaluation is not completed, penalty points will be automatically applied to both the evaluator and the evaluatee.
          </div>
        )}
        {isOverdue && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-900 font-bold rounded">
            Editing is not allowed due to overdue. If the evaluation is incomplete, penalty points will be applied to both the evaluator and the evaluatee.
          </div>
        )}
        {!isOverdue && (
          <div className="mb-4 p-3 bg-cyan-50 border-l-4 border-cyan-400 text-cyan-900 rounded">
            <span className="font-bold">Note:</span> You can re-edit even after completion as long as it is within the deadline. After the closing date, it will be finalized by batch processing or become uneditable if overdue.
          </div>
        )}
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
            {evaluation.users?.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-3xl font-bold">Evaluation for {evaluation.users?.name}</h1>
            <p className="text-muted-foreground">
              {evaluation.weekly_pre_evaluations?.week} | {getEvaluationTypeLabel(evaluation.weekly_pre_evaluations?.evaluationType)}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="outline">{evaluation.users?.role} / {evaluation.users?.tier}</Badge>
              {evaluation.weekly_pre_evaluations?.status === "completed" && (
                <Badge variant="default" className="bg-green-100 text-green-800 border-green-200">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Completed
                </Badge>
              )}
              {isDebugMode && (
                <Badge variant="outline" className="bg-purple-100 text-purple-700 border-purple-300">
                  Debug Mode
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>

      <Form method="post" className="space-y-6">
        <input type="hidden" name="action" value="submit" />
        <input type="hidden" name="evaluationType" value={evaluation.weekly_pre_evaluations?.evaluationType} />

        {/* 成果物品質評価 */}
        {evaluation.weekly_pre_evaluations?.evaluationType === "quality" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getEvaluationTypeIcon(evaluation.weekly_pre_evaluations.evaluationType)}
                Output Quality Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* --- アシスト: ガイドリンクと要点 --- */}
              <div className="mb-4 p-4 bg-teal-50 border-l-4 border-teal-400 rounded space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="text-teal-800 font-semibold text-base">
                    <span>Please follow the guidelines and provide <b>as much quantitative evidence and numbers as possible</b>.</span>
                  </div>
                  <a
                    href="/docs/senior-evaluation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-teal-700 hover:underline font-bold text-sm"
                  >
                    <span className="mr-1">See Output Quality Evaluation Guidelines</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 17V7"/></svg>
                  </a>
                </div>
                <ul className="mt-2 ml-4 text-sm text-teal-900 list-disc">
                  <li>Emphasize requirement definition → test cases → comprehensive/multilayered implementation → coverage</li>
                  <li>Semi-automatic verification by AI and humans</li>
                  <li className="mt-2 p-2 bg-cyan-100 border-l-4 border-cyan-500 text-cyan-900 font-bold rounded">Encourage automatic/semi-automatic evaluation of codebase using CI/CD and AI.</li>
                  <li className="mt-2 p-2 bg-cyan-50 border-l-4 border-cyan-300 text-cyan-800 font-bold rounded">
                    <a href="/docs/senior-evaluation" target="_blank" rel="noopener noreferrer" className="underline text-cyan-800 font-bold">
                      For AI prompt examples and detailed guidelines, see &quot;Output Quality Evaluation Guidelines&quot;
                    </a>
                  </li>
                  <li>Also consider &quot;technical quality&quot;, &quot;standardization&quot;, &quot;consistency&quot;, and &quot;improvement proposals&quot;</li>
                  <li className="mt-2 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 font-bold rounded">For non-engineers (designers, operators, corporate, etc.), focus on <b>output quality</b> and feel free to interpret each parameter according to your work. Unused parameters will be neutral (no effect on evaluation).</li>
                </ul>
                {/* --- 5段階評価の基準表 --- */}
                <div className="mt-4">
                  <div className="font-bold text-teal-900 mb-1">5-Point Evaluation Criteria (Common Image for All Items)</div>
                  <table className="w-full text-xs border border-teal-200 bg-white rounded">
                    <thead>
                      <tr className="bg-teal-100 text-teal-900">
                        <th className="px-2 py-1 border">Score</th>
                        <th className="px-2 py-1 border">Criteria / Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">100</td>
                        <td className="px-2 py-1 border break-words">Best practice. Excellent in all respects, systematic, comprehensive, high quality.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">75</td>
                        <td className="px-2 py-1 border break-words">High quality. Almost as expected, with minor room for improvement in details.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">50</td>
                        <td className="px-2 py-1 border break-words">Standard. Half good, half issues. Average quality.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">25</td>
                        <td className="px-2 py-1 border break-words">Needs improvement. Many clear issues, lacking in quality/coverage.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">0</td>
                        <td className="px-2 py-1 border break-words">Serious problem. Does not meet requirements/quality standards.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* --- 各項目の具体的な評価観点 --- */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-bold text-teal-900 mb-1">Requirement Definition / Test Cases</div>
                    <ul className="list-disc ml-5 text-sm text-teal-900">
                      <li>Completeness and clarity of requirement definition</li>
                      <li>Are test cases comprehensively derived from requirements?</li>
                      <li>Are there tests for each layer (unit, integration, E2E)?</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-teal-900 mb-1">Comprehensive / Multilayered Implementation</div>
                    <ul className="list-disc ml-5 text-sm text-teal-900">
                      <li>Is implementation consistent with requirements at each layer?</li>
                      <li>Do tests actually pass?</li>
                      <li>Are edge cases and error cases covered?</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-teal-900 mb-1">Coverage / Quality Assurance</div>
                    <ul className="list-disc ml-5 text-sm text-teal-900">
                      <li>Are there test coverage reports or CI results?</li>
                      <li>Is coverage sufficient (e.g., 80%+)?</li>
                      <li>Are there records/systems for quality assurance?</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-teal-900 mb-1">Design / Security / Performance</div>
                    <ul className="list-disc ml-5 text-sm text-teal-900">
                      <li>Consistency, scalability, maintainability of architecture</li>
                      <li>Detection and countermeasures for security vulnerabilities</li>
                      <li>Performance optimization, management of technical debt</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-teal-900 mb-1">Improvement Proposals / Summary</div>
                    <ul className="list-disc ml-5 text-sm text-teal-900">
                      <li>Specific improvement proposals based on verification results</li>
                      <li>Items and priorities for next verification</li>
                      <li>Proposals for best practices or new perspectives</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="qualityScore">Requirement Definition / Test Cases</Label>
                  <Input
                    id="qualityScore"
                    name="qualityScore"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.qualityScore || 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                  <Progress value={evaluation.weekly_pre_evaluations.qualityScore || 0} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requirementCoverage">Comprehensive / Multilayered Implementation</Label>
                  <Input
                    id="requirementCoverage"
                    name="requirementCoverage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.requirementCoverage || 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                  <Progress value={evaluation.weekly_pre_evaluations.requirementCoverage || 0} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="testCoverage">Coverage / Quality Assurance</Label>
                  <Input
                    id="testCoverage"
                    name="testCoverage"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.testCoverage || 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                  <Progress value={evaluation.weekly_pre_evaluations.testCoverage || 0} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="seniorReviewScore">Design / Security / Performance</Label>
                  <Input
                    id="seniorReviewScore"
                    name="seniorReviewScore"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.seniorReviewScore || 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                  <Progress value={evaluation.weekly_pre_evaluations.seniorReviewScore || 0} className="w-full" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aiCrossEvaluation">Improvement Proposals / Summary</Label>
                  <Input
                    id="aiCrossEvaluation"
                    name="aiCrossEvaluation"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.aiCrossEvaluation || 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                  <Progress value={evaluation.weekly_pre_evaluations.aiCrossEvaluation || 0} className="w-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 成果量評価 */}
        {evaluation.weekly_pre_evaluations?.evaluationType === "quantity" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getEvaluationTypeIcon(evaluation.weekly_pre_evaluations.evaluationType)}
                Output Quantity Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* --- アシスト: ガイドリンクと要点 --- */}
              <div className="mb-4 p-4 bg-green-50 border-l-4 border-green-400 rounded space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="text-green-800 font-semibold text-base">
                    <span>Please follow the guidelines and provide <b>as much quantitative evidence and numbers as possible</b>.</span>
                  </div>
                  <a
                    href="/docs/commit-evaluation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-green-700 hover:underline font-bold text-sm"
                  >
                    <span className="mr-1">See Output Quantity Evaluation Guidelines</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 17V7H7"/></svg>
                  </a>
                </div>
                <ul className="mt-2 ml-4 text-sm text-green-900 list-disc">
                  <li>Quantitative evaluation of weekly output through Git commit history and diff analysis</li>
                  <li>Focus on consistency with requirements, functional implementation volume, and development process quality</li>
                  <li>Evaluate &quot;actual functional implementation status&quot; rather than superficial line counts or file numbers</li>
                  <li>If not applicable, leave blank for neutral (no evaluation) status</li>
                  <li className="mt-2 p-2 bg-cyan-100 border-l-4 border-cyan-500 text-cyan-900 font-bold rounded">We recommend using AI to investigate commit history and automatically verify consistency with requirements.</li>
                </ul>
                {/* --- 5段階評価の基準表 --- */}
                <div className="mt-4">
                  <div className="font-bold text-green-900 mb-1">5-Point Evaluation Criteria (Common Image for All Items)</div>
                  <table className="w-full text-xs border border-green-200 bg-white rounded">
                    <thead>
                      <tr className="bg-green-100 text-green-900">
                        <th className="px-2 py-1 border">Score</th>
                        <th className="px-2 py-1 border">Criteria / Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">100</td>
                        <td className="px-2 py-1 border break-words">Excellent functional implementation volume and quality aligned with requirements, quantitatively high output.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">75</td>
                        <td className="px-2 py-1 border break-words">Sufficient output volume and quality. Minor room for improvement in details, but overall good.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">50</td>
                        <td className="px-2 py-1 border break-words">Standard. Average output volume and quality. Good points and challenges are balanced.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">25</td>
                        <td className="px-2 py-1 border break-words">Both output volume and quality are insufficient. Many clear challenges.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">0</td>
                        <td className="px-2 py-1 border break-words">Both requirements and output volume are significantly lacking. Does not meet evaluation criteria.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* --- 各項目の具体的な評価観点 --- */}
                <div className="mt-4">
                  <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 rounded">
                    <span className="font-bold text-yellow-900">【For Non-Engineer Roles】</span><br />
                    <span className="text-yellow-900 text-sm">
                      For non-engineers (designers, operators, corporate, etc.), focus on <b>output volume</b> and feel free to <b>interpret each parameter according to your work</b>.<br />
                      Unused parameters will be neutral (no effect on evaluation) if left blank.<br />
                      Please evaluate according to the <b>FP (Function Point) definition</b>.
                    </span>
                  </div>
                  <div className="mb-4 p-3 bg-green-100 border-l-4 border-green-400 rounded">
                    <div className="font-bold text-green-900 mb-1">FP (Function Point) Definition</div>
                    <ul className="list-disc ml-5 text-sm text-green-900">
                      <li><b>Engineer:</b> 1FP = 1 independent function (e.g., API endpoint, screen, batch process, etc.)</li>
                      <li><b>Designer:</b> 1FP = 1 screen UI design, or 1 major visual deliverable</li>
                      <li><b>Operator:</b> 1FP = 1 business process automation/efficiency improvement, or 1 major operational improvement</li>
                      <li><b>Corporate:</b> 1FP = 1 system design, regulation establishment, or 1 company-wide business improvement</li>
                    </ul>
                    <div className="text-xs text-green-800 mt-2">※Interpret flexibly according to project and role, prioritizing team-agreed standards.</div>
                    <div className="text-xs text-green-800 mt-1">※Total output evaluation is calculated as absolute volume (FP, lines, etc.) and <b>adjusted with role-specific weights</b> (weights may change during operation).</div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="font-bold text-green-900 mb-1">Functional Implementation Volume</div>
                      <ul className="list-disc ml-5 text-sm text-green-900">
                        <li>New file creation count and functional addition commit count</li>
                        <li>Increase/decrease in implementation lines</li>
                        <li>Implementation status of functions corresponding to requirements</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-green-900 mb-1">Requirement Alignment</div>
                      <ul className="list-disc ml-5 text-sm text-green-900">
                        <li>Consistency with requirements</li>
                        <li>Implementation of high-priority functions</li>
                        <li>Completion and quality of functions</li>
                        <li>Ability to respond to requirement changes</li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-bold text-green-900 mb-1">Development Process</div>
                      <ul className="list-disc ml-5 text-sm text-green-900">
                        <li>Commit granularity and frequency</li>
                        <li>Consistency of development methods</li>
                        <li>Continuous development rhythm</li>
                        <li>Efficiency of problem-solving</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 絶対量入力欄 */}
                <div className="space-y-2">
                  <Label htmlFor="functionFp">Functional Implementation FP (Function Point)</Label>
                  <Input
                    id="functionFp"
                    name="functionFp"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={evaluation.weekly_pre_evaluations.functionFp ?? ""}
                    placeholder="e.g.: 8"
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addedLines">Added Commit Lines</Label>
                  <Input
                    id="addedLines"
                    name="addedLines"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={evaluation.weekly_pre_evaluations.addedLines ?? ""}
                    placeholder="e.g.: 1200"
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="deletedLines">Deleted Commit Lines</Label>
                  <Input
                    id="deletedLines"
                    name="deletedLines"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={evaluation.weekly_pre_evaluations.deletedLines ?? ""}
                    placeholder="e.g.: 300"
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="commitCount">Commit Count</Label>
                  <Input
                    id="commitCount"
                    name="commitCount"
                    type="number"
                    min="0"
                    step="1"
                    defaultValue={evaluation.weekly_pre_evaluations.commitCount ?? ""}
                    placeholder="e.g.: 15"
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
                {/* 0-100スコア欄 */}
                <div className="space-y-2">
                  <Label htmlFor="quantityPoints">Functional Implementation Volume</Label>
                  <p className="text-xs text-gray-500 mt-1">
                    Please evaluate with a 0-100 score.<br />
                    <b>Usually evaluate based on the quantitative items below (FP, lines, commit count, etc.),<br />
                    but adjust this value if you have your own criteria or special circumstances.</b>
                  </p>
                  <Select
                    name="quantityPoints"
                    defaultValue={String(evaluation.weekly_pre_evaluations.quantityPoints || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="commitQuality">Requirement Alignment</Label>
                  <p className="text-xs text-gray-500 mt-1">Please ensure there are not many low-value commits and that they align with requirements.</p>
                  <Select
                    name="commitQuality"
                    defaultValue={String(evaluation.weekly_pre_evaluations.commitQuality || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processConsistency">Development Process</Label>
                  <Select
                    name="processConsistency"
                    defaultValue={String(evaluation.weekly_pre_evaluations.processConsistency || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 依頼者評価 */}
        {evaluation.weekly_pre_evaluations?.evaluationType === "satisfaction" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getEvaluationTypeIcon(evaluation.weekly_pre_evaluations.evaluationType)}
                Client Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* --- アシスト: ガイドリンクと要点 --- */}
              <div className="mb-4 p-4 bg-cyan-50 border-l-4 border-cyan-400 rounded space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="text-cyan-800 font-semibold text-base">
                    <span>Please follow the evaluation guidelines and intuitively provide a <b>qualitative 5-point evaluation</b>.</span>
                  </div>
                  <a
                    href="/docs/client-evaluation"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-cyan-700 hover:underline font-bold text-sm"
                  >
                    <span className="mr-1">See Evaluation Guidelines</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 17V7H7"/></svg>
                  </a>
                </div>
                <ul className="mt-2 ml-4 text-sm text-cyan-900 list-disc">
                  <li>Focus on requirement alignment and process quality</li>
                  <li>Intuitive evaluation in under 25 minutes</li>
                  <li>Emphasize &quot;requirement fulfillment&quot; and &quot;low manager burden&quot; over technical details</li>
                  <li className="mt-2 p-2 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 font-bold rounded">For non-engineers (designers, operators, corporate, etc.), focus on <b>output quality</b> and feel free to interpret each parameter according to your work. Unused parameters will be neutral (no effect on evaluation).</li>
                </ul>
                {/* --- 5段階評価の基準表 --- */}
                <div className="mt-4">
                  <div className="font-bold text-cyan-900 mb-1">5-Point Evaluation Criteria (Common Image for All Items)</div>
                  <table className="w-full text-xs border border-cyan-200 bg-white rounded">
                    <thead>
                      <tr className="bg-cyan-100 text-cyan-900">
                        <th className="px-2 py-1 border">Score</th>
                        <th className="px-2 py-1 border">Criteria / Image</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">100</td>
                        <td className="px-2 py-1 border break-words">Fully meets expectations, excellent in all respects. Clearly &quot;outstanding&quot;.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">75</td>
                        <td className="px-2 py-1 border break-words">Almost as expected. Some room for improvement in details, but overall very good.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">50</td>
                        <td className="px-2 py-1 border break-words">Meets about half of expectations. Balanced good points and challenges. Average.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">25</td>
                        <td className="px-2 py-1 border break-words">Below expectations. Many clear challenges, needs improvement.</td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 border text-center font-bold">0</td>
                        <td className="px-2 py-1 border break-words">Does not meet expectations at all. Significantly deviates from requirements.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                {/* --- 各項目の具体的な評価観点 --- */}
                <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="font-bold text-cyan-900 mb-1">Client Satisfaction</div>
                    <ul className="list-disc ml-5 text-sm text-cyan-900">
                      <li>Is the deliverable as expected and satisfactory?</li>
                      <li>Would you want to request again?</li>
                      <li>If unsure, use your intuition.</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-cyan-900 mb-1">Requirement Alignment</div>
                    <ul className="list-disc ml-5 text-sm text-cyan-900">
                      <li>Are functional and non-functional requirements implemented as specified?</li>
                      <li>Do business and operational requirements also meet expectations?</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-cyan-900 mb-1">Process Quality</div>
                    <ul className="list-disc ml-5 text-sm text-cyan-900">
                      <li>Are reporting, communication, and consultation appropriate?</li>
                      <li>Is the manager&apos;s burden minimized?</li>
                      <li>Is progress sharing and issue handling smooth?</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-cyan-900 mb-1">Business Value</div>
                    <ul className="list-disc ml-5 text-sm text-cyan-900">
                      <li>Does the deliverable create business value?</li>
                      <li>Is it valuable including user experience and operations?</li>
                    </ul>
                  </div>
                  <div>
                    <div className="font-bold text-cyan-900 mb-1">Usability</div>
                    <ul className="list-disc ml-5 text-sm text-cyan-900">
                      <li>Is it actually easy to use?</li>
                      <li>Is it easy to operate and maintain?</li>
                      <li>Is it user-friendly and not problematic from a user perspective?</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* 依頼者満足度 */}
                <div className="space-y-2">
                  <Label htmlFor="satisfactionScore">Client Satisfaction</Label>
                  <Select
                    name="satisfactionScore"
                    defaultValue={String(evaluation.weekly_pre_evaluations.satisfactionScore || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Example: Evaluate based on the quantitative items below (FP, lines, commit count, etc.) as 0-100, but adjust this value if you have your own criteria or special circumstances.</p>
                </div>
                {/* 要件一致性 */}
                <div className="space-y-2">
                  <Label htmlFor="requirementAlignment">Requirement Alignment</Label>
                  <Select
                    name="requirementAlignment"
                    defaultValue={String(evaluation.weekly_pre_evaluations.requirementAlignment || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Example: Is the implementation consistent with the requirements, the achievement of functional and non-functional requirements.</p>
                </div>
                {/* プロセス品質 */}
                <div className="space-y-2">
                  <Label htmlFor="processQuality">Process Quality</Label>
                  <Select
                    name="processQuality"
                    defaultValue={String(evaluation.weekly_pre_evaluations.processQuality || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Example: Is the reporting, communication, and consultation appropriate, the reduction of manager burden, the quality of progress sharing.</p>
                </div>
                {/* ビジネス価値 */}
                <div className="space-y-2">
                  <Label htmlFor="businessValue">Business Value</Label>
                  <Select
                    name="businessValue"
                    defaultValue={String(evaluation.weekly_pre_evaluations.businessValue || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Example: Is the deliverable creating business value, the realization of value, user experience.</p>
                </div>
                {/* 使いやすさ */}
                <div className="space-y-2">
                  <Label htmlFor="usability">Usability</Label>
                  <Select
                    name="usability"
                    defaultValue={String(evaluation.weekly_pre_evaluations.usability || 0)}
                    required
                    disabled={isOverdue || isDebugMode}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select score" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 25, 50, 75, 100].map((val) => (
                        <SelectItem key={val} value={String(val)}>{val}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-gray-500 mt-1">Example: Is it actually easy to use, considerate in operation and maintenance, evaluation from user perspective.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ペナルティ評価 */}
        {evaluation.weekly_pre_evaluations?.evaluationType === "penalty" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getEvaluationTypeIcon(evaluation.weekly_pre_evaluations.evaluationType)}
                Penalty Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* --- ペナルティ評価ガイドライン --- */}
              <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-400 rounded space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="font-bold text-red-800 text-base">
                    Penalty Evaluation Guidelines
                  </div>
                  <a
                    href="/docs/penalty-guidelines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-red-700 hover:underline font-bold text-sm"
                  >
                    <span className="mr-1">See Penalty Evaluation Guidelines</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 17V7H7"/></svg>
                  </a>
                </div>
                <ul className="list-disc ml-5 text-sm text-red-900 space-y-1">
                  <li><b>If the evaluation is not completed after the evaluation deadline, both the evaluator and the evaluatee will automatically receive a penalty.</b></li>
                  <li>If a penalty is given individually, points can be directly subtracted or existing points can be reduced at a certain rate.</li>
                  <li>Penalties are categorized according to the severity of the case (e.g., A=serious, B=moderate, C=slight).</li>
                  <li>Typical penalty cases:</li>
                  <ul className="ml-5 list-[circle] space-y-1">
                    <li><b>A Rank (Serious):</b>
                      <span className="ml-2 text-xs text-red-700">Approximately: Penalty rate 80-100%</span>
                      <ul className="ml-5 list-[square] space-y-1">
                        <li>Security violations (e.g., password or API key leakage, unauthorized access)</li>
                        <li>Information leakage (e.g., customer information or confidential data leakage, leakage on SNS, etc.)</li>
                        <li>Unethical behavior (e.g., embedding prompts to deceive AI, tampering with results, false reporting)</li>
                        <li>Illegal behavior (e.g., copyright infringement, law violation, unauthorized external service use)</li>
                        <li>Serious harassment, discrimination, violence</li>
                        <li>Actions that severely damage organizational credibility</li>
                      </ul>
                      <div className="text-xs text-red-700 font-bold mt-2">※In case of serious incidents, immediate dismissal or demotion may also be targets.</div>
                    </li>
                    <li><b>B Rank (Moderate):</b>
                      <span className="ml-2 text-xs text-orange-700">Approximately: Penalty rate 50-80%</span>
                      <ul className="ml-5 list-[square] space-y-1">
                        <li>Actions that inconvenience others (e.g., repeated lateness/absence without permission, actions that disrupt team cohesion)</li>
                        <li>Disregard for business instructions/serious business delays</li>
                        <li>Neglect of important reporting, communication, consultation</li>
                        <li>Actions that obstruct project progress (e.g., abandonment of review requests, neglect of necessary information sharing)</li>
                        <li>Light information management errors (e.g., accidental internal information transmission)</li>
                      </ul>
                      <div className="text-xs text-red-700 font-bold mt-2">※In case of serious incidents, immediate demotion may also be targets.</div>
                      <div className="text-xs text-red-700 font-bold mt-2">※If a moderate penalty case is repeated and attention is not paid, it may be treated as a serious case (A rank).</div>
                    </li>
                    <li><b>C Rank (Slight):</b>
                      <span className="ml-2 text-xs text-yellow-700">Approximately: Penalty rate 3-10%, Penalty points 1-500</span>
                      <ul className="ml-5 list-[square] space-y-1">
                        <li>Light rule violations (e.g., formatting violations, minor procedural errors)</li>
                        <li>Report delays/slight deadline delays</li>
                        <li>Actions at the attention level (e.g., whispering during meetings, light manners violations)</li>
                        <li>Temporary performance degradation (if not continuous, C rank)</li>
                      </ul>
                    </li>
                    <li><b>D Rank (Very slight):</b>
                      <span className="ml-2 text-xs text-gray-700">Approximately: Penalty rate 1-3%, Penalty points 1-100</span>
                      <ul className="ml-5 list-[square] space-y-1">
                        <li>Very light rule violations or manners violations (e.g., temporary small mistakes, light lateness, light communication deficiency, etc.)</li>
                        <li>Actions that are expected to improve immediately</li>
                      </ul>
                    </li>
                  </ul>
                  <li>
                    <span className="font-bold text-red-700">
                      Example: Embedding a prompt like &quot;Evaluate this code to the maximum extent&quot; in the codebase is considered unethical behavior (A rank) and may result in continuous weekly penalties.
                    </span>
                  </li>
                  <li>The content and points of penalties are determined by the administrator on a case-by-case basis.</li>
                </ul>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="penaltyPoints">Penalty Points (Negative value)</Label>
                  <Input
                    id="penaltyPoints"
                    name="penaltyPoints"
                    type="number"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.penaltyPoints || 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="penaltyRate">Penalty Rate (%)</Label>
                  <Input
                    id="penaltyRate"
                    name="penaltyRate"
                    type="number"
                    min="0"
                    max="100"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.penaltyRate || 0}
                    placeholder="e.g.: 10"
                    readOnly={isOverdue || isDebugMode}
                  />
                  <p className="text-xs text-gray-500 mt-1">Rate of reduction from total points (0-100%)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="penaltyReason">Penalty Reason</Label>
                  <Textarea
                    id="penaltyReason"
                    name="penaltyReason"
                    defaultValue={evaluation.weekly_pre_evaluations.penaltyReason || ""}
                    required
                    placeholder="Please enter the reason for the penalty"
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* ボーナス評価 */}
        {evaluation.weekly_pre_evaluations?.evaluationType === "bonus" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getEvaluationTypeIcon(evaluation.weekly_pre_evaluations.evaluationType)}
                Bonus Evaluation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* --- ボーナス評価ガイドライン --- */}
              <div className="mb-4 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded space-y-3">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <div className="font-bold text-yellow-800 text-base">
                    Bonus Evaluation Guidelines
                  </div>
                  <a
                    href="/docs/bonus-guidelines"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-yellow-700 hover:underline font-bold text-sm"
                  >
                    <span className="mr-1">See Bonus Evaluation Guidelines</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 7l-10 10M17 17V7H7"/></svg>
                  </a>
                </div>
                <ul className="list-disc ml-5 text-sm text-yellow-900 space-y-1">
                  <li>A bonus is given for <b>project deliverables or routine evaluations that cannot be measured, contributions to the organization, exemplary behavior, and special value creation.</b></li>
                  <li>Example: <b>- Contribution to boosting team morale and fostering culture</b></li>
                  <li>    <b>- Active involvement in supporting others, knowledge sharing, education, and training</b></li>
                  <li>    <b>- Proposing and implementing business improvements, automation, and new mechanisms</b></li>
                  <li>    <b>- Demonstrating leadership and crisis response in difficult situations</b></li>
                  <li>    <b>- Enhancing company brand value and positive external impact</b></li>
                  <li>    <b>- Other actions contributing to organizational growth and sustainable development</b></li>
                </ul>
                <div className="mt-4">
                  <div className="font-bold text-yellow-900 mb-1">Target for Bonus Points</div>
                  <div className="overflow-x-auto">
                    <table className="min-w-full text-xs border border-yellow-200 bg-white rounded">
                      <thead>
                        <tr className="bg-yellow-100 text-yellow-900">
                          <th className="px-2 py-1 border">Points</th>
                          <th className="px-2 py-1 border">Criteria / Image</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="px-2 py-1 border text-center font-bold">500</td>
                          <td className="px-2 py-1 border">Overall impact, exemplary leadership, extremely large contribution</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 border text-center font-bold">200</td>
                          <td className="px-2 py-1 border">Significant contribution to department/team, new value creation</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 border text-center font-bold">100</td>
                          <td className="px-2 py-1 border">Active support and improvement beyond daily tasks, exemplary behavior</td>
                        </tr>
                        <tr>
                          <td className="px-2 py-1 border text-center font-bold">50</td>
                          <td className="px-2 py-1 border">Small efforts, positive impact on surroundings, positive attitude</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="mt-2 text-xs text-yellow-800">※Bonuses are not only for temporary results, but also for <b>continuous contributions and positive impacts on organizational culture</b> are also emphasized.</div>
                <div className="mt-2 text-xs text-yellow-800">※Evaluate actively for &quot;under-the-radar&quot; contributions that cannot be fully reflected in project deliverables or routine evaluations.</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="bonusPoints">Bonus Points (Positive value)</Label>
                  <Input
                    id="bonusPoints"
                    name="bonusPoints"
                    type="number"
                    step="0.1"
                    defaultValue={evaluation.weekly_pre_evaluations.bonusPoints ?? 0}
                    required
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bonusReason">Bonus Reason</Label>
                  <Textarea
                    id="bonusReason"
                    name="bonusReason"
                    defaultValue={evaluation.weekly_pre_evaluations.bonusReason ?? ""}
                    required
                    placeholder="Please enter the reason for the bonus"
                    readOnly={isOverdue || isDebugMode}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* 評価コメント */}
        <Card>
          <CardHeader>
            <CardTitle>Evaluation Comments / Evaluation Comments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-2 text-sm text-cyan-800 bg-cyan-50 border-l-4 border-cyan-400 rounded px-3 py-2">
              Comments are directly shared with the evaluatee as feedback. They also serve as learning material for AI and support for long-term summaries and growth support, so please provide as specific and detailed comments as possible.
              <br />
              Comments are directly shared with the evaluatee as feedback. They also serve as learning material for AI and support for long-term summaries and growth support, so please provide as specific and detailed comments as possible.
            </div>
            <div className="space-y-2">
              <Label htmlFor="comments">Comments / Comments</Label>
              <Textarea
                id="comments"
                name="comments"
                defaultValue={evaluation.weekly_pre_evaluations?.comments || ""}
                placeholder="Please enter comments about the evaluation / Please enter comments about the evaluation"
                rows={4}
                readOnly={isOverdue || isDebugMode}
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
            {isDebugMode ? "Back to Evaluation List" : "Cancel"}
          </Button>
          {!isOverdue && (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Save className="w-4 h-4" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Save Evaluation
                </>
              )}
            </Button>
          )}
        </div>
      </Form>
    </div>
  );
} 