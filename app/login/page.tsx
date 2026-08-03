"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function signInWith(provider: "google") {
    setLoading(true);
    setError(null);
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "로그인 중 문제가 발생했어요. Supabase 연결을 확인해주세요."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20 flex items-center justify-center px-6">
      <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-choco-100 max-w-md w-full text-center">
        <div className="text-6xl mb-6 animate-bounce">🍫</div>
        <h1 className="text-2xl md:text-3xl font-black text-choco-800 mb-3">
          쵸코쵸코 시작하기
        </h1>
        <p className="text-choco-500 font-medium mb-8">
          3초 만에 가입하고 초코덕후들과 함께해요.
        </p>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-2xl text-sm font-bold">
            {error}
          </div>
        )}

        <div className="space-y-3">
          <button
            onClick={() => signInWith("google")}
            disabled={loading}
            className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-choco-100 rounded-2xl font-bold text-choco-800 hover:bg-choco-50 transition disabled:opacity-50"
          >
            <span className="text-xl">🔍</span> 구글로 계속하기
          </button>
        </div>

        <p className="mt-6 text-xs text-choco-400 font-medium">
          가입 시 자동으로 귀여운 초코덕후 닉네임이 생성돼요.
        </p>
      </div>
    </main>
  );
}
