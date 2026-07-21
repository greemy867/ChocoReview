"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-choco-100 max-w-md w-full text-center">
        <div className="text-6xl mb-6">🍫</div>
        <h1 className="text-2xl font-black text-choco-800 mb-3">앗, 문제가 생겼어요</h1>
        <p className="text-choco-500 font-medium mb-8">
          {message === "oauth-callback-failed"
            ? "로그인 처리 중 오류가 발생했어요. 다시 시도해주세요."
            : "요청을 처리하지 못했어요. 잠시 후 다시 시도해주세요."}
        </p>
        <Link
          href="/"
          className="cute-btn inline-block px-8 py-3 bg-choco-600 text-white font-black hover:bg-choco-700 transition"
        >
          홈으로 돌아가기
        </Link>
      </div>
    </main>
  );
}

export default function ErrorPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-cream" />}>
      <ErrorContent />
    </Suspense>
  );
}
