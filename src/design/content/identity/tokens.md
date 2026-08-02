# Design tokens

## Spacing (4pt base)

`4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48 · 64`  
Default horizontal screen padding: **16**.

## Radius

| Token | px | Use |
|-------|-----|-----|
| sm | 8 | chips |
| md | 12 | buttons |
| lg | 16 | cards |
| xl | 24 | sheets |
| full | 999 | pills |

## Type (app)

| Token | Size / weight | Use |
|-------|---------------|-----|
| display | 32 / 700 | rare celebrations |
| title-1 | 24 / 700 | screen titles |
| title-2 | 20 / 600 | sections |
| body | 16 / 400 | default |
| caption | 13 / 400 | meta |

Prefer system fonts on mobile for performance; marketing may use display faces.

## Motion

| Token | Value |
|-------|--------|
| ease-out-expo | cubic-bezier(0.16, 1, 0.3, 1) |
| duration-1 | 120ms tap |
| duration-2 | 200ms color |
| duration-3 | 320ms screen |
| duration-4 | 480ms chrome celebrate |

Animate **transform + opacity** only for list chrome. Respect reduce-motion.

## Touch

Min tap target **44×44**. Bottom nav **56** + safe area.

## Components (name map)

`AppScaffold` · `AppTabBar` · `PrimaryButton` · `StudyCard` · `ChatBubble` · `PromptChip` · `EmptyState` · `MascotSlot` · `CelebrationOverlay`
