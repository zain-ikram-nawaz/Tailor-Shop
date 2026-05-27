import { DollarSign, Axe, Zap, Waves, HeartHandshake, Calculator, ChevronRight } from 'lucide-react';

export default function PricingGuide({ navigateTo }) {
  const costSegments = [
    { title: 'Thermals & Structural Base', averageRange: '$3,000 - $6,500', icon: Axe, details: 'Includes robust water-safe insulation (such as Havelock sheep wool or expanded polyurethane), sound deadening mats, custom marine plywood floors, and solid cedar ceiling slats.' },
    { title: 'Power Sizing (Electrics)', averageRange: '$5,500 - $14,000', icon: Zap, details: 'Off-grid lithium iron phosphate energy banks (Victron / Renogy), MPPT solar regulators, DC-DC alternator chargers, and robust pure sine wave inverters powering induction cooktops.' },
    { title: 'Kitchen & running water', averageRange: '$4,000 - $8,500', icon: Waves, details: 'Custom food-grade stainless sinks, high-capacity Shurflo water pumps, under-mounted gray expansion chambers, hot water heaters, and customizable teak food preparation surfaces.' },
    { title: 'Air Flow & Climate Controls', averageRange: '$3,500 - $7,000', icon: Waves, details: 'Inlet/exhaust dynamic roof vents (MaxxFan Deluxe), diesel interior cabin parking heaters connected directly to the van main fuel supply, and 12V low-profile roof-mounted air conditioning units.' },
  ];

  return (
    <div className="bg-white min-h-screen py-12 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-slate-100 pb-8 mb-10">
          <div className="flex items-center space-x-2 text-amber-600 mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest bg-amber-50 px-2.5 py-1 rounded">Comprehensive 2026 Cost Report</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-950 tracking-tight leading-tight mb-4">The Ultimate Guide to Camper Van Conversion Costs</h1>
          <p className="text-slate-600 font-sans text-base leading-relaxed">What does it really cost to live the dream in 2026? We break down every cost driver of custom conversions—from raw materials to high-power off-grid electrics and expert builder fees.</p>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 sm:p-8 mb-12 flex flex-col sm:flex-row gap-6 items-center">
          <div className="h-16 w-16 bg-amber-500/10 text-amber-600 rounded-2xl flex items-center justify-center shrink-0"><DollarSign className="h-8 w-8" /></div>
          <div>
            <h3 className="font-bold text-slate-900 text-lg mb-1">Quick Budget Takeaway</h3>
            <p className="text-xs text-slate-600 leading-relaxed">DIY material-only builds range from <strong>$10,000 to $25,000</strong> above the cost of your van. Fully certified custom professional builds featuring custom cabinetry, integrated electrics, and plumbing range from <strong>$45,000 to $95,000+</strong>.</p>
          </div>
        </div>

        <div className="space-y-8 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Primary Conversion Cost Centres</h2>
          <p className="text-sm text-slate-600 leading-relaxed -mt-4">When sizing custom Camper Van Price lines, the final tier heavily hinges on these four core structural setups:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {costSegments.map((seg) => (
              <div key={seg.title} className="bg-white border border-slate-150/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="p-2 bg-slate-100 text-slate-800 rounded-lg shrink-0"><seg.icon className="h-5 w-5" /></div>
                    <h3 className="font-bold text-slate-900 text-sm">{seg.title}</h3>
                  </div>
                  <span className="font-mono text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">{seg.averageRange}</span>
                </div>
                <p className="text-xs text-slate-500 leading-normal">{seg.details}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6 mb-16">
          <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Should You DIY Your Build or Hire BigBear Vans?</h2>
          <p className="text-sm text-slate-600 leading-relaxed">Building a van is a major time and financial investment. Weighing your technical capabilities and timelines is critical to preventing costly construction mistakes.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="border border-slate-200 rounded-2xl p-6 bg-slate-50/40">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center space-x-2"><Axe className="h-5 w-5 text-slate-500" /><span>The DIY Approach</span></h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Great for hobbyists with extensive free time who enjoy carpentry, plumbing, and deep-dive electrical calculations.</p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start space-x-2"><span className="text-red-500 font-bold shrink-0">✕</span><span><strong>Time drain:</strong> Average DIY conversion takes 400 to 1,000 labor hours.</span></li>
                <li className="flex items-start space-x-2"><span className="text-red-500 font-bold shrink-0">✕</span><span><strong>Overhead risk:</strong> Solder failures or leaky pipes behind panels can cause thousands in hidden damage.</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-600 font-bold shrink-0">✓</span><span><strong>Budget savings:</strong> No labor expenditures, paying strictly for parts.</span></li>
              </ul>
            </div>
            <div className="border border-amber-500 ring-2 ring-amber-500/10 rounded-2xl p-6 bg-white">
              <h3 className="font-bold text-slate-900 mb-3 flex items-center space-x-2"><HeartHandshake className="h-5 w-5 text-amber-600" /><span>Professional BigBear Vans Build</span></h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">Excellent for professionals, adventurers, and digital nomads who want a high-end, reliable, and warrants-backed tiny house with zero personal labor overhead.</p>
              <ul className="space-y-2 text-xs text-slate-600">
                <li className="flex items-start space-x-2"><span className="text-emerald-500 font-bold shrink-0">✓</span><span><strong>High speed:</strong> Master workshops turn around standard layouts within 6 to 12 weeks.</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-500 font-bold shrink-0">✓</span><span><strong>Certified systems:</strong> Fully engineered Victron wiring boards, waterproof chambers, and safety plumbing.</span></li>
                <li className="flex items-start space-x-2"><span className="text-emerald-500 font-bold shrink-0">✓</span><span><strong>Resale protection:</strong> Professionally certified conversions recoup 80-90% of their build cost on the used market.</span></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none w-72 h-72"><Calculator className="w-full h-full" /></div>
          <span className="text-xs font-mono font-bold tracking-widest text-amber-400 uppercase">Test a Configuration</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-4">Compute Your Target Estimate Instantly</h2>
          <p className="text-slate-300 text-sm max-w-lg mx-auto mb-8">Stop dealing with spreadsheets. Pick your custom options and get a highly accurate 2026 price estimate in under 2 minutes.</p>
          <button
            id="guide-inner-cta"
            onClick={() => navigateTo('/calculator')}
            className="inline-flex items-center space-x-2 px-6 py-3.5 bg-amber-500 text-slate-950 font-extrabold rounded-xl hover:bg-amber-400 cursor-pointer shadow-md shadow-amber-500/15"
          >
            <span>Launch the Build Calculator</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
