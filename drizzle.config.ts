import { defineConfig } from "drizzle-kit";

// .envファイルから環境変数を読み込むためにdotenvを実行します。
// ただしimport文はこの位置では書けないため、下記のように記述します。
require("dotenv").config();


export default defineConfig({
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "turso",
  dbCredentials: {
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN!,
  },
  verbose: true,
  strict: true,
}); 