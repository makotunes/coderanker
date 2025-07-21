import { Link } from "@remix-run/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { 
  Building,
  Award,
  Target,
  Brain,
  GitBranch,
  UserCheck,
  ArrowLeft,
  CheckCircle,
  Crown,
  Star,
  TrendingUp,
  Shield,
  FileText,
  PieChart,
  Activity,
  Trophy,
  Lightbulb,
  MessageSquare,
  ArrowRight,
  DollarSign,
  Code,
  Users2,
  BarChart3
} from "lucide-react";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { db } from "~/db/db.server";
import { baseSalaryConfigs, incentiveConfigs, allowanceConfigs } from "~/db/schema";
import { desc } from "drizzle-orm";

export async function loader() {
  // 現在の月を取得（YYYY-MM形式）
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  // 基本給設定の履歴を取得
  const baseSalaryHistory = await db
    .select()
    .from(baseSalaryConfigs)
    .orderBy(desc(baseSalaryConfigs.effectiveMonth), desc(baseSalaryConfigs.createdAt));

  // インセンティブ設定の履歴を取得
  const incentiveHistory = await db
    .select()
    .from(incentiveConfigs)
    .orderBy(desc(incentiveConfigs.effectiveMonth), desc(incentiveConfigs.createdAt));

  // 手当設定の履歴を取得
  const allowanceHistory = await db
    .select()
    .from(allowanceConfigs)
    .orderBy(desc(allowanceConfigs.effectiveMonth), desc(allowanceConfigs.createdAt));

  return json({
    baseSalaryHistory,
    incentiveHistory,
    allowanceHistory,
    currentMonth
  });
}

