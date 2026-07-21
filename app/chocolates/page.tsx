import Link from "next/link";

const CATEGORIES = [
  "전체",
  "판초콜릿",
  "프랄린/트러플",
  "생초콜릿",
  "빈투바",
  "초코 과자/디저트",
];

const CACAO_RANGES = [
  { label: "전체", value: "all" },
  { label: "0~30%", value: "0-30" },
  { label: "31~50%", value: "31-50" },
  { label: "51~70%", value: "51-70" },
  { label: "71% 이상", value: "71-100" },
];

export const runtime = "edge";

const MOCK_CHOCOLATES = [
  {
    id: "1",
    name: "가나 마일크 초콜릿",
    brand: "가나",
    category: "판초콜릿",
    cacao_content: 25,
    taste_tags: ["달콤함", "고소함"],
    texture_tags: ["부드러움"],
    image_url: "🍫",
    review_count: 12,
    avg_rating: 4.2,
  },
  {
    id: "2",
    name: "프렌치 트러플 어소티드",
    brand: "코스트코",
    category: "프랄린/트러플",
    cacao_content: 45,
    taste_tags: ["달콤함", "크리미함"],
    texture_tags: ["꾸덕함", "부드러움"],
    image_url: "🍬",
    review_count: 8,
    avg_rating: 4.5,
  },
  {
    id: "3",
    name: "생초콜릿 모나카",
    brand: " Royce",
    category: "생초콜릿",
    cacao_content: 55,
    taste_tags: ["달콤함", "쌉싸름함"],
    texture_tags: ["부드러움", "크리미함"],
    image_url: "🍩",
    review_count: 24,
    avg_rating: 4.8,
  },
  {
    id: "4",
    name: "에콰도르 80% 빈투바",
    brand: "BeanBrothers",
    category: "빈투바",
    cacao_content: 80,
    taste_tags: ["쌉싸름함", "고소함"],
    texture_tags: ["바삭함"],
    image_url: "🍪",
    review_count: 5,
    avg_rating: 4.0,
  },
  {
    id: "5",
    name: "초코 파이",
    brand: "오리온",
    category: "초코 과자/디저트",
    cacao_content: 15,
    taste_tags: ["달콤함"],
    texture_tags: ["부드러움", "바삭함"],
    image_url: "🧁",
    review_count: 31,
    avg_rating: 3.9,
  },
  {
    id: "6",
    name: "디카페인 카카오 70%",
    brand: "Lindt",
    category: "판초콜릿",
    cacao_content: 70,
    taste_tags: ["쌉싸름함", "고소함"],
    texture_tags: ["부드러움"],
    image_url: "🍫",
    review_count: 17,
    avg_rating: 4.6,
  },
];

export default function ChocolatesPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const category = (searchParams.category as string) || "전체";
  const cacao = (searchParams.cacao as string) || "all";

  const filtered = MOCK_CHOCOLATES.filter((c) => {
    if (category !== "전체" && c.category !== category) return false;
    if (cacao !== "all") {
      const [min, max] = cacao.split("-").map(Number);
      if (c.cacao_content < min || c.cacao_content > max) return false;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-black text-choco-800 mb-3">
            초콜릿 찾기
          </h1>
          <p className="text-choco-500 font-medium">
            당도, 카카오 함량, 식감으로 내 취향에 딱 맞는 초콜릿을 찾아보세요.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-choco-100 mb-10">
          <div className="mb-6">
            <h3 className="text-sm font-black text-choco-700 mb-3">카테고리</h3>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <Link
                  key={c}
                  href={
                    c === "전체"
                      ? "/chocolates"
                      : `/chocolates?category=${encodeURIComponent(c)}&cacao=${cacao}`
                  }
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    category === c
                      ? "bg-choco-600 text-white"
                      : "bg-choco-50 text-choco-700 hover:bg-choco-100"
                  }`}
                >
                  {c}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-black text-choco-700 mb-3">카카오 함량</h3>
            <div className="flex flex-wrap gap-2">
              {CACAO_RANGES.map((r) => (
                <Link
                  key={r.value}
                  href={
                    r.value === "all"
                      ? `/chocolates?category=${encodeURIComponent(category)}`
                      : `/chocolates?category=${encodeURIComponent(
                          category
                        )}&cacao=${r.value}`
                  }
                  className={`px-4 py-2 rounded-full text-sm font-bold transition ${
                    cacao === r.value
                      ? "bg-choco-600 text-white"
                      : "bg-choco-50 text-choco-700 hover:bg-choco-100"
                  }`}
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* List */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <Link
              key={c.id}
              href={`/chocolates/${c.id}`}
              className="bg-white cute-card p-6 block hover:no-underline"
            >
              <div className="text-6xl mb-4 text-center">{c.image_url}</div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold bg-choco-100 text-choco-700 px-2 py-1 rounded-full">
                  {c.category}
                </span>
                <span className="text-xs font-bold text-choco-500">
                  카카오 {c.cacao_content}%
                </span>
              </div>
              <h3 className="text-lg font-black text-choco-800 mb-1">{c.name}</h3>
              <p className="text-sm text-choco-500 font-medium mb-4">{c.brand}</p>
              <div className="flex flex-wrap gap-1 mb-4">
                {c.taste_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-mint/40 text-choco-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {c.texture_tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-pinky/40 text-choco-700 px-2 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm font-bold text-choco-600">
                <span>🍫 {c.avg_rating.toFixed(1)}</span>
                <span>리뷰 {c.review_count}개</span>
              </div>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-5xl mb-4">🙈</div>
            <p className="text-choco-600 font-bold">조건에 맞는 초콜릿이 없어요.</p>
          </div>
        )}
      </div>
    </main>
  );
}
