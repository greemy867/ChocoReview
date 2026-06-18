'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

interface ProfileFormProps {
  initialNickname: string
  userId: string
}

export default function ProfileForm({ initialNickname, userId }: ProfileFormProps) {
  const [nickname, setNickname] = useState(initialNickname)
  const [message, setMessage] = useState<string | null>(null)
  const [pending, setPending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setPending(true)
    setMessage(null)

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('profiles')
        .update({ nickname })
        .eq('id', userId)

      if (error) {
        setMessage(`닉네임 수정에 실패했어요: ${error.message}`)
      } else {
        setMessage('닉네임이 수정되었어요! 🍫')
      }
    } catch (err) {
      setMessage('Supabase 연결이 설정되지 않았어요.')
    } finally {
      setPending(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <label className="block text-sm font-bold text-choco-700">닉네임</label>
      <div className="flex gap-2">
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border-2 border-choco-200 focus:border-lemon focus:outline-none text-choco-800 font-medium"
        />
        <button
          type="submit"
          disabled={pending || !nickname.trim()}
          className="cute-btn px-5 py-2 bg-lemon text-choco-900 font-bold hover:bg-yellow-200 transition disabled:opacity-50"
        >
          {pending ? '저장 중...' : '수정'}
        </button>
      </div>
      {message && (
        <p
          className={`text-sm font-bold ${
            message.includes('실패') || message.includes('설정되지')
              ? 'text-red-500'
              : 'text-green-600'
          }`}
        >
          {message}
        </p>
      )}
    </form>
  )
}
