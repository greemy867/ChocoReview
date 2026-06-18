'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'

interface CommentFormProps {
  reviewId: string
}

export default function CommentForm({ reviewId }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    setError(null)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('로그인 후 댓글을 작성할 수 있어요.')
        return
      }

      const { error: insertError } = await supabase.from('comments').insert({
        review_id: reviewId,
        user_id: user.id,
        content: content.trim(),
      })

      if (insertError) {
        setError(`댓글 저장에 실패했어요: ${insertError.message}`)
        return
      }

      setContent('')
      router.refresh()
    } catch (err) {
      setError('Supabase 연결이 설정되지 않았어요.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요..."
        rows={3}
        className="w-full px-4 py-3 rounded-xl border-2 border-choco-200 focus:border-lemon focus:outline-none resize-none text-choco-800 font-medium"
      />
      {error && (
        <p className="text-sm text-red-500 font-bold">{error}</p>
      )}
      <button
        type="submit"
        disabled={pending || !content.trim()}
        className="cute-btn px-6 py-2 bg-lemon text-choco-900 font-bold hover:bg-yellow-200 transition disabled:opacity-50"
      >
        {pending ? '저장 중...' : '댓글 남기기 💬'}
      </button>
    </form>
  )
}
