import { Link } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Building,
  Heart,
  Target,
  Users,
  MessageSquare,
  Lightbulb,
  ArrowLeft,
  CheckCircle,
  Clock,
  Zap,
  Crown,
  Star,
  TrendingUp,
  Shield,
  Globe,
  Award,
  BookOpen,
  Code,
  Brain,
  Users2,
  Calendar,
  BarChart3,
  Settings,
  Compass,
  DollarSign
} from "lucide-react";

export default function OrganizationalCulture() {
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
                  <Building className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">組織文化ガイド</h1>
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
            <Heart className="w-4 h-4 mr-2" />
            組織哲学
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> 組織文化の例</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            組織哲学、働き方、コミュニケーション方針、そして価値観の共有のベストプラクティスについて詳しく説明します。
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 mb-2">Human In AI</div>
                <div className="text-sm text-purple-700">人間中心のAI活用</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">1 Project 1 Person</div>
                <div className="text-sm text-indigo-700">1プロジェクト1担当者</div>
              </div>
            </div>
          </div>
        </div>

        {/* 組織哲学 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">組織哲学</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Target className="w-5 h-5 mr-2" />
                  3軸評価による管理
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成果品質評価</h4>
                  <p className="text-gray-600 text-sm">
                    シニアエンジニアによるコード品質、テスト網羅性、技術的深さ、設計品質の評価。
                    測定可能で客観的な指標による評価を実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成果量評価</h4>
                  <p className="text-gray-600 text-sm">
                    コミット履歴解析による機能実装量、要件対応度、開発プロセスの評価。
                    定量的な指標で成果を測定します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">依頼者評価</h4>
                  <p className="text-gray-600 text-sm">
                    マネージャー・プロジェクトオーナーによる要件定義一致性、プロセス品質、ビジネス価値の評価。
                    実務的な価値に基づく評価を実施します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性の確保</h4>
                  <p className="text-gray-600 text-sm">
                    評価基準を明確化し、全員が同じ指標で評価される公平な制度を実現します。
                    評価結果は月次で公開され、競争を促進します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  競争的組織文化
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">フラットな競争環境</h4>
                  <p className="text-gray-600 text-sm">
                    階層を越えたフラットな競争環境を構築し、個人の能力と成果で評価されます。
                    年功序列ではなく、実力主義を徹底します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">月次報酬変動</h4>
                  <p className="text-gray-600 text-sm">
                    階級別の基本給に加え、月次の評価結果に応じて報酬が変動します。
                    継続的な努力と成果向上を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ランキング共有</h4>
                  <p className="text-gray-600 text-sm">
                    月次でランキングを共有し、透明性を保ちながら競争意識を高めます。
                    個人の成長と組織全体の向上を同時に実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">シンプルな指標</h4>
                  <p className="text-gray-600 text-sm">
                    抽象的で評価できない要素は排除し、測定可能で明確な指標のみで評価します。
                    複雑な評価基準ではなく、分かりやすい指標を重視します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 働き方の哲学 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">働き方の哲学</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">3軸評価</CardTitle>
                <CardDescription>
                  成果品質・成果量・依頼者評価
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    シニアエンジニア評価
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    コミット評価
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    マネージャー評価
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">競争環境</CardTitle>
                <CardDescription>
                  フラットな競争文化
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    月次ランキング
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    報酬変動
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    実力主義
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">効率重視</CardTitle>
                <CardDescription>
                  バイブコーディング活用
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    AI支援開発
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    自動化推進
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    成果最大化
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 評価・報酬体系 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価・報酬体系</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  評価システム
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">月次評価</h4>
                  <p className="text-gray-600 text-sm">
                    毎月3軸評価を実施し、成果品質・成果量・依頼者評価を総合的に測定します。
                    評価結果は全員に公開され、透明性を確保します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ランキング制度</h4>
                  <p className="text-gray-600 text-sm">
                    月次でランキングを発表し、個人の順位と評価スコアを明示します。
                    競争意識を高め、継続的な改善を促進します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">客観的指標</h4>
                  <p className="text-gray-600 text-sm">
                    主観的な評価を排除し、測定可能で客観的な指標のみで評価します。
                    評価基準は明確で、誰でも理解できる形で提示します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">即座の反映</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果は即座に報酬に反映され、努力と成果が直接的に報われる仕組みを構築します。
                    遅延や曖昧さを排除します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <DollarSign className="w-5 h-5 mr-2" />
                  報酬制度
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ベースライン保証</h4>
                  <p className="text-gray-600 text-sm">
                    階級に応じて、一定のベースライン報酬を保証し、最低限の生活水準を確保します。
                    安定性と競争性のバランスを取ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">変動報酬</h4>
                  <p className="text-gray-600 text-sm">
                    月次の評価結果に応じて報酬が変動し、成果に応じた適切な報酬を提供します。
                    努力と成果が直接的に報われる仕組みです。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性</h4>
                  <p className="text-gray-600 text-sm">
                    報酬計算方法を明確にし、誰でも自分の報酬がどのように決まるかを理解できます。
                    不公平感を排除します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">即座の反映</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果は翌月の報酬に即座に反映され、遅延や曖昧さを排除します。
                    努力と成果の因果関係を明確にします。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 組織の特徴 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">組織の特徴</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <Target className="w-5 h-5 mr-2" />
                  測定可能な評価
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  抽象的で評価できない要素は排除し、測定可能で明確な指標のみで評価します。
                  誰でも理解できる客観的な基準を採用します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  競争促進
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  月次ランキングと報酬変動により競争意識を高め、継続的な改善を促進します。
                  個人の成長と組織全体の向上を同時に実現します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-700">
                  <Zap className="w-5 h-5 mr-2" />
                  効率重視
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  バイブコーディングとAI支援により開発効率を最大化し、成果を重視します。
                  時間ではなく成果で評価する文化を構築します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  透明性
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  評価基準と結果を全員に公開し、透明性を確保します。
                  不公平感を排除し、信頼関係を構築します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <CardTitle className="flex items-center text-yellow-700">
                  <DollarSign className="w-5 h-5 mr-2" />
                  即座の反映
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  評価結果は翌月の報酬に即座に反映され、努力と成果の因果関係を明確にします。
                  遅延や曖昧さを排除します。
                </p>
              </CardContent>
            </Card>

            <Card className="border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center text-red-700">
                  <Users className="w-5 h-5 mr-2" />
                  フラットな構造
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  階層を越えたフラットな競争環境を構築し、個人の能力と成果で評価されます。
                  年功序列ではなく、実力主義を徹底します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 関連ページへのリンク */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">関連ガイドライン</h3>
          <div className="flex flex-wrap justify-center gap-4">
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