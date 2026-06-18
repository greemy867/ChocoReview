import { createClient } from '@/lib/supabase/server'

export interface Product {
  id: string
  name: string
  brand: string
  category_id: number | null
  cacao_content: number | null
  taste_tags: string[]
  texture_tags: string[]
  average_rating: number
  review_count: number
  image_url: string | null
  description: string | null
  created_at: string
}

export interface ProductFilter {
  category?: string
  cacaoMin?: number
  cacaoMax?: number
  tasteTags?: string[]
  textureTags?: string[]
  search?: string
  sort?: 'latest' | 'rating' | 'reviews'
}

const TASTE_TAG_OPTIONS = [
  '꾸덕함',
  '부드러움',
  '쌉싸름함',
  '달콤함',
  '단짠단짠',
  '고소함',
  '산뜻함',
]

const TEXTURE_TAG_OPTIONS = [
  '바삭함',
  '크리미함',
  '멜팅',
  '쫄깃함',
  '부서짐',
  '겉바속촉',
]

export { TASTE_TAG_OPTIONS, TEXTURE_TAG_OPTIONS }

export async function getProducts(filter: ProductFilter = {}): Promise<Product[]> {
  try {
    const supabase = createClient()
    let query = supabase
      .from('products')
      .select(
        'id, name, brand, category_id, cacao_content, taste_tags, texture_tags, average_rating, review_count, image_url, description, created_at, categories!inner(slug)'
      )

    if (filter.category) {
      query = query.eq('categories.slug', filter.category)
    }

    if (filter.cacaoMin !== undefined) {
      query = query.gte('cacao_content', filter.cacaoMin)
    }

    if (filter.cacaoMax !== undefined) {
      query = query.lte('cacao_content', filter.cacaoMax)
    }

    if (filter.tasteTags && filter.tasteTags.length > 0) {
      query = query.contains('taste_tags', filter.tasteTags)
    }

    if (filter.textureTags && filter.textureTags.length > 0) {
      query = query.contains('texture_tags', filter.textureTags)
    }

    if (filter.search) {
      const keyword = filter.search.trim()
      query = query.or(`name.ilike.%${keyword}%,brand.ilike.%${keyword}%`)
    }

    const sort = filter.sort ?? 'latest'
    if (sort === 'rating') {
      query = query.order('average_rating', { ascending: false })
    } else if (sort === 'reviews') {
      query = query.order('review_count', { ascending: false })
    } else {
      query = query.order('created_at', { ascending: false })
    }

    const { data, error } = await query

    if (error) {
      console.error('Failed to fetch products:', error.message)
      return []
    }

    return (data as Product[]) ?? []
  } catch (err) {
    console.error('Supabase client is not configured:', err)
    return []
  }
}
