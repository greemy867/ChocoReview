'use client'

interface TagSelectorProps {
  label: string
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
}

export default function TagSelector({
  label,
  options,
  selected,
  onChange,
}: TagSelectorProps) {
  const toggle = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option))
    } else {
      onChange([...selected, option])
    }
  }

  return (
    <div>
      <label className="block text-sm font-bold text-choco-700 mb-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const isSelected = selected.includes(option)
          return (
            <button
              key={option}
              type="button"
              onClick={() => toggle(option)}
              className={`px-4 py-2 rounded-full text-sm font-bold border-2 transition ${
                isSelected
                  ? 'bg-lemon border-lemon text-choco-900'
                  : 'bg-white border-choco-200 text-choco-600 hover:border-choco-300'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </div>
  )
}
