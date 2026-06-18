import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export default async function Header() {
  let user = null

  try {
    const supabase = createClient()
    const { data } = await supabase.auth.getUser()
    user = data.user
  } catch (err) {
    console.error('Supabase client is not configured:', err)
  }

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-choco-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-black text-choco-800 flex items-center gap-2"
        >
          <span className="animate-wiggle">🍫</span>
          쵸코쵸코
        </Link>

        <nav className="flex items-center gap-4">
          <Link
            href="/products"
            className="text-sm font-bold text-choco-600 hover:text-choco-800 transition"
          >
            초콜릿 탐색
          </Link>
          {user ? (
            <Link
              href="/mypage"
              className="cute-btn px-5 py-2 bg-lemon text-choco-900 font-bold text-sm hover:bg-yellow-200 transition"
            >
              마이페이지
            </Link>
          ) : (
            <Link
              href="/login"
              className="cute-btn px-5 py-2 bg-lemon text-choco-900 font-bold text-sm hover:bg-yellow-200 transition"
            >
              로그인 / 가입
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
