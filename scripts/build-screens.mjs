/**
 * Bake light Soft Day ACADEMe phone UI — ALL screens white/light.
 */
import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../public/screens");

const W = 720;
const H = 1560;
const C = {
  bg: "#F6F7FA",
  white: "#FFFFFF",
  primary: "#5B6CFF",
  primaryDark: "#3D4FD9",
  primarySoft: "rgba(91,108,255,0.12)",
  ink: "#12141A",
  muted: "#5C6578",
  quiet: "#8B92A5",
  border: "#E4E7F0",
  soft: "#EEF0F8",
  success: "#0D9F6E",
  successBg: "#EEFBF5",
  danger: "#E03E4D",
  dangerBg: "#FFF4F4",
  warn: "#C98A12",
};

function esc(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function statusBar() {
  return `
  <text x="40" y="52" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="600" fill="${C.ink}">4:20</text>
  <text x="${W - 40}" y="52" font-family="Archivo, system-ui, sans-serif" font-size="18" font-weight="600" fill="${C.ink}" text-anchor="end">●●●</text>
  <rect x="${W / 2 - 70}" y="28" width="140" height="36" rx="18" fill="#0a0a0c"/>
  <rect x="${W / 2 - 60}" y="${H - 36}" width="120" height="8" rx="4" fill="rgba(18,20,26,0.16)"/>
  `;
}

function titleRow(title) {
  return `
  <text x="48" y="128" font-family="Archivo, system-ui, sans-serif" font-size="34" font-weight="700" fill="${C.ink}">${esc(title)}</text>
  <rect x="48" y="144" width="48" height="5" rx="2" fill="${C.primary}"/>
  `;
}

function card(x, y, w, h, fill = C.white, stroke = C.border, sw = 2) {
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

/** Light home — matches product film white system */
function home() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}
  <text x="48" y="118" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">Hey there</text>
  <text x="48" y="150" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.quiet}">Welcome back</text>
  <circle cx="${W - 72}" cy="132" r="28" fill="${C.soft}" stroke="${C.border}" stroke-width="2"/>
  <circle cx="${W - 72}" cy="124" r="10" fill="${C.muted}"/>
  <path d="M${W - 96} 156 a24 14 0 0 1 48 0" fill="${C.muted}"/>

  <text x="48" y="260" font-family="Archivo, system-ui, sans-serif" font-size="44" font-weight="700" fill="${C.ink}">Ready for</text>
  <text x="48" y="318" font-family="Archivo, system-ui, sans-serif" font-size="44" font-weight="700" fill="${C.ink}">another</text>
  <text x="48" y="376" font-family="Archivo, system-ui, sans-serif" font-size="44" font-weight="700" fill="${C.ink}">effective</text>
  <text x="48" y="434" font-family="Archivo, system-ui, sans-serif" font-size="44" font-weight="700" fill="${C.ink}">session?</text>

  <text x="48" y="510" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">Select a study mode</text>

  ${[
    ["Focus", true, 48, 540],
    ["Review", false, 368, 540],
    ["Cards", false, 48, 640],
    ["Quiz", false, 368, 640],
  ]
    .map(
      ([label, on, x, y]) => `
    <rect x="${x}" y="${y}" width="284" height="78" rx="39" fill="${on ? C.primarySoft : C.white}" stroke="${on ? C.primary : C.border}" stroke-width="${on ? 2.5 : 2}"/>
    <circle cx="${x + 36}" cy="${y + 39}" r="10" fill="${on ? C.primary : C.border}"/>
    <text x="${x + 60}" y="${y + 48}" font-family="Archivo, system-ui, sans-serif" font-size="26" font-weight="600" fill="${C.ink}">${label}</text>
  `
    )
    .join("")}

  ${card(48, 780, W - 96, 200)}
  <text x="80" y="850" font-family="Archivo, system-ui, sans-serif" font-size="28" font-weight="700" fill="${C.ink}">Tonight's review</text>
  <text x="80" y="890" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">12 cards · 8 min</text>
  <rect x="80" y="920" width="${W - 160}" height="14" rx="7" fill="${C.soft}"/>
  <rect x="80" y="920" width="220" height="14" rx="7" fill="${C.primary}"/>

  ${card(48, 1020, W - 96, 160)}
  <text x="80" y="1085" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="600" fill="${C.ink}">Continue Physics Ch.4</text>
  <text x="80" y="1128" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">3 weak spots · practice ready</text>
  </svg>`;
}

function upload() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Upload")}
  <text x="48" y="200" font-family="Archivo, system-ui, sans-serif" font-size="26" font-weight="500" fill="${C.muted}">Drop what you're studying</text>
  <rect x="48" y="250" width="${W - 96}" height="420" rx="32" fill="${C.white}" stroke="${C.border}" stroke-width="2"/>
  <rect x="80" y="290" width="${W - 160}" height="340" rx="24" fill="none" stroke="${C.primary}" stroke-width="3" stroke-dasharray="14 12"/>
  <circle cx="${W / 2}" cy="420" r="36" fill="${C.primarySoft}"/>
  <path d="M${W / 2} 404 v32 M${W / 2 - 16} 420 h32" stroke="${C.primary}" stroke-width="4" stroke-linecap="round"/>
  <text x="${W / 2}" y="500" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="28" font-weight="600" fill="${C.primary}">Tap to add files</text>
  <text x="${W / 2}" y="540" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">PDF · Notes · Slides · Images</text>
  ${["Lecture-04.pdf", "Notes-week3.md", "Slides-unit2.pptx"]
    .map((name, i) => {
      const y = 720 + i * 110;
      return `
      ${card(48, y, W - 96, 92)}
      <rect x="72" y="${y + 22}" width="48" height="48" rx="12" fill="${C.primary}"/>
      <text x="140" y="${y + 54}" font-family="Archivo, system-ui, sans-serif" font-size="26" font-weight="600" fill="${C.ink}">${esc(name)}</text>
    `;
    })
    .join("")}
  </svg>`;
}

