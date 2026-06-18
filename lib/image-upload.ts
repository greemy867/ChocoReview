export interface UploadedImage {
  url: string
  name: string
}

const MAX_WIDTH = 1200
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

export function validateImageFile(file: File): string | null {
  if (!ALLOWED_TYPES.includes(file.type)) {
    return 'JPG, PNG, WebP, GIF 형식만 업로드할 수 있어요.'
  }
  if (file.size > MAX_FILE_SIZE) {
    return '파일 크기는 개당 5MB 이하여야 해요.'
  }
  return null
}

export async function resizeImage(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = URL.createObjectURL(file)

    img.onload = () => {
      URL.revokeObjectURL(img.src)

      let { width, height } = img
      if (width > MAX_WIDTH) {
        height = Math.round((height * MAX_WIDTH) / width)
        width = MAX_WIDTH
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext('2d')

      if (!ctx) {
        reject(new Error('Canvas context를 생성할 수 없어요.'))
        return
      }

      ctx.drawImage(img, 0, 0, width, height)

      const outputType = 'image/webp'
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob)
          } else {
            reject(new Error('이미지 변환에 실패했어요.'))
          }
        },
        outputType,
        0.85
      )
    }

    img.onerror = () => {
      URL.revokeObjectURL(img.src)
      reject(new Error('이미지를 불러올 수 없어요.'))
    }
  })
}

export async function uploadImageToSupabase(
  file: File,
  bucketName: string = 'review-images'
): Promise<UploadedImage> {
  const errorMessage = validateImageFile(file)
  if (errorMessage) {
    throw new Error(errorMessage)
  }

  const resizedBlob = await resizeImage(file)
  const extension = 'webp'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`

  const { createClient } = await import('@/lib/supabase/client')
  const supabase = createClient()

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(fileName, resizedBlob, {
      contentType: 'image/webp',
      upsert: false,
    })

  if (error) {
    throw new Error(`업로드 실패: ${error.message}`)
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(data.path)

  return { url: publicUrl, name: fileName }
}

export async function uploadMultipleImages(
  files: File[],
  bucketName: string = 'review-images'
): Promise<UploadedImage[]> {
  const results: UploadedImage[] = []

  for (const file of files) {
    const uploaded = await uploadImageToSupabase(file, bucketName)
    results.push(uploaded)
  }

  return results
}
