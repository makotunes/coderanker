import { Badge } from "~/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Star } from "lucide-react";

export default function BonusGuidelinesDocs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-orange-50">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <Badge className="mb-6 bg-yellow-100 text-yellow-800 hover:bg-yellow-200">
            <Star className="w-4 h-4 mr-2" />
            ボーナス評価ガイドライン
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            ボーナス評価
            <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"> 専用ガイドライン</span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            ボーナス評価は、通常の週次評価やプロジェクト成果物では測れない、組織全体への貢献・模範的な行動・特別な価値創出に対して与えられます。
          </p>
        </div>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-yellow-800">ボーナス評価の目的</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-gray-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>プロジェクト成果物や週次評価で十分に反映できない組織貢献・模範的行動・特別な価値創出を評価</li>
              <li>チーム全体の士気向上や文化醸成への貢献</li>
              <li>他者のサポートやナレッジ共有、教育・育成への積極的な関与</li>
              <li>業務改善・自動化・新しい仕組みの提案と実現</li>
              <li>困難な状況でのリーダーシップ発揮や危機対応</li>
              <li>会社のブランド価値向上や対外的な好影響</li>
              <li>継続的な貢献や「縁の下の力持ち」的な活躍も積極評価</li>
            </ul>
          </CardContent>
        </Card>
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-yellow-800">ボーナスポイントの目安</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full text-xs border border-yellow-200 bg-white rounded">
                <thead>
                  <tr className="bg-yellow-100 text-yellow-900">
                    <th className="px-2 py-1 border">ポイント</th>
                    <th className="px-2 py-1 border">基準・イメージ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 border text-center font-bold">500</td>
                    <td className="px-2 py-1 border">全社的なインパクト・模範的なリーダーシップ・極めて大きな貢献</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border text-center font-bold">200</td>
                    <td className="px-2 py-1 border">部門・チーム全体への顕著な貢献・新しい価値創出</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border text-center font-bold">100</td>
                    <td className="px-2 py-1 border">日常業務を超えた積極的なサポート・改善・模範行動</td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1 border text-center font-bold">50</td>
                    <td className="px-2 py-1 border">小さな工夫・周囲への良い影響・前向きな姿勢</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-2 text-xs text-yellow-800">※ボーナスは一時的な成果だけでなく、<b>継続的な貢献や組織文化への好影響</b>も重視します。</div>
            <div className="mt-2 text-xs text-yellow-800">※プロジェクト成果や週次評価で十分に反映できない「縁の下の力持ち」的な活躍も積極的に評価してください。</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-yellow-800">注意事項</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-yellow-700">
            <ul className="list-disc ml-5 space-y-1">
              <li>ボーナス評価は管理者や上司が客観的な事実・行動に基づき付与してください。</li>
              <li>ポイントの目安はあくまで参考です。実際の貢献度やインパクトに応じて柔軟に判断してください。</li>
              <li>継続的な貢献や組織文化への好影響も積極的に評価対象とします。</li>
            </ul>
          </CardContent>
        </Card>
      </main>
    </div>
  );
} 