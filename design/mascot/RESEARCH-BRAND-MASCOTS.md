# Brand mascot research → ACADEMe brief

**Sources**

1. [Kartik (@askwhykartik) — production mascot workflow](https://x.com/askwhykartik/article/2069041508121186685)  
2. [Ziggle — Best Brand Mascots 2026](https://ziggle.art/best-brand-mascots)  
3. [Ziggle — Mascots for app founders](https://ziggle.art/mascot-for-app-founders)  
4. [Ziggle — How to create a mascot](https://ziggle.art/how-to-create-a-mascot)

**Status:** Research locked · Mee rejected · animation library kept · new directions in Round 4  

---

## 1. What the best mascots share (Ziggle)

| Pattern | Examples | Takeaway for ACADEMe |
|---------|----------|----------------------|
| **Personality first, not “cute drawing”** | Duo = passive-aggressive; Gecko = witty | Define 3–5 traits + sample voice lines *before* art |
| **Simple silhouette** | Snoo, Duo, Bunny | Must read at 64px / favicon |
| **Signature feature (one)** | Duo brows, Snoo antenna, Freddie cap | One iconic read |
| **Strategic placement** | Freddie @ send; Wumpus @ empty/error | Put character at **anxiety peaks**, not every screen |
| **Animated, subtle** | Duo, Wumpus, Freddie | Motion = personality; not cinematic camera spam |
| **Everywhere consistently** | Duo in product + social | One character, many states |
| **Caution** | Clippy | Never interrupt; always dismissible |

**Minimum viable mascot (Ziggle):**  
*distinct silhouette + one signature gesture + expressive motion.*

---

## 2. Kartik’s production workflow (what we adopt)

| Step | His rule | Our rule |
|------|----------|----------|
| 0 | **Personality before Figma** | Same — §3 below |
| 1 | One mascot on **plain white** = source of truth | One master still, white bg |
| 2 | Poses: wave, point, write, celebrate, think… | Same IDs as `animations/catalog.json` |
| 3 | Validate on **onboarding mocks** first | Don’t design full app around unvalidated char |
| 4 | Mascot **not on every screen** | Onboarding, empty, progress, achievements, milestones only |
| 5 | Animate **separately** from UI | UI real (Flutter); mascot = asset |
| 6 | **Subtle** motion only | No zoom/pan drama in-product |
| 7 | Export loops as separate assets | Our library: Rive *or* transparent WebM/MP4 per state |
| 8 | One style forever | No new style per screen |

**His tool chain (reference):** ChatGPT art → Higgsfield anim → MP4 → Flutter widget.  
**Ours (already planned):** master still → Rive state machine (preferred) *and/or* transparent video loops; catalog.json state IDs.

**Note from replies:** pure MP4 can be heavy / dark-mode pain without alpha. Prefer **transparent WebM** or **Rive** for product (Ziggle agrees). Keep library flexible.

---

## 3. ACADEMe personality brief (fill art from this)

| Field | Decision |
|-------|----------|
| **Product job** | Daily AI study companion — homework → understand → practice → exam |
| **User** | Student / college grad — peer, not child |
| **Tone we want** | Sharp, encouraging, calm under exam stress; slightly witty |
| **Tone we refuse** | Duo-style guilt spam; Clippy interruptions; baby talk |
| **3–5 traits** | Patient · sharp · supportive · slightly smug when you win · never shaming |
| **Signature product moment (Freddie rule)** | **Practice test / exam session complete** + first upload success |
| **Wumpus moments** | Empty library, AI thinking, error “couldn’t read photo” |
| **Metaphor of benefit** | *Clarity / progress / showing up* — character *is* the value (Energizer lesson) |
| **Palette** | Scheme B body/accent · works on D light |
| **Style** | Flat or soft-flat preferred; simple shapes; max ~3 colors |

### Voice samples (mascot, not marketing)

| Situation | Line (≤8 words) |
|-----------|-----------------|
| Win | “Nailed it.” |
| Miss | “Almost — one more try.” |
| Empty library | “Drop notes. I’ll help.” |
| AI thinking | “On it…” |
| Streak | “Still here. Let’s go.” |

---

## 4. Placement map (less is more)

| Surface | Mascot? | State |
|---------|---------|--------|
| Onboarding | Yes | wave |
| Home empty / library empty | Yes | wave / encourage |
| AI streaming | Optional small | think |
| Flashcard/quiz complete | Yes | celebrate_small |
| Practice test complete | **Hero** | celebrate_big |
| Wrong answer | Subtle | encourage |
| Settings | Hide toggle | — |
| Every scroll of content | **No** | — |
| Paywall | Optional later | — |

---

## 5. Why past rounds failed (honest)

| Round | Problem |
|-------|---------|
| R1 SVG spark/pen/robot | Generic “AI mascot kit,” weak personality |
| R2 object art | Concept sketches, not a *character with a job* |
| R3 Mee | Flat ok, but blob+ribbon felt stock / low emotional hook |

**Fix:** personality + metaphor + signature feature + placement first; then art.

---

## 6. Animation library (unchanged — good)

Keep `design/mascot/flat/ANIMATION-LIBRARY.md` + `catalog.json`.

**Extend slightly:** allow each state as:

- `mee.riv` (or final name) **or**
- `assets/mascot/{state}.webm` transparent  

Same state IDs either way.

---

## 7. Round 4 directions (research-backed)

See `ROUND-4-DIRECTIONS.md` + `preview-mascot-round4.html`.

Each direction answers:

1. Personality sentence  
2. Metaphor / product benefit  
3. Signature feature  
4. Why not Duo/KnowUnity fox  
5. Best placement  
