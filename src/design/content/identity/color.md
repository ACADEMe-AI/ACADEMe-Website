# Color

Every value below is copied from `lib/ui/core/themes/app_theme.dart`. Screens in the app never use a hex literal; they read these names. The website and this site use the same values.

The app has both Light and Dark (Me → Appearance). academe.cc is dark. Phone screens on the site are captured in Light.

## Brand

| Name | Hex | Use |
|------|-----|-----|
| `primary` | #564CF1 | Buttons, links, the cube's top, focus |
| `primaryPressed` | #4A59E6 | Pressed primary |
| `onPrimary` | #FFFFFF | Text and icons on primary |
| `selected` | #F5A800 | The chosen option, XP |
| `selectedInk` | #8A6100 | Text on amber tints |
| `keycapEdge` | #12141A | Border and bottom edge of keycap buttons in Light |

## Status

| Name | Hex | Use |
|------|-----|-----|
| `accent` | #7CFFB2 | Small highlights on dark |
| `success` | #3DDC97 | Right answer, done (dark) |
| `lightSuccess` | #0D9F6E | Right answer, done (light) |
| `warning` | #FFC14D | Careful, limit close |
| `error` | #FF5C6A | Wrong answer, errors |
| `errorInk` | #B42332 | Error text on light |
| `streak` | #FF8A4C | Streak flame |

## Pebby

| Name | Hex |
|------|-----|
| `pebbyLight` | #A2A4FB |
| `pebbyMid` | #8B8CF5 |
| `pebbyDeep` | #6E71D6 |

Pebby's body is always these three, light at the top to deep at the bottom. Never recolour Pebby to match a section.

## Dark

| Name | Hex |
|------|-----|
| `background` | #0B0C0F |
| `surface` | #14161C |
| `surfaceRaised` | #1C1F28 |
| `border` | #2A2E38 |
| `text` | #F2F3F5 |
| `textMuted` | #8B93A7 |
| `textFaint` | #5C6578 |
| `splash` | #171726 |

This is the website's base. Inside the app's Dark appearance, cards and sheets use a slightly purple set: surface #171726, raised #24243C, border #3A3B5E, text #F2F3F8, muted #A3A6C4, keycap edge #45476F.

## Light

| Name | Hex |
|------|-----|
| `lightBackground` | #F6F7FA |
| `lightSurface` | #FFFFFF |
| `lightSurfaceRaised` | #EEF0F5 |
| `lightBorder` | #D8DCE6 |
| `lightText` | #12141A |
| `lightTextMuted` | #5C6578 |

## Tints

Soft fills for subject cards, chips and option tiles. Subjects cycle through the first five.

| Name | Light | Dark |
|------|-------|------|
| lavender | #E7E6FF | #2F2D63 |
| amber | #FFE7A3 | #4A3B12 |
| mint | #D9F4EA | #14402F |
| pink | #FFE0EC | #4C1F36 |
| sky | #DCEBFF | #1B3354 |
| cream | #FFF9E8 | #34301F |
| rose | #FFE3E0 | #4C2127 |

## Rules

- One primary action per screen. Amber means "selected" or XP, nothing else
- Text on primary is white. Text on tints is `lightText`, or `selectedInk` on amber
- Don't add new colours. If something needs one, it goes in `app_theme.dart` first
