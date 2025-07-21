import { json, type LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Badge } from "~/components/ui/badge";
import { User, Mail, Briefcase, Building, Hash } from "lucide-react";

export async function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id;
  if (!userId) {
    throw new Response("User ID is required", { status: 400 });
  }
  const user = await db
    .select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      tier: users.tier,
      employmentType: users.employmentType,
      skill: users.skill,
      joiningDate: users.joiningDate,
      title: users.title,
      department: users.department,
      number: users.number,
      fte: users.fte,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);
  if (!user[0]) {
    throw new Response("User not found", { status: 404 });
  }
  return json({ user: user[0] });
}

export default function PublicProfile() {
  const { user } = useLoaderData<typeof loader>();
  return (
    <div className="container max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            {user.name}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center gap-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-3xl">
              {user.name.charAt(0)}
            </div>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge variant="outline">{user.role}</Badge>
              <Badge variant="outline">{user.tier}</Badge>
              {user.title && <Badge variant="outline">{user.title}</Badge>}
              {user.department && <Badge variant="outline">{user.department}</Badge>}
              {user.number && <Badge variant="outline">#{user.number}</Badge>}
              {user.fte !== undefined && user.fte !== null && (
                <Badge variant="secondary">FTE: {typeof user.fte === "number" ? `${(user.fte * 100).toFixed(0)}％` : user.fte}</Badge>
              )}
            </div>
            <div className="flex flex-col gap-2 w-full mt-4">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4" />
                <span>{user.email}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Briefcase className="w-4 h-4" />
                <span>{user.employmentType}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Building className="w-4 h-4" />
                <span>{user.joiningDate ? user.joiningDate : "-"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Hash className="w-4 h-4" />
                <span>Joined: {new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
            {user.skill && (
              <div className="w-full mt-4">
                <h3 className="font-semibold text-gray-800 mb-1">Skills</h3>
                <div className="text-gray-600 text-sm">{user.skill}</div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      <div className="mt-6 text-center">
        <Link to="/account/settings" className="text-blue-600 hover:underline text-sm">Edit your profile</Link>
      </div>
    </div>
  );
} 