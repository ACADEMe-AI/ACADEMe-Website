# Agent Guardrails — ACADEMe (Phase 0.6+)

**Purpose:** Any human or AI agent working on ACADEMe design, website, or app must follow these rules without re-asking the founder for basics.

**Mindset (non-negotiable):** Think like a **principal software engineer** building a durable product company — structured, intentional, scalable. **Not** a vibe-coded demo. Solo/tiny team is *more* reason for discipline, not less.

**Deep architecture law:** [`ARCHITECTURE-PRINCIPLES.md`](./ARCHITECTURE-PRINCIPLES.md) — layered modules, domain spine, anti-vibe rules, quality gates. **Read before writing app code.**

---

## 0. Principal engineer stance (always on)

| Rule | Detail |
|------|--------|
| P0 | **Every feature has a home** — module path, screen ID, domain entity, checklist item |
| P1 | **Boundaries over speed theater** — UI ≠ network ≠ domain; no god screens |
| P2 | **Contract before chrome** — types/API before pixel polish when building product |
| P3 | **Design for 10×, build for now** — hooks for P2/P3 (visibility, roles) without building school OS early |
| P4 | **Operable alone** — typed errors, logs, no silent catch |
| P5 | **One pattern app-wide** — one state management, one theme system, one AI gateway style |
| P6 | **Trust is product** — student materials durable, export/delete paths, no “lost after update” |
| P7 | **Document reversible cost** — ADRs for stack choices; checklists for phase work |
| P8 | **Refuse hackathon structure** — if it only works as a dump of generated code, restructure first |
| P9 | **Billion-dollar bar (practical)** — trust, leverage, optionality, repeatable quality — not buzzwords in README only |

If a task conflicts with §0 or `ARCHITECTURE-PRINCIPLES.md`, **stop and fix structure** rather than “just ship the screen.”

---

## 1. Product truth (immutable unless founder overrides in writing)

| Rule | Detail |
|------|--------|
| G1 | **Solo students / college grads first** — not schools/teachers as primary UX |
| G2 | **Mobile-first** (Flutter). Website = showcase + QR → app |
| G3 | **Desktop / computer = later** — never market “all devices” until it exists |
| G4 | **Phase order:** 0.5 site → 0.6 guardrails → 0.7 UI system → 0.8 mascot/motion → 1 product parity → 2 growth → 3+ differentiate |
| G5 | **Phase 1 goal** = KnowUnity student **feature parity**, ACADEMe brand, **superior UI craft** |
| G6 | **Feel** = fast + clean (IG/TikTok smoothness) + light playful celebrations — not full Duolingo cartoon UI |
| G7 | Teacher / admin / class LMS / live class = **Phase 3+ only** unless founder reopens |

---

## 2. Design authority

| Rule | Detail |
|------|--------|
| D1 | Source of truth for UI: `design/` folder, not ad-hoc component choices |
| D2 | Colors: only tokens from approved scheme in `design/schemes/color-schemes.md` (status = **Approved**) |
| D3 | Until a scheme is **Approved**, use **Recommended** scheme for all mocks/code |
| D4 | Spacing, type, radius, motion: `design/tokens/design-tokens.md` only |
| D5 | New screens must match `design/screens/screen-inventory.md` or update that file first |
| D6 | Mascot appears only per `design/mascot/` + `design/motion/` rules — no random stickers |
| D7 | Prefer **one signature moment** over many mediocre animations |

---

## 3. Quality bar vs KnowUnity

| Rule | Detail |
|------|--------|
| Q1 | Feature list may mirror KnowUnity; **visual and interaction quality must exceed** |
| Q2 | Target: zero-think navigation (thumb zone, ≤3 taps to core action) |
| Q3 | Every primary action under 100ms perceived feedback (haptic/opacity/scale) |
| Q4 | Empty, loading, error, success states are **designed**, not default Flutter |
| Q5 | No Inter-as-hero on marketing; app may use system-adjacent UI font for performance — see tokens |
| Q6 | No pure `#000` / `#fff` full-bleed without warm near-black/near-white from tokens |
| Q7 | No generic purple-blue AI gradient hero unless it matches approved brand tokens |

