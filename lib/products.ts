import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  name: string
  brand: string
  category_id: number | null
  cacao_content: number | null
  average_rating: number
  review_count: number
  image_url: string | null
  description: string | null
}

export async function getProducts(): Promise<Product[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('id, name, brand, category_id, cacao_content, average_rating, review_count, image_url, description')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Failed to fetch products:', error.message)
      return []
    }

    return data ?? []
  } catch (err) {
    console.error('Supabase client is not configured:', err)
    return []
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('products')
      .select('id, name, brand, category_id, cacao_content, average_rating, review_count, image_url, description')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Failed to fetch product:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.error('Supabase client is not configured:', err)
    return null
  }
}
