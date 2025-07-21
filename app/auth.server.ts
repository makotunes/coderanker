import { Authenticator, Strategy } from "remix-auth";
// import { GoogleStrategy } from "remix-auth-google";
import { sessionStorage } from "~/db/session.server";
import { db } from "~/db/db.server"
import { users } from "./db/schema";
import { eq } from "drizzle-orm";
// import { nanoid } from "nanoid";
import type { User } from "./db/schema";
import bcrypt from "bcryptjs";
import type { SessionStorage } from "@remix-run/server-runtime";
import type { SessionData } from "@remix-run/server-runtime";
import type { AuthenticateOptions } from "remix-auth";
// import { DynamicGameBalance } from "./utils/DynamicGameBalance.server";

// Create an instance of the authenticator
export const authenticator = new Authenticator<User>(sessionStorage);


export async function requireUser(request: Request) {
  const user = await authenticator.isAuthenticated(request);

  if (!user) {
    throw new Response("Unauthorized", { status: 401 });
  }
  return user;
}

// Configure custom form strategy for email authentication
class FormStrategy extends Strategy<User, never> {
  name = "form";
  constructor() {
    super();
  }

  async authenticate(
    request: Request,
    sessionStorage: SessionStorage<SessionData, SessionData>,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _options: AuthenticateOptions
  ): Promise<User> {
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      throw new Error("Email and password are required");
    }

    // ユーザーが存在するか確認
    const user = await db.query.users.findFirst({
      where: eq(users.email, email.toString()),
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // パスワードの検証
    if (!user.password || !(await bcrypt.compare(password.toString(), user.password))) {
      throw new Error("Invalid credentials");
    }

    // セッションにユーザー情報を保存
    const session = await sessionStorage.getSession(request.headers.get("Cookie"));
    session.set("user", user);
    const headers = new Headers();
    headers.append("Set-Cookie", await sessionStorage.commitSession(session));

    return user;
  }
}

// Register the strategies
authenticator.use(new FormStrategy(), "form"); 