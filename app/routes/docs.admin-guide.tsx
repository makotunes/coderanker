import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  ArrowLeft,
  Settings,
  Users,
  BarChart3,
  Shield,
  Globe,
  CheckCircle,
  Clock,
  Activity,
  FileText,
  Code,
  Trophy,
  Star,
  TrendingUp,
  MessageSquare,
  Target,
  Brain,
  GitBranch,
  Zap,
  Crown,
  Award,
  Calendar,
  UserCheck,
  TrendingDown,
  Lightbulb,
  Briefcase,
  DollarSign,
  ChartLine,
  Users2
} from "lucide-react";

export default function AdminGuideDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-blue-50">
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
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">管理者ガイド</h1>
              <p className="text-gray-600">バイブコーディング時代の成果主義・競争主義マネジメント</p>
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
              <Link to="#management-philosophy" className="block text-indigo-600 hover:text-indigo-800">1. バイブコーディング時代のマネジメント哲学</Link>
              <Link to="#performance-management" className="block text-indigo-600 hover:text-indigo-800">2. 成果主義・競争主義マネジメント</Link>
              <Link to="#operational-practices" className="block text-indigo-600 hover:text-indigo-800">3. 実運用での具体的施策</Link>
              <Link to="#recruitment-strategy" className="block text-indigo-600 hover:text-indigo-800">4. 新規採用戦略（トライアル制度）</Link>
              <Link to="#growth-policy" className="block text-indigo-600 hover:text-indigo-800">5. 成長を後押しする基本方針</Link>
              <Link to="#evaluation-rules" className="block text-indigo-600 hover:text-indigo-800">6. 評価ルール設定</Link>
              <Link to="#performance-analysis" className="block text-indigo-600 hover:text-indigo-800">7. パフォーマンス分析</Link>
              <Link to="#best-practices" className="block text-indigo-600 hover:text-indigo-800">8. ベストプラクティス</Link>
            </div>
          </CardContent>
        </Card>

        {/* 1. バイブコーディング時代のマネジメント哲学 */}
        <section id="management-philosophy" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">1. バイブコーディング時代のマネジメント哲学</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="w-5 h-5 mr-2 text-purple-600" />
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
                    同じプロジェクトに複数の開発者が参加し、実力で競い合うことで、
                    組織全体の技術レベル向上と個人の成長を促進します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-600" />
                  人事担当者へのメッセージ
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
        </section>

        {/* 2. 成果主義・競争主義マネジメント */}
        <section id="performance-management" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. 成果主義・競争主義マネジメント</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  競争主義の導入
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">同一プロジェクトでの競争</h4>
                  <p className="text-gray-600 text-sm">
                    バイブコーディング時代では１人１プロジェクトが想定される以上、
                    同じプロジェクトに複数の開発者が独立して参加し、実力で競い合うこともあり得ます。
                    これにより、一番優秀なプロダクトが生き残り、組織の技術レベルの向上と個人の成長を促進します。
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
                  <h4 className="font-semibold text-gray-900">チーム競争</h4>
                  <p className="text-gray-600 text-sm">
                    個人だけでなく、チーム単位での競争も導入し、
                    協力と競争のバランスを取ります。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 3. 実運用での具体的施策 */}
        <section id="operational-practices" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">3. 実運用での具体的施策</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  毎週の確認・評価
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">週次レビュー</h4>
                  <p className="text-gray-600 text-sm">
                    毎週金曜日に全員の成果を確認し、ランキングを更新します。
                    上位者への称賛と下位者への改善指導を行います。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">1on1ミーティング</h4>
                  <p className="text-gray-600 text-sm">
                    週次評価に基づいて、個人の成長課題と改善計画を
                    具体的に話し合います。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">改善アクション</h4>
                  <p className="text-gray-600 text-sm">
                    評価結果に基づいて、具体的な改善アクションを
                    実行し、次週の成果向上を目指します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  月次表彰制度
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">月間MVP</h4>
                  <p className="text-gray-600 text-sm">
                    月間で最も優秀な成果を上げた開発者を表彰し、
                    特別な報酬や機会を提供します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成長賞</h4>
                  <p className="text-gray-600 text-sm">
                    前月比で最も成長した開発者を表彰し、
                    継続的な改善を奨励します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術革新賞</h4>
                  <p className="text-gray-600 text-sm">
                    革新的な技術的解決策を提案・実装した開発者を表彰し、
                    イノベーションを促進します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Crown className="w-5 h-5 mr-2 text-purple-600" />
                  上位者への特別待遇
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">優先プロジェクトアサイン</h4>
                  <p className="text-gray-600 text-sm">
                    上位者は高難易度・高報酬のプロジェクトを優先的に
                    アサインされ、さらなる成長機会を提供します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">特別研修・資格取得支援</h4>
                  <p className="text-gray-600 text-sm">
                    上位者には最新技術の研修や資格取得を支援し、
                    技術力の更なる向上を図ります。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">メンター制度</h4>
                  <p className="text-gray-600 text-sm">
                    上位者は後輩のメンターとして活動し、
                    リーダーシップスキルの開発機会を提供します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 4. 新規採用戦略（トライアル制度） */}
        <section id="recruitment-strategy" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">4. 新規採用戦略（トライアル制度）</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <UserCheck className="w-5 h-5 mr-2 text-green-600" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-600" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-blue-600" />
                  採用判断プロセス
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">データに基づく判断</h4>
                  <p className="text-gray-600 text-sm">
                    トライアル期間中の具体的な成果データに基づいて
                    採用判断を行い、主観的な印象は排除します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">チーム評価</h4>
                  <p className="text-gray-600 text-sm">
                    プロジェクトメンバーからの評価も参考にし、
                    チームフィットも考慮します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">即座の判断</h4>
                  <p className="text-gray-600 text-sm">
                    トライアル終了後、即座に採用判断を行い、
                    候補者に迅速なフィードバックを提供します。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 5. 成長支援・キャリアアップ制度 */}
        <section id="growth-policy" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. 成長支援・キャリアアップ制度</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                  成長を後押しする基本方針
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">継続的な成長のサポート</h4>
                  <p className="text-gray-600 text-sm">
                    組織の発展と個人の成長を両立させるため、全メンバーが前向きにスキルアップやチャレンジに取り組める環境を目指します。
                    それぞれの成長を応援し、共に高め合う文化を大切にします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">透明性のある基準</h4>
                  <p className="text-gray-600 text-sm">
                    成長やキャリアアップのための基準や目標を明確にし、全員が納得できる
                    透明性のある制度として設計します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">成長機会の提供</h4>
                  <p className="text-gray-600 text-sm">
                    課題が見つかった場合は、前向きな成長の機会と継続的なサポートを提供します。
                    一人ひとりの可能性を最大限に引き出せるよう支援します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingDown className="w-5 h-5 mr-2 text-red-600" />
                  成長サポートの流れ
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">3ヶ月の成長サポート期間</h4>
                  <p className="text-gray-600 text-sm">
                    新たな課題や目標が明確になった場合は、3ヶ月間の成長サポート期間を設け、
                    具体的な目標や計画を一緒に立てて取り組みます。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">週次フォローアップ</h4>
                  <p className="text-gray-600 text-sm">
                    サポート期間中は週次で進捗を確認し、
                    必要に応じて柔軟にサポート内容を調整します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">振り返りと今後の方針</h4>
                  <p className="text-gray-600 text-sm">
                    サポート期間終了後は、客観的なデータや成果をもとに
                    振り返りを行い、今後の成長やキャリアの方向性を一緒に考えます。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users2 className="w-5 h-5 mr-2 text-blue-600" />
                  サポート体制
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">メンター制度</h4>
                  <p className="text-gray-600 text-sm">
                    成長をサポートするため、メンターが個別にアサインされ、
                    具体的なアドバイスやフィードバックを提供します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">研修・トレーニング</h4>
                  <p className="text-gray-600 text-sm">
                    必要なスキルや知識を身につけるための研修やトレーニングを
                    積極的に提供し、成長を後押しします。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">キャリア相談</h4>
                  <p className="text-gray-600 text-sm">
                    一人ひとりの適性や希望に合わせてキャリア相談を行い、
                    今後の方向性を一緒に考えます。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 6. 評価ルール設定 */}
        <section id="evaluation-rules" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. 評価ルール設定</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-red-600" />
                  評価基準
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">技術力評価（40%）</h4>
                  <p className="text-gray-600 text-sm">
                    コード品質、アーキテクチャ設計、パフォーマンス最適化などの
                    技術的側面をAIが自動評価します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">品質評価（30%）</h4>
                  <p className="text-gray-600 text-sm">
                    テストカバレッジ、ドキュメント品質、セキュリティ対応などの
                    品質面を評価します。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">進捗管理評価（30%）</h4>
                  <p className="text-gray-600 text-sm">
                    スケジュール遵守、コミュニケーション、リスク管理などの
                    プロジェクト管理面を評価します。
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="w-5 h-5 mr-2 text-yellow-600" />
                  ポイント計算
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">基本ポイント</h4>
                  <p className="text-gray-600 text-sm">
                    プロジェクトの難易度と規模に基づく基本ポイントを設定します。
                    技術スタックの難易度も考慮してください。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ボーナスポイント</h4>
                  <p className="text-gray-600 text-sm">
                    優秀な成果や特別な貢献に対するボーナスポイントの条件を設定します。
                    透明性を保つため、明確な基準を定めてください。
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">ペナルティ</h4>
                  <p className="text-gray-600 text-sm">
                    品質問題やスケジュール遅延に対するペナルティの条件を設定します。
                    教育的な観点から、改善の機会も提供してください。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* 7. パフォーマンス分析 */}
        <section id="performance-analysis" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">7. パフォーマンス分析</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-600" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
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
        </section>

        {/* 8. ベストプラクティス */}
        <section id="best-practices" className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">8. ベストプラクティス</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <DollarSign className="w-5 h-5 mr-2 text-green-600" />
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
        </section>
      </main>
    </div>
  );
} 