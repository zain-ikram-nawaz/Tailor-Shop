"use client";

import { useState, useEffect } from "react";
import {
  Scissors, Calculator, Star, CheckCircle, ArrowRight,
  MessageCircle, Clock, Award, Users, ImageIcon, Ruler,
  Sparkles, ChevronRight,
} from "lucide-react";

const SERVICES = [
  { icon: "👘", title: "Shalwar Kameez", desc: "Mard aur aurat dono ke liye traditional Pakistani suits", from: "Rs. 2,000" },
  { icon: "🤵", title: "Suit (2 & 3 Piece)", desc: "Formal coat pant aur 3-piece suits", from: "Rs. 4,000" },
  { icon: "🥇", title: "Sherwani", desc: "Shadi aur khas mauqe ke liye sherwani", from: "Rs. 9,000" },
  { icon: "👗", title: "Lehenga / Gharara", desc: "Dulhan aur party wear ke liye khas designs", from: "Rs. 5,000" },
  { icon: "✂️", title: "Embroidery Work", desc: "Machine, hand embroidery, zari, gota work", from: "Rs. 1,200" },
  { icon: "📐", title: "Alterations", desc: "Purane kapron ki fitting theek karwayein", from: "Rs. 500" },
];

const STEPS = [
  {
    num: "01",
    title: "Design Choose Karein",
    desc: "Hamare trending designs dekhein ya apna design leke ayein. Calculator se price estimate karein.",
    icon: ImageIcon,
  },
  {
    num: "02",
    title: "Naap Dein",
    desc: "Shop par ayein ya WhatsApp pe naap share karein. Hamar ustad sab samjhenge.",
    icon: Ruler,
  },
  {
    num: "03",
    title: "Perfect Fit Payein",
    desc: "Timely delivery aur perfect fitting guarantee ke saath aapka libas ready milega.",
    icon: Sparkles,
  },
];

const FEATURES = [
  { icon: Award, text: "20+ Saal ka Tajurba" },
  { icon: Users, text: "10,000+ Khush Customer" },
  { icon: Clock, text: "On-Time Delivery" },
  { icon: CheckCircle, text: "Perfect Fit Guarantee" },
];

