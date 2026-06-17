import { createClient } from '@/lib/supabase/server'

export interface Review {
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

export async function getReviewsByProductId(
  productId: string
): Promise<Review[]> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('reviews')
    .select(
      'id, user_id, product_id, rating, content, taste_tags, texture_tags, is_receipt_verified, created_at, profiles(nickname, avatar_url)'
    )
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch reviews:', error.message)
    return []
  }

  return data ?? []
}
