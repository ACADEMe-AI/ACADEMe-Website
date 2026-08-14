# ACADEMe website

Cinematic product site: **one persistent Three.js phone**, choreographed by **GSAP ScrollTrigger**, with a procedural Rubik’s-cube brand loader. Design system docs live at `/design`.

## Stack

| Layer | Tech |
|-------|------|
| App | React 18 + Vite |
| 3D | Three.js + React Three Fiber + Drei |
| Scroll | GSAP ScrollTrigger (one master scrubbed timeline) |
| Smooth scroll | Lenis (respects `prefers-reduced-motion`) |
| Design | Soft Day + Archivo |

## Run

```bash
pnpm install
pnpm dev
```

Open **http://localhost:3010**

```bash
pnpm qa          # Playwright screenshots → qa-shots/
pnpm typecheck
pnpm build
```

- `http://localhost:3010/` — main website
- `http://localhost:3010/design` — design system (docs + tiles)
- `/?loader=1` — force brand loader

## Architecture

```
App
├── BrandLoader               ← one WebGL cube → parks in hero “pocket”
├── Nav
├── ScrollExperience          ← pinned story
│   ├── ExperienceCanvas      ← ONE persistent WebGL phone canvas
│   │   ├── CameraRig
│   │   ├── PhoneMesh
│   │   ├── FloatingDocs
│   │   └── MeeSprite
│   └── ChapterOverlay
├── SectionJump / QrModal
└── Footer
```

**GSAP** writes `scrollState` every scrub frame.  
**R3F `useFrame`** lerps real Three.js objects toward that state.  
**No CSS phone. No multi-phone teleport.**

## Timeline (approx.)

| Progress | Chapter | Screen |
|----------|---------|--------|
| 0.00 | Hero | home |
| 0.18 | Upload | upload → processing |
| 0.38 | Chat / Mee | chat |
| 0.52 | Practice | cards → quiz |
| 0.66 | Adaptive | practice |
| 0.82 | Mastery | mastery |
| 0.92 | CTA | landscape waitlist |
