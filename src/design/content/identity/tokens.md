# Tokens

Fonts are on the [Type](/design/foundations/type) page and colours on [Color](/design/foundations/color). This page covers the rest.

## Radius (`AppRadius`)

| Token | px | Use |
|-------|----|-----|
| sm | 8 | Chips, small tags |
| md | 12 | Inputs, small cards |
| lg | 16 | Buttons, keycaps, cards |
| xl | 24 | Sheets, big cards |
| full | 999 | Pills, the nav pill |

## Spacing

All spacing sits on a 4 pt grid: 4 · 8 · 12 · 16 · 20 · 24 · 32 · 40 · 48. Sizes that depend on the screen come from `ScreenScale`. A test in the app checks both.

## Keycap (`AppKeycap`)

The app's buttons look like keys on a keyboard: a coloured face, a dark border and a thick bottom edge that squashes when you press.

| Token | Value |
|-------|-------|
| Border | 2 px, `keycapEdge` (#12141A in Light) |
| Radius | 16 |
| Depth, buttons | 6 px |
| Depth, options | 4.5 px |
| Press | 90 ms, the face drops onto the edge |
| Disabled | 45% opacity |

The marketing website keeps its own white pill buttons; the keycap is the app's.

## Components

Named as in `lib/ui/core/ui/`. Use these names in docs, tickets and designs.

| Component | What it is |
|-----------|------------|
| `AppButton` | The main keycap button |
| `Keycap` | The pressable shape under buttons and options |
| `OptionTile` | A keycap choice; turns amber when selected |
| `ClassDial` | The Class 6 to 12 dial in setup |
| `BoardPicker` | CBSE / ICSE / ISC choice |
| `Pebby` | The animated mascot (Rive) |
| `PebbyPeek` | Pebby peeking over the edge of a sheet |
| `AcademeWordmark` | The ACADEMe word in ArchivoWordmark |
| `BrandMark` | The cube |
| `Celebration` | One-shot bursts, pop-ins, count-ups and XP fly-ups |
| `AppTextField`, `AppPasswordField` | Inputs |
| `PageDots`, `NumberWheel`, `SubjectIcons` | Smaller shared pieces |

## Motion

- Short and physical: presses are 90 ms, most transitions 200 to 400 ms
- Celebrate real wins only: lesson done, quick check right, test passed
- Respect reduce motion: when the phone asks for less animation, celebrations and swipes skip straight to the end
