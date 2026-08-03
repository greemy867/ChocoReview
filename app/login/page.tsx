'use client'

import { createClient } from '@/lib/supabase/client'

export default function LoginPage() {
  const signInWithProvider = async (provider: 'google') => {
    const supabase = createClient()
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error('OAuth login error:', error.message)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-cream px-6 py-20">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8 md:p-10 text-center">
        <div className="text-6xl mb-6 animate-bounce">🍫</div>
        <h1 className="text-2xl md:text-3xl font-black text-choco-800 mb-3">
          쵸코쵸코 시작하기
        </h1>
        <p className="text-choco-500 mb-8 font-medium">
          3초 만에 가입하고 초코덕후들의 찐 리뷰를 만나보세요!
        </p>

        <div className="space-y-3">
          <button
            onClick={() => signInWithProvider('google')}
            className="cute-btn w-full flex items-center justify-center gap-3 px-6 py-4 bg-white border-2 border-choco-200 text-choco-800 font-bold text-base hover:bg-choco-50 transition"
          >
            <span className="text-xl">🔍</span>
            Google로 계속하기
          </button>
        </div>

        <p className="mt-8 text-sm text-choco-400 font-medium">
          로그인하면 쵸코쵸코의 서비스 이용약관 및 개인정보 처리방침에 동의하게
          됩니다.
        </p>
      </div>
    </main>
  )
}
