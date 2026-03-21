import { SEO } from "@/components/SEO";
import { Layout } from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users, Mail, UserPlus, Shield, Eye, Edit } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function Family() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [familyMembers, setFamilyMembers] = useState<any[]>([]);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    email: "",
    name: "",
    role: "viewer" as "admin" | "editor" | "viewer",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      loadFamilyMembers();
    }
  }, [user]);

  const loadFamilyMembers = async () => {
    const { data } = await supabase
      .from("family_members")
      .select("*")
      .order("created_at", { ascending: false });

    if (data) {
      setFamilyMembers(data);
    }
  };

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate UUID for new profile
    const profileId = crypto.randomUUID();
    
    // Create profile first
    const { data: newProfile, error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: profileId,
        email: inviteForm.email,
        full_name: inviteForm.name,
      })
      .select()
      .single();

    if (profileError) {
      toast({ title: "Error", description: profileError.message, variant: "destructive" });
      return;
    }

    // Set permissions based on role
    let permissions = "view";
    if (inviteForm.role === "editor") permissions = "view,edit";
    if (inviteForm.role === "admin") permissions = "view,edit,delete,manage";

    const { error } = await supabase.from("family_members").insert({
      profile_id: newProfile.id,
      role: inviteForm.role,
      permissions: permissions,
    });

    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Success", description: `Invitation sent to ${inviteForm.name}` });
      setInviteForm({ email: "", name: "", role: "viewer" });
      setShowInviteForm(false);
      loadFamilyMembers();
    }
  };

  const roleDescriptions = {
    viewer: "Can view all data, receive weekly reports, leave voice messages",
    editor: "Can add/edit tracking data, manage schedules, full access except deletion",
    admin: "Full control including family member management and settings",
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-terracotta-600 border-t-transparent"></div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <>
      <SEO title="Family Portal - Yusra's Manager" description="Manage family access to Yusra's care" />
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <h1 className="text-3xl font-bold font-baloo text-terracotta-600 mb-2">Family Portal</h1>
            <p className="text-neutral-600">পরিবার পোর্টাল - Keep everyone connected to Yusra's journey</p>
          </div>

          <div className="grid gap-6">
            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-terracotta-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-terracotta-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold">Family Members</h2>
                    <p className="text-sm text-neutral-600">পরিবারের সদস্যরা</p>
                  </div>
                </div>
                <Button onClick={() => setShowInviteForm(!showInviteForm)} className="gap-2">
                  <UserPlus className="w-4 h-4" />
                  Invite Member
                </Button>
              </div>

              {showInviteForm && (
                <form onSubmit={handleInvite} className="mb-6 p-4 bg-cream-50 rounded-lg space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name / নাম</Label>
                      <Input
                        id="name"
                        value={inviteForm.name}
                        onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                        placeholder="e.g., Nani (Grandmother)"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteForm.email}
                        onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                        placeholder="email@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="role">Access Level / প্রবেশাধিকার</Label>
                    <Select
                      value={inviteForm.role}
                      onValueChange={(value: "admin" | "editor" | "viewer") => setInviteForm({ ...inviteForm, role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="viewer">Viewer (View Only)</SelectItem>
                        <SelectItem value="editor">Editor (Can Add Data)</SelectItem>
                        <SelectItem value="admin">Admin (Full Control)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="bg-sage-50 p-3 rounded text-sm text-neutral-700">
                    <strong>{inviteForm.role}:</strong>{" "}
                    {roleDescriptions[inviteForm.role as keyof typeof roleDescriptions]}
                  </div>

                  <div className="flex gap-2">
                    <Button type="submit" className="gap-2">
                      <Mail className="w-4 h-4" />
                      Send Invitation
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              )}

              <div className="space-y-3">
                {familyMembers.length === 0 ? (
                  <div className="text-center py-8 text-neutral-500">
                    <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>No family members invited yet</p>
                    <p className="text-sm">Click "Invite Member" to share access with family</p>
                  </div>
                ) : (
                  familyMembers.map((member) => (
                    <Card key={member.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-terracotta-200 to-peach-200 flex items-center justify-center">
                            <span className="text-lg font-bold text-terracotta-700">
                              {member.name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div>
                            <h3 className="font-semibold">{member.name}</h3>
                            <p className="text-sm text-neutral-600">{member.relationship}</p>
                            <p className="text-xs text-neutral-500">{member.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                            member.role === "admin"
                              ? "bg-terracotta-100 text-terracotta-700"
                              : member.role === "editor"
                              ? "bg-sage-100 text-sage-700"
                              : "bg-cream-200 text-neutral-700"
                          }`}>
                            {member.can_edit ? <Edit className="w-3 h-3 inline mr-1" /> : <Eye className="w-3 h-3 inline mr-1" />}
                            {member.role || "viewer"}
                          </div>
                          {member.role === "admin" && (
                            <Shield className="w-5 h-5 text-terracotta-600" />
                          )}
                        </div>
                      </div>
                    </Card>
                  ))
                )}
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-sage-50 to-cream-50">
              <h3 className="text-lg font-semibold mb-4">Family Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Eye className="w-5 h-5 text-sage-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Live Updates</h4>
                    <p className="text-sm text-neutral-600">Family sees real-time feeding, sleep, and milestone updates</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-terracotta-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Weekly Reports</h4>
                    <p className="text-sm text-neutral-600">Automated summaries with photos sent every Sunday</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-peach-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Voice Messages</h4>
                    <p className="text-sm text-neutral-600">Grandparents can record stories and messages for Yusra</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Emergency Override</h4>
                    <p className="text-sm text-neutral-600">Trusted family can access emergency info if parents unreachable</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </Layout>
    </>
  );
}