interface Comment {
  id: string
  user_id: string
  content: string
  created_at: string
  profiles: {
    nickname: string
    avatar_url: string | null
  }[] | null
}

interface CommentListProps {
  comments: Comment[]
}

export default function CommentList({ comments }: CommentListProps) {
  if (comments.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-4xl mb-2">💬</p>
        <p className="text-choco-400 font-medium">첫 댓글을 남겨보세요!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {comments.map((comment) => (
        <div
          key={comment.id}
          className="bg-white rounded-2xl border-2 border-choco-100 p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-choco-100 flex items-center justify-center text-sm">
              {comment.profiles?.[0]?.avatar_url ? (
                <img
                  src={comment.profiles[0].avatar_url}
                  alt={comment.profiles[0].nickname}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                '🙂'
              )}
            </div>
            <span className="text-sm font-bold text-choco-700">
              {comment.profiles?.[0]?.nickname ?? '익명의 초코덕후'}
            </span>
            <span className="text-xs text-choco-400">
              {new Date(comment.created_at).toLocaleDateString('ko-KR')}
            </span>
          </div>
          <p className="text-choco-700 whitespace-pre-line">{comment.content}</p>
        </div>
      ))}
    </div>
  )
}
