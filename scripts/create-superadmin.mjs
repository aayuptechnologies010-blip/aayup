import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

// Read .env manually without external dotenv dependency
function loadEnv() {
  try {
    const envPath = path.resolve(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      content.split("\n").forEach((line) => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#")) {
          const [key, ...rest] = trimmed.split("=");
          if (key && rest.length > 0) {
            process.env[key.trim()] = rest.join("=").trim();
          }
        }
      });
    }
  } catch (e) {
    console.error("Could not read .env file", e);
  }
}

loadEnv();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SERVICE_ROLE_KEY) {
  console.error("❌ SUPABASE_SERVICE_ROLE_KEY is required in .env");
  process.exit(1);
}

const supabaseAdmin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});

async function createSuperAdmin() {
  const email = "aayup.technologies.010@gmail.com";
  const password = "Aayup@SuperAdmin2026#";
  const fullName = "AAYUP SuperAdmin";

  console.log(`⏳ Creating/Updating SuperAdmin: ${email}...`);

  // Check if user already exists
  const { data: usersData, error: listError } = await supabaseAdmin.auth.admin.listUsers();
  
  if (listError) {
    console.error("❌ Error fetching users:", listError.message);
    return;
  }

  const existingUser = usersData.users.find((u) => u.email === email);

  let userId;
  if (existingUser) {
    console.log("ℹ️ Found existing user! Updating password and role...");
    userId = existingUser.id;
    const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      password: password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: "admin" },
    });
    if (updateError) throw updateError;
  } else {
    console.log("ℹ️ Creating brand new user...");
    const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, role: "admin" },
    });
    if (createError) throw createError;
    userId = newUser.user.id;
  }

  // Ensure role in public.profiles table
  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .upsert({
      id: userId,
      email: email,
      full_name: fullName,
      role: "admin",
      updated_at: new Date().toISOString(),
    });

  if (profileError) {
    console.warn("⚠️ Note: public.profiles table upsert:", profileError.message);
  } else {
    console.log("✅ public.profiles updated with role: admin");
  }

  console.log("\n🎉 SUPERADMIN READY!");
  console.log("------------------------------------------");
  console.log(`📧 Email   : ${email}`);
  console.log(`🔑 Password: ${password}`);
  console.log("------------------------------------------");
}

createSuperAdmin().catch((err) => {
  console.error("❌ Failed to create SuperAdmin:", err);
});
