"use client";

import { useState, useEffect } from "react";
import {
  calculateTailorPrice,
  GARMENT_CATEGORIES,
  FABRIC_LEVELS,
  CUSTOMIZATIONS,
  DELIVERY_OPTIONS,
} from "../lib/calculator";
import {
  Scissors, CheckCircle, ArrowRight, MessageCircle,
  ChevronDown, ChevronUp, ShoppingBag, Info,
} from "lucide-react";

const fabricColors = { Basic: "emerald", Standard: "amber", Premium: "purple" };

export default function PriceCalculator({ navigateTo, initialState }) {
  const [gender, setGender] = useState(initialState?.gender || "mens");
  const [garmentType, setGarmentType] = useState(initialState?.garmentType || "shalwar-kameez-mens");
  const [fabricQuality, setFabricQuality] = useState(initialState?.fabricQuality || "Standard");
  const [selectedCustomizations, setSelectedCustomizations] = useState(initialState?.customizations || []);
  const [delivery, setDelivery] = useState(initialState?.delivery || "standard");
  const [showCustomizations, setShowCustomizations] = useState(false);
  const [result, setResult] = useState(null);

  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP || "";

  useEffect(() => {
    const r = calculateTailorPrice(garmentType, fabricQuality, selectedCustomizations, delivery);
    setResult(r);
  }, [garmentType, fabricQuality, selectedCustomizations, delivery]);

  useEffect(() => {
    const garments = GARMENT_CATEGORIES[gender]?.garments || [];
    if (!garments.find((g) => g.id === garmentType)) {
      setGarmentType(garments[0]?.id || "");
    }
  }, [gender]);

  const toggleCustomization = (id) => {
    setSelectedCustomizations((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const handleGetQuote = () => {
    navigateTo("/lead-form", {
      gender,
      garmentType,
      fabricQuality,
      customizations: selectedCustomizations,
      delivery,
    });
  };

  const currentGarments = GARMENT_CATEGORIES[gender]?.garments || [];
  const selectedGarment = currentGarments.find((g) => g.id === garmentType);

  return (
    <div className="bg-slate-50 min-h-screen py-12 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-wider text-emerald-600 uppercase">Tailor Price Calculator</span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-1 mb-4">
            Apne Libas Ki Price Janein
          </h1>
          <p className="text-slate-600">
            Garment type, kapra quality aur customizations choose karein — foran estimate payen.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Selections */}
          <div className="lg:col-span-8 space-y-8">

            {/* Step 1: Gender */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
                <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">1</span>
                <span>Category Select Karein</span>
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(GARMENT_CATEGORIES).map(([key, cat]) => (
                  <button
                    key={key}
                    id={`gender-${key}`}
                    onClick={() => setGender(key)}
                    className={`p-4 rounded-xl border-2 text-center font-semibold transition-all cursor-pointer ${
                      gender === key
                        ? "border-emerald-500 bg-emerald-50 text-emerald-800"
                        : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300"
                    }`}
                  >
                    <div className="text-2xl mb-1">{key === "mens" ? "👔" : "👘"}</div>
                    <div className="text-sm">{cat.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Garment Type */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
                <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">2</span>
                <span>Libas Choose Karein</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentGarments.map((g) => (
                  <button
                    key={g.id}
                    id={`garment-${g.id}`}
                    onClick={() => setGarmentType(g.id)}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      garmentType === g.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 bg-white hover:border-emerald-300"
                    }`}
                  >
                    <span className="text-2xl shrink-0">{g.icon}</span>
                    <div>
                      <div className={`font-semibold text-sm ${garmentType === g.id ? "text-emerald-800" : "text-slate-800"}`}>
                        {g.label}
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">{g.desc}</div>
                    </div>
                    {garmentType === g.id && (
                      <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Fabric Quality */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
                <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">3</span>
                <span>Kapra Quality</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {FABRIC_LEVELS.map((level) => {
                  const isSelected = fabricQuality === level.id;
                  const colorMap = {
                    emerald: isSelected ? "border-emerald-500 bg-emerald-50" : "border-slate-200 hover:border-emerald-300",
                    amber: isSelected ? "border-amber-500 bg-amber-50" : "border-slate-200 hover:border-amber-300",
                    purple: isSelected ? "border-purple-500 bg-purple-50" : "border-slate-200 hover:border-purple-300",
                  };
                  const labelColor = {
                    emerald: "text-emerald-700",
                    amber: "text-amber-700",
                    purple: "text-purple-700",
                  };
                  return (
                    <button
                      key={level.id}
                      id={`fabric-${level.id}`}
                      onClick={() => setFabricQuality(level.id)}
                      className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${colorMap[level.color]}`}
                    >
                      <div className={`font-bold text-base ${labelColor[level.color]}`}>{level.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5 mb-2">{level.sublabel}</div>
                      <p className="text-xs text-slate-600 leading-relaxed">{level.desc}</p>
                      {isSelected && <CheckCircle className={`h-4 w-4 mt-2 ${labelColor[level.color]}`} />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Customizations */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <button
                id="toggle-customizations"
                onClick={() => setShowCustomizations(!showCustomizations)}
                className="w-full flex items-center justify-between cursor-pointer"
              >
                <h2 className="font-bold text-slate-900 text-lg flex items-center space-x-2">
                  <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">4</span>
                  <span>
                    Customizations{" "}
                    {selectedCustomizations.length > 0 && (
                      <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-semibold">
                        {selectedCustomizations.length} selected
                      </span>
                    )}
                  </span>
                </h2>
                {showCustomizations ? (
                  <ChevronUp className="h-5 w-5 text-slate-400" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-slate-400" />
                )}
              </button>
              <p className="text-sm text-slate-500 mt-2 ml-9">
                Optional: Embroidery, zari, lace — jo chahein add karein
              </p>
              {showCustomizations && (
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CUSTOMIZATIONS.map((c) => {
                    const isChecked = selectedCustomizations.includes(c.id);
                    return (
                      <button
                        key={c.id}
                        id={`custom-${c.id}`}
                        onClick={() => toggleCustomization(c.id)}
                        className={`flex items-start space-x-3 p-3 rounded-xl border text-left transition-all cursor-pointer ${
                          isChecked
                            ? "border-emerald-400 bg-emerald-50"
                            : "border-slate-200 bg-white hover:border-emerald-200"
                        }`}
                      >
                        <div className={`mt-0.5 h-4 w-4 rounded border-2 flex items-center justify-center shrink-0 ${
                          isChecked ? "border-emerald-500 bg-emerald-500" : "border-slate-300"
                        }`}>
                          {isChecked && <CheckCircle className="h-3 w-3 text-white" />}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-slate-800">{c.label}</div>
                          <div className="text-xs text-slate-500">{c.desc}</div>
                          <div className="text-xs font-bold text-emerald-600 mt-1">+Rs. {c.price.toLocaleString()}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Step 5: Delivery */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100">
              <h2 className="font-bold text-slate-900 text-lg mb-4 flex items-center space-x-2">
                <span className="h-7 w-7 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center">5</span>
                <span>Delivery Timeline</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {DELIVERY_OPTIONS.map((opt) => (
                  <button
                    key={opt.id}
                    id={`delivery-${opt.id}`}
                    onClick={() => setDelivery(opt.id)}
                    className={`p-4 rounded-xl border-2 text-left transition-all cursor-pointer ${
                      delivery === opt.id
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-slate-200 hover:border-emerald-300"
                    }`}
                  >
                    <div className={`font-bold text-sm ${delivery === opt.id ? "text-emerald-800" : "text-slate-800"}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-slate-500 mb-1">{opt.sublabel}</div>
                    <div className={`text-xs font-semibold ${opt.price > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                      {opt.price > 0 ? `+Rs. ${opt.price.toLocaleString()}` : "Free"}
                    </div>
                    {delivery === opt.id && <CheckCircle className="h-4 w-4 text-emerald-500 mt-2" />}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Price Summary */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg">
              <div className="bg-gradient-to-r from-emerald-700 to-emerald-600 text-white px-6 py-4">
                <div className="flex items-center space-x-2">
                  <Scissors className="h-5 w-5 text-emerald-200" />
                  <span className="text-sm font-semibold text-emerald-100">Price Estimate</span>
                </div>
                <div className="text-2xl font-extrabold mt-2">{result?.formattedRange || "—"}</div>
                <p className="text-emerald-200 text-xs mt-1">Estimated range (final price confirm hoga)</p>
              </div>

              {result && (
                <div className="p-6 space-y-4">
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">
                        {selectedGarment?.label} ({fabricQuality})
                      </span>
                      <span className="font-semibold text-slate-900">Rs. {result.base.toLocaleString()}</span>
                    </div>
                    {result.breakdown.customizations.map((c) => (
                      <div key={c.id} className="flex justify-between items-center text-xs">
                        <span className="text-slate-500">+ {c.label}</span>
                        <span className="text-slate-700 font-medium">Rs. {c.price.toLocaleString()}</span>
                      </div>
                    ))}
                    {result.deliveryCharge > 0 && (
                      <div className="flex justify-between items-center">
                        <span className="text-slate-600">
                          {result.breakdown.delivery?.label} surcharge
                        </span>
                        <span className="font-semibold text-amber-600">Rs. {result.deliveryCharge.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="pt-3 border-t border-slate-100 flex justify-between items-center font-bold">
                      <span className="text-slate-900">Estimated Total</span>
                      <span className="text-emerald-600 text-base">Rs. {result.total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 bg-amber-50 border border-amber-100 rounded-xl p-3">
                    <Info className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-700">
                      Ye ek estimate hai. Final price aapki naap aur design ke mutabiq confirm hoga.
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <button
                      id="get-quote-btn"
                      onClick={handleGetQuote}
                      className="w-full flex items-center justify-center space-x-2 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-colors cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" />
                      <span>Order / Quote Lein</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>

                    {whatsapp && (
                      <a
                        href={`https://wa.me/${whatsapp}?text=Assalam%20o%20Alaikum!%20Mujhe%20${encodeURIComponent(selectedGarment?.label || "libas")}%20banwana%20hai.%20Estimate:%20${encodeURIComponent(result.formattedRange)}`}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
