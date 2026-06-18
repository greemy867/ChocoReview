import { createClient } from '@/lib/supabase/server'

export interface ReviewDetail {
  id: string
  user_id: string
  product_id: string
  product_name: string
  product_brand: string
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

export async function getReviewById(id: string): Promise<ReviewDetail | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('reviews')
      .select(
        'id, user_id, product_id, rating, content, taste_tags, texture_tags, is_receipt_verified, created_at, profiles(nickname, avatar_url), products!inner(name, brand)'
      )
      .eq('id', id)
      .single()

    if (error) {
      console.error('Failed to fetch review:', error.message)
      return null
    }

    const product = Array.isArray(data.products) ? data.products[0] : data.products

    return {
      id: data.id,
      user_id: data.user_id,
      product_id: data.product_id,
      product_name: product?.name ?? '',
      product_brand: product?.brand ?? '',
      rating: data.rating,
      content: data.content,
      taste_tags: data.taste_tags,
      texture_tags: data.texture_tags,
      is_receipt_verified: data.is_receipt_verified,
      created_at: data.created_at,
      profiles: data.profiles,
    } as ReviewDetail
  } catch (err) {
    console.error('Supabase client is not configured:', err)
    return null
  }
}
