'use client'

interface RatingChocochipsProps {
  value: number
  onChange?: (value: number) => void
  readonly?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const SIZE_MAP = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
}

export default function RatingChocochips({
  value,
  onChange,
  readonly = false,
  size = 'md',
}: RatingChocochipsProps) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((score) => (
        <button
          key={score}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(score)}
          className={`${SIZE_MAP[size]} transition-transform ${
            readonly ? '' : 'hover:scale-110'
          } ${score <= value ? 'grayscale-0' : 'grayscale opacity-40'}`}
          aria-label={`인생초코 지수 ${score}개`}
        >
          🍫
        </button>
      ))}
    </div>
  )
}