function processing() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Reading")}
  <text x="48" y="200" font-family="Archivo, system-ui, sans-serif" font-size="26" font-weight="500" fill="${C.muted}">Understanding your material…</text>
  ${[
    ["Extracting concepts", 1],
    ["Building study graph", 0.72],
    ["Preparing practice", 0.38],
  ]
    .map(([t, p], i) => {
      const y = 300 + i * 150;
      return `
      <text x="56" y="${y}" font-family="Archivo, system-ui, sans-serif" font-size="28" font-weight="600" fill="${C.ink}">${t}</text>
      <rect x="56" y="${y + 28}" width="${W - 112}" height="16" rx="8" fill="${C.border}"/>
      <rect x="56" y="${y + 28}" width="${(W - 112) * p}" height="16" rx="8" fill="${C.primary}"/>
    `;
    })
    .join("")}
  ${card(48, 820, W - 96, 220, C.white)}
  <rect x="48" y="820" width="12" height="220" rx="6" fill="${C.primary}"/>
  <text x="90" y="900" font-family="Archivo, system-ui, sans-serif" font-size="28" font-weight="700" fill="${C.ink}">Mee is almost ready</text>
  <text x="90" y="950" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="${C.muted}">Ask anything about this file.</text>
  <text x="90" y="995" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.primary}">3 files · 24 concepts found</text>
  </svg>`;
}

function chat() {
  const bubbles = [
    { me: true, lines: ["Explain this concept simply."] },
    {
      me: false,
      lines: [
        "Think of it this way — it's like",
        "stacking blocks. Each idea",
        "supports the next.",
      ],
    },
    { me: true, lines: ["Give me an example."] },
    {
      me: false,
      lines: [
        "When you solve problem 3, start",
        "from the base equation we",
        "highlighted in your PDF.",
      ],
    },
    {
      me: false,
      lines: ["Want a practice question on this?"],
    },
  ];
  let y = 190;
  const parts = [];
  for (const b of bubbles) {
    const h = 48 + b.lines.length * 34;
    const x = b.me ? 150 : 48;
    const w = W - 198;
    const fill = b.me ? C.primary : C.white;
    const stroke = b.me ? "none" : C.border;
    const tc = b.me ? "#fff" : C.ink;
    parts.push(`
      <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
      ${b.lines
        .map(
          (line, i) =>
            `<text x="${x + 26}" y="${y + 42 + i * 34}" font-family="Archivo, system-ui, sans-serif" font-size="25" font-weight="500" fill="${tc}">${esc(line)}</text>`
        )
        .join("")}
    `);
    y += h + 28;
  }
  // Extra suggestion chips to fill lower glass
  const chips = [
    { x: 48, t: "Summarize PDF" },
    { x: 280, t: "Key formulas" },
    { x: 500, t: "Quiz me" },
  ];
  const chipParts = chips
    .map(
      (c) => `
    <rect x="${c.x}" y="${H - 250}" width="200" height="52" rx="26" fill="${C.white}" stroke="${C.border}" stroke-width="2"/>
    <text x="${c.x + 100}" y="${H - 216}" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="20" font-weight="600" fill="${C.muted}">${esc(c.t)}</text>
  `
    )
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Mee")}
  ${parts.join("")}
  ${chipParts}
  <!-- input bar -->
  <rect x="40" y="${H - 150}" width="${W - 80}" height="72" rx="36" fill="${C.white}" stroke="${C.border}" stroke-width="2"/>
  <text x="80" y="${H - 105}" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="${C.quiet}">Ask about your material…</text>
  <circle cx="${W - 90}" cy="${H - 114}" r="24" fill="${C.primary}"/>
  <path d="M${W - 100} ${H - 114} h16 M${W - 90} ${H - 124} v16" stroke="#fff" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}

function cards() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Flashcards")}
  <text x="48" y="190" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">From your lecture notes · 4 / 12</text>
  <rect x="76" y="280" width="${W - 124}" height="560" rx="28" fill="${C.soft}" stroke="${C.border}" stroke-width="2"/>
  <rect x="62" y="266" width="${W - 110}" height="560" rx="28" fill="${C.soft}" stroke="${C.border}" stroke-width="2"/>
  <rect x="48" y="252" width="${W - 96}" height="560" rx="28" fill="${C.white}" stroke="${C.border}" stroke-width="2"/>
  <text x="90" y="330" font-family="Archivo, system-ui, sans-serif" font-size="20" font-weight="700" fill="${C.primary}" letter-spacing="2">CONCEPT</text>
  <text x="90" y="420" font-family="Archivo, system-ui, sans-serif" font-size="38" font-weight="700" fill="${C.ink}">What anchors the</text>
  <text x="90" y="470" font-family="Archivo, system-ui, sans-serif" font-size="38" font-weight="700" fill="${C.ink}">base of the argument?</text>
  <text x="90" y="720" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="${C.muted}">Tap to flip</text>
  <rect x="48" y="900" width="${W - 96}" height="16" rx="8" fill="${C.soft}"/>
  <rect x="48" y="900" width="220" height="16" rx="8" fill="${C.primary}"/>
  </svg>`;
}

