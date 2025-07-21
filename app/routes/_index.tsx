import { Link } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import Footer from "~/components/footer";
import {
  ArrowRight,
  GitBranch,
  Code,
  Crown,
  UserCheck,
  Zap,
  Shield,
  Brain,
  Users,
  Target,
  Lock,
  BarChart3
} from "lucide-react";

export default function Index() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* ヒーローセクション */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-20">
          <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
            <Zap className="w-4 h-4 mr-2" />
            AI-Powered Engineering Evaluation
          </Badge>
          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Visualize Engineer Skills for Free
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">A New HR Evaluation System for the AI Era</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto leading-relaxed">
            <strong>Ranking × AI Analysis × Peer Review</strong><br />
            Just integrate the evaluation script into your CI/CD pipeline to automatically quantify code quality and development performance.<br />
            An AI evaluation system that is transparent and fair, free from human subjectivity.
          </p>
          {/* サービス画面イメージ */}
          <div className="flex justify-center mb-8">
            <img src="/screenshot.png" alt="CodeRanker Dashboard Screenshot" className="rounded-xl shadow-lg border max-w-full w-[900px]" />
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-8 max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-blue-800 mb-2 text-left">Completely Free and Engineer-Friendly Design</h3>
            <ul className="text-blue-700 leading-relaxed list-disc pl-5 space-y-1 text-left">
              <li>Easy setup—just add the evaluation script to your CI/CD</li>
              <li>Objective skill measurement with transparent and fair AI evaluation</li>
              <li>Supports overall organizational development efficiency and quality improvement</li>
              <li>Clarifies engineer skill development and training policies</li>
              <li>Salary simulation feature available</li>
              <li>Monthly performance statistics and reporting features provided</li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
            <Button size="lg" className="text-lg px-8 py-4 bg-blue-600 hover:bg-blue-700" asChild>
              <Link to="/login?demo=1">
                Try the Community Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
                Build from Source Code
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
              <Link to="/docs">View Documentation</Link>
            </Button>
          </div>
        </div>

        {/* 課題セクション */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Are you facing these challenges?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <Card className="border-red-200">
              <CardHeader>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-red-600" />
                </div>
                <CardTitle className="text-red-700">Ambiguous Evaluation Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unclear criteria for evaluating engineers, leading to a sense of unfairness.
                </p>
              </CardContent>
            </Card>

            <Card className="border-orange-200">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <BarChart3 className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-orange-700">Lack of Quantitative Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Want objective and quantitative evaluation metrics.
                </p>
              </CardContent>
            </Card>

            <Card className="border-yellow-200">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-yellow-700">Discovering Top Talent</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Want to objectively discover and fairly evaluate outstanding engineers.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* サービスの特徴 */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Service Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700 text-center">CI/CD Integration</CardTitle>
                <CardDescription className="text-center">
                  Automatic Quantification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">
                  Just integrate the evaluation script into your CI/CD pipeline to automatically quantify code quality and development performance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700 text-center">AI Analysis</CardTitle>
                <CardDescription className="text-center">
                  Transparent and Fair
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">
                  An AI evaluation system that is transparent and fair, free from human subjectivity.
                </p>
              </CardContent>
            </Card>

            <Card className="border-purple-200">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700 text-center">Completely Free</CardTitle>
                <CardDescription className="text-center">
                  Engineer-Friendly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-center text-sm">
                  Completely free and engineer-friendly design.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 導入メリット */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Benefits of Implementation</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="border-blue-200">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Crown className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700">Organization Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Discovering Top Talent</h4>
                  <p className="text-gray-600 text-sm">
                    Clarifies engineer skill development and training policies.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Clarifying Development Policies</h4>
                  <p className="text-gray-600 text-sm">
                    Clarifies engineer skill development and training policies.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Enhancing Competitiveness</h4>
                  <p className="text-gray-600 text-sm">
                    Supports overall organizational development efficiency and quality improvement.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-200">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <UserCheck className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-green-700">Engineer Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Visualizing Skills</h4>
                  <p className="text-gray-600 text-sm">
                    Clarifies engineer skill development and training policies.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Fair Comparison</h4>
                  <p className="text-gray-600 text-sm">
                    Clarifies engineer skill development and training policies.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-900">Transparent Evaluation</h4>
                  <p className="text-gray-600 text-sm">
                    Clarifies engineer skill development and training policies.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 3軸評価システム */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Three-Axis Evaluation System</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-blue-200 bg-blue-50">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-blue-700 text-center">Senior Engineer Evaluation</CardTitle>
                <CardDescription className="text-center text-blue-700">
                  Output Quality (Peer Review by Senior Engineers)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-blue-700 text-center text-sm space-y-1">
                <div>• Code and design quality</div>
                <div>• Test coverage and technical depth</div>
                <div>• Evaluated by senior engineers</div>
                <div>• Focus on objective technical indicators</div>
                <Button variant="link" asChild className="p-0 text-blue-700">
                  <Link to="/docs/senior-evaluation">Learn more</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <GitBranch className="w-8 h-8 text-green-600" />
                </div>
                <CardTitle className="text-green-700 text-center">Commit Evaluation</CardTitle>
                <CardDescription className="text-center text-green-700">
                  Output Quantity (AI-driven Evaluation)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-green-700 text-center text-sm space-y-1">
                <div>• Commit history analysis</div>
                <div>• Implementation volume and requirement coverage</div>
                <div>• Development process and consistency</div>
                <div>• Automated evaluation by AI</div>
                <Button variant="link" asChild className="p-0 text-green-700">
                  <Link to="/docs/commit-evaluation">Learn more</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="border-purple-200 bg-purple-50">
              <CardHeader>
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserCheck className="w-8 h-8 text-purple-600" />
                </div>
                <CardTitle className="text-purple-700 text-center">Manager Evaluation</CardTitle>
                <CardDescription className="text-center text-purple-700">
                  Client/Manager Review (Process & Business Value)
                </CardDescription>
              </CardHeader>
              <CardContent className="text-purple-700 text-center text-sm space-y-1">
                <div>• Requirement alignment</div>
                <div>• Process quality and business value</div>
                <div>• Usability and practical value</div>
                <div>• Comprehensive review by managers</div>
                <Button variant="link" asChild className="p-0 text-purple-700">
                  <Link to="/docs/client-evaluation">Learn more</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
          <div className="mt-8 text-center">
            <Card className="bg-yellow-50 border-yellow-200 inline-block">
              <CardContent className="pt-6 pb-6">
                <h4 className="text-lg font-semibold text-yellow-800 mb-2">Features of the Three-Axis System</h4>
                <p className="text-yellow-700">
                  A fair and transparent evaluation system that combines peer review by senior engineers, objective AI-driven analysis, and practical assessment by managers.<br />
                  <Link to="/docs/evaluation-framework" className="underline ml-2">See the full framework</Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 収益化モデルの透明性 */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Transparency of Monetization Model</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="pt-8 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-xl font-semibold text-green-800 mb-4 flex items-center">
                      <Shield className="w-6 h-6 mr-2" />
                      Completely Free Evaluation System
                    </h4>
                    <p className="text-green-700 mb-4">
                      Provides a completely free evaluation system aimed at improving organizational performance.
                      Designed with the growth of engineers and organizational development in mind.
                    </p>
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-blue-800 mb-4 flex items-center">
                      <Lock className="w-6 h-6 mr-2" />
                      Transparent and Secure Data Utilization
                    </h4>
                    <p className="text-blue-700 mb-4">
                      Ensures transparent and secure data utilization with appropriate terms of use.
                      Operates with a strong focus on privacy and security.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* コントリビューター向けセクション */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">OSS Contributors Wanted</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="border-blue-200">
              <CardContent className="pt-8 pb-8">
                <h4 className="text-xl font-semibold text-blue-800 mb-4">This project is OSS. Your contributions are welcome!</h4>
                <ul className="list-disc pl-6 text-blue-700 space-y-2 mb-4 text-left">
                  <li>Bug fixes and adding tests</li>
                  <li>UI/UX improvements and accessibility support</li>
                  <li>Documentation and translation</li>
                  <li>Development of evaluation AI scripts</li>
                  <li>Multi-tenancy and management feature expansion</li>
                  <li>Other new features and proposals</li>
                </ul>
                <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                  <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                    <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
                      Contribute on GitHub
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </a>
                  </Button>
                  {/* <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                    <Link to="/docs">View Contribution Guide</Link>
                  </Button> */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 開発マイルストーン（ロードマップ） */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Development Milestones</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="border-indigo-200">
              <CardContent className="pt-8 pb-8">
                <ul className="list-disc pl-6 text-indigo-700 space-y-2 text-left">
                  <li><b>Multi-tenant</b> (<span className="text-yellow-600">Not Started</span>)</li>
                  <li><b>Evaluation AI Script Implementation</b> (<span className="text-yellow-600">Not Started</span>)</li>
                  <li><b>CI/CD Auto-integration Enhancement</b> (<span className="text-green-600">In Progress</span>)</li>
                  <li><b>Monthly Statistics & Reports</b> (<span className="text-green-600">In Progress</span>)</li>
                  <li><b>UI/UX Improvement</b> (<span className="text-blue-600">Continuous</span>)</li>
                  <li><b>Documentation & Onboarding Guide Expansion</b> (<span className="text-blue-600">Continuous</span>)</li>
                </ul>
                <p className="mt-6 text-indigo-800 text-sm">Please check the Issues/Projects on the GitHub repository for the latest progress.</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 始め方 */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">Getting Started is Easy</h3>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200">
              <CardContent className="pt-8 pb-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Code className="w-10 h-10 text-purple-600" />
                  </div>
                  <h4 className="text-2xl font-bold text-purple-800 mb-4">
                    Try the Demo First!
                  </h4>
                  <p className="text-purple-700 text-lg mb-6">
                    No complicated setup. You can experience evaluation immediately in the demo environment.
                    Feel the actual implementation experience.
                  </p>
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                    <Button size="lg" className="text-lg px-8 py-4 bg-purple-600 hover:bg-purple-700" asChild>
                      <Link to="/register">
                        Start for Free Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button size="lg" variant="outline" className="text-lg px-8 py-4" asChild>
                      <Link to="/docs">View Onboarding Guide</Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mb-20">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="pt-12 pb-12">
              <h3 className="text-3xl font-bold mb-4">Experience OSS Engineer Evaluation Now!</h3>
              <p className="text-xl mb-8 opacity-90">
                Experience evaluation easily with the community demo or build it yourself from the source code.
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Button size="lg" variant="secondary" className="text-lg px-8 py-4" asChild>
                  <Link to="/login?demo=1">
                    Try the Community Demo
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="text-lg px-8 py-4 border-white text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-800" asChild>
                  <a href="https://github.com/your-repo" target="_blank" rel="noopener noreferrer">
                    Build from Source Code
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
} 