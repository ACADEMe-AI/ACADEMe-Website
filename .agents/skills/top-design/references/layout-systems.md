# Layout Systems Reference

## Table of Contents
1. Grid Frameworks
2. Breakpoint Strategy
3. Compositional Techniques
4. Responsive Patterns
5. Scroll-Based Layouts

---

## 1. Grid Frameworks

### Base Grid System

```css
:root {
  --grid-columns: 12;
  --grid-gutter: clamp(1rem, 2vw, 2rem);
  --grid-margin: clamp(1rem, 5vw, 6rem);
}

.grid {
  display: grid;
  grid-template-columns: repeat(var(--grid-columns), 1fr);
  gap: var(--grid-gutter);
  padding-inline: var(--grid-margin);
  max-width: 1800px;
  margin-inline: auto;
}

.col-1 { grid-column: span 1; }
.col-2 { grid-column: span 2; }
.col-3 { grid-column: span 3; }
.col-4 { grid-column: span 4; }
.col-5 { grid-column: span 5; }
.col-6 { grid-column: span 6; }
.col-7 { grid-column: span 7; }
.col-8 { grid-column: span 8; }
.col-9 { grid-column: span 9; }
.col-10 { grid-column: span 10; }
.col-11 { grid-column: span 11; }
.col-12 { grid-column: span 12; }

.start-1 { grid-column-start: 1; }
.start-2 { grid-column-start: 2; }
.start-3 { grid-column-start: 3; }
.start-4 { grid-column-start: 4; }
.start-5 { grid-column-start: 5; }
.start-6 { grid-column-start: 6; }
```

### Swiss/Modular Grid

```css
.swiss-grid {
  display: grid;
  grid-template-columns: 
    [full-start] var(--grid-margin)
    [content-start] 2fr
    [sidebar-start] 1fr
    [sidebar-end] var(--grid-margin)
    [full-end];
  gap: var(--grid-gutter);
}

.swiss-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header header"
    "nav    main   main"
    "footer footer footer";
  min-height: 100vh;
}
```

### Editorial Grid

```css
.editorial-grid {
  display: grid;
  grid-template-columns:
    [full-start] minmax(var(--grid-margin), 1fr)
    [wide-start] minmax(0, 200px)
    [content-start] min(65ch, 100%)
    [content-end] minmax(0, 200px)
    [wide-end] minmax(var(--grid-margin), 1fr)
    [full-end];
}

.editorial-grid > * { grid-column: content; }
.editorial-grid > .wide { grid-column: wide; }
.editorial-grid > .full { grid-column: full; }
```

---

## 2. Breakpoint Strategy

### Fluid-First Approach

```css
:root {
  --bp-sm: 640px;
  --bp-md: 768px;
  --bp-lg: 1024px;
  --bp-xl: 1280px;
  --bp-2xl: 1536px;
}

@media (min-width: 768px) { }
@media (min-width: 1024px) { }
@media (min-width: 1280px) { }

.card-container {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card { flex-direction: row; }
}
```

### Responsive Grid Columns

```css
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--grid-gutter);
}

@media (min-width: 768px) {
  .responsive-grid { grid-template-columns: repeat(8, 1fr); }
}

@media (min-width: 1024px) {
  .responsive-grid { grid-template-columns: repeat(12, 1fr); }
}

.grid-item { grid-column: span 4; }
@media (min-width: 768px) { .grid-item { grid-column: span 4; } }
@media (min-width: 1024px) { .grid-item { grid-column: span 3; } }
```

---

## 3. Compositional Techniques

### Asymmetric Balance

```css
.asymmetric-hero {
  display: grid;
  grid-template-columns: 2fr 3fr;
  gap: var(--grid-gutter);
  align-items: end;
}

.asymmetric-hero .title {
  grid-column: 1;
  margin-left: -5%;
}

.asymmetric-hero .media {
  grid-column: 2;
  margin-right: calc(var(--grid-margin) * -1);
}
```

### Overlap & Layer

