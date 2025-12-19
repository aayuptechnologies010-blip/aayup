import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Lock, Eye, EyeOff, User, Mail, Shield, Key, UserPlus, Trash2, Search, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "admins">("profile");

  // Profile form
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  // Password form
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Admin management
  const [admins, setAdmins] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [newAdminEmail, setNewAdminEmail] = useState("");
  const [newAdminPassword, setNewAdminPassword] = useState("");
  const [newAdminFullName, setNewAdminFullName] = useState("");
  const [isCreatingAdmin, setIsCreatingAdmin] = useState(false);
  const [isDeletingAdmin, setIsDeletingAdmin] = useState<string | null>(null);

  useEffect(() => {
    checkUser();
    if (activeTab === "admins") {
      fetchAdmins();
    }
  }, [activeTab]);

  const checkUser = async () => {
    try {
      const { data: { session }, error } = await Promise.race([
        supabase.auth.getSession(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('timeout')), 5000)
        )
      ]) as any;
      
      if (error || !session) {
        toast({
          title: "Access Denied",
          description: "Please sign in to access this page",
          variant: "destructive",
        });
        navigate("/");
        return;
      }

      setCurrentUser(session.user);
      setFullName(session.user.user_metadata?.full_name || "");
      setEmail(session.user.email || "");
      setLoading(false);
    } catch (error) {
      console.error("Session check error:", error);
      setLoading(false);
      navigate("/");
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdatingProfile(true);

    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully",
      });
    } catch (error: any) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "New password and confirm password must match",
        variant: "destructive",
      });
      return;
    }

    if (newPassword.length < 6) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 6 characters long",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);

    try {
      // Get current session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        throw new Error("Your session has expired. Please sign in again.");
      }

      // Update password with current session
      const { data, error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) throw error;

      toast({
        title: "Password Changed Successfully",
        description: "Your password has been updated. You can now use your new password to sign in.",
      });

      setNewPassword("");
      setConfirmPassword("");

      // Optional: Sign out user after password change for security
      setTimeout(async () => {
        toast({
          title: "Signing Out",
          description: "Please sign in again with your new password",
        });
        
        await supabase.auth.signOut();
        navigate("/", { replace: true });
      }, 2000);

    } catch (error: any) {
      console.error("Password change error:", error);
      
      // Check if it's a session error
      if (error.message?.includes("session") || error.message?.includes("expired")) {
        toast({
          title: "Session Expired",
          description: "Please sign in again to change your password",
          variant: "destructive",
        });
        
        // Sign out and redirect
        await supabase.auth.signOut();
        navigate("/", { replace: true });
      } else {
        toast({
          title: "Password Change Failed",
          description: error.message || "Failed to change password. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsChangingPassword(false);
    }
  };

  const fetchAdmins = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'admin')
        .order('created_at', { ascending: false });

      if (error) {
        // Check if table doesn't exist
        if (error.message?.includes('relation "public.profiles" does not exist')) {
          toast({
            title: "Database Not Initialized",
            description: "Please run the database migrations first. Contact your administrator.",
            variant: "destructive",
          });
          return;
        }
        throw error;
      }
      setAdmins(data || []);
    } catch (error: any) {
      console.error("Error fetching admins:", error);
      toast({
        title: "Failed to Load Admins",
        description: error.message || "An error occurred while loading admins",
        variant: "destructive",
      });
    }
  };

  const handleCreateAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreatingAdmin(true);

    try {
      // First verify current user is an admin
      const { data: currentProfile, error: profileCheckError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUser?.id)
        .single();

      if (profileCheckError) {
        console.error("Profile check error:", profileCheckError);
        throw new Error("Failed to verify admin permissions");
      }

      if (!currentProfile || currentProfile.role !== 'admin') {
        throw new Error("You don't have permission to create admin accounts");
      }

      // Create auth user with admin role in metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: newAdminEmail,
        password: newAdminPassword,
        options: {
          data: {
            full_name: newAdminFullName,
            role: 'admin',
          },
          emailRedirectTo: undefined, // Prevent confirmation email redirect
        },
      });

      if (authError) throw authError;

      if (!authData.user) {
        throw new Error("Failed to create admin user");
      }

      // Wait a moment for the trigger to create the profile
      await new Promise(resolve => setTimeout(resolve, 500));

      // Update the profile to ensure it's set as admin
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin', full_name: newAdminFullName })
        .eq('id', authData.user.id);

      if (updateError) {
        console.error("Update error:", updateError);
        // If update failed, try inserting
        const { error: insertError } = await supabase
          .from('profiles')
          .insert({
            id: authData.user.id,
            email: newAdminEmail,
            full_name: newAdminFullName,
            role: 'admin',
          })
          .select()
          .single();

        if (insertError) {
          console.error("Insert error:", insertError);
          throw new Error(`Failed to create admin profile: ${insertError.message}`);
        }
      }

      toast({
        title: "Admin Created Successfully",
        description: `${newAdminFullName} has been added as an admin`,
      });

      toast({
        title: "Admin Created Successfully",
        description: authData.user.confirmed_at 
          ? `${newAdminFullName} can sign in immediately`
          : `${newAdminFullName} must check their email and click the verification link before signing in`,
      });

      // Clear form
      setNewAdminEmail("");
      setNewAdminPassword("");
      setNewAdminFullName("");

      // Refresh admin list
      await fetchAdmins();
    } catch (error: any) {
      console.error("Create admin error:", error);
      toast({
        title: "Failed to Create Admin",
        description: error.message || "An error occurred while creating the admin",
        variant: "destructive",
      });
    } finally {
      setIsCreatingAdmin(false);
    }
  };

  const handleDeleteAdmin = async (adminId: string, adminEmail: string) => {
    if (adminId === currentUser?.id) {
      toast({
        title: "Cannot Delete Yourself",
        description: "You cannot delete your own admin account",
        variant: "destructive",
      });
      return;
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete admin ${adminEmail}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setIsDeletingAdmin(adminId);

    try {
      // Delete profile (auth user will be deleted via CASCADE)
      const { error } = await supabase
        .from('profiles')
        .delete()
        .eq('id', adminId);

      if (error) throw error;

      toast({
        title: "Admin Deleted",
        description: `Admin ${adminEmail} has been removed`,
      });

      // Refresh admin list
      fetchAdmins();
    } catch (error: any) {
      toast({
        title: "Failed to Delete Admin",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsDeletingAdmin(null);
    }
  };

  const filteredAdmins = admins.filter(admin =>
    admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    admin.full_name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-muted/30">
      <Navigation />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold mb-8">Settings</h1>

            {/* Tab Navigation */}
            <div className="flex gap-2 mb-8 bg-muted/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("profile")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === "profile"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <User className="w-4 h-4" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === "security"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Lock className="w-4 h-4" />
                Security
              </button>
              <button
                onClick={() => setActiveTab("admins")}
                className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold transition-all ${
                  activeTab === "admins"
                    ? "bg-gradient-to-r from-primary to-secondary text-white shadow-lg"
                    : "text-foreground/70 hover:text-foreground"
                }`}
              >
                <Shield className="w-4 h-4" />
                Admins
              </button>
            </div>

            {/* Profile Settings */}
            {activeTab === "profile" && (
              <Card className="glass-card p-8">
                <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="John Doe"
                      disabled={isUpdatingProfile}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <Input
                      type="email"
                      value={email}
                      disabled
                      className="bg-muted/50 cursor-not-allowed"
                    />
                    <p className="text-sm text-foreground/60 mt-1">Email cannot be changed</p>
                  </div>
                  <Button
                    type="submit"
                    disabled={isUpdatingProfile}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isUpdatingProfile ? "Updating..." : "Update Profile"}
                  </Button>
                </form>
              </Card>
            )}

            {/* Security Settings */}
            {activeTab === "security" && (
              <Card className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                    <Key className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">Change Password</h2>
                    <p className="text-foreground/60">Update your password to keep your account secure</p>
                  </div>
                </div>

                <form onSubmit={handleChangePassword} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Enter new password"
                        minLength={6}
                        required
                        disabled={isChangingPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        minLength={6}
                        required
                        disabled={isChangingPassword}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/70 hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    disabled={isChangingPassword}
                    className="bg-primary hover:bg-primary/90"
                  >
                    {isChangingPassword ? "Changing..." : "Change Password"}
                  </Button>
                </form>
              </Card>
            )}

            {/* Admin Management */}
            {activeTab === "admins" && (
              <div className="space-y-6">
                {/* Create New Admin */}
                <Card className="glass-card p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                      <UserPlus className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold">Add New Admin</h2>
                      <p className="text-foreground/60">Create a new administrator account</p>
                    </div>
                  </div>

                  <form onSubmit={handleCreateAdmin} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <Input
                          type="text"
                          value={newAdminFullName}
                          onChange={(e) => setNewAdminFullName(e.target.value)}
                          placeholder="John Doe"
                          required
                          disabled={isCreatingAdmin}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <Input
                          type="email"
                          value={newAdminEmail}
                          onChange={(e) => setNewAdminEmail(e.target.value)}
                          placeholder="admin@example.com"
                          required
                          disabled={isCreatingAdmin}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Password</label>
                      <Input
                        type="password"
                        value={newAdminPassword}
                        onChange={(e) => setNewAdminPassword(e.target.value)}
                        placeholder="Minimum 6 characters"
                        minLength={6}
                        required
                        disabled={isCreatingAdmin}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={isCreatingAdmin}
                      className="bg-primary hover:bg-primary/90"
                    >
                      <UserPlus className="w-4 h-4 mr-2" />
                      {isCreatingAdmin ? "Creating..." : "Create Admin"}
                    </Button>
                  </form>
                </Card>

                {/* Admin List */}
                <Card className="glass-card p-8">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                        <Shield className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold">Admin Accounts</h2>
                        <p className="text-foreground/60">{admins.length} total administrators</p>
                      </div>
                    </div>
                    <div className="relative w-64">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground/50" />
                      <Input
                        type="text"
                        placeholder="Search admins..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    {filteredAdmins.length === 0 ? (
                      <div className="text-center py-12 text-foreground/60">
                        <AlertCircle className="w-12 h-12 mx-auto mb-4 opacity-50" />
                        <p>No admins found</p>
                      </div>
                    ) : (
                      filteredAdmins.map((admin) => (
                        <div
                          key={admin.id}
                          className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                              <User className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold">{admin.full_name || "Unknown"}</h3>
                              <p className="text-sm text-foreground/60">{admin.email}</p>
                              <p className="text-xs text-foreground/50 mt-1">
                                Joined {new Date(admin.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {admin.id === currentUser?.id && (
                              <span className="px-3 py-1 bg-primary/20 text-primary text-xs font-semibold rounded-full">
                                You
                              </span>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteAdmin(admin.id, admin.email)}
                              disabled={admin.id === currentUser?.id || isDeletingAdmin === admin.id}
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              {isDeletingAdmin === admin.id ? "Deleting..." : "Delete"}
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Settings;
