"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft, Calendar, Eye, User, Bookmark } from "lucide-react";

export default function BlogPostClient({ post }) {
  const router = useRouter();
  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  return (
    <div className="bg-white min-h-screen py-10 lg:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <button
          id="blog-view-toggle-back"
          onClick={() => router.push("/blog")}
          className="inline-flex items-center space-x-1 text-xs font-semibold text-slate-500 hover:text-amber-500 transition-colors mb-8 cursor-pointer group"
        >
          <ChevronLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Camper Insights</span>
        </button>

        <div className="space-y-4 mb-8">
          <span className="inline-block bg-amber-50 border border-amber-200 text-amber-600 text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-1 rounded">
            {post.category || "Pricing"}
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight shrink-0">{post.title}</h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 font-medium pt-2 border-y border-slate-100 py-3">
            <span className="flex items-center space-x-1.5 text-slate-700"><User className="h-4 w-4 text-slate-400" /><span>{post.author || "BigBearVans Team"}</span></span>
            <span className="text-slate-200">|</span>
            <span className="flex items-center space-x-1"><Calendar className="h-4 w-4 text-slate-300" /><span>{formattedDate}</span></span>
            <span className="text-slate-200">|</span>
            <span className="flex items-center space-x-1"><Eye className="h-4 w-4 text-slate-300" /><span>{post.views} views</span></span>
          </div>
        </div>

        {post.featuredImage && (
          <div className="rounded-2xl overflow-hidden aspect-video relative max-h-[400px] mb-10 shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={post.featuredImage} alt={post.title} referrerPolicy="no-referrer" className="w-full h-full object-cover" />
          </div>
        )}

        <div className="markdown-body">
          <div className="prose prose-slate max-w-none text-slate-800 text-sm leading-relaxed space-y-5" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {post.keywords && post.keywords.length > 0 && (
          <div className="mt-12 pt-6 border-t border-slate-150 flex flex-wrap gap-2">
            {post.keywords.map((kw, idx) => (
              <span key={idx} className="bg-slate-50 border border-slate-200/60 rounded-lg px-2.5 py-1 text-[11px] font-mono text-slate-500">#{kw}</span>
            ))}
          </div>
        )}

        <div className="mt-16 bg-slate-900 text-white rounded-3xl p-6 sm:p-10 relative overflow-hidden border border-slate-800 shadow-lg">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none w-52 h-52"><Bookmark className="w-full h-full" /></div>
          <div className="relative z-10">
            <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">Estimate Sizing Costs</span>
            <h3 className="text-lg sm:text-xl font-bold mt-1 mb-2">Build Your Dream Spec Off-Grid Cabin</h3>
            <p className="text-slate-300 text-xs leading-normal mb-6 max-w-md">Export these custom modules to our estimate tools and get your professional configuration price breakdown.</p>
            <button
              id="article-bottom-calc-btn"
              onClick={() => router.push("/calculator")}
              className="px-5 py-2.5 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-md cursor-pointer"
            >
              Open Price Calculator
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
