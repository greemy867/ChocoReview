import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-cream">
      {/* Hero */}
      <section className="relative pt-32 pb-24 md:pt-52 md:pb-40 overflow-hidden pattern-choco gradient-choco">
        <div className="absolute top-20 left-[10%] text-6xl md:text-8xl animate-float opacity-90">🍫</div>
        <div className="absolute top-40 right-[12%] text-5xl md:text-7xl animate-float-slow opacity-80">🍪</div>
        <div className="absolute bottom-32 left-[18%] text-4xl md:text-6xl animate-float-fast opacity-70">🍩</div>
        <div className="absolute bottom-20 right-[20%] text-5xl md:text-7xl animate-float opacity-85">🧁</div>
        <div className="absolute top-32 left-1/2 text-3xl md:text-5xl animate-float-slow opacity-60">✨</div>
        <div className="absolute bottom-40 right-[8%] text-3xl md:text-5xl animate-float-fast opacity-60">💖</div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          <span className="inline-block px-5 py-2 mb-8 text-sm md:text-base font-black tracking-wide text-choco-800 bg-white rounded-full shadow-lg animate-bounce">
            😮‍💨 협찬 리뷰에 지치셨나요?
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-8 text-shadow">
            믿을 만한 초콜릿 리뷰,<br />
            <span className="text-lemon">찾기 힘드셨죠?</span>
          </h1>
          <p className="text-lg md:text-2xl text-choco-100 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
            마음에 드는 초콜릿 고르다 본 적 있으신가요?<br className="hidden md:block" />
            쵸코쵸코에는 광고도, 협찬도 없는<br className="hidden md:block" />
            <span className="text-white font-bold">진짜 초코덕후들의 낸돈내산 후기</span>가 가득해요!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/chocolates"
              className="cute-btn w-full sm:w-auto px-10 py-4 bg-lemon text-choco-900 font-black text-lg hover:bg-yellow-200 transition text-center"
            >
              물론이죠, 시작할래요 🚀
            </Link>
            <Link
              href="#features"
              className="cute-btn w-full sm:w-auto px-10 py-4 bg-white text-choco-800 font-bold text-lg hover:bg-choco-50 transition text-center"
            >
              어떤 서비스인가요? 🤔
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28 pattern-dots">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4 animate-bounce">🤎</span>
            <h2 className="text-3xl md:text-5xl font-black text-choco-800 mb-4">
              시판 초콜릿부터<br className="hidden md:block" />수제 카카오 빈투바까지
            </h2>
            <p className="text-choco-500 text-lg">초코덕후들의 놀이터, 쵸코쵸코를 소개할게요!</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white cute-card p-8 md:p-10">
              <h3 className="text-2xl font-black text-choco-800 mb-6 flex items-center gap-3">
                <span className="text-3xl">🎯</span> 쵸코쵸코는 이런 곳이에요
              </h3>
              <p className="text-lg text-choco-600 leading-relaxed mb-6">
                초콜릿을 진짜 좋아하는 사람들이 모여서 맛, 식감, 향, 가성비까지
                솔직하게 이야기하는 곳이에요. 광고 글은 OUT! 🙅‍♀️
              </p>
              <ul className="space-y-4 text-choco-700 font-bold">
                <li className="flex items-center gap-3 bg-mint/40 px-4 py-3 rounded-2xl">
                  <span className="text-2xl">✨</span> 광고·협찬 없는 순수 사용자 리뷰
                </li>
                <li className="flex items-center gap-3 bg-pinky/40 px-4 py-3 rounded-2xl">
                  <span className="text-2xl">🍬</span> 당도·카카오 함량·식감별 필터링
                </li>
                <li className="flex items-center gap-3 bg-lemon/40 px-4 py-3 rounded-2xl">
                  <span className="text-2xl">💬</span> 초코덕후들과의 따뜻한 소통
                </li>
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white cute-card p-6 text-center hover-bounce">
                <div className="text-5xl mb-3 animate-wiggle">🍫</div>
                <p className="font-black text-choco-800">다양한 초콜릿</p>
                <p className="text-sm text-choco-500 font-medium">시판 · 수제 · 해외</p>
              </div>
              <div className="bg-white cute-card p-6 text-center hover-bounce mt-8">
                <div className="text-5xl mb-3 animate-wiggle">⭐</div>
                <p className="font-black text-choco-800">찐 평점</p>
                <p className="text-sm text-choco-500 font-medium">낸돈내산 인증</p>
              </div>
              <div className="bg-white cute-card p-6 text-center hover-bounce">
                <div className="text-5xl mb-3 animate-wiggle">🏷️</div>
                <p className="font-black text-choco-800">취향 필터</p>
                <p className="text-sm text-choco-500 font-medium">당도 · 식감 · 카카오</p>
              </div>
              <div className="bg-white cute-card p-6 text-center hover-bounce mt-8">
                <div className="text-5xl mb-3 animate-wiggle">💬</div>
                <p className="font-black text-choco-800">덕후 커뮤니티</p>
                <p className="text-sm text-choco-500 font-medium">정보 공유 · 추천</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Promotion */}
      <section id="promo" className="py-20 gradient-cute relative overflow-hidden">
        <div className="absolute top-10 left-[5%] text-5xl animate-float opacity-40">🎁</div>
        <div className="absolute bottom-10 right-[8%] text-6xl animate-float-slow opacity-40">🍫</div>
        <div className="absolute top-1/2 right-[15%] text-4xl animate-float-fast opacity-30">✨</div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-14">
            <span className="inline-block px-5 py-2 mb-4 text-sm md:text-base font-black tracking-wide text-choco-800 bg-white rounded-full shadow-md">
              🎉 출시 기념 기간 한정
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-choco-800 mb-4">지금 가입하면 팡팡 터지는 혜택!</h2>
            <p className="text-choco-600 text-lg font-medium">선착순 1,000명 한정, 언제 끝날지 몰라요. 서둘러요! 🏃‍♀️</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white cute-card p-8 text-center border-4 border-mint">
              <div className="text-5xl mb-4 animate-bounce">🏅</div>
              <h3 className="text-xl font-black text-choco-800 mb-2">찐초코 파울더 뱃지</h3>
              <p className="text-choco-500 text-sm leading-relaxed font-medium">출시 기념 가입자 전용 프로필 뱃지! 단 1,000명에게만 주어지는 희귀 마크예요.</p>
            </div>
            <div className="bg-white cute-card p-8 text-center border-4 border-pinky">
              <div className="text-5xl mb-4 animate-bounce">🪙</div>
              <h3 className="text-xl font-black text-choco-800 mb-2">첫 리뷰 시 500 코코</h3>
              <p className="text-choco-500 text-sm leading-relaxed font-medium">첫 리뷰만 작성하면 500 코코 즉시 적립! 추후 기프티콘으로 교환할 수 있어요.</p>
            </div>
            <div className="bg-white cute-card p-8 text-center border-4 border-lemon">
              <div className="text-5xl mb-4 animate-bounce">🖼️</div>
              <h3 className="text-xl font-black text-choco-800 mb-2">한정 프로필 프레임</h3>
              <p className="text-choco-500 text-sm leading-relaxed font-medium">달콤한 초콜릿 테마 한정판 프레임. 오픈 기간에만 받을 수 있어요.</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/login"
              className="cute-btn inline-block px-12 py-4 bg-choco-600 text-white font-black text-lg hover:bg-choco-700 transition"
            >
              혜택 받고 물론이죠, 시작할래요 🚀
            </Link>
            <p className="mt-4 text-sm text-choco-500 font-medium">* 혜택은 조기 종료될 수 있어요.</p>
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
            <h2 className="text-3xl md:text-5xl font-black text-choco-800 mb-4">쵸코쵸코에서만 누리는 기능</h2>
            <p className="text-choco-500 text-lg font-medium">초콜릿 고르는 게 고민될 땐? 쵸코쵸코!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-choco-50 cute-card p-8 border-2 border-choco-100">
              <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle">🔍</div>
              <h3 className="text-xl font-black text-choco-800 mb-3">초콜릿 맞춤 검색</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                브랜드, 카테고리, 당도, 카카오 함량, 식감까지! 초콜릿에 특화된 필터로 취향 저격 제품을 찾아보세요.
              </p>
            </div>
            <div className="bg-choco-50 cute-card p-8 border-2 border-choco-100">
              <div className="w-16 h-16 bg-pinky rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle">📝</div>
              <h3 className="text-xl font-black text-choco-800 mb-3">찐 리뷰 작성</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                직접 사서 먹어본 경험을 사진과 함께 남겨요. 영수증 인증하면 더욱 신뢰도 UP!
              </p>
            </div>
            <div className="bg-choco-50 cute-card p-8 border-2 border-choco-100">
              <div className="w-16 h-16 bg-lemon rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle">🏆</div>
              <h3 className="text-xl font-black text-choco-800 mb-3">초코덕후 등급제</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                리뷰와 활동으로 쌓이는 등급과 &apos;찐리뷰어&apos; 인증 마크. 활발한 덕후일수록 더 큰 영향력!
              </p>
            </div>
            <div className="bg-choco-50 cute-card p-8 border-2 border-choco-100">
              <div className="w-16 h-16 bg-lavender rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle">🤎</div>
              <h3 className="text-xl font-black text-choco-800 mb-3">따뜻한 커뮤니티</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                댓글과 &apos;공감해요&apos;로 서로의 취향을 나눠요. 초콜릿 좋아하는 사람들끼리의 정감 대화!
              </p>
            </div>
            <div className="bg-choco-50 cute-card p-8 border-2 border-choco-100">
              <div className="w-16 h-16 bg-mint rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle">📌</div>
              <h3 className="text-xl font-black text-choco-800 mb-3">큐레이션 & 추천</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                카테고리별·태그별 큐레이션과 맞춤 추천으로 매번 새로운 초콜릿을 발견하는 재미!
              </p>
            </div>
            <div className="bg-choco-50 cute-card p-8 border-2 border-choco-100">
              <div className="w-16 h-16 bg-pinky rounded-2xl flex items-center justify-center text-3xl mb-6 animate-wiggle">🎁</div>
              <h3 className="text-xl font-black text-choco-800 mb-3">이달의 찐초코</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                매월 회원들의 평가로 선정되는 &apos;이달의 찐초코&apos; 어워즈. 진짜 인기 초콜릿은 뭘까요?
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How to */}
      <section id="howto" className="py-20 md:py-28 bg-choco-50 pattern-choco">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4 animate-bounce">🍀</span>
            <h2 className="text-3xl md:text-5xl font-black text-choco-800 mb-4">이용 방법</h2>
            <p className="text-choco-500 text-lg font-medium">어렵지 않아요! 3번의 클릭이면 끝!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-mint text-choco-800 rounded-full flex items-center justify-center text-4xl font-black mb-6 shadow-lg animate-float">
                1️⃣
              </div>
              <h3 className="text-xl font-black text-choco-800 mb-3">초콜릿 찾기</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                브랜드, 카테고리, 당도, 카카오 함량 등 필터로 관심 있는 초콜릿을 찾아보세요.
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-pinky text-choco-800 rounded-full flex items-center justify-center text-4xl font-black mb-6 shadow-lg animate-float-slow">
                2️⃣
              </div>
              <h3 className="text-xl font-black text-choco-800 mb-3">리뷰 읽기</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                실제 구매자들의 사진과 솔직한 후기를 확인하고, 내 취향에 맞는지 비교해 보세요.
              </p>
            </div>
            <div className="relative text-center">
              <div className="w-24 h-24 mx-auto bg-lemon text-choco-800 rounded-full flex items-center justify-center text-4xl font-black mb-6 shadow-lg animate-float-fast">
                3️⃣
              </div>
              <h3 className="text-xl font-black text-choco-800 mb-3">경험 나누기</h3>
              <p className="text-choco-500 leading-relaxed font-medium">
                직접 먹어본 초콜릿의 후기를 남기고, 다른 덕후들과 의견을 나눠보세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section id="trust" className="py-20 bg-choco-800 text-white relative overflow-hidden">
        <div className="absolute top-10 left-[5%] text-6xl opacity-20 animate-float-slow">🛡️</div>
        <div className="absolute bottom-10 right-[8%] text-6xl opacity-20 animate-float">✨</div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="text-center mb-16">
            <span className="inline-block text-4xl mb-4 animate-bounce">🛡️</span>
            <h2 className="text-3xl md:text-5xl font-black mb-4">믿고 볼 수 있는 리뷰</h2>
            <p className="text-choco-100 text-lg font-medium">광고와 협찬으로 흐려지지 않는 &apos;찐 리뷰&apos;를 위해 이런 장치를 마련했어요.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white/10 rounded-3xl p-8 border border-white/20 text-center cute-card">
              <div className="text-5xl mb-4 animate-wiggle">🧾</div>
              <h3 className="text-xl font-black mb-2">낸돈내산 인증</h3>
              <p className="text-choco-100 text-sm leading-relaxed font-medium">영수증 인증을 통해 실제 구매자임을 확인하고 신뢰도를 높입니다.</p>
            </div>
            <div className="bg-white/10 rounded-3xl p-8 border border-white/20 text-center cute-card">
              <div className="text-5xl mb-4 animate-wiggle">🚫</div>
              <h3 className="text-xl font-black mb-2">광고 차단</h3>
              <p className="text-choco-100 text-sm leading-relaxed font-medium">광고성·협찬 글은 엄격하게 관리하여 커뮤니티의 청정도를 유지합니다.</p>
            </div>
            <div className="bg-white/10 rounded-3xl p-8 border border-white/20 text-center cute-card">
              <div className="text-5xl mb-4 animate-wiggle">🛡️</div>
              <h3 className="text-xl font-black mb-2">유저 신고 시스템</h3>
              <p className="text-choco-100 text-sm leading-relaxed font-medium">부적절한 글은 회원들의 신고를 통해 빠르게 처리됩니다.</p>
            </div>
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
          <h2 className="text-3xl md:text-5xl font-black mb-6">지금 쵸코쵸코에서<br />당신의 찐 리뷰를 시작하세요</h2>
          <p className="text-lg md:text-xl text-choco-100 mb-10 font-medium">
            가입만으로도 다양한 초콜릿 리뷰를 둘러볼 수 있어요.<br className="hidden md:block" />
            초코덕후들의 의견이 궁금하다면 지금 바로 시작해 보세요!
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="cute-btn w-full sm:w-auto px-12 py-4 bg-lemon text-choco-900 font-black text-lg hover:bg-yellow-200 transition text-center"
            >
              물론이죠, 가입할래요 🍫
            </Link>
            <Link
              href="/chocolates"
              className="cute-btn w-full sm:w-auto px-12 py-4 bg-white text-choco-800 font-bold text-lg hover:bg-choco-50 transition text-center"
            >
              둘러보기 👀
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-choco-900 text-choco-200 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-2xl font-black text-white flex items-center gap-2">
            <span className="animate-wiggle">🍫</span> 쵸코쵸코
          </div>
          <p className="text-sm text-choco-300 font-medium">© 2026 쵸코쵸코. 초콜릿을 사랑하는 모든 이들을 위해.</p>
        </div>
      </footer>
    </main>
  );
}
