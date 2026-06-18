import Link from 'next/link'

interface Product {
  id: string
  name: string
  brand: string
  cacao_content: number | null
  average_rating: number
  review_count: number
  image_url: string | null
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white rounded-3xl border-2 border-choco-100 overflow-hidden hover:shadow-lg transition"
    >
      <div className="aspect-square bg-choco-50 flex items-center justify-center text-7xl group-hover:scale-105 transition-transform">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          '🍫'
        )}
      </div>
      <div className="p-5">
        <p className="text-xs font-bold text-choco-500 mb-1">{product.brand}</p>
        <h3 className="text-lg font-black text-choco-800 mb-2 line-clamp-1">
          {product.name}
        </h3>
        {product.cacao_content && (
          <p className="text-sm text-choco-500 font-medium mb-2">
            카카오 {product.cacao_content}%
          </p>
        )}
        <div className="flex items-center gap-2">
          <span className="text-lemon text-lg">{'🍫'.repeat(Math.round(product.average_rating))}</span>
          <span className="text-sm text-choco-400 font-medium">
            {product.average_rating.toFixed(1)} ({product.review_count})
          </span>
        </div>
      </div>
    </Link>
  )
}
