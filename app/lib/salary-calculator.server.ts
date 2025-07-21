import { db } from "~/db/db.server";
import { baseSalaryConfigs, incentiveConfigs, allowanceConfigs } from "~/db/schema";
import { eq, lte, desc, and } from "drizzle-orm";
import type { User } from "~/db/schema";

// 指定月の基本給を取得
export async function getBaseSalary(role: string, tier: string, targetMonth: string): Promise<number> {
  const config = await db
    .select()
    .from(baseSalaryConfigs)
    .where(
      and(
        eq(baseSalaryConfigs.role, role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR"),
        eq(baseSalaryConfigs.tier, tier as "T0" | "T1" | "T2" | "T3" | "T4" | "T5" | "T6" | "T7"),
        lte(baseSalaryConfigs.effectiveMonth, targetMonth)
      )
    )
    .orderBy(desc(baseSalaryConfigs.effectiveMonth), desc(baseSalaryConfigs.createdAt))
    .limit(1);

  return config[0]?.baseSalary || 0;
}

// 指定月のインセンティブ設定を取得（ロールごと）
export async function getIncentiveConfig(targetMonth: string, role: string): Promise<{ minIncentive: number; maxIncentive: number } | null> {
  const config = await db
    .select()
    .from(incentiveConfigs)
    .where(
      and(
        eq(incentiveConfigs.role, role as "CORP" | "ENGINEER" | "DESIGNER" | "OPERATOR"),
        lte(incentiveConfigs.effectiveMonth, targetMonth)
      )
    )
    .orderBy(desc(incentiveConfigs.effectiveMonth), desc(incentiveConfigs.createdAt))
    .limit(1);

  if (!config[0]) return null;

  return {
    minIncentive: config[0].minIncentive,
    maxIncentive: config[0].maxIncentive
  };
}

// 指定月の手当を取得
export async function getAllowance(employmentType: string, targetMonth: string): Promise<number> {
  const config = await db
    .select()
    .from(allowanceConfigs)
    .where(
      eq(allowanceConfigs.employmentType, employmentType as "Employee" | "Contracted") &&
      lte(allowanceConfigs.effectiveMonth, targetMonth)
    )
    .orderBy(desc(allowanceConfigs.effectiveMonth), desc(allowanceConfigs.createdAt))
    .limit(1);

  return config[0]?.allowance || 0;
}

// 給与計算関数（データベース設定を使用）
export async function calculateSalaryWithConfig(
  user: Pick<User, "role" | "tier" | "employmentType">, 
  totalPoints: number = 0,
  allUsersPoints: number[] = [],
  targetMonth: string,
  allUsers?: Array<Pick<User, "role" | "tier" | "employmentType"> & { monthlyTotalPoints: number }>
) {
  // ADMINは給与計算対象外
  if (user.role === "ADMIN") {
    return {
      baseSalary: 0,
      monthlyTotalPoints: 0,
      incentiveAmount: 0,
      monthlyReward: 0,
      allowance: 0,
      grossAmount: 0,
      netAmount: 0
    };
  }

  // 基本給を取得
  const baseSalary = await getBaseSalary(user.role, user.tier, targetMonth);
  
  // 月額総合ポイント
  const monthlyTotalPoints = totalPoints;
  
  // インセンティブ設定をロールごとに取得
  const incentiveConfig = await getIncentiveConfig(targetMonth, user.role);
  
  // ロールごとのユーザーのみで相対評価
  let incentiveAmount = 0;
  if (incentiveConfig && allUsers && allUsers.length > 0) {
    const sameRoleUsers = allUsers.filter(u => u.role === user.role);
    const sameRolePoints = sameRoleUsers.map(u => u.monthlyTotalPoints || 0);
    const maxPoints = Math.max(...sameRolePoints);
    const minPoints = Math.min(...sameRolePoints);
    const pointRange = maxPoints - minPoints;
    if (pointRange > 0) {
      const relativePosition = (monthlyTotalPoints - minPoints) / pointRange;
      incentiveAmount = Math.round(incentiveConfig.minIncentive + (relativePosition * (incentiveConfig.maxIncentive - incentiveConfig.minIncentive)));
    } else {
      incentiveAmount = Math.round((incentiveConfig.minIncentive + incentiveConfig.maxIncentive) / 2);
    }
  }
  
  // 月額報酬（基本給 + インセンティブ給）
  const monthlyReward = baseSalary + incentiveAmount;
  
  // 手当を取得
  let allowance = await getAllowance(user.employmentType, targetMonth);
  allowance = user.employmentType === "Employee" ? 400 : 0;
  
  // 月額額面同額（報酬 + 手当）
  const grossAmount = monthlyReward + allowance;
  
  // 月額支払い総額（90%）
  const netAmount = Math.floor(grossAmount * 0.9);

  // console.log({
  //   baseSalary,
  //   monthlyTotalPoints,
  //   incentiveAmount,
  //   monthlyReward,
  //   allowance,
  //   grossAmount,
  //   netAmount
  // })
  
  return {
    baseSalary,
    monthlyTotalPoints,
    incentiveAmount,
    monthlyReward,
    allowance,
    grossAmount,
    netAmount
  };
}

// 従来の給与計算関数（後方互換性のため）
export function calculateSalary(
  user: Pick<User, "role" | "tier" | "monthlySalary" | "employmentType">, 
  totalPoints: number = 0,
  allUsersPoints: number[] = []
) {
  // 月額基本給（スキーマのmonthlySalary）
  const baseSalary = user.monthlySalary;
  
  // 月額総合ポイント（月次evaluationの総和）
  const monthlyTotalPoints = totalPoints;
  
  // 月額インセンティブ給（全ユーザーとの相対比較）
  let incentiveAmount = 0;
  if (allUsersPoints.length > 0) {
    const maxPoints = Math.max(...allUsersPoints);
    const minPoints = Math.min(...allUsersPoints);
    const pointRange = maxPoints - minPoints;
    
    if (pointRange > 0) {
      // 相対的な位置を計算（0-1の範囲）
      const relativePosition = (monthlyTotalPoints - minPoints) / pointRange;
      // 10000-50000タカの範囲にマッピング
      incentiveAmount = Math.round(10000 + (relativePosition * 40000));
    } else {
      // 全員同じポイントの場合は平均値
      incentiveAmount = 30000;
    }
  }
  
  // 月額報酬（基本給 + インセンティブ給）
  const monthlyReward = baseSalary + incentiveAmount;
  
  // 手当（Employeeの場合+400タカ）
  const allowance = user.employmentType === "Employee" ? 400 : 0;
  
  // 月額額面同額（報酬 + 手当）
  const grossAmount = monthlyReward + allowance;
  
  // 月額支払い総額（90%）
  const netAmount = Math.floor(grossAmount * 0.9);
  
  return {
    baseSalary,
    monthlyTotalPoints,
    incentiveAmount,
    monthlyReward,
    allowance,
    grossAmount,
    netAmount
  };
} 