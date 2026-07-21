import Link from "next/link";

const MOCK_PROFILE = {
  nickname: "달콤한카카오32호",
  grade: "초코 입문자",
  review_count: 3,
  avatar: "🐻",
};

const GRADES = [
  { name: "초코 입문자", min: 0, icon: "🌱" },
  { name: "카카오 러버", min: 5, icon: "🍫" },
  { name: "마스터 빈투바", min: 20, icon: "🏆" },
];

const MY_REVIEWS = [
  {
    id: "r1",
    chocolate: "가나 마일크 초콜릿",
    rating: 5,
    content: "협찬이나 거짓 없이 제 지갑과 미각을 걸고 작성한 찐 리뷰입니다.",
    created_at: "2026-07-18",
  },
  {
    id: "r2",
    chocolate: "생초콜릿 모나카",
    rating: 4,
    content: "차갑게 먹으면 더 맛있어요.",
    created_at: "2026-07-10",
  },
];

const BOOKMARKS = [
  { id: "4", name: "에콰도르 80% 빈투바", icon: "🍪" },
  { id: "6", name: "디카페인 카카오 70%", icon: "🍫" },
];

export default function MyPage() {
  const currentGrade =
    GRADES.slice()
      .reverse()
      .find((g) => MOCK_PROFILE.review_count >= g.min) || GRADES[0];
  const nextGrade = GRADES.find((g) => g.min > MOCK_PROFILE.review_count);
  const progress = nextGrade
    ? Math.min(
        100,
        (MOCK_PROFILE.review_count / nextGrade.min) * 100
      )
    : 100;

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl font-black text-choco-800 mb-8">마이페이지</h1>

        {/* Profile */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-choco-100 mb-8">
          <div className="flex items-center gap-6 mb-6">
            <div className="w-20 h-20 bg-choco-200 rounded-full flex items-center justify-center text-4xl">
              {MOCK_PROFILE.avatar}
            </div>
            <div>
              <h2 className="text-2xl font-black text-choco-800">
                {MOCK_PROFILE.nickname}
              </h2>
              <p className="text-choco-500 font-bold">
                {currentGrade.icon} {currentGrade.name}
              </p>
            </div>
          </div>

          <div className="bg-choco-50 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-black text-choco-700">초코 등급</span>
              <span className="text-sm font-bold text-choco-500">
                리뷰 {MOCK_PROFILE.review_count}개
              </span>
            </div>
            <div className="h-3 bg-choco-200 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-choco-600 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-sm text-choco-600 font-medium">
              {nextGrade
                ? `다음 등급 ${nextGrade.name}까지 ${
                    nextGrade.min - MOCK_PROFILE.review_count
                  }개의 리뷰가 남았어요!`
                : "최고 등급에 도달했어요! 🎉"}
            </p>
          </div>
        </div>

        {/* My Reviews */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-black text-choco-800">내가 쓴 리뷰</h2>
            <Link
              href="/reviews/new"
              className="text-sm font-bold text-choco-600 hover:text-choco-800"
            >
              + 리뷰 쓰기
            </Link>
          </div>
          <div className="space-y-4">
            {MY_REVIEWS.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-6 shadow-sm border border-choco-100"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-black text-choco-800">{review.chocolate}</h3>
                  <span className="text-lg">{"🍫".repeat(review.rating)}</span>
                </div>
                <p className="text-choco-600 text-sm mb-3">{review.content}</p>
                <span className="text-xs text-choco-400 font-medium">
                  {review.created_at}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bookmarks */}
        <div>
          <h2 className="text-xl font-black text-choco-800 mb-4">찜한 초콜릿</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {BOOKMARKS.map((b) => (
              <Link
                key={b.id}
                href={`/chocolates/${b.id}`}
                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-choco-100 hover:bg-choco-50 transition"
              >
                <span className="text-3xl">{b.icon}</span>
                <span className="font-bold text-choco-800">{b.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