function quiz() {
  const opts = [
    { t: "Identify the knowns", ok: true },
    { t: "Jump to the final formula", ok: false },
    { t: "Skip units", ok: false },
    { t: "Memorize only", ok: false },
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Quiz")}
  <text x="48" y="190" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">Question 2 of 8 · Physics</text>
  <rect x="48" y="210" width="${W - 96}" height="12" rx="6" fill="${C.soft}"/>
  <rect x="48" y="210" width="160" height="12" rx="6" fill="${C.primary}"/>
  <text x="48" y="290" font-family="Archivo, system-ui, sans-serif" font-size="32" font-weight="700" fill="${C.ink}">Which step comes first</text>
  <text x="48" y="336" font-family="Archivo, system-ui, sans-serif" font-size="32" font-weight="700" fill="${C.ink}">when solving this?</text>
  ${opts
    .map((o, i) => {
      const y = 400 + i * 130;
      const fill = o.ok ? C.primarySoft : C.white;
      const stroke = o.ok ? C.primary : C.border;
      const sw = o.ok ? 3 : 2;
      return `
      <rect x="48" y="${y}" width="${W - 96}" height="108" rx="22" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>
      <text x="88" y="${y + 64}" font-family="Archivo, system-ui, sans-serif" font-size="26" font-weight="600" fill="${C.ink}">${esc(o.t)}</text>
    `;
    })
    .join("")}
  <text x="48" y="980" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">From Lecture-04.pdf · page 6</text>
  </svg>`;
}

function practice() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Adaptive")}
  <text x="48" y="190" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">Difficulty adapts as you answer</text>
  <!-- difficulty chip row -->
  <rect x="48" y="215" width="120" height="40" rx="20" fill="${C.primarySoft}"/>
  <text x="108" y="242" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="18" font-weight="700" fill="${C.primary}">Level 3</text>
  <rect x="180" y="215" width="160" height="40" rx="20" fill="${C.soft}"/>
  <text x="260" y="242" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="18" font-weight="600" fill="${C.muted}">Focus mode</text>

  <rect x="48" y="280" width="${W - 96}" height="160" rx="24" fill="${C.dangerBg}"/>
  <text x="80" y="335" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="700" fill="${C.danger}">Needs work</text>
  <text x="80" y="385" font-family="Archivo, system-ui, sans-serif" font-size="28" font-weight="600" fill="${C.ink}">Base equation setup</text>
  <rect x="48" y="470" width="${W - 96}" height="160" rx="24" fill="${C.successBg}"/>
  <text x="80" y="525" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="700" fill="${C.success}">Stronger</text>
  <text x="80" y="575" font-family="Archivo, system-ui, sans-serif" font-size="28" font-weight="600" fill="${C.ink}">Definitions &amp; terms</text>
  <rect x="48" y="660" width="${W - 96}" height="280" rx="28" fill="${C.primary}"/>
  <text x="80" y="740" font-family="Archivo, system-ui, sans-serif" font-size="32" font-weight="700" fill="#fff">New question ready</text>
  <text x="80" y="795" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="#fff">Built from your weak spot —</text>
  <text x="80" y="835" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="#fff">not a random pool.</text>
  <rect x="80" y="875" width="200" height="44" rx="22" fill="#fff"/>
  <text x="180" y="905" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="20" font-weight="700" fill="${C.primary}">Start now</text>
  <text x="48" y="1000" font-family="Archivo, system-ui, sans-serif" font-size="20" font-weight="500" fill="${C.quiet}">Next: units &amp; conversions · 3 min</text>
  </svg>`;
}

function mastery() {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  ${statusBar()}${titleRow("Mastery")}
  <text x="48" y="195" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">This week's loop</text>

  <rect x="48" y="230" width="${W - 96}" height="280" rx="28" fill="${C.primary}"/>
  <text x="80" y="320" font-family="Archivo, system-ui, sans-serif" font-size="40" font-weight="700" fill="#fff">Loop complete</text>
  <text x="80" y="380" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="#fff">Upload → Ask Mee → Practice</text>
  <text x="80" y="420" font-family="Archivo, system-ui, sans-serif" font-size="24" font-weight="500" fill="#fff">→ Feedback → Master</text>
  <text x="80" y="470" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="600" fill="#fff">Ready for tomorrow's lecture</text>

  ${card(48, 560, 300, 160)}
  <text x="80" y="620" font-family="Archivo, system-ui, sans-serif" font-size="36" font-weight="700" fill="${C.ink}">7</text>
  <text x="80" y="665" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">day streak</text>

  ${card(372, 560, 300, 160)}
  <text x="404" y="620" font-family="Archivo, system-ui, sans-serif" font-size="36" font-weight="700" fill="${C.ink}">92%</text>
  <text x="404" y="665" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">recall score</text>

  ${card(48, 760, W - 96, 200)}
  <text x="80" y="830" font-family="Archivo, system-ui, sans-serif" font-size="26" font-weight="700" fill="${C.ink}">Topics mastered</text>
  <text x="80" y="880" font-family="Archivo, system-ui, sans-serif" font-size="22" font-weight="500" fill="${C.muted}">Base equations · Definitions · Units</text>
  <rect x="80" y="910" width="${W - 160}" height="14" rx="7" fill="${C.soft}"/>
  <rect x="80" y="910" width="380" height="14" rx="7" fill="${C.primary}"/>
  </svg>`;
}

/**
 * CTA landscape end-screen (rotZ ≈ +π/2).
 * No fake Dynamic Island / camera cutout in the texture — the real chassis
 * cutout is the only hardware. Content only (logo + type).
 */
async function waitlist() {
  const { readFileSync } = await import("node:fs");
  const LW = H; // 1560
  const LH = W; // 720
  const cx = LW / 2;
  const logoPath = path.resolve(__dirname, "../public/brand/logo-on-light.png");
  const logoB64 = readFileSync(logoPath).toString("base64");
  // Safe inset from physical top (left after +90° bake) so content clears real DI
  const logoSize = 140;
  const logoY = 118;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${LW}" height="${LH}">
  <rect width="100%" height="100%" fill="${C.bg}"/>
  <!-- no status bar / no painted Dynamic Island — real phone hardware owns the cutout -->

  <image href="data:image/png;base64,${logoB64}" x="${cx - logoSize / 2}" y="${logoY}" width="${logoSize}" height="${logoSize}" preserveAspectRatio="xMidYMid meet"/>

  <text x="${cx}" y="360" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="90" font-weight="700" fill="${C.ink}">Your next study</text>
  <text x="${cx}" y="468" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="90" font-weight="700" fill="${C.ink}">session starts here.</text>

  <text x="${cx}" y="555" text-anchor="middle" font-family="Archivo, system-ui, sans-serif" font-size="36" font-weight="500" fill="${C.muted}">Turn what you already study into a loop you keep.</text>
  </svg>`;

  // +90° pairs with scene rotZ = +π/2
  return sharp(Buffer.from(svg))
    .rotate(90)
    .resize(W, H, { fit: "fill" })
    .png()
    .toBuffer();
}

const SCREENS = {
  home,
  upload,
  processing,
  chat,
  cards,
  quiz,
  practice,
  mastery,
  waitlist,
};

async function main() {
  mkdirSync(OUT, { recursive: true });
  for (const [name, fn] of Object.entries(SCREENS)) {
    const result = fn();
    const buf =
      result instanceof Promise
        ? await result
        : await sharp(Buffer.from(result)).png().toBuffer();
    writeFileSync(path.join(OUT, `${name}.png`), buf);
    console.log("screen", name, `${(buf.length / 1024).toFixed(1)}KB`);
  }
  console.log("Wrote light screens to", OUT);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
