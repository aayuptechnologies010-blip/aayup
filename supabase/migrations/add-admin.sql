-- First, make sure you have a profile
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'Saurabh Kumar', 'Admin'), 'admin'
FROM auth.users
WHERE email = 'saurabhtbj143@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';