import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "@remix-run/react";
import AppLayout from "~/components/layout";
import PublicLayout from "~/components/public-layout";
import { Toaster } from "~/components/ui/toaster";
import "./tailwind.css";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { authenticator } from "~/auth.server";
// import { db } from "~/db/db"
// import { users } from "./db/schema";
// import { eq } from "drizzle-orm";


export const meta: MetaFunction = () => {
  return [
    { title: "Code Ranker" },
    { name: "description", content: "AI Native HR evaluation platform" },
  ];
};

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  // console.log(request.headers)
  const url = new URL(request.url);

  // console.log(user)

  // 認証が不要なパスを定義
  const authPaths = [
    "/login", 
    "/signup", 
    "/auth/google", 
    "/auth/google/callback",
  ];
  const publicPaths = ["/docs","/register", "/about", "/careers", "/contact"];

  const isAuthPath = authPaths.some(path => url.pathname.startsWith(path));
  const isPublicPath = publicPaths.some(path => url.pathname.startsWith(path));

  if (isPublicPath || url.pathname==="/") {
    return { user };
  }
  if (isAuthPath && user) {
    return redirect("/system/ranking");
  }
  if (!isAuthPath && !user) {
    return redirect("/login");
  }

  // DBでの存在を確認し、いなければ、loginにリダイレクト
  // if (user) {
  //   const dbUser = await db.query.users.findFirst({
  //     where: eq(users.id, user.id),
  //   });
  //   // console.log(dbUser)
  //   if (!dbUser) {
  //     // DBにユーザーが存在しなければloginにリダイレクト
  //     throw new Response("", {
  //       status: 302,
  //       headers: { Location: "/login" },
  //     });
  //   }
  // }

  return json({ 
    user,
    disableLiveReload: process.env.DISABLE_LIVE_RELOAD === 'true'
  });
}

function AppContent() {
  const location = useLocation();
  const isPublicPage = location.pathname === "/" || 
                      location.pathname.startsWith("/docs") || 
                      location.pathname === "/login" || 
                      location.pathname === "/register" ||
                      location.pathname === "/careers" ||
                      location.pathname === "/contact" ||
                      location.pathname === "/about";
  if (isPublicPage) {
    return (
      <PublicLayout>
        <Outlet />
      </PublicLayout>
    );
  }
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
}

export default function App() {
  return (
    <html lang="ja" className="h-full">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="h-full bg-background">
        <AppContent />
        <Toaster />
        <ScrollRestoration />
        <Scripts />
        {/* <LiveReload /> */}
      </body>
    </html>
  );
} 