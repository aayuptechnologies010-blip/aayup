import React, { useState } from "react";
import ReactDOM from "react-dom";
import { X, Eye, EyeOff } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";

const AuthModal: React.FC<{ open: boolean; onClose: () => void }> = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  if (!open) return null;

  const getErrorMessage = (error: any): string => {
    if (!error) return "An unknown error occurred";
    
    // Common Supabase auth errors
    if (error.message?.includes("Invalid login credentials")) {
      return "Invalid email or password. Please try again.";
    }
    if (error.message?.includes("Email not confirmed")) {
      return "Please verify your email address before signing in.";
    }
    if (error.message?.includes("Email rate limit exceeded")) {
      return "Too many attempts. Please try again later.";
    }
    
    return error.message || "An error occurred. Please try again.";
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (!data.session) {
        throw new Error("Failed to create session");
      }
      
      toast({
        title: "Welcome back!",
        description: "You have successfully signed in.",
      });
      
      // Clear form
      setEmail("");
      setPassword("");
      
      onClose();
      
      // Wait a bit for auth state to propagate
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Navigate to admin
      navigate("/admin", { replace: true });
    } catch (err: any) {
      const errorMessage = getErrorMessage(err);
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-card rounded-xl shadow-lg p-6 sm:p-8 mx-4">
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <div className="text-lg font-semibold">Admin Sign In</div>
            <p className="text-xs text-muted-foreground mt-1">Only administrators can access this area</p>
          </div>
          <button onClick={onClose} className="p-1 rounded hover:bg-muted/20">
            <X />
          </button>
        </div>

        <form onSubmit={submit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              required
              className="w-full p-3 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-foreground">Password</label>
            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                required
                className="w-full p-3 pr-12 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-foreground/70 hover:text-foreground transition-colors"
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="bg-primary text-white px-4 py-2 rounded">
              {loading ? 'Please wait...' : 'Sign In'}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default AuthModal;
