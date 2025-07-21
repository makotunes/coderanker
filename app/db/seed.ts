import { createClient } from "@libsql/client/web";
import { drizzle } from "drizzle-orm/libsql";
import { users, baseSalaryConfigs, incentiveConfigs, allowanceConfigs, weeklyPreEvaluations } from "./schema";
import { createId } from "@paralleldrive/cuid2";
import { config } from "dotenv";
import bcrypt from "bcryptjs";
import { parse } from "csv-parse/sync";
import fs from "fs";
import path from "path";

config();

// 直接DBクライアントを作成
const client = createClient({
  url: process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL || "file:local.db",
  authToken: process.env.TURSO_AUTH_TOKEN,
});

const db = drizzle(client, { schema: { users, baseSalaryConfigs, incentiveConfigs, allowanceConfigs, weeklyPreEvaluations } });

// 現在の週を取得する関数
function getCurrentWeek(): string {
  const now = new Date();
  const year = now.getFullYear();
  const startOfYear = new Date(year, 0, 1);
  const days = Math.floor((now.getTime() - startOfYear.getTime()) / (24 * 60 * 60 * 1000));
  const weekNumber = Math.ceil((days + startOfYear.getDay() + 1) / 7);
  return `${year}-W${weekNumber.toString().padStart(2, '0')}`;
}

// TSV値→スキーマEnum値変換関数
function normalizeRole(val: string): "ADMIN" | "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR" | "REQUESTOR" | "SUPERUSER" {
  const v = (val || "").toUpperCase();
  if (["ADMIN", "CORP", "ENGINEER", "DESIGNER", "OPERATOR", "REQUESTOR", "SUPERUSER"].includes(v)) return v as "ADMIN" | "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR" | "REQUESTOR" | "SUPERUSER";
  if (v === "COOP") return "CORP";
  if (v === "SUP" || v === "SUPERUSER") return "SUPERUSER";
  return "ENGINEER";
}
function normalizeTier(val: string): "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "TZ" {
  const v = (val || "T0").toUpperCase();
  if (["T0","T1","T2","T3","T4","T5","T6","T7","TZ"].includes(v)) return v as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7" | "TZ";
  return "T0";
}
function normalizeEmploymentType(val: string): "Employee" | "Contracted" | "Exective" | "Assignee" | "Guest" {
  const v = (val || "Employee").toLowerCase();
  if (["employee","contracted","exective","assignee","Guest"].includes(v)) return (v.charAt(0).toUpperCase() + v.slice(1)) as "Employee" | "Contracted" | "Exective" | "Assignee" | "Guest";
  if (v === "Employee") return "Employee";
  if (v === "Contracted") return "Contracted";
  return "Employee";
}

