import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import Footer from "~/components/footer";
import { 
  FileText,
  Settings,
  Code,
  Brain,
  GitBranch,
  ArrowRight,
  CheckCircle,
  Crown,
  Target,
  Star,
  Award,
  Lightbulb,
  UserCheck,
  AlertTriangle
} from "lucide-react";

export default function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* メインコンテンツ */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Settings className="w-4 h-4 mr-2" />
            運用ベストプラクティス
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            エンジニア評価システム
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> 運用のベストプラクティス集</span>
          </h2>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            このシステムを導入する組織が、最大限の効果を発揮するための運用ノウハウや推奨プロセスをまとめています。<br />
            「どのように評価制度を設計し、現場に根付かせるか」「どんな文化やルールが定着しやすいか」など、実践的なベストプラクティスを紹介します。
          </p>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <div className="flex items-center justify-center space-x-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 mb-2">公平・透明な評価運用</div>
                <div className="text-sm text-blue-700">客観性・納得感を重視</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600 mb-2">継続的な改善</div>
                <div className="text-sm text-indigo-700">フィードバックと運用改善</div>
              </div>
            </div>
          </div>
        </div>

        {/* ベストプラクティスの提案 */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">運用のベストプラクティス例</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-700">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  評価制度の現場定着
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">導入初期はシンプルに</h4>
                  <p className="text-gray-600 text-sm">
                    最初は評価項目やルールを絞り、現場で運用しやすい形から始めましょう。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">定期的な説明会・Q&A</h4>
                  <p className="text-gray-600 text-sm">
                    評価制度の目的や運用方法を定期的に説明し、現場の疑問や不安を解消します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">フィードバック文化の醸成</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果や運用に対するフィードバックを積極的に集め、制度改善に活かしましょう。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  公平性・透明性の担保
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">評価基準の明文化</h4>
                  <p className="text-gray-600 text-sm">
                    何をどう評価するかを明文化し、全員が納得できる基準を共有しましょう。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">評価プロセスの可視化</h4>
                  <p className="text-gray-600 text-sm">
                    評価の流れやスコア算出方法を公開し、ブラックボックス化を防ぎます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">第三者チェックの導入</h4>
                  <p className="text-gray-600 text-sm">
                    必要に応じて第三者によるレビューや監査を取り入れ、公平性を高めましょう。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 既存の詳細ページリンク（ガイドライン等）はそのまま */}
        <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">詳細ガイドライン・制度</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle>組織文化ベストプラクティス</CardTitle>
              <CardDescription>
                3軸評価システムを基盤とした組織文化
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• 3軸評価による管理</div>
                <div>• 競争的組織文化</div>
                <div>• 成果主義の徹底</div>
                <div>• 透明性の確保</div>
                <div>• 個人主義の重視</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/organizational-culture">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                <Award className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle>人事評価制度</CardTitle>
              <CardDescription>
                3軸評価システムと階級制度の詳細
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• 3軸評価システム</div>
                <div>• 8段階階級制度</div>
                <div>• 月次ランキング・報酬変動</div>
                <div>• 上級者による下級者評価</div>
                <div>• 透明な競争文化</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/hr-evaluation">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <CardTitle>AI活用ガイドライン</CardTitle>
              <CardDescription>
                バイブコーディングと階級別AI活用方針
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• バイブコーディング</div>
                <div>• 階級別AI活用レベル</div>
                <div>• プロンプトエンジニアリング</div>
                <div>• 人間中心のAI活用</div>
                <div>• 3軸評価対応</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/ai-guidelines">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                <Code className="w-6 h-6 text-orange-600" />
              </div>
              <CardTitle>開発プロセス</CardTitle>
              <CardDescription>
                3軸評価対応のバイブコーディング開発フロー
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• 3軸評価対応フロー</div>
                <div>• バイブコーディング活用</div>
                <div>• 時間軸と評価の流れ</div>
                <div>• 週次・月次評価プロセス</div>
                <div>• 標準化された開発手法</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/development-process">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

                    <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-teal-200 transition-colors">
                <Settings className="w-6 h-6 text-teal-600" />
              </div>
              <CardTitle>評価オペレーション運営</CardTitle>
              <CardDescription>
                HR担当者向け評価システム運営ガイド
              </CardDescription>
            </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 成果主義・競争主義マネジメント</div>
                  <div>• データドリブン評価</div>
                  <div>• 個人競争原理</div>
                  <div>• 人事委員会制度</div>
                  <div>• 成長支援システム</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/team-management">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>


          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-200 transition-colors">
                <Code className="w-6 h-6 text-emerald-600" />
              </div>
              <CardTitle>理想のバイブコーディング指針</CardTitle>
              <CardDescription>
                AI時代の効率的な開発手法・実践指針
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• AI協調開発のベストプラクティス</div>
                <div>• 効率的なプロンプト設計</div>
                <div>• 問題解決アプローチ</div>
                <div>• 開発プロセスの特徴</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/ideal-vibe-coding">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 既存の詳細ページ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">評価者ガイドライン</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                  <Target className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle>3軸評価システム</CardTitle>
                <CardDescription>
                  成果物品質・成果量・マネージャー評価の詳細
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 3軸評価の概要</div>
                  <div>• 評価フロー</div>
                  <div>• スコア計算方法</div>
                  <div>• メリットと特徴</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/evaluation-framework">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                  <Crown className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle>シニアエンジニア評価</CardTitle>
                <CardDescription>
                  シニアエンジニア向け評価ガイド
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• シニア評価基準</div>
                  <div>• 技術的深さ</div>
                  <div>• リーダーシップ</div>
                  <div>• メンタリング</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/senior-evaluation">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-200 transition-colors">
                  <GitBranch className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle>コミット評価ガイド</CardTitle>
                <CardDescription>
                  コミット履歴解析による成果量評価
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• コミット履歴解析</div>
                  <div>• 差分分析手法</div>
                  <div>• 評価プロンプト例</div>
                  <div>• 運用ガイドライン</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/commit-evaluation">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-200 transition-colors">
                  <UserCheck className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>マネージャー評価ガイド</CardTitle>
                <CardDescription>
                  マネージャー・プロジェクトオーナー向け評価
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 評価の核心</div>
                  <div>• 段階的評価プロセス</div>
                  <div>• 評価項目の設計</div>
                  <div>• 運用上の配慮</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/client-evaluation">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-yellow-200 transition-colors">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle>ボーナス評価ガイドライン</CardTitle>
              <CardDescription>
                組織貢献・模範行動・特別な価値創出の評価基準
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• ボーナスポイントの目安</div>
                <div>• 具体的な評価例</div>
                <div>• 継続的な貢献の評価</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/bonus-guidelines">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardHeader>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-red-200 transition-colors">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle>ペナルティ評価ガイドライン</CardTitle>
              <CardDescription>
                重大性ランク・具体例・ポイント・レート目安
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-gray-600 space-y-2">
                <div>• 重大性ランクと具体例</div>
                <div>• ペナルティポイント・レートの目安</div>
                <div>• 不正行為の強調</div>
              </div>
              <Button variant="outline" className="w-full" asChild>
                <Link to="/docs/penalty-guidelines">
                  詳細を見る
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>


            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-200 transition-colors">
                  <FileText className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle>要件定義ガイド</CardTitle>
                <CardDescription>
                  プロジェクト要件定義の作成ガイド
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 要件定義の重要性</div>
                  <div>• 基本原則</div>
                  <div>• 構成要素</div>
                  <div>• ベストプラクティス</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/requirements">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
{/* 
            <Card className="group hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <BookOpen className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle>ユーザーガイド</CardTitle>
                <CardDescription>
                  各ユーザーロール別の操作手順
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600 space-y-2">
                  <div>• 依頼者ガイド</div>
                  <div>• 開発者ガイド</div>
                  <div>• 管理者ガイド</div>
                  <div>• ベストプラクティス</div>
                </div>
                <Button variant="outline" className="w-full" asChild>
                  <Link to="/docs/user-guide">
                    詳細を見る
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card> */}
          </div>
        </div>

        {/* 3軸評価システム */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">3軸評価システム</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="text-center border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">シニアエンジニア評価</CardTitle>
                <CardDescription>
                  成果品質評価
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    コード品質
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    テスト網羅性
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    技術的深さ
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-blue-500 mr-2" />
                    設計品質
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700">マネージャー評価</CardTitle>
                <CardDescription>
                  依頼者評価
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    要件定義一致性
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    プロセス品質
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    ビジネス価値
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                    使いやすさ
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700">コミット評価</CardTitle>
                <CardDescription>
                  成果量評価
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    機能実装量
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    要件対応度
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    開発プロセス
                  </div>
                  <div className="flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-purple-500 mr-2" />
                    継続性・効率性
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="mt-8 text-center">
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-blue-800 mb-2">3軸評価システムの特徴</h4>
                <p className="text-blue-700">
                  成果物品質・成果量・マネージャー評価の3軸から多角的に評価し、
                  AI時代のエンジニアの真の価値を公平かつ透明に測定します。
                  各軸の重み付けにより、総合的な評価を実現します。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* エンジニア向けメッセージ */}
        <div className="mb-16">
          <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">エンジニアの皆様へ</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center text-indigo-700">
                  <Star className="w-5 h-5 mr-2" />
                  私たちが提供する価値
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術的成長の機会</h4>
                  <p className="text-gray-600 text-sm">
                    最新技術に触れ、実践的なスキルを身につけることができる環境
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">公平な評価制度</h4>
                  <p className="text-gray-600 text-sm">
                    成果に基づく透明で公平な評価で、努力が正当に評価される
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">バイブコーディング環境</h4>
                  <p className="text-gray-600 text-sm">
                    AIを活用した効率的な開発手法で、生産性と創造性を最大化
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">競争的カルチャー</h4>
                  <p className="text-gray-600 text-sm">
                    毎月のランキング共有により、個人の成長と組織全体の向上を促進
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <CardTitle className="flex items-center text-green-700">
                  <Lightbulb className="w-5 h-5 mr-2" />
                  期待するエンジニア像
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術への情熱</h4>
                  <p className="text-gray-600 text-sm">
                    新しい技術を学ぶことに貪欲で、常に自己研鑽を怠らない方
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">問題解決能力</h4>
                  <p className="text-gray-600 text-sm">
                    複雑な課題に対して論理的にアプローチし、創造的な解決策を提案できる方
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">自律性と責任感</h4>
                  <p className="text-gray-600 text-sm">
                    個人の責任範囲で自律的に判断し、成果を追求できる方
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">コミュニケーション力</h4>
                  <p className="text-gray-600 text-sm">
                    技術的な内容を分かりやすく説明し、効果的なコミュニケーションができる方
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold mb-4">今すぐ無料でエンジニア評価を始めよう</h3>
              <p className="text-xl mb-8 opacity-90">
                エンジニアの実力を可視化し、公平な評価を体験しましょう。<br />
                評価スクリプトをCI/CDに導入するだけで、すぐに始められます。
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/register">
                    無料で評価を始める
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-white hover:bg-white hover:text-blue-600" asChild>
                  <Link to="/docs">導入ガイドを見る</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* フッター */}
      <Footer/>

    </div>
  );
} 