export default function Home() {
  return (
    <main className="bg-cream text-choco-800">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pattern-choco gradient-choco px-6 py-32">
        <div className="absolute top-20 left-[10%] text-6xl md:text-8xl animate-float opacity-90">🍫</div>
        <div className="absolute top-40 right-[12%] text-5xl md:text-7xl animate-float-slow opacity-80">🍪</div>
        <div className="absolute bottom-32 left-[18%] text-4xl md:text-6xl animate-float-fast opacity-70">🍩</div>
        <div className="absolute bottom-20 right-[20%] text-5xl md:text-7xl animate-float opacity-85">🧁</div>
        <div className="absolute top-32 left-1/2 text-3xl md:text-5xl animate-float-slow opacity-60">✨</div>
        <div className="absolute bottom-40 right-[8%] text-3xl md:text-5xl animate-float-fast opacity-60">💖</div>

        <div className="relative max-w-4xl mx-auto text-center">
          <span className="inline-block px-5 py-2 mb-8 text-sm md:text-base font-black tracking-wide text-choco-800 bg-white rounded-full shadow-lg animate-bounce">
            😮‍💨 협찬 리뷰에 지치셨나요?
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 text-shadow">
            믿을 만한 초콜릿 리뷰,
            <br />
            <span className="text-lemon">찾기 힘드셨죠?</span>
          </h1>
          <p className="text-lg md:text-2xl text-choco-100 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            마음에 드는 초콜릿 고르다 본 적 있으신가요?
            <br className="hidden md:block" />
            쵸코쵸코에는 광고도, 협찬도 없는
            <br className="hidden md:block" />
            <span className="text-white font-bold">진짜 초코덕후들의 낸돈내산 후기</span>가 가득해요!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="cute-btn w-full sm:w-auto px-12 py-4 bg-lemon text-choco-900 font-black text-lg hover:bg-yellow-200 transition"
            >
              물론이죠, 시작할래요 🚀
            </a>
            <a
              href="#features"
              className="cute-btn w-full sm:w-auto px-10 py-4 bg-white text-choco-800 font-bold text-lg hover:bg-choco-50 transition"
            >
              어떤 서비스인가요? 🤔
            </a>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 md:py-28 bg-white relative">
        <div className="absolute top-20 right-[5%] text-6xl opacity-10 animate-float-slow">🍫</div>
        <div className="absolute bottom-20 left-[5%] text-6xl opacity-10 animate-float">🍩</div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4 animate-bounce">🌟</span>
            <h2 className="text-3xl md:text-5xl font-black text-choco-800 mb-4">
              쵸코쵸코에서만 누리는 기능
            </h2>
            <p className="text-choco-500 text-lg font-medium">
              초콜릿 고르는 게 고민될 땐? 쵸코쵸코!
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '🔍',
                color: 'bg-mint',
                title: '초콜릿 맞춤 검색',
                desc: '브랜드, 카테고리, 당도, 카카오 함량, 식감까지! 초콜릿에 특화된 필터로 취향 저격 제품을 찾아보세요.',
              },
              {
                icon: '📝',
                color: 'bg-pinky',
                title: '찐 리뷰 작성',
                desc: '직접 사서 먹어본 경험을 사진과 함께 남겨요. 영수증 인증하면 더욱 신뢰도 UP!',
              },
              {
                icon: '🏆',
                color: 'bg-lemon',
                title: '초코덕후 등급제',
                desc: "리뷰와 활동으로 쌓이는 등급과 '찐리뷰어' 인증 마크. 활발한 덕후일수록 더 큰 영향력!",
              },
              {
                icon: '🤎',
                color: 'bg-lavender',
                title: '따뜻한 커뮤니티',
                desc: "댓글과 '공감해요'로 서로의 취향을 나눠요. 초콜릿 좋아하는 사람들끼리의 정감 대화!",
              },
              {
                icon: '📌',
                color: 'bg-mint',
                title: '큐레이션 & 추천',
                desc: '카테고리별·태그별 큐레이션과 맞춤 추천으로 매번 새로운 초콜릿을 발견하는 재미!',
              },
              {
                icon: '🎁',
                color: 'bg-pinky',
                title: '이달의 찐초코',
                desc: "매월 회원들의 평가로 선정되는 '이달의 찐초코' 어워즈. 진짜 인기 초콜릿은 뭘까요?",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-choco-50 cute-card p-8 border-2 border-choco-100"
              >
                <div
                  className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-black text-choco-800 mb-3">
                  {feature.title}
                </h3>
                <p className="text-choco-500 leading-relaxed font-medium">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="start" className="py-24 gradient-choco text-white relative overflow-hidden">
        <div className="absolute top-20 left-[10%] text-6xl opacity-30 animate-float">🍫</div>
        <div className="absolute bottom-20 right-[10%] text-6xl opacity-30 animate-float-slow">🍪</div>
        <div className="absolute top-1/2 left-[5%] text-4xl opacity-30 animate-float-fast">💖</div>

        <div className="max-w-4xl mx-auto px-6 text-center relative">
          <span className="inline-block text-5xl mb-6 animate-bounce">🚀</span>
          <h2 className="text-3xl md:text-5xl font-black mb-6">
            지금 쵸코쵸코에서
            <br />
            당신의 찐 리뷰를 시작하세요
          </h2>
          <p className="text-lg md:text-xl text-choco-100 mb-10 font-medium">
            가입만으로도 다양한 초콜릿 리뷰를 둘러볼 수 있어요.
            <br className="hidden md:block" />
            초코덕후들의 의견이 궁금하다면 지금 바로 시작해 보세요!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="/login"
              className="cute-btn w-full sm:w-auto px-12 py-4 bg-lemon text-choco-900 font-black text-lg hover:bg-yellow-200 transition"
            >
              물론이죠, 시작할래요 🍫
            </a>
            <a
              href="#features"
              className="cute-btn w-full sm:w-auto px-12 py-4 bg-white text-choco-800 font-bold text-lg hover:bg-choco-50 transition"
            >
              더 알아보기 👀
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-choco-900 text-choco-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-black text-white flex items-center gap-2">
            <span className="animate-wiggle">🍫</span> 쵸코쵸코
          </div>
          <p className="text-sm text-choco-300 font-medium">
            © 2026 쵸코쵸코. 초콜릿을 사랑하는 모든 이들을 위해.
          </p>
        </div>
      </footer>
    </main>
  )
}
