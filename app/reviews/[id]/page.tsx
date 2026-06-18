import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getReviewById } from '@/lib/reviews'
import { getCommentsByReviewId } from '@/lib/comments'
import { createClient } from '@/lib/supabase/server'
import ReactionButtons from '@/components/ReactionButtons'
import CommentList from '@/components/CommentList'
import CommentForm from './CommentForm'

interface ReviewPageProps {
  params: { id: string }
}

export default async function ReviewPage({ params }: ReviewPageProps) {
  const review = await getReviewById(params.id)

  if (!review) {
    notFound()
  }

  const comments = await getCommentsByReviewId(params.id)

  let currentUserId: string | null = null
  let userReaction: 'want_to_try' | 'helpful' | null = null

  try {
    const supabase = createClient()
    const { data: userData } = await supabase.auth.getUser()
    currentUserId = userData.user?.id ?? null

    if (currentUserId) {
      const { data: reactionData } = await supabase
        .from('reactions')
        .select('type')
        .eq('review_id', params.id)
        .eq('user_id', currentUserId)
        .single()

      if (reactionData) {
        userReaction = reactionData.type as 'want_to_try' | 'helpful'
      }
    }
  } catch (err) {
    console.error('Supabase client is not configured:', err)
  }

  // TODO: 실제 카운트는 별도 집계 쿼리나 DB 트리거로 최적화 가능
  const wantToTryCount = 0
  const helpfulCount = 0

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/products/${review.product_id}`}
          className="text-sm font-bold text-choco-500 hover:text-choco-800 transition mb-4 inline-block"
        >
          ← 제품 페이지로 돌아가기
        </Link>

        {/* 리뷰 본문 */}
        <article className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-choco-100 flex items-center justify-center text-xl">
              {review.profiles?.[0]?.avatar_url ? (
                <img
                  src={review.profiles[0].avatar_url}
                  alt={review.profiles[0].nickname}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '🙂'
              )}
            </div>
            <div>
              <p className="font-bold text-choco-800">
                {review.profiles?.[0]?.nickname ?? '익명의 초코덕후'}
              </p>
              <p className="text-xs text-choco-400">
                {new Date(review.created_at).toLocaleDateString('ko-KR')}
              </p>
            </div>
          </div>

          <h1 className="text-xl font-black text-choco-800 mb-2">
            [{review.product_brand}] {review.product_name}
          </h1>

          <div className="flex items-center gap-2 mb-4">
            <span className="text-lemon text-2xl">
              {'🍫'.repeat(review.rating)}
            </span>
            <span className="text-choco-500 font-medium">
              인생초코 지수 {review.rating}개
            </span>
          </div>

          <p className="text-choco-700 leading-relaxed whitespace-pre-line mb-6">
            {review.content}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {review.taste_tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-mint text-choco-800 text-xs font-bold"
              >
                {tag}
              </span>
            ))}
            {review.texture_tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-pinky text-choco-800 text-xs font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          {review.is_receipt_verified && (
            <p className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lemon text-choco-900 text-xs font-black mb-6">
              ✓ 영수증 인증 찐리뷰
            </p>
          )}

          <ReactionButtons
            reviewId={params.id}
            initialWantToTry={wantToTryCount}
            initialHelpful={helpfulCount}
            userReaction={userReaction}
          />
        </article>

        {/* 댓글 */}
        <section className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8">
          <h2 className="text-xl font-black text-choco-800 mb-4">
            댓글 {comments.length}개
          </h2>
          <CommentList comments={comments} />
          <div className="mt-6 pt-6 border-t border-choco-100">
            <CommentForm reviewId={params.id} />
          </div>
        </section>
      </div>
    </main>
  )
}
