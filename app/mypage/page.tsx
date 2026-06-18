import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getReviewsByUserId } from '@/lib/reviews'
import { getGradeByReviewCount, getNextGradeInfo } from '@/lib/grade'
import ProfileForm from './ProfileForm'
import Link from 'next/link'

export default async function MyPage() {
  let user = null
  let profile = null

  try {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    user = userData.user

    if (user) {
      const { data } = await supabase
        .from('profiles')
        .select('nickname, avatar_url, review_count, created_at')
        .eq('id', user.id)
        .single()
      profile = data
    }
  } catch (err) {
    console.error('Supabase client is not configured:', err)
  }

  if (!user) {
    redirect('/login')
  }

  const reviews = await getReviewsByUserId(user.id)
  const reviewCount = profile?.review_count ?? reviews.length ?? 0
  const grade = getGradeByReviewCount(reviewCount)
  const { nextGrade, remaining } = getNextGradeInfo(reviewCount)

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* 프로필 카드 */}
        <section className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-24 h-24 rounded-full bg-choco-100 flex items-center justify-center text-5xl">
              {profile?.avatar_url ? (
                <img
                  src={profile.avatar_url}
                  alt={profile.nickname}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '🙂'
              )}
            </div>
            <div>
              <h1 className="text-2xl font-black text-choco-800 mb-1">
                {profile?.nickname ?? '초코덕후'} 님
              </h1>
              <p className="text-sm text-choco-400 font-medium">
                가입일:{' '}
                {profile?.created_at
                  ? new Date(profile.created_at).toLocaleDateString('ko-KR')
                  : '-'}
              </p>
            </div>
          </div>

          <ProfileForm
            initialNickname={profile?.nickname ?? '초코덕후'}
            userId={user.id}
          />
        </section>

        {/* 등급 카드 */}
        <section className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8 text-center">
          <div className="text-6xl mb-4">{grade.icon}</div>
          <h2 className="text-2xl font-black text-choco-800 mb-2">
            {grade.name}
          </h2>
          <p className="text-choco-500 font-medium mb-6">{grade.description}</p>

          <div className="bg-choco-50 rounded-2xl p-6">
            <p className="text-lg font-bold text-choco-800 mb-2">
              현재 작성한 찐 리뷰: {reviewCount}개
            </p>
            {nextGrade ? (
              <p className="text-choco-600 font-medium">
                다음 등급 <span className="font-bold">{nextGrade.name}</span>까지
                <span className="font-bold text-lemon"> {remaining}개 </span>
                남았어요!
              </p>
            ) : (
              <p className="text-choco-600 font-medium">
                축하해요! 최고 등급에 도달했어요 🎉
              </p>
            )}
          </div>
        </section>

        {/* 내 리뷰 목록 */}
        <section>
          <h2 className="text-2xl font-black text-choco-800 mb-4">
            내가 쓴 찐 리뷰
          </h2>
          {reviews.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-choco-100 p-10 text-center">
              <p className="text-5xl mb-4">🍫</p>
              <p className="text-choco-600 font-medium mb-4">
                아직 작성한 리뷰가 없어요.
              </p>
              <Link
                href="/reviews/new"
                className="cute-btn inline-block px-6 py-3 bg-lemon text-choco-900 font-bold hover:bg-yellow-200 transition"
              >
                첫 리뷰 작성하기 📝
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Link
                  key={review.id}
                  href={`/products/${review.product_id}`}
                  className="block bg-white rounded-3xl border-2 border-choco-100 p-6 hover:shadow-md transition"
                >
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <p className="text-sm font-bold text-choco-500">
                        {review.product_brand}
                      </p>
                      <h3 className="text-lg font-black text-choco-800">
                        {review.product_name}
                      </h3>
                    </div>
                    <span className="text-lemon text-lg">
                      {'🍫'.repeat(review.rating)}
                    </span>
                  </div>
                  <p className="text-choco-600 line-clamp-2">{review.content}</p>
                </Link>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
