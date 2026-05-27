"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Calendar, Eye, User, Search, Hash } from "lucide-react";

export default function BlogListingClient({ initialPosts }) {
  const router = useRouter();
  const [posts] = useState(initialPosts);
  const [filteredPosts, setFilteredPosts] = useState(initialPosts);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Pricing", "Build Tips", "General"];

  useEffect(() => {
    let result = posts;
    if (selectedCategory !== "All") {
      result = result.filter((p) => p.category?.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt?.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q)
      );
    }
    setFilteredPosts(result);
  }, [selectedCategory, searchQuery, posts]);

  const handlePostClick = (slug) => router.push(`/blog/${slug}`);

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-wider text-amber-600 uppercase">Camper Conversion Insights</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">BigBear Vans Learning Cabin</h1>
          <p className="text-slate-600 text-sm">Read professional construction advice, off-grid lithium power sizing breakdowns, and comprehensive van conversion cost guide articles written by our engineering workshop team.</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-2xl p-4 mb-10 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                id={`blog-cat-${cat.toLowerCase().replace(/\s/g, "-")}`}
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold cursor-pointer transition-colors ${
                  selectedCategory === cat ? "bg-amber-500 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
            <input
              id="blog-search-box"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/10 focus:border-amber-500 placeholder-slate-400 text-slate-900"
            />
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-slate-150 rounded-2xl">
            <Hash className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <p className="font-bold text-slate-900">No blog posts found</p>
            <p className="text-xs text-slate-500 mt-1">Try matching alternative keywords or resetting criteria tags.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPosts.map((post) => {
              const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
              return (
                <article
                  id={`blog-card-${post.slug}`}
                  key={post.id}
                  onClick={() => handlePostClick(post.slug)}
                  className="bg-white border border-slate-150/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all group flex flex-col h-full cursor-pointer hover:-translate-y-0.5"
                >
                  <div className="h-48 overflow-hidden relative bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={post.featuredImage || "https://images.unsplash.com/photo-1546518071-fddcdda7580a?auto=format&fit=crop&q=80&w=600"}
                      alt={post.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover transform scale-100 group-hover:scale-103 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 bg-amber-500 text-slate-950 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wide">
                      {post.category || "General"}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 mb-3">
                      <span className="flex items-center space-x-1"><Calendar className="h-3 w-3" /><span>{formattedDate}</span></span>
                      <span>•</span>
                      <span className="flex items-center space-x-1"><Eye className="h-3 w-3" /><span>{post.views} views</span></span>
                    </div>
                    <h2 className="text-lg font-bold text-slate-950 font-sans tracking-tight mb-2.5 line-clamp-2 leading-snug group-hover:text-amber-600 transition-colors">{post.title}</h2>
                    <p className="text-xs text-slate-500 leading-relaxed mb-6 flex-grow line-clamp-3">
                      {post.excerpt || "Read this in-depth article to discover the latest tricks and budgeting strategies for your custom camper van conversion."}
                    </p>
                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-xs text-slate-700">
                      <span className="flex items-center space-x-1.5 font-medium"><User className="h-3.5 w-3.5 text-slate-400" /><span>{post.author || "BigBearVans Team"}</span></span>
                      <span className="font-bold text-amber-600 group-hover:translate-x-1 transition-transform inline-flex items-center space-x-0.5"><span>Read Article</span><span>→</span></span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
