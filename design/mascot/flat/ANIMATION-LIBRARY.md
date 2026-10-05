# Mee — Flat mascot + reusable motion system

**Style:** Flat 2D only · sticker energy · big eyes · **no 3D**  
**Inspiration:** [Pinterest App mascots](https://in.pinterest.com/ideas/app-mascots/939882614728/)  
**Colors:** Scheme **B** dark + **D** light · body `#5B6CFF` · ribbon `#7CFFB2`  
**Preview:** `design/preview-flat-mascot.html`

---

## What you get

| Piece | Path | Role |
|-------|------|------|
| Master SVG | `svg/mee.svg` | Source of truth + Rive layer names |
| State catalog | `animations/catalog.json` | IDs used everywhere |
| CSS motion | `animations/css/mee-animations.css` | Live preview now |
| Rive slot | `animations/rive/mee.riv` | Production (build next) |
| Lottie FX | `animations/lottie/` | Check / confetti only — not face |
| Concepts | `concepts/*.jpg` | Exploration stills |

---

## Stack

| Runtime | Format | Where |
|---------|--------|--------|
| **Primary** | Rive `.riv` | Flutter `rive` · Web `@rive-app/canvas` |
| **Preview** | SVG + CSS | Site / this HTML |
| **FX only** | Lottie `.json` | Checkmarks, confetti |

### Flutter (when app builds)
```yaml
dependencies:
  rive: # pin current stable
  # lottie: # optional FX only
```

### Web
```bash
pnpm add @rive-app/canvas
```

---

## States (same IDs forever)

| ID | When |
|----|------|
| `idle` | Default bob |
| `wave` | Empty / welcome |
| `think` | AI streaming |
| `encourage` | Wrong answer |
| `celebrate_small` | Session done |
| `celebrate_big` | Perfect / streak |
| `wow` | High score |
| `sleepy` | Optional late night |

**API idea**
```dart
MeeView(state: MeeState.celebrateSmall, size: 120)
```

```html
<div class="mee-stage" data-state="idle">…svg…</div>
```

---

## Rive production

1. Import / redraw `svg/mee.svg` in [rive.app](https://rive.app)  
2. Layers = `catalog.json` → `riveLayers`  
3. State machine `MeeSM` + triggers = state `id`s  
4. Export → `animations/rive/mee.riv` + Flutter `assets/rive/mee.riv`  
5. One widget only — no one-off drawings  

---

## Rules

- Flat only — no clay / heavy gradient 3D  
- One mint ribbon signature  
- Hide mascot in settings  
- Reduce-motion: skip anim, show static frame  
- Anti-spam: max one big celebrate / 5 min  

---

*Restored / refreshed 2026-07-31 · v2*
