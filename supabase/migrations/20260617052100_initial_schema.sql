-- ChocoChoco initial schema
-- profiles, categories, products, reviews, reactions

-- 프로필 테이블
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  nickname TEXT NOT NULL,
  avatar_url TEXT,
  grade TEXT NOT NULL DEFAULT '초코 입문자',
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.profiles IS '사용자 프로필';
COMMENT ON COLUMN public.profiles.grade IS '초코 등급 (초코 입문자, 카카오 러버, 마스터 빈투바 등)';

-- 카테고리 테이블
CREATE TABLE IF NOT EXISTS public.categories (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.categories IS '초콜릿 카테고리';

-- 제품 테이블
CREATE TABLE IF NOT EXISTS public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category_id INTEGER REFERENCES public.categories(id) ON DELETE SET NULL,
  cacao_content INTEGER CHECK (cacao_content BETWEEN 0 AND 100),
  taste_tags TEXT[] DEFAULT '{}',
  texture_tags TEXT[] DEFAULT '{}',
  image_url TEXT,
  description TEXT,
  average_rating NUMERIC(2, 1) DEFAULT 0 CHECK (average_rating BETWEEN 0 AND 5),
  review_count INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

COMMENT ON TABLE public.products IS '초콜릿 제품';
COMMENT ON COLUMN public.products.cacao_content IS '카카오 함량 (%)';
COMMENT ON COLUMN public.products.taste_tags IS '맛 태그 (꾸덕함, 부드러움, 쌉싸름함, 단짠단짠 등)';
COMMENT ON COLUMN public.products.texture_tags IS '식감 태그';

-- 리뷰 테이블
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  content TEXT NOT NULL,
  images TEXT[] DEFAULT '{}',
  taste_tags TEXT[] DEFAULT '{}',
  texture_tags TEXT[] DEFAULT '{}',
  is_receipt_verified BOOLEAN NOT NULL DEFAULT FALSE,
  pledge_text TEXT NOT NULL DEFAULT '협찬이나 거짓 없이 제 지갑과 미각을 걸고 작성한 찐 리뷰입니다.',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, product_id)
);

COMMENT ON TABLE public.reviews IS '초콜릿 리뷰';
COMMENT ON COLUMN public.reviews.rating IS '인생초코 지수 1~5';
COMMENT ON COLUMN public.reviews.is_receipt_verified IS '영수증 인증 여부';

-- 반응 테이블
CREATE TABLE IF NOT EXISTS public.reactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('want_to_try', 'helpful')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (user_id, review_id, type)
);

COMMENT ON TABLE public.reactions IS '리뷰 반응 (나도 먹어볼래요, 찐정보 고마워요)';
COMMENT ON COLUMN public.reactions.type IS 'want_to_try: 나도 먹어볼래요, helpful: 찐정보 고마워요';

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_products_category_id ON public.products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_brand ON public.products(brand);
CREATE INDEX IF NOT EXISTS idx_reviews_product_id ON public.reviews(product_id);
CREATE INDEX IF NOT EXISTS idx_reviews_user_id ON public.reviews(user_id);
CREATE INDEX IF NOT EXISTS idx_reactions_review_id ON public.reactions(review_id);

-- updated_at 자동 갱신 함수
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_reviews_updated_at
  BEFORE UPDATE ON public.reviews
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- auth.users 가입 시 profiles 자동 생성
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, nickname)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'nickname', '초코덕후'));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- RLS 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reactions ENABLE ROW LEVEL SECURITY;

-- profiles 정책
CREATE POLICY "프로필 공개 조회 가능" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "본인만 프로필 수정 가능" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- categories 정책
CREATE POLICY "카테고리 공개 조회 가능" ON public.categories
  FOR SELECT USING (true);

-- products 정책
CREATE POLICY "제품 공개 조회 가능" ON public.products
  FOR SELECT USING (true);

-- reviews 정책
CREATE POLICY "리뷰 공개 조회 가능" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "본인만 리뷰 작성 가능" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인만 리뷰 수정 가능" ON public.reviews
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "본인만 리뷰 삭제 가능" ON public.reviews
  FOR DELETE USING (auth.uid() = user_id);

-- reactions 정책
CREATE POLICY "반응 공개 조회 가능" ON public.reactions
  FOR SELECT USING (true);

CREATE POLICY "본인만 반응 추가 가능" ON public.reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "본인만 반응 삭제 가능" ON public.reactions
  FOR DELETE USING (auth.uid() = user_id);

-- 기본 카테고리 데이터
INSERT INTO public.categories (name, slug, description) VALUES
  ('판초콜릿', 'bar-chocolate', '일반적으로 슈퍼마켓에서 볼 수 있는 바 형태의 초콜릿'),
  ('프랄린/트러플', 'praline-truffle', '속이 채워진 초콜릿'),
  ('생초콜릿', 'fresh-chocolate', '유통기한이 짧은 신선한 초콜릿'),
  ('빈투바', 'bean-to-bar', '카카오 원두부터 직접 제작하는 프리미엄 초콜릿'),
  ('초코 과자/디저트', 'choco-snacks', '초콜릿이 들어간 과자나 디저트')
ON CONFLICT (slug) DO NOTHING;
