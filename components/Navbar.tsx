"use client";

import Link from "next/link";
import { useState } from "react";

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-choco-100">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-2xl font-black text-choco-700 tracking-tight flex items-center gap-2"
        >
          <span className="animate-wiggle inline-block">🍫</span> 쵸코쵸코
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-choco-600">
          <Link href="/chocolates" className="hover:text-choco-800 transition">
            초콜릿 찾기
          </Link>
          <Link href="/reviews/new" className="hover:text-choco-800 transition">
            리뷰 쓰기
          </Link>
          <Link href="/mypage" className="hover:text-choco-800 transition">
            마이페이지
          </Link>
        </div>

        <div className="hidden md:block">
          <Link
            href="/login"
            className="bg-choco-600 text-white px-5 py-2.5 rounded-full text-sm font-bold hover:bg-choco-700 transition shadow-md"
          >
            시작하기
          </Link>
        </div>

        <button
          className="md:hidden text-choco-700 text-2xl"
          onClick={() => setOpen(!open)}
          aria-label="메뉴"
        >
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-choco-100 px-6 py-4 flex flex-col gap-4">
          <Link
            href="/chocolates"
            className="text-choco-700 font-bold"
            onClick={() => setOpen(false)}
          >
            초콜릿 찾기
          </Link>
          <Link
            href="/reviews/new"
            className="text-choco-700 font-bold"
            onClick={() => setOpen(false)}
          >
            리뷰 쓰기
          </Link>
          <Link
            href="/mypage"
            className="text-choco-700 font-bold"
            onClick={() => setOpen(false)}
          >
            마이페이지
          </Link>
          <Link
            href="/login"
            className="bg-choco-600 text-white px-5 py-2.5 rounded-full text-sm font-bold text-center"
            onClick={() => setOpen(false)}
          >
            시작하기
          </Link>
        </div>
      )}
    </nav>
  );
}
