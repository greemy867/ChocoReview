현재 진행도 X

## landing-page 개발
- 사용자용 서비스 소개 페이지(`landing-page/index.html`) 작성 완료
- 개발자용 마스터플랜 페이지(`landing-page/masterplan.html`) 백업
- 공감 중심 카피 + 기간 한정 혜택 섹션 추가
- 초콜릿/이모지/파스텔 컬러 기반 귀여운 디자인 적용
- GitHub main 브랜치에 푸시 완료 (commit: 51cbb99)

## 프로젝트 초기 세팅
- Next.js 14 + TypeScript + Tailwind CSS 프로젝트 구성
- App Router 기반 `/app` 구조 설정
- Supabase 연결을 위한 클라이언트/서버/미들웨어 모듈 추가
- 환경변수 템플릿 (`.env.example`) 작성
- 귀여운 초콜릿 테마의 랜딩페이지를 Next.js 컴포넌트(`/app/page.tsx`)로 마이그레이션
- `npm run build` 정상 통과 확인
- feature branch `feature/setup-project`에 작업 중

## 이슈 등록
- GitHub Issue #3: [MVP] 초콜릿 제품 DB 스키마 설계 및 기본 데이터 적재 등록
  - https://github.com/greemy867/ChocoReview/issues/3
  - PRD 3.2 ~ 3.4 / Masterplan Phase 1 기반 MVP 데이터 모델링

## 진행 중인 작업
- 초콜릿 제품 DB 스키마 마이그레이션 작성
  - `supabase/migrations/20260617052100_initial_schema.sql`
  - profiles, categories, products, reviews, reactions 테이블 및 RLS 정책
- GitHub PR #4: 초콜릿 제품 DB 스키마 설계 및 기본 데이터 적재
  - https://github.com/greemy867/ChocoReview/pull/4
  - feature branch `feature/db-schema`에 작업 완료, PR 리뷰 대기 중
