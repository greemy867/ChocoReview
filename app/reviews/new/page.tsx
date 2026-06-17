import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { getProducts } from '@/lib/products'
import ReviewForm from './ReviewForm'

export default async function NewReviewPage() {
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  const products = await getProducts()

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-choco-800 mb-2">
          🍫 찐 리뷰 작성하기
        </h1>
        <p className="text-choco-500 mb-8 font-medium">
          낸돈내산으로 먹어본 초콜릿, 초코덕후들에게 알려주세요!
        </p>
        <ReviewForm products={products} />
      </div>
    </main>
  )
}
