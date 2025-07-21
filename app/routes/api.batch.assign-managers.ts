import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { eq, and, isNull, ne } from "drizzle-orm";

export async function loader({ request }: LoaderFunctionArgs) {
  // CRON_SECRET認証チェック
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  
  if (!authHeader || !cronSecret || !authHeader.startsWith("Bearer ") || authHeader.slice(7) !== cronSecret) {
    throw new Response("Unauthorized", { status: 401 });
  }

  if (request.method !== "POST" && request.method !== "GET") {
    return new Response(JSON.stringify({ success: false, error: "Method not allowed" }), { status: 405 });
  }

  try {
    // ADMINユーザーを取得
    const adminUsers = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        tier: users.tier,
      })
      .from(users)
      .where(
        and(
          eq(users.role, "ADMIN"),
          isNull(users.retiredAt)
        )
      );

    if (adminUsers.length === 0) {
      throw new Error("No ADMIN users found");
    }

    const adminUser = adminUsers[0]; // 最初のADMINユーザーを使用

    // SUPERUSERユーザーを取得
    const superUsers = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        tier: users.tier,
      })
      .from(users)
      .where(
        and(
          eq(users.role, "SUPERUSER"),
          isNull(users.retiredAt)
        )
      );

    if (superUsers.length === 0) {
      throw new Error("No SUPERUSER users found");
    }

    const superUser = superUsers[0]; // 最初のSUPERUSERユーザーを使用

    // 対象ユーザーを取得（REQUESTOR以外、退職者除外）
    const targetUsers = await db
      .select({
        id: users.id,
        name: users.name,
        role: users.role,
        tier: users.tier,
        capabilityManagerId: users.capabilityManagerId,
        projectManagerId: users.projectManagerId,
      })
      .from(users)
      .where(
        and(
          isNull(users.retiredAt),
          ne(users.role, "REQUESTOR")
        )
      );

    const results = {
      processed: 0,
      capabilityManagerAssigned: 0,
      projectManagerAssigned: 0,
      noChanges: 0,
      errors: [] as string[]
    };

    for (const user of targetUsers) {
      try {
        let capabilityManagerId = user.capabilityManagerId;
        let projectManagerId = user.projectManagerId;
        let hasChanges = false;

        // capabilityManagerの割り当て
        if (!capabilityManagerId) {
          if (user.role === "SUPERUSER") {
            false
          } else if (user.role === "ADMIN") {
            // ADMINユーザーのcapabilityManagerはSUPERUSERに割り当て
            capabilityManagerId = superUser.id;
            results.capabilityManagerAssigned++;
            hasChanges = true;
          } else {
            // その他のユーザーは同じロールで自分より高いティアのユーザーのうち、最も低いティアのユーザー
            const potentialCapabilityManagers = await db
              .select({
                id: users.id,
                name: users.name,
                role: users.role,
                tier: users.tier,
              })
              .from(users)
              .where(
                and(
                  eq(users.role, user.role),
                  isNull(users.retiredAt),
                  ne(users.id, user.id) // 自分以外
                )
              )
              .orderBy(users.tier);

            // 自分より高いティアのユーザーをフィルタ
            const higherTierManagers = potentialCapabilityManagers.filter(
              manager => {
                const managerTierNum = parseInt((manager.tier || "T0").replace("T", ""));
                const userTierNum = parseInt((user.tier || "T0").replace("T", ""));
                return managerTierNum > userTierNum;
              }
            );

            if (higherTierManagers.length > 0) {
              // 最も低いティアのユーザーを選択（orderByで昇順になっているので最初の要素）
              capabilityManagerId = higherTierManagers[0].id;
              results.capabilityManagerAssigned++;
              hasChanges = true;
            } else {
              // 同じロールに上位者がいない場合はADMINを割り当て
              capabilityManagerId = adminUser.id;
              results.capabilityManagerAssigned++;
              hasChanges = true;
            }
          }
        }

        // projectManagerの割り当て（ADMIN以外のユーザーのみ）
        if (!projectManagerId && (user.role !== "ADMIN" && user.role !== "SUPERUSER")) {
          projectManagerId = adminUser.id;
          results.projectManagerAssigned++;
          hasChanges = true;
        }

        // 変更がある場合のみ更新
        if (hasChanges) {
          await db
            .update(users)
            .set({
              capabilityManagerId,
              projectManagerId,
              updatedAt: new Date().toISOString(),
            })
            .where(eq(users.id, user.id));

          results.processed++;
        } else {
          results.noChanges++;
        }

      } catch (error) {
        const errorMessage = `Error processing user ${user.name} (${user.id}): ${error}`;
        console.error(errorMessage);
        results.errors.push(errorMessage);
      }
    }

    return json({
      success: true,
      message: "Manager assignment completed",
      results,
      summary: {
        totalUsers: targetUsers.length,
        processed: results.processed,
        capabilityManagerAssigned: results.capabilityManagerAssigned,
        projectManagerAssigned: results.projectManagerAssigned,
        noChanges: results.noChanges,
        errors: results.errors.length
      }
    });

  } catch (error) {
    console.error("Error in assign-managers API:", error);
    return json({
      success: false,
      error: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 