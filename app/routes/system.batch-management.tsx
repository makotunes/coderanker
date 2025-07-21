import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Alert, AlertDescription } from "~/components/ui/alert";
import { useState } from "react";
import { 
  Play, 
  Clock, 
  Calendar, 
  Users, 
  Settings, 
  CheckCircle, 
  AlertTriangle,
  RefreshCw,
  CheckCircle2,
  XCircle,
  UserCheck,
  RotateCw
} from "lucide-react";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // SUPERUSERのみアクセス可能
  if (user.role !== "SUPERUSER") {
    throw new Response("Forbidden", { status: 403 });
  }

  return json({ 
    user,
    cronSecret: process.env.CRON_SECRET 
  });
}

export default function BatchManagement() {
  const { cronSecret } = useLoaderData<typeof loader>();
  const [targetWeek, setTargetWeek] = useState<string>("");
  const [isExecuting, setIsExecuting] = useState<string>("");
  const [executionResults, setExecutionResults] = useState<Record<string, { success: boolean; message: string; timestamp: Date }>>({});

  // 現在の週を取得
  const getCurrentWeek = () => {
    const now = new Date();
    const year = now.getFullYear();
    const week = Math.ceil((now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
    return `${year}-W${week.toString().padStart(2, '0')}`;
  };

  // バッチ実行
  const executeBatch = async (endpoint: string, params?: Record<string, string>) => {
    // operation.idを使用してローディング状態を管理
    const operationId = batchOperations.find(op => op.endpoint === endpoint)?.id || endpoint;
    setIsExecuting(operationId);
    
    try {
      const url = new URL(`/api/${endpoint}`, window.location.origin);
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const response = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${cronSecret}`,
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();
      
      if (response.ok) {
        let message = '処理完了';
        if (result.summary) {
          message = `処理完了: ${result.summary.processed}件更新, ${result.summary.capabilityManagerAssigned}件capabilityManager割り当て, ${result.summary.projectManagerAssigned}件projectManager割り当て`;
        } else if (result.processedCount || result.createdCount) {
          message = `正常に実行されました: ${result.processedCount || result.createdCount}`;
        }
        
        setExecutionResults(prev => ({
          ...prev,
          [endpoint]: {
            success: true,
            message,
            timestamp: new Date()
          }
        }));
      } else {
        setExecutionResults(prev => ({
          ...prev,
          [endpoint]: {
            success: false,
            message: `実行に失敗しました: ${result.error || 'Unknown error'}`,
            timestamp: new Date()
          }
        }));
      }
    } catch (error) {
      setExecutionResults(prev => ({
        ...prev,
        [endpoint]: {
          success: false,
          message: `エラーが発生しました: ${error}`,
          timestamp: new Date()
        }
      }));
    } finally {
      setIsExecuting("");
    }
  };

  const batchOperations = [
    {
      id: "batch.assign-managers",
      title: "上司自動割り当て",
      description: "ユーザーの上司を自動的に割り当てます（新規ユーザー追加時実行推奨）",
      icon: <UserCheck className="w-5 h-5" />,
      color: "bg-indigo-500",
      endpoint: "batch/assign-managers",
      hasWeekParam: false,
      help: "capabilityManagerは同じロールで自分より高いティアのユーザーのうち最も低いティアのユーザー、projectManagerは常にADMINに設定します。"
    },
    {
      id: "batch.weekly-pre-evaluation",
      title: "週次事前評価作成",
      description: "指定週の事前評価タスクを作成します（水曜日実行推奨）",
      icon: <Calendar className="w-5 h-5" />,
      color: "bg-blue-500",
      endpoint: "batch/weekly-pre-evaluation",
      hasWeekParam: true,
      help: "評価対象者に対して、品質・数量・満足度の事前評価タスクを作成します。"
    },
    {
      id: "batch.weekly-evaluation",
      title: "週次評価集計",
      description: "指定週の完了済み評価を集計して週次評価を作成します（日曜日実行推奨）",
      icon: <Users className="w-5 h-5" />,
      color: "bg-green-500",
      endpoint: "batch/weekly-evaluation",
      hasWeekParam: true,
      help: "完了済みの事前評価を集計し、週次評価データを作成します。"
    },
    {
      id: "debug.auto-evaluate",
      title: "自動評価実行",
      description: "期限切れの評価を自動的に完了させます",
      icon: <Settings className="w-5 h-5" />,
      color: "bg-orange-500",
      endpoint: "debug/auto-evaluate",
      hasWeekParam: false,
      help: "期限切れの評価タスクを自動的に完了状態にし、ペナルティ・ボーナス評価も作成します。"
    },
    {
      id: "debug.monthly-salary",
      title: "月次給与データ作成",
      description: "前月の評価データを作成します（月初実行推奨）",
      icon: <Clock className="w-5 h-5" />,
      color: "bg-purple-500",
      endpoint: "debug/monthly-salary",
      hasWeekParam: false,
      help: "前月の週次評価データを作成し、給与計算の基盤データを生成します。"
    }
  ];

  return (
    <div className="container p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2 mb-2">
          <Settings className="w-6 h-6 text-blue-600" />
          バッチ管理
        </h1>
        <p className="text-muted-foreground">
          システムバッチ処理の実行管理
        </p>
      </div>

      {/* 警告メッセージ */}
      <Alert className="mb-6">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>
          <strong>注意:</strong> これらの操作は本番環境に影響を与える可能性があります。
          実行前に十分確認し、適切なタイミングで実行してください。
        </AlertDescription>
      </Alert>

      {/* 週パラメータ設定 */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            実行パラメータ
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex-1">
              <Label htmlFor="targetWeek">対象週</Label>
              <Input
                id="targetWeek"
                type="text"
                placeholder={getCurrentWeek()}
                value={targetWeek}
                onChange={(e) => setTargetWeek(e.target.value)}
                className="mt-1"
              />
              <p className="text-sm text-muted-foreground mt-1">
                例: 2024-W27（空欄の場合は現在週が使用されます）
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => setTargetWeek(getCurrentWeek())}
              className="whitespace-nowrap"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              現在週を設定
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* バッチ操作一覧 */}
      <div className="grid gap-6">
        {batchOperations.map((operation) => (
          <Card key={operation.id} className={`hover:shadow-md transition-all duration-300 relative overflow-hidden ${
            isExecuting === operation.id ? 'ring-2 ring-orange-400 shadow-lg' : ''
          }`}>
            {isExecuting === operation.id && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-orange-100/30 to-transparent animate-pulse z-0" />
            )}
                          <CardHeader className="relative z-10">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${operation.color} text-white ${
                      isExecuting === operation.id ? 'animate-pulse' : ''
                    }`}>
                      {operation.icon}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{operation.title}</CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {operation.description}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {operation.endpoint}
                  </Badge>
                </div>
              </CardHeader>
            <CardContent className="relative z-10">
              <div className="space-y-4">
                <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                  {operation.help}
                </p>
                
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      onClick={() => {
                        const params = operation.hasWeekParam && targetWeek 
                          ? { week: targetWeek }
                          : undefined;
                        executeBatch(operation.endpoint, params);
                      }}
                      disabled={isExecuting === operation.id}
                      className={`flex-1 transition-all duration-300 relative overflow-hidden ${
                        isExecuting === operation.id 
                          ? 'bg-orange-500 hover:bg-orange-600' 
                          : ''
                      }`}
                      title={`isExecuting: ${isExecuting}, operation.id: ${operation.id}`}
                    >
                      {isExecuting === operation.id ? (
                        <>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                          <RotateCw className="w-4 h-4 mr-2 animate-spin" />
                          <span className="relative z-10">実行中... ({isExecuting})</span>
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          実行
                        </>
                      )}
                    </Button>
                    
                    {operation.hasWeekParam && (
                      <div className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        週パラメータ: {targetWeek || getCurrentWeek()}
                      </div>
                    )}
                  </div>

                  {/* 実行結果表示 */}
                  {executionResults[operation.endpoint] && (
                    <div className={`p-3 rounded-lg border-l-4 transition-all duration-500 ${
                      executionResults[operation.endpoint].success
                        ? 'bg-green-50 border-green-400 text-green-800'
                        : 'bg-red-50 border-red-400 text-red-800'
                    }`}>
                      <div className="flex items-center gap-2">
                        {executionResults[operation.endpoint].success ? (
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                        ) : (
                          <XCircle className="w-4 h-4 text-red-600" />
                        )}
                        <span className="text-sm font-medium">
                          {executionResults[operation.endpoint].message}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {executionResults[operation.endpoint].timestamp.toLocaleString()}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 実行履歴（簡易版） */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            実行ガイドライン
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-indigo-50 text-indigo-700">随時</Badge>
              <div>
                <strong>上司自動割り当て:</strong> 新規ユーザー追加時の上司設定
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700">水曜日</Badge>
              <div>
                <strong>週次事前評価作成:</strong> 新しい週の評価タスクを作成
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-green-50 text-green-700">日曜日</Badge>
              <div>
                <strong>週次評価集計:</strong> 完了した評価を集計して週次データを作成
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-orange-50 text-orange-700">随時</Badge>
              <div>
                <strong>自動評価実行:</strong> 期限切れ評価の自動処理
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Badge variant="outline" className="bg-purple-50 text-purple-700">月初</Badge>
              <div>
                <strong>月次給与データ作成:</strong> 前月の評価データを一括作成
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 