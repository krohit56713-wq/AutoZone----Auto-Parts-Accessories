'use strict';
/* =====================================================================
   AutoZone - Auto Parts & Accessories  |  Front-end only, no database
   ---------------------------------------------------------------------
   1. Icons            5. Cart + totals        9. Event handlers
   2. SVG product art  6. UI helpers           10. Start-up
   3. Data             7. Shared components
   4. State + helpers  8. Pages (hash router)
   Data (products, cart, orders, user) lives in JavaScript arrays/objects
   and is saved to localStorage so it survives a page refresh.
   ===================================================================== */

/* ---------- 1. ICONS ---------- */
const IC = {
  search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
  cart:'<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.5L21 7H6"/>',
  user:'<circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/>',
  heart:'<path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/>',
  pin:'<path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  menu:'<path d="M3 6h18M3 12h18M3 18h18"/>',
  check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  truck:'<path d="M1 6h13v10H1zM14 10h4l3 3v3h-7"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/>',
  shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M8.5 12l2.5 2.5L16 9.5"/>',
  undo:'<path d="M3 7v6h6"/><path d="M3.5 13A9 9 0 1 0 6 6.3"/>',
  headset:'<path d="M4 14v-2a8 8 0 0 1 16 0v2"/><rect x="2" y="14" width="4" height="6" rx="1"/><rect x="18" y="14" width="4" height="6" rx="1"/>',
  car:'<path d="M3 15l1.5-5a2 2 0 0 1 2-1.5h11a2 2 0 0 1 2 1.5L21 15v4h-3v-2H6v2H3z"/><circle cx="7.5" cy="14" r="1"/><circle cx="16.5" cy="14" r="1"/>',
  close:'<path d="M5 5l14 14M19 5L5 19"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  minus:'<path d="M5 12h14"/>',
  trash:'<path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13"/>',
  phone:'<path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  chevron:'<path d="M9 6l6 6-6 6"/>',
  tag:'<path d="M3 12V3h9l9 9-9 9z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  box:'<path d="M3 7l9-4 9 4v10l-9 4-9-4z"/><path d="M3 7l9 4 9-4M12 11v10"/>',
  clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  logout:'<path d="M9 4H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h4M16 8l4 4-4 4M20 12H9"/>'
};
const icon = (n, c = '') => `<svg class="ic ${c}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || ''}</svg>`;
const LOGO = '<svg viewBox="0 0 40 40" class="logo-svg" aria-hidden="true"><rect width="40" height="40" rx="10" fill="#E63946"/><circle cx="20" cy="20" r="9" fill="none" stroke="#fff" stroke-width="4" stroke-dasharray="4.2 2.4"/><circle cx="20" cy="20" r="5" fill="#fff"/></svg>';

/* ---------- 2. SVG PRODUCT ART (every image is drawn in code) ---------- */
const NAVY = '#1A3C5E', RED = '#E63946', STEEL = '#8a97a6', DARK = '#2b2f36';
const ring = (n, fn) => Array.from({ length: n }, (_, i) => fn(i, (i * 2 * Math.PI) / n)).join('');
function bottle(color, label, size, cap) {
  return `<path d="M70 70 Q70 56 84 56 H116 Q130 56 130 70 V148 Q130 158 120 158 H80 Q70 158 70 148Z" fill="${color}"/>
  <rect x="88" y="42" width="24" height="16" rx="3" fill="${cap}"/>
  <rect x="78" y="82" width="44" height="52" rx="4" fill="#fff"/><rect x="78" y="82" width="44" height="12" fill="${NAVY}"/>
  <text x="100" y="118" font-size="${size}" font-weight="800" fill="${NAVY}" text-anchor="middle" font-family="Arial,sans-serif">${label}</text>
  <path d="M130 74 h14 a8 8 0 0 1 8 8 v22 a8 8 0 0 1 -8 8 h-14" fill="none" stroke="${color}" stroke-width="8"/>`;
}
const ART = {
  oilfilter: () => `<rect x="62" y="52" width="76" height="104" rx="9" fill="${NAVY}"/><rect x="62" y="88" width="76" height="26" fill="${RED}"/>
    <rect x="56" y="42" width="88" height="16" rx="6" fill="${STEEL}"/><rect x="56" y="150" width="88" height="12" rx="4" fill="#5c6877"/>
    <text x="100" y="105" font-size="12" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">OIL FILTER</text>
    <rect x="72" y="62" width="10" height="80" rx="5" fill="rgba(255,255,255,.18)"/>`,
  airfilter: () => `<rect x="38" y="62" width="124" height="82" rx="8" fill="${NAVY}"/><rect x="46" y="70" width="108" height="66" rx="4" fill="#e8d3a6"/>
    ${Array.from({ length: 11 }, (_, i) => `<line x1="${52 + i * 9.6}" y1="72" x2="${52 + i * 9.6}" y2="134" stroke="#b58f4e" stroke-width="3"/>`).join('')}
    <rect x="38" y="62" width="124" height="8" rx="4" fill="${RED}"/>`,
  sparkplug: () => `<rect x="95" y="14" width="10" height="14" rx="2" fill="#555"/><rect x="88" y="26" width="24" height="52" rx="6" fill="#f3f1ea" stroke="#c7c2b2"/>
    <rect x="88" y="44" width="24" height="5" fill="${RED}"/><polygon points="80,78 120,78 124,98 76,98" fill="${STEEL}"/><rect x="90" y="98" width="20" height="46" fill="#6b7785"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<line x1="90" x2="110" y1="${104 + i * 7}" y2="${104 + i * 7}" stroke="#4d5866" stroke-width="2"/>`).join('')}
    <rect x="95" y="144" width="10" height="10" fill="#4d5866"/><path d="M95 154 h10 v6 h-4 v-3 h-6z" fill="#333"/>`,
  belt: () => `<rect x="38" y="66" width="124" height="66" rx="33" fill="none" stroke="${DARK}" stroke-width="12"/>
    <rect x="38" y="66" width="124" height="66" rx="33" fill="none" stroke="#555d69" stroke-width="2" stroke-dasharray="4 6"/>
    <circle cx="72" cy="99" r="15" fill="${STEEL}"/><circle cx="128" cy="99" r="15" fill="${STEEL}"/><circle cx="72" cy="99" r="5" fill="${NAVY}"/><circle cx="128" cy="99" r="5" fill="${NAVY}"/>`,
  sensor: () => `<rect x="48" y="86" width="26" height="16" rx="3" fill="${STEEL}"/><rect x="72" y="70" width="52" height="48" rx="8" fill="${NAVY}"/>
    <rect x="124" y="82" width="32" height="24" rx="4" fill="${DARK}"/><rect x="130" y="88" width="20" height="4" fill="#d9a441"/><rect x="130" y="97" width="20" height="4" fill="#d9a441"/>
    <circle cx="98" cy="94" r="9" fill="${RED}"/><rect x="80" y="118" width="36" height="8" rx="3" fill="${STEEL}"/>`,
  oil: () => bottle('#f2b632', '5W-30', 12, RED),
  coolant: () => bottle('#27ae60', 'COOLANT', 8.5, NAVY),
  brakepad: () => `<path d="M44 96 Q44 78 62 78 H138 Q156 78 156 96 V110 H44Z" fill="${STEEL}"/><rect x="44" y="104" width="112" height="5" fill="${RED}"/>
    <rect x="44" y="108" width="112" height="26" rx="8" fill="#6b4a2b"/><rect x="70" y="112" width="3" height="18" fill="#3f2a17"/><rect x="100" y="112" width="3" height="18" fill="#3f2a17"/><rect x="130" y="112" width="3" height="18" fill="#3f2a17"/>
    <circle cx="60" cy="94" r="5" fill="#4d5866"/><circle cx="140" cy="94" r="5" fill="#4d5866"/>`,
  rotor: () => `<circle cx="100" cy="98" r="70" fill="#b4bdc8" stroke="#6b7785" stroke-width="3"/><circle cx="100" cy="98" r="52" fill="none" stroke="#9aa5b2" stroke-width="2"/>
    ${ring(16, (i, a) => `<circle cx="${(100 + Math.cos(a) * 42).toFixed(1)}" cy="${(98 + Math.sin(a) * 42).toFixed(1)}" r="3.2" fill="#6b7785"/>`)}
    <circle cx="100" cy="98" r="26" fill="#7d8896"/><circle cx="100" cy="98" r="9" fill="#4d5866"/>
    ${ring(5, (i, a) => `<circle cx="${(100 + Math.cos(a) * 17).toFixed(1)}" cy="${(98 + Math.sin(a) * 17).toFixed(1)}" r="3.5" fill="#d7dde4"/>`)}`,
  caliper: () => `<rect x="46" y="58" width="108" height="84" rx="16" fill="${RED}"/><rect x="68" y="78" width="64" height="44" rx="6" fill="${DARK}"/><rect x="72" y="82" width="56" height="36" rx="4" fill="#b4bdc8"/>
    <circle cx="62" cy="72" r="5" fill="#fff" opacity=".8"/><circle cx="138" cy="72" r="5" fill="#fff" opacity=".8"/>
    <text x="100" y="136" font-size="11" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">BRAKE</text>`,
  tire: () => `<circle cx="100" cy="98" r="72" fill="#1f242b"/><circle cx="100" cy="98" r="72" fill="none" stroke="#3a424d" stroke-width="6" stroke-dasharray="6 5"/>
    <circle cx="100" cy="98" r="54" fill="#2c333c"/><circle cx="100" cy="98" r="42" fill="#c9d1da"/><circle cx="100" cy="98" r="34" fill="#aab4c0"/>
    ${ring(5, (i, a) => `<line x1="100" y1="98" x2="${(100 + Math.cos(a) * 32).toFixed(1)}" y2="${(98 + Math.sin(a) * 32).toFixed(1)}" stroke="#eef2f6" stroke-width="7" stroke-linecap="round"/>`)}
    <circle cx="100" cy="98" r="9" fill="${RED}"/>`,
  tpms: () => `<rect x="92" y="130" width="16" height="30" rx="3" fill="${STEEL}"/><circle cx="100" cy="86" r="48" fill="${NAVY}"/><circle cx="100" cy="86" r="37" fill="#0b1f33"/>
    <text x="100" y="88" font-size="22" font-weight="800" fill="#4ade80" text-anchor="middle" font-family="Arial,sans-serif">32</text>
    <text x="100" y="104" font-size="10" fill="#9fe7b7" text-anchor="middle" font-family="Arial,sans-serif">PSI</text>
    <path d="M62 86 a38 38 0 0 1 76 0" fill="none" stroke="${RED}" stroke-width="3" stroke-dasharray="3 5"/>`,
  brakefluid: () => `<rect x="72" y="66" width="56" height="88" rx="10" fill="${NAVY}"/><rect x="86" y="46" width="28" height="22" rx="4" fill="${DARK}"/><rect x="80" y="88" width="40" height="40" rx="4" fill="#fff"/>
    <text x="100" y="106" font-size="13" font-weight="800" fill="${RED}" text-anchor="middle" font-family="Arial,sans-serif">DOT 4</text><path d="M100 111 q-6 8 0 12 q6 -4 0 -12z" fill="${RED}"/>`,
  headlight: () => `<path d="M100 28 C134 28 150 56 140 84 C134 100 124 106 122 118 H78 C76 106 66 100 60 84 C50 56 66 28 100 28Z" fill="#fff4b8" stroke="#e0b800" stroke-width="3"/>
    <path d="M88 118 V84 M112 118 V84 M88 84 q12 -16 24 0" fill="none" stroke="#b58900" stroke-width="3"/><rect x="76" y="118" width="48" height="30" rx="4" fill="${STEEL}"/><rect x="84" y="148" width="32" height="12" rx="3" fill="#4d5866"/>
    <path d="M30 40 l14 8 M170 40 l-14 8 M24 76 h16 M176 76 h-16" stroke="#f2b632" stroke-width="4" stroke-linecap="round"/>`,
  battery: () => `<rect x="36" y="72" width="128" height="78" rx="8" fill="${NAVY}"/><rect x="36" y="72" width="128" height="16" rx="6" fill="#143049"/>
    <rect x="52" y="58" width="20" height="16" rx="3" fill="${RED}"/><rect x="128" y="58" width="20" height="16" rx="3" fill="${DARK}"/>
    <text x="100" y="124" font-size="26" font-weight="900" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">12V</text>
    <text x="62" y="85" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">+</text><text x="138" y="85" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">-</text>
    <rect x="48" y="134" width="104" height="6" rx="3" fill="${RED}"/>`,
  fuse: () => `<rect x="40" y="64" width="120" height="72" rx="8" fill="${DARK}"/>
    ${['#e63946', '#f2b632', '#3b82c4', '#4ade80', '#a78bfa'].map((c, i) => `<rect x="${52 + i * 22}" y="76" width="16" height="30" rx="3" fill="${c}"/><rect x="${56 + i * 22}" y="106" width="8" height="12" fill="#c9d1da"/>`).join('')}
    <rect x="52" y="122" width="96" height="6" rx="3" fill="#4d5866"/>`,
  alternator: () => `<circle cx="100" cy="98" r="58" fill="${STEEL}" stroke="#5c6877" stroke-width="4"/><circle cx="100" cy="98" r="40" fill="#6b7785"/>
    ${ring(12, (i, a) => `<line x1="${(100 + Math.cos(a) * 44).toFixed(1)}" y1="${(98 + Math.sin(a) * 44).toFixed(1)}" x2="${(100 + Math.cos(a) * 56).toFixed(1)}" y2="${(98 + Math.sin(a) * 56).toFixed(1)}" stroke="#4d5866" stroke-width="3"/>`)}
    <circle cx="100" cy="98" r="20" fill="${RED}"/><circle cx="100" cy="98" r="7" fill="#fff"/><rect x="150" y="84" width="22" height="28" rx="4" fill="${DARK}"/>`,
  ledbar: () => `<rect x="22" y="82" width="156" height="38" rx="8" fill="${DARK}"/>
    ${Array.from({ length: 8 }, (_, i) => `<circle cx="${40 + i * 17.2}" cy="101" r="6" fill="#fff" stroke="#9ec5ff" stroke-width="2"/>`).join('')}
    <path d="M30 70 L16 40 M70 70 L62 36 M100 70 V32 M130 70 L138 36 M170 70 L184 40" stroke="#fff3a6" stroke-width="3" stroke-linecap="round" opacity=".85"/>
    <rect x="40" y="120" width="12" height="14" fill="#5c6877"/><rect x="148" y="120" width="12" height="14" fill="#5c6877"/>`,
  floormat: () => `<polygon points="62,40 150,40 166,158 42,158" fill="#2f353d" stroke="${RED}" stroke-width="4" stroke-linejoin="round"/>
    ${Array.from({ length: 8 }, (_, i) => { const y = 58 + i * 12; return `<line x1="${(62 - (y - 40) * .17 + 8).toFixed(1)}" x2="${(150 + (y - 40) * .136 - 8).toFixed(1)}" y1="${y}" y2="${y}" stroke="#444c57" stroke-width="3"/>`; }).join('')}
    <circle cx="104" cy="100" r="15" fill="${RED}"/><text x="104" y="105" font-size="13" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">AZ</text>`,
  seatcover: () => `<rect x="80" y="14" width="40" height="22" rx="9" fill="#143049"/><rect x="64" y="32" width="72" height="84" rx="14" fill="${NAVY}"/><rect x="52" y="108" width="96" height="42" rx="14" fill="${RED}"/>
    <path d="M76 46 V104 M100 46 V104 M124 46 V104" stroke="#3d6a96" stroke-width="2" stroke-dasharray="5 4"/><path d="M62 122 H138 M62 134 H138" stroke="#ff8a93" stroke-width="2" stroke-dasharray="5 4"/>
    <rect x="60" y="148" width="14" height="14" rx="3" fill="${DARK}"/><rect x="126" y="148" width="14" height="14" rx="3" fill="${DARK}"/>`,
  phonemount: () => `<rect x="68" y="30" width="64" height="104" rx="12" fill="${DARK}"/><rect x="74" y="40" width="52" height="84" rx="6" fill="#4a90d9"/><circle cx="100" cy="82" r="14" fill="#fff" opacity=".85"/>
    <rect x="60" y="86" width="8" height="24" rx="3" fill="${STEEL}"/><rect x="132" y="86" width="8" height="24" rx="3" fill="${STEEL}"/>
    <path d="M100 134 V150" stroke="${STEEL}" stroke-width="8" stroke-linecap="round"/><circle cx="100" cy="162" r="14" fill="${RED}"/>`,
  carcover: () => `<path d="M26 128 Q26 108 50 104 L66 80 Q74 66 92 66 H128 Q146 66 156 82 L170 104 Q178 108 178 126 V132 H26Z" fill="#5f7a96" stroke="${NAVY}" stroke-width="3"/>
    <path d="M62 104 H150" stroke="#8aa3bd" stroke-width="2"/><rect x="26" y="124" width="152" height="8" fill="${NAVY}"/>
    <circle cx="64" cy="136" r="14" fill="${DARK}"/><circle cx="142" cy="136" r="14" fill="${DARK}"/><circle cx="64" cy="136" r="6" fill="#9aa5b2"/><circle cx="142" cy="136" r="6" fill="#9aa5b2"/>
    <text x="100" y="94" font-size="14" font-weight="800" fill="#fff" text-anchor="middle" font-family="Arial,sans-serif">COVER</text>`,
  cleaning: () => `<rect x="66" y="84" width="60" height="74" rx="10" fill="#3b82c4"/><rect x="84" y="66" width="24" height="20" fill="#2f6aa3"/>
    <path d="M80 66 V48 Q80 40 90 40 H128 L148 48 V58 H100 V66Z" fill="${RED}"/><rect x="74" y="102" width="44" height="34" rx="4" fill="#fff"/>
    <text x="96" y="124" font-size="11" font-weight="800" fill="${NAVY}" text-anchor="middle" font-family="Arial,sans-serif">CLEAN</text>
    <path d="M148 44 l16 -6 M150 52 l18 0 M148 58 l16 6" stroke="#9ec5ff" stroke-width="3" stroke-linecap="round"/>`
};
function art(type) {
  const f = ART[type] || ART.oilfilter;
  return `<svg class="art" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${type}"><ellipse cx="100" cy="172" rx="56" ry="7" fill="rgba(26,60,94,.14)"/>${f()}</svg>`;
}
function carArt(body) {
  const wheel = x => `<circle cx="${x}" cy="138" r="27" fill="#161b22"/><circle cx="${x}" cy="138" r="14" fill="#c9d1da"/><circle cx="${x}" cy="138" r="5" fill="#161b22"/>`;
  return `<svg class="hero-car" viewBox="0 0 420 170" role="img" aria-label="Car illustration"><ellipse cx="210" cy="158" rx="190" ry="9" fill="rgba(0,0,0,.25)"/>
    <path d="M22 118 Q22 100 46 96 L88 92 Q108 52 148 48 H252 Q296 50 322 92 L378 98 Q398 102 398 122 V136 H22Z" fill="${body}"/>
    <path d="M108 92 Q122 62 152 60 H200 V92Z" fill="#cfe6ff"/><path d="M212 92 V60 H250 Q282 62 302 92Z" fill="#cfe6ff"/>
    <rect x="22" y="126" width="376" height="10" fill="rgba(0,0,0,.25)"/>${wheel(110)}${wheel(316)}
    <rect x="384" y="106" width="16" height="9" rx="3" fill="#fff3a6"/><rect x="20" y="108" width="12" height="8" rx="3" fill="#ff9aa2"/></svg>`;
}

