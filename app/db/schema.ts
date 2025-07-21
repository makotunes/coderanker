import { 
  text, 
  sqliteTable, 
  uniqueIndex,
  blob,
  real,
  integer,
  unique
} from "drizzle-orm/sqlite-core";

// ユーザーテーブル
export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  password: text('password').notNull(),
  name: text("name").notNull(),
  role: text("role", { enum: ["ADMIN", "CORP", "ENGINEER", "DESIGNER", "OPERATOR", "REQUESTOR", "SUPERUSER"] }).notNull(),
  tier: text("tier", { enum: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7", "TZ"] }).notNull(),
  monthlySalary: integer("monthly_salary").notNull(), // 月額給与
  employmentType: text("employment_type", { enum: ["Employee", "Contracted", "Exective", "Assignee", "Guest"] }).notNull().default("Employee"), // 稼働形態
  profile: blob("profile", { mode: "json" }).$type<{
    skills?: string[];
    preferences?: {
      totalPoints?: number;
      completedProjects?: number;
      averageScore?: number;
    };
  }>(),
  retiredAt: text("retired_at"), // 退職日（論理削除用）
  capabilityManagerId: text("capability_manager_id"), // Capability評価者ID
  projectManagerId: text("project_manager_id"), // Project評価者ID
  skill: text("skill"), // スキル（カンマ区切り等）
  joiningDate: text("joining_date"), // 入社日
  isReferenceSalary: integer("is_reference_salary", { mode: "boolean" }), // 参考給与フラグ
  fte: real("fte"), // FTE値
  isEvaluated: integer("is_evaluated", { mode: "boolean" }), // 評価区分
  title: text("title"), // 役職名
  department: text("department"), // 部署名
  number: text("number"), // 社員番号
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  emailIdx: uniqueIndex("users_email_idx").on(table.email),
}));

// 基本給テーブル設定履歴
export const baseSalaryConfigs = sqliteTable("base_salary_configs", {
  id: text("id").primaryKey(),
  role: text("role", { enum: ["CORP", "ENGINEER", "DESIGNER", "OPERATOR"] }).notNull(),
  tier: text("tier", { enum: ["T0", "T1", "T2", "T3", "T4", "T5", "T6", "T7"] }).notNull(),
  baseSalary: integer("base_salary").notNull(), // 基本給（タカ単位）
  effectiveMonth: text("effective_month").notNull(), // 適用月: 2024-04
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  roleTierMonthIdx: uniqueIndex("base_salary_role_tier_month_idx").on(table.role, table.tier, table.effectiveMonth),
}));

// インセンティブ給レンジ設定履歴
export const incentiveConfigs = sqliteTable("incentive_configs", {
  id: text("id").primaryKey(),
  role: text("role", { enum: ["CORP", "ENGINEER", "DESIGNER", "OPERATOR"] }).notNull(), // "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR"
  minIncentive: integer("min_incentive").notNull(), // 最小インセンティブ（タカ単位）
  maxIncentive: integer("max_incentive").notNull(), // 最大インセンティブ（タカ単位）
  effectiveMonth: text("effective_month").notNull(), // 適用月: 2024-04
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
},
  (table) => ({
    uniqueMonthRole: unique().on(table.effectiveMonth, table.role),
  })
);

// 手当設定履歴
export const allowanceConfigs = sqliteTable("allowance_configs", {
  id: text("id").primaryKey(),
  employmentType: text("employment_type", { enum: ["Employee", "Contracted"] }).notNull(),
  allowance: integer("allowance").notNull(), // 手当（タカ単位）
  effectiveMonth: text("effective_month").notNull(), // 適用月: 2024-04
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  typeMonthIdx: uniqueIndex("allowance_type_month_idx").on(table.employmentType, table.effectiveMonth),
}));

