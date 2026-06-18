'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ReactionButtonsProps {
  reviewId: string
  initialWantToTry: number
  initialHelpful: number
  userReaction?: 'want_to_try' | 'helpful' | null
}

export default function ReactionButtons({
  reviewId,
  initialWantToTry,
  initialHelpful,
  userReaction,
}: ReactionButtonsProps) {
  const [counts, setCounts] = useState({
    want_to_try: initialWantToTry,
    helpful: initialHelpful,
  })
  const [active, setActive] = useState(userReaction)
  const [pending, setPending] = useState(false)

  const handleReaction = async (type: 'want_to_try' | 'helpful') => {
    setPending(true)
    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        alert('로그인 후 이용할 수 있어요.')
        return
      }

      if (active === type) {
        // 취소
        const { error } = await supabase
          .from('reactions')
          .delete()
          .eq('review_id', reviewId)
          .eq('user_id', user.id)
          .eq('type', type)

        if (error) throw error

        setCounts((prev) => ({ ...prev, [type]: prev[type] - 1 }))
        setActive(null)
      } else {
        // 추가 (다른 타입이 있으면 먼저 삭제)
        if (active) {
          await supabase
            .from('reactions')
            .delete()
            .eq('review_id', reviewId)
            .eq('user_id', user.id)
            .eq('type', active)
          setCounts((prev) => ({ ...prev, [active]: prev[active] - 1 }))
        }

        const { error } = await supabase.from('reactions').insert({
          review_id: reviewId,
          user_id: user.id,
          type,
        })

        if (error) throw error

        setCounts((prev) => ({ ...prev, [type]: prev[type] + 1 }))
        setActive(type)
      }
    } catch (err) {
      console.error('Reaction error:', err)
      alert('공감 처리 중 오류가 발생했어요.')
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={() => handleReaction('want_to_try')}
        disabled={pending}
        className={`cute-btn flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition ${
          active === 'want_to_try'
            ? 'bg-pinky text-choco-900'
            : 'bg-white border-2 border-choco-200 text-choco-600 hover:border-choco-300'
        }`}
      >
        <span>🤤</span>
        나도 먹어볼래요 {counts.want_to_try > 0 && counts.want_to_try}
      </button>
      <button
        onClick={() => handleReaction('helpful')}
        disabled={pending}
        className={`cute-btn flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition ${
          active === 'helpful'
            ? 'bg-lemon text-choco-900'
            : 'bg-white border-2 border-choco-200 text-choco-600 hover:border-choco-300'
        }`}
      >
        <span>💡</span>
        찐정보 고마워요 {counts.helpful > 0 && counts.helpful}
      </button>
    </div>
  )
}