/* ---------- 3. DATA ---------- */
const CATEGORIES = [
  { id: 'engine', name: 'Engine Parts', subs: ['Filters', 'Spark Plugs & Wires', 'Belts & Hoses', 'Sensors & Switches', 'Engine Oil & Fluids'] },
  { id: 'brakes', name: 'Brakes & Tires', subs: ['Brake Pads & Rotors', 'Calipers & Lines', 'Tires & Wheels', 'Tire Pressure Monitors', 'Brake Fluid'] },
  { id: 'lighting', name: 'Lighting & Electrical', subs: ['Headlights & Bulbs', 'Batteries & Chargers', 'Fuses & Relays', 'Alternators & Starters', 'LED Lights & Bars'] },
  { id: 'accessories', name: 'Accessories', subs: ['Floor Mats & Liners', 'Seat Covers', 'Phone Mounts', 'Car Covers', 'Cleaning Supplies'] }
];
function mk(id, name, brand, cat, sub, price, mrp, rating, reviews, artKey, fits, desc, specs) {
  return { id, name, brand, cat, sub, price, mrp, rating, reviews, art: artKey, fits, desc, specs };
}
const PRODUCTS = [
  mk(1, 'Premium Spin-On Oil Filter', 'TorqueMax', 'engine', 'Filters', 349, 499, 4.8, 2314, 'oilfilter', ['All'], 'High-capacity spin-on filter that traps fine particles and keeps engine oil clean for longer drain intervals.', [['Filter type', 'Spin-on, 22 micron'], ['Material', 'Steel casing, cellulose media'], ['Warranty', '6 months']]),
  mk(2, 'High-Flow Air Filter Panel', 'FlowTech', 'engine', 'Filters', 599, 799, 4.6, 1187, 'airfilter', ['Hatchback', 'Sedan'], 'Washable pleated panel that improves airflow and protects the engine from dust.', [['Filter type', 'Panel, pleated'], ['Reusable', 'Yes, washable'], ['Warranty', '12 months']]),
  mk(3, 'Iridium Spark Plug (Set of 4)', 'SpeedLine', 'engine', 'Spark Plugs & Wires', 1299, 1799, 4.7, 982, 'sparkplug', ['Hatchback', 'Sedan', 'SUV'], 'Long-life iridium tip for easy starts, smoother idle and better fuel economy.', [['Tip', 'Iridium fine-wire'], ['Thread size', '14 mm'], ['Service life', 'Up to 60,000 km']]),
  mk(4, 'Serpentine Drive Belt', 'PrimeGear', 'engine', 'Belts & Hoses', 899, 1299, 4.5, 421, 'belt', ['Sedan', 'SUV'], 'Heat-resistant EPDM ribbed belt that runs the alternator, AC and power steering quietly.', [['Material', 'EPDM rubber'], ['Ribs', '6-rib'], ['Warranty', '12 months']]),
  mk(5, 'Oxygen (O2) Sensor', 'IronShield', 'engine', 'Sensors & Switches', 2499, 3499, 4.4, 233, 'sensor', ['Hatchback', 'Sedan', 'SUV'], 'Plug-and-play sensor that keeps the air-fuel mix right, restoring mileage and cutting emissions.', [['Wires', '4-wire, heated'], ['Thread', 'M18 x 1.5'], ['Warranty', '12 months']]),
  mk(6, 'Fully Synthetic Engine Oil 5W-30 (3.5 L)', 'DriveCare', 'engine', 'Engine Oil & Fluids', 2199, 2799, 4.8, 5120, 'oil', ['All'], 'Fully synthetic oil for petrol and diesel engines with excellent cold-start protection.', [['Grade', '5W-30 (API SN)'], ['Pack size', '3.5 litres'], ['Type', 'Fully synthetic']]),
  mk(7, 'Long-Life Engine Coolant (1 L)', 'DriveCare', 'engine', 'Engine Oil & Fluids', 349, 449, 4.6, 1200, 'coolant', ['All'], 'Ready-to-mix coolant that prevents overheating, corrosion and freezing.', [['Pack size', '1 litre'], ['Colour', 'Green'], ['Protection', 'Up to 3 years']]),
  mk(8, 'Ceramic Brake Pads (Front Set)', 'RoadGrip', 'brakes', 'Brake Pads & Rotors', 3499, 4999, 4.9, 876, 'brakepad', ['Sedan', 'SUV'], 'Low-dust ceramic pads that stop quietly and last longer than semi-metallic pads.', [['Material', 'Ceramic compound'], ['Position', 'Front axle'], ['Warranty', '12 months']]),
  mk(9, 'Vented Brake Disc Rotor', 'RoadGrip', 'brakes', 'Brake Pads & Rotors', 4299, 5999, 4.7, 311, 'rotor', ['Hatchback', 'Sedan', 'SUV'], 'Precision-machined vented rotor that sheds heat fast for fade-free braking.', [['Type', 'Vented, cross-drilled'], ['Diameter', '280 mm'], ['Warranty', '12 months']]),
  mk(10, 'Brake Caliper Assembly', 'IronShield', 'brakes', 'Calipers & Lines', 5999, 7999, 4.5, 98, 'caliper', ['SUV', 'Truck'], 'Remanufactured caliper with new pistons and seals, ready to bolt on.', [['Piston', 'Single, 54 mm'], ['Finish', 'Powder-coated red'], ['Warranty', '12 months']]),
  mk(11, 'All-Season Radial Tyre 205/55 R16', 'TorqueMax', 'brakes', 'Tires & Wheels', 5499, 6999, 4.6, 1543, 'tire', ['Hatchback', 'Sedan'], 'Tubeless radial tyre with deep grooves for strong wet grip and low road noise.', [['Size', '205/55 R16'], ['Type', 'Tubeless radial'], ['Warranty', '5 years']]),
  mk(12, 'SUV All-Terrain Tyre 235/65 R17', 'TorqueMax', 'brakes', 'Tires & Wheels', 8999, 11499, 4.7, 702, 'tire', ['SUV', 'Truck'], 'Rugged all-terrain tread that handles highways, gravel and wet roads.', [['Size', '235/65 R17'], ['Type', 'All-terrain'], ['Warranty', '5 years']]),
  mk(13, 'Brake Fluid DOT 4 (500 ml)', 'DriveCare', 'brakes', 'Brake Fluid', 399, 549, 4.7, 2210, 'brakefluid', ['All'], 'High boiling-point DOT 4 fluid for a consistent pedal feel in city and highway driving.', [['Grade', 'DOT 4'], ['Pack size', '500 ml'], ['Dry boiling point', '260 °C']]),
  mk(14, 'Digital Tyre Pressure Monitor (TPMS)', 'FlowTech', 'brakes', 'Tire Pressure Monitors', 1999, 2799, 4.3, 354, 'tpms', ['All'], 'Solar-powered TPMS with 4 external sensors and a live pressure and temperature display.', [['Sensors', '4 external'], ['Power', 'Solar + USB'], ['Alerts', 'Low / high pressure']]),
  mk(15, 'H4 Halogen Headlight Bulb (Pair)', 'BrightBeam', 'lighting', 'Headlights & Bulbs', 499, 799, 4.5, 3011, 'headlight', ['Hatchback', 'Sedan', 'SUV'], 'Bright white halogen bulbs that give up to 50% more light on the road.', [['Base', 'H4 (P43t)'], ['Power', '60/55 W'], ['Colour temp', '4300 K']]),
  mk(16, '12V 65Ah Car Battery', 'VoltEdge', 'lighting', 'Batteries & Chargers', 6499, 8499, 4.7, 1450, 'battery', ['Hatchback', 'Sedan', 'SUV'], 'Maintenance-free battery with high cold-cranking power and a long service life.', [['Capacity', '65 Ah, 12 V'], ['Type', 'Maintenance-free'], ['Warranty', '48 months']]),
  mk(17, 'Fuse & Relay Kit (120 pcs)', 'VoltEdge', 'lighting', 'Fuses & Relays', 349, 599, 4.4, 890, 'fuse', ['All'], 'Assorted blade fuses and relays in a handy box, so you are never stranded.', [['Pieces', '120'], ['Ratings', '2A to 40A'], ['Case', 'Included']]),
  mk(18, '12V 90A Alternator', 'VoltEdge', 'lighting', 'Alternators & Starters', 7999, 10499, 4.3, 120, 'alternator', ['Sedan', 'SUV'], 'High-output alternator that keeps the battery charged even with accessories running.', [['Output', '12 V, 90 A'], ['Pulley', '6-groove'], ['Warranty', '12 months']]),
  mk(19, '42-inch LED Light Bar 180W', 'BrightBeam', 'lighting', 'LED Lights & Bars', 2999, 4499, 4.5, 640, 'ledbar', ['SUV', 'Truck'], 'Waterproof combo-beam LED bar for off-road trails and foggy highways.', [['Power', '180 W'], ['Beam', 'Spot + flood combo'], ['Rating', 'IP67 waterproof']]),
  mk(20, 'All-Weather Floor Mats (5-pc)', 'ClearView', 'accessories', 'Floor Mats & Liners', 1799, 2499, 4.6, 1320, 'floormat', ['Hatchback', 'Sedan', 'SUV'], 'Deep-channel, odour-free mats that trap mud and spills and protect the carpet.', [['Pieces', '5'], ['Material', 'TPE, odour-free'], ['Fit', 'Universal trim-to-fit']]),
  mk(21, 'Leatherette Seat Covers (Full Set)', 'ClearView', 'accessories', 'Seat Covers', 4999, 7499, 4.5, 560, 'seatcover', ['Hatchback', 'Sedan', 'SUV'], 'Soft, breathable leatherette covers with stitched contrast accents.', [['Material', 'PU leatherette'], ['Coverage', 'Front + rear, 5 seater'], ['Care', 'Wipe clean']]),
  mk(22, 'Magnetic Dashboard Phone Mount', 'ClearView', 'accessories', 'Phone Mounts', 399, 799, 4.4, 4010, 'phonemount', ['All'], 'One-hand magnetic mount with a 360° ball joint and a non-slip grip.', [['Mount', 'Dashboard / vent'], ['Rotation', '360°'], ['Magnet', 'N52 neodymium']]),
  mk(23, 'Waterproof Car Cover', 'DriveCare', 'accessories', 'Car Covers', 1299, 1999, 4.3, 780, 'carcover', ['Hatchback', 'Sedan', 'SUV'], 'UV-resistant waterproof cover with an elastic hem and mirror pockets.', [['Material', 'Polyester, 190T'], ['Protection', 'Rain, dust, UV'], ['Includes', 'Storage bag']]),
  mk(24, 'Car Wash & Polish Kit (7-pc)', 'ClearView', 'accessories', 'Cleaning Supplies', 899, 1399, 4.6, 1890, 'cleaning', ['All'], 'Shampoo, wax, microfibre cloths and applicator pads for a showroom shine.', [['Pieces', '7'], ['Includes', 'Shampoo, wax, 3 cloths'], ['Safe on', 'Paint, glass, plastic']])
];
const VEHICLES = {
  Hatchback: ['Maruti Swift', 'Hyundai i20', 'Tata Tiago', 'Maruti Baleno'],
  Sedan: ['Honda City', 'Hyundai Verna', 'Maruti Ciaz', 'Skoda Slavia'],
  SUV: ['Hyundai Creta', 'Tata Nexon', 'Mahindra Thar', 'Kia Seltos', 'Toyota Fortuner'],
  Truck: ['Mahindra Bolero Pickup', 'Tata Yodha', 'Isuzu D-Max']
};
const VARIANTS = { Standard: 1, Premium: 1.2 };
const STATES = ['Tamil Nadu', 'Karnataka', 'Kerala', 'Andhra Pradesh', 'Telangana', 'Maharashtra', 'Gujarat', 'Rajasthan', 'Delhi', 'Uttar Pradesh', 'Madhya Pradesh', 'Punjab', 'Haryana', 'West Bengal', 'Bihar', 'Odisha', 'Assam', 'Other'];
const STAGES = ['Order placed', 'Packed', 'Shipped', 'Out for delivery', 'Delivered'];
const PAY_LABEL = { upi: 'UPI', card: 'Credit / Debit card', netbanking: 'Net banking', cod: 'Cash on delivery' };
const REVIEW_POOL = [
  { n: 'Rahul S.', r: 5, t: 'Perfect fit and great quality', b: 'Installed it on my car in 20 minutes. Works exactly as described. Worth the price.' },
  { n: 'Priya M.', r: 5, t: 'Genuine product, fast delivery', b: 'Packaging was solid and the part looks original. Delivery came a day early.' },
  { n: 'Arjun K.', r: 4, t: 'Good value for money', b: 'Does the job well. The instructions could be better, but my mechanic fitted it quickly.' },
  { n: 'Sneha R.', r: 4, t: 'Reliable so far', b: 'Using it for three months with no issues.' },
  { n: 'Imran A.', r: 3, t: 'Okay, needed a small tweak', b: 'Slight adjustment needed for my model. Quality is fine though.' }
];
const SLIDES = [
  { kicker: 'Genuine parts, rugged performance', title: 'Keep your engine running strong', text: 'Filters, spark plugs, belts and oils from trusted brands. Up to 31% off.', cta: 'Shop engine parts', params: { cat: 'engine' }, car: '#E63946', prod: 'oilfilter', cls: 's1' },
  { kicker: 'Brakes and tires', title: 'Stop with confidence', text: 'Ceramic pads, vented rotors and all-season tyres. Free delivery above ₹999.', cta: 'Shop brakes & tires', params: { cat: 'brakes' }, car: '#f4f6f9', prod: 'tire', cls: 's2' },
  { kicker: 'Lighting and electrical', title: 'Light up every journey', text: 'Bright LED bars, bulbs and long-life batteries. Use code AUTO10 for 10% off.', cta: 'Shop lighting', params: { cat: 'lighting' }, car: '#2f6fb0', prod: 'battery', cls: 's3' }
];

