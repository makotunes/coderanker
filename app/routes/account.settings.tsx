import { json, type LoaderFunctionArgs, type ActionFunctionArgs } from "@remix-run/node";
import { useLoaderData, useNavigate, Form, useNavigation } from "@remix-run/react";
import { requireUser } from "~/lib/auth.server";
import { db } from "~/db/db.server";
import { users } from "~/db/schema";
import { eq } from "drizzle-orm";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";

import { Badge } from "~/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { 
  ArrowLeft, 
  Save,
  User,
  Lock,
  Bell,
  Shield,
  Mail,
  Calendar,
  Building,
  Hash,
  Briefcase
} from "lucide-react";
import bcrypt from "bcryptjs";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await requireUser(request);
  
  // 現在のユーザー情報を取得
  const currentUser = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      role: users.role,
      tier: users.tier,
      employmentType: users.employmentType,
      skill: users.skill,
      joiningDate: users.joiningDate,
      title: users.title,
      department: users.department,
      number: users.number,
      fte: users.fte,
      isEvaluated: users.isEvaluated,
      createdAt: users.createdAt,
      updatedAt: users.updatedAt,
    })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!currentUser[0]) {
    throw new Response("User not found", { status: 404 });
  }

  return json({ user: currentUser[0] });
}

export async function action({ request }: ActionFunctionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();
  const action = formData.get("action") as string;

  if (action === "updateProfile") {
    const name = formData.get("name") as string;
    const skill = formData.get("skill") as string;
    const title = formData.get("title") as string;
    const department = formData.get("department") as string;

    await db
      .update(users)
      .set({
        name,
        skill,
        title,
        department,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.id, user.id));

    return json({ success: true, message: "Profile updated successfully" });
  }

  if (action === "changePassword") {
    const currentPassword = formData.get("currentPassword") as string;
    const newPassword = formData.get("newPassword") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    // 現在のパスワードを確認
    const currentUser = await db
      .select({ password: users.password })
      .from(users)
      .where(eq(users.id, user.id))
      .limit(1);

    if (!currentUser[0]) {
      return json({ success: false, error: "User not found" }, { status: 404 });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, currentUser[0].password);
    if (!isValidPassword) {
      return json({ success: false, error: "Current password is incorrect" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      return json({ success: false, error: "New passwords do not match" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return json({ success: false, error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db
      .update(users)
      .set({
        password: hashedPassword,
        updatedAt: new Date().toISOString(),
      })
      .where(eq(users.id, user.id));

    return json({ success: true, message: "Password changed successfully" });
  }

  return json({ success: false, error: "Invalid action" }, { status: 400 });
}

export default function AccountSettings() {
  const { user } = useLoaderData<typeof loader>();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="container p-2 sm:p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold flex items-center gap-2">
            <User className="w-6 h-6 text-blue-600" />
            Account Settings
          </h1>
          <p className="text-muted-foreground">
            Manage your account information and preferences
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="preferences" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            Preferences
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="post" className="space-y-6">
                <input type="hidden" name="action" value="updateProfile" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      defaultValue={user.name}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={user.email}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="title">Job Title</Label>
                    <Input
                      id="title"
                      name="title"
                      defaultValue={user.title || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      name="department"
                      defaultValue={user.department || ""}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="skill">Skills</Label>
                    <Textarea
                      id="skill"
                      name="skill"
                      defaultValue={user.skill || ""}
                      placeholder="Enter your skills (comma separated)"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fte">FTE (Full Time Equivalent)</Label>
                    <Input
                      id="fte"
                      type="number"
                      step="0.1"
                      min="0"
                      max="1"
                      value={user.fte || 1}
                      disabled
                      className="bg-gray-50"
                    />
                    <p className="text-xs text-gray-500">FTE cannot be changed</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{user.role}</Badge>
                      <p className="text-xs text-gray-500">Role cannot be changed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Tier</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{user.tier}</Badge>
                      <p className="text-xs text-gray-500">Tier cannot be changed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Employment Type</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{user.employmentType}</Badge>
                      <p className="text-xs text-gray-500">Employment type cannot be changed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Employee Number</Label>
                    <div className="flex items-center gap-2">
                      {user.number ? (
                        <Badge variant="outline">#{user.number}</Badge>
                      ) : (
                        <span className="text-gray-500">Not assigned</span>
                      )}
                      <p className="text-xs text-gray-500">Employee number cannot be changed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Joining Date</Label>
                    <div className="flex items-center gap-2">
                      {user.joiningDate ? (
                        <span className="text-sm">{user.joiningDate}</span>
                      ) : (
                        <span className="text-gray-500">Not set</span>
                      )}
                      <p className="text-xs text-gray-500">Joining date cannot be changed</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Evaluation Status</Label>
                    <div className="flex items-center gap-2">
                      <Badge variant={user.isEvaluated ? "default" : "secondary"}>
                        {user.isEvaluated ? "Evaluated" : "Not Evaluated"}
                      </Badge>
                      <p className="text-xs text-gray-500">Evaluation status cannot be changed</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    {isSubmitting ? "Saving..." : "Save Changes"}
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Change Password
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Form method="post" className="space-y-6">
                <input type="hidden" name="action" value="changePassword" />
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type="password"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type="password"
                      required
                      minLength={8}
                    />
                    <p className="text-xs text-gray-500">Password must be at least 8 characters long</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm New Password</Label>
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button type="submit" disabled={isSubmitting} className="flex items-center gap-2">
                    <Lock className="w-4 h-4" />
                    {isSubmitting ? "Changing..." : "Change Password"}
                  </Button>
                </div>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Account Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Email Verification</h4>
                      <p className="text-sm text-gray-500">Your email is verified</p>
                    </div>
                  </div>
                  <Badge variant="default">Verified</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Last Login</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(user.updatedAt).toLocaleDateString()} at {new Date(user.updatedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Building className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Account Created</h4>
                      <p className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Weekly Evaluation Reminders</h4>
                      <p className="text-sm text-gray-500">Get notified when evaluations are due</p>
                    </div>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Email Notifications</h4>
                      <p className="text-sm text-gray-500">Receive important updates via email</p>
                    </div>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Salary Updates</h4>
                      <p className="text-sm text-gray-500">Get notified about salary changes</p>
                    </div>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Hash className="w-5 h-5" />
                System Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Profile Visibility</h4>
                      <p className="text-sm text-gray-500">Control who can see your profile</p>
                    </div>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5 text-gray-500" />
                    <div>
                      <h4 className="font-medium">Privacy Settings</h4>
                      <p className="text-sm text-gray-500">Manage your privacy preferences</p>
                    </div>
                  </div>
                  <Badge variant="outline">Coming Soon</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 