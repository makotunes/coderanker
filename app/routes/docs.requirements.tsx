import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  ArrowLeft,
  FileText,
  Target,
  Users,
  Settings,
  Code,
  Brain,
  GitBranch,
  Trophy,
  Shield,
  Globe,
  TrendingUp,
  CheckCircle,
  Clock,
  Zap,
  Database,
  Rocket,
  Crown,
  Briefcase,
  Activity,
  X,
  Building,
  Award,
  UserCheck
} from "lucide-react";

export default function RequirementsDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヘッダー */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/docs">
              <ArrowLeft className="w-4 h-4 mr-2" />
              ドキュメント一覧に戻る
            </Link>
          </Button>
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">プロジェクト要件定義ガイド</h1>
              <p className="text-gray-600">マネージャー・プロジェクトオーナー向け要件定義作成ガイドライン</p>
            </div>
          </div>
        </div>

        {/* 目次 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>目次</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Link to="#background" className="block text-blue-600 hover:text-blue-800">1. 要件定義の重要性</Link>
              <Link to="#system-overview" className="block text-blue-600 hover:text-blue-800">2. 要件定義の基本原則</Link>
              <Link to="#user-roles" className="block text-blue-600 hover:text-blue-800">3. 要件定義の構成要素</Link>
              <Link to="#evaluation-flow" className="block text-blue-600 hover:text-blue-800">4. 要件定義の作成手順</Link>
              <Link to="#technical-specs" className="block text-blue-600 hover:text-blue-800">5. ベストプラクティス</Link>
            </div>
          </CardContent>
        </Card>

        {/* 1. 要件定義の重要性 */}
        <section id="background" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. 要件定義の重要性</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-blue-600" />
                  なぜ要件定義が重要か
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">評価の基盤</h4>
                  <p className="text-gray-600">
                    曖昧な要件定義では開発者を適切に評価できません。
                    明確で具体的な要件が、公平で客観的な評価の基盤となります。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">開発効率の向上</h4>
                  <p className="text-gray-600">
                    正確な要件定義により、開発者は迷いなく開発に集中できます。
                    バイブコーディングツールも要件を基に効率的にコード生成を行います。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">成果物の品質保証</h4>
                  <p className="text-gray-600">
                    明確な要件に基づいて開発された成果物は、
                    期待通りの機能と品質を提供できます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-green-600" />
                  AIアシストの活用
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">自動見積もり算出</h4>
                  <p className="text-gray-600">
                    見積もりはAIが実際の進捗を見て自動で算出します。
                    マネージャーは手動での見積もり作業が不要です。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">要件定義ガイド</h4>
                  <p className="text-gray-600">
                    AIが要件定義の作成をサポートし、適切なリクエストが
                    できるようナビゲーションします。
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">管理作業の簡素化</h4>
                  <p className="text-gray-600">
                    マネージャーは管理をする必要がありません。
                    要件定義と成果物検収に集中できます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 2. 要件定義の基本原則 */}
        <section id="system-overview" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. 要件定義の基本原則</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
                  明確性の原則
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>具体的な機能要件</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>測定可能な成果物</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>明確な受け入れ条件</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>技術的制約の明示</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>優先度の設定</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <GitBranch className="w-5 h-5 mr-2 text-orange-600" />
                  柔軟性の原則
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>過度な制約を避ける</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>実装方法の自由度</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>段階的な詳細化</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>フィードバックの反映</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. 要件定義の構成要素 */}
        <section id="user-roles" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. 要件定義の構成要素</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-center">機能要件</CardTitle>
                <CardDescription className="text-center">
                  システムが提供する機能の詳細
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>機能リスト</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>入力・出力仕様</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>画面遷移</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>エラーハンドリング</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-center">非機能要件</CardTitle>
                <CardDescription className="text-center">
                  性能・品質・制約条件
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>パフォーマンス</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>セキュリティ</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>可用性</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>保守性</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-center">成果物定義</CardTitle>
                <CardDescription className="text-center">
                  期待される成果物の詳細
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>成果物リスト</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>品質基準</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>受け入れ条件</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    <span>検収方法</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. 要件定義の作成手順 */}
        <section id="evaluation-flow" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. 要件定義の作成手順</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">プロジェクト概要の定義</h4>
                    <p className="text-gray-600">プロジェクトの目的、背景、期待される効果を明確に定義します</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-green-600">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">機能要件の詳細化</h4>
                    <p className="text-gray-600">機能リストを作成し、各機能の詳細仕様を定義します。バイブコーディングの基盤となります</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-purple-600">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">非機能要件の設定</h4>
                    <p className="text-gray-600">性能、セキュリティ、可用性などの非機能要件を設定します</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-orange-600">4</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">成果物定義</h4>
                    <p className="text-gray-600">期待される成果物、品質基準、受け入れ条件を具体的に定義します</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-red-600">5</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">AIによる検証</h4>
                    <p className="text-gray-600">AIが要件定義の妥当性を検証し、改善提案を行います</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 5. ベストプラクティス */}
        <section id="technical-specs" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. ベストプラクティス</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                  良い要件定義
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">具体的で測定可能な成果物を定義する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">機能リストは正確で網羅的に作成する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">受け入れ条件を明確に定義する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">優先度を設定して段階的実装を可能にする</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">AIのナビゲーションに従って改善する</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <X className="w-5 h-5 mr-2 text-red-600" />
                  避けるべき点
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                    <span className="text-sm">曖昧で抽象的な表現を使用する</span>
                  </div>
                  <div className="flex items-start">
                    <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                    <span className="text-sm">過度な制約や実装詳細を指定する</span>
                  </div>
                  <div className="flex items-start">
                    <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                    <span className="text-sm">見積もりを事前に固定する</span>
                  </div>
                  <div className="flex items-start">
                    <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                    <span className="text-sm">開発者の創造性を制限する</span>
                  </div>
                  <div className="flex items-start">
                    <X className="w-4 h-4 text-red-500 mr-2 mt-0.5" />
                    <span className="text-sm">管理作業に時間を費やす</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
} 