/* ---------- 4. STATE + HELPERS ---------- */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem('az_' + k); return v === null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem('az_' + k, JSON.stringify(v)); } catch (e) { /* storage unavailable */ } }
};
const state = {
  cart: store.get('cart', []), wish: store.get('wish', []), user: store.get('user', null), users: store.get('users', []),
  orders: store.get('orders', []), vehicle: store.get('vehicle', null), garage: store.get('garage', []),
  recent: store.get('recent', []), pin: store.get('pin', ''), coupon: store.get('coupon', null), reviews: store.get('reviews', {})
};
const save = k => store.set(k, state[k]);
if (!state.users.length) { state.users.push({ name: 'Demo User', email: 'demo@autozone.com', phone: '9876543210', password: 'demo123' }); save('users'); }

const RS = '₹';
const inr = n => RS + Math.round(n).toLocaleString('en-IN');
const num = n => n.toLocaleString('en-IN');
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const byId = id => PRODUCTS.find(p => p.id === +id);
const disc = p => Math.round((1 - p.price / p.mrp) * 100);
const catOf = id => CATEGORIES.find(c => c.id === id);
const maxDisc = id => Math.max(...PRODUCTS.filter(p => p.cat === id).map(disc));
const stars = r => `<span class="stars" style="--p:${(r / 5 * 100).toFixed(0)}%" aria-label="${r} out of 5">★★★★★</span>`;
const lnk = o => '#/products?' + new URLSearchParams(o).toString().replace(/&/g, '&amp;');
const hashOf = o => '#/products?' + new URLSearchParams(o).toString();
const fmtDate = d => d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' });
const addDays = n => { const d = new Date(); d.setDate(d.getDate() + n); return d; };
const val = (f, n) => (f.elements[n] ? String(f.elements[n].value).trim() : '');
const unit = it => Math.round(byId(it.id).price * (VARIANTS[it.variant] || 1));
const isWish = id => state.wish.includes(+id);
const orderStage = o => Math.min(4, Math.floor((Date.now() - o.placedAt) / 30000));
let timers = [];
const clearTimers = () => { timers.forEach(clearInterval); timers = []; };

function pushRecent(id) { state.recent = [+id, ...state.recent.filter(x => x !== +id)].slice(0, 10); save('recent'); }
function fitState(p) { if (!state.vehicle) return null; return p.fits.includes('All') || p.fits.includes(state.vehicle.type); }
function fitBadge(p) {
  const f = fitState(p);
  if (f === null) return '';
  return f ? `<span class="fit ok">${icon('check')} Fits your ${esc(state.vehicle.name)}</span>` : `<span class="fit no">May not fit your ${esc(state.vehicle.name)}</span>`;
}

/* ---------- 5. CART + TOTALS ---------- */
function addToCart(id, qty = 1, variant = 'Standard') {
  const f = state.cart.find(i => i.id === +id && i.variant === variant);
  if (f) f.qty = Math.min(10, f.qty + qty); else state.cart.push({ id: +id, qty: Math.min(10, qty), variant });
  save('cart'); updateBadges();
}
function totals(mode = 'standard') {
  const sub = state.cart.reduce((s, i) => s + unit(i) * i.qty, 0);
  const c = state.coupon;
  let discount = 0;
  if (c === 'AUTO10') discount = Math.min(Math.round(sub * 0.10), 1000);
  if (c === 'SAVE200' && sub >= 2000) discount = 200;
  let ship = (sub === 0 || sub >= 999 || c === 'FREESHIP') ? 0 : 79;
  if (mode === 'express' && sub > 0) ship = 149;
  const total = sub - discount + ship;
  const gst = Math.round((sub - discount) * 18 / 118);
  const count = state.cart.reduce((s, i) => s + i.qty, 0);
  return { sub, discount, ship, total, gst, count };
}
function applyCoupon(code) {
  code = String(code || '').trim().toUpperCase();
  const t = totals();
  if (!['AUTO10', 'SAVE200', 'FREESHIP'].includes(code)) { toast('That coupon code is not valid', 'err'); return false; }
  if (code === 'SAVE200' && t.sub < 2000) { toast('SAVE200 needs a cart of ' + inr(2000) + ' or more', 'err'); return false; }
  state.coupon = code; save('coupon'); toast('Coupon ' + code + ' applied'); return true;
}

/* ---------- 6. UI HELPERS ---------- */
function toast(msg, type = 'ok') {
  const t = document.createElement('div');
  t.className = 'toast ' + type; t.textContent = msg;
  $('#toasts').appendChild(t);
  setTimeout(() => t.classList.add('show'), 10);
  setTimeout(() => { t.classList.remove('show'); setTimeout(() => t.remove(), 300); }, 2600);
}
function openModal(html, cls = '') {
  const m = $('#modal');
  m.innerHTML = `<div class="modal-box ${cls}" role="dialog" aria-modal="true"><button class="modal-x" data-action="close-modal" aria-label="Close">${icon('close')}</button>${html}</div>`;
  m.classList.add('open'); document.body.classList.add('no-scroll');
}
function closeModal() { const m = $('#modal'); m.classList.remove('open'); m.innerHTML = ''; document.body.classList.remove('no-scroll'); }
function closeMenu() { document.body.classList.remove('menu-open'); }
function setErr(f, errs) {
  $$('[data-err]', f).forEach(e => { e.textContent = ''; });
  $$('.invalid', f).forEach(e => e.classList.remove('invalid'));
  Object.entries(errs).forEach(([k, m]) => {
    const s = $(`[data-err="${k}"]`, f); if (s) s.textContent = m;
    const i = f.elements[k]; if (i && i.classList) i.classList.add('invalid');
  });
  const first = $('.invalid', f); if (first) first.focus();
  return Object.keys(errs).length === 0;
}
const fld = (label, name, o = {}) => `<label class="fld ${o.full ? 'full' : ''}"><span>${label}</span><input name="${name}" type="${o.type || 'text'}" ${o.ph ? `placeholder="${esc(o.ph)}"` : ''} value="${esc(o.val || '')}" ${o.attrs || ''}><em class="err" data-err="${name}"></em></label>`;
const selFld = (label, name, opts, v, full) => `<label class="fld ${full ? 'full' : ''}"><span>${label}</span><select name="${name}"><option value="">Select</option>${opts.map(o => `<option ${o === v ? 'selected' : ''}>${esc(o)}</option>`).join('')}</select><em class="err" data-err="${name}"></em></label>`;
const vehOptions = sel => Object.entries(VEHICLES).map(([t, ms]) => `<optgroup label="${t}">${ms.map(m => `<option value="${t}|${m}" ${sel === m ? 'selected' : ''}>${m}</option>`).join('')}</optgroup>`).join('');
const vehicleForm = () => `<div class="veh-form"><label>Vehicle type<select data-vtype><option value="">Select type</option>${Object.keys(VEHICLES).map(t => `<option>${t}</option>`).join('')}</select></label><label>Model<select data-vmodel disabled><option value="">Select model</option></select></label></div>`;

function updateBadges() {
  const c = state.cart.reduce((s, i) => s + i.qty, 0);
  $('#cartCount').textContent = c || '';
  $('#wishCount').textContent = state.wish.length || '';
}
function updateHeader() {
  $('#vehicleLabel').textContent = state.vehicle ? state.vehicle.name : 'Select vehicle';
  $('#pinLabel').textContent = state.pin ? 'Deliver to ' + state.pin : 'Deliver to: add pincode';
  $('#accHello').textContent = state.user ? 'Hello, ' + state.user.name.split(' ')[0] : 'Hello, sign in';
  updateBadges();
}
function renderChrome() {
  $$('[data-ic]').forEach(e => { e.innerHTML = icon(e.dataset.ic); });
  $$('[data-logo]').forEach(e => { e.innerHTML = LOGO; });
  $('#searchCat').innerHTML = '<option value="">All</option>' + CATEGORIES.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
  $('#subnavIn').innerHTML = `<a href="#/products">All Parts</a>` + CATEGORIES.map(c => `<a href="${lnk({ cat: c.id })}">${c.name}</a>`).join('') +
    `<a href="#/deals" class="hot">Today's Deals</a><span class="sp"></span><a href="#/about">About</a><a href="#/contact">Contact</a>`;
}
function markNav() {
  const h = location.hash;
  $$('#subnavIn a').forEach(a => a.classList.toggle('on', a.getAttribute('href') === h));
}

