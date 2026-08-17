# Animation Patterns Reference

Copy-paste ready animation patterns for premium web experiences.

## Table of Contents
1. Scroll Reveals
2. Page Load Choreography
3. Page Transitions
4. Hover Interactions
5. Cursor Effects
6. Performance Guidelines

---

## 1. Scroll Reveals

### Fade Up Reveal (Universal)

```css
[data-reveal] {
  opacity: 0;
  transform: translateY(2rem);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

[data-reveal].is-visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
```

### Staggered Children Reveal

```css
.stagger-parent > * {
  opacity: 0;
  transform: translateY(1.5rem);
  transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}

.stagger-parent.is-visible > *:nth-child(1) { transition-delay: 0ms; }
.stagger-parent.is-visible > *:nth-child(2) { transition-delay: 100ms; }
.stagger-parent.is-visible > *:nth-child(3) { transition-delay: 200ms; }
.stagger-parent.is-visible > *:nth-child(4) { transition-delay: 300ms; }
.stagger-parent.is-visible > *:nth-child(5) { transition-delay: 400ms; }
.stagger-parent.is-visible > *:nth-child(6) { transition-delay: 500ms; }

.stagger-parent.is-visible > * {
  opacity: 1;
  transform: translateY(0);
}
```

### Clip-Path Image Reveal

```css
.clip-reveal {
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.clip-reveal.is-revealed {
  clip-path: inset(0 0 0 0);
}

/* Mask alternative for more control */
.mask-reveal {
  mask-image: linear-gradient(to top, transparent 0%, black 100%);
  mask-size: 100% 200%;
  mask-position: bottom;
  transition: mask-position 1.2s cubic-bezier(0.16, 1, 0.3, 1);
}

.mask-reveal.is-revealed {
  mask-position: top;
}
```

### Scale Reveal

```css
.scale-reveal {
  opacity: 0;
  transform: scale(0.9);
  filter: blur(10px);
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}

.scale-reveal.is-visible {
  opacity: 1;
  transform: scale(1);
  filter: blur(0);
}
```

---

## 2. Page Load Choreography

### Pre-Animation State

```css
/* Default: all animation-ready elements start hidden */
.page-load [data-load] {
  opacity: 0;
  transform: translateY(2rem);
}

/* Loaded state applied by JS */
.page-load.is-loaded [data-load] {
  transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Choreography Timeline

```javascript
// Canonical load reveal timeline
const loadTimeline = [
  // 1. Structural foundation (0-200ms)
  { selector: '[data-load="hero"]', delay: 200 },
  
  // 2. Primary content (400-800ms)
  { selector: '[data-load="title"]', delay: 400 },
  { selector: '[data-load="subtitle"]', delay: 600 },
  
  // 3. Navigation (600-900ms)
  { selector: '[data-load="nav"]', delay: 700 },
  { selector: '[data-load="cta"]', delay: 800 },
  
  // 4. Supporting elements (1000-1400ms)
  { selector: '[data-load="media"]', delay: 1000 },
  { selector: '[data-load="content"]', delay: 1200 },
];

function triggerLoadAnimation() {
  const container = document.querySelector('.page-load');
  container.classList.add('is-loaded');
  
  loadTimeline.forEach(({ selector, delay }) => {
    const elements = container.querySelectorAll(selector);
    elements.forEach((el, i) => {
      setTimeout(() => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, delay + (i * 100)); // Additional stagger within group
    });
  });
}

// Trigger on load (or after hero image loads)
window.addEventListener('load', () => {
  setTimeout(triggerLoadAnimation, 100);
});
```

### Loading Screen with Progress

```html
<div class="loader" id="loader">
  <div class="loader-progress"></div>
  <div class="loader-label">Loading experience</div>
</div>
```

```css
.loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: var(--color-dark, #0a0a0a);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: opacity 0.6s ease, visibility 0.6s ease;
}

