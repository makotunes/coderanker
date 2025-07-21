import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Target,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Shield,
  Activity,
  BarChart3,
  Settings,
  MessageSquare,
  Heart,
  AlertCircle,
  UserCheck
} from "lucide-react";

export default function ClientEvaluationDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-cyan-100 text-cyan-800 hover:bg-cyan-200">
            <UserCheck className="w-4 h-4 mr-2" />
            マネージャー評価
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            マネージャー・プロジェクトオーナー向け
            <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent"> 評価ガイドライン</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            マネージャーやプロジェクトオーナーが週次で25分以内で完了できる簡潔な評価プロセスにより、
            要件定義一致性とプロセス品質を重視した「人間ならでは」の評価を実現します。
          </p>
          <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 font-bold rounded max-w-4xl mx-auto">
            エンジニア以外（デザイナー・オペレーター・コーポレート等）の場合、<b>アウトプットの質</b>に主眼を置き、<b>各パラメータを自分の業務内容に合わせて読み替えて評価</b>して構いません。使わないパラメータは未入力でニュートラル（評価に影響しない）となります。
          </div>
        </div>

        {/* 評価の核心 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価の核心</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">要件定義一致性</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">重要性</h4>
                  <p className="text-blue-700 text-sm">
                    エンジニアは与えられた条件の範囲で開発するため、要件定義との一致性が最も重要です。
                    技術的詳細よりも、「要件通りに作られているか」が評価の核心です。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">評価項目</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 機能要件の実現度</div>
                    <div>• 非機能要件の達成度</div>
                    <div>• ビジネス要件の適合性</div>
                    <div>• 期待値と実装のギャップ</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">プロセス品質</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">重要性</h4>
                  <p className="text-green-700 text-sm">
                    開発過程でマネージャーに余計なコストをかけていないか、適切なコミュニケーションが取れているかが
                    重要な評価要素です。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">評価項目</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 報告・連絡・相談の適切性</div>
                    <div>• マネージャー負荷の軽減</div>
                    <div>• 問題対応の迅速性</div>
                    <div>• 進捗共有の頻度・質</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 段階的評価プロセス */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">段階的評価プロセス（週次・25分以内）</h3>
          <Card>
            <CardContent className="pt-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">要件書の確認（5分）</h4>
                    <p className="text-gray-600">評価前に要件書を再確認し、主要な要件をリストアップして評価の優先順位を設定</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 機能要件の確認</div>
                      <div>• 非機能要件の確認</div>
                      <div>• ビジネス要件の確認</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">機能要件の確認（10分）</h4>
                    <p className="text-gray-600">要件書に記載された機能を一つずつ確認し、期待通りの動作をするかテスト</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 各機能の動作確認</div>
                      <div>• 機能間の連携確認</div>
                      <div>• エラー処理の確認</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">非機能要件の確認（5分）</h4>
                    <p className="text-gray-600">パフォーマンス、セキュリティ、可用性要件を確認</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• レスポンス時間の確認</div>
                      <div>• セキュリティ要件の確認</div>
                      <div>• 可用性要件の確認</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">プロセス品質の確認（3分）</h4>
                    <p className="text-gray-600">開発過程でのコミュニケーション品質を振り返り、マネージャーへの負荷を評価</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 報告・連絡・相談の評価</div>
                      <div>• マネージャー負荷の評価</div>
                      <div>• 問題対応の評価</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-cyan-600 font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">総合評価（2分）</h4>
                    <p className="text-gray-600">各要件の評価結果を総合し、スコア計算とコメント記入</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 総合スコアの算出</div>
                      <div>• 改善点の記入</div>
                      <div>• 評価コメントの記入</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 評価項目の設計 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価項目の設計</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">機能要件評価</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• 要件書の機能が全て実装</div>
                  <div>• 各機能が期待通りに動作</div>
                  <div>• 機能間の連携が正常</div>
                  <div>• エラー処理が適切</div>
                  <div>• データの整合性が保たれている</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">非機能要件評価</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-700">
                  <div>• パフォーマンス要件を満たしている</div>
                  <div>• セキュリティ要件を満たしている</div>
                  <div>• 可用性要件を満たしている</div>
                  <div>• 保守性要件を満たしている</div>
                  <div>• 拡張性要件を満たしている</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">ビジネス要件評価</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• ビジネスプロセスが要件通り</div>
                  <div>• ユーザー体験が期待通り</div>
                  <div>• 運用要件を満たしている</div>
                  <div>• ビジネス価値が実現されている</div>
                  <div>• ROIが期待値を上回っている</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">報告・連絡・相談</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-orange-700">
                  <div>• 適切なタイミングで詳細な報告</div>
                  <div>• 問題の早期発見・解決に貢献</div>
                  <div>• 定期的な進捗報告</div>
                  <div>• 必要な時に相談してくれる</div>
                  <div>• 技術的説明が分かりやすい</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">マネージャー負荷</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-red-700">
                  <div>• エンジニアが自立的に進める</div>
                  <div>• マネージャーの介入が最小限</div>
                  <div>• 必要な時だけ相談</div>
                  <div>• マネージャーの時間を尊重</div>
                  <div>• 余計なコストをかけない</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <AlertCircle className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-800">問題対応</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-indigo-700">
                  <div>• 問題を早期発見</div>
                  <div>• 複数の解決案を提示</div>
                  <div>• 適切に報告・対応</div>
                  <div>• 解決に向けて努力</div>
                  <div>• リスクを事前に共有</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* スコア計算方法 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">スコア計算方法</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  各項目のスコア
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">機能要件スコア</span>
                    <Badge variant="secondary">50%の重み</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">非機能要件スコア</span>
                    <Badge variant="secondary">20%の重み</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">プロセス品質スコア</span>
                    <Badge variant="secondary">30%の重み</Badge>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>総合スコア =</strong> (機能要件スコア × 0.5) + (非機能要件スコア × 0.2) + (プロセス品質スコア × 0.3)
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
                    <span className="text-sm font-medium">完全一致</span>
                    <Badge className="bg-green-100 text-green-800">100点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">部分一致</span>
                    <Badge className="bg-blue-100 text-blue-800">70点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">不一致</span>
                    <Badge className="bg-yellow-100 text-yellow-800">30点</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">未実装</span>
                    <Badge className="bg-red-100 text-red-800">0点</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 運用上の配慮 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">運用上の配慮</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">心理的負荷軽減</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">配慮事項</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 完璧を求めない</div>
                    <div>• 主観的評価を重視</div>
                    <div>• 時間制限（25分以内）</div>
                    <div>• サポート体制の整備</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">評価のポイント</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 「感じたまま」で評価</div>
                    <div>• 技術的詳細は気にしない</div>
                    <div>• ビジネス価値を重視</div>
                    <div>• 使いやすさを重視</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">評価品質向上</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">品質向上策</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 評価基準の明確化</div>
                    <div>• サンプル評価の提供</div>
                    <div>• フィードバックループ</div>
                    <div>• 評価者教育の実施</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">客観性の確保</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 要件書に基づく客観的評価</div>
                    <div>• 事実に基づく評価</div>
                    <div>• 一貫性の確保</div>
                    <div>• 評価履歴の記録</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold mb-4">マネージャー評価を導入しよう</h3>
              <p className="text-xl mb-8 opacity-90">
                詳細な実装方法と運用ガイドを確認して、人間ならではの評価システムを構築
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/docs/evaluation-framework">
                    3軸評価システムの詳細
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-cyan-600" asChild>
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