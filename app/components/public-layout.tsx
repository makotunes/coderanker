import { ReactNode, useState } from "react";
import { Link, useLoaderData } from "@remix-run/react";
import { Button } from "~/components/ui/button";
import { Menu } from "lucide-react";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // user情報をrootのloaderから取得
  const data = useLoaderData() as { user?: { name: string; role: string } };
  const user = data?.user;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* モバイル対応ヘッダー */}
      <header className="bg-[#F1F1F3] backdrop-blur-sm shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <img
                src="/coderanker.logo.png"
                alt="Code Ranker Logo"
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
            {/* PC Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
              <Link to="/docs" className="text-gray-700 hover:text-blue-600 font-medium">Docs</Link>
              {/* <Link to="/careers" className="text-gray-700 hover:text-blue-600 font-medium">Careers</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium">About Us</Link> */}
              {user && (
                <Link to="/system/ranking" className="text-gray-700 hover:text-blue-600 font-medium">
                  Community Demo
                </Link>
              )}
              {user ? (
                <Button variant="outline" asChild>
                  <Link to="/logout">Logout</Link>
                </Button>
              ) : (
                <Button variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              )}
            </nav>
            {/* Mobile Menu Icon */}
            <button
              className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Open menu"
              type="button"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t shadow-sm">
            <nav className="flex flex-col px-4 py-2 space-y-2">
              <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Home</Link>
              <Link to="" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Engineer System</Link>
              <Link to="/careers" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>Careers</Link>
              <Link to="/about" className="text-gray-700 hover:text-blue-600 font-medium" onClick={() => setMenuOpen(false)}>About Us</Link>
              {user ? (
                <Button variant="outline" asChild className="w-full">
                  <Link to="/logout" onClick={() => setMenuOpen(false)}>Logout</Link>
                </Button>
              ) : (
                <Button variant="outline" asChild className="w-full">
                  <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                </Button>
              )}
            </nav>
          </div>
        )}
      </header>
      {/* メインコンテンツ */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
} 