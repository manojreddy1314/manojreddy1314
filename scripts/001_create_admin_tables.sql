-- Create admin users table for authentication
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create careers table
CREATE TABLE IF NOT EXISTS public.careers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT NOT NULL,
  employment_type TEXT NOT NULL, -- full-time, part-time, contract
  experience_level TEXT NOT NULL, -- entry, mid, senior
  description TEXT NOT NULL,
  requirements TEXT NOT NULL,
  responsibilities TEXT NOT NULL,
  salary_range TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Fixed table name from leadership to leadership_team to match seed data
CREATE TABLE IF NOT EXISTS public.leadership_team (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  position TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  linkedin_url TEXT,
  email TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.careers ENABLE ROW LEVEL SECURITY;
-- Updated table name to leadership_team
ALTER TABLE public.leadership_team ENABLE ROW LEVEL SECURITY;

-- Added IF NOT EXISTS to prevent policy already exists errors
-- Admin users policies (only authenticated admin users can manage)
DO $$ BEGIN
  CREATE POLICY "Admin users can view their own data" ON public.admin_users
    FOR SELECT USING (auth.uid() = id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin users can update their own data" ON public.admin_users
    FOR UPDATE USING (auth.uid() = id);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Careers policies (public read, admin write)
DO $$ BEGIN
  CREATE POLICY "Anyone can view active careers" ON public.careers
    FOR SELECT USING (is_active = true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin users can manage careers" ON public.careers
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE admin_users.id = auth.uid()
      )
    );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

-- Updated table name to leadership_team and added error handling
-- Leadership policies (public read, admin write)
DO $$ BEGIN
  CREATE POLICY "Anyone can view active leadership" ON public.leadership_team
    FOR SELECT USING (is_active = true);
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Admin users can manage leadership" ON public.leadership_team
    FOR ALL USING (
      EXISTS (
        SELECT 1 FROM public.admin_users 
        WHERE admin_users.id = auth.uid()
      )
    );
EXCEPTION
  WHEN duplicate_object THEN NULL;
END $$;
