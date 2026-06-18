'use client'

import { useState } from 'react'
import ImageUploader from '@/components/ImageUploader'
import ImageGallery from '@/components/ImageGallery'

export default function UploadTestPage() {
  const [images, setImages] = useState<string[]>([])

  return (
    <main className="min-h-screen bg-cream px-6 py-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-black text-choco-800 mb-2">
          📷 이미지 업로드 테스트
        </h1>
        <p className="text-choco-500 mb-8 font-medium">
          리뷰에 첨부할 초콜릿 사진을 업로드핸 보세요.
          <br />
          브라우저에서 WebP 변환 및 리사이즈 후 Supabase Storage에 저장됩니다.
        </p>

        <div className="bg-white rounded-3xl shadow-xl border-2 border-choco-100 p-8 space-y-6">
          <ImageUploader images={images} onChange={setImages} maxImages={5} />

          {images.length > 0 && (
            <div className="pt-6 border-t border-choco-100">
              <h2 className="text-lg font-bold text-choco-800 mb-3">
                업로드된 이미지
              </h2>
              <ImageGallery images={images} alt="업로드된 이미지" />
            </div>
          )}

          {images.length > 0 && (
            <div className="bg-choco-50 rounded-xl p-4">
              <p className="text-sm font-bold text-choco-700 mb-2">이미지 URL 목록:</p>
              <ul className="space-y-1">
                {images.map((url, index) => (
                  <li
                    key={`${url}-${index}`}
                    className="text-xs text-choco-600 break-all"
                  >
                    {index + 1}. {url}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
