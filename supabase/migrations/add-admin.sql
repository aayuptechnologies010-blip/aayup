-- First, make sure you have a profile
INSERT INTO public.profiles (id, email, full_name, role)
SELECT id, email, COALESCE(raw_user_meta_data->>'Aayup Technologies', 'Admin'), 'admin'
FROM auth.users
WHERE email = 'aayup.technologies.010@gmail.com'
ON CONFLICT (id) 
DO UPDATE SET role = 'admin';