import { createClient } from '@/lib/supabase/server'

export interface Comment {
  id: string
  review_id: string
  user_id: string
  content: string
  created_at: string
  updated_at: string
  profiles: {
    nickname: string
    avatar_url: string | null
  }[] | null
}

export async function getCommentsByReviewId(
  reviewId: string
): Promise<Comment[]> {
  try {
    const supabase = createClient()
    const { data, error } = await supabase
      .from('comments')
      .select(
        'id, review_id, user_id, content, created_at, updated_at, profiles(nickname, avatar_url)'
      )
      .eq('review_id', reviewId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Failed to fetch comments:', error.message)
      return []
    }

    return (data as Comment[]) ?? []
  } catch (err) {
    console.error('Supabase client is not configured:', err)
    return []
  }
}
