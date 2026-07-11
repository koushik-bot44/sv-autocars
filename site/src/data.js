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

// The fleet — every car in the switcher. `face` corrects models whose
// nose doesn't point +Z after load; `length` is the real-world size to
// normalize to (meters).
export const FLEET = [
  { id: 'sf90',       name: 'Ferrari SF90 Spider',    file: 'models/fleet/sf90.glb',       length: 4.7, face: Math.PI / 2 },
  { id: 'pista',      name: 'Ferrari 488 Pista',      file: 'models/fleet/pista.glb',      length: 4.6, face: Math.PI / 2 },
  { id: 'one1',       name: 'Koenigsegg One:1',       file: 'models/fleet/one1.glb',       length: 4.5, face: Math.PI / 2 },
  { id: 'vulcan',     name: 'Aston Martin Vulcan',    file: 'models/fleet/vulcan.glb',     length: 4.8, face: Math.PI / 2 },
  { id: 'mclaren600', name: 'McLaren 600LT',          file: 'models/fleet/mclaren600.glb', length: 4.6, face: Math.PI / 2 },
  { id: 'artura',     name: 'McLaren Artura Spider',  file: 'models/fleet/artura.glb',     length: 4.6, face: Math.PI / 2 },
  { id: 'g63',        name: 'Mercedes-AMG G 63',      file: 'models/fleet/g63.glb',        length: 4.9, face: Math.PI / 2 },
];

// Numbered cinematic profiles — Sketchfab-annotation style camera presets.
// Positions are relative to a normalized car (nose +Z, ~4.7m long, y=0 floor).
export const PROFILES = [
  { n: 1, name: 'Signature',  pos: [4.6, 1.4, 5.6],  look: [0, 0.5, 0.2],   fov: 38 },
  { n: 2, name: 'Low Front',  pos: [0.4, 0.55, 6.9], look: [0, 0.65, 0],    fov: 34 },
  { n: 3, name: 'Profile',    pos: [7.6, 0.95, 0.2], look: [0, 0.55, 0.1],  fov: 36 },
  { n: 4, name: 'Rear Wing',  pos: [-3.4, 1.15, -5.2], look: [0, 0.6, -0.6], fov: 40 },
  { n: 5, name: 'Top Deck',   pos: [2.2, 7.4, 2.8],  look: [0, 0, 0.3],     fov: 33 },
];

// Paint chips for the live repaint chapter (clearcoat colors).
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

// THE CRAFT — service cards. Drop real workshop photos into
// site/public/cards/ (e.g. ppf.jpg) and set `img: 'cards/ppf.jpg'`.
export const CRAFT = [
  { title: 'Paint Protection Film', tag: 'PPF · SELF-HEALING', img: null,
    desc: 'Full-body or high-impact zones. Invisible armor that heals its own swirl marks with heat.' },
  { title: 'Paint & Body', tag: 'BOOTH-FINISHED', img: null,
    desc: 'Full repaints, custom colors, dent and panel work — finished to showroom depth, not just shine.' },
  { title: 'Performance & Mechanical', tag: 'DIAGNOSED, NOT GUESSED', img: null,
    desc: 'Engine overhauls, transmissions, brakes, Airmatic suspension — German and exotic specialists.' },
  { title: 'Ceramic & Teflon Coating', tag: 'GLOSS THAT LASTS', img: null,
    desc: 'Multi-layer ceramic or Teflon protection that keeps the deep-wet look through Hyderabad summers.' },
  { title: 'Interiors', tag: 'DRIVER-FIRST', img: null,
    desc: 'Deep cleaning, upholstery, leather restoration and dashboard refresh — new-car feel inside.' },
  { title: 'Wheels & Detailing', tag: 'THE FINAL 10%', img: null,
    desc: 'Alloy refinishing, alignment, headlight restoration and full-body detailing before delivery.' },
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
