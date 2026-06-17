import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { generateRandomNickname } from '@/lib/nickname'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/'

  if (!code) {
    return NextResponse.redirect(`${origin}/login?error=missing_code`)
  }

  const supabase = createClient()
  const { error } = await supabase.auth.exchangeCodeForSession(code)

  if (error) {
    return NextResponse.redirect(`${origin}/login?error=${error.message}`)
  }

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const currentNickname = user?.user_metadata?.nickname
  if (user && !currentNickname) {
    const nickname = generateRandomNickname()
    await supabase.auth.updateUser({
      data: { nickname },
    })
  }

  return NextResponse.redirect(`${origin}${next}`)
}
