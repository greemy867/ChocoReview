import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import LogoutButton from './LogoutButton'

export default async function Header() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const nickname = user?.user_metadata?.nickname

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
          {user ? (
            <>
              <span className="text-sm font-medium text-choco-600">
                {nickname ? `${nickname} 님` : '초코덕후 님'}
              </span>
              <LogoutButton />
            </>
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
