# Technical Stack Reference

## Table of Contents
1. Core Technologies
2. Animation Libraries
3. Smooth Scrolling Solutions
4. 3D & WebGL
5. Build Tools & Frameworks
6. Performance Optimization
7. Deployment & Hosting

---

## 1. Core Technologies

### CSS Approach

```
METHODOLOGY
├── CSS Custom Properties (required)
├── Modern CSS (container queries, :has(), etc.)
├── Utility-first OR Component-based (not mixed)
└── PostCSS for processing (autoprefixer, nesting)

RECOMMENDED STACK
├── Plain CSS with custom properties
├── Tailwind CSS (for rapid prototyping)
├── CSS Modules (for React/Vue scoping)
└── Vanilla Extract (for type-safe CSS-in-JS)
```

### JavaScript Standards

```javascript
const features = {
  modules: true,
  asyncAwait: true,
  optionalChaining: true,
  nullishCoalescing: true,
  destructuring: true,
  spreadOperator: true,
  templateLiterals: true,
  arrowFunctions: true,
};

const avoid = {
  var: true,
  callbacks: 'Use promises/async',
  jquery: 'Use native APIs',
};
```

---

## 2. Animation Libraries

### GSAP (GreenSock)

```
THE INDUSTRY STANDARD
├── Power: Most capable animation library
├── Performance: Optimized for 60fps
├── Ecosystem: ScrollTrigger, SplitText, MorphSVG
└── License: Free for most uses, paid for some plugins

INSTALLATION
npm install gsap

CORE PLUGINS (free)
├── ScrollTrigger
├── Observer
├── Draggable
└── MotionPath

CLUB PLUGINS (paid)
├── SplitText
├── MorphSVG
├── DrawSVG
├── ScrollSmoother
└── Flip
```

```javascript
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

gsap.defaults({
  ease: "expo.out",
  duration: 1
});

gsap.to(".element", {
  x: 100,
  opacity: 1,
  duration: 0.8
});

const tl = gsap.timeline();
tl.to(".first", { x: 100 })
  .to(".second", { x: 100 }, "-=0.5")
  .to(".third", { x: 100 }, "+=0.2");
```

### Motion (Framer Motion)

```
REACT-SPECIFIC
├── Declarative API
├── Layout animations
├── Gesture support
├── Exit animations
└── Server-side rendering support

INSTALLATION
npm install motion
```

```jsx
import { motion, AnimatePresence } from "motion/react";

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
>
  Content
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  whileInView={{ opacity: 1 }}
  viewport={{ once: true, margin: "-100px" }}
>
  Reveals on scroll
</motion.div>

<motion.div layout />
```

### Anime.js

```
LIGHTWEIGHT ALTERNATIVE
├── Size: ~17KB minified
├── SVG morphing included
├── Timeline support
└── Good for simpler projects

INSTALLATION
npm install animejs
```

```javascript
import anime from 'animejs';

anime({
  targets: '.element',
  translateX: 250,
  rotate: '1turn',
  duration: 800,
  easing: 'easeOutExpo'
});

anime({
  targets: '.grid-item',
  translateY: [50, 0],
  opacity: [0, 1],
  delay: anime.stagger(100)
});
```

---

## 3. Smooth Scrolling Solutions

### Lenis (Recommended)

```
MODERN & LIGHTWEIGHT
├── Size: ~4KB gzipped
├── Native scroll (accessibility preserved)
├── GSAP integration
├── Performant
└── Actively maintained by Studio Freight

INSTALLATION
npm install lenis
```

```javascript
import Lenis from 'lenis';

const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical',
  gestureOrientation: 'vertical',
  smoothWheel: true,
  wheelMultiplier: 1,
  touchMultiplier: 2,
  infinite: false,
});

function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// GSAP integration
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);
```

### Locomotive Scroll

```
FEATURE-RICH
├── Smooth scrolling
├── Parallax effects built-in
├── Data attributes for quick setup
├── Horizontal scroll support
└── Heavier than Lenis

INSTALLATION
npm install locomotive-scroll
```

```javascript
import LocomotiveScroll from 'locomotive-scroll';

const scroll = new LocomotiveScroll({
  el: document.querySelector('[data-scroll-container]'),
  smooth: true,
  multiplier: 1,
  lerp: 0.1
});
```

---

## 4. 3D & WebGL

### Three.js

```javascript
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
```

### React Three Fiber

```
INSTALLATION
npm install @react-three/fiber @react-three/drei
```

```jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
      <Environment preset="city" />
    </Canvas>
  );
}
```

### OGL

```
LIGHTWEIGHT WEBGL
├── Size: ~30KB
├── Lower-level than Three.js
├── Better for simple effects
└── Less overhead

INSTALLATION
npm install ogl
```

---

## 5. Build Tools & Frameworks

### Vite (Recommended for Simple Sites)

```
SETUP
npm create vite@latest
```

### Next.js (React Apps)

```
SETUP
npx create-next-app@latest
```

### Astro (Content Sites)

```
SETUP
npm create astro@latest
```

### Nuxt (Vue Apps)

```
SETUP
npx nuxi@latest init
```

---

## 6. Performance Optimization

### Image Optimization

```
FORMATS
├── WebP: Primary format, 25-35% smaller than JPEG
├── AVIF: Best compression, growing support
├── SVG: Icons, logos, illustrations
└── JPEG/PNG: Fallbacks only

TOOLS
├── Sharp (Node.js): npm install sharp
├── Squoosh: squoosh.app (browser-based)
├── ImageOptim: Desktop app (Mac)
└── SVGO: SVG optimization

RESPONSIVE IMAGES
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description" loading="lazy">
</picture>
```

### Font Optimization

```html
<link rel="preload" href="/fonts/display.woff2" as="font" type="font/woff2" crossorigin>

<style>
@font-face {
  font-family: 'Display';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap;
  unicode-range: U+0000-00FF;
}
</style>
```

### Code Splitting

```javascript
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['gsap', 'three'],
        },
      },
    },
  },
};
```

### Critical CSS

```html
<style>
  /* Above-the-fold styles inlined */
</style>
<link rel="preload" href="/styles.css" as="style" onload="this.rel='stylesheet'">
```

---

## 7. Deployment & Hosting

### Recommended Platforms

```
STATIC SITES
├── Vercel: Best for Next.js, excellent DX
├── Netlify: Great for Jamstack, easy deploys
├── Cloudflare Pages: Fast edge network
└── GitHub Pages: Free, simple static hosting

FULL-STACK
├── Vercel: Serverless functions, edge middleware
├── Railway: Containers, databases
├── Render: Full infrastructure
└── AWS Amplify: AWS ecosystem

CDN FOR ASSETS
├── Cloudflare: Free tier, global
├── AWS CloudFront: Enterprise scale
├── Bunny CDN: Cost-effective, fast
└── Imgix/Cloudinary: Image-specific CDN
```

### Performance Checklist

```
PRE-LAUNCH
□ Images optimized (WebP/AVIF, lazy loaded)
□ Fonts subset and preloaded
□ CSS/JS minified and compressed
□ Gzip/Brotli compression enabled
□ HTTP/2 or HTTP/3 enabled
□ Cache headers configured
□ Critical CSS inlined
□ Unused CSS/JS removed

MONITORING
□ Lighthouse CI in deployment
□ Core Web Vitals tracking
□ Real User Monitoring (RUM)
□ Error tracking (Sentry, etc.)
```
