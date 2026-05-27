export const GARMENT_CATEGORIES = {
  mens: {
    label: "Mard (Men's)",
    garments: [
      { id: 'shalwar-kameez-mens', label: 'Shalwar Kameez', desc: 'Classic Pakistani traditional wear for men', icon: '👘' },
      { id: 'suit-2piece-mens', label: 'Suit 2-Piece', desc: 'Formal coat pant / 2-piece suit', icon: '🤵' },
      { id: 'suit-3piece-mens', label: 'Suit 3-Piece', desc: 'Formal 3-piece suit with waistcoat', icon: '🤵' },
      { id: 'sherwani', label: 'Sherwani', desc: 'Wedding/formal sherwani for special occasions', icon: '🥇' },
      { id: 'kurta-mens', label: 'Kurta', desc: 'Simple kurta for casual/everyday wear', icon: '👕' },
      { id: 'waistcoat', label: 'Waistcoat', desc: 'Sleeveless waistcoat / vest', icon: '🧥' },
      { id: 'trouser-pant', label: 'Trouser / Pant', desc: 'Single trouser or formal pant', icon: '👖' },
    ],
  },
  womens: {
    label: "Aurat (Women's)",
    garments: [
      { id: 'shalwar-kameez-womens', label: 'Shalwar Kameez', desc: 'Ladies traditional Pakistani suit', icon: '👘' },
      { id: 'suit-3piece-womens', label: 'Suit 3-Piece', desc: 'Ladies 3-piece suit with dupatta', icon: '👗' },
      { id: 'gharara', label: 'Gharara', desc: 'Traditional gharara for weddings & events', icon: '💃' },
      { id: 'sharara', label: 'Sharara', desc: 'Elegant sharara for formal occasions', icon: '💃' },
      { id: 'lehenga', label: 'Lehenga Choli', desc: 'Bridal / party wear lehenga', icon: '👰' },
      { id: 'kurti', label: 'Kurti', desc: 'Short kurti for casual / daily wear', icon: '👚' },
      { id: 'blouse', label: 'Blouse / Shirt', desc: 'Ladies formal or casual blouse', icon: '👚' },
    ],
  },
};

export const BASE_PRICES = {
  'shalwar-kameez-mens':   { Basic: 2000,  Standard: 4500,  Premium: 9000 },
  'suit-2piece-mens':      { Basic: 4000,  Standard: 8500,  Premium: 19000 },
  'suit-3piece-mens':      { Basic: 5500,  Standard: 12000, Premium: 26000 },
  'sherwani':              { Basic: 9000,  Standard: 19000, Premium: 42000 },
  'kurta-mens':            { Basic: 1500,  Standard: 3200,  Premium: 7500 },
  'waistcoat':             { Basic: 2000,  Standard: 4200,  Premium: 9500 },
  'trouser-pant':          { Basic: 800,   Standard: 1800,  Premium: 4200 },
  'shalwar-kameez-womens': { Basic: 2500,  Standard: 5500,  Premium: 12500 },
  'suit-3piece-womens':    { Basic: 3500,  Standard: 7500,  Premium: 17500 },
  'gharara':               { Basic: 5000,  Standard: 11000, Premium: 27000 },
  'sharara':               { Basic: 4500,  Standard: 9500,  Premium: 23000 },
  'lehenga':               { Basic: 6500,  Standard: 15000, Premium: 38000 },
  'kurti':                 { Basic: 1200,  Standard: 2800,  Premium: 6500 },
  'blouse':                { Basic: 1000,  Standard: 2200,  Premium: 5500 },
};

export const FABRIC_LEVELS = [
  {
    id: 'Basic',
    label: 'Basic',
    sublabel: 'Local Fabric',
    desc: 'Good quality local fabric. Best for everyday wear and budget-friendly orders.',
    color: 'emerald',
  },
  {
    id: 'Standard',
    label: 'Standard',
    sublabel: 'Mid-Range',
    desc: 'Pakistani branded fabric (Gul Ahmed, Nishat, etc.). Great quality and finish.',
    color: 'amber',
  },
  {
    id: 'Premium',
    label: 'Premium',
    sublabel: 'Imported / Designer',
    desc: 'Premium imported fabric. Perfect for weddings, events, and luxury wear.',
    color: 'purple',
  },
];

export const CUSTOMIZATIONS = [
  { id: 'machine-embroidery', label: 'Machine Embroidery',     price: 1500,  desc: 'Machine embroidery on chest, collar or cuffs' },
  { id: 'hand-embroidery',    label: 'Hand Embroidery',        price: 5500,  desc: 'Delicate hand-done embroidery work' },
  { id: 'zari-gota',         label: 'Zari / Gota Work',       price: 3200,  desc: 'Traditional zari or gota border decoration' },
  { id: 'lace-border',       label: 'Lace / Border Work',     price: 1300,  desc: 'Decorative lace or border around edges' },
  { id: 'sequence-work',     label: 'Sequence / Thread Work', price: 2800,  desc: 'Sequence or thread-based pattern decoration' },
  { id: 'patch-work',        label: 'Patch Work',             price: 2200,  desc: 'Decorative patch designs on fabric' },
  { id: 'piping-neckline',   label: 'Piping & Neckline',      price: 900,   desc: 'Piping along edges and neckline design' },
  { id: 'special-buttons',   label: 'Designer Buttons',       price: 700,   desc: 'Premium or designer buttons' },
  { id: 'extra-lining',      label: 'Full Lining',            price: 900,   desc: 'Full inner lining for better finish' },
  { id: 'pocket-design',     label: 'Pocket Styling',         price: 600,   desc: 'Decorative or hidden pocket styles' },
];

export const DELIVERY_OPTIONS = [
  { id: 'standard', label: 'Standard',   sublabel: '2-3 Hafta',  price: 0,    desc: 'Regular delivery in 2-3 weeks' },
  { id: 'express',  label: 'Express',    sublabel: '1 Hafta',    price: 1200, desc: 'Express delivery in 1 week (+Rs. 1,200)' },
  { id: 'rush',     label: 'Rush Order', sublabel: '3 Din',      price: 2800, desc: 'Urgent 3-day delivery (+Rs. 2,800)' },
];

export function calculateTailorPrice(garmentType, fabricQuality, customizations, delivery) {
  const base = BASE_PRICES[garmentType]?.[fabricQuality] || 0;

  const selectedCustomizations = [];
  let customTotal = 0;
  for (const cId of customizations) {
    const c = CUSTOMIZATIONS.find((item) => item.id === cId);
    if (c) {
      selectedCustomizations.push({ id: c.id, label: c.label, price: c.price });
      customTotal += c.price;
    }
  }

  const deliveryOpt = DELIVERY_OPTIONS.find((d) => d.id === delivery);
  const deliveryCharge = deliveryOpt?.price || 0;

  const total = base + customTotal + deliveryCharge;
  const estimatedMin = Math.round(total * 0.92);
  const estimatedMax = Math.round(total * 1.12);

  const fmt = (n) => `Rs. ${n.toLocaleString('en-PK')}`;
  const formattedRange = `${fmt(estimatedMin)} – ${fmt(estimatedMax)}`;

  return {
    base,
    customTotal,
    deliveryCharge,
    total,
    estimatedMin,
    estimatedMax,
    formattedRange,
    breakdown: {
      garmentType,
      fabricQuality,
      customizations: selectedCustomizations,
      delivery: deliveryOpt ? { id: deliveryOpt.id, label: deliveryOpt.label, price: deliveryCharge } : null,
    },
  };
}
