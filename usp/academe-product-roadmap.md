# ACADEMe Product Roadmap

**Status:** Active  
**Updated:** 2026-08-02  
**Audience:** Founders, product, design, engineering, agents  
**North star:** Best daily AI study companion for students and college grads — KnowUnity-class basics first, then growth, then ACADEMe differentiation.

---

## 0. Confirmed strategy (do not drift)

| Principle | Decision |
|-----------|----------|
| **Who first** | Solo **students + college grads** (not schools/teachers day one) |
| **Platform first** | **Mobile app** (iOS + Android). Marketing site = showcase + QR → app |
| **Desktop / computer** | **Later** (e.g. US-only later if still the plan) |
| **Design system** | Separate site: `design-site/` (design.academe) — **agents first** |
| **Mascot** | Character sheet exists; internal name **Pebby** — **use sparingly** in product UI |
| **Colors** | Dark **B**, light **D** |
| **Feel** | Fast + clean; light play |
| **Engineering** | Principal-engineer — modular, not vibe-coded |
| **P1 bar** | KnowUnity-class student study product |
| **P2 bar** | Growth / UGC / creators |
| **P3+** | Differentiate (school OS, desktop, etc.) |
| **Out of scope early** | Teacher/admin OS, desktop launch, fake “all devices” |

---

## Phase map (current)

```
Phase 0.4  Design system site (design.academe / design-site)   ← NOW
    ↓
Phase 0.5  Marketing showcase polish (root Vite site)
    ↓
Phase 0.6  Guardrails (done — maintain in design-site content)
    ↓
Phase 0.7  UI system docs (live in design-site)
    ↓
Phase 0.8  Mascot motion (Rive) from character sheet
    ↓
Phase 1    Mobile student product = KnowUnity-class parity
    ↓
Phase 2    Growth ecosystem
    ↓
Phase 3+   Differentiate
```

| Phase | Deliverable | Done signal |
|-------|-------------|-------------|
| **0.4** | Design system site + content spine | Agents use `design-site/content/`; UI on :5174 |
| **0.5** | Marketing site craft + QR + honest copy | No “all devices”; tokens B/D; QR path |
| **0.6** | Guardrails | Exists + mirrored in design-site |
| **0.7** | UI tokens/IA/screens | In design-site Identity + Product |
| **0.8** | Mascot motion | Idle + celebrate on device/sim |
| **1** | Student app parity | Full study loop on mobile |
| **2** | Growth | Discovered content / creators |
| **3+** | Differentiation | Plan after P2 data |

### Source of truth for builders

| Audience | Start |
|----------|--------|
| **Agents** | `design-site/AGENTS.md` → `content/00-START-HERE.md` |
| **Humans** | `pnpm dev:design` → http://localhost:5174 |
| **Deep research** | `design/` (previews, scrapes, assets) |
| **Checklist** | `design-site/content/product/checklist.md` |

---

## Phase 0.4 — Design system site (NOW)

**Goal:** Duo-like design docs site so agents don’t grep the monorepo for every decision.

**Pattern:** [design.duolingo.com](https://design.duolingo.com/) pillars:

- Identity · Writing · Illustration · Marketing  
- Plus Product · Agents  

**Repo:** `design-site/`  
**Run:** `pnpm dev:design` (port **5174**)  
**Deploy later:** `design.academe…` subdomain  

### Checklist

- [x] Scaffold Vite app  
- [x] Content MD spine  
- [x] AGENTS.md  
- [x] Browse UI  
- [x] Roadmap points to 0.4  
- [ ] Install + verify `pnpm dev:design`  
- [ ] Founder smoke test  
- [ ] Optional production deploy  

---

## Phase 0.5 — Marketing showcase (NEXT)

**Goal:** Award-quality landing that sells mobile app only.

- [ ] Tokens = Scheme B  
- [ ] QR + stores  
- [ ] Remove “all devices”  
- [ ] Features = study pillars  
- [ ] Craft ≥ 8/10  

Details: `design-site/content/marketing/*` and earlier `design/PHASES` craft bar.

---

## Phase 0.6–0.7 — Guardrails & UI system

Mostly complete; **canonical copy lives in design-site content**.  
Legacy: `design/agent/*`, `design/tokens/*`, `design/screens/*`.

---

## Phase 0.8 — Mascot motion

- Asset: `design/mascot/mascot_academe.png`  
- Name: Pebby (internal)  
- States: see illustration/motion in design-site  
- [ ] Rive / WebM  
- [ ] MascotSlot in app  

---

## Phase 1 — Student product parity

Feature inventory F1–F14 (chat, homework photo, upload pipeline, flashcards+SRS, quizzes, summary, notes, practice tests, chat-with-notes, study plan, progress, auth).  

Waves: 1.0 core loop → 1.1 memory → 1.2 exam → 1.3 depth → 1.4 polish.

**Full detail:** keep expanding in design-site or prior long roadmap sections as needed.

---

## Phase 2 — Growth

Public library · publish · creators · share→install · moderation  

---

## Phase 3+ — Differentiate

Plan after P2: school OS, desktop US, multimodal depth, multilingual schools, etc.

---

## Document control

| Version | Date | Change |
|---------|------|--------|
| 1.0 | 2026-07-30 | Initial P0.5–P3 plan |
| 1.1 | 2026-07-30 | Added 0.6–0.8 design phases |
| **2.0** | **2026-08-02** | **Phase 0.4 design system site first; agents-first; Pebby note; checklist redirect** |
