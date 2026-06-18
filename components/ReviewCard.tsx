import RatingChocochips from './RatingChocochips'

interface Review {
  id: string
  user_id: string
  product_id: string
  rating: number
  content: string
  taste_tags: string[]
  texture_tags: string[]
  is_receipt_verified: boolean
  created_at: string
  profiles: {
    nickname: string
    avatar_url: string | null
  }[] | null
}

interface ReviewCardProps {
  review: Review
}

export default function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="bg-white rounded-3xl border-2 border-choco-100 p-6 md:p-8">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="flex items-center gap-3">
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
        <RatingChocochips value={review.rating} readonly size="sm" />
      </div>

      <p className="text-choco-700 leading-relaxed mb-4 whitespace-pre-line">
        {review.content}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
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
        <p className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-lemon text-choco-900 text-xs font-black">
          ✓ 영수증 인증 찐리뷰
        </p>
      )}
    </article>
  )
}