// 週次プレ評価テーブル（評価者が行う週次評価）
export const weeklyPreEvaluations = sqliteTable("weekly_pre_evaluations", {
  id: text("id").primaryKey(),
  evaluatorId: text("evaluator_id").notNull(), // 評価者ID
  evaluateeId: text("evaluatee_id").notNull(), // 被評価者ID
  week: text("week").notNull(), // 評価対象週: 2024-W27
  evaluationType: text("evaluation_type", { enum: ["quality", "quantity", "satisfaction", "penalty", "bonus"] }).notNull(), // 評価種類
  evaluatorRole: text("evaluator_role", { 
    enum: ["capability_supervisor", "project_supervisor", "admin"] 
  }).notNull(), // 評価者役割
  
  // 成果物品質評価（capability_supervisor）
  qualityScore: real("quality_score"), // 成果品質スコア（0-100）
  requirementCoverage: real("requirement_coverage"), // 要件カバレッジ（0-100）
  testCoverage: real("test_coverage"), // テストカバレッジ（0-100）
  seniorReviewScore: real("senior_review_score"), // シニアレビュー（0-100）
  aiCrossEvaluation: real("ai_cross_evaluation"), // AI横断評価（0-100）
  
  // 成果量評価（quantity）
  quantityPoints: real("quantity_points"), // 成果量ポイント（絶対値）
  commitQuality: real("commit_quality"), // コミット品質（0-100）
  processConsistency: real("process_consistency"), // プロセス一貫性（0-100）
  developmentRhythm: real("development_rhythm"), // 開発リズム（0-100）
  problemSolvingApproach: real("problem_solving_approach"), // 問題解決アプローチ（0-100）
  functionFp: integer("function_fp"),
  addedLines: integer("added_lines"),
  deletedLines: integer("deleted_lines"),
  commitCount: integer("commit_count"),
  
  // 依頼者評価（project_supervisor）
  satisfactionScore: real("satisfaction_score"), // 依頼者満足度（0-100）
  requirementAlignment: real("requirement_alignment"), // 要件一致性（0-100）
  processQuality: real("process_quality"), // プロセス品質（0-100）
  businessValue: real("business_value"), // ビジネス価値（0-100）
  usability: real("usability"), // 使いやすさ（0-100）
  
  // ペナルティ評価（admin）
  penaltyPoints: real("penalty_points"), // ペナルティポイント（負の値）
  penaltyRate: real("penalty_rate"),
  penaltyReason: text("penalty_reason"),
  bonusPoints: integer("bonus_points"),
  bonusReason: text("bonus_reason"),
  
  // 共通フィールド
  comments: text("comments"), // 評価コメント
  status: text("status", { 
    enum: ["pending", "completed", "overdue"] 
  }).notNull().default("pending"), // 評価ステータス
  dueDate: text("due_date").notNull(), // 評価期限
  completedAt: text("completed_at"), // 完了日時
  
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  evaluatorEvaluateeWeekTypeIdx: uniqueIndex("weekly_pre_evaluations_evaluator_evaluatee_week_type_idx").on(table.evaluatorId, table.evaluateeId, table.week, table.evaluationType),
}));

// 評価テーブル（週次のみ）
export const evaluations = sqliteTable("evaluations", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull(),
  week: text("week").notNull(), // 週次: 2024-W27
  month: text("month").notNull(), // 月次: 2024-04
  half: text("half").notNull(), // 半期: 2024-FirstHalf
  evaluationType: text("evaluation_type", { enum: ["weekly", "monthly", "half"] }).notNull().default("weekly"), // 評価タイプ
  qualityScore: real("quality_score"), // 成果品質スコア
  quantityPoints: real("quantity_points"), // 成果量ポイント
  satisfactionScore: real("satisfaction_score"), // 依頼者満足度スコア
  totalPoints: real("total_points"), // 総合ポイント
  processQualityScore: real("process_quality_score"), // プロセス品質スコア
  consistencyScore: real("consistency_score"), // 継続性スコア
  completedProjects: integer("completed_projects"), // 完了プロジェクト数
  salary: integer("salary"), // 給与
  trend: text("trend"), // トレンド
  // --- 評価詳細ブレークダウン ---
  requirementCoverage: real("requirement_coverage"),
  testCoverage: real("test_coverage"),
  seniorReviewScore: real("senior_review_score"),
  aiCrossEvaluation: real("ai_cross_evaluation"),
  commitQuality: real("commit_quality"),
  processConsistency: real("process_consistency"),
  developmentRhythm: real("development_rhythm"),
  problemSolvingApproach: real("problem_solving_approach"),
  functionFp: integer("function_fp"), // ファンクションポイント
  addedLines: integer("added_lines"), // 追加行数
  deletedLines: integer("deleted_lines"), // 削除行数
  commitCount: integer("commit_count"), // コミット数
  requirementAlignment: real("requirement_alignment"),
  processQuality: real("process_quality"),
  businessValue: real("business_value"),
  usability: real("usability"),
  penaltyPoints: real("penalty_points"), // ペナルティポイント
  penaltyRate: real("penalty_rate"), // ペナルティ率
  penaltyReason: text("penalty_reason"), // ペナルティ理由
  bonusPoints: integer("bonus_points"), // ボーナスポイント
  bonusReason: text("bonus_reason"), // ボーナス理由
  comments: text("comments"), // コメント
  processMetrics: blob("process_metrics", { mode: "json" }), // プロセスメトリクス
  recentProjects: blob("recent_projects", { mode: "json" }), // 最近のプロジェクト
  evaluationHistory: blob("evaluation_history", { mode: "json" }), // 評価履歴
  createdAt: text("created_at").notNull(),
  updatedAt: text("updated_at").notNull(),
}, (table) => ({
  userWeekIdx: uniqueIndex("evaluations_user_week_idx").on(table.userId, table.week),
}));

export type User = typeof users.$inferSelect;
export type Evaluation = typeof evaluations.$inferSelect;
export type WeeklyPreEvaluation = typeof weeklyPreEvaluations.$inferSelect;
export type BaseSalaryConfig = typeof baseSalaryConfigs.$inferSelect;
export type IncentiveConfig = typeof incentiveConfigs.$inferSelect;
export type AllowanceConfig = typeof allowanceConfigs.$inferSelect;
