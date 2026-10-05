# Type

Four families, all bundled with the app so Android and iOS render the same. This design site serves woff2 copies of the same files from `/fonts/`.

## Families

| Family | Weight | Used for | Line height |
|--------|--------|----------|-------------|
| **Baloo 2** | 800 | Headlines (`AppTextStyles.display`) | 1.1 |
| **Archivo** | 700 | Subheads, card titles, buttons on the site (`AppTextStyles.subhead`) | 1.25 |
| **Noto Sans** | 400, 600 | Body, labels, inputs, everything else | default |
| **ArchivoWordmark** | 600, with a 500 "e" | The ACADEMe wordmark only | 1 |

## Other scripts

Pebby answers in English, हिन्दी, తెలుగు, தமிழ் and বাংলা, so every text style has a fallback chain.

| Style | Fallbacks |
|-------|-----------|
| Baloo 2 | Baloo Tammudu 2 (Telugu), Baloo Thambi 2 (Tamil), Baloo Da 2 (Bengali), then Noto Sans. Baloo 2 covers Devanagari itself |
| Archivo | Latin only. Falls back to Noto Sans in Indian scripts |
| Noto Sans | Noto Sans Devanagari, Noto Sans Telugu, Noto Sans Tamil, Noto Sans Bengali |

## Sizes in the app

| Style | Size | Weight |
|-------|------|--------|
| Sheet title | 24 | Baloo 2 800 |
| Button | 16 | Noto Sans 600 |
| Input | 16 | Noto Sans 400 |
| Label | 14 | Noto Sans 400 |
| Label strong | 14 | Noto Sans 600 |
| Caption | 12 | Noto Sans 400 |

Headline sizes scale with the screen (`ScreenScale`). Every screen must still read at 1.3× text size.

## Rules

- Screens never set a font family or a raw weight. They use `AppTextStyles` and change only size and colour
- Don't put Archivo on Indian-script text. Let it fall back
- ArchivoWordmark is for the word ACADEMe and nothing else
- No other fonts. No system font stacks for headings

## On the web

| CSS family | File |
|------------|------|
| `"Baloo 2"` | `Baloo2-ExtraBold.woff2` |
| `"Archivo"` | `Archivo-Bold.woff2` |
| `"Noto Sans"` | `NotoSans-Regular.woff2`, `NotoSans-SemiBold.woff2` |
| `"ArchivoWordmark"` | `ArchivoWordmark-SemiBold.woff2`, `ArchivoWordmark-Medium.woff2` |
| Indian scripts | `NotoSansDevanagari-SemiBold.woff2` and the Telugu, Tamil, Bengali files |

The marketing website keeps its original type: Archivo from Google Fonts.
