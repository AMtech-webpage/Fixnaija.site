-- ==============================================================================
-- FIXNAIJA: SUPABASE POSTGRESQL + FIREBASE AUTHENTICATION SCHEMA
-- ==============================================================================
-- Description: Complete PostgreSQL database schema with Firebase UID integration
-- Instructions: Run this script directly in your Supabase Project SQL Editor.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 1. PROFILES TABLE (Associated with verified Firebase UID)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  firebase_uid TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  state TEXT DEFAULT 'Lagos',
  lga TEXT DEFAULT 'Ikeja',
  city TEXT DEFAULT 'Ikeja',
  account_roles TEXT[] DEFAULT ARRAY['hirer']::TEXT[],
  avatar_url TEXT,
  is_verified BOOLEAN DEFAULT FALSE,
  nin_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_firebase_uid ON public.profiles(firebase_uid);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 2. TECHNICIAN PROFILES
CREATE TABLE IF NOT EXISTS public.technicians (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE NOT NULL,
  firebase_uid TEXT NOT NULL,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  hourly_rate_naira NUMERIC DEFAULT 5000,
  rating NUMERIC DEFAULT 5.0,
  reviews_count INTEGER DEFAULT 0,
  jobs_completed INTEGER DEFAULT 0,
  available BOOLEAN DEFAULT TRUE,
  skills TEXT[] DEFAULT '{}',
  verification_doc_status TEXT DEFAULT 'unverified' CHECK (verification_doc_status IN ('unverified', 'pending', 'verified')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. SERVICES
CREATE TABLE IF NOT EXISTS public.services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  price_naira NUMERIC NOT NULL,
  duration_estimate TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. TUTORIALS
CREATE TABLE IF NOT EXISTS public.tutorials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_firebase_uid TEXT NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('video', 'article', 'guide')),
  category TEXT NOT NULL,
  read_time TEXT DEFAULT '5 min read',
  cover_image TEXT,
  excerpt TEXT NOT NULL,
  content TEXT,
  steps JSONB DEFAULT '[]'::JSONB,
  video_url TEXT,
  likes_count INTEGER DEFAULT 0,
  comments_count INTEGER DEFAULT 0,
  views_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TUTORIAL COMMENTS
CREATE TABLE IF NOT EXISTS public.tutorial_comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tutorial_id UUID REFERENCES public.tutorials(id) ON DELETE CASCADE NOT NULL,
  author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  author_firebase_uid TEXT NOT NULL,
  content TEXT NOT NULL,
  likes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. JOB REQUESTS
CREATE TABLE IF NOT EXISTS public.job_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  hirer_profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  hirer_firebase_uid TEXT NOT NULL,
  technician_id UUID REFERENCES public.technicians(id) ON DELETE CASCADE NOT NULL,
  category TEXT NOT NULL,
  service_title TEXT NOT NULL,
  description TEXT NOT NULL,
  state TEXT NOT NULL,
  lga TEXT NOT NULL,
  address TEXT NOT NULL,
  budget_naira NUMERIC NOT NULL,
  preferred_date TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'in_progress', 'completed', 'declined')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. CONVERSATIONS & PRIVATE MESSAGES
CREATE TABLE IF NOT EXISTS public.conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  participant_a_firebase_uid TEXT NOT NULL,
  participant_b_firebase_uid TEXT NOT NULL,
  last_message TEXT,
  last_message_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (participant_a_firebase_uid, participant_b_firebase_uid)
);

CREATE TABLE IF NOT EXISTS public.messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  conversation_id UUID REFERENCES public.conversations(id) ON DELETE CASCADE NOT NULL,
  sender_firebase_uid TEXT NOT NULL,
  recipient_firebase_uid TEXT NOT NULL,
  content TEXT NOT NULL,
  attachment_url TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('sent', 'delivered', 'read')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. VERIFICATION REQUESTS
CREATE TABLE IF NOT EXISTS public.verification_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  firebase_uid TEXT NOT NULL,
  document_type TEXT NOT NULL,
  file_url TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  reviewed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS IDENTITY HELPER
CREATE OR REPLACE FUNCTION public.request_firebase_uid()
RETURNS TEXT AS $$
BEGIN
  RETURN COALESCE(
    NULLIF(current_setting('request.jwt.claims', true)::jsonb->>'sub', ''),
    NULLIF(current_setting('request.jwt.claim.sub', true), '')
  );
END;
$$ LANGUAGE plpgsql STABLE SECURITY DEFINER;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.technicians ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tutorial_comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.job_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_requests ENABLE ROW LEVEL SECURITY;

-- Hardened RLS Policies
CREATE POLICY "Profiles readable by all" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (firebase_uid = public.request_firebase_uid());

CREATE POLICY "Technicians readable by all" ON public.technicians FOR SELECT USING (true);
CREATE POLICY "Technicians update own record" ON public.technicians FOR UPDATE USING (firebase_uid = public.request_firebase_uid());

CREATE POLICY "Tutorials viewable by all" ON public.tutorials FOR SELECT USING (true);
CREATE POLICY "Authors create tutorials" ON public.tutorials FOR INSERT WITH CHECK (author_firebase_uid = public.request_firebase_uid());
CREATE POLICY "Authors update tutorials" ON public.tutorials FOR UPDATE USING (author_firebase_uid = public.request_firebase_uid());

CREATE POLICY "Comments viewable by all" ON public.tutorial_comments FOR SELECT USING (true);
CREATE POLICY "Users post comments" ON public.tutorial_comments FOR INSERT WITH CHECK (author_firebase_uid = public.request_firebase_uid());

CREATE POLICY "Job participants view requests" ON public.job_requests FOR SELECT
  USING (
    hirer_firebase_uid = public.request_firebase_uid() OR
    technician_id IN (SELECT id FROM public.technicians WHERE firebase_uid = public.request_firebase_uid())
  );
CREATE POLICY "Hirers insert requests" ON public.job_requests FOR INSERT WITH CHECK (hirer_firebase_uid = public.request_firebase_uid());
CREATE POLICY "Job participants update requests" ON public.job_requests FOR UPDATE
  USING (
    hirer_firebase_uid = public.request_firebase_uid() OR
    technician_id IN (SELECT id FROM public.technicians WHERE firebase_uid = public.request_firebase_uid())
  );

CREATE POLICY "Users view own conversations" ON public.conversations FOR SELECT
  USING (
    participant_a_firebase_uid = public.request_firebase_uid() OR
    participant_b_firebase_uid = public.request_firebase_uid()
  );

CREATE POLICY "Users read conversation messages" ON public.messages FOR SELECT
  USING (
    sender_firebase_uid = public.request_firebase_uid() OR
    recipient_firebase_uid = public.request_firebase_uid()
  );
CREATE POLICY "Users send messages as self" ON public.messages FOR INSERT WITH CHECK (sender_firebase_uid = public.request_firebase_uid());

CREATE POLICY "Users view own verification docs" ON public.verification_requests FOR ALL USING (firebase_uid = public.request_firebase_uid());
