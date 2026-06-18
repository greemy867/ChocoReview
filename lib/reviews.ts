import { createClient } from '@/lib/supabase/server'

export interface Review {
  id: string
  product_id: string
  product_name: string
  product_brand: string
  rating: number
  content: string
  taste_tags: string[]
  texture_tags: string[]
  is_receipt_verified: boolean
  created_at: string
}

export async function getReviewsByUserId(userId: string): Promise<Review[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('reviews')
      .select(
        'id, product_id, rating, content, taste_tags, texture_tags, is_receipt_verified, created_at, products!inner(name, brand)'
      )
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch reviews:', error.message)
      return []
    }

    return (
      data?.map((item: any) => ({
        id: item.id,
        product_id: item.product_id,
        product_name: item.products.name,
        product_brand: item.products.brand,
        rating: item.rating,
        content: item.content,
        taste_tags: item.taste_tags,
        texture_tags: item.texture_tags,
        is_receipt_verified: item.is_receipt_verified,
        created_at: item.created_at,
      })) ?? []
    )
  } catch (err) {
    console.error('Supabase client is not configured:', err)
    return []
  }
}
