# ChocoChoco 개발 진행도

## ✅ 완료
- Next.js 14 + TypeScript + Tailwind CSS 프로젝트 초기화
- 랜딩 페이지를 Next.js 앱에 통합 (app/page.tsx)
- Supabase 클라이언트 설정 (lib/supabase/client.ts, server.ts)
- Middleware 세션 갱신 설정
- DB 스키마 설계 (sql/migrations/001_initial.sql)
- 기본 페이지 뼈대 작성
  - /chocolates (초콜릿 목록 + 필터)
  - /chocolates/[id] (상세 + 리뷰 목록)
  - /reviews/new (찐 리뷰 작성 폼)
  - /mypage (프로필, 등급, 내 리뷰, 찜 목록)
  - /login (구글/카카오 소셜 로그인)
  - /auth/callback (OAuth 콜백)
- 개발 서버 실행 완료 (https://w-d1c5be89.doit-now.ai)

## 🔄 진행 중
- Supabase 프로젝트 연결 대기

## 📋 남은 작업
- Supabase 연결 후 환경 변수 적용
- 구글/카카오 OAuth Provider 설정
- 초콜릿/리뷰/반응/찜 데이터 실제 CRUD 연동
- Supabase Storage 이미지 업로드 연동
- Vercel 배포
