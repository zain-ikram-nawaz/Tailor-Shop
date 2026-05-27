"use client";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-slate-50 py-16 px-4">
      <div className="max-w-md text-center bg-white p-8 rounded-3xl border border-slate-150 shadow-sm space-y-4">
        <span className="text-xs font-mono font-bold uppercase tracking-wider text-rose-600 block bg-rose-50 px-2 py-1 rounded inline-block">
          Error 404
        </span>
        <h2 className="text-2xl font-extrabold text-slate-950 font-sans tracking-tight leading-none">
          Page Nahi Mili ✂️
        </h2>
        <p className="text-xs text-slate-500 leading-normal">
          Ye page exist nahi karta ya move ho gaya hai. Home page par wapis jayein.
        </p>
        <button
          onClick={() => router.push("/")}
          className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl font-bold cursor-pointer hover:bg-emerald-700 transition-colors inline-block text-xs"
        >
          Home Par Jain
        </button>
      </div>
    </div>
  );
}
