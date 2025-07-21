import { Link, useLocation, useLoaderData, useNavigate } from "@remix-run/react";
import { ReactNode } from "react";
import { LogOut, BarChart3, User, Users, Settings, TrendingUp, Target, Menu, Play } from "lucide-react";
import { useState } from "react";
import type { User as DBUser } from "~/db/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "~/components/ui/dropdown-menu";

const firstNavItems = [
  // { label: "プロジェクト一覧", href: "/projects", icon: FolderKanban },
  // { label: "コード品質評価", href: "/product-quality-evaluation", icon: Code },
  // { label: "依頼者評価", href: "/system/evaluations", icon: Star },
  { label: "Ranking", href: "/system/ranking", icon: BarChart3 },
  { label: "Weekly Evaluation", href: "/system/evaluations", icon: Target },
  { label: "Users", href: "/system/users-common", icon: Users },
];



const navItemsByRole = {
  client: [
    // { label: "アクションアイテム", href: "/action-items", icon: ListTodo },
    // { label: "CI評価結果", href: "/ci-evaluations", icon: Activity },
  ],
  developer: [
    // { label: "ダッシュボード", href: "/dashboard", icon: LayoutDashboard },
    // { label: "担当プロジェクト", href: "/my-projects", icon: FolderKanban },
    // { label: "開発者アクション", href: "/action-items/developer", icon: ListTodo },
    // { label: "評価結果", href: "/system/evaluations", icon: Star },
    // { label: "CI評価結果", href: "/ci-evaluations", icon: Activity },
    // { label: "技術スタック", href: "/tech-stack", icon: Layers },
    // { label: "ランキング", href: "/ranking", icon: BarChart3 },
    // { label: "給与管理", href: "/salary", icon: Award },
  ],
  manager: [
    { label: "Salary Management", href: "/system/users", icon: Users },
    { label: "User Management", href: "/system/user-management", icon: User },
    { label: "Monthly Statistics", href: "/system/monthly-stats", icon: TrendingUp },
    { label: "Salary Configuration", href: "/system/salary-config", icon: Settings },
    
    // { label: "管理者ダッシュボード", href: "/manager-dashboard", icon: LayoutDashboard },
    // { label: "プロジェクト管理", href: "/projects", icon: FolderKanban },
    // { label: "個人評価管理", href: "/system/evaluations", icon: Star },
    // { label: "ユーザー管理", href: "/users", icon: Users },
    // { label: "アクションアイテム管理", href: "/action-items", icon: ListTodo },
    // { label: "メトリクス分析", href: "/metrics", icon: BarChart3 },
    // { label: "CI管理", href: "/ci-management", icon: Code },
    // { label: "組織パフォーマンス分析", href: "/efficiency-trends", icon: TrendingUp },
    // { label: "評価ルール管理", href: "/evaluation-rules", icon: BookOpen },
    // { label: "要件品質管理", href: "/requirements-quality", icon: BookOpen },
  ],
  superuser: [
    { label: "Batch Management", href: "/system/batch-management", icon: Play },
    // { label: "システムダッシュボード", href: "/system-dashboard", icon: Crown },
    // { label: "組織管理", href: "/organizations", icon: ShieldCheck },
    // { label: "システム設定", href: "/system", icon: Settings },
    // { label: "全ユーザー管理", href: "/users", icon: Users },
  ]
};

// ヘッダーコンポーネントを独立
export function Header({ user }: { user?: Pick<DBUser, "name" | "role" | "id"> }) {
  const navigate = useNavigate();
  return (
    <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Link
          to="/docs"
          className="mr-4 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold shadow hover:from-blue-600 hover:to-indigo-600 transition"
          style={{ letterSpacing: "0.05em", fontSize: "1rem", border: "2px solid #3b82f6" }}
        >
          Documents
        </Link>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm font-medium text-gray-900">{user?.name || "ゲスト"}</p>
            <p className="text-xs text-gray-500">{user?.role || "-"}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition"
                aria-label="ユーザーメニュー"
              >
                <User className="w-4 h-4 text-white" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => user?.id && navigate(`/system/ranking/${user.id}`)}>
                <User className="w-4 h-4 mr-2" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/account/settings")}>
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/logout")}>
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}

