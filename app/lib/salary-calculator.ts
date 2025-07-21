// サーバーサイド専用の給与計算関数を再エクスポート
export { 
  calculateSalaryWithConfig,
  calculateSalary,
  getBaseSalary,
  getIncentiveConfig,
  getAllowance
} from "./salary-calculator.server"; 