import type { Metadata } from 'next'
import { Noto_Sans_KR } from 'next/font/google'
import './globals.css'

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '700', '900'],
  variable: '--font-noto-sans-kr',
})

export const metadata: Metadata = {
  title: '쵸코쵸코 - 초콜릿 리뷰의 모든 것',
  description:
    '광고 없는 진짜 초콜릿 리뷰. 시판 초콜릿부터 수제 빈투바까지, 초코덕후들이 낸돈내산으로 작성하는 초콜릿 전문 커뮤니티 쵸코쵸코입니다.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKR.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
