"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Scissors, Search, Filter, Eye, ArrowRight, Tag } from "lucide-react";

const CATEGORIES = ["Sab", "Men's Formal", "Men's Casual", "Women's Formal", "Women's Casual", "Wedding", "Party Wear", "Kids"];

export default function DesignsListingClient() {
  const router = useRouter();
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Sab");

  useEffect(() => {
    fetch("/api/designs")
      .then((r) => r.json())
      .then((d) => setDesigns(d.designs || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = designs.filter((d) => {
    const matchCat = activeCategory === "Sab" || d.category === activeCategory;
    const matchSearch =
      !search ||
      d.title?.toLowerCase().includes(search.toLowerCase()) ||
      d.description?.toLowerCase().includes(search.toLowerCase()) ||
      d.tags?.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Latest Collection</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
            Trending Designs
          </h1>
          <p className="text-slate-600">Bisma Fashion ke behtareen designs. Pasand karein, price janein, order dein.</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Design search karein..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
              />
            </div>
            <div className="flex items-center space-x-1.5 flex-wrap gap-1.5">
              <Filter className="h-4 w-4 text-slate-400 shrink-0" />
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeCategory === cat
                      ? "bg-emerald-600 text-white"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Designs Grid */}
        {loading ? (
          <div className="text-center py-24">
            <div className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-r-transparent" />
            <p className="text-slate-500 text-sm mt-4">Designs load ho rahi hain...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-2xl border border-slate-200">
            <Scissors className="h-12 w-12 text-slate-300 mx-auto mb-4" />
            <p className="font-bold text-slate-900 text-lg mb-2">Koi design nahi mili</p>
            <p className="text-slate-500 text-sm">
              {search ? `"${search}" ke liye koi result nahi.` : "Is category mein abhi koi design nahi hai."}
            </p>
            {search && (
              <button onClick={() => setSearch("")} className="mt-4 text-emerald-600 font-semibold text-sm cursor-pointer">
                Search clear karein
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((design) => (
              <div
                key={design.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                onClick={() => router.push(`/designs/${design.slug}`)}
              >
                <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                  {design.featuredImage ? (
                    <img
                      src={design.featuredImage}
                      alt={design.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Scissors className="h-16 w-16 text-slate-300" />
                    </div>
                  )}
                  {design.views > 0 && (
                    <div className="absolute top-2 right-2 flex items-center space-x-1 bg-black/40 text-white text-xs px-2 py-1 rounded-lg">
                      <Eye className="h-3 w-3" />
                      <span>{design.views}</span>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold px-2 py-0.5 rounded-full">
                      {design.category}
                    </span>
                    {design.startingPrice > 0 && (
                      <span className="text-sm font-bold text-emerald-600">
                        Rs. {design.startingPrice.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-slate-900 text-sm mb-1.5 group-hover:text-emerald-700 transition-colors line-clamp-2">
                    {design.title}
                  </h3>
                  {design.description && (
                    <p className="text-slate-500 text-xs line-clamp-2 mb-3">{design.description}</p>
                  )}
                  {design.tags?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {design.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full flex items-center space-x-1">
                          <Tag className="h-2.5 w-2.5" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex items-center text-emerald-600 text-xs font-semibold group-hover:translate-x-1 transition-transform">
                    <span>Details Dekhein</span>
                    <ArrowRight className="h-3.5 w-3.5 ml-1" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
