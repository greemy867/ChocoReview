# 📝 제품 요구사항 정의서 (PRD)

## 1. 제품 개요 (Overview)
* **제품명**: ChocoChoco (쵸코쵸코 - 가칭)
* **개념**: 오직 초콜릿 제품만을 다루며, 이웃집 초코덕후와 대화하듯 정감 있게 진짜 리뷰를 나누는 소셜 로그인 기반의 리뷰 플랫폼.
* **주요 타겟**: 
  * 매일 초콜릿을 달고 사는 하드코어 초코덕후
  * 발렌타인데이나 선물용으로 정말 맛있는 초콜릿을 찾고 싶은 일반 소비자
  * 바이럴 광고에 속아 맛없는 초콜릿을 사고 실망한 경험이 있는 사람

---

## 2. 사용자 경험 및 톤앤매너 (Tone & Manner)
* **따뜻하고 아늑한 디자인**: 다크 초콜릿, 밀크 초콜릿을 연상시키는 브라운 & 웜톤 컬러 베이스 사용.
* **친근한 구어체**: 서비스 내 문구(Copywriting)는 딱딱한 안내문 대신 `"오늘 어떤 초콜릿으로 힐링하셨어요?", "이 초콜릿 진짜예요? (속닥속닥)"` 같은 정감 있는 말투 사용.

---

## 3. 핵심 기능 요구사항 (Functional Requirements)

### 3.1. 회원가입 및 로그인 (Authentication)
* **[필수] 구글 소셜 로그인 (OAuth 2.0)**
  * 복잡한 이메일 인증 없이 3초 만에 가입 가능해야 함.
  * 가입 시 초기 닉네임은 친근한 형태(예: *가나초코덕후*)로 자동 생성 후 변경 유도.

### 3.2. 초콜릿 제품 탐색
* **제품 카테고리 분화**: 
  * 판초콜릿, 프랄린/트러플, 생초콜릿, 빈투바(Bean-to-Bar), 초코 과자/디저트 등.
* **초코 특화 필터**: 
  * 카카오 함량별 (0~30%, 50%, 70% 이상 등)
  * 맛/식감별 (꾸덕함, 부드러움, 쌉싸름함, 단짠단짠)

### 3.3. 찐 리뷰 작성 및 조회 (Core)
* **리뷰 작성 스펙**:
  * 별점(5점 만점) 대신 **'인생초코 지수'** (예: 🍫 단추 1~5개) 부여.
  * 광고 차단을 위한 한 줄 다짐 필수 체크: *"협찬이나 거짓 없이 제 지갑과 미각을 걸고 작성한 찐 리뷰입니다."*
  * 맛의 특징을 직관적인 레이더 차트나 태그 형태로 선택 가능하게 함.
* **정감 있는 상호작용**:
  * '좋아요' 대신 **"나도 먹어볼래요"**, **"찐정보 고마워요"** 버튼 제공.

### 3.4. 마이페이지 및 등급제
* 내가 쓴 리뷰 모아보기, 찜한 초콜릿 리스트.
* **초코 등급 (재미 요소)**: 작성한 찐 리뷰 수에 따라 *'초코 입문자' ➔ '카카오 러버' ➔ '마스터 빈투바'* 등으로 등급과 귀여운 아이콘 부여.

---

## 4. 비기능 요구사항 (Non-Functional Requirements)
* **보안**: OAuth 2.0 가이드라인을 준수하여 유저 정보(토큰)를 안전하게 관리.
* **성능**: 초콜릿 이미지 로딩 속도 최적화 (WebP 포맷 사용 및 Lazy Loading 적용).
* **SEO**: 초콜릿 제품명 검색 시 구글 등 포털에 리뷰가 잘 노출되도록 SSR(Server-Side Rendering) 고려.

---

## 5. 기술 스택 및 배포 (Tech Stack & Deployment)
MVP를 빠르게 구축하고 관리하기 위해 **Vercel**과 **Supabase**를 기반으로 합니다.

### 5.1. 핵심 기술 스택
* **Frontend**: Next.js 14 (App Router), TypeScript, Tailwind CSS
  * SEO와 빠른 초기 로딩을 위해 SSR/SSG 적극 활용
  * 친근하고 따뜻한 UI를 위한 Tailwind CSS 기반 디자인 시스템
* **Backend**: Next.js API Routes + Supabase Edge Functions (필요 시)
  * MVP 단계에서는 Next.js API Routes로 간단하게 처리
  * 복잡한 비즈니스 로직이 생기면 Supabase Edge Functions 확장 검토
* **Database**: Supabase PostgreSQL
  * 초콜릿 제품, 사용자, 리뷰, 댓글, 공감 등 정형 데이터 관리
  * Row Level Security(RLS)로 데이터 접근 권한 제어
* **Authentication**: Supabase Auth
  * 구글 OAuth 2.0 소셜 로그인 연동
  * 가입 시 랜덤 초코덕후 닉네임 자동 생성
* **Storage**: Supabase Storage
  * 리뷰 사진, 영수증 인증 이미지, 프로필 이미지 등 업로드
  * 이미지는 WebP 변환 및 압축 후 저장
* **Image Optimization**
  * Next.js Image 컴포넌트 + WebP 포맷 + Lazy Loading
  * 초콜릿 사진 로딩 속도 최적화

### 5.2. 배포 및 운영
* **Hosting / CI-CD**: Vercel
  * GitHub main 브랜치 push 시 자동 배포
  * Preview Deployment로 PR 단계에서 미리보기 가능
* **Database / Auth / Storage Hosting**: Supabase
  * 관리형 PostgreSQL로 운영 부담 최소화
  * Auth, Storage를 한 곳에서 통합 관리
* **Environment Variables**
  * `NEXT_PUBLIC_SUPABASE_URL`
  * `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  * `SUPABASE_SERVICE_ROLE_KEY` (서버 사이드 전용, 절대 노출 금지)
  * OAuth Provider Secret (Google)

### 5.3. 선정 이유
* **빠른 MVP 출시**: Vercel + Supabase 조합으로 인프라 세팅 시간을 최소화
* **비용 효율**: 초기 무료 이용량 기준으로 비용 부담이 적음
* **확장성**: 사용자가 늘어나면 Supabase Pro, Vercel Pro 등으로 단계적 확장 가능
* **개발자 경험**: TypeScript 기반의 통합 DX로 생산성 향상

---

## 6. 제외된 기능 (Out of Scope for MVP)
* 자체 커머스 및 결제 기능 (MVP 단계에서는 순수 리뷰/커뮤니티 집중)
* 유저 간 1:1 다이렉트 메시지(DM) 기능
