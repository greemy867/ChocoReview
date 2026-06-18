'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ImageGalleryProps {
  images: string[]
  alt?: string
}

export default function ImageGallery({ images, alt = '이미지' }: ImageGalleryProps) {
  const [selected, setSelected] = useState<string | null>(null)

  if (images.length === 0) return null

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {images.map((url, index) => (
          <button
            key={`${url}-${index}`}
            type="button"
            onClick={() => setSelected(url)}
            className="relative aspect-square rounded-xl overflow-hidden border-2 border-choco-100 hover:border-lemon transition"
          >
            <Image
              src={url}
              alt={`${alt} ${index + 1}`}
              fill
              sizes="(max-width: 640px) 33vw, 25vw"
              className="object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div className="relative w-full max-w-3xl aspect-square">
            <Image
              src={selected}
              alt={alt}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
          <button
            onClick={() => setSelected(null)}
            className="absolute top-4 right-4 text-white text-2xl font-bold"
          >
            ✕
          </button>
        </div>
      )}
    </>
  )
}
