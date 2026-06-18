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
- GitHub Issue #9: [MVP] 마이페이지 및 초코 등급제 구현 등록
  - https://github.com/greemy867/ChocoReview/issues/9
  - PRD 3.4 / Masterplan Phase 1 기반 사용자 기능

## 진행 중인 작업
- 마이페이지 및 초코 등급제 구현
  - `/mypage` 페이지 (프로필, 등급, 내 리뷰 목록)
  - `ProfileForm` 닉네임 수정 컴포넌트
  - `lib/grade.ts` 등급 계산 유틸
  - `lib/reviews.ts` 사용자별 리뷰 조회
  - Header 컴포넌트에 마이페이지/탐색 링크 추가