/* ---------- 7. SHARED COMPONENTS ---------- */
function card(p) {
  const d = disc(p);
  return `<article class="card">
    <a class="card-img" href="#/product/${p.id}" aria-label="${esc(p.name)}">${art(p.art)}${d >= 15 ? `<span class="badge">-${d}%</span>` : ''}</a>
    <button class="wish ${isWish(p.id) ? 'on' : ''}" data-action="wish" data-id="${p.id}" aria-label="Add to wishlist">${icon('heart')}</button>
    <div class="card-body">
      <small class="brand">${esc(p.brand)}</small>
      <a href="#/product/${p.id}" class="card-title">${esc(p.name)}</a>
      <div class="rating">${stars(p.rating)} <span>${p.rating}</span> <small>(${num(p.reviews)})</small></div>
      <div class="price"><b>${inr(p.price)}</b> <s>${inr(p.mrp)}</s> <em>${d}% off</em></div>
      ${fitBadge(p)}
      <button class="btn btn-primary btn-block" data-action="add" data-id="${p.id}">Add to cart</button>
    </div></article>`;
}
function rowOf(id, list) {
  return `<div class="row-wrap"><button class="row-arrow l" data-action="row" data-dir="-1" data-t="${id}" aria-label="Scroll left">${icon('chevron')}</button>
    <div class="row" id="${id}">${list.map(card).join('')}</div>
    <button class="row-arrow r" data-action="row" data-dir="1" data-t="${id}" aria-label="Scroll right">${icon('chevron')}</button></div>`;
}
function section(title, right, body) {
  return `<section class="sec"><div class="sec-head"><h2>${title}</h2>${right || ''}</div>${body}</section>`;
}
function emptyArt() {
  return `<svg class="big" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="80" fill="#e3ebf4"/><g fill="none" stroke="#1A3C5E" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M45 60h20l14 62h70l12-44H72"/></g><circle cx="88" cy="146" r="9" fill="#E63946"/><circle cx="148" cy="146" r="9" fill="#E63946"/></svg>`;
}
function startCountdown() {
  const els = $$('.cd-time'); if (!els.length) return;
  const tick = () => {
    const end = new Date(); end.setHours(23, 59, 59, 999);
    const ms = Math.max(0, end - new Date());
    const h = Math.floor(ms / 36e5), m = Math.floor(ms % 36e5 / 6e4), s = Math.floor(ms % 6e4 / 1e3);
    const txt = [h, m, s].map(x => String(x).padStart(2, '0')).join(':');
    els.forEach(e => { e.textContent = txt; });
  };
  tick(); timers.push(setInterval(tick, 1000));
}
let heroIdx = 0;
function heroGo(i) {
  const s = $$('.hero-slide'); if (!s.length) return;
  heroIdx = (i + s.length) % s.length;
  s.forEach((el, k) => el.classList.toggle('on', k === heroIdx));
  $$('.hero-dots button').forEach((el, k) => el.classList.toggle('on', k === heroIdx));
}