export default function HREvaluation() {
  const {
    baseSalaryHistory,
    incentiveHistory,
    allowanceHistory,
    currentMonth
  } = useLoaderData<typeof loader>();

  // ロール・ティア一覧
  const roles = ["CORP", "ENGINEER", "DESIGNER", "OPERATOR"];
  const tiers = ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"];
  const employmentTypes = ["Employee", "Contracted"];

  // 現在の基本給テーブルを構築
  const buildBaseSalaryTable = () => {
    const currentConfigs = baseSalaryHistory.filter(config =>
      config.effectiveMonth <= currentMonth
    ).reduce((acc, config) => {
      if (!acc[config.role]) acc[config.role] = {};
      acc[config.role][config.tier] = config.baseSalary;
      return acc;
    }, {} as Record<string, Record<string, number>>);
    return currentConfigs;
  };
  const baseSalaryTable = buildBaseSalaryTable();

  // インセンティブをロールごとに
  type IncentiveConfigType = typeof incentiveHistory[number];
  const incentiveHistoryByRole: Record<string, IncentiveConfigType[]> = {};
  roles.forEach(role => {
    incentiveHistoryByRole[role] = incentiveHistory.filter((c: IncentiveConfigType) => c.role === role);
  });
  const currentIncentiveByRole: Record<string, IncentiveConfigType | null> = {};
  roles.forEach(role => {
    currentIncentiveByRole[role] = incentiveHistoryByRole[role][0] || null;
  });

  // 手当を雇用形態ごとに
  type AllowanceConfigType = typeof allowanceHistory[number];
  const allowanceByType: Record<string, AllowanceConfigType | null> = {};
  employmentTypes.forEach(type => {
    allowanceByType[type] = allowanceHistory.find((c: AllowanceConfigType) => c.employmentType === type) || null;
  });

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
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-gray-900">人事評価制度</h1>
              </div>
            </div>
            <Badge className="bg-green-100 text-green-800">
              <FileText className="w-4 h-4 mr-1" />
              評価制度
            </Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
            <Award className="w-4 h-4 mr-2" />
            人事評価制度
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Code Ranker
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"> 人事評価制度</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            透明で公平な3軸評価システムにより、個人の成長と組織全体の向上を促進します。
            成果に基づく評価で、努力が正当に評価される環境を提供します。
          </p>
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 mb-2">3軸評価</div>
                <div className="text-sm text-green-700">品質・数量・マネージャー評価</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">月次ランキング</div>
                <div className="text-sm text-blue-700">透明な競争文化</div>
              </div>
            </div>
          </div>
        </div>

        {/* 3軸評価システム */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">3軸評価システム</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-800">シニアエンジニア評価</CardTitle>
                <CardDescription className="text-blue-700">成果品質評価（上級者が下級者を評価）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-blue-700">
                <div>• コード品質・設計品質</div>
                <div>• テスト網羅性・技術的深さ</div>
                <div>• シニアエンジニアによる評価</div>
                <div>• 客観的技術指標重視</div>
                <Button variant="link" asChild className="p-0 text-blue-700">
                  <Link to="/docs/senior-evaluation">詳細</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <GitBranch className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-800">コミット評価</CardTitle>
                <CardDescription className="text-green-700">成果量評価（AI自動評価）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-green-700">
                <div>• コミット履歴解析</div>
                <div>• 機能実装量・要件対応度</div>
                <div>• 開発プロセス・継続性</div>
                <div>• AIによる自動評価</div>
                <Button variant="link" asChild className="p-0 text-green-700">
                  <Link to="/docs/commit-evaluation">詳細</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-800">マネージャー評価</CardTitle>
                <CardDescription className="text-purple-700">依頼者評価（マネージャーによる評価）</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-purple-700">
                <div>• 要件定義一致性</div>
                <div>• プロセス品質・ビジネス価値</div>
                <div>• 使いやすさ・実用性</div>
                <div>• マネージャーによる総合評価</div>
                <Button variant="link" asChild className="p-0 text-purple-700">
                  <Link to="/docs/client-evaluation">詳細</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Card className="bg-yellow-50 border-yellow-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">3軸評価の特徴</h4>
                <p className="text-yellow-700">
                  上級者が下級者を評価する階級制度、AI自動評価による客観性、マネージャーによる実務評価を組み合わせた公平で透明な評価システム。
                  <Link to="/docs/evaluation-framework" className="underline ml-2">3軸評価システムの全体像</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 階級制度と役割 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">階級制度と役割</h3>
          
          {/* 階級ティア概要 */}
          <div className="mb-8">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">8段階の階級システム</h4>
                <p className="text-gray-700 text-center mb-4">
                  上級者が下級者を評価する階級制度により、技術力とリーダーシップの両方を重視した成長を促進します。
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T0</div>
                    <div className="font-semibold text-gray-900">トライアウト</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T1-T3</div>
                    <div className="font-semibold text-gray-900">エンジニア</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T4-T5</div>
                    <div className="font-semibold text-gray-900">リーダー</div>
                  </div>
                  <div className="bg-white rounded-lg p-3 border">
                    <div className="text-xs text-gray-500">T6-T7</div>
                    <div className="font-semibold text-gray-900">エキスパート</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 詳細階級 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-gray-200">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Target className="w-6 h-6 text-gray-600" />
                </div>
                <CardTitle className="text-gray-700">T0 トライアウト</CardTitle>
                <CardDescription>入社前の採用選考</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 技術力・適性の確認</div>
                  <div>• バイブコーディング実践</div>
                  <div>• チーム文化への適合性</div>
                  <div>• 3軸評価の事前体験</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">T1 アシスタントエンジニア</CardTitle>
                <CardDescription>評価される側</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 基礎技術の習得</div>
                  <div>• チーム開発への参加</div>
                  <div>• メンタリング受講</div>
                  <div>• 3軸評価の対象</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">T2 ジュニアエンジニア</CardTitle>
                <CardDescription>評価される側</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 基本的な機能実装</div>
                  <div>• テストコード作成</div>
                  <div>• コードレビュー参加</div>
                  <div>• 技術的成長の加速</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">T3 ミドルエンジニア</CardTitle>
                <CardDescription>評価者 + 評価される側</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 複雑な機能設計・実装</div>
                  <div>• ジュニアエンジニアの評価</div>
                  <div>• 技術的決定への参加</div>
                  <div>• プロジェクトリード経験</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-700">T4 シニアエンジニア</CardTitle>
                <CardDescription>評価者 + 評価される側</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• アーキテクチャ設計</div>
                  <div>• ミドルエンジニアの評価</div>
                  <div>• 技術戦略策定</div>
                  <div>• チームマネジメント</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-700">T5 テックリード</CardTitle>
                <CardDescription>評価者 + 評価される側</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• シニアエンジニアの評価</div>
                  <div>• 技術戦略策定</div>
                  <div>• チームマネジメント</div>
                  <div>• 組織的技術決定</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-red-200">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Star className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-700">T6 プリンシパル</CardTitle>
                <CardDescription>評価者 + 評価される側</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• テックリードの評価</div>
                  <div>• 組織技術戦略</div>
                  <div>• 技術的イノベーション</div>
                  <div>• 業界影響力</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-yellow-200">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-700">T7 フェロー</CardTitle>
                <CardDescription>最上位評価者</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 全階級の評価</div>
                  <div>• 組織戦略策定</div>
                  <div>• 技術的権威</div>
                  <div>• 最終評価責任者</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 階級制度の特徴 */}
          <div className="mt-8">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 text-center">階級制度の特徴</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <ArrowRight className="w-4 h-4 text-green-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">上級者が下級者を評価</h5>
                    <p className="text-sm text-gray-600">技術力と経験に基づく公平な評価システム</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">明確な成長パス</h5>
                    <p className="text-sm text-gray-600">各階級で求められるスキルと責任が明確</p>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-4 h-4 text-purple-600" />
                    </div>
                    <h5 className="font-semibold text-gray-900 mb-2">透明な昇格基準</h5>
                    <p className="text-sm text-gray-600">3軸評価による客観的な昇格判断</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 評価基準と指標 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価基準と指標</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <PieChart className="w-5 h-5 mr-2" />
                  定量的指標
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コード品質指標</h4>
                  <p className="text-gray-600 text-sm">
                    テストカバレッジ、コードの複雑度、バグ発生率、パフォーマンス指標など
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">生産性指標</h4>
                  <p className="text-gray-600 text-sm">
                    コミット頻度、実装速度、要件達成率、デプロイ頻度など
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術的指標</h4>
                  <p className="text-gray-600 text-sm">
                    技術的負債の削減、セキュリティ対応、最新技術の採用率など
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ビジネス指標</h4>
                  <p className="text-gray-600 text-sm">
                    ユーザー満足度、機能利用率、収益貢献度、市場競争力など
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Activity className="w-5 h-5 mr-2" />
                  定性的指標
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術的スキル</h4>
                  <p className="text-gray-600 text-sm">
                    問題解決能力、技術的深さ、学習意欲、技術的視野の広さなど
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コミュニケーション</h4>
                  <p className="text-gray-600 text-sm">
                    説明能力、文書化能力、チーム協力、知識共有など
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">リーダーシップ</h4>
                  <p className="text-gray-600 text-sm">
                    自律性、責任感、意思決定能力、メンタリング能力など
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">イノベーション</h4>
                  <p className="text-gray-600 text-sm">
                    創造性、改善提案、新技術導入、プロセス改善など
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 評価プロセス */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価プロセス</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">1. 日常評価</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  コミット毎のAI評価、シニアエンジニアによる技術評価、マネージャーによる週次評価
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <BarChart3 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">2. 月次集計</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  3軸評価の月次集計、階級別ランキング作成、報酬変動計算、改善点の特定
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">3. ランキング発表</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  全員へのランキング公開、階級別順位発表、報酬変動通知、競争意識の向上
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-700">4. フィードバック</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  上級者による1on1、評価結果詳細説明、改善計画策定、次月目標設定
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 週次評価ポイントの算出方法 */}
        <section className="mb-16">
          <div className="max-w-3xl mx-auto">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">週次評価ポイントの算出方法</h3>
              <p className="text-gray-700 text-base text-center mb-2">
                週次評価ポイントは、5つの観点からの個別評価をもとに、<b>公平かつ多面的にスコア化</b>されます。<br />
                これにより、技術力・成果量・業務遂行・貢献度などを総合的に反映します。
              </p>
            </div>
            <div className="grid gap-6">
              {/* 各評価タイプの詳細 */}
              <div className="bg-white border rounded-lg shadow p-5">
                <h4 className="font-semibold text-lg text-blue-800 mb-2">1. 成果物品質評価（quality）</h4>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  <li>シニアエンジニア等によるコード品質・設計品質・テスト網羅性などの技術的評価</li>
                  <li>例：テストカバレッジ、設計の一貫性、レビュー指摘数、AIクロス評価など</li>
                  <li>スコア例：80点（100点満点換算）</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg shadow p-5">
                <h4 className="font-semibold text-lg text-green-800 mb-2">2. 成果量評価（quantity）</h4>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  <li>AI等によるコミット量・実装量・要件対応度の自動評価</li>
                  <li>例：コミット数、追加/削除行数、機能実装数、開発リズムなど</li>
                  <li>ポイント例：120pt</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg shadow p-5">
                <h4 className="font-semibold text-lg text-purple-800 mb-2">3. 依頼者評価（satisfaction）</h4>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  <li>マネージャー等による業務遂行・要件達成・ビジネス価値・使いやすさ等の評価</li>
                  <li>例：要件定義の一致度、プロセス品質、ユーザー満足度、ビジネス貢献度など</li>
                  <li>スコア例：75点</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg shadow p-5">
                <h4 className="font-semibold text-lg text-red-800 mb-2">4. ペナルティ評価（penalty）</h4>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  <li>ルール違反・遅延・品質不備等に対する減点</li>
                  <li>例：納期遅延、レビュー未対応、重大バグ、規律違反など</li>
                  <li>ペナルティ例：-20pt</li>
                </ul>
              </div>
              <div className="bg-white border rounded-lg shadow p-5">
                <h4 className="font-semibold text-lg text-yellow-800 mb-2">5. ボーナス評価（bonus）</h4>
                <ul className="list-disc list-inside text-gray-700 mb-2">
                  <li>特別な貢献・イノベーション・チーム貢献等への加点</li>
                  <li>例：技術的イノベーション、顧客からの高評価、チーム支援、難易度の高い課題解決など</li>
                  <li>ボーナス例：+15pt</li>
                </ul>
              </div>
            </div>
            {/* 算出フロー */}
            <div className="mt-8">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-5 shadow">
                <h4 className="font-bold text-blue-900 mb-2">週次ポイント算出フロー</h4>
                <ol className="list-decimal list-inside text-gray-800 mb-2">
                  <li><b>基本ポイントの合計</b>：<br />
                    <span className="ml-2">成果物品質スコア × 成果量ポイント × 依頼者評価スコア</span><br />
                    <span className="ml-2 text-xs text-gray-500">（例：80 × 120 × 75 = 720,000pt）</span>
                  </li>
                  <li className="mt-2"><b>ロールごとの調整</b>：<br />
                    <span className="ml-2">職種や役割ごとに定められた調整率（例：エンジニアは100%、デザイナーは90%など）を掛けて調整後ポイントを算出</span><br />
                    <span className="ml-2 text-xs text-gray-500">（例：720,000pt × 100% = 720,000pt）</span>
                  </li>
                  <li className="mt-2"><b>ペナルティ・ボーナスの加減算</b>：<br />
                    <span className="ml-2">ペナルティポイントを減点、ボーナスポイントを加点</span><br />
                    <span className="ml-2 text-xs text-gray-500">（例：720,000pt - 20pt + 15pt = 719,995pt）</span>
                  </li>
                </ol>
                <div className="mt-2 text-sm text-gray-700">
                  この最終ポイントが、ランキングやインセンティブ（報酬変動）の基礎となります。
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ランキング制度 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">ランキング制度</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Trophy className="w-5 h-5 mr-2" />
                  階級別ランキング
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">階級内競争</h4>
                  <p className="text-gray-600 text-sm">
                    同じ階級内でのランキングを実施し、公平な競争環境を構築します。
                    ジュニアエンジニア、シニアエンジニア、テックリード別にランキングを発表します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3軸総合スコア</h4>
                  <p className="text-gray-600 text-sm">
                    シニアエンジニア評価（40%）、コミット評価（30%）、マネージャー評価（30%）の重み付けで総合スコアを算出します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">月次更新</h4>
                  <p className="text-gray-600 text-sm">
                    毎月1日に前月の評価結果に基づいてランキングを更新し、全員に公開します。
                    即座に報酬に反映される透明なシステムです。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">昇格制度</h4>
                  <p className="text-gray-600 text-sm">
                    上位10%のメンバーは昇格候補となり、継続的な優秀な成績により階級アップが可能です。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  報酬変動システム
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ベースライン保証</h4>
                  <p className="text-gray-600 text-sm">
                    階級に応じた一定のベースライン報酬を保証し、最低限の生活水準を確保します。
                    安定性と競争性のバランスを取ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">変動報酬</h4>
                  <p className="text-gray-600 text-sm">
                    ランキング順位に応じて報酬が変動し、上位者は最大+20%、下位者は最大-10%の変動幅があります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">即座の反映</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果は翌月の給与に即座に反映され、努力と成果の因果関係を明確にします。
                    遅延や曖昧さを排除します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性</h4>
                  <p className="text-gray-600 text-sm">
                    報酬計算方法を明確にし、誰でも自分の報酬がどのように決まるかを理解できます。
                    不公平感を排除します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* フィードバック制度 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">フィードバック制度</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">上級者による1on1</CardTitle>
                <CardDescription>
                  月1回の定期的な面談
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    評価結果の詳細説明
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    改善点の具体的指摘
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    次月目標の設定
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trophy className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">ランキング公開</CardTitle>
                <CardDescription>
                  透明な競争文化の構築
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    階級別順位の発表
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    報酬変動の通知
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    競争意識の向上
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lightbulb className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">改善計画策定</CardTitle>
                <CardDescription>
                  継続的な改善の促進
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    具体的な改善目標
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    上級者からの支援
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    進捗の定期確認
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* キャリアパス */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">キャリアパス</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">ジュニアエンジニア</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 基礎技術の習得</div>
                  <div>• チーム開発への参加</div>
                  <div>• メンタリング受講</div>
                  <div>• 段階的な責任委譲</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users2 className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">シニアエンジニア</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• プロジェクトリード</div>
                  <div>• 技術的決定権</div>
                  <div>• メンタリング実施</div>
                  <div>• アーキテクチャ設計</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">テックリード</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• 技術戦略策定</div>
                  <div>• チームマネジメント</div>
                  <div>• 技術的ガイダンス</div>
                  <div>• 組織的影響力</div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-indigo-200">
              <CardHeader>
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-indigo-700">アーキテクト</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div>• システム設計</div>
                  <div>• 技術標準策定</div>
                  <div>• 組織的技術戦略</div>
                  <div>• 外部技術連携</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 報酬体系 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">報酬体系</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <DollarSign className="w-5 h-5 mr-2" />
                  階級別基本給与
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">階級ベース給与</h4>
                  <p className="text-gray-600 text-sm">
                    ジュニアエンジニア、シニアエンジニア、テックリード、マネージャーの階級に応じた基本給与を設定します。
                    階級ごとに明確な給与帯を設定し、昇格による給与アップを実現します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">市場競争力</h4>
                  <p className="text-gray-600 text-sm">
                    定期的な市場調査により、各階級で競争力のある給与水準を維持します。
                    優秀な人材の確保と定着を図ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">昇格による昇給</h4>
                  <p className="text-gray-600 text-sm">
                    ランキング上位者による昇格により、基本給与が大幅にアップします。
                    継続的な努力と成果に対する明確な報酬を提供します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  月次変動報酬
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ランキング変動</h4>
                  <p className="text-gray-600 text-sm">
                    インセンティブレンジは、月次ランキングや評価スコアに応じて、ロールごとの規定のレンジで変動します。
                    この変動幅は翌月の給与に即時反映され、個人の成果や貢献度がダイレクトに報酬へ反映される仕組みです。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3軸評価連動</h4>
                  <p className="text-gray-600 text-sm">
                    成果物品質評価、成果量評価、依頼者評価の総合スコアが直接報酬に反映されます。
                    評価と報酬の因果関係を明確にします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性の確保</h4>
                  <p className="text-gray-600 text-sm">
                    報酬計算方法を全員に公開し、誰でも自分の報酬がどのように決まるかを理解できます。
                    不公平感を排除し、信頼関係を構築します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 現在の給与制度セクション */}
        <section className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">現在の給与制度</h3>
          <div className="text-center text-sm text-gray-600 mb-4">
            ※下記の金額は物価・業績・会社方針等により随時見直し・変更される場合があります。
          </div>
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">基本給テーブル（{currentMonth}時点）</h4>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[600px] border-collapse border border-gray-300 text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-left">ロール</th>
                    {tiers.map(tier => (
                      <th key={tier} className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">{tier}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {roles.map((role, index) => (
                    <tr key={role} className={index % 2 === 0 ? "" : "bg-gray-50"}>
                      <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 font-medium">{role}</td>
                      {tiers.map(tier => {
                        const salary = baseSalaryTable[role]?.[tier];
                        return (
                          <td key={tier} className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">
                            {salary ? `৳${salary.toLocaleString()}` : "-"}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">インセンティブレンジ</h4>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[400px] border-collapse border border-gray-300 text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-left">ロール</th>
                    <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">最小</th>
                    <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">最大</th>
                  </tr>
                </thead>
                <tbody>
                  {roles.map(role => {
                    const incentive = currentIncentiveByRole[role];
                    return (
                      <tr key={role}>
                        <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 font-medium">{role}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">{incentive ? `৳${incentive.minIncentive.toLocaleString()}` : "-"}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">{incentive ? `৳${incentive.maxIncentive.toLocaleString()}` : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="mb-8">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">手当</h4>
            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[300px] border-collapse border border-gray-300 text-xs sm:text-sm">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-left">雇用形態</th>
                    <th className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">手当（タカ）</th>
                  </tr>
                </thead>
                <tbody>
                  {employmentTypes.map(type => {
                    const allowance = allowanceByType[type];
                    return (
                      <tr key={type}>
                        <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 font-medium">{type}</td>
                        <td className="border border-gray-300 px-2 sm:px-3 py-1 sm:py-2 text-center">{allowance ? `৳${allowance.allowance.toLocaleString()}` : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

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