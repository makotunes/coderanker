import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { asc, sql, inArray } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/select";
import { useState } from "react";
import { Users, ArrowUpDown, ArrowUp, ArrowDown, Star } from "lucide-react";
import { Link } from "@remix-run/react";

export async function loader({ request }: LoaderFunctionArgs) {
  const currentUser = await requireUser(request);
  
  // Get all users (excluding retired users) with manager information
  const allUsers = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      tier: users.tier,
      employmentType: users.employmentType,
      profile: users.profile,
      retiredAt: users.retiredAt,
      capabilityManagerId: users.capabilityManagerId,
      projectManagerId: users.projectManagerId,
      skill: users.skill,
      joiningDate: users.joiningDate,
      isReferenceSalary: users.isReferenceSalary,
      fte: users.fte,
      isEvaluated: users.isEvaluated,
      title: users.title,
      department: users.department,
      number: users.number,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(sql`${users.retiredAt} IS NULL`)
    .orderBy(asc(users.tier), asc(users.number), asc(users.joiningDate));

  // Get manager information for all users
  const managerIds = new Set<string>();
  allUsers.forEach(user => {
    if (user.capabilityManagerId) managerIds.add(user.capabilityManagerId);
    if (user.projectManagerId) managerIds.add(user.projectManagerId);
  });

  const managers = managerIds.size > 0 ? await db
    .select({
      id: users.id,
      name: users.name,
      role: users.role,
      tier: users.tier,
    })
    .from(users)
    .where(inArray(users.id, Array.from(managerIds))) : [];

  const managerMap = new Map(managers.map(manager => [manager.id, manager]));

  // Add manager information to users
  const usersWithManagers = allUsers.map(user => ({
    ...user,
    capabilityManager: user.capabilityManagerId ? managerMap.get(user.capabilityManagerId) : null,
    projectManager: user.projectManagerId ? managerMap.get(user.projectManagerId) : null,
  }));

  return json({ users: usersWithManagers, currentUser });
}

