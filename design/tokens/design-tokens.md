# Design Tokens — ACADEMe

**Pairs with:** approved color scheme in `schemes/color-schemes.md`  
**Platform:** Flutter app primary; web marketing mirrors where useful.

---

## 1. Spacing scale (4pt base)

| Token | px | Use |
|-------|-----|-----|
| `space-0` | 0 | — |
| `space-1` | 4 | Icon gaps, tight chips |
| `space-2` | 8 | Inline padding |
| `space-3` | 12 | Compact list rows |
| `space-4` | 16 | Default screen padding (horizontal) |
| `space-5` | 20 | Card inner |
| `space-6` | 24 | Section gaps |
| `space-8` | 32 | Major blocks |
| `space-10` | 40 | Hero breathing |
| `space-12` | 48 | Bottom safe + tab clearance helpers |
| `space-16` | 64 | Empty state top |

**Screen horizontal padding:** `16` mobile default.  
**Max content width (tablet):** `600` for study surfaces.

---

## 2. Radius

| Token | px | Use |
|-------|-----|-----|
| `radius-sm` | 8 | Chips, small inputs |
| `radius-md` | 12 | Buttons, list tiles |
| `radius-lg` | 16 | Cards |
| `radius-xl` | 24 | Bottom sheets, large cards |
| `radius-full` | 999 | Pills, avatars, FAB |

---

## 3. Typography

### Philosophy
- App UI: **highly legible**, system-friendly (performance).  
- Marketing: **display drama** (see website Phase 0.5).  
- College tone: confident, not comic.

### App type ramp

| Token | Size / weight | Use |
|-------|---------------|-----|
| `display` | 32 / 700 | Rare: celebration title |
| `title-1` | 24 / 700 | Screen titles |
| `title-2` | 20 / 600 | Section headers |
| `title-3` | 17 / 600 | Card titles |
| `body` | 16 / 400 | Default reading |
| `body-em` | 16 / 600 | Emphasized body |
| `callout` | 15 / 400 | Secondary paragraphs |
| `caption` | 13 / 400 | Meta, timestamps |
| `micro` | 11 / 600 | Badges, overlines (ALL CAPS sparingly) |

**Font recommendation**

| Context | Family |
|---------|--------|
| Flutter iOS | SF Pro (system) |
| Flutter Android | system / **Plus Jakarta Sans** or **DM Sans** if custom |
| Marketing web | Distinct display (e.g. **Satoshi** / **Geist**) + clean body — avoid Inter hero |

**Line height:** body 1.45–1.55; titles 1.15–1.25.  
**Tracking:** titles −0.02em; micro +0.04em.

---

## 4. Elevation / surfaces

Dark UI = **border + brightness**, not heavy Material shadows.

| Level | Treatment |
|-------|-----------|
| 0 | `bg` |
| 1 | `surface` + 1px `border` |
| 2 | `surface-2` + border; optional soft shadow `0 8 24 rgba(0,0,0,0.35)` |
| Overlay | Scrim `rgba(0,0,0,0.55)` |

---

## 5. Motion tokens

| Token | Value | Use |
|-------|-------|-----|
| `ease-out-expo` | cubic-bezier(0.16, 1, 0.3, 1) | Most entrances |
| `ease-in-out` | cubic-bezier(0.87, 0, 0.13, 1) | Sheet expand |
| `duration-1` | 120ms | Tap feedback |
| `duration-2` | 200ms | Color/opacity |
| `duration-3` | 320ms | Screen transitions |
| `duration-4` | 480ms | Celebrations (UI chrome) |
| `duration-rive` | 0.8–1.5s | Mascot clips (asset-defined) |

**Rules**

- Animate **transform + opacity** only for lists.  
- Stagger list items ≤ 40ms.  
- Reduce-motion: instant cut + static mascot frame.

---

## 6. Touch & layout chrome

| Token | Value |
|-------|-------|
| Min tap target | 44×44 |
| Bottom nav height | 56 + safe area |
| Top app bar | 56 |
| FAB size | 56 |
| Card min height (study) | 72 list / 120 media |
| Thumb zone primary CTA | bottom 25% of screen |

---

## 7. Iconography

- Single family: **Lucide** or **Phosphor** (pick one; don’t mix).  
- Stroke 1.5–2px.  
- Active tab: filled or primary color; inactive: muted.  
- No emoji as primary UI icons (celebrations may use Rive only).

---

## 8. Haptics (mobile)

| Event | Haptic |
|-------|--------|
| Light tap (tab, chip) | lightImpact |
| Correct answer | mediumImpact |
| Wrong answer | lightError / soft |
| Celebration | success notification |
| Capture shutter | mediumImpact |

---

## 9. Component primitives (name map)

Agents and engineers use these names:

`AppScaffold` · `AppTopBar` · `AppTabBar` · `PrimaryButton` · `SecondaryButton` · `GhostButton` · `StudyCard` · `MaterialCard` · `ChatBubble` · `PromptChip` · `ProgressRing` · `ScoreBadge` · `EmptyState` · `ErrorState` · `LoadingSkeleton` · `BottomSheet` · `MascotSlot` · `CelebrationOverlay`

Specs live in `screens/screen-inventory.md` and future Figma (if added).
