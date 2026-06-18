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
- GitHub Issue #13: [MVP] 리뷰 이미지 업로드 및 최적화 등록
  - https://github.com/greemy867/ChocoReview/issues/13
  - PRD 5.1 / PRD 3.3 기반 이미지 업로드 기능

## 진행 중인 작업
- 리뷰 이미지 업로드 및 최적화 구현
  - `lib/image-upload.ts` 이미지 리사이즈/WebP 변환/업로드 유틸
  - `ImageUploader` 컴포넌트 (다중 업로드, 미리보기, 삭제)
  - `ImageGallery` 컴포넌트 (lazy loading, 라이트박스)
  - `/upload-test` 데모 페이지
