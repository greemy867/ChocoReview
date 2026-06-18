import { notFound } from 'next/navigation'
import { getProductById } from '@/lib/products'
import { getReviewsByProductId } from '@/lib/reviews'
import RatingChocochips from '@/components/RatingChocochips'
import ReviewCard from '@/components/ReviewCard'

interface ProductPageProps {
  params: { id: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductById(params.id)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProductId(params.id)

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-4xl mx-auto">
        {/* 제품 정보 */}
        <section className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/3 aspect-square bg-choco-50 rounded-2xl flex items-center justify-center text-8xl">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-full object-cover rounded-2xl"
                />
              ) : (
                '🍫'
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-choco-500 mb-2">
                {product.brand}
              </p>
              <h1 className="text-3xl font-black text-choco-800 mb-4">
                {product.name}
              </h1>
              {product.cacao_content && (
                <p className="text-choco-600 font-medium mb-4">
                  카카오 함량: {product.cacao_content}%
                </p>
              )}
              <div className="flex items-center gap-3 mb-4">
                <RatingChocochips
                  value={Math.round(product.average_rating)}
                  readonly
                  size="sm"
                />
                <span className="text-choco-500 font-medium">
                  {product.average_rating.toFixed(1)} ({product.review_count}개
                  리뷰)
                </span>
              </div>
              {product.description && (
                <p className="text-choco-600 leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
          </div>
        </section>

        {/* 리뷰 작성 유도 */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-choco-800">
            찐 리뷰 {reviews.length}개
          </h2>
          <a
            href="/reviews/new"
            className="cute-btn px-6 py-3 bg-lemon text-choco-900 font-bold hover:bg-yellow-200 transition"
          >
            리뷰 작성하기 📝
          </a>
        </div>

        {/* 리뷰 목록 */}
        <div className="space-y-4">
          {reviews.length === 0 ? (
            <div className="bg-white rounded-3xl border-2 border-choco-100 p-10 text-center">
              <p className="text-4xl mb-4">🍫</p>
              <p className="text-choco-600 font-medium">
                아직 리뷰가 없어요. 첫 번째 찐 리뷰어가 되어주세요!
              </p>
            </div>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))
          )}
        </div>
      </div>
    </main>
  )
}