---

## 4. Engineering constraints (Flutter)

| Rule | Detail |
|------|--------|
| E1 | Stack: Flutter + existing ACADEMe backend patterns where useful; don’t invent parallel backends for P1 |
| E2 | Motion: **Rive** for mascot/celebrations; Flutter `AnimationController` / implicit animations for chrome |
| E3 | Allowed libs (install when app work starts): see `design/motion/rive-celebrations.md` § Libraries |
| E4 | No heavy Lottie packs for mascot if Rive is chosen — one primary runtime |
| E5 | Respect `prefers-reduced-motion` / accessibility reduce-motion equivalent on mobile |
| E6 | 60fps on mid-tier Android is a requirement for celebrations |
| E7 | Do not ship Phase 1 blocked on perfect mascot — use placeholder states if needed, but slots exist |
| E8 | **Architecture:** feature modules + `core/` per `ARCHITECTURE-PRINCIPLES.md` — no exceptions for “small feature” |
| E9 | **Domain spine:** Material → artifacts → sessions; don’t invent parallel content models per screen |
| E10 | **AI:** single gateway/facade; validate model output; log cost/latency |
| E11 | **State:** one global approach (document choice in ADR); explicit `idle/loading/data/error` |
| E12 | **Lists:** pagination-ready; **uploads/generate:** retry-safe |
| E13 | **Dependencies:** every package justified; pin versions |

---

## 5. Agent behavior (orchestration)

| Rule | Detail |
|------|--------|
| A1 | Prefer **updating design docs** over inventing features mid-chat |
| A2 | Do **not** ask the founder questions already answered in roadmap/guardrails |
| A3 | Only escalate when: legal/safety risk, spend money, delete data, or two approved directions conflict |
| A4 | Parallel subagents OK for research; merge into `design/references/` with sources |
| A5 | Every design change: update checklist in `design/PHASES-0.6-0.8.md` |
| A6 | Never claim “better than KnowUnity” without a **specific** criterion (e.g. fewer taps, clearer hierarchy) |
| A7 | Copy competitor **patterns**, not trademarks, assets, or copy-paste brand names in UI |
| A8 | Academic integrity: solvers explain steps; don’t brand as “cheat app” |

---

## 6. Content & tone

| Rule | Detail |
|------|--------|
| T1 | Voice: sharp, encouraging, peer-like — not corporate LMS, not baby talk |
| T2 | Celebration copy: short (≤6 words). No cringe. |
| T3 | Errors: human + actionable (“Couldn’t read that photo — try better light”) |
| T4 | Multi-language ready: no hard-coded English-only layouts that break at 1.3× string length |

---

## 7. Definition of done for agent tasks

An agent task is done only when:

1. Files in `design/` or app match the request  
2. Checklists updated (boxes checked or deferred with reason)  
3. No new colors/fonts outside tokens  
4. No teacher/admin scope creep  
5. **If code:** layer boundaries respected; errors handled; no god-file dump  
6. **If code:** feature lives under module template (or ADR explains exception)  
7. **If API/types:** contracts consistent and additive-safe  

---

## 8. Forbidden without explicit founder OK

- Changing primary market (e.g. schools-first)  
- Adding desktop app to launch scope  
- Replacing recommended color scheme after approval without a short written why  
- Open-sourcing or republishing private product strategy docs  
- Real user data in design mocks  
- Introducing a second state-management or navigation framework “just for one feature”  
- Skipping domain/repository layers for a production path  

---

## 9. Quick self-check (before “done”)

1. Would a principal engineer approve the structure?  
2. Can we grow this feature for 2 years without a rewrite?  
3. Does this look like a company codebase or a vibe-coded prototype?  

If (3) = prototype → restructure, then ship.

---

*Phase 0.6 deliverable. Version 1.1 — 2026-07-30 (principal-engineer + architecture law)*
