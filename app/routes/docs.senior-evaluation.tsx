import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  Crown,
  Brain,
  Target,
  ArrowRight,
  TrendingUp,
  Shield,
  TestTube,
  Clock,
  BarChart3,
  FileText,
  Settings,
  Eye,
  Search,
  MessageSquare
} from "lucide-react";

export default function SeniorEvaluationDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-teal-100 text-teal-800 hover:bg-teal-200">
            <Crown className="w-4 h-4 mr-2" />
            成果物品質評価（成果物評価）
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            多層的な
            <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent"> 成果品質評価</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
            要件定義からテストケース、網羅的・多層的実装、実際のカバレッジまでを重視した「成果品質評価」。
            シニアエンジニアがAIを使って半自動で成果物を検証し、技術的品質を保証します。
          </p>
          <div className="mb-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 font-bold rounded max-w-4xl mx-auto">
            エンジニア以外（デザイナー・オペレーター・コーポレート等）の場合、<b>アウトプットの質</b>に主眼を置き、<b>各パラメータを自分の業務内容に合わせて読み替えて評価</b>して構いません。使わないパラメータは未入力でニュートラル（評価に影響しない）となります。
          </div>
          <div className="mb-6 p-4 bg-cyan-100 border-l-4 border-cyan-500 text-cyan-900 font-bold rounded max-w-4xl mx-auto">
            CI/CDやAIを活用してコードベースを自動・半自動で評価することを奨励します。
          </div>
          <div className="bg-gradient-to-r from-teal-50 to-cyan-50 border border-teal-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-teal-600 mb-2">要件定義</div>
                <div className="text-sm text-teal-700">テストケースの導出</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-600 mb-2">網羅的実装</div>
                <div className="text-sm text-cyan-700">多層的カバレッジ</div>
              </div>
            </div>
          </div>
        </div>

        {/* 深い検証の思想 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">深い検証の思想</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-teal-200 bg-teal-50">
              <CardHeader>
                <CardTitle className="flex items-center text-teal-800">
                  <Brain className="w-5 h-5 mr-2" />
                  AIの限界と人間の役割
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-teal-800">現実的な認識</h4>
                  <p className="text-teal-700 text-sm">
                    もしAIが完全に評価できるなら、そもそも人間は開発に必要ありません。
                    しかし、現時点ではAIの進化は完全自動で複雑なシステムを構築するほどの能力はありません。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-teal-800">半自動検証の最適化</h4>
                  <p className="text-teal-700 text-sm">
                    開発組織のパフォーマンスを向上させるためには、
                    シニアエンジニアがAIを使って半自動で成果物を検証するプロセスが有効になります。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-200 bg-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center text-cyan-800">
                  <Target className="w-5 h-5 mr-2" />
                  品質保証と標準化のプロセス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-800">成果物品質の保証</h4>
                  <p className="text-cyan-700 text-sm">
                    要件定義からテストケース、網羅的・多層的実装、実際のカバレッジまでを
                    体系的に検証することで、成果物の技術的品質を保証します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-800">検証プロセスの標準化</h4>
                  <p className="text-cyan-700 text-sm">
                    シニアエンジニアによる半自動検証プロセスを標準化することで、
                    一貫性のある品質保証と効率的な開発支援を実現します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 深い検証の核心観点 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">深い検証の核心観点</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <TestTube className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">テストカバレッジの網羅性</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-blue-700">
                  <div>• 要件定義書との整合性</div>
                  <div>• 各レイヤー（ユニット・統合・E2E）の網羅</div>
                  <div>• エッジケースの考慮</div>
                  <div>• テストの実行可能性</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">AIテスト駆動開発</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-green-700">
                  <div>• 要件定義書→テスト自動生成</div>
                  <div>• CI実行→カバレッジ評価</div>
                  <div>• 標準化されたアプローチ</div>
                  <div>• 理想のコード体系追求</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">設計・セキュリティ・パフォーマンス</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-purple-700">
                  <div>• アーキテクチャの一貫性</div>
                  <div>• セキュリティ脆弱性の検出</div>
                  <div>• パフォーマンス最適化</div>
                  <div>• 技術的負債の管理</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-800">技術的深さの評価</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-orange-700">
                  <div>• 設計思想の明確性</div>
                  <div>• 実装の技術的妥当性</div>
                  <div>• 拡張性への配慮</div>
                  <div>• 保守性の確保</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-800">成果物重視の定量評価</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-red-700">
                  <div>• アウトプットの"量"評価</div>
                  <div>• 網羅性のスコア化</div>
                  <div>• 要件達成度の測定</div>
                  <div>• 品質指標の定量化</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200 bg-indigo-50">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-800">多層性・整合性の検証</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-indigo-700">
                  <div>• 各レイヤーの整合性</div>
                  <div>• テストの多層性確保</div>
                  <div>• 要件との整合性</div>
                  <div>• 実装の一貫性</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 深い検証のプロセス */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">深い検証のプロセス</h3>
          <Card>
            <CardContent className="pt-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">要件定義書の検証</h4>
                    <p className="text-gray-600">要件定義書の完全性と明確性を確認し、そこから導かれるテストケースの妥当性を検証</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">テストケースの網羅性検証</h4>
                    <p className="text-gray-600">要件定義から導かれるテストケースが網羅的に実装され、ユニット・統合・E2Eの各レイヤーで適切にカバーされているかを検証</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">多層的実装の検証</h4>
                    <p className="text-gray-600">各レイヤーでの実装が要件定義と整合し、テストケースが実際にパスしているかを多層的に検証</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">実際のカバレッジ検証</h4>
                    <p className="text-gray-600">テストの実行結果と実際のカバレッジを測定し、要件定義との整合性を定量的に検証</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-teal-600 font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">検証結果の記録・改善提案</h4>
                    <p className="text-gray-600">検証結果を記録し、成果物の品質向上に向けた具体的な改善提案を提示</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 成果物品質評価プロンプト体系 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">成果物品質評価プロンプト体系（評価者ガイドライン）</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-blue-600" />
                  評価プロンプト（基本版）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">プロンプト例</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    <p><strong>あなたはシニアエンジニアとして、成果物の成果物品質評価を行います。</strong></p>
                    <p>以下の観点で評価してください：</p>
                    <ul className="list-disc pl-5 space-y-1 mt-2">
                      <li>要件定義書の完全性と明確性</li>
                      <li>テストケースの網羅性（ユニット・統合・E2E）</li>
                      <li>多層的実装の検証</li>
                      <li>実際のカバレッジ測定</li>
                      <li>技術的品質の保証</li>
                    </ul>
                    <p className="mt-2">各観点を0-100点で評価し、具体的な改善提案を提示してください。</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">評価基準</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 90-100点：ベストプラクティス</div>
                    <div>• 80-89点：高品質</div>
                    <div>• 70-79点：標準的</div>
                    <div>• 60-69点：改善必要</div>
                    <div>• 0-59点：重大問題</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-green-600" />
                  評価プロンプト（詳細版）
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">詳細プロンプト例</h4>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-700">
                    <p><strong>成果物の成果物品質評価を実行してください。</strong></p>
                    <p>評価対象：[成果物名]</p>
                    <p>評価観点：</p>
                    <ol className="list-decimal pl-5 space-y-1 mt-2">
                      <li><strong>要件定義の検証</strong>：完全性・明確性・テストケース導出の妥当性</li>
                      <li><strong>テスト網羅性</strong>：ユニット・統合・E2Eの各レイヤーでのカバレッジ</li>
                      <li><strong>多層的実装</strong>：要件定義と実装の整合性・一貫性</li>
                      <li><strong>カバレッジ検証</strong>：実際のテスト実行結果とカバレッジ測定</li>
                      <li><strong>技術的品質</strong>：設計・セキュリティ・パフォーマンス・保守性</li>
                    </ol>
                    <p className="mt-2">各観点でスコア・根拠・改善提案を提示してください。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 評価実行手順 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価実行手順</h3>
          <Card>
            <CardContent className="pt-8">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">成果物の事前確認</h4>
                    <p className="text-gray-600">評価対象の成果物（コードベース・ドキュメント・テスト）を事前に確認し、評価の準備を行う</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• ファイル構成の把握</div>
                      <div>• 主要機能の理解</div>
                      <div>• テストファイルの存在確認</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">プロンプトの選択・カスタマイズ</h4>
                    <p className="text-gray-600">成果物の特性に応じて適切なプロンプトを選択し、必要に応じてカスタマイズする</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 基本版 vs 詳細版の選択</div>
                      <div>• 評価観点の調整</div>
                      <div>• 成果物固有の要件追加</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AI評価の実行</h4>
                    <p className="text-gray-600">選択したプロンプトでAI評価を実行し、各観点でのスコアと根拠を取得する</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• プロンプトの入力</div>
                      <div>• AI評価結果の取得</div>
                      <div>• 評価根拠の確認</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">人間による検証・調整</h4>
                    <p className="text-gray-600">AI評価結果を人間の視点で検証し、必要に応じて調整・補完を行う</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 評価結果の妥当性確認</div>
                      <div>• 見落としの補完</div>
                      <div>• スコアの調整</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 font-bold">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">評価レポートの作成</h4>
                    <p className="text-gray-600">最終的な評価結果をレポート形式でまとめ、改善提案を提示する</p>
                    <div className="mt-2 space-y-1 text-sm text-gray-500">
                      <div>• 総合スコアの算出</div>
                      <div>• 改善提案の整理</div>
                      <div>• 優先度の明示</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* より良いアプローチ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">より良いアプローチ（厳密な評価のための指針）</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  <Search className="w-5 h-5 mr-2" />
                  テストの実態確認
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-800">テストファイルの中身確認</h4>
                  <div className="space-y-1 text-sm text-orange-700">
                    <div>• テストファイルの存在だけでなく、中身を実際に読む</div>
                    <div>• 有効なテストケースが書かれているか確認</div>
                    <div>• テストの実行可能性を検証</div>
                    <div>• モックやスタブの適切性を評価</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-orange-800">カバレッジ・CI状況の確認</h4>
                  <div className="space-y-1 text-sm text-orange-700">
                    <div>• テストカバレッジレポートの存在確認</div>
                    <div>• CIの実行結果や自動化状況の確認</div>
                    <div>• カバレッジの可視化・記録の仕組み確認</div>
                    <div>• テスト実行の自動化レベル評価</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center text-red-800">
                  <Eye className="w-5 h-5 mr-2" />
                  実装の実態確認
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">UI・要素定義の実態確認</h4>
                  <div className="space-y-1 text-sm text-red-700">
                    <div>• UIや要素定義が多いだけで、ロジックが伴っているか確認</div>
                    <div>• 実際に動作するコードの有無をサンプルで確認</div>
                    <div>• モックと実装の区別を明確にする</div>
                    <div>• ビジネスロジックの実装状況を評価</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-red-800">テストの十分性判定基準</h4>
                  <div className="space-y-1 text-sm text-red-700">
                    <div>• 主要な画面・APIごとにテストがあるか</div>
                    <div>• ユニット・統合・E2Eテストの各層が存在するか</div>
                    <div>• エッジケースや異常系のテストがあるか</div>
                    <div>• テストカバレッジが一定水準（例：80%以上）を満たしているか</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ユーザーからの指示の与え方 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">ユーザーからの指示の与え方（より厳密な評価のための指針）</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <CardTitle className="flex items-center text-green-800">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  具体的な指示例
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">テスト評価の指示</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 「テストファイルの中身も見て、実際に有効なテストが書かれているかまで評価して」</div>
                    <div>• 「テストカバレッジレポートやCIの実行結果が存在するかまで調べて」</div>
                    <div>• 「主要な画面・APIごとにテストがあるか、E2Eテストがあるか確認して」</div>
                    <div>• 「テストの実行可能性と有効性を実際に検証して」</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">実装評価の指示</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 「UIモックや要素定義だけでなく、動作するロジックやテストの有無も重視して」</div>
                    <div>• 「実際に動作するコードの割合を評価して」</div>
                    <div>• 「ビジネスロジックの実装状況を確認して」</div>
                    <div>• 「モックと実装の区別を明確にして評価して」</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-800">
                  <Settings className="w-5 h-5 mr-2" />
                  評価基準の明確化
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">評価基準の設定</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 「テストが十分か？」を判定するための明確な基準を設定</div>
                    <div>• カバレッジの最低基準（例：80%以上）を明示</div>
                    <div>• テスト層の最低要件（ユニット・統合・E2E）を指定</div>
                    <div>• 実装の最低要件（動作するロジックの割合）を設定</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">評価の厳密性向上</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 表層的な構造だけでなく、実装・テストの実態を重視</div>
                    <div>• サンプルでの実態確認を必須とする</div>
                    <div>• 定量的な評価基準を設定</div>
                    <div>• 改善提案の具体性を要求</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Cursor活用方法 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cursor活用方法</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="w-5 h-5 mr-2 text-blue-600" />
                  コード分析機能
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">静的解析</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• コードの複雑性分析</div>
                    <div>• 重複コードの検出</div>
                    <div>• 潜在的なバグの特定</div>
                    <div>• パフォーマンス問題の検出</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">設計パターン分析</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 使用されているデザインパターンの識別</div>
                    <div>• アーキテクチャの一貫性チェック</div>
                    <div>• SOLID原則の遵守状況</div>
                    <div>• 依存関係の分析</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="w-5 h-5 mr-2 text-green-600" />
                  AIアシスト機能
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コードレビュー支援</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 改善提案の自動生成</div>
                    <div>• ベストプラクティスの提案</div>
                    <div>• セキュリティ問題の指摘</div>
                    <div>• パフォーマンス最適化の提案</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ドキュメント生成</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• コードの説明文書の自動生成</div>
                    <div>• API仕様書の作成支援</div>
                    <div>• 変更履歴の要約</div>
                    <div>• 技術的負債の可視化</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* スコア化基準 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">スコア化基準</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
                  評価基準
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">優秀 (90-100点)</span>
                    <Badge className="bg-green-100 text-green-800">ベストプラクティス</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">良好 (80-89点)</span>
                    <Badge className="bg-blue-100 text-blue-800">高品質</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">普通 (70-79点)</span>
                    <Badge className="bg-yellow-100 text-yellow-800">標準的</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">要改善 (60-69点)</span>
                    <Badge className="bg-orange-100 text-orange-800">改善必要</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">不合格 (0-59点)</span>
                    <Badge className="bg-red-100 text-red-800">重大問題</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-green-600" />
                  重み付け
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">コードの可読性・保守性</span>
                    <Badge variant="secondary">25%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">設計パターンの適用</span>
                    <Badge variant="secondary">20%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">技術的負債の管理</span>
                    <Badge variant="secondary">20%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">拡張性・柔軟性</span>
                    <Badge variant="secondary">15%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">エラーハンドリング</span>
                    <Badge variant="secondary">10%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">テスト設計</span>
                    <Badge variant="secondary">10%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 検証者の役割 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">検証者の役割</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>成果物検証の専門家</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 要件定義から実装まで精通したシニアエンジニア</div>
                  <div>• AIを活用した半自動検証の専門家</div>
                  <div>• 品質保証プロセスの責任者</div>
                  <div>• 技術的改善提案の提供者</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>品質保証の責任者</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 成果物の技術的品質を保証</div>
                  <div>• 要件定義との整合性を確認</div>
                  <div>• テストケースの網羅性を検証</div>
                  <div>• 実装の一貫性を確保</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>改善提案の提供者</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 検証結果に基づく改善提案</div>
                  <div>• 具体的な実装例の提示</div>
                  <div>• 技術的負債の特定と解決策</div>
                  <div>• 品質向上のためのガイダンス</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>検証スケジュール</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 成果物完成時の検証</div>
                  <div>• 1回あたり2-3時間</div>
                  <div>• 重点検証の実施</div>
                  <div>• 結果の即座フィードバック</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>検証レポート</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 各観点の詳細検証</div>
                  <div>• 改善提案の提示</div>
                  <div>• 優先度の明示</div>
                  <div>• 次回検証での確認項目</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle>継続改善</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm text-gray-600">
                  <div>• 検証基準の見直し</div>
                  <div>• 検証精度の向上</div>
                  <div>• 新しい観点の追加</div>
                  <div>• ベストプラクティスの更新</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold mb-4">成果物の深い検証で技術的品質を保証</h3>
              <p className="text-xl mb-8 opacity-90">
                要件定義からテストケース、網羅的・多層的実装、実際のカバレッジまでを<br />
                体系的に検証することで、成果物の技術的品質を保証し、開発効率を向上させます
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/docs/evaluation-framework">
                    3軸評価システムの詳細
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-teal-600" asChild>
                  <Link to="/docs/client-evaluation">依頼者向け評価</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 