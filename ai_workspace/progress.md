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
- GitHub Issue #1: [MVP] 구글/카카오 소셜 로그인 연동 등록
  - https://github.com/greemy867/ChocoReview/issues/1
  - PRD 3.1 / Masterplan Phase 1 기반 MVP 우선 과제

## 진행 중인 작업
- GitHub PR #2: 구글/카카오 소셜 로그인 연동
  - https://github.com/greemy867/ChocoReview/pull/2
  - `/login` 페이지, `/auth/callback` 처리, Header 컴포넌트, 랜덤 닉네임 생성 구현
  - feature branch `feature/social-login`에 작업 완료, PR 리뷰 대기 중
