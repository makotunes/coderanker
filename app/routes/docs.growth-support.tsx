import { Link } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Building,
  TrendingUp,
  Target,
  Brain,
  ArrowLeft,
  CheckCircle,
  Clock,
  Crown,
  Star,
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
  GraduationCap,
  Users2,
  BookOpenCheck
} from "lucide-react";

export default function GrowthSupport() {
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
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">成長・学習支援</h1>
              </div>
            </div>
            <Badge className="bg-pink-100 text-pink-800">
              <BookOpen className="w-4 h-4 mr-1" />
              ガイドライン
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-pink-100 text-pink-800 hover:bg-pink-200">
            <TrendingUp className="w-4 h-4 mr-2" />
            成長・学習支援
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"> 成長・学習支援</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            個人とチームの継続的成長支援について詳しく説明します。
            技術的スキルの向上からキャリア開発まで、包括的な成長支援を提供します。
          </p>
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-pink-600 mb-2">継続的学習</div>
                <div className="text-sm text-pink-700">技術革新への対応</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">個人成長</div>
                <div className="text-sm text-purple-700">キャリア発展支援</div>
              </div>
            </div>
          </div>
        </div>

        {/* 学習機会の提供 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">学習機会の提供</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-pink-200">
              <CardHeader>
                <CardTitle className="flex items-center text-pink-700">
                  <GraduationCap className="w-5 h-5 mr-2" />
                  技術学習
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">オンライン学習プラットフォーム</h4>
                  <p className="text-gray-600 text-sm">
                    最新の技術トレンドに対応したオンライン学習プラットフォームを提供します。
                    個人のペースで学習を進められる環境を整備します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術書籍・資料</h4>
                  <p className="text-gray-600 text-sm">
                    最新の技術書籍や技術資料を提供し、深い知識の習得を支援します。
                    組織全体で知識を共有し、学習効果を最大化します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ハンズオン研修</h4>
                  <p className="text-gray-600 text-sm">
                    実践的なスキルを身につけるためのハンズオン研修を定期的に実施します。
                    実際のプロジェクトで活用できる技術を習得します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">AI活用学習</h4>
                  <p className="text-gray-600 text-sm">
                    バイブコーディングやAI活用技術の習得を支援します。
                    最新のAI技術を活用した効率的な学習方法を提供します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Users2 className="w-5 h-5 mr-2" />
                  コミュニティ学習
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術勉強会</h4>
                  <p className="text-gray-600 text-sm">
                    定期的な技術勉強会を開催し、知識共有と相互学習を促進します。
                    最新技術の情報交換と実践的なスキル向上を実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">外部カンファレンス参加</h4>
                  <p className="text-gray-600 text-sm">
                    国内外の技術カンファレンスへの参加を支援し、最新トレンドを把握します。
                    ネットワーキングと技術交流の機会を提供します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">オープンソース貢献</h4>
                  <p className="text-gray-600 text-sm">
                    オープンソースプロジェクトへの貢献を奨励し、実践的なスキル向上を促進します。
                    コミュニティとの交流を通じて技術力を高めます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術ブログ・執筆</h4>
                  <p className="text-gray-600 text-sm">
                    技術ブログの執筆や技術記事の投稿を支援し、知識の体系化を促進します。
                    アウトプットを通じた学習効果を最大化します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* メンタリング制度 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">メンタリング制度</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">1on1メンタリング</CardTitle>
                <CardDescription>
                  定期的な個人面談
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    月1回の定期面談
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    キャリア相談
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    技術的アドバイス
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">グループメンタリング</CardTitle>
                <CardDescription>
                  チーム単位の学習支援
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    技術的課題解決
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ベストプラクティス共有
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    相互学習促進
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">専門分野メンタリング</CardTitle>
                <CardDescription>
                  専門技術の深掘り
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    専門分野の指導
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    最新技術の紹介
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    キャリアパス設計
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 技術勉強会 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">技術勉強会</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">週次技術勉強会</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  最新技術の紹介と実践的なスキル向上を目的とした週次勉強会を開催します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">AI活用勉強会</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  バイブコーディングやAI活用技術に特化した勉強会を定期的に開催します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Database className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">アーキテクチャ勉強会</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  システム設計とアーキテクチャに関する深い知識を共有する勉強会を開催します。
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-700">セキュリティ勉強会</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  セキュリティベストプラクティスと最新の脅威対策について学ぶ勉強会を開催します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 資格取得支援 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">資格取得支援</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Award className="w-5 h-5 mr-2" />
                  技術資格
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">クラウド資格</h4>
                  <p className="text-gray-600 text-sm">
                    AWS、Azure、GCPなどのクラウドプラットフォームの資格取得を支援します。
                    実践的なスキル向上とキャリア発展を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">セキュリティ資格</h4>
                  <p className="text-gray-600 text-sm">
                    CISSP、CISM、CompTIA Security+などのセキュリティ資格の取得を支援します。
                    セキュリティ専門性の向上を図ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">プロジェクト管理資格</h4>
                  <p className="text-gray-600 text-sm">
                    PMP、PRINCE2、ITILなどのプロジェクト管理資格の取得を支援します。
                    リーダーシップとマネジメントスキルの向上を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術専門資格</h4>
                  <p className="text-gray-600 text-sm">
                    各技術分野の専門資格取得を支援し、技術的深さの向上を図ります。
                    業界標準のスキルを身につけます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <BookOpenCheck className="w-5 h-5 mr-2" />
                  学習支援制度
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">受験費用支援</h4>
                  <p className="text-gray-600 text-sm">
                    資格試験の受験費用を全額または一部支援し、資格取得の経済的負担を軽減します。
                    個人の成長投資を組織として支援します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">学習時間の確保</h4>
                  <p className="text-gray-600 text-sm">
                    資格取得に向けた学習時間を確保し、業務との両立を支援します。
                    効率的な学習計画の策定をサポートします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">学習グループの形成</h4>
                  <p className="text-gray-600 text-sm">
                    同じ資格を目指すメンバーで学習グループを形成し、相互学習を促進します。
                    モチベーション維持と学習効果向上を図ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">合格報酬制度</h4>
                  <p className="text-gray-600 text-sm">
                    資格取得時の報酬制度により、学習意欲を高め、成果を正当に評価します。
                    継続的なスキル向上を促進します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* キャリア相談 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">キャリア相談</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">キャリア目標設定</CardTitle>
                <CardDescription>
                  個人のキャリアビジョン策定
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    短期・中期・長期目標
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    スキルマップ作成
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    成長計画策定
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">スキル開発計画</CardTitle>
                <CardDescription>
                  技術的成長のロードマップ
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    技術スタック拡張
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    専門分野の深化
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    学習優先順位
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">リーダーシップ開発</CardTitle>
                <CardDescription>
                  マネジメントスキル向上
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    チームマネジメント
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    プロジェクトリード
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    戦略的思考
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