// ============================================================
// SV AUTO CARS — all editable content lives here.
// Sai: change copy, services, ledger entries, colors in this
// one file without touching the animation code.
// ============================================================

export const BRAND = {
  name: 'SV AUTOCARS',
  tagline: 'Complete Auto Care · Hyderabad',
  instagram: 'https://www.instagram.com/sv_autocars',
  // Both numbers appear in their captions — confirm the primary with the owner.
  phonePrimary: '+919701456388',
  phoneSecondary: '+919603456388',
  whatsapp:
    'https://wa.me/919701456388?text=' +
    encodeURIComponent('Hi SV Autocars — I found you through your website. I want to book my car in.'),
};

// Paint chips for the live repaint chapter (clearcoat colors).
// First chip is the default body color — oryzo cream.
export const PAINTS = [
  { name: 'Ivory',         hex: 0xe9e3d1, ui: '#e9e3d1' },
  { name: 'Guards Red',    hex: 0x9e1220, ui: '#9e1220' },
  { name: 'Riviera Blue',  hex: 0x0f8ea8, ui: '#0f8ea8' },
  { name: 'Racing Yellow', hex: 0xd9b013, ui: '#d9b013' },
  { name: 'Graphite',      hex: 0x3a3d42, ui: '#3a3d42' },
];

// Chapter script blocks — the "side script" that drives the build.
export const CHAPTERS = [
  {
    id: 'heart',
    label: 'CH.01 / THE HEART_',
    headline: 'Every rebuild starts at the heart.',
    body:
      'Scroll, and the engine finds itself — piece by piece, the way we put one back together. Diagnostics first, excuses never.',
    services: [
      'ENGINE DIAGNOSTICS & OVERHAUL',
      'TIMING & TURBO WORK',
      'OIL, FLUIDS & FUEL SYSTEMS',
      'TRANSMISSION SERVICE',
      'PERIODIC MAINTENANCE',
      'INSURANCE-CLAIM REPAIRS',
    ],
    proof: 'PROOF · MERCEDES GLS 350 · E-CLASS · ELANTRA FUEL PUMP',
  },
  {
    id: 'paint',
    label: 'CH.02 / THE SKIN_',
    headline: 'Pick a color. Watch it happen.',
    body:
      'Full-body repaints, custom colors, paint correction — booth-finished to a showroom standard. Tap a chip. That is the actual car.',
    services: [
      'FULL-BODY REPAINT',
      'CUSTOM COLORS',
      'PAINT CORRECTION',
      'DENT & PANEL REPAIR',
      'PANEL REPLACEMENT',
    ],
    proof: 'PROOF · MERCEDES ML 320 · INNOVA CRYSTA ×2 · CELERIO',
  },
  {
    id: 'shield',
    label: 'CH.03 / THE SHIELD_',
    headline: 'Armor you can only see in the shine.',
    body:
      'Self-healing film, ceramic and Teflon coats, underbody protection. The gloss is the receipt.',
    services: [
      'PPF — FULL & PARTIAL, SELF-HEALING',
      'CERAMIC COATING',
      'TEFLON COATING',
      'UNDERBODY ANTI-RUST',
      'HEADLIGHT RESTORATION',
    ],
    proof: 'PROOF · MG M9 EV FULL PPF · KIA SONET CERAMIC · BMW 520d TEFLON',
  },
  {
    id: 'inside',
    label: 'CH.04 / INSIDE_',
    headline: 'The part only the driver knows.',
    body:
      'Deep-cleaned, re-stitched, brought back to life. Interiors that feel new before the engine even starts.',
    services: [
      'INTERIOR DEEP CLEAN',
      'UPHOLSTERY & LEATHER WORK',
      'DASHBOARD REFRESH',
      'FULL DETAILING',
    ],
    proof: 'PROOF · BMW 520d INTERIOR REFRESH',
  },
  {
    id: 'stance',
    label: 'CH.05 / THE STANCE_',
    headline: 'Planted. Balanced. Bites like day one.',
    body:
      'From Airmatic rebuilds to refinished alloys — everything between you and the road, done properly.',
    services: [
      'AIR SUSPENSION · AIRMATIC',
      'BRAKES — DISCS, PADS, CALIPERS',
      'STEERING & ALIGNMENT',
      'ALLOY WHEEL REFINISHING',
      'AC OVERHAUL · ELECTRICAL & BATTERY',
    ],
    proof: 'PROOF · PORSCHE CAYENNE BRAKES · GLS 350 AIRMATIC',
  },
];

// THE LEDGER — real jobs from @sv_autocars. Every entry is real work;
// photos can be dropped into /public/work/ later and referenced here.
export const LEDGER = [
  { car: 'MG M9 EV',               job: 'Full-body PPF · self-healing gloss', tag: 'PPF' },
  { car: 'Kia Sonet',              job: 'Ceramic coating',                    tag: 'CERAMIC' },
  { car: 'BMW 520d',               job: 'Teflon coating + interior refresh',  tag: 'PROTECTION' },
  { car: 'Toyota Fortuner Legender', job: 'Teflon coating',                   tag: 'PROTECTION' },
  { car: 'Mercedes ML 320',        job: 'Full-body repaint + alloy refinish', tag: 'PAINT' },
  { car: 'Toyota Innova Crysta',   job: 'Full-body repaint',                  tag: 'PAINT' },
  { car: 'Toyota Innova Crysta',   job: 'Full-body repaint',                  tag: 'PAINT' },
  { car: 'Maruti Celerio',         job: 'Full-body repaint',                  tag: 'PAINT' },
  { car: 'Mercedes GLS 350',       job: 'Airmatic suspension rebuild',        tag: 'MECHANICAL' },
  { car: 'Mercedes E-Class',       job: 'Full mechanical service',            tag: 'MECHANICAL' },
  { car: 'Hyundai Elantra',        job: 'Fuel pump replacement',              tag: 'MECHANICAL' },
  { car: 'Porsche Cayenne',        job: 'Brake overhaul',                     tag: 'MECHANICAL' },
];
