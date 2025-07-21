import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Target,
  Brain,
  GitBranch,
  Users,
  Crown,
  CheckCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Shield,
  Code,
  TestTube,
  Clock,
  Star,
  Activity,
  BarChart3,
  FileText,
  Settings,
  Building,
  Award,
  UserCheck
} from "lucide-react";

export default function EvaluationFrameworkDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Target className="w-4 h-4 mr-2" />
            3軸評価システム
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"> 3軸評価システム</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            成果物品質評価（成果物重視）・成果量評価（過程重視）・マネージャー評価の3軸から多角的に評価し、
            AI時代のエンジニアの真の価値を公平かつ透明に測定します。
          </p>
        </div>

        {/* 3軸評価の概要 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">3軸評価システムの概要</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">成果物品質評価（成果物重視）</CardTitle>
                <CardDescription className="text-blue-700">
                  理想のコードベース追求への評価
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">評価対象</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 要件定義とテスト網羅性</div>
                    <div>• テスト実行結果</div>
                    <div>• シニアエンジニアによるCursor評価</div>
                    <div>• AIによる横断的評価</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">特徴</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 週次でローカル実行</div>
                    <div>• 結果にフォーカス</div>
                    <div>• 定量的なスコア化</div>
                    <div>• 技術的深さを重視</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">成果量評価（過程重視）</CardTitle>
                <CardDescription className="text-green-700">
                  AIを活用した開発プロセス評価
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">評価対象</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• コミット毎のAI評価</div>
                    <div>• 開発プロセスの質</div>
                    <div>• コミット頻度・継続性</div>
                    <div>• 段階的実装の実践</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">特徴</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• CIで完全自動実行</div>
                    <div>• 過程にフォーカス</div>
                    <div>• リアルタイム評価</div>
                    <div>• 開発手法を重視</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">マネージャー評価</CardTitle>
                <CardDescription className="text-purple-700">
                  マネージャーによる現物確認・総合評価
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">評価対象</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 要件定義一致性</div>
                    <div>• プロセス品質</div>
                    <div>• ビジネス価値</div>
                    <div>• 使いやすさ・安定性</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">特徴</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 週次で手動評価（25分以内）</div>
                    <div>• 過程と結果にフォーカス</div>
                    <div>• 主観的満足度</div>
                    <div>• 人間ならではの観点</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 評価フロー */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価フロー</h3>
          <Card>
            <CardContent className="pt-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">要件定義書・テスト・コミット履歴等を収集</h4>
                    <p className="text-gray-600">プロジェクトの要件定義書、テストコード、コミット履歴、CI実行結果などを自動収集</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">成果物品質評価指標を自動計測</h4>
                    <p className="text-gray-600">要件カバレッジ、テスト網羅性、実行結果、不正検出などを自動計測</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">シニアエンジニアによるCursor評価</h4>
                    <p className="text-gray-600">週次でシニアエンジニアがCursorを使用してローカル環境でコードレビューを実施</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AIによる横断的評価</h4>
                    <p className="text-gray-600">設計品質・セキュリティ・パフォーマンスの3軸でAIが自動評価</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">成果量評価指標を自動解析・スコア化</h4>
                    <p className="text-gray-600">コミット毎のAI評価により開発プロセスの質を自動解析・スコア化</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">6</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">人間の評価を実施</h4>
                    <p className="text-gray-600">マネージャーによる週次現物確認・総合評価を実施（25分以内で完了）</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">7</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">3軸のスコアを組み合わせて総合評価・ランキング化</h4>
                    <p className="text-gray-600">3軸の評価結果を重み付けして総合スコアを算出し、ランキングを生成</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">8</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">評価レポートを自動生成</h4>
                    <p className="text-gray-600">スコア・根拠・推奨事項・主要ファクトを明示した評価レポートを自動生成</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* スコア計算方法 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">スコア計算方法</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  各軸の重み付け
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">成果物品質評価（成果物重視）</span>
                    <Badge variant="secondary">40%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">成果量評価（過程重視）</span>
                    <Badge variant="secondary">35%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">マネージャー評価</span>
                    <Badge variant="secondary">25%</Badge>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>総合スコア =</strong> (成果物品質評価スコア × 0.4) + (成果量評価スコア × 0.35) + (マネージャー評価スコア × 0.25)
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-600" />
                  評価基準
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">優秀</span>
                    <Badge className="bg-green-100 text-green-800">90-100点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">良好</span>
                    <Badge className="bg-blue-100 text-blue-800">80-89点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">普通</span>
                    <Badge className="bg-yellow-100 text-yellow-800">70-79点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">要改善</span>
                    <Badge className="bg-red-100 text-red-800">60-69点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">不合格</span>
                    <Badge className="bg-gray-100 text-gray-800">0-59点</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* メリット */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">3軸評価システムのメリット</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>公平性の担保</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  3つの異なる観点から評価することで、単一の評価軸による偏りを排除し、より公平で客観的な評価を実現します。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>継続的改善</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  過程と結果の両方を評価することで、短期的な成果だけでなく、長期的な成長と改善を促進します。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>人間中心の評価</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  AI評価と人間評価を組み合わせることで、技術的な側面と人間的な側面の両方をバランスよく評価します。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>自動化と効率化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  大部分の評価を自動化することで、評価者の負荷を軽減し、より効率的な評価プロセスを実現します。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>リアルタイム評価</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  コミット毎の評価により、即座のフィードバックが可能で、開発プロセスの改善を促進します。
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>透明性の確保</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm">
                  評価基準とプロセスを明確化することで、評価の透明性を確保し、信頼性の高い評価システムを構築します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold mb-4">3軸評価システムを活用しよう</h3>
              <p className="text-xl mb-8 opacity-90">
                詳細な実装方法と運用ガイドを確認して、公平で透明性の高い評価システムを構築
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/docs/commit-evaluation">
                    コミット毎AI評価の詳細
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-yellow-600" asChild>
                  <Link to="/docs/senior-evaluation">シニアエンジニア評価</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 