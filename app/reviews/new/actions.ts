'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export interface ReviewFormData {
  productId: string
  rating: number
  content: string
  tasteTags: string[]
  textureTags: string[]
  isReceiptVerified: boolean
}

export async function createReview(formData: ReviewFormData) {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('로그인이 필요합니다.')
  }

  const { data: review, error: reviewError } = await supabase
    .from('reviews')
    .insert({
      user_id: user.id,
      product_id: formData.productId,
      rating: formData.rating,
      content: formData.content,
      taste_tags: formData.tasteTags,
      texture_tags: formData.textureTags,
      is_receipt_verified: formData.isReceiptVerified,
    })
    .select('id, product_id')
    .single()

  if (reviewError) {
    throw new Error(`리뷰 저장에 실패했습니다: ${reviewError.message}`)
  }

  // 제품 평점/리뷰 수 갱신
  const { data: stats } = await supabase
    .from('reviews')
    .select('rating')
    .eq('product_id', formData.productId)

  const ratings = stats?.map((r) => r.rating) ?? []
  const averageRating =
    ratings.length > 0
      ? Number((ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1))
      : 0

  await supabase
    .from('products')
    .update({
      average_rating: averageRating,
      review_count: ratings.length,
    })
    .eq('id', formData.productId)

  // 프로필 리뷰 수 증가
  const { data: profile } = await supabase
    .from('profiles')
    .select('review_count')
    .eq('id', user.id)
    .single()

  await supabase
    .from('profiles')
    .update({ review_count: (profile?.review_count ?? 0) + 1 })
    .eq('id', user.id)

  revalidatePath(`/products/${review.product_id}`)
  redirect(`/products/${review.product_id}`)
}
