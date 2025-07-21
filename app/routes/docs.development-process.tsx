import { Link } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Building,
  Code,
  GitBranch,
  Target,
  Brain,
  ArrowLeft,
  CheckCircle,
  Clock,
  Crown,
  Star,
  TrendingUp,
  Shield,
  Globe,
  Award,
  BookOpen,
  Users2,
  Calendar,
  BarChart3,
  Settings,
  Compass,
  FileText,
  MessageSquare,
  ArrowRight,
  Zap,
  Database,
  Rocket,
  Heart,
  Activity,
  Trophy,
  Lightbulb,
  Users,
  GitCommit,
  TestTube,
  Eye,
  Play,
  CheckSquare,
  UserCheck
} from "lucide-react";

export default function DevelopmentProcess() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* ヘッダー */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link to="/docs">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  戻る
                </Link>
              </Button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">開発プロセス</h1>
              </div>
            </div>
            <Badge className="bg-blue-100 text-blue-800">
              <BookOpen className="w-4 h-4 mr-1" />
              ガイドライン
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Code className="w-4 h-4 mr-2" />
            開発プロセス
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> 開発プロセス</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            効率的で質の高い開発手法について詳しく説明します。
            バイブコーディングを活用した標準化された開発フローで、個人の能力を最大限に発揮します。
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">バイブコーディング</div>
                <div className="text-sm text-blue-700">AI支援効率開発</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">標準化</div>
                <div className="text-sm text-indigo-700">統一された開発手法</div>
              </div>
            </div>
          </div>
        </div>

        {/* 開発フロー */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">開発フロー</h3>
          
          {/* 3軸評価対応の開発フロー概要 */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">3軸評価に対応した開発フロー</h4>
                <p className="text-gray-700 text-center mb-4">
                  各段階で3軸評価（成果物品質・成果量・マネージャー評価）の基準を満たす開発プロセスを実践します。
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">成果物品質評価</div>
                    <div className="font-semibold text-gray-900">要件定義・テスト網羅性</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">成果量評価</div>
                    <div className="font-semibold text-gray-900">コミット履歴・開発プロセス</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">マネージャー評価</div>
                    <div className="font-semibold text-gray-900">要件一致性・プロセス品質</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">1. 要件定義</CardTitle>
                <CardDescription className="text-blue-600">マネージャー評価対応</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 明確で測定可能な要件</div>
                  <div>• 機能・非機能要件の詳細化</div>
                  <div>• 受け入れ条件の明確化</div>
                  <div>• AIによる要件検証</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">2. 設計・実装</CardTitle>
                <CardDescription className="text-green-600">成果量評価対応</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• バイブコーディング活用</div>
                  <div>• 段階的実装の実践</div>
                  <div>• 適切なコミット粒度</div>
                  <div>• 継続的開発リズム</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <TestTube className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">3. テスト</CardTitle>
                <CardDescription className="text-purple-600">成果物品質評価対応</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 高テストカバレッジ</div>
                  <div>• 要件カバレッジ確認</div>
                  <div>• 自動テスト実行</div>
                  <div>• 品質メトリクス収集</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-700">4. レビュー</CardTitle>
                <CardDescription className="text-indigo-600">全評価軸対応</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• AI支援コードレビュー</div>
                  <div>• シニアエンジニア評価</div>
                  <div>• 設計品質チェック</div>
                  <div>• セキュリティ・パフォーマンス</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Play className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-700">5. デプロイ</CardTitle>
                <CardDescription className="text-orange-600">最終評価対応</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 自動デプロイメント</div>
                  <div>• 本番環境テスト</div>
                  <div>• パフォーマンス監視</div>
                  <div>• マネージャー検収</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* コード品質基準 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">コード品質基準</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Shield className="w-5 h-5 mr-2" />
                  技術的品質
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">可読性</h4>
                  <p className="text-gray-600 text-sm">
                    明確で理解しやすいコードを書くことを重視します。
                    適切な命名規則、コメント、ドキュメントを徹底します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">保守性</h4>
                  <p className="text-gray-600 text-sm">
                    将来の変更や拡張に対応できる柔軟な設計を行います。
                    モジュール化、関心の分離、依存関係の最小化を実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">パフォーマンス</h4>
                  <p className="text-gray-600 text-sm">
                    効率的なアルゴリズムとデータ構造を使用し、適切なパフォーマンスを確保します。
                    ボトルネックの特定と最適化を継続的に行います。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">セキュリティ</h4>
                  <p className="text-gray-600 text-sm">
                    セキュリティベストプラクティスに従い、脆弱性を排除します。
                    定期的なセキュリティ監査と更新を実施します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <CheckSquare className="w-5 h-5 mr-2" />
                  品質保証
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">テストカバレッジ</h4>
                  <p className="text-gray-600 text-sm">
                    高いテストカバレッジを維持し、コードの品質を保証します。
                    単体テスト、統合テスト、E2Eテストを適切に組み合わせます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">静的解析</h4>
                  <p className="text-gray-600 text-sm">
                    静的解析ツールを活用し、潜在的な問題を早期に発見します。
                    コードの一貫性と品質基準の遵守を自動化します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的統合</h4>
                  <p className="text-gray-600 text-sm">
                    CI/CDパイプラインで自動テストと品質チェックを実行します。
                    問題のあるコードが本番環境に到達することを防ぎます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">監視・ログ</h4>
                  <p className="text-gray-600 text-sm">
                    適切なログと監視を実装し、本番環境での問題を迅速に特定します。
                    パフォーマンスメトリクスとエラー追跡を継続的に行います。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* テスト戦略 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">テスト戦略</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TestTube className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">単体テスト</CardTitle>
                <CardDescription>
                  個別機能のテスト
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    関数・メソッド単位
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    高速実行
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    自動化
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GitCommit className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">統合テスト</CardTitle>
                <CardDescription>
                  コンポーネント間の連携
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    モジュール間連携
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    データフロー
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    エラー処理
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">E2Eテスト</CardTitle>
                <CardDescription>
                  ユーザー視点のテスト
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    ユーザーシナリオ
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    UI/UX検証
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    本番環境類似
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-indigo-200">
              <CardHeader>
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-8 h-8 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-700">パフォーマンステスト</CardTitle>
                <CardDescription>
                  性能・負荷テスト
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                    レスポンス時間
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                    スループット
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-indigo-500 mr-2" />
                    負荷耐性
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 評価基準との整合性 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価基準との整合性</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Brain className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">成果物品質評価対応</CardTitle>
                <CardDescription className="text-blue-700">要件定義とテスト網羅性の確保</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">要件定義の明確化</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 機能要件の詳細化</div>
                    <div>• 非機能要件の設定</div>
                    <div>• 受け入れ条件の明確化</div>
                    <div>• 測定可能な成果物定義</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">テスト網羅性の確保</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 高テストカバレッジ（80%以上）</div>
                    <div>• 要件カバレッジの確認</div>
                    <div>• 自動テストの継続実行</div>
                    <div>• 品質メトリクスの収集</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">シニアエンジニア評価</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 週次Cursor評価の実施</div>
                    <div>• 設計品質のチェック</div>
                    <div>• 技術的深さの評価</div>
                    <div>• コードレビューの実施</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">成果量評価対応</CardTitle>
                <CardDescription className="text-green-700">コミット履歴と開発プロセスの最適化</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">コミット履歴の最適化</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 適切なコミット粒度</div>
                    <div>• 明確なコミットメッセージ</div>
                    <div>• 機能単位での実装</div>
                    <div>• 継続的な開発リズム</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">開発プロセスの質</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• 段階的実装の実践</div>
                    <div>• 問題解決の効率性</div>
                    <div>• 技術的負債の管理</div>
                    <div>• 継続的改善の実現</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-green-800">AI評価への対応</h4>
                  <div className="space-y-1 text-sm text-green-700">
                    <div>• コミット毎のAI評価</div>
                    <div>• 差分分析の最適化</div>
                    <div>• 機能実装量の可視化</div>
                    <div>• 要件対応度の向上</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">マネージャー評価対応</CardTitle>
                <CardDescription className="text-purple-700">要件一致性とプロセス品質の確保</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">要件定義一致性</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 機能要件の完全実装</div>
                    <div>• 非機能要件の達成</div>
                    <div>• ビジネス要件の適合</div>
                    <div>• 期待値との整合性</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">プロセス品質の向上</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 適切な報告・連絡・相談</div>
                    <div>• マネージャー負荷の軽減</div>
                    <div>• 問題対応の迅速性</div>
                    <div>• 進捗共有の頻度・質</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">週次評価の準備</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 25分以内での評価対応</div>
                    <div>• 成果物の事前確認</div>
                    <div>• 改善点の明確化</div>
                    <div>• フィードバックの受容</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* レビュープロセス */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">レビュープロセス</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Brain className="w-5 h-5 mr-2" />
                  AI支援レビュー
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">自動コード解析</h4>
                  <p className="text-gray-600 text-sm">
                    AIによる自動的なコード解析により、潜在的な問題や改善点を早期に発見します。
                    一貫性のある品質チェックを実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ベストプラクティス提案</h4>
                  <p className="text-gray-600 text-sm">
                    業界標準のベストプラクティスに基づく改善提案を提供します。
                    学習効果を高め、スキル向上を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">セキュリティチェック</h4>
                  <p className="text-gray-600 text-sm">
                    セキュリティ脆弱性の自動検出と修正提案を行います。
                    セキュリティリスクを最小化します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">パフォーマンス分析</h4>
                  <p className="text-gray-600 text-sm">
                    コードのパフォーマンス特性を分析し、最適化の機会を特定します。
                    効率的なコードの実装を支援します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Users className="w-5 h-5 mr-2" />
                  人間によるレビュー
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">設計レビュー</h4>
                  <p className="text-gray-600 text-sm">
                    アーキテクチャと設計の妥当性を人間の視点で評価します。
                    ビジネス要件との整合性を確認します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コードレビュー</h4>
                  <p className="text-gray-600 text-sm">
                    可読性、保守性、効率性の観点からコードを評価します。
                    知識共有とスキル向上を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">セキュリティレビュー</h4>
                  <p className="text-gray-600 text-sm">
                    セキュリティ専門家による詳細なセキュリティレビューを実施します。
                    高度なセキュリティリスクを特定します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ユーザビリティレビュー</h4>
                  <p className="text-gray-600 text-sm">
                    ユーザー体験の観点から機能を評価し、使いやすさを向上させます。
                    ユーザー中心の設計を実現します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 時間軸と評価の流れ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">時間軸と評価の流れ</h3>
          
          {/* 時間軸の概要 */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">週次開発・月次評価のサイクル</h4>
                <p className="text-gray-700 text-center mb-6">
                  毎週開発を行い、3軸で暫定評価を受け、月次でランキングと報酬が決定される透明性の高い評価システム
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-blue-600 mb-2">週次開発</div>
                    <div className="text-sm text-blue-700">毎週の開発サイクル</div>
                    <div className="text-xs text-gray-600 mt-2">3軸暫定評価</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-purple-600 mb-2">月次ランキング</div>
                    <div className="text-sm text-purple-700">月次での順位決定</div>
                    <div className="text-xs text-gray-600 mt-2">報酬変動</div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-2xl font-bold text-green-600 mb-2">継続改善</div>
                    <div className="text-sm text-green-700">フィードバック活用</div>
                    <div className="text-xs text-gray-600 mt-2">次月への改善</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 詳細な時間軸フロー */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">週次開発サイクル</CardTitle>
                <CardDescription className="text-blue-700">毎週の開発と暫定評価の流れ</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">週初（月曜日）</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 週次目標の設定</div>
                    <div>• 開発タスクの計画</div>
                    <div>• 前週の評価フィードバック確認</div>
                    <div>• 改善点の実践開始</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">週中（火〜木）</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• バイブコーディング活用開発</div>
                    <div>• 継続的コミット・プッシュ</div>
                    <div>• 自動テストの実行</div>
                    <div>• 進捗のマネージャー共有</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-blue-800">週末（金曜日）</h4>
                  <div className="space-y-1 text-sm text-blue-700">
                    <div>• 週次成果物の完成</div>
                    <div>• 3軸暫定評価の実施</div>
                    <div>• マネージャーとの25分評価</div>
                    <div>• 次週への改善計画策定</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">月次評価・ランキング</CardTitle>
                <CardDescription className="text-purple-700">月次での総合評価と報酬決定</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">月次評価（月末）</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 4週分の暫定評価集計</div>
                    <div>• 3軸評価の総合スコア算出</div>
                    <div>• 月次目標達成度の評価</div>
                    <div>• 改善度・成長度の評価</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">ランキング決定（月初）</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 全メンバーの順位決定</div>
                    <div>• 階級別ランキング更新</div>
                    <div>• 昇格・降格の判定</div>
                    <div>• 報酬変動の計算</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-purple-800">報酬反映（月初）</h4>
                  <div className="space-y-1 text-sm text-purple-700">
                    <div>• 基本給の確定</div>
                    <div>• 月次変動報酬の支給</div>
                    <div>• 昇格ボーナスの支給</div>
                    <div>• 次月目標の設定</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 3軸評価の時間軸対応 */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">3軸評価の時間軸対応</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <Brain className="w-5 h-5 text-blue-600" />
                      </div>
                      <div className="font-semibold text-blue-800">成果物品質評価</div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>週次：</strong>テストカバレッジ・コード品質</div>
                      <div><strong>月次：</strong>総合品質スコア・技術的深さ</div>
                      <div><strong>評価：</strong>シニアエンジニアによる判定</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <GitBranch className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="font-semibold text-green-800">成果量評価</div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>週次：</strong>コミット数・実装機能数</div>
                      <div><strong>月次：</strong>総実装量・開発効率</div>
                      <div><strong>評価：</strong>AIによる自動分析</div>
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-4 border">
                    <div className="text-center mb-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                        <UserCheck className="w-5 h-5 text-purple-600" />
                      </div>
                      <div className="font-semibold text-purple-800">マネージャー評価</div>
                    </div>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div><strong>週次：</strong>25分評価・進捗報告</div>
                      <div><strong>月次：</strong>総合評価・成長度</div>
                      <div><strong>評価：</strong>マネージャーによる判定</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 週次評価プロセス */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-yellow-200 bg-yellow-50">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-800">開発者向け準備事項</CardTitle>
                <CardDescription className="text-yellow-700">週次評価に向けた準備と実践</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-800">週次成果の整理</h4>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div>• 実装した機能の一覧化</div>
                    <div>• コミット履歴の確認</div>
                    <div>• テスト結果の整理</div>
                    <div>• 課題・改善点の明確化</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-800">マネージャーへの報告</h4>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div>• 進捗状況の詳細報告</div>
                    <div>• 技術的課題の共有</div>
                    <div>• 次週の計画提示</div>
                    <div>• 支援要請の明確化</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-yellow-800">評価データの準備</h4>
                  <div className="space-y-1 text-sm text-yellow-700">
                    <div>• テストカバレッジレポート</div>
                    <div>• パフォーマンスメトリクス</div>
                    <div>• セキュリティチェック結果</div>
                    <div>• コード品質指標</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-cyan-200 bg-cyan-50">
              <CardHeader>
                <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-cyan-600" />
                </div>
                <CardTitle className="text-cyan-800">マネージャー向け評価手順</CardTitle>
                <CardDescription className="text-cyan-700">25分以内での効率的な評価</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-800">要件書の確認（5分）</h4>
                  <div className="space-y-1 text-sm text-cyan-700">
                    <div>• 機能要件の再確認</div>
                    <div>• 非機能要件の確認</div>
                    <div>• ビジネス要件の確認</div>
                    <div>• 評価優先順位の設定</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-800">機能要件の確認（10分）</h4>
                  <div className="space-y-1 text-sm text-cyan-700">
                    <div>• 各機能の動作確認</div>
                    <div>• 機能間の連携確認</div>
                    <div>• エラー処理の確認</div>
                    <div>• 期待通りの動作検証</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-800">プロセス品質の確認（5分）</h4>
                  <div className="space-y-1 text-sm text-cyan-700">
                    <div>• 報告・連絡・相談の評価</div>
                    <div>• マネージャー負荷の評価</div>
                    <div>• 問題対応の評価</div>
                    <div>• 進捗共有の評価</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-cyan-800">総合評価（5分）</h4>
                  <div className="space-y-1 text-sm text-cyan-700">
                    <div>• 総合スコアの算出</div>
                    <div>• 改善点の記入</div>
                    <div>• 評価コメントの記入</div>
                    <div>• 次週の期待値設定</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* デプロイメント */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">デプロイメント</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Rocket className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">自動化</CardTitle>
                <CardDescription>
                  継続的デプロイメント
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    CI/CDパイプライン
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    自動テスト実行
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    自動デプロイ
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">安全性</CardTitle>
                <CardDescription>
                  リスク最小化
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    段階的デプロイ
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ロールバック機能
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    監視・アラート
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">効率性</CardTitle>
                <CardDescription>
                  迅速なリリース
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    高速デプロイ
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    並行開発
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    迅速なフィードバック
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 関連ページへのリンク */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">関連ガイドライン</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" asChild>
              <Link to="/docs/organizational-culture">
                <Building className="w-4 h-4 mr-2" />
                組織文化ガイド
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/hr-evaluation">
                <Award className="w-4 h-4 mr-2" />
                人事評価制度
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/ai-guidelines">
                <Brain className="w-4 h-4 mr-2" />
                AI活用ガイドライン
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/team-management">
                <Users2 className="w-4 h-4 mr-2" />
                チーム運営
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 