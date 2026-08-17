# Typography Reference

## Table of Contents
1. Font Pairing Strategies
2. Type Scale Systems
3. CSS Typography Techniques
4. Variable Fonts
5. Font Loading Optimization

---

## 1. Font Pairing Strategies

### The Contrast Principle
Great pairings create tension through contrast in one dimension while maintaining harmony in others.

**Contrast Dimensions:**
- Weight (light vs. bold)
- Width (condensed vs. extended)
- Style (serif vs. sans)
- Era (classic vs. contemporary)
- Mood (serious vs. playful)

### Proven Pairings by Style

**Editorial/Magazine:**
```
Display: Freight Display / Editorial New / Canela
Body: Söhne / Untitled Sans / Graphik
```

**Tech/Modern:**
```
Display: Monument Extended / ABC Favorit Extended / Druk Wide
Body: Inter (only acceptable here) / Suisse Int'l / Neue Montreal
```

**Luxury/Fashion:**
```
Display: Didot / Romana / Noe Display
Body: Apercu / Basis Grotesque / Plain
```

**Brutalist/Raw:**
```
Display: ABC Diatype / Neue Haas Grotesk / Helvetica Now
Body: Same as display (mono-font strategy)
```

**Creative/Playful:**
```
Display: Basement Grotesque / GT Maru / Gambarino
Body: GT Walsheim / Gilroy / Proxima Nova
```

### Free/Google Font Alternatives

**Premium Feel, Zero Cost:**
```
Display Options:
├── Space Grotesk (geometric, techy)
├── Instrument Serif (editorial elegance)
├── Fraunces (variable, characterful)
├── Playfair Display (classic serif)
├── Cormorant Garamond (refined serif)
└── Syne (bold, distinctive)

Body Options:
├── Plus Jakarta Sans (clean, modern)
├── DM Sans (geometric, friendly)
├── Outfit (variable, versatile)
├── Satoshi (via Fontshare - free!)
└── General Sans (via Fontshare)
```

---

## 2. Type Scale Systems

### Fluid Typography (Preferred)

```css
:root {
  --text-base: clamp(1rem, 0.857rem + 0.714vw, 1.25rem);

  --text-sm: clamp(0.8rem, 0.686rem + 0.571vw, 1rem);
  --text-lg: clamp(1.25rem, 1.071rem + 0.893vw, 1.563rem);
  --text-xl: clamp(1.563rem, 1.339rem + 1.116vw, 1.953rem);
  --text-2xl: clamp(1.953rem, 1.674rem + 1.395vw, 2.441rem);
  --text-3xl: clamp(2.441rem, 2.092rem + 1.744vw, 3.052rem);
  --text-4xl: clamp(3.052rem, 2.616rem + 2.18vw, 3.815rem);
  --text-5xl: clamp(3.815rem, 3.27rem + 2.725vw, 4.768rem);

  --text-hero: clamp(4rem, 2rem + 8vw, 12rem);
  --text-display: clamp(3rem, 1.5rem + 6vw, 9rem);
}
```

### Step-Based Scale (Fixed Breakpoints)

```css
:root {
  --step--2: 0.75rem;
  --step--1: 0.875rem;
  --step-0: 1rem;
  --step-1: 1.125rem;
  --step-2: 1.5rem;
  --step-3: 2rem;
  --step-4: 3rem;
  --step-5: 4rem;
  --step-6: 6rem;
  --step-7: 8rem;
}

@media (min-width: 768px) {
  :root {
    --step-4: 4rem;
    --step-5: 6rem;
    --step-6: 9rem;
    --step-7: 12rem;
  }
}

@media (min-width: 1280px) {
  :root {
    --step-5: 8rem;
    --step-6: 12rem;
    --step-7: 16rem;
  }
}
```

---

## 3. CSS Typography Techniques

### Tracking (Letter-Spacing)

```css
.text-hero { letter-spacing: -0.04em; }
.text-display { letter-spacing: -0.03em; }
.text-heading { letter-spacing: -0.02em; }
.text-body { letter-spacing: 0; }
.text-small { letter-spacing: 0.01em; }
.text-caps {
  letter-spacing: 0.1em;
  text-transform: uppercase;
}
```

### Leading (Line-Height)

```css
.leading-hero { line-height: 0.9; }
.leading-display { line-height: 1.0; }
.leading-heading { line-height: 1.1; }
.leading-body { line-height: 1.6; }
.leading-relaxed { line-height: 1.8; }
```

### Advanced Techniques

```css
.hanging-punctuation { hanging-punctuation: first last; }
.tabular-nums { font-variant-numeric: tabular-nums; }
.oldstyle-nums { font-variant-numeric: oldstyle-nums; }
.ligatures { font-variant-ligatures: common-ligatures discretionary-ligatures; }

.hero-text {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.no-orphans { text-wrap: balance; }

.justified {
  text-align: justify;
  hyphens: auto;
  hyphenate-limit-chars: 6 3 2;
}
```

### Text Masking & Gradient Text

```css
.gradient-text {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.image-text {
  background-image: url('/texture.jpg');
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.animated-gradient-text {
  background: linear-gradient(90deg, #ff0000, #00ff00, #0000ff, #ff0000);
  background-size: 300% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: gradient-shift 8s ease infinite;
}

@keyframes gradient-shift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}
```

---

## 4. Variable Fonts

### Implementation

```css
@font-face {
  font-family: 'Inter';
  src: url('/fonts/Inter-Variable.woff2') format('woff2-variations');
  font-weight: 100 900;
  font-display: swap;
}

.light { font-variation-settings: 'wght' 300; }
.regular { font-variation-settings: 'wght' 400; }
.medium { font-variation-settings: 'wght' 500; }
.bold { font-variation-settings: 'wght' 700; }
.black { font-variation-settings: 'wght' 900; }

.hover-weight {
  font-variation-settings: 'wght' 400;
  transition: font-variation-settings 0.3s ease;
}
.hover-weight:hover { font-variation-settings: 'wght' 700; }

.variable-text {
  font-variation-settings:
    'wght' 500,
    'wdth' 100,
    'ital' 0,
    'slnt' 0;
}
```

---

## 5. Font Loading Optimization

### Critical Font Strategy

```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/body.woff2" as="font" type="font/woff2" crossorigin>

<style>
  @font-face {
    font-family: 'Display';
    src: url('/fonts/display.woff2') format('woff2');
    font-weight: 700;
    font-display: swap;
  }
</style>
```

### Font Subsetting

```bash
pyftsubset "Font.ttf" \
  --output-file="Font-subset.woff2" \
  --flavor=woff2 \
  --layout-features="kern,liga,calt" \
  --unicodes="U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD"
```

### FOUT/FOIT Prevention

```css
.fonts-loading { font-family: Georgia, serif; }
.fonts-loaded .body-text { font-family: 'Custom Font', Georgia, serif; }

@font-face {
  font-family: 'Display Font';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;
}

@font-face {
  font-family: 'Body Font';
  src: url('/fonts/body.woff2') format('woff2');
  font-display: optional;
}
```
