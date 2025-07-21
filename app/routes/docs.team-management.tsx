import { Link } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Building,
  Users2,
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
  Code,
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
  GitBranch,
  UserCheck,
  GitCommit,
  Eye,
  Play,
  CheckSquare,
  PieChart,
  TrendingDown,
  Briefcase,
  DollarSign,
  ChartLine
} from "lucide-react";

export default function TeamManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
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
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">評価オペレーション運営ガイド</h1>
              </div>
            </div>
            <Badge className="bg-indigo-100 text-indigo-800">
              <BookOpen className="w-4 h-4 mr-1" />
              HR向けガイドライン
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-indigo-100 text-indigo-800 hover:bg-indigo-200">
            <Settings className="w-4 h-4 mr-2" />
            評価オペレーション運営
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> 評価オペレーション運営ガイド</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            バイブコーディング時代の成果主義・競争主義評価システムの運営について詳しく説明します。
            HR担当者向けの実践的な評価オペレーションガイドラインを提供します。
          </p>
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">データドリブン評価</div>
                <div className="text-sm text-indigo-700">客観的・透明性のある評価</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">競争原理導入</div>
                <div className="text-sm text-purple-700">成果主義による成長促進</div>
              </div>
            </div>
          </div>
        </div>

        {/* バイブコーディング時代のマネジメント哲学 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">バイブコーディング時代のマネジメント哲学</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Brain className="w-5 h-5 mr-2" />
                  新しい時代の前提条件
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">AIによる開発効率化</h4>
                  <p className="text-gray-600 text-sm">
                    バイブコーディングにより、従来の3倍以上の開発速度が実現可能になりました。
                    この変化により、個人の生産性差がより明確になり、成果主義の導入が不可欠です。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">定量評価の重要性</h4>
                  <p className="text-gray-600 text-sm">
                    AIが生成するコードの品質、プロジェクト完了速度、技術的難易度への対応力など、
                    すべてが数値で測定可能になりました。主観的な評価から脱却し、データドリブンな
                    人事判断が求められます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">競争原理の導入</h4>
                  <p className="text-gray-600 text-sm">
                    個人単位での競争を徹底し、個人の実力で競い合うことで、
                    個人の技術レベル向上と自己成長を促進します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Target className="w-5 h-5 mr-2" />
                  HR担当者へのメッセージ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">従来の人事評価からの脱却</h4>
                  <p className="text-gray-600 text-sm">
                    年功序列や主観的な評価基準は、AI時代の競争力向上を阻害します。
                    実績に基づく透明性のある評価システムにより、優秀な人材の定着と
                    組織の競争力強化を実現してください。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">データドリブンな人事判断</h4>
                  <p className="text-gray-600 text-sm">
                    感情や印象ではなく、具体的な数値データに基づいて人事判断を行います。
                    これにより、公平性と透明性を保ちながら、組織の生産性向上を
                    継続的に実現できます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 成果主義・競争主義マネジメント */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">成果主義・競争主義マネジメント</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-700">
                  <Trophy className="w-5 h-5 mr-2" />
                  成果主義の基本原則
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">実績による評価</h4>
                  <p className="text-gray-600 text-sm">
                    プロジェクト完了数、獲得ポイント、技術的難易度への対応力など、
                    具体的な実績のみで評価を行います。経験年数や学歴は考慮しません。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性の確保</h4>
                  <p className="text-gray-600 text-sm">
                    評価基準と計算方法を全員に公開し、誰でも自分の評価を
                    確認できるようにします。隠れた基準や恣意的な判断は排除します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的な改善</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果に基づいて、個人の成長計画を策定し、
                    定期的なフィードバックにより改善を促進します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  競争主義の導入
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">個人プロジェクトでの競争</h4>
                  <p className="text-gray-600 text-sm">
                    個人単位でプロジェクトに取り組み、個人の実力で競い合います。
                    これにより、個人の技術レベル向上と自己成長を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ランキング制度</h4>
                  <p className="text-gray-600 text-sm">
                    週次・月次・半年のランキングを公開し、競争意識を高めます。
                    上位者には特別な待遇や機会を提供します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">個人競争の徹底</h4>
                  <p className="text-gray-600 text-sm">
                    個人単位での競争を徹底し、個人の実力と成果のみで
                    評価を行います。チーム競争は導入しません。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 実運用での具体的施策 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">実運用での具体的施策</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">毎週の確認・評価</CardTitle>
                <CardDescription>
                  週次レビューと1on1ミーティング
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    週次レビュー（金曜日）
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    1on1ミーティング
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    個人改善アクション
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-yellow-200">
              <CardHeader>
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-700">月次表彰制度</CardTitle>
                <CardDescription>
                  月間MVP・技術革新賞
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    月間MVP表彰
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    技術革新賞
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-yellow-500 mr-2" />
                    個人成果の可視化
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">上位者特別待遇</CardTitle>
                <CardDescription>
                  優先プロジェクト・研修支援
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    優先プロジェクトアサイン
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    特別研修・資格取得支援
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    個人成長機会の提供
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 新規採用戦略（トライアル制度） */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">新規採用戦略（トライアル制度）</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <UserCheck className="w-5 h-5 mr-2" />
                  実践的トライアル制度
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">面談からの脱却</h4>
                  <p className="text-gray-600 text-sm">
                    従来の面談中心の採用から、実際のプロジェクトに参加して
                    実力を確認するトライアル制度に移行します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">2週間トライアル</h4>
                  <p className="text-gray-600 text-sm">
                    候補者に2週間のトライアル期間を設け、実際のプロジェクトに
                    参加してもらい、実力を評価します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">評価基準の明確化</h4>
                  <p className="text-gray-600 text-sm">
                    トライアル期間中の評価基準を事前に明確にし、
                    透明性のある採用判断を行います。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Target className="w-5 h-5 mr-2" />
                  トライアル評価項目
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術力評価</h4>
                  <p className="text-gray-600 text-sm">
                    コード品質、問題解決能力、技術的難易度への対応力を
                    実際のプロジェクトで評価します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コミュニケーション能力</h4>
                  <p className="text-gray-600 text-sm">
                    チーム内でのコミュニケーション、要件理解力、
                    進捗報告の適切性を評価します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">学習能力・成長性</h4>
                  <p className="text-gray-600 text-sm">
                    新しい技術への適応力、フィードバックへの対応力、
                    継続的な改善意欲を評価します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 個人成長・昇格制度 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">個人成長・昇格制度</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  個人の自己対応原則
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">フィードバックによる自己改善</h4>
                  <p className="text-gray-600 text-sm">
                    評価フィードバックを受けて、個人が自発的に課題を認識し、
                    自己改善に取り組むことを基本とします。制度による強制的な成長支援は行いません。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">個人責任の明確化</h4>
                  <p className="text-gray-600 text-sm">
                    成長やスキル向上は個人の責任であり、組織が強制的にサポートするものではありません。
                    個人の自律性と自己管理能力を重視します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">実績による評価</h4>
                  <p className="text-gray-600 text-sm">
                    成長の度合いは具体的な実績で評価され、抽象的な成長目標や
                    長期的な計画は評価対象外とします。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Crown className="w-5 h-5 mr-2" />
                  昇格制度
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">階級定義と役割</h4>
                  <p className="text-gray-600 text-sm">
                    各階級には明確な役割と期待される実績が定義されており、
                    その役割を担える実績のある者のみが昇格対象となります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">人事委員会による都度判断</h4>
                  <p className="text-gray-600 text-sm">
                    昇格は人事委員会による都度判断で決定され、自動的な昇格制度はありません。
                    実績と能力を総合的に評価して判断します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">メンター業務の範囲</h4>
                  <p className="text-gray-600 text-sm">
                    長期的な目標設定やキャリア相談はメンターの業務として実施されますが、
                    これは管理されるものではなく、個人の成長支援に限定されます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>



        {/* パフォーマンス分析 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">パフォーマンス分析</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  組織全体分析
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">生産性指標</h4>
                  <p className="text-gray-600 text-sm">
                    プロジェクト完了率、平均評価スコア、ポイント獲得率などの
                    組織全体の生産性指標を定期的に分析します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術力分布</h4>
                  <p className="text-gray-600 text-sm">
                    技術スタック別のスキル分布や、個人の成長軌跡を分析し、
                    教育・研修計画の策定に活用します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">改善点特定</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果の傾向分析から、組織全体の改善点を特定し、
                    プロセス改善や制度見直しに反映します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  個人評価
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成長軌跡</h4>
                  <p className="text-gray-600 text-sm">
                    各メンバーの評価履歴と成長軌跡を追跡し、スキル向上の
                    傾向と課題を分析します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">強み・弱み分析</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果から個人の強みと弱みを分析し、キャリア開発の
                    サポート計画を策定します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">給与連動</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果を給与システムと連動させ、公平で透明性のある
                    報酬体系を構築します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* ベストプラクティス */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">ベストプラクティス</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-700">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  人事管理のベストプラクティス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">定期的な制度見直し</h4>
                  <p className="text-gray-600 text-sm">
                    評価制度や報酬体系を定期的に見直し、組織の成長に
                    合わせて最適化します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性の維持</h4>
                  <p className="text-gray-600 text-sm">
                    すべての人事判断の根拠を明確にし、透明性を
                    常に保ちます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的なコミュニケーション</h4>
                  <p className="text-gray-600 text-sm">
                    メンバーとの定期的なコミュニケーションにより、
                    制度への理解と納得を得ます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Briefcase className="w-5 h-5 mr-2" />
                  組織運営のベストプラクティス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">データドリブンな意思決定</h4>
                  <p className="text-gray-600 text-sm">
                    感情や印象ではなく、常にデータに基づいて
                    意思決定を行います。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的改善</h4>
                  <p className="text-gray-600 text-sm">
                    組織全体で継続的な改善を推進し、
                    競争力の向上を図ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">優秀な人材の定着</h4>
                  <p className="text-gray-600 text-sm">
                    優秀な人材が長く活躍できる環境を整え、
                    組織の競争力を維持します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <DollarSign className="w-5 h-5 mr-2" />
                  報酬・待遇のベストプラクティス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成果連動型報酬</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果に基づく成果連動型の報酬体系を構築し、
                    モチベーション向上を図ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特別待遇の明確化</h4>
                  <p className="text-gray-600 text-sm">
                    上位者への特別待遇を明確にし、競争意識を
                    高めます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成長機会の提供</h4>
                  <p className="text-gray-600 text-sm">
                    優秀な人材には成長機会を積極的に提供し、
                    キャリア開発を支援します。
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
              <Link to="/docs/ai-guidelines">
                <Brain className="w-4 h-4 mr-2" />
                AI活用ガイドライン
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link to="/docs/development-process">
                <Code className="w-4 h-4 mr-2" />
                開発プロセス
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 