"use client";

import { useRouter } from "next/navigation";
import { Scissors, Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function FooterClient() {
  const router = useRouter();
  const currentYear = new Date().getFullYear();
  const navigateTo = (path) => router.push(path);
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '';

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2 text-white">
              <Scissors className="h-7 w-7 text-emerald-400" />
              <span className="font-sans text-lg font-bold">Bisma Fashion</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Aapki har zaroorat ka kapra, hamare haath se. Suit, shalwar kameez, sherwani, lehenga —
              sab kuch perfect fit ke saath.
            </p>
            {whatsapp && (
              <a
                href={`https://wa.me/${whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                <span>WhatsApp Karein</span>
              </a>
            )}
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><button id="foot-link-home" onClick={() => navigateTo("/")} className="hover:text-white transition-colors cursor-pointer text-left">Home</button></li>
              <li><button id="foot-link-calc" onClick={() => navigateTo("/calculator")} className="hover:text-white transition-colors cursor-pointer text-left">Price Calculator</button></li>
              <li><button id="foot-link-designs" onClick={() => navigateTo("/designs")} className="hover:text-white transition-colors cursor-pointer text-left">Trending Designs</button></li>
              <li><button id="foot-link-order" onClick={() => navigateTo("/lead-form")} className="hover:text-white transition-colors cursor-pointer text-left">Order / Inquiry</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Hamare Services</h3>
            <ul className="space-y-2.5 text-sm">
              <li><span className="text-slate-400">Shalwar Kameez (Mard/Aurat)</span></li>
              <li><span className="text-slate-400">Suit 2-Piece & 3-Piece</span></li>
              <li><span className="text-slate-400">Sherwani & Formal Wear</span></li>
              <li><span className="text-slate-400">Lehenga, Gharara, Sharara</span></li>
              <li><span className="text-slate-400">Embroidery & Custom Work</span></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">Humse Milein</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start space-x-2.5">
                <MapPin className="h-5 w-5 text-emerald-400 shrink-0" />
                <span>Bisma Fashion, Main Bazaar, Pakistan</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{whatsapp ? `+${whatsapp}` : 'Contact us'}</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>{process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'info@royaltailor.com'}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {currentYear} Bisma Fashion. All rights reserved.</p>
          <div className="flex space-x-4">
            <button id="foot-link-admin" onClick={() => navigateTo("/admin")} className="hover:text-white transition-colors text-slate-500 text-xs font-mono cursor-pointer">Admin Login</button>
            <span className="text-slate-700">|</span>
            <span className="text-slate-500">Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
