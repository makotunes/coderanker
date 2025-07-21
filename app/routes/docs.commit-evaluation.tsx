import { Button } from "~/components/ui/button";
import { Card } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import {
  GitBranch,
  Target,
  CheckCircle,
  Diff,
  Activity,
  AlertTriangle,
  GitCommit,
  MessageSquare,
  XCircle,
  BookOpen,
  Calendar,
  Lightbulb
} from "lucide-react";

export default function CommitEvaluationDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* ヒーローセクション */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-green-100 text-green-800 hover:bg-green-200">
            <GitBranch className="w-4 h-4 mr-2" />
            成果量評価
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            コミット履歴から<br className="sm:hidden" />
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              週次成果量を計測
            </span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Gitコミット履歴を解析し、要件定義に沿って実装された機能の量を週次で計測。
            <br />
            コミット差分から機能実装数、要件対応度、開発プロセスの質を定量的に評価します。
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500">
            <div className="flex items-center">
              <GitBranch className="w-4 h-4 mr-1" />
              コミット履歴解析
            </div>
            <div className="flex items-center">
              <Diff className="w-4 h-4 mr-1" />
              差分分析
            </div>
            <div className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              週次計測
            </div>
          </div>
        </div>

        {/* 評価コンセプト */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                <GitBranch className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">コミット履歴解析</h3>
                <p className="text-gray-600">実際の開発成果の計測</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              まずGitコミット履歴を解析し、直近1週間の実際の開発成果を抽出します。
              コミットメッセージ、ファイル変更、行数増減から機能実装の量と質を
              定量的に評価し、要件定義との整合性を確認します。
            </p>
          </Card>

          <Card className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                <Diff className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">差分分析</h3>
                <p className="text-gray-600">機能実装の詳細評価</p>
              </div>
            </div>
            <p className="text-gray-700 leading-relaxed">
              コミット差分を詳細に分析し、新規機能の追加、既存機能の改善、
              バグ修正、リファクタリングを分類します。要件定義に沿った
              機能実装の進捗と品質を週次で追跡します。
            </p>
          </Card>
        </div>

        {/* 評価観点 */}
        <div className="mb-16">
          {/* --- AI活用推奨注釈 --- */}
          <div className="mb-8 p-4 bg-cyan-100 border-l-4 border-cyan-500 rounded">
            <span className="font-bold text-cyan-900">【AI活用の推奨】</span><br />
            <span className="text-cyan-900 text-sm">
              AIを活用してコミット履歴を調査したり、要件定義との一貫性を自動的に確認することを推奨します。<br />
              AIによるサポートを活用することで、より公平かつ効率的な評価が可能になります。
            </span>
          </div>
          {/* --- ロール別ガイドライン注釈 --- */}
          <div className="mb-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded">
            <span className="font-bold text-yellow-900">【エンジニア以外のロールの方へ】</span><br />
            <span className="text-yellow-900 text-sm">
              エンジニア以外（デザイナー・オペレーター・コーポレート等）の場合、<b>アウトプットの量</b>に主眼を置き、<b>各パラメータを自分の業務内容に合わせて読み替えて評価</b>して構いません。<br />
              使わないパラメータは未入力でニュートラル（評価に影響しない）となります。<br />
              <b>FP（Function Point）の定義</b>に従って評価してください。
            </span>
          </div>
          {/* --- FP定義 --- */}
          <div className="mb-8 p-4 bg-green-100 border-l-4 border-green-500 rounded">
            <div className="font-bold text-green-900 mb-1">FP（Function Point）の定義</div>
            <ul className="list-disc ml-5 text-sm text-green-900">
              <li><b>エンジニア：</b>1FP = 1つの独立した機能（例：APIエンドポイント、画面、バッチ処理など）</li>
              <li><b>デザイナー：</b>1FP = 1画面分のUIデザイン、または1つの主要なビジュアル成果物</li>
              <li><b>オペレーター：</b>1FP = 1つの業務プロセスの自動化・効率化、または1件の大きな運用改善</li>
              <li><b>コーポレート：</b>1FP = 1つの制度設計、規程策定、または1件の全社的な業務改善</li>
            </ul>
            <div className="text-xs text-green-800 mt-2">※プロジェクトや役割に応じて柔軟に解釈し、チームで合意した基準を優先してください。</div>
            <div className="text-xs text-green-800 mt-1">※成果量評価のトータルは絶対量（FPや行数等）で算出され、<b>ロールごとに独自の重みで調整</b>されます（重みは運用上変更されることがあります）。</div>
          </div>

          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">評価観点</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              コミット履歴から抽出される成果量と開発プロセスの両面から総合的に評価します
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-green-50 to-green-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center mr-3">
                  <GitCommit className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">機能実装量</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 新規ファイル作成数</li>
                <li>• 機能追加コミット数</li>
                <li>• 実装行数の増減</li>
                <li>• 要件対応機能の実装状況</li>
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center mr-3">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">要件対応度</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 要件定義との整合性</li>
                <li>• 優先度の高い機能の実装</li>
                <li>• 機能の完成度と品質</li>
                <li>• 要件変更への対応力</li>
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-purple-50 to-purple-100">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <Activity className="w-5 h-5 text-white" />
                </div>
                <h4 className="text-lg font-bold text-gray-900">開発プロセス</h4>
              </div>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• コミットの粒度と頻度</li>
                <li>• 開発手法の一貫性</li>
                <li>• 継続的な開発リズム</li>
                <li>• 問題解決の効率性</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* 評価方法論 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">評価方法論</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              コミット履歴解析と差分分析による週次成果量計測
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <GitBranch className="w-5 h-5 mr-2 text-green-500" />
                コミット履歴解析アプローチ
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">週次コミット履歴の抽出</h5>
                    <p className="text-sm text-gray-600">
                      <code>git log --since=&quot;1 week ago&quot;</code>で直近1週間の
                      コミット履歴を抽出し、実際の開発成果を把握します。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">差分統計の分析</h5>
                    <p className="text-sm text-gray-600">
                      <code>git diff --stat</code>でファイル変更数、行数増減、
                      新規ファイル作成数を定量的に計測します。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">機能実装の分類</h5>
                    <p className="text-sm text-gray-600">
                      コミットメッセージとファイル変更から、新規機能追加、
                      改善、修正、リファクタリングを分類します。
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            <Card className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Diff className="w-5 h-5 mr-2 text-blue-500" />
                差分詳細分析
              </h4>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs font-bold">1</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">ファイル変更の詳細分析</h5>
                    <p className="text-sm text-gray-600">
                      各ファイルの変更内容を分析し、機能実装の質と
                      要件対応度を評価します。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs font-bold">2</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">開発プロセスの評価</h5>
                    <p className="text-sm text-gray-600">
                      コミットの粒度、頻度、一貫性から開発プロセスの
                      質と効率性を評価します。
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mr-3 mt-1">
                    <span className="text-white text-xs font-bold">3</span>
                  </div>
                  <div>
                    <h5 className="font-semibold text-gray-900 mb-1">継続性の評価</h5>
                    <p className="text-sm text-gray-600">
                      週次での成果量の推移を分析し、継続的な開発の
                      パターンと効率性を評価します。
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* プロンプト例 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">評価プロンプト例</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              コミット履歴解析による成果量評価を実行するためのプロンプト
            </p>
          </div>

          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-gray-50 to-gray-100">
            <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-green-500" />
              成果量評価プロンプト
            </h4>
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <pre className="text-sm text-gray-800 whitespace-pre-wrap font-mono">
{`あなたは成果量評価者です。
以下のコミット履歴を週次で分析し、要件定義に沿った機能実装量と開発プロセスの質を評価してください。

【評価観点】
1. 機能実装量
   - 新規ファイル作成数
   - 機能追加コミット数
   - 実装行数の増減
   - 要件対応機能の実装状況

2. 要件対応度
   - 要件定義との整合性
   - 優先度の高い機能の実装状況
   - 機能の完成度と品質
   - 要件変更への対応力

3. 開発プロセス
   - コミットの粒度と頻度
   - 開発手法の一貫性
   - 継続的な開発リズム
   - 問題解決の効率性

【評価方法】
- まずコミット履歴を解析（git log --since="1 week ago"）
- 差分統計を分析（git diff --stat）
- ファイル変更の詳細を確認
- 機能実装の分類と評価

【出力フォーマット】
- 週次機能実装数: XX件
- 要件対応度: XX%（要件定義との整合性）
- 開発プロセス品質: （コミット粒度、一貫性等の評価）
- 継続性・効率性: （開発リズム、問題解決等の評価）
- 総合ポイント（絶対値）: XXXXpt
- 改善提案（あれば）

【コミット履歴】
（ここに git log --oneline --since=&quot;1 week ago&quot; の結果を貼り付け）

【差分統計】
（ここに git diff --stat HEAD~7..HEAD の結果を貼り付け）

【重要】
- 表面的なファイル数や行数のみを見て評価してはならない
- 実際の機能実装状況を詳しく確認して、正確な評価を行う
- 設計全体を見渡して機能について実装しているか検討する必要がある
- UIのモックだけでは機能が100%完了したわけではないことを認識する`}
              </pre>
            </div>
          </Card>
        </div>

        {/* 出力例 */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">評価出力例</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              実際のコミット履歴解析結果の出力例
            </p>
          </div>

          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-100">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2 text-green-500" />
                  良い例
                </h4>
                <div className="bg-white p-4 rounded-lg border border-green-200">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-green-700">週次機能実装数:</span> 8件
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">要件対応度:</span> 88%
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">開発プロセス品質:</span> 
                      <br />• 適切なコミット粒度で機能単位実装
                      <br />• 一貫した開発手法を維持
                      <br />• 段階的な機能実装が進められている
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">継続性・効率性:</span>
                      <br />• 集中的な開発で効率的に成果を積み重ね
                      <br />• 6,671行追加、2,729行削除の大規模改修を実行
                    </div>
                    <div>
                      <span className="font-semibold text-green-700">総合ポイント:</span> 2,200pt
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <XCircle className="w-5 h-5 mr-2 text-red-500" />
                  改善が必要な例
                </h4>
                <div className="bg-white p-4 rounded-lg border border-red-200">
                  <div className="space-y-3 text-sm">
                    <div>
                      <span className="font-semibold text-red-700">週次機能実装数:</span> 2件
                    </div>
                    <div>
                      <span className="font-semibold text-red-700">要件対応度:</span> 35%
                    </div>
                    <div>
                      <span className="font-semibold text-red-700">開発プロセス品質:</span>
                      <br />• 大量の変更を一度にコミット
                      <br />• コミットメッセージが不明確
                      <br />• 機能実装の分類が困難
                    </div>
                    <div>
                      <span className="font-semibold text-red-700">継続性・効率性:</span>
                      <br />• 開発リズムが不規則
                      <br />• 効率的な開発ができていない
                    </div>
                    <div>
                      <span className="font-semibold text-red-700">総合ポイント:</span> 650pt
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* 運用ガイド */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">運用ガイド</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              コミット履歴解析による成果量評価を効果的に活用するためのガイドライン
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Lightbulb className="w-5 h-5 mr-2 text-yellow-600" />
                評価の活用方法
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 週次でのコミット履歴解析</li>
                <li>• 差分統計による定量的評価</li>
                <li>• 開発プロセスの改善指標</li>
                <li>• 継続的な成果の積み重ね評価</li>
              </ul>
            </Card>

            <Card className="p-6 border-0 shadow-lg bg-gradient-to-br from-red-50 to-pink-100">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
                注意点
              </h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• コミット履歴の解析が前提</li>
                <li>• 量だけでなく質も重要</li>
                <li>• 要件定義の明確性が前提</li>
                <li>• 定期的な評価と改善サイクルを維持</li>
              </ul>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Card className="p-8 border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-100">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              コミット履歴解析による成果量評価を始めましょう
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Gitコミット履歴を解析し、要件定義に沿った成果物の積み重ねを可視化し、
              開発プロセスの質と継続的な改善を評価します。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white">
                <GitBranch className="w-4 h-4 mr-2" />
                評価を実行
              </Button>
              <Button variant="outline" className="border-green-200 text-green-700 hover:bg-green-50">
                <BookOpen className="w-4 h-4 mr-2" />
                詳細ガイド
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 