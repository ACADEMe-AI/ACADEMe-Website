# Color Schemes — ACADEMe

**Feel target:** Fast + clean, dark-first study app (like late-night Instagram energy), one sharp accent for CTAs.  
**Current marketing site baseline:** primary `#4b68ff`, secondary `#00d2d3`, bg `#0e0e10`, surface `#1a1c22`.

**Status:** **Approved (2026-07-30)**  
- **Dark mode:** Scheme **B — Focus Blue**  
- **Light mode:** Scheme **D — Soft Day** (paired; settings toggle)  
- Scheme A / C: not chosen (kept for history)

---

## How to pick

Score each 1–5: night study comfort · CTA clarity · college-not-kiddie · distinct from KnowUnity · works with mascot.

---

## Scheme A — Continuity (evolve current site)

Keep brand recognition from today’s website; polish only.

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0E0E10` | App background |
| `surface` | `#1A1C22` | Cards, sheets |
| `surface-2` | `#24272F` | Elevated cards |
| `border` | `#2A2D34` | Dividers |
| `text` | `#F4F5F7` | Primary text |
| `text-muted` | `#9AA3B2` | Secondary |
| `primary` | `#4B68FF` | Main CTA, links |
| `primary-press` | `#3A54E0` | Pressed |
| `secondary` | `#00D2D3` | Charts, secondary accents |
| `success` | `#00C48C` | Correct, complete |
| `warning` | `#F6C90E` | Due soon |
| `error` | `#FF4D4F` | Wrong, errors |
| `coral` | `#FF6E6E` | Streak / energy (sparingly) |

**Pros:** Matches site already; low rebrand cost.  
**Cons:** “Generic AI blue”; may feel like every other edtech app.

---

## Scheme B — Focus Blue (recommended)

Same family as A, but warmer darks, slightly richer blue, less cyan clutter. One hero accent.

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0B0C0F` | Near-black, slight blue |
| `surface` | `#14161C` | Cards |
| `surface-2` | `#1C1F28` | Modals, bottom sheets |
| `border` | `#2A2E38` | Hairlines |
| `text` | `#F2F3F5` | Primary |
| `text-muted` | `#8B93A7` | Secondary |
| `text-faint` | `#5C6578` | Hints |
| `primary` | `#5B6CFF` | Hero CTA (slightly brighter than A) |
| `primary-soft` | `#5B6CFF26` | Chips, selected bg (15% alpha) |
| `primary-press` | `#4A59E6` | Pressed |
| `accent` | `#7CFFB2` | Success spark / mascot highlight (mint, not Duolingo green clone) |
| `success` | `#3DDC97` | Correct answers |
| `warning` | `#FFC14D` | Warnings |
| `error` | `#FF5C6A` | Errors |
| `streak` | `#FF8A4C` | Streak fire (warm, not coral spam) |

**Pros:** Cleaner hierarchy; one blue + mint success = memorable without neon chaos.  
**Cons:** Still blue-led (edtech default) — differentiation comes from type/motion/mascot.

**Why recommended:** Closest to “fast + clean,” works on OLED, pairs with a smart mascot, easy migrate from current site.

---

## Scheme C — Midnight Scholar (editorial premium)

More distinctive: deep ink + amber accent (less “AI SaaS”).

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0A0B0D` | Background |
| `surface` | `#12141A` | Cards |
| `surface-2` | `#1A1D26` | Elevated |
| `border` | `#2C303C` | Borders |
| `text` | `#F7F5F0` | Warm white |
| `text-muted` | `#A39E94` | Muted |
| `primary` | `#E8A54B` | Amber CTA (bold choice) |
| `primary-press` | `#D4923A` | Pressed |
| `secondary` | `#6B8CFF` | Links, secondary actions |
| `success` | `#5ED9A0` | Success |
| `warning` | `#F0C05A` | Warning |
| `error` | `#F07178` | Error |
| `streak` | `#FF6B4A` | Streak |

**Pros:** Stands out vs blue AI apps; feels “study lamp at night.”  
**Cons:** Amber CTAs need careful a11y; further from current site blue.

---

## Scheme D — Soft Day (**approved light mode**)

Paired with Scheme B. User switches in **Settings** (and system appearance optional later).

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#F6F7FA` | App background |
| `surface` | `#FFFFFF` | Cards |
| `surface-2` | `#EEF0F5` | Elevated / sheets |
| `border` | `#D8DCE6` | Dividers |
| `text` | `#12141A` | Primary text |
| `text-muted` | `#5C6578` | Secondary |
| `primary` | `#5B6CFF` | Same as B (brand lock) |
| `primary-press` | `#4A59E6` | Pressed |
| `accent` | `#0D9F6E` | Success spark on light (readable mint alternative) |
| `success` | `#0D9F6E` | Correct |
| `warning` | `#C98A12` | Warning |
| `error` | `#E03E4D` | Error |
| `streak` | `#E86B2F` | Streak |

**Implementation:** `ThemeMode.dark | light | system` → B tokens vs D tokens; primary stays `#5B6CFF`.

---

## Semantic mapping (all schemes)

| Role | Token |
|------|--------|
| Correct answer flash | `success` |
| Incorrect | `error` |
| Primary button | `primary` on `bg` |
| FAB / capture homework | `primary` |
| Tab active | `primary` |
| Tab inactive | `text-muted` |
| Card | `surface` + `border` |
| Bottom sheet | `surface-2` |
| Mascot glow | `primary-soft` or `accent` |

---

## Founder decision

```
[ ] Scheme A — Continuity
[x] Scheme B — Focus Blue   ← APPROVED dark
[ ] Scheme C — Midnight Scholar
[x] Scheme D — Soft Day     ← APPROVED light (with B)

Notes: Dark + light via settings. Mascot TBD (Round 1 rejected).
```

---

## Tailwind / Flutter export (Scheme B — until changed)

### CSS variables (web)
```css
:root {
  --bg: #0B0C0F;
  --surface: #14161C;
  --surface-2: #1C1F28;
  --border: #2A2E38;
  --text: #F2F3F5;
  --text-muted: #8B93A7;
  --primary: #5B6CFF;
  --primary-press: #4A59E6;
  --accent: #7CFFB2;
  --success: #3DDC97;
  --warning: #FFC14D;
  --error: #FF5C6A;
  --streak: #FF8A4C;
}
```

### Flutter `Color` names (suggested)
`AppColors.bg`, `.surface`, `.surface2`, `.border`, `.text`, `.textMuted`, `.primary`, `.primaryPress`, `.accent`, `.success`, `.warning`, `.error`, `.streak`
