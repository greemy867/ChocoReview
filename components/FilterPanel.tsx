'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'

interface FilterPanelProps {
  categories: { id: number; name: string; slug: string }[]
  tasteOptions: string[]
  textureOptions: string[]
}

const CACAO_RANGES = [
  { label: '전체', min: undefined, max: undefined },
  { label: '0~30%', min: 0, max: 30 },
  { label: '31~50%', min: 31, max: 50 },
  { label: '51~70%', min: 51, max: 70 },
  { label: '71~100%', min: 71, max: 100 },
]

const SORT_OPTIONS = [
  { value: 'latest', label: '최신순' },
  { value: 'rating', label: '평점순' },
  { value: 'reviews', label: '리뷰 많은 순' },
]

export default function FilterPanel({
  categories,
  tasteOptions,
  textureOptions,
}: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString())
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === '') {
          params.delete(key)
        } else {
          params.set(key, value)
        }
      })
      return params.toString()
    },
    [searchParams]
  )

  const category = searchParams.get('category') ?? ''
  const cacaoRange = searchParams.get('cacao') ?? ''
  const sort = searchParams.get('sort') ?? 'latest'
  const search = searchParams.get('search') ?? ''
  const selectedTaste = searchParams.getAll('taste')
  const selectedTexture = searchParams.getAll('texture')

  const updateParam = (key: string, value: string | undefined) => {
    router.push(`?${createQueryString({ [key]: value })}`)
  }

  const toggleArrayParam = (key: string, value: string) => {
    const current = searchParams.getAll(key)
    const next = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value]

    const params = new URLSearchParams(searchParams.toString())
    params.delete(key)
    next.forEach((item) => params.append(key, item))
    router.push(`?${params.toString()}`)
  }

  return (
    <aside className="bg-white rounded-3xl border-2 border-choco-100 p-6 space-y-6">
      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          검색
        </label>
        <input
          type="text"
          value={search}
          onChange={(e) => updateParam('search', e.target.value)}
          placeholder="제품명, 브랜드 검색"
          className="w-full px-4 py-2 rounded-xl border-2 border-choco-200 focus:border-lemon focus:outline-none text-choco-800 font-medium"
        />
      </div>

      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          정렬
        </label>
        <select
          value={sort}
          onChange={(e) => updateParam('sort', e.target.value)}
          className="w-full px-4 py-2 rounded-xl border-2 border-choco-200 focus:border-lemon focus:outline-none bg-white text-choco-800 font-medium"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          카테고리
        </label>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => updateParam('category', undefined)}
            className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition ${
              category === ''
                ? 'bg-lemon border-lemon text-choco-900'
                : 'bg-white border-choco-200 text-choco-600 hover:border-choco-300'
            }`}
          >
            전체
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => updateParam('category', cat.slug)}
              className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition ${
                category === cat.slug
                  ? 'bg-lemon border-lemon text-choco-900'
                  : 'bg-white border-choco-200 text-choco-600 hover:border-choco-300'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          카카오 함량
        </label>
        <div className="flex flex-wrap gap-2">
          {CACAO_RANGES.map((range) => (
            <button
              key={range.label}
              onClick={() =>
                updateParam(
                  'cacao',
                  range.min === undefined ? undefined : `${range.min}-${range.max}`
                )
              }
              className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition ${
                cacaoRange ===
                (range.min === undefined ? '' : `${range.min}-${range.max}`)
                  ? 'bg-lemon border-lemon text-choco-900'
                  : 'bg-white border-choco-200 text-choco-600 hover:border-choco-300'
              }`}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          맛 태그
        </label>
        <div className="flex flex-wrap gap-2">
          {tasteOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleArrayParam('taste', tag)}
              className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition ${
                selectedTaste.includes(tag)
                  ? 'bg-mint border-mint text-choco-900'
                  : 'bg-white border-choco-200 text-choco-600 hover:border-choco-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-bold text-choco-700 mb-2">
          식감 태그
        </label>
        <div className="flex flex-wrap gap-2">
          {textureOptions.map((tag) => (
            <button
              key={tag}
              onClick={() => toggleArrayParam('texture', tag)}
              className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition ${
                selectedTexture.includes(tag)
                  ? 'bg-pinky border-pinky text-choco-900'
                  : 'bg-white border-choco-200 text-choco-600 hover:border-choco-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>
    </aside>
  )
}
