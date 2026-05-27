"use client";

import { useState } from "react";
import { GARMENT_CATEGORIES, FABRIC_LEVELS, CUSTOMIZATIONS, DELIVERY_OPTIONS } from "../lib/calculator";
import { Send, MessageCircle, CheckCircle, User, Mail, Phone } from "lucide-react";

export default function LeadForm({ navigateTo, initialSelections }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNum, setWhatsappNum] = useState("");
  const [gender, setGender] = useState(initialSelections?.gender || "mens");
  const [garmentType, setGarmentType] = useState(initialSelections?.garmentType || "shalwar-kameez-mens");
  const [fabricQuality, setFabricQuality] = useState(initialSelections?.fabricQuality || "Standard");
  const [selectedCustomizations, setSelectedCustomizations] = useState(
    initialSelections?.customizations || []
  );
  const [delivery, setDelivery] = useState(initialSelections?.delivery || "standard");
  const [contactPreference, setContactPreference] = useState("whatsapp");
  const [measurements, setMeasurements] = useState({ chest: "", waist: "", hips: "", length: "", sleeve: "", neck: "" });
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState(null);

  const envWhatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "";

  const handleCustomizationToggle = (id) => {
    setSelectedCustomizations((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleMeasurementChange = (field, value) => {
    setMeasurements((prev) => ({ ...prev, [field]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorText(null);

    if (!name.trim()) { setErrorText("Apna naam likhein."); setIsLoading(false); return; }
    if (!email.trim() || !email.includes("@")) { setErrorText("Valid email address likhein."); setIsLoading(false); return; }

    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone, whatsapp: whatsappNum,
          gender, garmentType, fabricQuality,
          customizations: selectedCustomizations,
          measurements,
          deliveryPreference: delivery,
          contactPreference,
          notes,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Kuch ghalti ho gayi.");
      navigateTo("/thank-you", { leadId: data.leadId, name });
    } catch (err) {
      setErrorText(err.message || "Server error. Dobara try karein.");
    } finally {
      setIsLoading(false);
    }
  };

  const garments = GARMENT_CATEGORIES[gender]?.garments || [];

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Order / Inquiry</span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2 mb-3">Apna Order Dein</h1>
          <p className="text-slate-600">Details bharen — hamar team aapse jald raabta karega.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-8">
          {errorText && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm font-medium">
              {errorText}
            </div>
          )}

          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center space-x-2">
              <User className="h-5 w-5 text-emerald-600" />
              <span>Aapki Information</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label htmlFor="f-name" className="block text-sm font-semibold text-slate-700 mb-1.5">Naam *</label>
                <input id="f-name" type="text" required value={name} onChange={(e) => setName(e.target.value)}
                  placeholder="Aapka poora naam"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="f-email" className="block text-sm font-semibold text-slate-700 mb-1.5">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input id="f-email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="aap@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="f-phone" className="block text-sm font-semibold text-slate-700 mb-1.5">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input id="f-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="f-whatsapp" className="block text-sm font-semibold text-slate-700 mb-1.5">WhatsApp Number</label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                  <input id="f-whatsapp" type="tel" value={whatsappNum} onChange={(e) => setWhatsappNum(e.target.value)}
                    placeholder="+92 300 0000000"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="f-contact-pref" className="block text-sm font-semibold text-slate-700 mb-1.5">Contact Preference</label>
                <select id="f-contact-pref" value={contactPreference} onChange={(e) => setContactPreference(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  <option value="whatsapp">WhatsApp</option>
                  <option value="phone">Phone Call</option>
                  <option value="email">Email</option>
                </select>
              </div>
            </div>
          </div>

          {/* Garment Details */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg mb-5 flex items-center space-x-2">
              <span className="text-xl">✂️</span>
              <span>Libas Ki Details</span>
            </h2>
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(GARMENT_CATEGORIES).map(([key, cat]) => (
                    <button type="button" key={key} onClick={() => { setGender(key); setGarmentType(GARMENT_CATEGORIES[key].garments[0]?.id || ""); }}
                      className={`p-3 rounded-xl border-2 text-center text-sm font-semibold transition-all cursor-pointer ${
                        gender === key ? "border-emerald-500 bg-emerald-50 text-emerald-800" : "border-slate-200 text-slate-700 hover:border-emerald-300"
                      }`}
                    >
                      {key === "mens" ? "👔" : "👘"} {cat.label}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label htmlFor="f-garment" className="block text-sm font-semibold text-slate-700 mb-1.5">Libas Type *</label>
                <select id="f-garment" value={garmentType} onChange={(e) => setGarmentType(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  {garments.map((g) => (
                    <option key={g.id} value={g.id}>{g.icon} {g.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-fabric" className="block text-sm font-semibold text-slate-700 mb-1.5">Kapra Quality *</label>
                <select id="f-fabric" value={fabricQuality} onChange={(e) => setFabricQuality(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  {FABRIC_LEVELS.map((f) => (
                    <option key={f.id} value={f.id}>{f.label} — {f.sublabel}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="f-delivery" className="block text-sm font-semibold text-slate-700 mb-1.5">Delivery</label>
                <select id="f-delivery" value={delivery} onChange={(e) => setDelivery(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500">
                  {DELIVERY_OPTIONS.map((d) => (
                    <option key={d.id} value={d.id}>{d.label} ({d.sublabel}){d.price > 0 ? ` +Rs. ${d.price.toLocaleString()}` : ""}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Customizations */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg mb-2">Customizations (Optional)</h2>
            <p className="text-sm text-slate-500 mb-4">Jo chahein wo add karein</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {CUSTOMIZATIONS.map((c) => {
                const isChecked = selectedCustomizations.includes(c.id);
                return (
                  <button type="button" key={c.id} onClick={() => handleCustomizationToggle(c.id)}
                    className={`flex items-center space-x-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      isChecked ? "border-emerald-400 bg-emerald-50" : "border-slate-200 hover:border-emerald-200"
                    }`}
                  >
                    <div className={`h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 ${
                      isChecked ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                    }`}>
                      {isChecked && <CheckCircle className="h-3 w-3 text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">{c.label}</div>
                      <div className="text-xs text-emerald-600 font-medium">+Rs. {c.price.toLocaleString()}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Measurements */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg mb-2">Naap (Optional)</h2>
            <p className="text-sm text-slate-500 mb-4">Agar pata ho to likhein, warna shop par aa kar dein</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { key: "chest", label: "Seena (Chest)" },
                { key: "waist", label: "Kamar (Waist)" },
                { key: "hips", label: "Hips" },
                { key: "length", label: "Lambai (Length)" },
                { key: "sleeve", label: "Baah (Sleeve)" },
                { key: "neck", label: "Gala (Neck)" },
              ].map((m) => (
                <div key={m.key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-1">{m.label}</label>
                  <input type="text" value={measurements[m.key]} onChange={(e) => handleMeasurementChange(m.key, e.target.value)}
                    placeholder='e.g. 38"'
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
            <h2 className="font-bold text-slate-900 text-lg mb-2">Koi Khas Baat?</h2>
            <textarea rows={4} value={notes} onChange={(e) => setNotes(e.target.value)}
              placeholder="Design ke baare mein koi khas instructions, color preference, ya design ka link..."
              className="w-full px-4 py-3 rounded-xl border border-slate-200 text-slate-900 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none text-sm"
            />
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button type="submit" disabled={isLoading}
              className="flex-1 flex items-center justify-center space-x-2 py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl text-base shadow-lg transition-all cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="h-5 w-5 rounded-full border-2 border-white border-r-transparent animate-spin" />
              ) : (
                <>
                  <Send className="h-5 w-5" />
                  <span>Order Submit Karein</span>
                </>
              )}
            </button>
            {envWhatsapp && (
              <a
                href={`https://wa.me/${envWhatsapp}?text=Assalam%20o%20Alaikum!%20Mujhe%20order%20karna%20hai.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center space-x-2 py-4 px-6 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-2xl transition-colors cursor-pointer"
              >
                <MessageCircle className="h-5 w-5" />
                <span>WhatsApp</span>
              </a>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
