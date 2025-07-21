import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client/web";
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as dotenv from 'dotenv';
import * as schema from './schema';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

dotenv.config();

// グローバル変数でDBインスタンスをキャッシュ
let db: LibSQLDatabase<typeof schema> | BetterSQLite3Database<typeof schema>;
let dbInitialized = false;

// TURSOの環境変数が設定されている場合はTursoを使用
if (process.env.TURSO_DATABASE_URL && process.env.TURSO_AUTH_TOKEN) {
  const turso = createClient({
    url: process.env.TURSO_DATABASE_URL,
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  
  db = drizzle(turso, { 
    schema,
    // クエリタイムアウトを設定
    // logger: process.env.NODE_ENV === 'development'
  });
} else {
  // 環境変数が設定されていない場合はローカルのSQLiteを使用
  const sqlite = new Database('app/db/sqlite.db', { 
    // verbose: process.env.NODE_ENV === 'development' ? console.log : undefined 
  });
  db = drizzleSqlite(sqlite, { schema });
}

dbInitialized = true;

export { db };

// 接続状態を確認する関数
export function isDbConnected(): boolean {
  return dbInitialized;
}
