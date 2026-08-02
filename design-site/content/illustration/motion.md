# Motion & celebrations

## Stack

| Primary | Rive (`.riv`) state machine for character |
| Secondary | Lottie for non-character FX (check, confetti) |
| Preview | SVG/CSS only if needed |

## State IDs (stable)

`idle` · `wave` · `think` · `encourage` · `celebrate_small` · `celebrate_big` · `wow` · `sleepy`

## Rules

- Subtle motion in-product (no cinema camera spam)  
- Always skippable  
- Respect reduce-motion  
- Max one big celebration per ~5 minutes  
- Single integration: `MascotSlot` / `MeeView`-style widget  

Deep catalog: `design/mascot/flat/animations/catalog.json` (update name when Rive ships).
