-- Insert a default admin user (you'll need to sign up with this email first)
-- This script should be run after the admin user signs up through the auth system
INSERT INTO public.admin_users (id, email, role) 
SELECT id, email, 'admin' 
FROM auth.users 
WHERE email = 'admin@trivix.com'
ON CONFLICT (id) DO NOTHING;
