"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Scissors, Tag, Eye, ArrowLeft, Calculator, MessageCircle, ShoppingBag } from "lucide-react";

export default function DesignDetailClient({ slug }) {
  const router = useRouter();
  const [design, setDesign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "";

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/designs?slug=${slug}`)
      .then((r) => r.json())
      .then((d) => setDesign(d.design || null))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-emerald-500 border-r-transparent" />
      </div>
    );
  }

  if (!design) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <Scissors className="h-16 w-16 text-slate-300 mb-4" />
        <h2 className="font-bold text-slate-900 text-xl mb-2">Design nahi mili</h2>
        <p className="text-slate-500 text-sm mb-6">Ye design exist nahi karta ya delete ho gaya hai.</p>
        <button onClick={() => router.push("/designs")} className="text-emerald-600 font-semibold cursor-pointer">
          ← Sab Designs Dekhein
        </button>
      </div>
    );
  }

  const allImages = [design.featuredImage, ...(design.images || [])].filter(Boolean);

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <button onClick={() => router.push("/designs")}
          className="flex items-center space-x-2 text-sm text-slate-500 hover:text-emerald-600 mb-8 cursor-pointer transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Sab Designs</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm">
              {allImages[activeImg] ? (
                <img
                  src={allImages[activeImg]}
                  alt={design.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Scissors className="h-24 w-24 text-slate-200" />
                </div>
              )}
            </div>
            {allImages.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-1">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(idx)}
                    className={`shrink-0 h-16 w-20 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      activeImg === idx ? "border-emerald-500" : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xs bg-emerald-50 text-emerald-700 border border-emerald-100 font-semibold px-3 py-1 rounded-full">
                  {design.category}
                </span>
                {design.garmentType && (
                  <span className="text-xs bg-slate-100 text-slate-600 font-semibold px-3 py-1 rounded-full">
                    {design.garmentType}
                  </span>
                )}
                <div className="flex items-center text-xs text-slate-400 space-x-1">
                  <Eye className="h-3.5 w-3.5" />
                  <span>{design.views} views</span>
                </div>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">{design.title}</h1>
              {design.startingPrice > 0 && (
                <div className="text-2xl font-bold text-emerald-600 mb-4">
                  Rs. {design.startingPrice.toLocaleString()}
                  <span className="text-sm font-normal text-slate-500 ml-2">se shuru</span>
                </div>
              )}
              {design.description && (
                <p className="text-slate-600 leading-relaxed">{design.description}</p>
              )}
            </div>

            {design.tags?.length > 0 && (
              <div>
                <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center space-x-1">
                  <Tag className="h-4 w-4" />
                  <span>Tags</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-slate-100 text-slate-600 px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-200">
              <button
                onClick={() => router.push(`/calculator?garmentType=${encodeURIComponent(design.garmentType || "shalwar-kameez-mens")}`)}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                <Calculator className="h-4 w-4" />
                <span>Is Design Ki Price Calculate Karein</span>
              </button>
              <button
                onClick={() => router.push(`/lead-form?garmentType=${encodeURIComponent(design.garmentType || "shalwar-kameez-mens")}`)}
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4" />
                <span>Ye Design Order Karein</span>
              </button>
              {whatsapp && (
                <a
                  href={`https://wa.me/${whatsapp}?text=Assalam%20o%20Alaikum!%20Mujhe%20ye%20design%20banwana%20hai:%20${encodeURIComponent(design.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center space-x-2 py-3.5 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>WhatsApp Pe Order Karein</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