export default function UsersList() {
  const { users, currentUser } = useLoaderData<typeof loader>();
  
  // Sort state
  const [sortField, setSortField] = useState<string>("tier");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [managerFilter, setManagerFilter] = useState<string>("all");

  const roles = ["SUPERUSER", "ADMIN", "REQUESTOR", "ENGINEER", "CORP", "DESIGNER", "OPERATOR"];

  // Multi-sort settings
  const [multiSort, setMultiSort] = useState<boolean>(true);

  // User list with filter and sort functionality
  const getFilteredAndSortedUsers = () => {
    let filtered = users;

    // Role filter
    if (roleFilter !== "all") {
      filtered = filtered.filter(user => user.role === roleFilter);
    }

    // Manager filter
    if (managerFilter === "my-subordinates") {
      // 自分の部下をフィルタ（自分がcapabilityManagerまたはprojectManagerになっているユーザー）
      filtered = filtered.filter(user => 
        user.capabilityManagerId === currentUser.id || 
        user.projectManagerId === currentUser.id
      );
    } else if (managerFilter === "no-manager") {
      // 上司が割り当てられていないユーザーをフィルタ
      filtered = filtered.filter(user => 
        !user.capabilityManagerId && !user.projectManagerId
      );
    }

    // Define role hierarchy
    const roleOrder = {
      "SUPERUSER": 7,
      "ADMIN": 6,
      "REQUESTOR": 5,
      "ENGINEER": 4,
      "CORP": 3,
      "DESIGNER": 2,
      "OPERATOR": 1
    };

    // Multi-sort functionality
    if (multiSort) {
      filtered.sort((a, b) => {
        // 1. Tier descending
        const aTierNum = parseInt((a.tier || "T0").replace("T", ""));
        const bTierNum = parseInt((b.tier || "T0").replace("T", ""));
        if (aTierNum !== bTierNum) {
          return bTierNum - aTierNum; // descending
        }

        // 2. Role descending
        const aRoleOrder = roleOrder[a.role as keyof typeof roleOrder] || 0;
        const bRoleOrder = roleOrder[b.role as keyof typeof roleOrder] || 0;
        if (aRoleOrder !== bRoleOrder) {
          return bRoleOrder - aRoleOrder; // descending
        }

        // 3. Employee number ascending
        const aNumber = a.number ? parseInt(a.number) : 0;
        const bNumber = b.number ? parseInt(b.number) : 0;
        if (aNumber !== bNumber) {
          return aNumber - bNumber; // ascending
        }

        // 4. Joining date ascending
        const aJoiningDate = a.joiningDate ? new Date(a.joiningDate).getTime() : 0;
        const bJoiningDate = b.joiningDate ? new Date(b.joiningDate).getTime() : 0;
        if (aJoiningDate !== bJoiningDate) {
          return aJoiningDate - bJoiningDate; // ascending
        }

        return 0;
      });
    } else {
      // Single sort functionality (existing logic)
      filtered.sort((a, b) => {
        let aValue: string | number | null = a[sortField as keyof typeof a] as string | number | null;
        let bValue: string | number | null = b[sortField as keyof typeof b] as string | number | null;

        // Compare tier as numeric value
        if (sortField === "tier") {
          const aTierNum = parseInt(((aValue as string) || "T0").replace("T", ""));
          const bTierNum = parseInt(((bValue as string) || "T0").replace("T", ""));
          aValue = aTierNum;
          bValue = bTierNum;
        }

        // Compare employee number as numeric value
        if (sortField === "number") {
          aValue = aValue ? parseInt(aValue as string) : 0;
          bValue = bValue ? parseInt(bValue as string) : 0;
        }

        // Compare joining date as timestamp
        if (sortField === "joiningDate") {
          aValue = aValue ? new Date(aValue as string).getTime() : 0;
          bValue = bValue ? new Date(bValue as string).getTime() : 0;
        }

        // Compare role by hierarchy
        if (sortField === "role") {
          aValue = roleOrder[a.role as keyof typeof roleOrder] || 0;
          bValue = roleOrder[b.role as keyof typeof roleOrder] || 0;
        }

        // Handle null values
        if (aValue === null) aValue = 0;
        if (bValue === null) bValue = 0;

        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  };

  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredUsers = getFilteredAndSortedUsers();

  // Badge colors by role
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "ADMIN": return { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" };
      case "CORP": return { variant: "default" as const, className: "bg-blue-100 text-blue-800 border-blue-200" };
      case "ENGINEER": return { variant: "secondary" as const, className: "bg-green-100 text-green-800 border-green-200" };
      case "DESIGNER": return { variant: "outline" as const, className: "bg-purple-100 text-purple-800 border-purple-200" };
      case "OPERATOR": return { variant: "default" as const, className: "bg-orange-100 text-orange-800 border-orange-200" };
      case "REQUESTOR": return { variant: "outline" as const, className: "bg-gray-100 text-gray-800 border-gray-200" };
      case "SUPERUSER": return { className: "bg-black text-yellow-300 border-yellow-400" };
      default: return { variant: "outline" as const, className: "" };
    }
  };

  // Badge colors by tier
  const getTierBadgeVariant = (tier: string) => {
    const tierNum = parseInt(tier.replace("T", ""));
    if (tierNum === 7) return { className: "bg-black text-white border-gray-800" };
    if (tierNum >= 6) return { variant: "destructive" as const, className: "bg-red-100 text-red-800 border-red-200" };
    if (tierNum >= 4) return { variant: "default" as const, className: "bg-blue-100 text-blue-800 border-blue-200" };
    if (tierNum === 0) return { variant: "outline" as const, className: "bg-gray-100 text-gray-800 border-gray-200" };
    return { variant: "secondary" as const, className: "bg-green-100 text-green-800 border-green-200" };
  };

  // Rank icons
  const getRankIcon = (tier: string, role: string) => {
    // if (role === "SUPERUSER") return <Crown className="w-4 h-4 text-yellow-500" />;
    if (role === "ADMIN") return <Star className="w-4 h-4 text-red-500" />;
    // const tierNum = parseInt(tier.replace("T", ""));
    // if (tierNum >= 6) return <Award className="w-4 h-4 text-red-500" />;
    // if (tierNum >= 4) return <Award className="w-4 h-4 text-blue-500" />;
    return null;
  };

  return (
    <div className="container p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold flex items-center gap-2">
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
            User List
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            View all members in the organization
          </p>
        </div>
      </div>

      {/* フィルタ・ソート機能 */}
      <div className="mb-4 sm:mb-6">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
              <ArrowUpDown className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
              Filter & Sort
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              {/* フィルタ・ソートのメイン部分 */}
              <div className="flex flex-col sm:flex-row gap-4 flex-1">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Role:</span>
                  <Select value={roleFilter} onValueChange={setRoleFilter}>
                    <SelectTrigger className="w-full sm:w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      {roles.map(role => (
                        <SelectItem key={role} value={role}>{role}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                  <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Manager:</span>
                  <Select value={managerFilter} onValueChange={setManagerFilter}>
                    <SelectTrigger className="w-full sm:w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Users</SelectItem>
                      <SelectItem value="my-subordinates">My Subordinates</SelectItem>
                      <SelectItem value="no-manager">No Manager Assigned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center gap-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                    <input
                      type="checkbox"
                      checked={multiSort}
                      onChange={(e) => setMultiSort(e.target.checked)}
                      className="w-4 h-4"
                    />
                    Multi-sort
                  </label>
                </div>

                {!multiSort && (
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sort:</span>
                    <div className="flex items-center gap-2">
                      <Select value={sortField} onValueChange={handleSort}>
                        <SelectTrigger className="w-full sm:w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="tier">By Tier</SelectItem>
                          <SelectItem value="role">By Role</SelectItem>
                          <SelectItem value="number">By Employee No.</SelectItem>
                          <SelectItem value="joiningDate">By Joining Date</SelectItem>
                          <SelectItem value="name">By Name</SelectItem>
                        </SelectContent>
                      </Select>
                      <button
                        onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
                        className="p-2 border rounded hover:bg-gray-50"
                      >
                        {sortDirection === "asc" ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* 結果表示 */}
              <div className="text-sm text-gray-500 border-t pt-2 sm:border-t-0 sm:pt-0">
                <div>Showing: {filteredUsers.length} users</div>
                {multiSort && (
                  <div className="text-xs text-blue-600 mt-1">
                    (Tier desc → Role desc → Employee No. asc → Joining Date asc)
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* ユーザーリスト */}
      <div className="grid gap-3 sm:gap-4">
        {filteredUsers.map((user, index) => (
          <Link key={user.id} to={`/profile/${user.id}`} className="block group">
            <Card className="hover:shadow-md transition-shadow duration-200 group-hover:ring-2 group-hover:ring-blue-400">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                  {/* Rank number and Avatar */}
                  <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
                    <div className="flex flex-col items-center min-w-[40px]">
                      <div className="text-lg font-bold text-gray-600">#{index + 1}</div>
                      {getRankIcon(user.tier, user.role)}
                    </div>

                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-lg flex-shrink-0">
                      {user.name.charAt(0)}
                    </div>
                  </div>

                  {/* User information */}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-lg font-semibold group-hover:underline truncate">{user.name}</span>
                      {user.number && (
                        <Badge variant="outline" className="text-xs bg-gray-200 text-gray-700 border-gray-300">
                          No.{user.number}
                        </Badge>
                      )}
                      {user.title && (
                        <Badge variant="outline" className="text-xs bg-gray-100 text-gray-700 border-gray-200">
                          {user.title}
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex flex-wrap items-center gap-1 sm:gap-2 mb-2">
                      <Badge {...getRoleBadgeVariant(user.role)} className="text-xs">{user.role}</Badge>
                      <Badge {...getTierBadgeVariant(user.tier)} className="text-xs">{user.tier}</Badge>
                      {user.department && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-800 border-blue-200">
                          {user.department}
                        </Badge>
                      )}
                      {user.fte !== undefined && user.fte !== null && (
                        <Badge variant="secondary" className="text-xs bg-green-200 text-green-900 border-green-300">
                          FTE: {typeof user.fte === "number" ? `${(user.fte * 100).toFixed(0)}％` : user.fte}
                        </Badge>
                      )}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-gray-600">
                      <span className="truncate">Email: {user.email}</span>
                      {user.joiningDate && <span>Joining Date: {user.joiningDate}</span>}
                      <span>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>

                    {/* Managers */}
                    <div className="mt-2 text-sm text-gray-500">
                      <div className="flex flex-wrap gap-2">
                        <div className="inline-flex items-center gap-1">
                          <span className="font-medium">Capability Manager:</span>
                          {user.capabilityManager ? (
                            <Link 
                              to={`/profile/${user.capabilityManager.id}`}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {user.capabilityManager.name} ({user.capabilityManager.role}/{user.capabilityManager.tier})
                            </Link>
                          ) : (
                            <span className="text-gray-400 italic">Not Assigned</span>
                          )}
                        </div>
                        <div className="inline-flex items-center gap-1">
                          <span className="font-medium">Project Manager:</span>
                          {user.projectManager ? (
                            <Link 
                              to={`/profile/${user.projectManager.id}`}
                              className="text-green-600 hover:text-green-800 hover:underline"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {user.projectManager.name} ({user.projectManager.role}/{user.projectManager.tier})
                            </Link>
                          ) : (
                            <span className="text-gray-400 italic">Not Assigned</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Skills */}
                    {(user.skill || user.profile?.skills?.length) && (
                      <div className="mt-2 text-sm text-gray-500">
                        <span className="font-medium">Skills:</span> {user.skill ? user.skill : user.profile?.skills?.join(", ")}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredUsers.length === 0 && (
        <Card>
          <CardContent className="p-6 sm:p-8 text-center">
            <p className="text-gray-500 text-sm sm:text-base">No users found</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
} 