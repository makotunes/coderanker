import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import { weeklyPreEvaluations, users } from "~/db/schema";
import { eq, and, gte, ne } from "drizzle-orm";

// 現在の週を取得する関数
function getCurrentWeek(): string {
  const now = new Date();
  const year = now.getFullYear();
  const week = Math.ceil((now.getTime() - new Date(year, 0, 1).getTime()) / (7 * 24 * 60 * 60 * 1000));
  return `${year}-W${week.toString().padStart(2, '0')}`;
}

export async function loader({ request }: LoaderFunctionArgs) {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET;
    if (!authHeader || !cronSecret || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== cronSecret) {
      throw new Response("Unauthorized", { status: 401 });
    }

  try {
    // 期限内の未評価のpre-evaluationを取得
    const now = new Date().toISOString();
    const pendingPreEvaluations = await db
      .select()
      .from(weeklyPreEvaluations)
      .where(
        and(
          eq(weeklyPreEvaluations.status, "pending"),
          gte(weeklyPreEvaluations.dueDate, now) // 期限内のもののみ
        )
      );

    console.log(`Found ${pendingPreEvaluations.length} pending pre-evaluations within deadline`);

    // ペナルティとボーナス評価を新規作成
    const allUsers = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        capabilityManagerId: users.capabilityManagerId,
        projectManagerId: users.projectManagerId,
      })
      .from(users)
      .where(
        and(
          ne(users.role, "ADMIN"),
          ne(users.role, "REQUESTOR")
        )
      );

    const currentWeek = getCurrentWeek();
    const createdPenaltyBonus = [];

    // ペナルティ評価を新規作成（一部のユーザーに対して）
    for (let i = 0; i < Math.min(3, allUsers.length); i++) {
      const user = allUsers[i];
      const penaltyId = `penalty-${user.id}-${currentWeek}-${Date.now()}-${i}`;
      
      try {
        // ペナルティ評価の値を生成
        const penaltyPoints = -(Math.floor(Math.random() * 20) + 10); // -10 to -29
        const penaltyRate = Math.floor(Math.random() * 20) + 10; // 10-29%
        
        await db.insert(weeklyPreEvaluations).values({
          id: penaltyId,
          evaluatorId: "admin-user-id", // ADMINユーザーID
          evaluateeId: user.id,
          week: currentWeek,
          evaluationType: "penalty",
          evaluatorRole: "admin",
          status: "completed",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1週間後
          completedAt: now,
          penaltyPoints: penaltyPoints,
          penaltyRate: penaltyRate,
          penaltyReason: "期限超過によるペナルティ",
          comments: "評価期限を超過したためペナルティが適用されました。",
          createdAt: now,
          updatedAt: now,
        });

        createdPenaltyBonus.push({
          type: "penalty",
          userId: user.id,
          userName: user.name,
          evaluationId: penaltyId,
          penaltyPoints: penaltyPoints,
          penaltyRate: penaltyRate
        });

        console.log(`Created completed penalty evaluation for user ${user.name}`);
      } catch (error) {
        console.error(`Error creating penalty evaluation for user ${user.name}:`, error);
      }
    }

    // ボーナス評価を新規作成（一部のユーザーに対して）
    for (let i = 0; i < Math.min(2, allUsers.length); i++) {
      const user = allUsers[allUsers.length - 1 - i]; // 後ろから選択
      const bonusId = `bonus-${user.id}-${currentWeek}-${Date.now()}-${i}`;
      
      try {
        // ボーナス評価の値を生成
        const bonusPoints = Math.floor(Math.random() * 20) + 10; // 10-29
        
        await db.insert(weeklyPreEvaluations).values({
          id: bonusId,
          evaluatorId: "admin-user-id", // ADMINユーザーID
          evaluateeId: user.id,
          week: currentWeek,
          evaluationType: "bonus",
          evaluatorRole: "admin",
          status: "completed",
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 1週間後
          completedAt: now,
          bonusPoints: bonusPoints,
          bonusReason: "優秀な成果に対するボーナス",
          comments: "期待を上回る優秀な成果を上げたためボーナスが適用されました。",
          createdAt: now,
          updatedAt: now,
        });

        createdPenaltyBonus.push({
          type: "bonus",
          userId: user.id,
          userName: user.name,
          evaluationId: bonusId,
          bonusPoints: bonusPoints
        });

        console.log(`Created completed bonus evaluation for user ${user.name}`);
      } catch (error) {
        console.error(`Error creating bonus evaluation for user ${user.name}:`, error);
      }
    }

    console.log(`Created ${createdPenaltyBonus.length} new penalty/bonus evaluations`);

    const results = [];

    for (const preEval of pendingPreEvaluations) {
      try {
        // 評価対象ユーザーを取得
        const evaluatedUser = await db
          .select()
          .from(users)
          .where(eq(users.id, preEval.evaluateeId))
          .limit(1);

        if (evaluatedUser.length === 0) {
          console.log(`User not found for evaluation ${preEval.id}`);
          continue;
        }

        const user = evaluatedUser[0];

        // 評価タイプに応じて評価を設定
        let updateData: Record<string, unknown> = {
          comments: "",
          status: "completed",
          completedAt: now,
          updatedAt: now
        };

        switch (preEval.evaluationType) {
          case "quality":
            // 品質評価の全パラメータを設定（system.evaluations.$id.tsxのフォーム構造に合わせる）
            // 要件定義・テストケース、網羅的・多層的実装、カバレッジ・品質保証、設計・セキュリティ・パフォーマンス、改善提案・総括
            updateData = {
              ...updateData,
              qualityScore: Math.floor(Math.random() * 20) + 70, // 70-89: 要件定義・テストケース
              requirementCoverage: Math.floor(Math.random() * 20) + 70, // 70-89: 網羅的・多層的実装
              testCoverage: Math.floor(Math.random() * 20) + 70, // 70-89: カバレッジ・品質保証
              seniorReviewScore: Math.floor(Math.random() * 20) + 70, // 70-89: 設計・セキュリティ・パフォーマンス
              aiCrossEvaluation: Math.floor(Math.random() * 20) + 70, // 70-89: 改善提案・総括
              comments: "コードの品質は良好です。適切なコーディング規約に従い、テストカバレッジも十分です。"
            };
            break;

          case "quantity":
            // 数量評価の全パラメータを設定（system.evaluations.$id.tsxのフォーム構造に合わせる）
            // 機能実装FP、追加コミット行数、削除コミット行数、コミット回数、機能実装量、要件対応度、開発プロセス
            updateData = {
              ...updateData,
              functionFp: Math.floor(Math.random() * 100) + 50, // 50-149: 機能実装FP
              addedLines: Math.floor(Math.random() * 1000) + 100, // 100-1099: 追加コミット行数
              deletedLines: Math.floor(Math.random() * 200) + 10, // 10-209: 削除コミット行数
              commitCount: Math.floor(Math.random() * 20) + 5, // 5-24: コミット回数
              quantityPoints: Math.floor(Math.random() * 20) + 70, // 70-89: 機能実装量（0-100スコア）
              commitQuality: Math.floor(Math.random() * 20) + 70, // 70-89: 要件対応度
              processConsistency: Math.floor(Math.random() * 20) + 70, // 70-89: 開発プロセス
              developmentRhythm: Math.floor(Math.random() * 20) + 70, // 70-89: 開発リズム
              problemSolvingApproach: Math.floor(Math.random() * 20) + 70, // 70-89: 問題解決アプローチ
              comments: "タスクの完了度は期待通りです。適切なペースで作業を進め、コミット頻度も良好です。"
            };
            break;

          case "satisfaction":
            // 満足度評価の全パラメータを設定（system.evaluations.$id.tsxのフォーム構造に合わせる）
            // 依頼者満足度、要件一致性、プロセス品質、ビジネス価値、使いやすさ
            updateData = {
              ...updateData,
              satisfactionScore: Math.floor(Math.random() * 20) + 70, // 70-89: 依頼者満足度
              requirementAlignment: Math.floor(Math.random() * 20) + 70, // 70-89: 要件一致性
              processQuality: Math.floor(Math.random() * 20) + 70, // 70-89: プロセス品質
              businessValue: Math.floor(Math.random() * 20) + 70, // 70-89: ビジネス価値
              usability: Math.floor(Math.random() * 20) + 70, // 70-89: 使いやすさ
              comments: "クライアントからの評価も良好です。要件の理解が適切で、ビジネス価値も高いです。"
            };
            break;

          case "penalty":
            // ペナルティ評価の全パラメータを設定（system.evaluations.$id.tsxのフォーム構造に合わせる）
            // ペナルティポイント（負の値）、ペナルティレート（%）、ペナルティ理由
            updateData = {
              ...updateData,
              penaltyPoints: -(Math.floor(Math.random() * 20) + 10), // -10 to -29: ペナルティポイント
              penaltyRate: Math.floor(Math.random() * 20) + 10, // 10-29%: ペナルティレート
              penaltyReason: "期限超過によるペナルティ",
              comments: "評価期限を超過したためペナルティが適用されました。"
            };
            break;

          case "bonus":
            // ボーナス評価の全パラメータを設定（system.evaluations.$id.tsxのフォーム構造に合わせる）
            // ボーナスポイント（正の値）、ボーナス理由
            updateData = {
              ...updateData,
              bonusPoints: Math.floor(Math.random() * 20) + 10, // 10-29: ボーナスポイント
              bonusReason: "優秀な成果に対するボーナス",
              comments: "期待を上回る優秀な成果を上げたためボーナスが適用されました。"
            };
            break;
        }

        // 評価を更新
        await db
          .update(weeklyPreEvaluations)
          .set(updateData)
          .where(eq(weeklyPreEvaluations.id, preEval.id));

        results.push({
          evaluationId: preEval.id,
          evaluateeId: preEval.evaluateeId,
          evaluateeName: user.name,
          evaluationType: preEval.evaluationType,
          ...updateData
        });

        console.log(`Auto-evaluated pre-evaluation ${preEval.id} for user ${user.name} (${preEval.evaluationType})`);

      } catch (error) {
        console.error(`Error auto-evaluating pre-evaluation ${preEval.id}:`, error);
        results.push({
          evaluationId: preEval.id,
          error: error instanceof Error ? error.message : "Unknown error"
        });
      }
    }

    return json({
      success: true,
      message: `Auto-evaluated ${results.filter(r => !r.error).length} pre-evaluations, created ${createdPenaltyBonus.length} new penalty/bonus evaluations`,
      results,
      createdPenaltyBonus
    });

  } catch (error) {
    console.error("Error in auto-evaluate API:", error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 