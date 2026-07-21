import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "edge";

const MOCK_CHOCOLATES: Record<
  string,
  {
    name: string;
    brand: string;
    category: string;
    cacao_content: number;
    taste_tags: string[];
    texture_tags: string[];
    description: string;
    image_url: string;
  }
> = {
  "1": {
    name: "가나 마일크 초콜릿",
    brand: "가나",
    category: "판초콜릿",
    cacao_content: 25,
    taste_tags: ["달콤함", "고소함"],
    texture_tags: ["부드러움"],
    description:
      "누구나 아는 국민 마일크 초콜릿. 달콤하고 부드러운 식감이 매력적이에요.",
    image_url: "🍫",
  },
  "2": {
    name: "프렌치 트러플 어소티드",
    brand: "코스트코",
    category: "프랄린/트러플",
    cacao_content: 45,
    taste_tags: ["달콤함", "크리미함"],
    texture_tags: ["꾸덕함", "부드러움"],
    description:
      "코스트코에서 대량으로 사 먹기 좋은 트러플 초콜릿. 입안에서 사르르 녹아요.",
    image_url: "🍬",
  },
  "3": {
    name: "생초콜릿 모나카",
    brand: "Royce",
    category: "생초콜릿",
    cacao_content: 55,
    taste_tags: ["달콤함", "쌉싸름함"],
    texture_tags: ["부드러움", "크리미함"],
    description:
      "일본여행 필수템! 차갑게 먹으면 더 맛있는 생초콜릿이에요.",
    image_url: "🍩",
  },
  "4": {
    name: "에콰도르 80% 빈투바",
    brand: "BeanBrothers",
    category: "빈투바",
    cacao_content: 80,
    taste_tags: ["쌉싸름함", "고소함"],
    texture_tags: ["바삭함"],
    description:
      "카카오 본연의 풍미를 느낄 수 있는 고함량 빈투바 초콜릿이에요.",
    image_url: "🍪",
  },
  "5": {
    name: "초코 파이",
    brand: "오리온",
    category: "초코 과자/디저트",
    cacao_content: 15,
    taste_tags: ["달콤함"],
    texture_tags: ["부드러움", "바삭함"],
    description: "한국인의 소울 푸드. 어린 시절 추억의 맛이에요.",
    image_url: "🧁",
  },
  "6": {
    name: "디카페인 카카오 70%",
    brand: "Lindt",
    category: "판초콜릿",
    cacao_content: 70,
    taste_tags: ["쌉싸름함", "고소함"],
    texture_tags: ["부드러움"],
    description: "부드러운 식감과 적당한 쌉싸름함의 균형이 좋아요.",
    image_url: "🍫",
  },
};

const MOCK_REVIEWS = [
  {
    id: "r1",
    user: "달콤한카카오32호",
    grade: "초코 입문자",
    rating: 5,
    content:
      "협찬이나 거짝 없이 제 지갑과 미각을 걸고 작성한 찐 리뷰입니다. 진짜 맛있어요!",
    taste_tags: ["달콤함"],
    texture_tags: ["부드러움"],
    pledge_checked: true,
    receipt_verified: true,
    created_at: "2026-07-18",
    reactions: { want_to_try: 3, thanks: 7 },
  },
  {
    id: "r2",
    user: "가나초코덕후",
    grade: "카카오 러버",
    rating: 4,
    content: "가성비 최고입니다. 편의점에서 자주 사 먹어요.",
    taste_tags: ["고소함"],
    texture_tags: ["부드러움"],
    pledge_checked: true,
    receipt_verified: false,
    created_at: "2026-07-15",
    reactions: { want_to_try: 1, thanks: 2 },
  },
];

export default function ChocolateDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const chocolate = MOCK_CHOCOLATES[params.id];
  if (!chocolate) return notFound();

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-choco-100 mb-10">
          <div className="text-8xl mb-6 text-center">{chocolate.image_url}</div>
          <div className="flex flex-wrap items-center justify-center gap-2 mb-4">
            <span className="text-sm font-bold bg-choco-100 text-choco-700 px-3 py-1 rounded-full">
              {chocolate.category}
            </span>
            <span className="text-sm font-bold bg-choco-100 text-choco-700 px-3 py-1 rounded-full">
              카카오 {chocolate.cacao_content}%
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-choco-800 text-center mb-2">
            {chocolate.name}
          </h1>
          <p className="text-center text-choco-500 font-bold mb-8">{chocolate.brand}</p>
          <p className="text-choco-600 leading-relaxed text-center max-w-2xl mx-auto mb-8">
            {chocolate.description}
          </p>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {chocolate.taste_tags.map((tag) => (
              <span
                key={tag}
                className="bg-mint/40 text-choco-700 px-3 py-1 rounded-full text-sm font-bold"
              >
                {tag}
              </span>
            ))}
            {chocolate.texture_tags.map((tag) => (
              <span
                key={tag}
                className="bg-pinky/40 text-choco-700 px-3 py-1 rounded-full text-sm font-bold"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex justify-center gap-4">
            <Link
              href={`/reviews/new?chocolate_id=${params.id}`}
              className="cute-btn px-8 py-3 bg-choco-600 text-white font-black hover:bg-choco-700 transition"
            >
              리뷰 쓰기 📝
            </Link>
            <button className="cute-btn px-8 py-3 bg-lemon text-choco-900 font-black hover:bg-yellow-200 transition">
              찜하기 🤎
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-black text-choco-800">찐 리뷰</h2>
          <span className="text-choco-500 font-bold">{MOCK_REVIEWS.length}개</span>
        </div>

        <div className="space-y-6">
          {MOCK_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-choco-100"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-choco-200 rounded-full flex items-center justify-center text-lg">
                    🐻
                  </div>
                  <div>
                    <p className="font-black text-choco-800">{review.user}</p>
                    <p className="text-xs text-choco-500 font-bold">{review.grade}</p>
                  </div>
                </div>
                <div className="text-2xl">
                  {"🍫".repeat(review.rating)}
                  {"🤍".repeat(5 - review.rating)}
                </div>
              </div>
              <p className="text-choco-600 leading-relaxed mb-4">{review.content}</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {review.taste_tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-mint/40 text-choco-700 px-2 py-1 rounded-full text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
                {review.texture_tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-pinky/40 text-choco-700 px-2 py-1 rounded-full text-xs font-bold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  {review.pledge_checked && (
                    <span className="text-green-600 font-bold">✓ 찐 리뷰 다짐</span>
                  )}
                  {review.receipt_verified && (
                    <span className="text-choco-600 font-bold">🧾 영수증 인증</span>
                  )}
                </div>
                <span className="text-choco-400 font-medium">{review.created_at}</span>
              </div>
              <div className="flex items-center gap-3 mt-4 pt-4 border-t border-choco-100">
                <button className="px-4 py-2 bg-choco-50 text-choco-700 rounded-full text-sm font-bold hover:bg-choco-100 transition">
                  😋 나도 먹어볼래요 {review.reactions.want_to_try}
                </button>
                <button className="px-4 py-2 bg-choco-50 text-choco-700 rounded-full text-sm font-bold hover:bg-choco-100 transition">
                  🙏 찐정보 고마워요 {review.reactions.thanks}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