```css
.overlap-composition {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: repeat(6, 1fr);
}

.overlap-composition .image {
  grid-column: 1 / 8;
  grid-row: 1 / 5;
  z-index: 1;
}

.overlap-composition .text-block {
  grid-column: 6 / 13;
  grid-row: 3 / 7;
  z-index: 2;
  background: var(--color-surface);
  padding: 2rem;
}
```

### Bleeding Elements

```css
.bleed-container {
  max-width: 1200px;
  margin-inline: auto;
  padding-inline: var(--grid-margin);
}

.bleed-left {
  margin-left: calc(var(--grid-margin) * -1);
  padding-left: var(--grid-margin);
  margin-left: calc(-50vw + 50%);
  padding-left: calc(50vw - 50%);
}

.bleed-right {
  margin-right: calc(var(--grid-margin) * -1);
  padding-right: var(--grid-margin);
}

.bleed-full {
  width: 100vw;
  margin-left: calc(-50vw + 50%);
}
```

### Diagonal/Angular Layouts

```css
.angled-section {
  position: relative;
  padding: 8rem 0;
}

.angled-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: var(--color-accent);
  clip-path: polygon(0 10%, 100% 0, 100% 90%, 0 100%);
  z-index: -1;
}

.skewed-container {
  transform: skewY(-3deg);
  padding: 6rem 0;
}

.skewed-container > * {
  transform: skewY(3deg);
}
```

---

## 4. Responsive Patterns

### Mobile-First Hero

```css
.hero {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--grid-margin);
  padding-bottom: 15vh;
}

.hero-title {
  font-size: clamp(3rem, 10vw, 12rem);
  line-height: 0.9;
  margin-bottom: 1rem;
}

.hero-media {
  position: absolute;
  inset: 0;
  z-index: -1;
}

@media (min-width: 1024px) {
  .hero {
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: end;
    gap: var(--grid-gutter);
  }
  .hero-title { grid-column: 1 / -1; }
}
```

### Responsive Card Grid

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    minmax(min(100%, 300px), 1fr)
  );
  gap: var(--grid-gutter);
}

.card-grid-controlled {
  display: grid;
  gap: var(--grid-gutter);
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .card-grid-controlled { grid-template-columns: repeat(2, 1fr); }
}
@media (min-width: 1024px) {
  .card-grid-controlled { grid-template-columns: repeat(3, 1fr); }
}
@media (min-width: 1280px) {
  .card-grid-controlled { grid-template-columns: repeat(4, 1fr); }
}
```

### Responsive Typography Layout

```css
.text-columns { columns: 1; }
@media (min-width: 768px) {
  .text-columns {
    columns: 2;
    column-gap: var(--grid-gutter);
  }
}
.text-columns h2,
.text-columns h3,
.text-columns figure { break-inside: avoid; }
```

---

## 5. Scroll-Based Layouts

### Horizontal Scroll Section

```css
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
}

.horizontal-scroll::-webkit-scrollbar { display: none; }

.horizontal-scroll-item {
  flex: 0 0 80vw;
  scroll-snap-align: center;
  padding: 0 2vw;
}

@media (min-width: 1024px) {
  .horizontal-scroll-item { flex: 0 0 40vw; }
}
```

### Sticky Sidebar

```css
.sticky-layout {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: var(--grid-gutter);
  align-items: start;
}

.sticky-sidebar { position: sticky; top: var(--grid-margin); }

.sticky-full {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
}
```

### Pinned Section with Content Scroll

```css
.pinned-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

.pinned-panel {
  position: sticky;
  top: 0;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scrolling-panel section {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: var(--grid-margin);
}
```

---

## Layout Anti-Patterns

```
AVOID THESE:
✗ Fixed pixel widths (use max-width instead)
✗ Magic numbers without explanation
✗ Breaking grid without clear purpose
✗ Horizontal scroll without indication
✗ Content touching viewport edges on mobile
✗ Equal margins everywhere (creates boredom)
✗ Centered everything (lacks visual tension)

PREFER THESE:
✓ Fluid units (%, vw, clamp())
✓ CSS custom properties for spacing
✓ Intentional grid breaks with rationale
✓ Touch-friendly scroll indicators
✓ Consistent edge margins with breathing room
✓ Varied spacing for rhythm
✓ Asymmetric compositions for interest
```
