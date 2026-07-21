-- Supabase PostgreSQL 초기 스키마 (ChocoChoco MVP)

-- 사용자 추가 정보
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  avatar_url TEXT,
  grade TEXT NOT NULL DEFAULT '초코 입문자',
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 초콜릿 제품
CREATE TABLE IF NOT EXISTS public.chocolates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN (
    '판초콜릿',
    '프랄린/트러플',
    '생초콜릿',
    '빈투바',
    '초코 과자/디저트'
  )),
  cacao_content INTEGER CHECK (cacao_content BETWEEN 0 AND 100),
  taste_tags TEXT[] DEFAULT '{}',
  texture_tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 찜한 초콜릿
CREATE TABLE IF NOT EXISTS public.bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chocolate_id UUID NOT NULL REFERENCES public.chocolates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (chocolate_id, user_id)
);

-- 리뷰
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  chocolate_id UUID NOT NULL REFERENCES public.chocolates(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content TEXT NOT NULL,
  taste_tags TEXT[] DEFAULT '{}',
  texture_tags TEXT[] DEFAULT '{}',
  pledge_checked BOOLEAN NOT NULL DEFAULT FALSE,
  receipt_verified BOOLEAN NOT NULL DEFAULT FALSE,
  receipt_image_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 리뷰 사진
CREATE TABLE IF NOT EXISTS public.review_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 리뷰 반응 (나도 먹어볼래요, 찐정보 고마워요)
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('want_to_try', 'thanks')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (review_id, user_id, type)
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_chocolates_category ON public.chocolates(category);
CREATE INDEX IF NOT EXISTS idx_chocolates_brand ON public.chocolates(brand);
CREATE INDEX IF NOT EXISTS idx_reviews_chocolate_id ON public.reviews(chocolate_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_review_id ON public.reactions(review_id);

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.chocolates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.review_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

-- profiles 정책
CREATE POLICY "프로필 조회는 누구나 가능" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "본인 프로필만 수정 가능" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- chocolates 정책
CREATE POLICY "초콜릿 조회는 누구나 가능" ON public.chocolates
  FOR SELECT USING (true);

CREATE POLICY "인증된 사용자만 초콜릿 등록" ON public.chocolates
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- bookmarks 정책
CREATE POLICY "본인 찜 목록 조회" ON public.bookmarks
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "본인만 찜 추가/삭제" ON public.bookmarks
  FOR ALL USING (auth.uid() = user_id);

-- reviews 정책
CREATE POLICY "리뷰 조회는 누구나 가능" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "인증된 사용자만 리뷰 작성" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 리뷰만 수정/삭제" ON public.reviews
  FOR ALL USING (auth.uid() = user_id);

-- review_images 정책
CREATE POLICY "리뷰 사진 조회는 누구나 가능" ON public.review_images
  FOR SELECT USING (true);

CREATE POLICY "본인 리뷰 사진만 추가/삭제" ON public.review_images
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.reviews r WHERE r.id = review_images.review_id AND r.user_id = auth.uid()
    )
  );

-- reactions 정책
CREATE POLICY "리뷰 반응 조회는 누구나 가능" ON public.reactions
  FOR SELECT USING (true);

CREATE POLICY "인증된 사용자만 반응 추가" ON public.reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인 반응만 삭제" ON public.reactions
  FOR DELETE USING (auth.uid() = user_id);

-- 프로필 자동 생성 트리거
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  adjectives TEXT[] := ARRAY['달콤한', '쌉싸름한', '부드러운', '꾸덕한', '진한', '상큼한'];
  nouns TEXT[] := ARRAY['카카오', '가나', '밀크', '다크', '빈투바', '트러플', '프랄린'];
  random_nickname TEXT;
BEGIN
  random_nickname := adjectives[1 + floor(random() * array_length(adjectives, 1))]
    || nouns[1 + floor(random() * array_length(nouns, 1))]
    || floor(1 + random() * 999)::TEXT || '호';

  INSERT INTO public.profiles (id, nickname)
  VALUES (NEW.id, random_nickname);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
