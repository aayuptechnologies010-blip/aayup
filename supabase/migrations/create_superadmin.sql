-- ==============================================================================
-- SuperAdmin Creation Script for AAYUP Technologies (Supabase SQL)
-- Run this in your Supabase SQL Editor: Dashboard -> SQL Editor -> New Query
-- ==============================================================================

-- 1. Ensure pgcrypto extension is active for password hashing
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 2. Variables / SuperAdmin Credentials:
-- Change email and password if needed:
DO $$
DECLARE
    super_email TEXT := 'aayup.technologies.010@gmail.com';
    super_password TEXT := 'Aayup@SuperAdmin2026#';
    super_name TEXT := 'AAYUP SuperAdmin';
    existing_user_id UUID;
BEGIN
    -- Check if user already exists in auth.users
    SELECT id INTO existing_user_id FROM auth.users WHERE email = super_email;

    IF existing_user_id IS NOT NULL THEN
        -- User exists: Update password, confirm email, and set admin role
        UPDATE auth.users
        SET 
            encrypted_password = crypt(super_password, gen_salt('bf')),
            raw_app_meta_data = jsonb_build_object('provider', 'email', 'providers', array['email']),
            raw_user_meta_data = jsonb_build_object('full_name', super_name, 'role', 'admin'),
            email_confirmed_at = COALESCE(email_confirmed_at, NOW()),
            updated_at = NOW()
        WHERE id = existing_user_id;

        -- Ensure profiles table has admin role
        INSERT INTO public.profiles (id, email, full_name, role, updated_at)
        VALUES (existing_user_id, super_email, super_name, 'admin', NOW())
        ON CONFLICT (id) 
        DO UPDATE SET 
            role = 'admin',
            full_name = super_name,
            updated_at = NOW();

        RAISE NOTICE 'Existing user % upgraded to SUPERADMIN successfully!', super_email;

    ELSE
        -- User does not exist: Create fresh auth user
        existing_user_id := gen_random_uuid();

        INSERT INTO auth.users (
            id,
            instance_id,
            email,
            encrypted_password,
            email_confirmed_at,
            raw_app_meta_data,
            raw_user_meta_data,
            created_at,
            updated_at,
            role,
            aud,
            confirmation_token
        ) VALUES (
            existing_user_id,
            '00000000-0000-0000-0000-000000000000',
            super_email,
            crypt(super_password, gen_salt('bf')),
            NOW(),
            jsonb_build_object('provider', 'email', 'providers', array['email']),
            jsonb_build_object('full_name', super_name, 'role', 'admin'),
            NOW(),
            NOW(),
            'authenticated',
            'authenticated',
            ''
        );

        -- Also ensure record in public.profiles
        INSERT INTO public.profiles (id, email, full_name, role, created_at, updated_at)
        VALUES (existing_user_id, super_email, super_name, 'admin', NOW(), NOW())
        ON CONFLICT (id) 
        DO UPDATE SET 
            role = 'admin',
            full_name = super_name,
            updated_at = NOW();

        RAISE NOTICE 'New SUPERADMIN % created successfully with full credentials!', super_email;
    END IF;
END $$;

-- 3. Verify the superadmin profile record
SELECT id, email, full_name, role, created_at, updated_at 
FROM public.profiles 
WHERE email = 'aayup.technologies.010@gmail.com';
