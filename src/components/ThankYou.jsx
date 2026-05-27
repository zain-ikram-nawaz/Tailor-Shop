import { CheckCircle, Home, ArrowRight, MessageCircle, Scissors } from 'lucide-react';

export default function ThankYou({ navigateTo, state }) {
  const leadId = state?.leadId || 'lead-check-email';
  const name = state?.name || 'Customer';
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || '';

  return (
    <div className="bg-slate-50 min-h-[80vh] flex items-center py-12">
      <div className="max-w-xl mx-auto px-4 text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-6">
          <CheckCircle className="h-10 w-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Shukriya, {name}!
        </h1>
        <p className="text-slate-600 text-sm mb-8 leading-relaxed">
          Aapka order hamare paas aa gaya hai. Reference number:{" "}
          <code className="font-mono bg-slate-100 text-slate-800 px-2 py-1 rounded text-xs select-all font-bold">{leadId}</code>
        </p>

        <div className="bg-white border border-slate-200/60 rounded-2xl p-6 text-left shadow-sm space-y-4 mb-8">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center space-x-2">
            <Scissors className="h-4 w-4 text-emerald-500" />
            <span>Aage Kya Hoga?</span>
          </h2>
          <ul className="space-y-3.5 text-xs text-slate-600">
            <li className="flex items-start space-x-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] mt-0.5">1</span>
              <span><strong>Order Review:</strong> Hamar team aapki details review karega aur pricing confirm karega.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] mt-0.5">2</span>
              <span><strong>Raabta:</strong> Aapki preferred method (WhatsApp/Phone/Email) se 1-2 din mein raabta karenge.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold font-mono text-[10px] mt-0.5">3</span>
              <span><strong>Silai Shuru:</strong> Naap confirm hone ke baad aapka libas tailoring shuru ho jayega.</span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            id="thank-you-cta-home"
            onClick={() => navigateTo('/')}
            className="px-6 py-3 bg-emerald-600 text-white font-semibold rounded-xl hover:bg-emerald-700 flex items-center justify-center space-x-1.5 cursor-pointer text-sm"
          >
            <Home className="h-4 w-4" />
            <span>Home Par Jain</span>
          </button>
          {whatsapp ? (
            <a
              href={`https://wa.me/${whatsapp}?text=Assalam%20o%20Alaikum!%20Mera%20order%20ID%20hai:%20${leadId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl flex items-center justify-center space-x-1.5 cursor-pointer text-sm"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp Follow-up</span>
            </a>
          ) : (
            <button
              id="thank-you-cta-designs"
              onClick={() => navigateTo('/designs')}
              className="px-6 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-100 flex items-center justify-center space-x-1.5 cursor-pointer text-sm"
            >
              <span>Designs Dekhein</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
