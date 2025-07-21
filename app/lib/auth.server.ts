import { redirect } from "@remix-run/node";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { authenticator } from "~/auth.server";

export async function requireUser(request: Request) {
  
  // const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  const user = await authenticator.isAuthenticated(request);
  if (!user) {
    throw redirect("/login");
  }

  // DBでの存在を確認し、いなければ、loginにリダイレクト
  if (user) {
    const dbUser = await db.query.users.findFirst({
      where: eq(users.id, user.id),
    });
    // console.log(dbUser)
    if (!dbUser) {
      // DBにユーザーが存在しなければloginにリダイレクト
      // セッション(cookie)を削除してリダイレクト
      const session = await authenticator.sessionStorage.getSession(request.headers.get("Cookie"));
      const headers = new Headers();
      headers.append("Set-Cookie", await authenticator.sessionStorage.destroySession(session));
      throw new Response("", {
        status: 302,
        headers: { Location: "/login", "Set-Cookie": headers.get("Set-Cookie")! },
      });
      throw new Response("", {
        status: 302,
        headers: { Location: "/login" },
      });
    }
  }
  
  return user;
}

export async function authenticateUser(email: string, password: string) {
  const user = await db.select().from(users).where(eq(users.email, email)).limit(1);
  
  if (!user.length) {
    return null;
  }
  
  const isValid = await bcrypt.compare(password, user[0].password);
  
  if (!isValid) {
    return null;
  }
  
  return user[0];
}
