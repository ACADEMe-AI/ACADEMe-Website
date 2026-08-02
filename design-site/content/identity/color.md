# Color

**Status:** Approved 2026-07-30  
**Dark:** Scheme B Focus Blue · **Light:** Scheme D Soft Day  
**Toggle:** Settings (and optional system appearance later)

## Dark (B) — default

| Token | Hex | Use |
|-------|-----|-----|
| `bg` | `#0B0C0F` | App background |
| `surface` | `#14161C` | Cards |
| `surface-2` | `#1C1F28` | Sheets / elevated |
| `border` | `#2A2E38` | Hairlines |
| `text` | `#F2F3F5` | Primary text |
| `text-muted` | `#8B93A7` | Secondary |
| `primary` | `#5B6CFF` | CTA, links, brand |
| `primary-press` | `#4A59E6` | Pressed |
| `accent` | `#7CFFB2` | Success spark / highlights |
| `success` | `#3DDC97` | Correct |
| `warning` | `#FFC14D` | Warning |
| `error` | `#FF5C6A` | Error |
| `streak` | `#FF8A4C` | Streak |

## Light (D)

| Token | Hex |
|-------|-----|
| `bg` | `#F6F7FA` |
| `surface` | `#FFFFFF` |
| `surface-2` | `#EEF0F5` |
| `border` | `#D8DCE6` |
| `text` | `#12141A` |
| `text-muted` | `#5C6578` |
| `primary` | `#5B6CFF` (same brand blue) |
| `accent` / `success` | `#0D9F6E` (readable on light) |
| `warning` | `#C98A12` |
| `error` | `#E03E4D` |
| `streak` | `#E86B2F` |

## Rules

- Do not invent new primaries without updating this file  
- Avoid pure `#000` / `#fff` full-bleed without warm near-black/white  
- Avoid generic purple AI gradient heroes unless using approved tokens  
- Mascot asset may use slightly different blue-purple; recolor to tokens when shipping in product UI  
