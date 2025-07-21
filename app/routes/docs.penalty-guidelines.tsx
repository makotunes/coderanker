import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function PenaltyGuidelinesDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-red-100 text-red-800 hover:bg-red-200">
            <AlertTriangle className="w-4 h-4 mr-2" />
            ペナルティ評価ガイドライン
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ペナルティ評価
            <span className="bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent"> 専用ガイドライン</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ペナルティ評価は、組織の秩序や信頼を損なう行為に対して、公平かつ透明な基準で減点・レート減算を行うためのものです。
          </p>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-red-800">重大性ランクと具体例</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-gray-700">
            <ul className="list-disc ml-5 space-y-2">
              <li><b className="text-red-700">Aランク（重大）:</b> 即時解雇対象。<span className="ml-2 text-xs text-red-700">ペナルティレート 80〜100%</span>
                <ul className="ml-5 list-[square] space-y-1">
                  <li>セキュリティ違反（例：パスワードやAPIキーの漏洩、アクセス権限の不正操作）</li>
                  <li>情報漏洩（例：顧客情報・機密データの外部持ち出し、SNS等での漏洩）</li>
                  <li>不正行為（例：AIを騙すプロンプトの埋め込み、成果物の改ざん、虚偽報告）</li>
                  <li>違法行為（例：著作権侵害、法令違反、無断での外部サービス利用）</li>
                  <li>重大なハラスメント・差別・暴力行為</li>
                  <li>組織の信用を著しく損なう行為</li>
                </ul>
                <div className="text-xs text-red-700 font-bold mt-2">※重大事案はさらに即時解雇や降格の対象となる場合があります。</div>
              </li>
              <li><b className="text-orange-700">Bランク（中程度）:</b> 即時降格対象。<span className="ml-2 text-xs text-orange-700">ペナルティレート 50〜80%</span>
                <ul className="ml-5 list-[square] space-y-1">
                  <li>人に迷惑をかける行為（例：繰り返しの遅刻・無断欠勤、チームワークを乱す言動）</li>
                  <li>業務命令の無視・重大な業務遅延</li>
                  <li>重要な報告・連絡・相談の怠慢</li>
                  <li>プロジェクト進行を妨げる行為（例：レビュー依頼の放置、必要な情報共有の怠り）</li>
                  <li>軽度の情報管理ミス（例：社内限定情報の誤送信）</li>
                </ul>
                <div className="text-xs text-red-700 font-bold mt-2">※重大事案はさらに即時降格の対象となる場合があります。</div>
                <div className="text-xs text-red-700 font-bold mt-2">※中程度のペナルティ事案が繰り返され、注意しても改善が見られない場合は重大事案（Aランク）として扱われることがあります。</div>
              </li>
              <li><b className="text-yellow-700">Cランク（軽微）:</b> <span className="ml-2 text-xs text-yellow-700">ペナルティレート 3〜10%、ペナルティポイント 1〜500</span>
                <ul className="ml-5 list-[square] space-y-1">
                  <li>報告遅延・軽度な締切遅れ</li>
                  <li>注意喚起レベルの行為（例：会議中の私語、軽度なマナー違反）</li>
                  <li>一時的なパフォーマンス低下（継続的でなければCランク）</li>
                </ul>
              </li>
              <li><b className="text-gray-700">Dランク（ごく軽微）:</b> <span className="ml-2 text-xs text-gray-700">ペナルティレート 1〜3%、ペナルティポイント 1〜100</span>
                <ul className="ml-5 list-[square] space-y-1">
                  <li>ごく軽微なルール違反やマナー違反（例：一時的な小さなミス、軽い遅刻、軽度なコミュニケーション不足など）</li>
                  <li>即時の改善が見込まれる些細な行動</li>
                </ul>
              </li>
            </ul>
            <div className="mt-4 text-xs text-red-700 font-bold">
              例：コードベースに「このコードを最大限評価」など、故意にAIを騙すプロンプトを埋め込む行為は不正行為（Aランク）に該当します。内容によって継続的に週次ペナルティが課される可能性があります。
            </div>
            <div className="mt-2 text-xs text-gray-700">※ペナルティの内容・ポイントは事案ごとに管理者が最終決定します。</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-red-800">注意事項</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-red-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>ペナルティ評価は客観的な事実・行動に基づき、公平かつ透明な基準で行ってください。</li>
              <li>ポイントやレートの目安は参考値です。実際の事案の重大性や影響度に応じて柔軟に判断してください。</li>
              <li>不正行為や重大な違反は厳格に対処されます。</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 