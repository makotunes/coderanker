import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { 
  ArrowLeft,
  BookOpen,
  User,
  Code,
  Settings,
  CheckCircle,
  Clock,
  Zap,
  Target,
  TrendingUp,
  MessageSquare,
  FileText,
  GitBranch,
  Brain,
  Trophy,
  Star,
  BarChart3,
  Users,
  Briefcase,
  Activity
} from "lucide-react";

export default function UserGuideDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ユーザーガイド</h1>
              <p className="text-gray-600">各ユーザーロール別の操作手順とベストプラクティス</p>
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
                <Link to="#requester-guide" className="block text-green-600 hover:text-green-800">1. 依頼者ガイド</Link>
                <Link to="#developer-guide" className="block text-green-600 hover:text-green-800">2. 開発者ガイド</Link>
                <Link to="#manager-guide" className="block text-green-600 hover:text-green-800">3. 管理者ガイド</Link>
                <Link to="#best-practices" className="block text-green-600 hover:text-green-800">4. ベストプラクティス</Link>
                <Link to="#faq" className="block text-green-600 hover:text-green-800">5. よくある質問</Link>
              </div>
            </CardContent>
          </Card>

          {/* 1. 依頼者ガイド */}
          <section id="requester-guide" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">1. 依頼者ガイド</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-600" />
                    プロジェクト作成
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">1. 要件定義</h4>
                    <p className="text-gray-600 text-sm">
                      プロジェクトの目的、機能要件、技術要件、期間、難易度を明確に定義します。
                      AIが理解しやすい形式で記述することが重要です。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">2. 成果物定義</h4>
                    <p className="text-gray-600 text-sm">
                      期待する成果物、品質基準、受け入れ条件を具体的に定義します。
                      定量化可能な指標を含めることで評価精度が向上します。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">3. システム登録</h4>
                    <p className="text-gray-600 text-sm">
                      定義した要件をシステムに登録し、AIによる初期評価を受けます。
                      評価結果に基づいて要件の調整を行います。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2 text-green-600" />
                    プロジェクト管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">AIナビゲーション</h4>
                    <p className="text-gray-600 text-sm">
                      システムが適切なタイミングで必要な行動をナビゲーションします。
                      マネジメントスキルが不要で、AIがサポートします。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">週次評価の実施</h4>
                    <p className="text-gray-600 text-sm">
                      週次の成果に対する評価を原則必須として実施します。
                      最終成果物だけでなく、継続的な進捗評価により品質を保証します。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">難易度とポイント</h4>
                    <p className="text-gray-600 text-sm">
                      難易度が高いプロジェクトは、成功時のポイント獲得率が高くなります。
                      予算ではなく難易度を基準とした評価システムにより、技術的挑戦を促進します。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">成果物検収</h4>
                    <p className="text-gray-600 text-sm">
                      プロジェクト完了時に成果物を検収し、最終評価を実施します。
                      AI評価と手動評価を組み合わせて総合的な評価を行います。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 2. 開発者ガイド */}
          <section id="developer-guide" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">2. 開発者ガイド</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2 text-green-600" />
                    案件参加
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">1. 案件検索</h4>
                    <p className="text-gray-600 text-sm">
                      自分のスキルと興味に合った案件を検索します。
                      技術スタック、難易度、期間、ポイントでフィルタリングできます。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">2. 即座に参加</h4>
                    <p className="text-gray-600 text-sm">
                      応募や選考プロセスはありません。早いもの勝ちの原則で、
                      興味のある案件に即座に参加できます。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">3. 競争開発</h4>
                    <p className="text-gray-600 text-sm">
                      場合によっては、1つのプロジェクトを複数の開発者が独立して開発し、
                      競い合うことも可能です。失敗しても代替可能なため、積極的な挑戦を推奨します。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <GitBranch className="w-5 h-5 mr-2 text-purple-600" />
                    開発実行
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">CI/CD設定</h4>
                    <p className="text-gray-600 text-sm">
                      プロジェクトにGitHub Actionsを設定し、自動テストとデプロイを有効にします。
                      コード品質メトリクスが自動的に収集されます。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">開発進捗</h4>
                    <p className="text-gray-600 text-sm">
                      定期的にコミットし、プルリクエストを作成します。
                      コードレビューとテスト結果が自動的に評価されます。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">品質管理</h4>
                    <p className="text-gray-600 text-sm">
                      テストカバレッジ、コード品質、パフォーマンスを意識した開発を行います。
                      これらの指標が評価に反映されます。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-orange-600" />
                    評価確認
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">AI評価レポート</h4>
                    <p className="text-gray-600 text-sm">
                      プロジェクト完了後にAIが生成する詳細な評価レポートを確認します。
                      技術力、品質、進捗管理が客観的に評価されます。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">ポイント獲得</h4>
                    <p className="text-gray-600 text-sm">
                      評価結果に基づいてポイントを獲得し、ランキングが更新されます。
                      継続的な改善がポイント向上につながります。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">フィードバック</h4>
                    <p className="text-gray-600 text-sm">
                      評価結果を基に自己分析を行い、次回のプロジェクトに活かします。
                      スキル向上のための具体的なアドバイスも提供されます。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 3. 管理者ガイド */}
          <section id="manager-guide" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">3. 管理者ガイド</h2>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2 text-purple-600" />
                    組織管理
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">ユーザー管理</h4>
                    <p className="text-gray-600 text-sm">
                      組織のメンバーを追加・削除し、適切なロールを割り当てます。
                      権限管理によりセキュリティを確保します。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">技術スタック管理</h4>
                    <p className="text-gray-600 text-sm">
                      組織で使用する技術スタックを定義し、評価基準を設定します。
                      新しい技術の導入時は基準の更新を行います。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">評価ルール設定</h4>
                    <p className="text-gray-600 text-sm">
                      組織に適した評価ルールとポイント計算方法を設定します。
                      公平性と透明性を保つための基準を定義します。
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                    パフォーマンス分析
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">組織全体の分析</h4>
                    <p className="text-gray-600 text-sm">
                      組織全体のパフォーマンスを分析し、改善点を特定します。
                      部門別、技術別、期間別の詳細な分析が可能です。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">個人評価</h4>
                    <p className="text-gray-600 text-sm">
                      各メンバーの評価履歴と成長軌跡を確認します。
                      スキル向上のための個別サポート計画を策定します。
                    </p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900">給与連動</h4>
                    <p className="text-gray-600 text-sm">
                      評価結果を給与システムと連動させ、公平な報酬体系を構築します。
                      半年評価に基づく給与調整を自動化します。
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 4. ベストプラクティス */}
          <section id="best-practices" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">4. ベストプラクティス</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Star className="w-5 h-5 mr-2 text-yellow-600" />
                    依頼者向け
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">要件は具体的で測定可能に定義する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">成果物の品質基準を明確にする</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">週次評価を必ず実施する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">難易度を基準とした評価を重視する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">AIのナビゲーションに従う</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Code className="w-5 h-5 mr-2 text-green-600" />
                    開発者向け
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">興味のある案件に即座に参加する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">CI/CDを必ず設定する</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">テストカバレッジを高く保つ</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">定期的にコミットする</span>
                  </div>
                  <div className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5" />
                    <span className="text-sm">競争開発に積極的に参加する</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* 5. よくある質問 */}
          <section id="faq" className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">5. よくある質問</h2>
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 評価はどのように行われますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    CI/CDパイプラインから収集される定量データ（テストカバレッジ、コード品質、進捗状況など）を
                    AIが分析し、客観的な評価レポートを自動生成します。依頼者の手動評価と組み合わせて
                    最終的な評価を決定します。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: ポイントはどのように計算されますか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    プロジェクトの難易度、品質、進捗管理、技術的貢献度を総合的に評価し、
                    組織で設定されたルールに基づいてポイントを計算します。
                    見積もりではなく、実際の成果に基づいて計算されます。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: システム外でのプロジェクトは可能ですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    システム外でのプロジェクト開始は推奨されません。
                    評価の公平性と標準化を保つため、すべてのプロジェクトは
                    システム内で管理する必要があります。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 評価結果に不服がある場合はどうすればよいですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    評価結果はダッシュボードで詳細に確認できます。
                    評価の根拠となるデータやメトリクスを確認し、
                    フィードバックを得て次の評価に向けて頑張ってください。
                    継続的な改善が評価向上につながります。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 週次評価はなぜ必要ですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    週次評価により、プロジェクトの進行状況を継続的に把握し、
                    問題の早期発見と修正が可能になります。最終成果物だけでなく、
                    開発プロセス全体の品質を保証するため、原則必須となっています。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 難易度が高いプロジェクトのメリットは？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    難易度が高いプロジェクトは、成功時のポイント獲得率が高くなります。
                    技術的挑戦を促進し、スキル向上の機会を提供します。
                    予算ではなく難易度を基準とした評価により、技術力の向上を重視します。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 応募や選考がないのはなぜですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    開発を上手く進められず、失敗しても依頼者が別の担当をアサインしたり
                    バックアップを行うことができるからです。つまり「まずはやってみよう」のスタンスです。
                    選考プロセスを省略することで、開発者は興味のある案件に即座に参加でき、
                    積極的な挑戦を促進します。失敗を恐れずに技術的挑戦に取り組める環境を提供しています。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 競争開発とはどのような仕組みですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    1つのプロジェクトを複数の開発者が独立して開発し、競い合う仕組みです。
                    失敗しても代替可能なため、積極的な挑戦が可能です。
                    最良の成果物が採用され、開発者の技術力向上を促進します。
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Q: 見積もりが不要なのは何故ですか？</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    明確な要件定義とAIのナビゲーションと初動の開発者のパフォーマンスによって
                    ある程度予想がつくからです。従来の見積もりに依存した評価ではなく、
                    実際の成果に基づいて評価を行うため、事前の見積もりは不要です。
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </main>
      </div>
  );
} 