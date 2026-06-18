import { Suspense } from 'react'
import { getProducts, TASTE_TAG_OPTIONS, TEXTURE_TAG_OPTIONS } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import FilterPanel from '@/components/FilterPanel'

interface ProductsPageProps {
  searchParams: {
    category?: string
    cacao?: string
    taste?: string | string[]
    texture?: string | string[]
    search?: string
    sort?: 'latest' | 'rating' | 'reviews'
  }
}

const CATEGORIES = [
  { id: 1, name: '판초콜릿', slug: 'bar-chocolate' },
  { id: 2, name: '프랄린/트러플', slug: 'praline-truffle' },
  { id: 3, name: '생초콜릿', slug: 'fresh-chocolate' },
  { id: 4, name: '빈투바', slug: 'bean-to-bar' },
  { id: 5, name: '초코 과자/디저트', slug: 'choco-snacks' },
]

function parseCacaoRange(value?: string): { min?: number; max?: number } {
  if (!value || !value.includes('-')) return {}
  const [min, max] = value.split('-').map(Number)
  return { min: isNaN(min) ? undefined : min, max: isNaN(max) ? undefined : max }
}

function parseArrayParam(value?: string | string[]): string[] {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const cacaoRange = parseCacaoRange(searchParams.cacao)
  const products = await getProducts({
    category: searchParams.category,
    cacaoMin: cacaoRange.min,
    cacaoMax: cacaoRange.max,
    tasteTags: parseArrayParam(searchParams.taste),
    textureTags: parseArrayParam(searchParams.texture),
    search: searchParams.search,
    sort: searchParams.sort,
  })

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-black text-choco-800 mb-2">
            🍫 초콜릿 탐색
          </h1>
          <p className="text-choco-500 font-medium">
            카테고리, 카카오 함량, 맛/식감으로 취향에 딱 맞는 초콜릿을 찾아보세요.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-72 shrink-0">
            <Suspense fallback={<div className="h-96 bg-choco-100 rounded-3xl animate-pulse" />}>
              <FilterPanel
                categories={CATEGORIES}
                tasteOptions={TASTE_TAG_OPTIONS}
                textureOptions={TEXTURE_TAG_OPTIONS}
              />
            </Suspense>
          </div>

          <div className="flex-1">
            {products.length === 0 ? (
              <div className="bg-white rounded-3xl border-2 border-choco-100 p-16 text-center">
                <p className="text-5xl mb-4">🍫</p>
                <p className="text-choco-600 font-medium">
                  조건에 맞는 초콜릿이 없어요.
                  <br />
                  필터를 조금 바꿔서 다시 찾아보세요!
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