export async function seed() {
  console.log("🌱 Seeding database...");

  // パスワードをハッシュ化
  // デフォルトパスワードを環境変数から取得（なければ "password123" を使用）
  const defaultPassword = process.env.DEFAULT_PASSWORD || "password123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // 月額給与計算関数（タカ単位）
  function calculateMonthlySalary(role: string, tier: string): number {
    // 新レンジ
    const corpSalary = {
      "T0": 20000, "T1": 25000, "T2": 30000, "T3": 35000, "T4": 40000, "T5": 50000, "T6": 60000, "T7": 0,
    };
    const engineerSalary = {
      "T0": 20000, "T1": 26000, "T2": 32000, "T3": 38000, "T4": 44000, "T5": 53000, "T6": 68000, "T7": 83000,
    };
    const designerSalary = {
      "T0": 20000, "T1": 25000, "T2": 30000, "T3": 35000, "T4": 40000, "T5": 0, "T6": 0, "T7": 0,
    };
    const operatorSalary = designerSalary;

    if (role === "CORP") return corpSalary[tier as keyof typeof corpSalary] || 0;
    if (role === "ENGINEER") return engineerSalary[tier as keyof typeof engineerSalary] || 0;
    if (role === "DESIGNER") return designerSalary[tier as keyof typeof designerSalary] || 0;
    if (role === "OPERATOR") return operatorSalary[tier as keyof typeof operatorSalary] || 0;
    return 0;
  }

  // 給与設定の初期データを作成（2024-06月適用）
  const targetMonth = "2024-06";
  const now = new Date().toISOString();

  // 基本給設定
  const baseSalaryData = [];
  const rolesForSalary = ["CORP", "ENGINEER", "DESIGNER", "OPERATOR"] as const;
  
  for (const role of rolesForSalary) {
    for (const tier of ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"]) {
      const baseSalary = calculateMonthlySalary(role, tier);
      if (baseSalary > 0) {
        baseSalaryData.push({
          id: createId(),
          role: role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
          tier: tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7",
          baseSalary,
          effectiveMonth: targetMonth,
          createdAt: now,
          updatedAt: now,
        });
      }
    }
  }

  // インセンティブ設定（ロールごと）
  const incentiveRanges: Record<string, { min: number; max: number }> = {
    ENGINEER: { min: 0, max: 60000 },
    CORP: { min: 0, max: 10000 },
    DESIGNER: { min: 0, max: 20000 },
    OPERATOR: { min: 0, max: 20000 },
  };
  const incentiveData = Object.entries(incentiveRanges).map(([role, range]) => ({
    id: createId(),
    role: role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR",
    minIncentive: range.min,
    maxIncentive: range.max,
    effectiveMonth: targetMonth,
    createdAt: now,
    updatedAt: now,
  }));

  // 手当設定
  const allowanceData = [
    {
      id: createId(),
      employmentType: "Employee" as const,
      allowance: 400,
      effectiveMonth: targetMonth,
      createdAt: now,
      updatedAt: now,
    },
    {
      id: createId(),
      employmentType: "Contracted" as const,
      allowance: 0,
      effectiveMonth: targetMonth,
      createdAt: now,
      updatedAt: now,
    },
  ];

  // 給与設定をDBに挿入
  await db.insert(baseSalaryConfigs).values(baseSalaryData);
  await db.insert(incentiveConfigs).values(incentiveData);
  await db.insert(allowanceConfigs).values(allowanceData);

  console.log("✅ Salary configurations seeded successfully!");

  // --- usersテーブルのシードは .user.seed.tsv を参照 ---
  const userTsvPath = path.resolve(process.cwd(), ".user.seed.tsv");
  const userTsvContent = fs.readFileSync(userTsvPath, "utf-8");
  const userRecords: Record<string, string>[] = parse(userTsvContent, { columns: true, delimiter: "\t", skip_empty_lines: true });

  function parseBool(val: string | undefined): boolean | undefined {
    if (val === undefined || val === null || val === "") return undefined;
    if (val === "1" || val.toLowerCase() === "true" || val === "Yes") return true;
    if (val === "0" || val.toLowerCase() === "false" || val === "No") return false;
    return undefined;
  }

  const usersData = userRecords.map((row) => {
    return {
      id: createId(),
      name: row["Name"] || "",
      email: row["email"] || row["Email"] || "",
      password: hashedPassword,
      role: normalizeRole(row["Role"] || "ENGINEER"),
      tier: normalizeTier(row["Tier"] || "T0"),
      monthlySalary: row["Reference Salary"] ? parseInt(row["Reference Salary"].replace(/,/g, "")) : 0,
      employmentType: normalizeEmploymentType(row["employmentType"] || "Employee"),
      profile: { skills: row["Skill"] ? row["Skill"].split(/,|\//).map((s) => s.trim()) : [] },
      retiredAt: null,
      capabilityManagerId: null,
      projectManagerId: null,
      skill: row["Skill"] || "",
      joiningDate: row["Joining date"] || "",
      isReferenceSalary: parseBool(row["isReferenceSalary"]) ?? undefined,
      fte: row["FTE"] ? parseFloat(row["FTE"]) : undefined,
      isEvaluated: row["isEvaluated"] === "1" ? true : false,
      title: row["Title"] || "",
      department: row["Department"] || "",
      number: row["Number"] || "",
      createdAt: (() => {
        const jd = row["Joining date"];
        if (jd && !isNaN(Date.parse(jd))) {
          return new Date(jd).toISOString();
        } else {
          return "2025-01-01T00:00:00.000Z";
        }
      })(),
      updatedAt: new Date().toISOString(),
    };
  });

  // usersテーブルに一括insert
  await db.insert(users).values(usersData);
  console.log(`✅ Seeded ${usersData.length} users from .user.seed.tsv`);

  // 週次プレ評価データを生成（現在の週のみ）
  const currentWeek = getCurrentWeek();
  const preEvaluationList: Array<{
    id: string;
    evaluatorId: string;
    evaluateeId: string;
    week: string;
    evaluationType: "quality" | "quantity" | "satisfaction" | "penalty";
    evaluatorRole: "admin" | "capability_supervisor" | "project_supervisor";
    status: "pending" | "completed" | "overdue";
    dueDate: string;
    completedAt: string | null;
    // 成果物品質評価
    qualityScore: number | null;
    requirementCoverage: number | null;
    testCoverage: number | null;
    seniorReviewScore: number | null;
    aiCrossEvaluation: number | null;
    // 成果量評価
    quantityPoints: number | null;
    commitQuality: number | null;
    processConsistency: number | null;
    developmentRhythm: number | null;
    problemSolvingApproach: number | null;
    // 依頼者評価
    satisfactionScore: number | null;
    requirementAlignment: number | null;
    processQuality: number | null;
    businessValue: number | null;
    usability: number | null;
    // ペナルティ評価
    penaltyPoints: number | null;
    penaltyReason: string | null;
    // 共通
    comments: string | null;
    createdAt: string;
    updatedAt: string;
  }> = [];

  // 評価者と被評価者のマッピングを作成
  const evaluatorMapping = new Map<string, string[]>();
  
  // ADMINは全ユーザーを評価
  evaluatorMapping.set(usersData.find(u => u.role === "ADMIN")?.id || "", usersData.filter(u => u.id !== usersData.find(u => u.role === "ADMIN")?.id).map(u => u.id));
  
  // CORPユーザーはENGINEERとDESIGNERを評価（Capabilityライン上司）
  const corpUsers = usersData.filter(u => u.role === "CORP");
  const engineersAndDesigners = usersData.filter(u => (u.role === "ENGINEER" || u.role === "DESIGNER"));
  
  corpUsers.forEach(corpUser => {
    // 各CORPユーザーが2-4人のENGINEER/DESIGNERを評価
    const evaluatees = engineersAndDesigners
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 2)
      .map(u => u.id);
    evaluatorMapping.set(corpUser.id, evaluatees);
  });
  
  // ENGINEERユーザーは他のENGINEERを評価（Projectライン上司）
  const engineerUsers = usersData.filter(u => u.role === "ENGINEER");
  engineerUsers.forEach(engineerUser => {
    // 各ENGINEERユーザーが1-3人の他のENGINEERを評価
    const otherEngineers = engineerUsers.filter(u => u.id !== engineerUser.id);
    const evaluatees = otherEngineers
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.floor(Math.random() * 3) + 1)
      .map(u => u.id);
    evaluatorMapping.set(engineerUser.id, evaluatees);
  });

  // 評価タイプの配列
  const evaluationTypes: ("quality" | "quantity" | "satisfaction" | "penalty")[] = ["quality", "quantity", "satisfaction", "penalty"];
  
  // 各評価者について評価タスクを生成
  for (const [evaluatorId, evaluateeIds] of evaluatorMapping) {
    for (const evaluateeId of evaluateeIds) {
      // 各被評価者に対して1種類の評価のみをランダムに割り当て（UNIQUE制約を回避）
      const selectedType = evaluationTypes[Math.floor(Math.random() * evaluationTypes.length)];
      
      // 評価者の役割を決定
      const evaluator = usersData.find(u => u.id === evaluatorId);
      let evaluatorRole: "admin" | "capability_supervisor" | "project_supervisor";
      
      if (evaluator?.role === "ADMIN") {
        evaluatorRole = "admin";
      } else if (evaluator?.role === "CORP") {
        evaluatorRole = "capability_supervisor";
      } else {
        evaluatorRole = "project_supervisor";
      }
      
      // ステータスをランダムに決定（70%がpending、20%がcompleted、10%がoverdue）
      const statusRandom = Math.random();
      let status: "pending" | "completed" | "overdue";
      if (statusRandom < 0.7) {
        status = "pending";
      } else if (statusRandom < 0.9) {
        status = "completed";
      } else {
        status = "overdue";
      }
      
      // 期限日を設定（現在から1-7日後）
      const dueDate = new Date();
      dueDate.setDate(dueDate.getDate() + Math.floor(Math.random() * 7) + 1);
      
      // 完了日を設定（完了済みの場合）
      const completedAt = status === "completed" ? new Date().toISOString() : null;
      
      // 評価データを生成（完了済みの場合のみ）
      let qualityScore = null;
      let requirementCoverage = null;
      let testCoverage = null;
      let seniorReviewScore = null;
      let aiCrossEvaluation = null;
      let quantityPoints = null;
      let commitQuality = null;
      let processConsistency = null;
      let developmentRhythm = null;
      let problemSolvingApproach = null;
      let satisfactionScore = null;
      let requirementAlignment = null;
      let processQuality = null;
      let businessValue = null;
      let usability = null;
      let penaltyPoints = null;
      let penaltyReason = null;
      let comments = null;
      
      if (status === "completed") {
        // 評価タイプに応じてデータを生成
        switch (selectedType) {
          case "quality":
            qualityScore = Math.round((70 + Math.random() * 30) * 100) / 100;
            requirementCoverage = Math.round((70 + Math.random() * 30) * 100) / 100;
            testCoverage = Math.round((70 + Math.random() * 30) * 100) / 100;
            seniorReviewScore = Math.round((70 + Math.random() * 30) * 100) / 100;
            aiCrossEvaluation = Math.round((70 + Math.random() * 30) * 100) / 100;
            comments = "成果物品質評価を実施しました。全体的に良好な品質を維持できています。";
            break;
          case "quantity":
            quantityPoints = Math.floor(Math.random() * 2000) + 500;
            commitQuality = Math.round((70 + Math.random() * 30) * 100) / 100;
            processConsistency = Math.round((70 + Math.random() * 30) * 100) / 100;
            developmentRhythm = Math.round((70 + Math.random() * 30) * 100) / 100;
            problemSolvingApproach = Math.round((70 + Math.random() * 30) * 100) / 100;
            comments = "成果量評価を実施しました。安定した開発リズムを維持できています。";
            break;
          case "satisfaction":
            satisfactionScore = Math.round((70 + Math.random() * 30) * 100) / 100;
            requirementAlignment = Math.round((70 + Math.random() * 30) * 100) / 100;
            processQuality = Math.round((70 + Math.random() * 30) * 100) / 100;
            businessValue = Math.round((70 + Math.random() * 30) * 100) / 100;
            usability = Math.round((70 + Math.random() * 30) * 100) / 100;
            comments = "依頼者評価を実施しました。要件に対する理解と実装が適切に行われています。";
            break;
          case "penalty":
            penaltyPoints = -(Math.floor(Math.random() * 100) + 50); // 負の値
            penaltyReason = "期限超過によりペナルティを適用しました。";
            comments = "ペナルティ評価を実施しました。今後の改善を期待します。";
            break;
        }
      }
      
      const preEvaluation = {
        id: createId(),
        evaluatorId,
        evaluateeId,
        week: currentWeek,
        evaluationType: selectedType,
        evaluatorRole,
        status,
        dueDate: dueDate.toISOString(),
        completedAt,
        qualityScore,
        requirementCoverage,
        testCoverage,
        seniorReviewScore,
        aiCrossEvaluation,
        quantityPoints,
        commitQuality,
        processConsistency,
        developmentRhythm,
        problemSolvingApproach,
        satisfactionScore,
        requirementAlignment,
        processQuality,
        businessValue,
        usability,
        penaltyPoints,
        penaltyReason,
        comments,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      preEvaluationList.push(preEvaluation);
    }
  }
  
  // await db.insert(weeklyPreEvaluations).values(preEvaluationList);

  console.log(`✅ Database seeded successfully! (${usersData.length} users)`);
  console.log(`📧 Admin user: ${usersData.find(u => u.role === "ADMIN")?.email} (${usersData.find(u => u.role === "ADMIN")?.name})`);
  // console.log(`🔑 Password for all users: `);
  console.log(`💰 Salary configurations created for ${targetMonth}`);
  console.log(`📊 Weekly pre-evaluations created: 0 tasks (commented out for batch testing)`);
}

// 直接実行時の処理
if (import.meta.url === `file://${process.argv[1]}`) {
  seed()
    .then(() => {
      console.log("シード完了");
      process.exit(0);
    })
    .catch((error) => {
      console.error("シードエラー:", error);
      process.exit(1);
    });
} 