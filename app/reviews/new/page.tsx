"use client";

export const runtime = "edge";

import { useState } from "react";
import Link from "next/link";

const MOCK_CHOCOLATES = [
  { id: "1", name: "가나 마일크 초콜릿" },
  { id: "2", name: "프렌치 트러플 어소티드" },
  { id: "3", name: "생초콜릿 모나카" },
  { id: "4", name: "에콰도르 80% 빈투바" },
  { id: "5", name: "초코 파이" },
  { id: "6", name: "디카페인 카카오 70%" },
];

const TASTES = ["달콤함", "쌉싸름함", "단짠단짠", "고소함", "상큼함"];
const TEXTURES = ["꾸덕함", "부드러움", "바삭함", "크리미함"];

export default function NewReviewPage({
  searchParams,
}: {
  searchParams: { chocolate_id?: string };
}) {
  const [chocolateId, setChocolateId] = useState(searchParams.chocolate_id || "");
  const [rating, setRating] = useState(0);
  const [pledge, setPledge] = useState(false);
  const [receipt, setReceipt] = useState(false);
  const [tastes, setTastes] = useState<string[]>([]);
  const [textures, setTextures] = useState<string[]>([]);
  const [content, setContent] = useState("");

  function toggleTag(list: string[], setList: (v: string[]) => void, tag: string) {
    if (list.includes(tag)) {
      setList(list.filter((t) => t !== tag));
    } else {
      setList([...list, tag]);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!chocolateId || rating === 0 || !pledge || !content.trim()) {
      alert("초콜릿, 인생초코 지수, 찐 리뷰 다짐, 내용을 모두 입력해주세요.");
      return;
    }
    // TODO: Supabase 연결 후 실제 제출 로직으로 교체
    alert("리뷰가 저장되었어요! (Supabase 연결 후 실제 저장됩니다)");
  }

  return (
    <main className="min-h-screen bg-cream pt-24 pb-20">
      <div className="max-w-2xl mx-auto px-6">
        <div className="mb-8">
          <Link href="/chocolates" className="text-choco-500 font-bold hover:text-choco-700">
            ← 초콜릿 목록으로
          </Link>
        </div>

        <div className="bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-choco-100">
          <h1 className="text-2xl md:text-3xl font-black text-choco-800 mb-2">
            찐 리뷰 작성
          </h1>
          <p className="text-choco-500 font-medium mb-8">
            협찬 없이 직접 먹어본 솔직한 후기를 남겨주세요.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-black text-choco-700 mb-2">
                초콜릿 선택
              </label>
              <select
                value={chocolateId}
                onChange={(e) => setChocolateId(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-choco-200 bg-cream text-choco-800 focus:outline-none focus:ring-2 focus:ring-choco-300"
              >
                <option value="">초콜릿을 선택해주세요</option>
                {MOCK_CHOCOLATES.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-black text-choco-700 mb-2">
                인생초코 지수
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setRating(n)}
                    className="text-3xl transition hover:scale-110"
                  >
                    {n <= rating ? "🍫" : "🤍"}
                  </button>
                ))}
              </div>
              <p className="text-sm text-choco-500 mt-2 font-medium">
                {rating > 0 ? `${rating}개의 초콜릿을 드려요!` : "초콜릿을 클릭해 평가해주세요."}
              </p>
            </div>

            <div>
              <label className="block text-sm font-black text-choco-700 mb-2">
                맛 태그
              </label>
              <div className="flex flex-wrap gap-2">
                {TASTES.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(tastes, setTastes, tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition ${
                      tastes.includes(tag)
                        ? "bg-mint text-choco-800"
                        : "bg-choco-50 text-choco-600 hover:bg-choco-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-choco-700 mb-2">
                식감 태그
              </label>
              <div className="flex flex-wrap gap-2">
                {TEXTURES.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => toggleTag(textures, setTextures, tag)}
                    className={`px-3 py-1.5 rounded-full text-sm font-bold transition ${
                      textures.includes(tag)
                        ? "bg-pinky text-choco-800"
                        : "bg-choco-50 text-choco-600 hover:bg-choco-100"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-black text-choco-700 mb-2">
                리뷰 내용
              </label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={5}
                placeholder="맛, 식감, 향, 가성비 등 솔직한 후기를 적어주세요."
                className="w-full px-4 py-3 rounded-2xl border border-choco-200 bg-cream text-choco-800 placeholder:text-choco-300 focus:outline-none focus:ring-2 focus:ring-choco-300"
              />
            </div>

            <div className="bg-choco-50 rounded-2xl p-4 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={pledge}
                  onChange={(e) => setPledge(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-choco-600"
                />
                <span className="text-sm text-choco-700 font-bold leading-relaxed">
                  &quot;협찬이나 거짓 없이 제 지갑과 미각을 걸고 작성한 찐 리뷰입니다.&quot;
                </span>
              </label>

              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={receipt}
                  onChange={(e) => setReceipt(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-choco-600"
                />
                <span className="text-sm text-choco-700 font-medium leading-relaxed">
                  영수증 인증을 진행할게요. (Supabase Storage 연동 예정)
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="cute-btn w-full px-8 py-4 bg-choco-600 text-white font-black text-lg hover:bg-choco-700 transition"
            >
              찐 리뷰 등록하기 🍫
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