.loader.is-hidden {
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.loader-progress {
  width: 40px;
  height: 2px;
  background: rgba(255,255,255,0.1);
  border-radius: 2px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.loader-progress::after {
  content: '';
  display: block;
  width: 40%;
  height: 100%;
  background: var(--color-accent, #fff);
  border-radius: 2px;
  animation: loader-progress 1.5s ease infinite;
}

@keyframes loader-progress {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(350%); }
}

.loader-label {
  font-family: monospace;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.4);
}
```

---

## 3. Page Transitions

### Simple Crossfade

```css
.page {
  opacity: 0;
  transition: opacity 0.4s ease;
}

.page.is-active {
  opacity: 1;
}

/* Exiting page */
.page.is-leaving {
  opacity: 0;
  transition: opacity 0.2s ease;
}
```

```javascript
// Crossfade page transition
async function navigateTo(url) {
  const current = document.querySelector('.page.is-active');
  const exit = current.animate([
    { opacity: 1 },
    { opacity: 0 }
  ], { duration: 200, easing: 'ease' });
  
  await exit.finished;
  
  // Update content
  const content = await fetch(url);
  // ... swap DOM
  
  const next = document.querySelector('.page');
  const enter = next.animate([
    { opacity: 0 },
    { opacity: 1 }
  ], { duration: 400, easing: 'ease' });
  
  next.classList.add('is-active');
}
```

### Morph Transition

```css
.morph-transition {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: var(--color-dark);
  transform: translate(-50%, -50%);
  z-index: 100;
  pointer-events: none;
}

.morph-transition.is-active {
  animation: morph-reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes morph-reveal {
  0% {
    width: 0;
    height: 0;
    border-radius: 50%;
  }
  50% {
    width: 300vw;
    height: 300vw;
    border-radius: 50%;
  }
  100% {
    width: 300vw;
    height: 300vw;
    border-radius: 0;
  }
}
```

---

## 4. Hover Interactions

### Magnetic Button

```html
<button class="magnetic-btn" data-magnetic>
  <span class="magnetic-btn__label">Explore</span>
</button>
```

```css
.magnetic-btn {
  position: relative;
  padding: 1rem 2.5rem;
  background: transparent;
  border: 1px solid currentColor;
  cursor: pointer;
  overflow: hidden;
  transition: color 0.3s ease;
}

.magnetic-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: currentColor;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 0;
}

.magnetic-btn:hover::before {
  transform: scaleY(1);
}

.magnetic-btn:hover {
  color: var(--color-dark, #0a0a0a);
}

.magnetic-btn__label {
  position: relative;
  z-index: 1;
  mix-blend-mode: difference;
}
```

```javascript
// Magnetic tracking effect
document.querySelectorAll('[data-magnetic]').forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  });
  
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'translate(0, 0)';
    btn.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
    setTimeout(() => btn.style.transition = '', 400);
  });
});
```

### Image Hover Reveal

```css
.image-hover {
  overflow: hidden;
  cursor: pointer;
}

.image-hover img {
  transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1),
              filter 0.8s ease;
}

.image-hover:hover img {
  transform: scale(1.05);
  filter: brightness(1.05);
}

/* With overlay */
.image-hover::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-accent);
  opacity: 0;
  mix-blend-mode: overlay;
  transition: opacity 0.4s ease;
}

.image-hover:hover::after {
  opacity: 0.2;
}
```

### Link Hover Effects

```css
/* Underline slide */
.link-slide {
  text-decoration: none;
  position: relative;
}

.link-slide::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.link-slide:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

/* Weight shift (variable font) */
.link-weight {
  font-variation-settings: 'wght' 400;
  transition: font-variation-settings 0.3s ease;
}

.link-weight:hover {
  font-variation-settings: 'wght' 700;
}
```

---

## 5. Cursor Effects

### Custom Cursor (User-Approved Only)

IMPORTANT: Only implement custom cursors when the user explicitly requests or approves one.

```html
<div class="cursor" id="cursor">
  <div class="cursor__dot"></div>
  <div class="cursor__ring"></div>
</div>
```

```css
/* Only apply cursor:none when custom cursor is active */
.cursor-enabled {
  cursor: none;
}

.cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  display: none;
}

.cursor.is-active {
  display: block;
}

.cursor__dot {
  position: absolute;
  width: 6px;
  height: 6px;
  background: var(--color-accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.2s, height 0.2s, background 0.2s;
}

.cursor__ring {
  position: absolute;
  width: 30px;
  height: 30px;
  border: 1px solid var(--color-accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: width 0.3s ease, height 0.3s ease, border-color 0.3s ease;
}

/* Hover variants */
.cursor--hover .cursor__ring {
  width: 50px;
  height: 50px;
  border-color: rgba(255,255,255,0.3);
}

.cursor--click .cursor__dot {
  width: 10px;
  height: 10px;
}
```

```javascript
let cursorEnabled = false;

function initCursor() {
  if (cursorEnabled) return;
  
  const cursor = document.getElementById('cursor');
  const dot = cursor.querySelector('.cursor__dot');
  const ring = cursor.querySelector('.cursor__ring');
  
  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;
  
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top = mouseY + 'px';
  });
  
  // Ring follows with delay
  function animate() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';
    requestAnimationFrame(animate);
  }
  
  animate();
  
  // Hover detection for interactive elements
  document.querySelectorAll('a, button, [data-cursor-hover]').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('cursor--hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('cursor--hover'));
  });
  
  cursorEnabled = true;
}

// Activate when user confirms
// initCursor();
```

### Selection Color

```css
::selection {
  background: var(--color-accent, #ff4d00);
  color: var(--color-light, #fafaf9);
}

::-moz-selection {
  background: var(--color-accent, #ff4d00);
  color: var(--color-light, #fafaf9);
}
```

---

## 6. Performance Guidelines

### What to Animate

```
SAFE (GPU-accelerated):
✓ transform (translate, scale, rotate)
✓ opacity
✓ filter (on simple elements)
✓ clip-path (on simple shapes)

AVOID (causes layout/paint):
✗ width, height
✗ top, left, right, bottom
✗ margin, padding
✗ border-width
✗ font-size
✗ box-shadow
✓ box-shadow via scale transform with ::before
```

### Performance Budget

```
FRAMERATE
├── Target: 60fps (16.7ms per frame)
├── Acceptable: 30fps on mobile
└── Fail: below 30fps on any device

COMPLEXITY LIMITS
├── Max 3 simultaneous ScrollTrigger instances
├── Max 5 staggered elements per group
├── Max 10 concurrent animated elements
└── Max 200ms total animation calculation budget
```

### Motion Sickness Prevention

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
  
  [data-reveal] {
    opacity: 1 !important;
    transform: none !important;
    transition: none !important;
  }
}
```