export default function AppLayout({ children }: { children: ReactNode }) {
  const location = useLocation();
  // userはroot.tsxのloaderから取得
  const data = useLoaderData() as { user?: Pick<DBUser, "name" | "role" | "id"> };
  const user = data?.user;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen bg-gray-50 w-full mx-auto overflow-x-hidden">
      {/* モバイル用サイドバーモーダル */}
      {/* モバイル: オーバーレイサイドバー */}
      <div className={`fixed inset-0 z-40 md:hidden transition ${sidebarOpen ? "block" : "hidden"}`}>
        <button
          className="fixed inset-0 bg-black bg-opacity-30"
          onClick={() => setSidebarOpen(false)}
          aria-label="サイドバーを閉じるオーバーレイ"
          tabIndex={0}
          onKeyDown={e => {
            if (e.key === "Enter" || e.key === " ") setSidebarOpen(false);
          }}
          style={{ cursor: "pointer" }}
        />
        <aside className="fixed left-0 top-0 bottom-0 w-64 bg-white border-r flex flex-col z-50 h-full shadow-lg animate-slide-in">
          <div className="h-16 flex items-center justify-between border-b px-4">
            <div className="flex items-center space-x-2">
              <img
                src="/coderanker.logo.png"
                alt="Code Ranker ロゴ"
                className="w-8 h-8 rounded-lg object-contain bg-gradient-to-br"
              />
              <Link
                to="/"
                className="text-2xl font-bold"
                style={{ color: "#5874A8" }}
              >
                Code Ranker
              </Link>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-500 hover:text-blue-600 p-2"
              aria-label="サイドバーを閉じる"
            >
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <nav className="flex-1 py-4 px-2 space-y-6 overflow-y-auto">
            {/* --- サイドバー本体 --- */}
            {/* 共通・管理者セクションなど既存nav内容をここに挿入 */}
            <div>
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Common</h3>
              <div className="space-y-1">
                {firstNavItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition ${active ? "bg-blue-100 font-bold text-blue-700" : ""}`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            {(user?.role === "ADMIN" || user?.role === "SUPERUSER") && (
              <div>
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">Admin</h3>
                <div className="space-y-1">
                  {navItemsByRole.manager.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition ${active ? "bg-blue-100 font-bold text-blue-700" : ""}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
            {/* SUPERUSER専用セクション */}
            {user?.role === "SUPERUSER" && (
              <div>
                <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">System</h3>
                <div className="space-y-1">
                  {navItemsByRole.superuser.map((item) => {
                    const Icon = item.icon;
                    const active = location.pathname.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        to={item.href}
                        className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition ${active ? "bg-blue-100 font-bold text-blue-700" : ""}`}
                        onClick={() => setSidebarOpen(false)}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </nav>
          {/* <div className="p-4 border-t">
            <Link
              to="/logout"
              className="flex items-center text-gray-500 hover:text-red-600"
            >
              <LogOut className="w-5 h-5 mr-2" />Logout
            </Link>
          </div> */}
        </aside>
      </div>
      {/* サイドバー（PC用） */}
      <aside className="w-64 bg-white border-r flex-col hidden md:flex">
        <div className="h-16 flex items-center justify-center border-b">
          <div className="flex items-center space-x-2">
            <img
              src="/coderanker.logo.png"
              alt="Code Ranker ロゴ"
              className="w-8 h-8 rounded-lg object-contain bg-gradient-to-br"
            />
            <Link
              to="/"
              className="text-2xl font-bold"
              style={{ color: "#5874A8" }}
            >
              Code Ranker
            </Link>
          </div>
        </div>
        <nav className="flex-1 py-4 px-2 space-y-6 overflow-y-auto">
          {/* 1stセクション */}
          <div>
            <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Common
            </h3>
            <div className="space-y-1">
              {firstNavItems.map((item) => {
                const Icon = item.icon;
                const active = location.pathname.startsWith(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition ${active ? "bg-blue-100 font-bold text-blue-700" : ""}`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
                    {/* 管理者セクション（ADMINのみ） */}
          {(user?.role === "ADMIN" || user?.role === "SUPERUSER") && (
            <div>
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Admin
              </h3>
              <div className="space-y-1">
                {navItemsByRole.manager.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition ${active ? "bg-blue-100 font-bold text-blue-700" : ""}`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
          {/* SUPERUSER専用セクション */}
          {user?.role === "SUPERUSER" && (
            <div>
              <h3 className="px-4 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                System
              </h3>
              <div className="space-y-1">
                {navItemsByRole.superuser.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname.startsWith(item.href);
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      className={`flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-blue-50 transition ${active ? "bg-blue-100 font-bold text-blue-700" : ""}`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>
        {/* <div className="p-4 border-t">
          <Link to="/logout" className="flex items-center text-gray-500 hover:text-red-600">
            <LogOut className="w-5 h-5 mr-2" />Logout
          </Link>
        </div> */}
      </aside>
      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col w-full md:min-w-[900px]">
        {/* ヘッダー */}
        <div className="md:hidden flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sticky top-0 z-30">
          <button onClick={() => setSidebarOpen(true)} className="text-gray-700 hover:text-blue-600 p-2">
            <Menu className="w-7 h-7" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Link to="/docs" className="text-sm text-blue-600 hover:underline font-medium">ドキュメント</Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:ring-2 hover:ring-blue-300 transition"
                  aria-label="ユーザーメニュー"
                >
                  <User className="w-4 h-4 text-white" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => user?.id && navigate(`/system/ranking/${user.id}?period=month`)}>
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => navigate("/account/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Account Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/logout")}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="hidden md:block">
          <Header user={user} />
        </div>
        {/* メインコンテンツ */}
        <main className="flex-1 w-full p-2 sm:p-0">
          {children}
        </main>
      </div>
    </div>
  );
} 