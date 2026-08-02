# ACADEMe Design System (Pre-Build)

**Owner:** Product + design orchestration  

**Canonical for agents:** `../design-site/` — `pnpm dev:design` → http://localhost:5174 · start at `design-site/AGENTS.md`  

**Phases:** 0.4 Design site · 0.5 Marketing · 0.6 Guardrails · 0.7 UI · 0.8 Mascot motion  

**North star:** Fast + clean study companion; KnowUnity-class basics first.

---

## Folder map

```
design/
├── README.md                 ← you are here
├── PHASES-0.6-0.8.md         ← master checklist (nested)
├── agent/
│   ├── GUARDRAILS.md              ← product/design/agent law + principal-engineer stance
│   └── ARCHITECTURE-PRINCIPLES.md ← layered architecture, anti-vibe-code, scale hooks
├── tokens/
│   └── design-tokens.md      ← spacing, type, radius, elevation, motion
├── schemes/
│   ├── color-schemes.md      ← 3 proposed palettes + recommendation
│   └── logo-and-icon.md      ← wordmark + app icon concepts
├── screens/
│   ├── information-architecture.md
│   ├── ui-principles.md       ← how we beat KnowUnity UX
│   └── screen-inventory.md   ← every screen + states
├── mascot/
│   └── mascot-concepts.md    ← concepts for founder pick
├── motion/
│   └── rive-celebrations.md  ← Rive/Lottie, celebration map, Flutter libs
└── references/
    └── competitive-ui.md     ← KnowUnity / Duolingo notes
```

## Decision status

| Decision | Status | Default until you override |
|----------|--------|----------------------------|
| Feel | **Locked** | Fast + clean; light playful moments |
| Primary user | **Locked** | Solo student / college grad |
| Colors | **Approved** | B dark + D light |
| Mascot | **Pebby sheet** | Name sparingly in product UI |
| Design docs | **Phase 0.4** | `design-site/` |
| Platform | **Locked** | Mobile first (Flutter) |
| Color scheme | **Approved** | **B dark + D light** (settings toggle) |
| Mascot | **Pebby sheet** (name sparingly) | Asset: `mascot/mascot_academe.png` · Motion later (0.8) |
| Design docs site | **Phase 0.4** | `design-site/` agent-first |
| Typography | **Proposed** | Display + body pair in tokens |
| Motion stack | **Proposed** | Rive for mascot; Flutter animate for UI |

## How to use this folder

1. Read `PHASES-0.6-0.8.md` for the full nested checklist.  
2. Review color schemes → mark winner in `schemes/color-schemes.md`.  
3. Review mascot concepts → mark winner.  
4. Agents must obey `agent/GUARDRAILS.md` **and** `agent/ARCHITECTURE-PRINCIPLES.md` (principal-engineer / no vibe-code).  
5. Phase 1 app build only after 0.6–0.8 exit criteria pass (or explicit waiver).  
6. Mindset: structured for a durable company — every feature modular, contract-first, operable solo.

## Related product docs

- `usp/academe-product-roadmap.md` — full product phases  
- `usp/knowunity-usp.md` — competitor features  
- `usp/comparison.md` — strategy compare  