export default function Homepage({ navigateTo }) {
  const [featuredDesigns, setFeaturedDesigns] = useState([]);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "";

  useEffect(() => {
    fetch("/api/designs")
      .then((r) => r.json())
      .then((d) => setFeaturedDesigns((d.designs || []).slice(0, 3)))
      .catch(() => {});
  }, []);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-700 text-white">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 bg-emerald-600/40 border border-emerald-500/30 text-emerald-200 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Scissors className="h-3.5 w-3.5" />
              <span>Pakistan Ka No.1 Darzi</span>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Aapka Perfect
              <br />
              <span className="text-amber-300">Libas, Hamare</span>
              <br />
              Haathon Mein
            </h1>
            <p className="text-emerald-100 text-lg leading-relaxed mb-10 max-w-xl">
              Shalwar kameez se sherwani tak — sab kuch aapki naap aur pasand ke mutabiq.
              Ghar baithe price calculate karein, phir order dein.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                id="hero-cta-calculator"
                onClick={() => navigateTo("/calculator")}
                className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold rounded-2xl text-base shadow-xl hover:shadow-2xl transition-all hover:-translate-y-0.5 cursor-pointer"
              >
                <Calculator className="h-5 w-5" />
                <span>Price Calculate Karein</span>
              </button>
              {whatsapp ? (
                <a
                  href={`https://wa.me/${whatsapp}?text=Assalam%20o%20Alaikum!%20Mujhe%20ek%20libas%20banwana%20hai.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl text-base transition-all cursor-pointer"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>WhatsApp Karein</span>
                </a>
              ) : (
                <button
                  id="hero-cta-order"
                  onClick={() => navigateTo("/lead-form")}
                  className="inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl text-base transition-all cursor-pointer"
                >
                  <ArrowRight className="h-5 w-5" />
                  <span>Order Karein</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="relative border-t border-emerald-700/50 bg-emerald-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {FEATURES.map((f, i) => (
                <div key={i} className="flex items-center space-x-2.5 text-emerald-200">
                  <f.icon className="h-5 w-5 text-amber-300 shrink-0" />
                  <span className="text-sm font-medium">{f.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Hamare Kaam</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
              Kya Banwana Chahte Hain?
            </h2>
            <p className="text-slate-600">
              Har tarah ka libas hamare paas milta hai — basic se luxury tak, sab aapki pasand ke mutabiq.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all group cursor-pointer"
                onClick={() => navigateTo("/calculator")}
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="font-bold text-slate-900 text-lg mb-2 group-hover:text-emerald-700 transition-colors">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">{s.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-emerald-600 font-bold text-sm">{s.from} se</span>
                  <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Kaise Kaam Karta Hai</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2 mb-4">
              3 Asan Qadam Mein
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {STEPS.map((step, i) => (
              <div key={i} className="relative text-center">
                {i < STEPS.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-full h-0.5 bg-gradient-to-r from-emerald-200 to-transparent z-0" />
                )}
                <div className="relative z-10">
                  <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-emerald-50 border-2 border-emerald-100 mb-6">
                    <step.icon className="h-9 w-9 text-emerald-600" />
                  </div>
                  <div className="text-xs font-mono font-bold text-emerald-400 tracking-widest mb-2">{step.num}</div>
                  <h3 className="font-bold text-slate-900 text-xl mb-3">{step.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator CTA */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 to-emerald-700">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-white/10 mb-6">
            <Calculator className="h-8 w-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Ghar Baithe Price Janein
          </h2>
          <p className="text-emerald-100 text-lg mb-10 max-w-2xl mx-auto">
            Hamare interactive calculator se apne libas ki tafseel dakar — garment type, kapra quality, embroidery —
            sab choose karein aur turant estimate payen.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              id="cta-open-calculator"
              onClick={() => navigateTo("/calculator")}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-emerald-900 font-bold rounded-2xl text-base shadow-xl transition-all cursor-pointer"
            >
              <Calculator className="h-5 w-5" />
              <span>Calculator Kholein</span>
            </button>
            <button
              id="cta-view-designs"
              onClick={() => navigateTo("/designs")}
              className="inline-flex items-center space-x-2 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-2xl text-base transition-all cursor-pointer"
            >
              <ImageIcon className="h-5 w-5" />
              <span>Designs Dekhein</span>
            </button>
          </div>
        </div>
      </section>

      {/* Trending Designs */}
      {featuredDesigns.length > 0 && (
        <section className="py-20 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Latest Collection</span>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mt-1">Trending Designs</h2>
              </div>
              <button
                id="all-designs-btn"
                onClick={() => navigateTo("/designs")}
                className="hidden sm:flex items-center space-x-1 text-emerald-600 font-semibold text-sm hover:text-emerald-800 cursor-pointer"
              >
                <span>Sab Dekhein</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredDesigns.map((design) => (
                <div
                  key={design.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => navigateTo(`/designs/${design.slug}`)}
                >
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden">
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
                  </div>
                  <div className="p-5">
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
                    <h3 className="font-bold text-slate-900 text-base mb-1 group-hover:text-emerald-700 transition-colors">
                      {design.title}
                    </h3>
                    <p className="text-slate-500 text-sm line-clamp-2">{design.description}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8 sm:hidden">
              <button onClick={() => navigateTo("/designs")} className="text-emerald-600 font-semibold text-sm cursor-pointer">
                Sab Designs Dekhein →
              </button>
            </div>
          </div>
        </section>
      )}

      {/* WhatsApp floating button */}
      {whatsapp && (
        <a
          href={`https://wa.me/${whatsapp}?text=Assalam%20o%20Alaikum!%20Mujhe%20ek%20libas%20banwana%20hai.`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-3 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1"
          title="WhatsApp pe raabta karein"
        >
          <MessageCircle className="h-5 w-5" />
          <span className="text-sm">WhatsApp</span>
        </a>
      )}

      {/* Stats */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-extrabold text-emerald-600 mb-1">20+</div>
              <div className="text-slate-500 text-sm">Saalon Ka Tajurba</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-emerald-600 mb-1">10K+</div>
              <div className="text-slate-500 text-sm">Khush Customer</div>
            </div>
            <div>
              <div className="text-4xl font-extrabold text-emerald-600 mb-1">100%</div>
              <div className="text-slate-500 text-sm">Fitting Guarantee</div>
            </div>
            <div>
              <div className="flex items-center justify-center space-x-1 text-4xl font-extrabold text-emerald-600 mb-1">
                <span>4.9</span>
                <Star className="h-6 w-6 text-amber-400 fill-amber-400" />
              </div>
              <div className="text-slate-500 text-sm">Customer Rating</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
