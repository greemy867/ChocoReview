'use client'

import { useState } from 'react'
import { createReview } from './actions'
import RatingChocochips from '@/components/RatingChocochips'
import TagSelector from '@/components/TagSelector'

interface Product {
  id: string
  name: string
  brand: string
}

const TASTE_OPTIONS = [
  '꾸덕함',
  '부드러움',
  '쌉싸름함',
  '달콤함',
  '단짠단짠',
  '고소함',
  '산뜻함',
]

const TEXTURE_OPTIONS = [
  '바삭함',
  '크리미함',
  '멜팅',
  '쫄깃함',
  '부서짐',
  '겉바속촉',
]

interface ReviewFormProps {
  products: Product[]
}

export default function ReviewForm({ products }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [tasteTags, setTasteTags] = useState<string[]>([])
  const [textureTags, setTextureTags] = useState<string[]>([])
  const [isReceiptVerified, setIsReceiptVerified] = useState(false)
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPending(true)
    setError(null)

    const formData = new FormData(event.currentTarget)

    try {
      await createReview({
        productId: formData.get('productId') as string,
        rating,
        content: formData.get('content') as string,
        tasteTags,
        textureTags,
        isReceiptVerified,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : '알 수 없는 오류가 발생했어요.')
      setPending(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8 space-y-6"
    >
      <div>
        <label
          htmlFor="productId"
          className="block text-sm font-bold text-choco-700 mb-2"
        >
          리뷰할 초콜릿 🍫
        </label>
        <select
          id="productId"
          name="productId"
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-choco-200 focus:border-lemon focus:outline-none bg-white text-choco-800 font-medium"
        >
          <option value="">초콜릿을 선택해주세요</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              [{product.brand}] {product.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          인생초코 지수
        </label>
        <RatingChocochips value={rating} onChange={setRating} size="lg" />
        <p className="mt-2 text-sm text-choco-400 font-medium">
          {rating > 0 ? `${rating}개의 초콜릿을 주셨어요!` : '초콜릿을 눌러 평점을 매겨주세요'}
        </p>
      </div>

      <TagSelector
        label="맛 태그"
        options={TASTE_OPTIONS}
        selected={tasteTags}
        onChange={setTasteTags}
      />

      <TagSelector
        label="식감 태그"
        options={TEXTURE_OPTIONS}
        selected={textureTags}
        onChange={setTextureTags}
      />

      <div>
        <label
          htmlFor="content"
          className="block text-sm font-bold text-choco-700 mb-2"
        >
          찐 리뷰 내용
        </label>
        <textarea
          id="content"
          name="content"
          required
          rows={5}
          placeholder="맛, 식감, 가성비, 추천 포인트 등 솔직한 후기를 남겨주세요."
          className="w-full px-4 py-3 rounded-xl border-2 border-choco-200 focus:border-lemon focus:outline-none resize-none text-choco-800 font-medium"
        />
      </div>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={isReceiptVerified}
          onChange={(e) => setIsReceiptVerified(e.target.checked)}
          className="mt-1 w-5 h-5 accent-lemon"
        />
        <span className="text-sm text-choco-600 font-medium">
          "협찬이나 거짓 없이 제 지갑과 미각을 걸고 작성한 찐 리뷰입니다."
        </span>
      </label>

      {error && (
        <p className="text-sm text-red-500 font-bold bg-red-50 px-4 py-3 rounded-xl">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={pending || rating === 0}
        className="cute-btn w-full px-6 py-4 bg-lemon text-choco-900 font-black text-lg hover:bg-yellow-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {pending ? '저장 중...' : '찐 리뷰 등록하기 🚀'}
      </button>
    </form>
  )
}
