import { Link } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Building,
  Brain,
  Code,
  Zap,
  Lightbulb,
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
  Target,
  Users,
  Activity,
  Trophy,
  Heart,
  GitBranch,
  Database,
  Rocket,
  Search
} from "lucide-react";

export default function AIGuidelines() {
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
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">AI活用ガイドライン</h1>
              </div>
            </div>
            <Badge className="bg-purple-100 text-purple-800">
              <BookOpen className="w-4 h-4 mr-1" />
              ガイドライン
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-purple-100 text-purple-800 hover:bg-purple-200">
            <Brain className="w-4 h-4 mr-2" />
            AI活用
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> AI活用ガイドライン</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            AI時代の開発手法と活用方針について詳しく説明します。
            バイブコーディングを中心とした効率的な開発手法で、人間の創造性とAIの能力を融合させます。
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">バイブコーディング</div>
                <div className="text-sm text-purple-700">AI支援効率開発</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">Human In AI</div>
                <div className="text-sm text-indigo-700">人間中心のAI活用</div>
              </div>
            </div>
          </div>
        </div>

        {/* AI活用原則 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">AI活用原則</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Heart className="w-5 h-5 mr-2" />
                  人間中心の設計
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">人間の創造性を重視</h4>
                  <p className="text-gray-600 text-sm">
                    AIは人間の創造性を支援するツールであり、人間の判断と意思決定を尊重します。
                    人間の直感と創造性を最大限に活かす環境を構築します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性の確保</h4>
                  <p className="text-gray-600 text-sm">
                    AIの判断プロセスを透明化し、人間が理解できる形で結果を提示します。
                    ブラックボックス化を避け、説明可能なAIを目指します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">責任の明確化</h4>
                  <p className="text-gray-600 text-sm">
                    AIの使用においても、最終的な責任は人間にあります。
                    個人の責任範囲を明確にし、自律的な判断を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的学習</h4>
                  <p className="text-gray-600 text-sm">
                    AI技術の進歩に合わせて、人間も継続的に学習し、スキルを向上させます。
                    技術の変化に柔軟に対応する文化を構築します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Target className="w-5 h-5 mr-2" />
                  効率性と品質の両立
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">開発速度の向上</h4>
                  <p className="text-gray-600 text-sm">
                    AIを活用して開発速度を向上させ、より多くの価値を短時間で提供します。
                    反復的な作業の自動化により、創造的な作業に集中できる環境を整備します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">品質の維持・向上</h4>
                  <p className="text-gray-600 text-sm">
                    AIによる自動テスト、コードレビュー、品質チェックにより、高い品質を維持します。
                    人間の品質基準をAIに学習させ、一貫した品質を実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">標準化の促進</h4>
                  <p className="text-gray-600 text-sm">
                    組織全体で統一された技術スタックと開発手法を採用し、効率性を最大化します。
                    AIによる自動化により、標準化を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">競争力の強化</h4>
                  <p className="text-gray-600 text-sm">
                    AI活用により競争優位性を確立し、市場での競争力を強化します。
                    技術革新の最前線で活躍する組織を目指します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* バイブコーディング */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">バイブコーディング</h3>
          
          {/* バイブコーディング概要 */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">階級別バイブコーディング活用</h4>
                <p className="text-gray-700 text-center mb-4">
                  各階級に応じたAI活用レベルと期待される成果を明確化し、段階的なスキル向上を促進します。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T1-T2</div>
                    <div className="font-semibold text-gray-900">基礎活用</div>
                    <div className="text-xs text-gray-600">コード生成・学習支援</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T3-T4</div>
                    <div className="font-semibold text-gray-900">応用活用</div>
                    <div className="text-xs text-gray-600">設計支援・問題解決</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T5-T6</div>
                    <div className="font-semibold text-gray-900">戦略活用</div>
                    <div className="text-xs text-gray-600">アーキテクチャ・戦略</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T7</div>
                    <div className="font-semibold text-gray-900">イノベーション</div>
                    <div className="text-xs text-gray-600">技術革新・組織変革</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">効率的開発</CardTitle>
                <CardDescription>
                  AI支援による高速開発
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    自動コード生成
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    リアルタイム支援
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    反復作業の自動化
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    3軸評価対応
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">知的協調</CardTitle>
                <CardDescription>
                  人間とAIの知的協調
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    創造性の拡張
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    問題解決支援
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    知識の共有
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    階級別メンタリング
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">継続的改善</CardTitle>
                <CardDescription>
                  学習と改善の継続
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    パターン学習
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    品質向上
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    効率化
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    昇格支援
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* プロンプトエンジニアリング */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">プロンプトエンジニアリング</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  段階的詳細化パターン
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">大枠から詳細へ</h4>
                  <p className="text-gray-600 text-sm">
                    最初に大枠の要件を提示し、段階的に詳細化します。
                    AIが全体像を把握しながら、適切な粒度で実装を進められるようにします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術選択の根拠提示</h4>
                  <p className="text-gray-600 text-sm">
                    技術選定時に「なぜその技術を選ぶか」を明示します。
                    AIが設計意図を理解し、一貫性のある実装を提供できるようにします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">問題解決の文脈提供</h4>
                  <p className="text-gray-600 text-sm">
                    エラーや課題に対して、発生状況と期待する結果を詳細に説明します。
                    AIが正確な診断と解決策を提供できるようにします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">具体的な例示</h4>
                  <p className="text-gray-600 text-sm">
                    抽象的な要件を具体的な例で説明し、AIが実装すべき内容を正確に理解できるようにします。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Settings className="w-5 h-5 mr-2" />
                  プロンプト最適化技術
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">制約条件の明示</h4>
                  <p className="text-gray-600 text-sm">
                    技術的制約、ビジネス制約、時間制約を明確化し、現実的で実装可能な解決策を得ます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">期待する出力形式の指定</h4>
                  <p className="text-gray-600 text-sm">
                    コード、ドキュメント、図表など、期待する出力形式を明示し、効率的なコミュニケーションを実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">フィードバックループ</h4>
                  <p className="text-gray-600 text-sm">
                    AIの出力に対してフィードバックを与え、継続的な改善によりより良い結果を得られるようにします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">テンプレート活用</h4>
                  <p className="text-gray-600 text-sm">
                    効果的なプロンプトテンプレートを作成し、組織全体で共有して標準化を促進します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 問題解決アプローチ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">問題解決アプローチ</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Compass className="w-5 h-5 mr-2" />
                  システム思考アプローチ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">影響範囲の特定</h4>
                  <p className="text-gray-600 text-sm">
                    個別の問題を全体システムの文脈で捉え、問題の影響範囲を特定します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">関連コンポーネントの考慮</h4>
                  <p className="text-gray-600 text-sm">
                    関連するコンポーネントを同時に考慮し、根本的な解決策と予防策を同時に実装します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">長期的影響の評価</h4>
                  <p className="text-gray-600 text-sm">
                    長期的な影響を評価し、持続可能な解決策を選択します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Search className="w-5 h-5 mr-2" />
                  段階的デバッグアプローチ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">症状の詳細観察</h4>
                  <p className="text-gray-600 text-sm">
                    複雑な問題を小さな段階に分割し、問題の症状を詳細に観察します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">仮説検証</h4>
                  <p className="text-gray-600 text-sm">
                    仮説を立てて検証し、結果に基づいて次の仮説を調整します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">効率的な問題特定</h4>
                  <p className="text-gray-600 text-sm">
                    効率的な問題特定と解決により、開発時間を短縮します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Shield className="w-5 h-5 mr-2" />
                  予防的設計アプローチ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">スケーラビリティの考慮</h4>
                  <p className="text-gray-600 text-sm">
                    現在の問題だけでなく、将来の問題も予測して設計します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">エラーハンドリングの事前設計</h4>
                  <p className="text-gray-600 text-sm">
                    エラーハンドリングを事前に設計し、拡張性を意識した構造設計を行います。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">長期的な保守性</h4>
                  <p className="text-gray-600 text-sm">
                    長期的な保守性と安定性を確保し、技術的負債を最小化します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI協調方法 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">AI協調方法</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Users className="w-5 h-5 mr-2" />
                  明確な役割分担
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">AIの得意分野を理解</h4>
                  <p className="text-gray-600 text-sm">
                    AIの得意分野を理解し、適切なタスクを割り当てます。
                    コード生成はAIに委任し、設計判断は人間が主導します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">協調的なレビュー</h4>
                  <p className="text-gray-600 text-sm">
                    レビューと調整は協調的に実施し、効率的な開発フローを実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">創造性の拡張</h4>
                  <p className="text-gray-600 text-sm">
                    人間の創造性と判断を、AIの処理と分析能力で拡張し、相乗効果を最大化します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <MessageSquare className="w-5 h-5 mr-2" />
                  継続的な学習フィードバック
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">提案の評価</h4>
                  <p className="text-gray-600 text-sm">
                    AIの提案を評価し、学習データとして活用します。
                    良い提案は理由と共に称賛し、改善点は具体的に指摘します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">プロジェクト固有の要件</h4>
                  <p className="text-gray-600 text-sm">
                    プロジェクト固有の要件を段階的に教示し、AIの提案精度を段階的に向上させます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">相互学習</h4>
                  <p className="text-gray-600 text-sm">
                    人間とAIが相互に学習し、継続的に適応することで、より良い協調関係を構築します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 文脈の継続的提供 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">文脈の継続的提供</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">プロジェクトの目的</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  プロジェクトの目的と制約を繰り返し説明し、AIが一貫性のある提案を継続的に提供できるようにします。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">実装状況の更新</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  現在の実装状況を定期的に更新し、AIが現在の状況を正確に把握できるようにします。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">制約の明確化</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  技術的制約やビジネス要件を明確化し、AIが現実的で実装可能な解決策を提案できるようにします。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 倫理的配慮 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">倫理的配慮</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-700">
                  <Shield className="w-5 h-5 mr-2" />
                  プライバシー保護
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  個人情報や機密情報の取り扱いを適切に行い、プライバシーを保護します。
                  AIシステムでもデータの安全性を確保します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Globe className="w-5 h-5 mr-2" />
                  公平性の確保
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AIシステムによる判断が公平で、差別や偏見を含まないように設計します。
                  多様性を尊重し、包括的な環境を構築します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Award className="w-5 h-5 mr-2" />
                  説明可能性
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AIの判断プロセスを説明可能にし、人間が理解できる形で結果を提示します。
                  透明性を確保し、信頼関係を構築します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Users2 className="w-5 h-5 mr-2" />
                  人間の尊厳
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  人間の尊厳と権利を尊重し、AIが人間を支配するのではなく、支援する存在であることを確認します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  社会的責任
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AI技術の社会的影響を考慮し、社会全体の利益に貢献する形で活用します。
                  持続可能な開発を目指します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Clock className="w-5 h-5 mr-2" />
                  継続的監視
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  AIシステムの運用を継続的に監視し、倫理的課題が発生した場合に迅速に対応します。
                  定期的な評価と改善を行います。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 開発プロセス特徴 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">開発プロセス特徴</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Rocket className="w-5 h-5 mr-2" />
                  イテレーティブ開発
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">MVPから開始</h4>
                  <p className="text-gray-600 text-sm">
                    小さな機能単位で実装→テスト→改善のサイクルを実現します。
                    MVP（最小実行可能製品）から開始し、機能を段階的に追加します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">早期フィードバック</h4>
                  <p className="text-gray-600 text-sm">
                    各段階で動作確認と改善を行い、早期のフィードバックとリスク軽減を実現します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <FileText className="w-5 h-5 mr-2" />
                  ドキュメント駆動開発
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">仕様書の事前作成</h4>
                  <p className="text-gray-600 text-sm">
                    実装前に仕様書や設計書を作成し、機能要件を詳細に文書化します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術仕様の明確化</h4>
                  <p className="text-gray-600 text-sm">
                    技術仕様を明確に定義し、API仕様を事前に設計することで実装の一貫性と品質を確保します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Shield className="w-5 h-5 mr-2" />
                  技術的負債の早期対応
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">定期的なレビュー</h4>
                  <p className="text-gray-600 text-sm">
                    問題を早期に発見し、即座に対応します。定期的なコードレビューを実施します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的監視</h4>
                  <p className="text-gray-600 text-sm">
                    パフォーマンス問題の早期検出とセキュリティ課題の積極的対応により、長期的な開発効率を維持します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 階級別AI活用ガイドライン */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">階級別AI活用ガイドライン</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-gray-200">
              <CardHeader>
                <CardTitle className="flex items-center text-gray-700">
                  <Target className="w-5 h-5 mr-2" />
                  T1-T2 基礎活用
                </CardTitle>
                <CardDescription>アシスタント・ジュニアエンジニア</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">期待される活用</h4>
                  <p className="text-gray-600 text-sm">
                    • 基本的なコード生成支援<br/>
                    • エラー解決の学習<br/>
                    • 技術ドキュメント理解<br/>
                    • テストコード作成支援
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3軸評価への影響</h4>
                  <p className="text-gray-600 text-sm">
                    • コミット評価：AI支援による効率化<br/>
                    • シニア評価：学習意欲と技術理解<br/>
                    • マネージャー評価：成長速度と適応性
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Users2 className="w-5 h-5 mr-2" />
                  T3-T4 応用活用
                </CardTitle>
                <CardDescription>ミドル・シニアエンジニア</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">期待される活用</h4>
                  <p className="text-gray-600 text-sm">
                    • アーキテクチャ設計支援<br/>
                    • 複雑な問題解決<br/>
                    • コードレビュー支援<br/>
                    • パフォーマンス最適化
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3軸評価への影響</h4>
                  <p className="text-gray-600 text-sm">
                    • コミット評価：設計品質と実装効率<br/>
                    • シニア評価：技術的判断力<br/>
                    • マネージャー評価：プロジェクト貢献度
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Crown className="w-5 h-5 mr-2" />
                  T5-T6 戦略活用
                </CardTitle>
                <CardDescription>テックリード・プリンシパル</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">期待される活用</h4>
                  <p className="text-gray-600 text-sm">
                    • 技術戦略策定支援<br/>
                    • チーム効率化設計<br/>
                    • 技術的負債管理<br/>
                    • イノベーション推進
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3軸評価への影響</h4>
                  <p className="text-gray-600 text-sm">
                    • コミット評価：戦略的価値創造<br/>
                    • シニア評価：リーダーシップと判断<br/>
                    • マネージャー評価：組織貢献度
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-700">
                  <Trophy className="w-5 h-5 mr-2" />
                  T7 イノベーション
                </CardTitle>
                <CardDescription>フェロー</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">期待される活用</h4>
                  <p className="text-gray-600 text-sm">
                    • 組織変革推進<br/>
                    • 技術的イノベーション<br/>
                    • 業界標準策定<br/>
                    • 次世代技術研究
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3軸評価への影響</h4>
                  <p className="text-gray-600 text-sm">
                    • コミット評価：革新的価値創造<br/>
                    • シニア評価：技術的権威と影響力<br/>
                    • マネージャー評価：組織的リーダーシップ
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* スキル開発 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">スキル開発</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Rocket className="w-5 h-5 mr-2" />
                  技術的スキル
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">AIツールの習得</h4>
                  <p className="text-gray-600 text-sm">
                    最新のAI開発ツールやフレームワークを習得し、効率的な開発手法を身につけます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">プロンプトエンジニアリング</h4>
                  <p className="text-gray-600 text-sm">
                    効果的なプロンプト設計技術を習得し、AIとの効率的な対話を実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">データ分析</h4>
                  <p className="text-gray-600 text-sm">
                    AIシステムの出力を分析し、適切な判断を行うためのデータ分析スキルを身につけます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">システム統合</h4>
                  <p className="text-gray-600 text-sm">
                    AIシステムと既存システムの統合技術を習得し、シームレスな連携を実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">階級別スキル向上</h4>
                  <p className="text-gray-600 text-sm">
                    各階級で求められるAI活用スキルを段階的に習得し、昇格に必要な能力を身につけます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Heart className="w-5 h-5 mr-2" />
                  人間的スキル
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">批判的思考</h4>
                  <p className="text-gray-600 text-sm">
                    AIの出力を批判的に評価し、適切な判断を行うための思考力を身につけます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">創造性</h4>
                  <p className="text-gray-600 text-sm">
                    AIを活用しながら、人間独自の創造性を発揮し、革新的なソリューションを生み出します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">倫理的判断</h4>
                  <p className="text-gray-600 text-sm">
                    AI技術の倫理的側面を理解し、適切な判断を行うための倫理観を身につけます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コミュニケーション</h4>
                  <p className="text-gray-600 text-sm">
                    AI技術について他者に分かりやすく説明し、効果的なコミュニケーションを実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">リーダーシップ</h4>
                  <p className="text-gray-600 text-sm">
                    上級階級では、AI活用におけるチームリーダーシップとメンタリング能力を身につけます。
                  </p>
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
              <Link to="/docs/development-process">
                <Code className="w-4 h-4 mr-2" />
                開発プロセス
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/growth-support">
                <TrendingUp className="w-4 h-4 mr-2" />
                成長・学習支援
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 