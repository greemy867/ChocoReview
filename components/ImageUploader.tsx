'use client'

import { useState, useRef } from 'react'
import { uploadMultipleImages, validateImageFile } from '@/lib/image-upload'

interface ImageUploaderProps {
  images: string[]
  onChange: (images: string[]) => void
  maxImages?: number
}

export default function ImageUploader({
  images,
  onChange,
  maxImages = 5,
}: ImageUploaderProps) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return

    setPending(true)
    setError(null)

    try {
      const remainingSlots = maxImages - images.length
      const filesToUpload = Array.from(files).slice(0, remainingSlots)

      for (const file of filesToUpload) {
        const errorMessage = validateImageFile(file)
        if (errorMessage) {
          setError(errorMessage)
          continue
        }
      }

      const uploaded = await uploadMultipleImages(filesToUpload)
      onChange([...images, ...uploaded.map((u) => u.url)])
    } catch (err) {
      setError(err instanceof Error ? err.message : '이미지 업로드 중 오류가 발생했어요.')
    } finally {
      setPending(false)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index))
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-bold text-choco-700">
        사진 첨부 ({images.length}/{maxImages})
      </label>

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((url, index) => (
            <div key={`${url}-${index}`} className="relative aspect-square rounded-xl overflow-hidden border-2 border-choco-100">
              <img
                src={url}
                alt={`업로드 이미지 ${index + 1}`}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs font-bold hover:bg-red-600 transition"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-choco-300 rounded-xl cursor-pointer hover:border-lemon hover:bg-choco-50 transition">
          <span className="text-3xl mb-1">📷</span>
          <span className="text-sm font-bold text-choco-600">
            {pending ? '업로드 중...' : '사진 추가하기'}
          </span>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            multiple
            disabled={pending}
            onChange={(e) => handleFiles(e.target.files)}
            className="hidden"
          />
        </label>
      )}

      {error && (
        <p className="text-sm text-red-500 font-bold">{error}</p>
      )}
    </div>
  )
}