/* ---------- 8. PAGES ---------- */
function viewHome() {
  const deals = [...PRODUCTS].sort((a, b) => disc(b) - disc(a)).slice(0, 8);
  const bestEngine = PRODUCTS.filter(p => p.cat === 'engine').sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const bestOther = PRODUCTS.filter(p => p.cat === 'brakes' || p.cat === 'lighting').sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const under = PRODUCTS.filter(p => p.price <= 499).slice(0, 4);
  const repurchase = PRODUCTS.filter(p => ['Filters', 'Engine Oil & Fluids', 'Brake Fluid', 'Cleaning Supplies'].includes(p.sub)).slice(0, 8);
  const recent = state.recent.map(byId).filter(Boolean).slice(0, 8);
  const brands = [...new Set(PRODUCTS.map(p => p.brand))].sort();

  const hero = `<section class="hero" aria-label="Featured offers"><div class="hero-track">${SLIDES.map((s, i) => `
    <div class="hero-slide ${s.cls} ${i === 0 ? 'on' : ''}"><div class="container hero-in">
      <div class="hero-copy"><span class="kicker">${s.kicker}</span><h2 class="hero-title">${s.title}</h2><p>${s.text}</p><a class="btn btn-red btn-lg" href="${lnk(s.params)}">${s.cta}</a></div>
      <div class="hero-art">${carArt(s.car)}<div class="hero-prod">${art(s.prod)}</div></div></div></div>`).join('')}</div>
    <button class="hero-nav prev" data-action="hero" data-dir="-1" aria-label="Previous offer">${icon('chevron')}</button>
    <button class="hero-nav next" data-action="hero" data-dir="1" aria-label="Next offer">${icon('chevron')}</button>
    <div class="hero-dots">${SLIDES.map((_, i) => `<button data-action="hero-go" data-i="${i}" class="${i === 0 ? 'on' : ''}" aria-label="Offer ${i + 1}"></button>`).join('')}</div></section>`;

  const finder = `<div class="container pull-up"><div class="finder"><span style="font-size:2rem;color:var(--red)">${icon('car')}</span>
    <div class="grow"><h2>${state.vehicle ? 'Parts for your ' + esc(state.vehicle.name) : 'Find parts that fit your vehicle'}</h2><p>${state.vehicle ? 'We mark every part that fits or may not fit.' : 'Pick your vehicle once and we check compatibility for you.'}</p></div>
    <button class="btn btn-red" data-action="open-vehicle">${state.vehicle ? 'Change vehicle' : 'Select vehicle'}</button></div></div>`;

  const catTiles = CATEGORIES.map(c => {
    const items = c.subs.slice(0, 4).map(s => ({ s, p: PRODUCTS.find(p => p.sub === s) }));
    return `<div class="tile"><h3>Up to ${maxDisc(c.id)}% off | ${c.name}</h3><div class="tile-grid">${items.map(({ s, p }) => `<a class="tile-item" href="${lnk({ cat: c.id, sub: s })}"><span class="pic">${art(p.art)}</span><span class="t">${esc(s)}</span></a>`).join('')}</div><a class="tile-link" href="${lnk({ cat: c.id })}">See all ${c.name}</a></div>`;
  }).join('');
  const underTile = `<div class="tile"><h3>Under ${RS}499 | Pocket-friendly picks</h3><div class="tile-grid">${under.map(p => `<a class="tile-item" href="#/product/${p.id}"><span class="pic">${art(p.art)}</span><span class="t">${esc(p.name.length > 26 ? p.name.slice(0, 24) + '...' : p.name)}</span></a>`).join('')}</div><a class="tile-link" href="${lnk({ price: '0-499' })}">See all under ${RS}500</a></div>`;
  const acctTile = state.user
    ? `<div class="tile"><h3>Welcome back, ${esc(state.user.name.split(' ')[0])}</h3><div class="stack"><a class="btn btn-ghost" href="#/account?tab=orders">${icon('box')} Your orders</a><a class="btn btn-ghost" href="#/account?tab=wishlist">${icon('heart')} Wishlist (${state.wish.length})</a><a class="btn btn-ghost" href="#/account?tab=garage">${icon('car')} My garage</a></div></div>`
    : `<div class="tile"><h3>Sign in for the best experience</h3><div class="stack"><p style="margin:0;color:var(--muted)">Track orders, save vehicles and keep a wishlist.</p><a class="btn btn-red" href="#/login">Sign in securely</a><a class="btn btn-ghost" href="#/login?mode=register">Create account</a></div></div>`;

  const trust = `<div class="trust"><div>${icon('shield')}<span><b>Genuine parts</b><small>Sourced from authorised distributors</small></span></div>
    <div>${icon('truck')}<span><b>Free delivery over ${RS}999</b><small>Standard shipping across India</small></span></div>
    <div>${icon('undo')}<span><b>7-day easy returns</b><small>Wrong part? We swap it free</small></span></div>
    <div>${icon('headset')}<span><b>Expert help</b><small>Mon-Sat, 9 AM to 8 PM</small></span></div></div>`;

  const html = hero + finder + `<div class="container page" style="padding-top:6px">
    <section class="sec"><div class="tiles">${catTiles}${underTile}${acctTile}</div></section>
    ${section(`Today's Deals <span class="cd">${icon('clock')}<span class="cd-time">--:--:--</span> left</span>`, `<a class="link" href="#/deals">See all deals</a>`, rowOf('rowDeals', deals))}
    ${section('Best sellers in Engine Parts', `<a class="link" href="${lnk({ cat: 'engine', sort: 'popular' })}">See more</a>`, rowOf('rowEngine', bestEngine))}
    ${section('Best sellers in Brakes, Tires &amp; Lighting', `<a class="link" href="${lnk({ sort: 'popular' })}">See more</a>`, rowOf('rowOther', bestOther))}
    ${section('Frequently repurchased', '', rowOf('rowRepeat', repurchase))}
    ${section('Shop by brand', '', `<div class="brands">${brands.map(b => `<a class="brand-chip" href="${lnk({ brand: b })}"><span>${b[0]}</span>${b}</a>`).join('')}</div>`)}
    ${recent.length ? section('Recently viewed', '', rowOf('rowRecent', recent)) : ''}
    <section class="sec">${trust}</section>
    <section class="sec"><div class="newsletter"><div><h2>Get parts deals in your inbox</h2><p>One short email a week. Unsubscribe any time.</p></div>
      <form data-form="newsletter" novalidate><input type="email" name="email" placeholder="Your email address" aria-label="Email address"><button class="btn btn-red" type="submit">Subscribe</button></form></div></section></div>`;
  return { html, title: 'Home', after() { heroIdx = 0; timers.push(setInterval(() => heroGo(heroIdx + 1), 5500)); startCountdown(); } };
}

function filterProducts(q, skip = []) {
  const g = k => (skip.includes(k) ? '' : (q[k] || ''));
  let list = PRODUCTS.slice();
  if (g('cat')) list = list.filter(p => p.cat === g('cat'));
  if (g('sub')) list = list.filter(p => p.sub === g('sub'));
  if (g('brand')) { const b = g('brand').split(','); list = list.filter(p => b.includes(p.brand)); }
  if (g('q')) {
    const t = g('q').toLowerCase().split(/\s+/).filter(Boolean);
    list = list.filter(p => { const h = `${p.name} ${p.brand} ${p.sub} ${catOf(p.cat).name} ${p.desc}`.toLowerCase(); return t.every(w => h.includes(w)); });
  }
  if (g('price')) { const [lo, hi] = g('price').split('-').map(Number); list = list.filter(p => p.price >= lo && p.price <= (hi || Infinity)); }
  if (g('rating')) list = list.filter(p => p.rating >= +g('rating'));
  if (g('fit')) list = list.filter(p => p.fits.includes('All') || p.fits.includes(g('fit')));
  if (g('deals')) list = list.filter(p => disc(p) >= 25);
  if (!skip.includes('sort')) {
    const by = {
      'price-asc': (a, b) => a.price - b.price, 'price-desc': (a, b) => b.price - a.price,
      rating: (a, b) => b.rating - a.rating, discount: (a, b) => disc(b) - disc(a), popular: (a, b) => b.reviews - a.reviews
    }[q.sort];
    if (by) list.sort(by);
  }
  return list;
}
const PRICE_OPTS = [['', 'Any price'], ['0-499', 'Under ₹500'], ['500-999', '₹500 - ₹999'], ['1000-2999', '₹1,000 - ₹2,999'], ['3000-5999', '₹3,000 - ₹5,999'], ['6000-', '₹6,000 & above']];
const RATING_OPTS = [['', 'Any rating'], ['4', '4★ & up'], ['3', '3★ & up']];

function viewProducts(_, q0) {
  const q = { ...q0 };
  const all = filterProducts(q);
  const PAGE = 8, pages = Math.max(1, Math.ceil(all.length / PAGE));
  const page = Math.min(Math.max(1, parseInt(q.page, 10) || 1), pages);
  const list = all.slice((page - 1) * PAGE, page * PAGE);
  const qWith = o => { const n = { ...q, ...o }; delete n.page; Object.keys(n).forEach(k => { if (n[k] === '' || n[k] == null) delete n[k]; }); return n; };
  const baseList = filterProducts(q, ['brand', 'price', 'rating', 'fit', 'sort']);
  const brands = [...new Set(baseList.map(p => p.brand))].sort();
  const selB = (q.brand || '').split(',').filter(Boolean);
  const cat = q.cat ? catOf(q.cat) : null;
  const title = q.q ? `Results for "${esc(q.q)}"` : q.deals ? "Today's Deals" : q.sub ? esc(q.sub) : cat ? cat.name : q.brand ? esc(q.brand.split(',').join(', ')) : 'All auto parts';
  const crumbs = `<nav class="crumbs"><a href="#/home">Home</a> › <a href="#/products">Parts</a>${cat ? ` › <a href="${lnk({ cat: cat.id })}">${cat.name}</a>` : ''}${q.sub ? ` › <span>${esc(q.sub)}</span>` : ''}</nav>`;
  const v = state.vehicle;
  const vbar = v ? (q.fit === v.type
    ? `<div class="vbar">${icon('check')} Showing parts that fit <b>${esc(v.name)}</b> (${v.type}). <a class="link" href="${lnk(qWith({ fit: '' }))}">Show all parts</a></div>`
    : `<div class="vbar off">${icon('car')} Your vehicle: <b>${esc(v.name)}</b>. <a class="link" href="${lnk(qWith({ fit: v.type }))}">Show only parts that fit</a> <button class="link-btn link" data-action="open-vehicle">Change</button></div>`) : '';
  const filters = `<aside class="filters" id="filters"><div class="f-head"><h3>Filters</h3><a href="#/products" class="link">Clear all</a></div>
    <div class="f-group"><h4>Category</h4><ul class="f-list"><li><a class="${!q.cat ? 'on' : ''}" href="${lnk(qWith({ cat: '', sub: '' }))}">All categories</a></li>
    ${CATEGORIES.map(c => `<li><a class="${q.cat === c.id && !q.sub ? 'on' : ''}" href="${lnk(qWith({ cat: c.id, sub: '' }))}">${c.name} <small>(${PRODUCTS.filter(p => p.cat === c.id).length})</small></a>
      ${q.cat === c.id ? `<ul>${c.subs.map(s => `<li><a class="${q.sub === s ? 'on' : ''}" href="${lnk(qWith({ cat: c.id, sub: s }))}">${esc(s)}</a></li>`).join('')}</ul>` : ''}</li>`).join('')}</ul></div>
    <div class="f-group"><h4>Brand</h4>${brands.map(b => `<label class="chk"><input type="checkbox" data-filter="brand" value="${esc(b)}" ${selB.includes(b) ? 'checked' : ''}> ${esc(b)}</label>`).join('') || '<small>No brands</small>'}</div>
    <div class="f-group"><h4>Price</h4>${PRICE_OPTS.map(([k, t]) => `<label class="chk"><input type="radio" name="f-price" data-filter="price" value="${k}" ${(q.price || '') === k ? 'checked' : ''}> ${t}</label>`).join('')}</div>
    <div class="f-group"><h4>Customer rating</h4>${RATING_OPTS.map(([k, t]) => `<label class="chk"><input type="radio" name="f-rating" data-filter="rating" value="${k}" ${(q.rating || '') === k ? 'checked' : ''}> ${t}</label>`).join('')}</div>
    <div class="f-group"><h4>Vehicle type</h4><select data-filter="fit" aria-label="Vehicle type" style="width:100%;border:1.5px solid var(--line);border-radius:10px;padding:8px"><option value="">Any vehicle</option>${Object.keys(VEHICLES).map(t => `<option ${q.fit === t ? 'selected' : ''}>${t}</option>`).join('')}</select></div></aside>`;
  const pq = o => lnk({ ...qWith({}), ...o });
  const pager = pages > 1 ? `<nav class="pager" aria-label="Pages">${page > 1 ? `<a href="${pq({ page: page - 1 })}">‹ Prev</a>` : ''}${Array.from({ length: pages }, (_, i) => `<a class="${i + 1 === page ? 'on' : ''}" href="${pq({ page: i + 1 })}">${i + 1}</a>`).join('')}${page < pages ? `<a href="${pq({ page: page + 1 })}">Next ›</a>` : ''}</nav>` : '';
  const sortSel = `<select data-filter="sort" aria-label="Sort by">${[['', 'Featured'], ['popular', 'Most popular'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['rating', 'Top rated'], ['discount', 'Biggest discount']].map(([k, t]) => `<option value="${k}" ${(q.sort || '') === k ? 'selected' : ''}>${t}</option>`).join('')}</select>`;
  const subChips = cat && !q.sub ? `<div class="brands" style="margin-bottom:14px">${cat.subs.map(s => `<a class="brand-chip" style="padding:6px 14px" href="${lnk({ cat: cat.id, sub: s })}">${esc(s)}</a>`).join('')}</div>` : '';
  const countdown = q.deals ? `<div class="vbar off"><b>Deals end in</b> <span class="cd">${icon('clock')}<span class="cd-time">--:--:--</span></span> Products with 25% off or more.</div>` : '';
  const body = list.length
    ? `<div class="grid">${list.map(card).join('')}</div>${pager}`
    : `<div class="empty">${emptyArt()}<h2>No parts match these filters</h2><p>Try removing a filter or searching for a different part.</p><a class="btn btn-red" href="#/products">Clear all filters</a></div>`;
  const html = `<div class="container page">${crumbs}
    <div class="list-head"><div><h1>${title}</h1><small>${all.length} ${all.length === 1 ? 'part' : 'parts'} found</small></div>
      <div class="list-tools"><button class="btn btn-ghost btn-sm f-toggle" data-action="toggle-filters">${icon('menu')} Filters</button>${sortSel}</div></div>
    ${countdown}${vbar}${subChips}
    <div class="list-grid">${filters}<div>${body}</div></div></div>`;
  return { html, title: q.deals ? "Today's Deals" : 'Shop parts', after() { startCountdown(); } };
}
function viewDeals(_, q) { return viewProducts([], { ...q, deals: '1' }); }

function reviewsFor(p) {
  const own = state.reviews[p.id] || [];
  const off = p.id % REVIEW_POOL.length;
  const pool = [0, 1, 2].map(i => REVIEW_POOL[(off + i) % REVIEW_POOL.length]);
  return [...own, ...pool];
}
function ratingBars(p) {
  const d5 = Math.round(Math.max(30, Math.min(88, 40 + (p.rating - 4) * 50)));
  const d4 = Math.round((100 - d5) * 0.6), d3 = Math.round((100 - d5 - d4) * 0.5), d2 = Math.round((100 - d5 - d4 - d3) * 0.5), d1 = 100 - d5 - d4 - d3 - d2;
  return [[5, d5], [4, d4], [3, d3], [2, d2], [1, d1]].map(([s, v]) => `<div class="bar"><span>${s} star</span><i><u style="width:${v}%"></u></i><span>${v}%</span></div>`).join('');
}
function fitMessage(p, veh) {
  const ok = p.fits.includes('All') || p.fits.includes(veh.type);
  return { ok, msg: ok ? `✓ This part fits your ${veh.name}` : `✗ This part may not fit your ${veh.name}. It fits: ${p.fits.join(', ')}` };
}

function viewProduct([id]) {
  const p = byId(id);
  if (!p) return { redirect: '#/products' };
  pushRecent(p.id);
  const d = disc(p), c = catOf(p.cat);
  const related = PRODUCTS.filter(x => x.cat === p.cat && x.id !== p.id).slice(0, 6);
  const fbt = PRODUCTS.filter(x => x.id !== p.id && x.sub !== p.sub && x.cat === p.cat).slice(0, 2);
  const bundle = [p, ...fbt];
  const bundleTotal = bundle.reduce((s, x) => s + x.price, 0);
  const recent = state.recent.filter(x => x !== p.id).map(byId).filter(Boolean).slice(0, 6);
  const low = p.id % 5 === 0;
  const revs = reviewsFor(p);
  const f0 = state.vehicle ? fitMessage(p, state.vehicle) : null;
  const eta = fmtDate(addDays(3));
  const html = `<div class="container page">
    <nav class="crumbs"><a href="#/home">Home</a> › <a href="${lnk({ cat: c.id })}">${c.name}</a> › <a href="${lnk({ cat: c.id, sub: p.sub })}">${esc(p.sub)}</a> › <span>${esc(p.name)}</span></nav>
    <div class="pd-grid">
      <div><div class="pd-main" id="pdMain">${art(p.art)}${d >= 15 ? `<span class="badge">-${d}%</span>` : ''}</div>
        <div class="pd-thumbs">${['Front view', 'Close-up', 'Back view'].map((t, i) => `<button class="${i === 0 ? 'on' : ''}" data-action="thumb" data-i="${i}" aria-label="${t}"><span class="mini">${art(p.art)}</span></button>`).join('')}</div></div>
      <div class="pd-info">
        <small class="brand"><a class="link" href="${lnk({ brand: p.brand })}">Brand: ${esc(p.brand)}</a></small>
        <h1>${esc(p.name)}</h1>
        <div class="rating">${stars(p.rating)} <b>${p.rating}</b> <a class="link" href="#reviews" data-action="to-reviews">${num(p.reviews)} ratings</a></div>
        <div class="pd-price"><b data-pdprice data-base="${p.price}">${inr(p.price)}</b> <s data-pdmrp data-base="${p.mrp}">${inr(p.mrp)}</s> <em>${d}% off</em></div>
        <small>Inclusive of all taxes</small>
        <ul class="hl">${p.specs.map(([k, v]) => `<li><b>${esc(k)}:</b> ${esc(v)}</li>`).join('')}</ul>
        <h4>Quality</h4>
        <div class="variants" id="variants">${Object.keys(VARIANTS).map(v => `<button class="var ${v === 'Standard' ? 'on' : ''}" data-action="variant" data-v="${v}">${v}<small>${v === 'Premium' ? '+20%' : 'Base price'}</small></button>`).join('')}</div>
        <div class="compat"><h4>${icon('car')} Check compatibility</h4>
          <div class="compat-row"><select id="pdVeh" aria-label="Your vehicle"><option value="">Select your vehicle</option>${vehOptions(state.vehicle && state.vehicle.name)}</select></div>
          <div class="fit-result ${f0 ? (f0.ok ? 'ok' : 'no') : ''}" id="fitResult">${f0 ? esc(f0.msg) : 'Pick a vehicle to see if this part fits.'}</div></div>
      </div>
      <aside class="pd-buy">
        <div class="pd-price"><b data-pdprice data-base="${p.price}">${inr(p.price)}</b></div>
        <div class="stock ${low ? 'low' : ''}">${low ? 'Only 4 left in stock' : 'In stock'}</div>
        <p style="margin:0">${icon('truck')} Delivery by <b id="etaTxt">${eta}</b></p>
        <div class="pin-row"><input id="pdPin" inputmode="numeric" maxlength="6" placeholder="Enter pincode" value="${esc(state.pin)}" aria-label="Pincode"><button class="btn btn-ghost btn-sm" data-action="check-pin">Check</button></div>
        <div class="pin-res" id="pinRes"></div>
        <label style="display:flex;align-items:center;gap:10px;margin:8px 0"><span>Qty</span><span class="qty"><button data-action="pd-qty" data-d="-1" aria-label="Decrease">-</button><input id="pdQty" type="number" min="1" max="10" value="1" aria-label="Quantity"><button data-action="pd-qty" data-d="1" aria-label="Increase">+</button></span></label>
        <div class="buy-actions"><button class="btn btn-primary btn-lg" data-action="pd-add" data-id="${p.id}">Add to cart</button><button class="btn btn-red btn-lg" data-action="pd-buy" data-id="${p.id}">Buy now</button>
          <button class="btn btn-ghost" data-action="wish" data-id="${p.id}">${icon('heart')} ${isWish(p.id) ? 'Remove from wishlist' : 'Add to wishlist'}</button></div>
        <div class="secure">${icon('shield')} Secure transaction. 7-day easy returns.</div>
      </aside>
    </div>
    <section class="pd-sec"><h2>About this part</h2><p>${esc(p.desc)}</p>
      <table class="spec"><tbody><tr><th>Brand</th><td>${esc(p.brand)}</td></tr>${p.specs.map(([k, v]) => `<tr><th>${esc(k)}</th><td>${esc(v)}</td></tr>`).join('')}<tr><th>Fits vehicle types</th><td>${p.fits.map(esc).join(', ')}</td></tr><tr><th>Category</th><td>${c.name} › ${esc(p.sub)}</td></tr></tbody></table></section>
    ${fbt.length ? `<section class="pd-sec"><h2>Frequently bought together</h2><div class="fbt">${bundle.map((x, i) => `${i ? '<span class="plus">+</span>' : ''}<a class="item" href="#/product/${x.id}"><span class="mini">${art(x.art)}</span>${esc(x.name)}<br><b>${inr(x.price)}</b></a>`).join('')}
      <div class="sum"><div>Total: <b style="font-size:1.2rem">${inr(bundleTotal)}</b></div><button class="btn btn-primary" style="margin-top:8px" data-action="add-bundle" data-ids="${bundle.map(x => x.id).join(',')}">Add all ${bundle.length} to cart</button></div></div></section>` : ''}
    <section class="pd-sec" id="reviews"><h2>Customer reviews</h2><div class="rev-grid"><div><div class="rating" style="font-size:1.1rem">${stars(p.rating)} <b>${p.rating} out of 5</b></div><small>${num(p.reviews)} global ratings</small><div class="bars">${ratingBars(p)}</div></div>
      <div>${revs.map(r => `<div class="review"><b>${esc(r.t)}</b><div class="rating">${stars(r.r)} <small>${esc(r.n)}, verified buyer</small></div><p style="margin:4px 0 0">${esc(r.b)}</p></div>`).join('')}
      <form data-form="review" data-id="${p.id}" novalidate style="margin-top:14px;display:grid;gap:10px"><h4>Write a review</h4>
        <label class="fld"><span>Rating</span><select name="rating"><option>5</option><option>4</option><option>3</option><option>2</option><option>1</option></select></label>
        ${fld('Headline', 'title', { ph: 'Sum it up in a few words' })}
        <label class="fld"><span>Your review</span><textarea name="body" rows="3" placeholder="What did you like or dislike?"></textarea><em class="err" data-err="body"></em></label>
        <button class="btn btn-primary" type="submit" style="justify-self:start">Submit review</button></form></div></div></section>
    <section class="pd-sec"><h2>Questions and answers</h2><dl class="qa"><dt>Do I need a mechanic to fit this?</dt><dd>Basic parts like filters, mats and mounts can be fitted at home. For brakes, batteries and electrical parts we suggest a trained mechanic.</dd>
      <dt>Is this a genuine product?</dt><dd>Yes. Every item comes from an authorised distributor and includes a warranty card.</dd></dl></section>
    ${related.length ? section('Related parts', '', rowOf('rowRel', related)) : ''}
    ${recent.length ? section('Recently viewed', '', rowOf('rowRec', recent)) : ''}</div>`;
  return { html, title: p.name };
}

function viewCart() {
  const t = totals();
  if (!state.cart.length) {
    return { title: 'Cart', html: `<div class="container page"><div class="empty">${emptyArt()}<h2>Your cart is empty</h2><p>Add parts to your cart and they will show up here.</p><a class="btn btn-red" href="#/products">Start shopping</a></div></div>` };
  }
  const items = state.cart.map(i => {
    const p = byId(i.id), u = unit(i);
    return `<div class="cart-item"><a class="mini" href="#/product/${p.id}">${art(p.art)}</a>
      <div><h3><a href="#/product/${p.id}">${esc(p.name)}</a></h3><small>${esc(p.brand)} · ${i.variant} quality</small><div class="stock" style="margin:2px 0">In stock</div>${fitBadge(p)}
        <div class="cart-meta"><span class="qty"><button data-action="cart-qty" data-id="${p.id}" data-v="${i.variant}" data-d="-1" aria-label="Decrease">-</button><input value="${i.qty}" readonly aria-label="Quantity"><button data-action="cart-qty" data-id="${p.id}" data-v="${i.variant}" data-d="1" aria-label="Increase">+</button></span>
        <button class="link-btn" data-action="cart-remove" data-id="${p.id}" data-v="${i.variant}">Remove</button><button class="link-btn" data-action="save-later" data-id="${p.id}" data-v="${i.variant}">Save for later</button></div></div>
      <div class="cart-price">${inr(u * i.qty)}${i.qty > 1 ? `<small>${inr(u)} each</small>` : ''}</div></div>`;
  }).join('');
  const inCart = state.cart.map(i => i.id);
  const more = PRODUCTS.filter(p => !inCart.includes(p.id)).sort((a, b) => b.reviews - a.reviews).slice(0, 6);
  const pct = Math.min(100, Math.round(t.sub / 999 * 100));
  const summary = `<aside class="panel sum-box"><div class="free-ship">${t.sub >= 999 || state.coupon === 'FREESHIP' ? `${icon('check')} Your order qualifies for <b>free delivery</b>` : `Add <b>${inr(999 - t.sub)}</b> more for <b>free delivery</b>`}<i><u style="width:${state.coupon === 'FREESHIP' ? 100 : pct}%"></u></i></div>
    <h3>Order summary</h3>
    ${state.coupon ? `<div class="applied"><span>${icon('tag')} ${state.coupon} applied</span><button class="link-btn" data-action="coupon-remove">Remove</button></div>`
      : `<div class="chips">${['AUTO10', 'SAVE200', 'FREESHIP'].map(c => `<button class="chip" data-action="coupon-chip" data-code="${c}">${c}</button>`).join('')}</div><div class="coupon"><input id="couponIn" placeholder="Coupon code" aria-label="Coupon code"><button class="btn btn-ghost btn-sm" data-action="coupon-apply">Apply</button></div>`}
    <div class="sum-row"><span>Items (${t.count})</span><span>${inr(t.sub)}</span></div>
    ${t.discount ? `<div class="sum-row"><span>Coupon discount</span><span class="neg">-${inr(t.discount)}</span></div>` : ''}
    <div class="sum-row"><span>Delivery</span><span>${t.ship ? inr(t.ship) : '<b class="neg">FREE</b>'}</span></div>
    <div class="sum-row total"><span>Order total</span><span>${inr(t.total)}</span></div>
    <div class="sum-row muted"><span>Includes GST (18%)</span><span>${inr(t.gst)}</span></div>
    <a class="btn btn-red btn-lg btn-block" style="margin-top:14px" href="#/checkout">Proceed to checkout</a></aside>`;
  return { title: 'Cart', html: `<div class="container page"><h1>Shopping cart</h1><div class="cart-grid"><div class="panel">${items}</div>${summary}</div>${section('You may also like', '', rowOf('rowMore', more))}</div>` };
}

function coSummary(mode) {
  const t = totals(mode);
  return `<div class="sum-row"><span>Items (${t.count})</span><span>${inr(t.sub)}</span></div>${t.discount ? `<div class="sum-row"><span>Coupon discount</span><span class="neg">-${inr(t.discount)}</span></div>` : ''}
    <div class="sum-row"><span>Delivery</span><span>${t.ship ? inr(t.ship) : '<b class="neg">FREE</b>'}</span></div>
    <div class="sum-row total"><span>Order total</span><span>${inr(t.total)}</span></div><div class="sum-row muted"><span>Includes GST (18%)</span><span>${inr(t.gst)}</span></div>`;
}
function viewCheckout() {
  if (!state.cart.length) return { redirect: '#/cart' };
  const u = state.user || {}, a = u.address || {};
  const html = `<div class="container page"><ol class="steps"><li class="done">1. Cart</li><li class="on">2. Delivery &amp; payment</li><li>3. Confirmation</li></ol>
    <div class="co-grid"><form id="coForm" data-form="checkout" novalidate>
      <section class="panel"><h2>Delivery address</h2><div class="form-grid">
        ${fld('Full name', 'fname', { val: a.name || u.name || '', attrs: 'autocomplete="name"' })}${fld('Mobile number', 'phone', { val: a.phone || u.phone || '', type: 'tel', attrs: 'maxlength="10" inputmode="numeric" autocomplete="tel"', ph: '10-digit number' })}
        ${fld('Address (house, street, area)', 'address', { val: a.line || '', full: true, attrs: 'autocomplete="street-address"' })}
        ${fld('City', 'city', { val: a.city || '' })}${selFld('State', 'state', STATES, a.state || '')}
        ${fld('Pincode', 'pincode', { val: a.pincode || state.pin || '', attrs: 'maxlength="6" inputmode="numeric"', ph: '6 digits' })}</div></section>
      <section class="panel"><h2>Delivery speed</h2>
        <label class="radio-card"><input type="radio" name="delivery" value="standard" checked><span>Standard delivery</span><small>${fmtDate(addDays(3))} to ${fmtDate(addDays(5))}<br>Free above ${RS}999, else ${RS}79</small></label>
        <label class="radio-card"><input type="radio" name="delivery" value="express"><span>Express delivery</span><small>${fmtDate(addDays(1))} to ${fmtDate(addDays(2))}<br>${RS}149</small></label></section>
      <section class="panel"><h2>Payment method</h2>
        <label class="radio-card"><input type="radio" name="pay" value="upi" checked><span>UPI</span><small>Pay with any UPI app</small></label>
        <div class="pay-panel show" id="pay-upi">${fld('UPI ID', 'upi', { ph: 'name@bank' })}</div>
        <label class="radio-card"><input type="radio" name="pay" value="card"><span>Credit / Debit card</span><small>Visa, Mastercard, RuPay</small></label>
        <div class="pay-panel" id="pay-card"><div class="form-grid">${fld('Name on card', 'cardname', { full: true })}${fld('Card number', 'cardno', { full: true, ph: '1234 5678 9012 3456', attrs: 'inputmode="numeric" maxlength="19" autocomplete="off"' })}${fld('Expiry (MM/YY)', 'exp', { ph: 'MM/YY', attrs: 'maxlength="5" inputmode="numeric" autocomplete="off"' })}${fld('CVV', 'cvv', { type: 'password', attrs: 'maxlength="3" inputmode="numeric" autocomplete="off"' })}</div></div>
        <label class="radio-card"><input type="radio" name="pay" value="netbanking"><span>Net banking</span><small>All major banks</small></label>
        <div class="pay-panel" id="pay-netbanking">${selFld('Choose your bank', 'bank', ['State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra Bank', 'Indian Bank', 'Canara Bank', 'Other bank'], '')}</div>
        <label class="radio-card"><input type="radio" name="pay" value="cod"><span>Cash on delivery</span><small>Pay when the parcel arrives</small></label>
        <div class="pay-panel" id="pay-cod"><small>Keep the exact amount ready. Our courier accepts cash and UPI at your door.</small></div>
        <div class="notice">Demo store: no real payment is taken. Do not enter your real card details.</div></section></form>
      <aside class="panel sum-box"><h3>Order summary</h3><div class="co-items">${state.cart.map(i => { const p = byId(i.id); return `<div class="co-item"><span class="mini">${art(p.art)}</span><span>${esc(p.name)}<br><small>Qty ${i.qty} · ${i.variant}</small></span><span>${inr(unit(i) * i.qty)}</span></div>`; }).join('')}</div>
        <div id="coTotals">${coSummary('standard')}</div>
        <button class="btn btn-red btn-lg btn-block" id="placeBtn" type="submit" form="coForm" style="margin-top:14px">Place order</button><a class="link" style="display:block;text-align:center;margin-top:10px" href="#/cart">Back to cart</a></aside></div></div>`;
  return { html, title: 'Checkout' };
}
function viewSuccess([id]) {
  const o = state.orders.find(x => x.id === id);
  if (!o) return { redirect: '#/home' };
  const html = `<div class="container page"><div class="success"><div class="tick">${icon('check')}</div><h1>Thank you, your order is placed</h1>
    <p>Order <b>${o.id}</b> will reach ${esc(o.address.name)} by <b>${fmtDate(new Date(o.placedAt + (o.delivery === 'express' ? 2 : 4) * 864e5))}</b>.</p>
    <div class="panel"><h3>Order details</h3>${o.items.map(i => `<div class="co-item"><span class="mini">${art(i.art)}</span><span>${esc(i.name)}<br><small>Qty ${i.qty} · ${i.variant}</small></span><span>${inr(i.price * i.qty)}</span></div>`).join('')}
      <div class="sum-row total"><span>Total paid (${PAY_LABEL[o.pay]})</span><span>${inr(o.total)}</span></div>
      <div class="sum-row muted"><span>Ship to</span><span>${esc(o.address.line)}, ${esc(o.address.city)}, ${esc(o.address.state)} ${esc(o.address.pincode)}</span></div></div>
    <p style="margin-top:18px;display:flex;gap:10px;justify-content:center;flex-wrap:wrap"><button class="btn btn-primary" data-action="track" data-id="${o.id}">Track order</button><a class="btn btn-ghost" href="#/products">Continue shopping</a></p></div></div>`;
  return { html, title: 'Order placed' };
}

function orderCard(o) {
  const st = orderStage(o);
  return `<div class="order"><div class="order-head"><div><small>Order placed</small><b>${fmtDate(new Date(o.placedAt))}</b></div><div><small>Total</small><b>${inr(o.total)}</b></div><div><small>Ship to</small><b>${esc(o.address.name)}</b></div><div class="grow" style="text-align:right"><small>Order # ${o.id}</small><span class="status s${st}">${STAGES[st]}</span></div></div>
    <div class="order-body">${o.items.map(i => `<a class="o-item" href="#/product/${i.id}"><span class="mini">${art(i.art)}</span><span><b>${esc(i.name)}</b><br><small>Qty ${i.qty} · ${i.variant}</small></span></a>`).join('')}</div>
    <div class="order-foot"><button class="btn btn-primary btn-sm" data-action="track" data-id="${o.id}">Track order</button><button class="btn btn-ghost btn-sm" data-action="buy-again" data-id="${o.id}">Buy again</button></div></div>`;
}
function trackHTML(o) {
  const st = orderStage(o);
  return `<h2>Track order ${o.id}</h2><p>Estimated delivery: <b>${fmtDate(new Date(o.placedAt + 4 * 864e5))}</b></p>
    <ol class="timeline">${STAGES.map((s, i) => `<li class="${i <= st ? 'done' : ''} ${i === st && st < 4 ? 'now' : ''}"><i></i><b>${s}</b><small>${i <= st ? new Date(o.placedAt + i * 30000).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) : 'Pending'}</small></li>`).join('')}</ol>
    <p class="notice">Demo tracking: your order moves to the next step every 30 seconds.</p>`;
}
function viewAccount(_, q) {
  if (!state.user) return { redirect: '#/login?ret=' + encodeURIComponent('account' + (q.tab ? '?tab=' + q.tab : '')) };
  const tab = ['orders', 'wishlist', 'garage', 'profile'].includes(q.tab) ? q.tab : 'orders';
  const u = state.user;
  const nav = `<aside class="acc-nav"><div class="who"><div class="avatar">${esc(u.name[0].toUpperCase())}</div><b>${esc(u.name)}</b><br><small>${esc(u.email)}</small></div>
    ${[['orders', 'box', 'Your orders'], ['wishlist', 'heart', 'Wishlist'], ['garage', 'car', 'My garage'], ['profile', 'user', 'Profile']].map(([k, ic, t]) => `<a class="${tab === k ? 'on' : ''}" href="#/account?tab=${k}">${icon(ic)} ${t}</a>`).join('')}
    <button class="nav" data-action="logout">${icon('logout')} Sign out</button></aside>`;
  let body = '';
  if (tab === 'orders') {
    body = `<h1>Your orders</h1>` + (state.orders.length ? state.orders.map(orderCard).join('') : `<div class="empty">${emptyArt()}<h2>No orders yet</h2><p>When you place an order it will appear here.</p><a class="btn btn-red" href="#/products">Shop parts</a></div>`);
  } else if (tab === 'wishlist') {
    const list = state.wish.map(byId).filter(Boolean);
    body = `<h1>Wishlist</h1>` + (list.length ? `<div class="grid">${list.map(card).join('')}</div>` : `<div class="empty">${emptyArt()}<h2>Your wishlist is empty</h2><p>Tap the heart on any part to save it here.</p><a class="btn btn-red" href="#/products">Browse parts</a></div>`);
  } else if (tab === 'garage') {
    body = `<h1>My garage</h1><div class="panel"><h3>Add a vehicle</h3><div data-vwrap>${vehicleForm()}<button class="btn btn-red" data-action="add-garage">Save to garage</button></div></div>
      <div class="panel" style="margin-top:16px"><h3>Saved vehicles</h3>${state.garage.length ? state.garage.map(v => `<div class="garage-item">${icon('car')}<div class="grow"><b>${esc(v.name)}</b><small>${v.type}</small></div>${state.vehicle && state.vehicle.name === v.name ? '<span class="tag">Active</span>' : `<button class="btn btn-ghost btn-sm" data-action="use-garage" data-name="${esc(v.name)}">Use this vehicle</button>`}<button class="btn btn-ghost btn-sm" data-action="remove-garage" data-name="${esc(v.name)}">Remove</button></div>`).join('') : '<p style="color:var(--muted);margin:0">No saved vehicles yet.</p>'}</div>`;
  } else {
    body = `<h1>Profile</h1><form class="panel" data-form="profile" novalidate><div class="form-grid">${fld('Full name', 'pname', { val: u.name })}${fld('Email', 'pemail', { val: u.email, attrs: 'readonly' })}${fld('Mobile number', 'pphone', { val: u.phone || '', attrs: 'maxlength="10" inputmode="numeric"' })}</div><button class="btn btn-primary" type="submit" style="margin-top:14px">Save changes</button></form>`;
  }
  return { html: `<div class="container page"><div class="acc-grid">${nav}<div>${body}</div></div></div>`, title: 'Your account' };
}

function viewLogin(_, q) {
  const reg = q.mode === 'register';
  const html = `<div class="container page"><div class="auth panel"><div class="tabs"><a class="${!reg ? 'on' : ''}" href="#/login${q.ret ? '?ret=' + encodeURIComponent(q.ret) : ''}">Sign in</a><a class="${reg ? 'on' : ''}" href="#/login?mode=register">Create account</a></div>
    ${reg ? `<form data-form="register" novalidate>${fld('Full name', 'rname', { attrs: 'autocomplete="name"' })}${fld('Email', 'remail', { type: 'email', attrs: 'autocomplete="email"' })}${fld('Mobile number (optional)', 'rphone', { type: 'tel', attrs: 'maxlength="10" inputmode="numeric"' })}${fld('Password (6+ characters)', 'rpass', { type: 'password', attrs: 'autocomplete="new-password"' })}${fld('Confirm password', 'rpass2', { type: 'password', attrs: 'autocomplete="new-password"' })}<button class="btn btn-red btn-lg" type="submit">Create account</button></form>`
      : `<form data-form="login" novalidate>${fld('Email', 'lemail', { type: 'email', attrs: 'autocomplete="email"' })}${fld('Password', 'lpass', { type: 'password', attrs: 'autocomplete="current-password"' })}<em class="err" data-err="login"></em><button class="btn btn-red btn-lg" type="submit">Sign in</button></form>
      <div class="demo-hint">Try the demo account: <b>demo@autozone.com</b> / <b>demo123</b> <button class="link-btn link" data-action="demo-login">Fill it in</button></div>`}</div></div>`;
  return { html, title: reg ? 'Create account' : 'Sign in' };
}

function viewAbout() {
  const team = [['Aarav Menon', 'Founder and CEO'], ['Divya Raman', 'Head of Sourcing'], ['Karthik Iyer', 'Workshop Lead'], ['Meera Nair', 'Customer Care']];
  const vals = [['shield', 'Genuine parts only', 'Every part comes from an authorised distributor and carries a warranty.'], ['headset', 'Honest advice', 'Tell us your vehicle and we tell you what fits. If it does not, we say so.'], ['undo', 'Easy returns', 'Ordered the wrong part? Return it within 7 days and we swap it free.']];
  const html = `<div class="container page"><div class="about-hero"><div><h1>Parts you can trust, delivered to your door</h1><p>AutoZone started in a small Chennai workshop with one idea: finding the right part for your car should not take three phone calls and a trip across town. Today we bring engine parts, brakes, lighting and accessories from trusted brands to drivers across India.</p><a class="btn btn-red" href="#/products">Shop all parts</a></div>${carArt('#E63946')}</div>
    <div class="stats"><div><b>24+</b>Parts in this demo catalogue</div><div><b>10</b>Trusted brands</div><div><b>4.6</b>Average customer rating</div><div><b>7 days</b>Easy returns</div></div>
    ${section('Our mission', '', `<div class="panel"><p style="margin:0">Keep every vehicle on the road safely and affordably. We test fitment, publish clear specifications and keep prices honest, so you can fix it right the first time.</p></div>`)}
    ${section('What we stand for', '', `<div class="vals">${vals.map(([ic, t, d]) => `<div class="panel"><h3 style="display:flex;gap:8px;align-items:center;color:var(--red)">${icon(ic)}<span style="color:var(--navy)">${t}</span></h3><p style="margin:0">${d}</p></div>`).join('')}</div>`)}
    ${section('Meet the team', '', `<div class="team">${team.map(([n, r]) => `<div class="member"><div class="av">${n.split(' ').map(x => x[0]).join('')}</div><b>${n}</b><small>${r}</small></div>`).join('')}</div>`)}</div>`;
  return { html, title: 'About us' };
}
function viewContact() {
  const html = `<div class="container page"><h1>Contact us</h1><div class="contact-grid">
    <div class="panel"><h3>Get in touch</h3>
      <div class="c-line">${icon('pin')}<div><b>Workshop and office</b><br>12, Industrial Estate Road, Ambattur, Chennai 600058</div></div>
      <div class="c-line">${icon('phone')}<div><b>Phone</b><br>+91 98765 43210</div></div>
      <div class="c-line">${icon('mail')}<div><b>Email</b><br>support@autozone-demo.in</div></div>
      <div class="c-line">${icon('clock')}<div><b>Hours</b><br>Monday to Saturday, 9 AM to 8 PM</div></div>
      <div class="map"><svg viewBox="0 0 400 200" role="img" aria-label="Map showing the store location"><rect width="400" height="200" fill="#dbe7f3"/><path d="M0 120 H400 M130 0 V200 M280 0 V200 M0 50 L400 90" stroke="#fff" stroke-width="12"/><path d="M0 120 H400 M130 0 V200 M280 0 V200 M0 50 L400 90" stroke="#c3d3e4" stroke-width="2" stroke-dasharray="8 8"/><rect x="150" y="136" width="100" height="44" rx="6" fill="#c5d9ec"/><rect x="300" y="20" width="70" height="60" rx="6" fill="#c5d9ec"/><path d="M200 108 c-14-18-22-26-22-38 a22 22 0 0 1 44 0 c0 12-8 20-22 38z" fill="#E63946"/><circle cx="200" cy="70" r="8" fill="#fff"/></svg></div></div>
    <form class="panel" data-form="contact" novalidate><h3>Send us a message</h3><div class="form-grid">${fld('Your name', 'cname')}${fld('Email', 'cemail', { type: 'email' })}${fld('Subject', 'csubject', { full: true })}
      <label class="fld full"><span>Message</span><textarea name="cmsg" rows="5"></textarea><em class="err" data-err="cmsg"></em></label></div><button class="btn btn-red btn-lg" type="submit" style="margin-top:14px">Send message</button></form></div></div>`;
  return { html, title: 'Contact us' };
}

/* ---------- Router ---------- */
function parseHash() {
  const raw = (location.hash || '#/home').replace(/^#\/?/, '');
  const i = raw.indexOf('?');
  const path = i < 0 ? raw : raw.slice(0, i);
  const qs = i < 0 ? '' : raw.slice(i + 1);
  return { parts: path.split('/').filter(Boolean), q: Object.fromEntries(new URLSearchParams(qs)) };
}
const VIEWS = { home: viewHome, products: viewProducts, deals: viewDeals, product: viewProduct, cart: viewCart, checkout: viewCheckout, success: viewSuccess, account: viewAccount, login: viewLogin, about: viewAbout, contact: viewContact };
function route(keepScroll) {
  clearTimers(); closeMenu(); closeModal();
  $('#suggest').classList.remove('open');
  const { parts, q } = parseHash();
  const v = parts[0] || 'home';
  const out = (VIEWS[v] || viewHome)(parts.slice(1), q);
  if (out.redirect) { location.hash = out.redirect; return; }
  const y = window.scrollY;
  $('#app').innerHTML = out.html;
  $('#app').dataset.view = v;
  document.title = (out.title ? out.title + ' | ' : '') + 'AutoZone - Auto Parts & Accessories';
  if (keepScroll === true) window.scrollTo(0, y); else window.scrollTo(0, 0);
  if (out.after) out.after();
  updateHeader(); markNav();
}

/* ---------- 9. EVENT HANDLERS ---------- */
function setVehicle(v) {
  state.vehicle = v;
  if (!state.garage.some(g => g.name === v.name)) state.garage.push(v);
  save('vehicle'); save('garage'); updateHeader(); closeModal(); toast('Vehicle set to ' + v.name); route(true);
}
function openVehicleModal() {
  openModal(`<h2>Select your vehicle</h2><p style="color:var(--muted)">We will show which parts fit it.</p><div data-vwrap>${vehicleForm()}<div style="display:flex;gap:10px;flex-wrap:wrap"><button class="btn btn-red" data-action="save-vehicle">Save vehicle</button>${state.vehicle ? '<button class="btn btn-ghost" data-action="clear-vehicle">Clear vehicle</button>' : ''}</div></div>
    ${state.garage.length ? `<h4 style="margin-top:18px">Your garage</h4>${state.garage.map(v => `<button class="btn btn-ghost btn-sm" style="margin:4px 6px 0 0" data-action="use-garage" data-name="${esc(v.name)}">${esc(v.name)}</button>`).join('')}` : ''}`);
}
function readVehicle(wrap) {
  const type = $('[data-vtype]', wrap).value, model = $('[data-vmodel]', wrap).value;
  if (!type || !model) { toast('Choose a vehicle type and model', 'err'); return null; }
  return { name: model, type };
}
function addBackToCart(o) {
  o.items.forEach(i => addToCart(i.id, i.qty, i.variant));
  toast('Items added to your cart'); location.hash = '#/cart';
}
function pdState() {
  const v = ($('.var.on') || {}).dataset ? $('.var.on').dataset.v : 'Standard';
  const qty = Math.max(1, Math.min(10, parseInt(($('#pdQty') || {}).value, 10) || 1));
  return { v, qty };
}
function updatePdPrice() {
  const m = VARIANTS[pdState().v] || 1;
  $$('[data-pdprice]').forEach(e => { e.textContent = inr(+e.dataset.base * m); });
  $$('[data-pdmrp]').forEach(e => { e.textContent = inr(+e.dataset.base * m); });
}

document.addEventListener('click', e => {
  if (e.target.id === 'modal') { closeModal(); return; }
  const el = e.target.closest('[data-action]');
  if (!el) { if (!e.target.closest('.search')) $('#suggest').classList.remove('open'); return; }
  const a = el.dataset.action, d = el.dataset;
  switch (a) {
    case 'menu-toggle': document.body.classList.toggle('menu-open'); break;
    case 'top': window.scrollTo({ top: 0, behavior: 'smooth' }); break;
    case 'close-modal': closeModal(); break;
    case 'toggle-filters': $('#filters').classList.toggle('open'); break;
    case 'add': addToCart(d.id); toast('Added to cart'); break;
    case 'wish': {
      const on = (() => { const id = +d.id, i = state.wish.indexOf(id); if (i > -1) { state.wish.splice(i, 1); toast('Removed from wishlist', 'info'); return false; } state.wish.push(id); toast('Saved to wishlist'); return true; })();
      save('wish'); updateBadges();
      if (el.classList.contains('wish')) el.classList.toggle('on', on);
      else el.innerHTML = `${icon('heart')} ${on ? 'Remove from wishlist' : 'Add to wishlist'}`;
      if ($('#app').dataset.view === 'account') route(true);
      break;
    }
    case 'pd-add': { const s = pdState(); addToCart(d.id, s.qty, s.v); toast('Added to cart'); break; }
    case 'pd-buy': { const s = pdState(); addToCart(d.id, s.qty, s.v); location.hash = '#/checkout'; break; }
    case 'pd-qty': { const i = $('#pdQty'); i.value = Math.max(1, Math.min(10, (parseInt(i.value, 10) || 1) + +d.d)); break; }
    case 'variant': $$('.var').forEach(b => b.classList.toggle('on', b === el)); updatePdPrice(); break;
    case 'thumb': { $$('.pd-thumbs button').forEach(b => b.classList.toggle('on', b === el)); const m = $('#pdMain'); m.classList.remove('v1', 'v2'); if (+d.i) m.classList.add('v' + d.i); break; }
    case 'to-reviews': e.preventDefault(); $('#reviews').scrollIntoView({ behavior: 'smooth' }); break;
    case 'add-bundle': d.ids.split(',').forEach(i => addToCart(i)); toast('All items added to cart'); break;
    case 'check-pin': {
      const v = $('#pdPin').value.trim();
      if (!/^[1-9]\d{5}$/.test(v)) { $('#pinRes').innerHTML = '<span style="color:var(--red)">Enter a valid 6-digit pincode.</span>'; break; }
      state.pin = v; save('pin'); updateHeader();
      $('#pinRes').innerHTML = `<span style="color:var(--ok)">${icon('check')} Delivery to ${v} by ${fmtDate(addDays(3))}. Free above ${RS}999.</span>`; break;
    }
    case 'cart-qty': { const it = state.cart.find(i => i.id === +d.id && i.variant === d.v); if (it) { it.qty = Math.max(1, Math.min(10, it.qty + +d.d)); save('cart'); route(true); } break; }
    case 'cart-remove': state.cart = state.cart.filter(i => !(i.id === +d.id && i.variant === d.v)); save('cart'); toast('Item removed', 'info'); route(true); break;
    case 'save-later': { const id = +d.id; state.cart = state.cart.filter(i => !(i.id === id && i.variant === d.v)); if (!state.wish.includes(id)) state.wish.push(id); save('cart'); save('wish'); toast('Saved to your wishlist'); route(true); break; }
    case 'coupon-apply': if (applyCoupon($('#couponIn').value)) route(true); break;
    case 'coupon-chip': if (applyCoupon(d.code)) route(true); break;
    case 'coupon-remove': state.coupon = null; save('coupon'); route(true); break;
    case 'hero': heroGo(heroIdx + +d.dir); break;
    case 'hero-go': heroGo(+d.i); break;
    case 'row': { const r = $('#' + d.t); if (r) r.scrollBy({ left: +d.dir * r.clientWidth * 0.8, behavior: 'smooth' }); break; }
    case 'open-vehicle': closeMenu(); openVehicleModal(); break;
    case 'save-vehicle': { const v = readVehicle(el.closest('[data-vwrap]')); if (v) setVehicle(v); break; }
    case 'clear-vehicle': state.vehicle = null; save('vehicle'); updateHeader(); closeModal(); toast('Vehicle cleared', 'info'); route(true); break;
    case 'use-garage': { const v = state.garage.find(g => g.name === d.name); if (v) setVehicle(v); break; }
    case 'add-garage': { const v = readVehicle(el.closest('[data-vwrap]')); if (v) { if (!state.garage.some(g => g.name === v.name)) state.garage.push(v); save('garage'); toast('Saved to your garage'); route(true); } break; }
    case 'remove-garage': state.garage = state.garage.filter(g => g.name !== d.name); if (state.vehicle && state.vehicle.name === d.name) { state.vehicle = null; save('vehicle'); updateHeader(); } save('garage'); route(true); break;
    case 'open-pin':
      openModal(`<h2>Where should we deliver?</h2><p style="color:var(--muted)">Enter your pincode to see delivery dates.</p><div class="pin-row"><input id="pinModal" inputmode="numeric" maxlength="6" placeholder="6-digit pincode" value="${esc(state.pin)}" aria-label="Pincode"><button class="btn btn-red" data-action="save-pin">Save</button></div><div class="pin-res" id="pinModalRes"></div>`); break;
    case 'save-pin': {
      const v = $('#pinModal').value.trim();
      if (!/^[1-9]\d{5}$/.test(v)) { $('#pinModalRes').innerHTML = '<span style="color:var(--red)">Enter a valid 6-digit pincode.</span>'; break; }
      state.pin = v; save('pin'); updateHeader(); closeModal(); toast('Delivering to ' + v); break;
    }
    case 'track': { const o = state.orders.find(x => x.id === d.id); if (o) openModal(trackHTML(o), 'wide'); break; }
    case 'buy-again': { const o = state.orders.find(x => x.id === d.id); if (o) addBackToCart(o); break; }
    case 'logout': state.user = null; save('user'); updateHeader(); toast('You are signed out', 'info'); location.hash = '#/home'; break;
    case 'demo-login': { const f = $('[data-form="login"]'); f.elements.lemail.value = 'demo@autozone.com'; f.elements.lpass.value = 'demo123'; break; }
    default: break;
  }
});

document.addEventListener('submit', e => {
  const f = e.target;
  if (f.id === 'searchForm') {
    e.preventDefault();
    const q = $('#searchInput').value.trim(), cat = $('#searchCat').value;
    const o = {}; if (q) o.q = q; if (cat) o.cat = cat;
    location.hash = hashOf(o); return;
  }
  const kind = f.dataset.form;
  if (!kind) return;
  e.preventDefault();
  if (kind === 'newsletter') {
    if (!/^\S+@\S+\.\S+$/.test(val(f, 'email'))) { toast('Enter a valid email address', 'err'); return; }
    toast('Thanks for subscribing'); f.reset();
  } else if (kind === 'review') {
    const body = val(f, 'body');
    if (body.length < 5) { setErr(f, { body: 'Write at least a few words' }); return; }
    const id = f.dataset.id;
    state.reviews[id] = [{ n: state.user ? state.user.name : 'Guest', r: +val(f, 'rating'), t: val(f, 'title') || 'My review', b: body }, ...(state.reviews[id] || [])];
    save('reviews'); toast('Thanks for your review'); route(true);
  } else if (kind === 'login') {
    const email = val(f, 'lemail').toLowerCase(), pw = f.elements.lpass.value, errs = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.lemail = 'Enter a valid email address';
    if (!pw) errs.lpass = 'Enter your password';
    if (!setErr(f, errs)) return;
    const u = state.users.find(x => x.email === email && x.password === pw);
    if (!u) { setErr(f, { login: 'Incorrect email or password.' }); return; }
    state.user = { name: u.name, email: u.email, phone: u.phone || '' }; save('user'); updateHeader();
    toast('Welcome back, ' + u.name.split(' ')[0]);
    location.hash = '#/' + (parseHash().q.ret || 'account');
  } else if (kind === 'register') {
    const name = val(f, 'rname'), email = val(f, 'remail').toLowerCase(), phone = val(f, 'rphone'), pw = f.elements.rpass.value, errs = {};
    if (name.length < 2) errs.rname = 'Enter your full name';
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.remail = 'Enter a valid email address';
    else if (state.users.some(x => x.email === email)) errs.remail = 'An account with this email already exists';
    if (phone && !/^[6-9]\d{9}$/.test(phone)) errs.rphone = 'Enter a valid 10-digit mobile number';
    if (pw.length < 6) errs.rpass = 'Use at least 6 characters';
    if (f.elements.rpass2.value !== pw) errs.rpass2 = 'Passwords do not match';
    if (!setErr(f, errs)) return;
    state.users.push({ name, email, phone, password: pw }); save('users');
    state.user = { name, email, phone }; save('user'); updateHeader();
    toast('Account created. Welcome, ' + name.split(' ')[0]); location.hash = '#/account';
  } else if (kind === 'profile') {
    const name = val(f, 'pname'), phone = val(f, 'pphone'), errs = {};
    if (name.length < 2) errs.pname = 'Enter your full name';
    if (phone && !/^[6-9]\d{9}$/.test(phone)) errs.pphone = 'Enter a valid 10-digit mobile number';
    if (!setErr(f, errs)) return;
    state.user.name = name; state.user.phone = phone; save('user');
    const u = state.users.find(x => x.email === state.user.email); if (u) { u.name = name; u.phone = phone; save('users'); }
    updateHeader(); toast('Profile saved'); route(true);
  } else if (kind === 'contact') {
    const errs = {};
    if (val(f, 'cname').length < 2) errs.cname = 'Enter your name';
    if (!/^\S+@\S+\.\S+$/.test(val(f, 'cemail'))) errs.cemail = 'Enter a valid email address';
    if (val(f, 'csubject').length < 3) errs.csubject = 'Add a subject';
    if (val(f, 'cmsg').length < 10) errs.cmsg = 'Write at least 10 characters';
    if (!setErr(f, errs)) return;
    toast('Message sent. We reply within one working day.'); f.reset();
  } else if (kind === 'checkout') {
    submitCheckout(f);
  }
});

function validateCheckout(fd) {
  const err = {};
  if (fd.fname.length < 2) err.fname = 'Enter your full name';
  if (!/^[6-9]\d{9}$/.test(fd.phone)) err.phone = 'Enter a valid 10-digit mobile number';
  if (fd.address.length < 8) err.address = 'Enter your full address';
  if (!fd.city) err.city = 'Enter your city';
  if (!fd.state) err.state = 'Select your state';
  if (!/^[1-9]\d{5}$/.test(fd.pincode)) err.pincode = 'Enter a valid 6-digit pincode';
  if (fd.pay === 'upi' && !/^[\w.\-]{2,}@[a-zA-Z]{2,}$/.test(fd.upi)) err.upi = 'Enter a valid UPI ID, for example name@bank';
  if (fd.pay === 'card') {
    if (fd.cardname.length < 2) err.cardname = 'Enter the name on the card';
    if (!/^\d{16}$/.test(fd.cardno.replace(/\s/g, ''))) err.cardno = 'Enter the 16-digit card number';
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(fd.exp)) err.exp = 'Use MM/YY';
    if (!/^\d{3}$/.test(fd.cvv)) err.cvv = 'Enter 3 digits';
  }
  if (fd.pay === 'netbanking' && !fd.bank) err.bank = 'Select your bank';
  return err;
}
function submitCheckout(f) {
  if (!state.cart.length) { location.hash = '#/cart'; return; }
  const fd = {};
  ['fname', 'phone', 'address', 'city', 'state', 'pincode', 'upi', 'bank', 'cardno', 'exp', 'cvv', 'cardname'].forEach(n => { fd[n] = val(f, n); });
  fd.pay = f.elements.pay.value || 'upi';
  fd.delivery = f.elements.delivery.value || 'standard';
  if (!setErr(f, validateCheckout(fd))) { toast('Please fix the highlighted fields', 'err'); return; }
  const btn = $('#placeBtn');
  btn.disabled = true; btn.innerHTML = '<span class="spin"></span> Processing payment...';
  setTimeout(() => {
    const t = totals(fd.delivery);
    const order = {
      id: 'AZ' + String(Date.now()).slice(-8), placedAt: Date.now(),
      items: state.cart.map(i => { const p = byId(i.id); return { id: p.id, name: p.name, brand: p.brand, qty: i.qty, price: unit(i), variant: i.variant, art: p.art }; }),
      total: t.total, sub: t.sub, discount: t.discount, ship: t.ship, gst: t.gst, delivery: fd.delivery, pay: fd.pay,
      address: { name: fd.fname, phone: fd.phone, line: fd.address, city: fd.city, state: fd.state, pincode: fd.pincode }
    };
    state.orders.unshift(order); state.cart = []; state.coupon = null; state.pin = fd.pincode;
    if (state.user) { state.user.address = order.address; save('user'); }
    ['orders', 'cart', 'coupon', 'pin'].forEach(save);
    updateHeader();
    location.hash = '#/success/' + order.id;
  }, 1100);
}

document.addEventListener('change', e => {
  const t = e.target;
  if (t.matches('[data-filter]')) {
    const { q } = parseHash(), k = t.dataset.filter;
    if (k === 'brand') {
      const set = new Set((q.brand || '').split(',').filter(Boolean));
      if (t.checked) set.add(t.value); else set.delete(t.value);
      q.brand = [...set].join(',');
    } else q[k] = t.value;
    delete q.page;
    Object.keys(q).forEach(x => { if (!q[x]) delete q[x]; });
    location.hash = hashOf(q);
  } else if (t.matches('[data-vtype]')) {
    const wrap = t.closest('[data-vwrap]'), m = $('[data-vmodel]', wrap), list = VEHICLES[t.value] || [];
    m.innerHTML = '<option value="">Select model</option>' + list.map(x => `<option>${x}</option>`).join('');
    m.disabled = !list.length;
  } else if (t.id === 'pdVeh') {
    const p = byId(parseHash().parts[1]), r = $('#fitResult');
    if (!t.value) { r.className = 'fit-result'; r.textContent = 'Pick a vehicle to see if this part fits.'; return; }
    const [type, name] = t.value.split('|'), m = fitMessage(p, { type, name });
    r.className = 'fit-result ' + (m.ok ? 'ok' : 'no'); r.textContent = m.msg;
  } else if (t.name === 'pay') {
    $$('.pay-panel').forEach(p => p.classList.toggle('show', p.id === 'pay-' + t.value));
  } else if (t.name === 'delivery') {
    $('#coTotals').innerHTML = coSummary(t.value);
  } else if (t.id === 'pdQty') {
    t.value = Math.max(1, Math.min(10, parseInt(t.value, 10) || 1));
  }
});

document.addEventListener('input', e => {
  const t = e.target;
  if (t.classList && t.classList.contains('invalid')) {
    t.classList.remove('invalid');
    const er = t.closest('.fld') && $('.err', t.closest('.fld'));
    if (er) er.textContent = '';
  }
  if (t.name === 'cardno') {
    const v = t.value.replace(/\D/g, '').slice(0, 16);
    t.value = v.replace(/(.{4})/g, '$1 ').trim();
  } else if (t.name === 'exp') {
    let v = t.value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) v = v.slice(0, 2) + '/' + v.slice(2);
    t.value = v;
  } else if (t.name === 'phone' || t.name === 'pincode' || t.name === 'cvv') {
    t.value = t.value.replace(/\D/g, '');
  } else if (t.id === 'searchInput') {
    const raw = t.value.trim(), v = raw.toLowerCase(), box = $('#suggest');
    if (v.length < 2) { box.classList.remove('open'); return; }
    const items = PRODUCTS.filter(p => `${p.name} ${p.brand} ${p.sub}`.toLowerCase().includes(v)).slice(0, 5);
    const cats = CATEGORIES.filter(c => c.name.toLowerCase().includes(v));
    box.innerHTML = `<a class="sg-all" href="${lnk({ q: raw })}">${icon('search')} Search for <b>${esc(raw)}</b></a>` +
      cats.map(c => `<a href="${lnk({ cat: c.id })}">${icon('tag')} In ${c.name}</a>`).join('') +
      items.map(p => `<a href="#/product/${p.id}"><span class="mini">${art(p.art)}</span><span>${esc(p.name)}<small>${inr(p.price)}</small></span></a>`).join('');
    box.classList.add('open');
  }
});
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeModal(); closeMenu(); $('#suggest').classList.remove('open'); } });
window.addEventListener('hashchange', () => route(false));

/* ---------- 10. START-UP ---------- */
function init() {
  renderChrome(); updateHeader(); route(false);
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
