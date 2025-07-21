import { createClient } from "@libsql/client";
import dotenv from "dotenv";
import { existsSync, rmSync } from "fs";
import path from "path";
dotenv.config();

const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  throw new Error("TURSO_DATABASE_URL or DATABASE_URL is required");
}

const client = createClient({ url, authToken });

async function resetTurso() {
  console.log("🗑️ TURSO上の全テーブルを削除します...");
  // テーブル一覧取得
  const tablesRes = await client.execute(
    `SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%';`
  );
  const tables = tablesRes.rows.map((row) => row.name as string);

  // drizzleのマイグレーション管理テーブルも必ずDROP
  if (!tables.includes("__drizzle_migrations")) {
    tables.push("__drizzle_migrations");
  }

  for (const table of tables) {
    console.log(`DROP TABLE IF EXISTS ${table}`);
    await client.execute(`DROP TABLE IF EXISTS ${table};`);
  }
  console.log("✅ TURSO上の全テーブルを削除しました");
  await client.close();

  // drizzle/metaディレクトリも削除
  const metaPath = path.resolve(process.cwd(), "drizzle/meta");
  if (existsSync(metaPath)) {
    rmSync(metaPath, { recursive: true, force: true });
    console.log("✅ drizzle/meta 削除: ", metaPath);
  } else {
    console.log("(drizzle/metaは存在しません)");
  }

  console.log("🎉 TURSOリセット完了！（マイグレーションは別途実行してください）");
}

resetTurso().catch((e) => {
  console.error(e);
  process.exit(1);
}); 