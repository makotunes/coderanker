import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  ArrowLeft,
  BookOpen,
  Code,
  Brain,
  Target,
  Zap,
  CheckCircle,
  TrendingUp,
  Users,
  Settings,
  FileText,
  Lightbulb,
  Rocket,
  Shield,
  Clock,
  Star
} from "lucide-react";

export default function IdealVibeCodingGuide() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* ヘッダー */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/docs">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  ドキュメント一覧
                </Link>
              </Button>
              <div className="w-px h-6 bg-gray-300"></div>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                  <Code className="w-5 h-5 text-emerald-600" />
                </div>
                <h1 className="text-xl font-semibold text-gray-900">理想のバイブコーディング指針</h1>
              </div>
            </div>
            <Badge className="bg-emerald-100 text-emerald-800">
              <BookOpen className="w-3 h-3 mr-1" />
              開発手法
            </Badge>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-emerald-100 text-emerald-800 hover:bg-emerald-200">
            <Code className="w-4 h-4 mr-2" />
            開発手法
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            理想の
            <span className="bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent"> バイブコーディング指針</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            AI時代の効率的な開発手法を体系的に分析し、実践的な指針としてまとめたナレッジベースです。
          </p>
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600 mb-2">AI協調開発</div>
                <div className="text-sm text-emerald-700">人間とAIの最適な役割分担</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">効率的な問題解決</div>
                <div className="text-sm text-green-700">段階的アプローチとシステム思考</div>
              </div>
            </div>
          </div>
        </div>

        {/* プロンプトパターン分析 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">📊 プロンプトパターン分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>段階的詳細化パターン</CardTitle>
                <CardDescription>
                  大枠から詳細へ段階的に要件を具体化
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 基本要件の提示</div>
                  <div>• 機能要件の詳細化</div>
                  <div>• 技術実装の具体化</div>
                  <div>• 全体像の把握</div>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>効果:</strong> AIが全体像を把握しながら、適切な粒度で実装を進められる
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <Target className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>技術選択の根拠提示</CardTitle>
                <CardDescription>
                  技術選定時に「なぜその技術を選ぶか」を明示
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 技術選定の理由</div>
                  <div>• 設計意図の説明</div>
                  <div>• 制約条件の明示</div>
                  <div>• 一貫性の確保</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <p className="text-sm text-green-800">
                    <strong>効果:</strong> AIが設計意図を理解し、一貫性のある実装を提供
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <Brain className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>問題解決の文脈提供</CardTitle>
                <CardDescription>
                  エラーや課題の発生状況と期待結果を詳細に説明
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 発生状況の説明</div>
                  <div>• 期待する動作</div>
                  <div>• 環境情報の提供</div>
                  <div>• 正確な診断</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <p className="text-sm text-purple-800">
                    <strong>効果:</strong> AIが正確な診断と解決策を提供できる
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 問題解決アプローチ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">🔧 問題解決アプローチ分析</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  システム思考アプローチ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特徴</h4>
                  <p className="text-gray-600 text-sm">
                    個別の問題を全体システムの文脈で捉える
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 問題の影響範囲を特定</div>
                    <div>• 関連するコンポーネントを同時に考慮</div>
                    <div>• 長期的な影響を評価</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    根本的な解決策と予防策を同時に実装
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="w-5 h-5 mr-2 text-green-600" />
                  段階的デバッグアプローチ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特徴</h4>
                  <p className="text-gray-600 text-sm">
                    複雑な問題を小さな段階に分割して解決
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 問題の症状を詳細に観察</div>
                    <div>• 仮説を立てて検証</div>
                    <div>• 結果に基づいて次の仮説を調整</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    効率的な問題特定と解決
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI協調方法 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">🤝 AI協調方法分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>明確な役割分担</CardTitle>
                <CardDescription>
                  AIの得意分野を理解し、適切なタスクを割り当て
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    コード生成はAIに委任
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    設計判断は人間が主導
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    レビューと調整は協調的に
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>継続的な学習フィードバック</CardTitle>
                <CardDescription>
                  AIの提案を評価し、学習データとして活用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    良い提案は理由と共に称賛
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    改善点は具体的に指摘
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    プロジェクト固有の要件を教示
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>文脈の継続的提供</CardTitle>
                <CardDescription>
                  プロジェクトの全体像と現在の状況を常に共有
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    プロジェクトの目的と制約を説明
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    現在の実装状況を定期的に更新
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    技術的制約やビジネス要件を明確化
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 開発プロセス特徴 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">🚀 開発プロセス特徴分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="w-5 h-5 mr-2 text-blue-600" />
                  イテレーティブ開発
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特徴</h4>
                  <p className="text-gray-600 text-sm">
                    小さな機能単位で実装→テスト→改善のサイクル
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• MVP（最小実行可能製品）から開始</div>
                    <div>• 機能を段階的に追加</div>
                    <div>• 各段階で動作確認と改善</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    早期のフィードバックとリスク軽減
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-green-600" />
                  ドキュメント駆動開発
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特徴</h4>
                  <p className="text-gray-600 text-sm">
                    実装前に仕様書や設計書を作成
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 機能要件を詳細に文書化</div>
                    <div>• 技術仕様を明確に定義</div>
                    <div>• API仕様を事前に設計</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    実装の一貫性と品質を確保
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  技術的負債の早期対応
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特徴</h4>
                  <p className="text-gray-600 text-sm">
                    問題を早期に発見し、即座に対応
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <div className="space-y-1 text-sm text-gray-600">
                    <div>• 定期的なコードレビュー</div>
                    <div>• パフォーマンス問題の早期検出</div>
                    <div>• セキュリティ課題の積極的対応</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    長期的な開発効率を維持
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 効果的なプロンプトテクニック */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">📈 効果的なプロンプトテクニック</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                  具体的な例示
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <p className="text-gray-600 text-sm">
                    抽象的な要件を具体的な例で説明
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    AIが実装すべき内容を正確に理解
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="w-5 h-5 mr-2 text-blue-600" />
                  制約条件の明示
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">手法</h4>
                  <p className="text-gray-600 text-sm">
                    技術的制約、ビジネス制約、時間制約を明確化
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効果</h4>
                  <p className="text-gray-600 text-sm">
                    現実的で実装可能な解決策を得られる
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 成功要因分析 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">🎯 成功要因分析</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>明確なビジョン</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    プロジェクトの目的と方向性が一貫
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    技術選定の根拠が明確
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    長期的な目標が設定されている
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle>適応的なアプローチ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    問題発生時に柔軟に対応
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    技術的制約に応じて設計を調整
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    学習した内容を次回に活用
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle>品質重視の姿勢</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    機能実装だけでなく品質も重視
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    セキュリティとパフォーマンスを考慮
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    保守性と拡張性を意識した設計
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 他者への適用指針 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">📚 他者への適用指針</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Rocket className="w-5 h-5 mr-2 text-blue-600" />
                  プロジェクト開始時
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• 明確なビジョンと制約条件を設定</div>
                  <div>• 技術スタックの選定根拠を文書化</div>
                  <div>• 段階的な開発計画を策定</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-green-600" />
                  開発進行中
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• 定期的な進捗確認と方向性の調整</div>
                  <div>• 問題発生時の文脈提供</div>
                  <div>• AIとの継続的な学習フィードバック</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-purple-600" />
                  品質管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-1 text-sm text-gray-600">
                  <div>• 定期的なコードレビューとリファクタリング</div>
                  <div>• パフォーマンスとセキュリティの継続的監視</div>
                  <div>• ドキュメントの継続的更新</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-emerald-600 to-green-600 text-white">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold mb-4">バイブコーディングを実践しよう</h3>
              <p className="text-xl mb-8 opacity-90">
                この指針を参考に、AI時代の効率的な開発手法を身につけましょう
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/docs">
                    他のドキュメントを見る
                    <ArrowLeft className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-emerald-600" asChild>
                  <Link to="/register">無料で始める</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
} 