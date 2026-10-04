---
name: academe-website-brain
description: >
  Master brain for the ACADEMe marketing website repo (this repo). Use first
  when planning, designing or editing the public site, the 3D scroll film,
  Pebby, tokens or CTAs. academe-brain holds product facts only.
---

# ACADEMe website brain

Check this skill first for work in **this** repository. Also read `AGENTS.md`.

## What this repo is

academe.cc: a single scroll film that shows the real app, then sends students to Google Play.

| Layer | Truth |
|---|---|
| Stack | React + Vite + TypeScript, GSAP ScrollTrigger, Lenis, Three.js / R3F |
| 3D phone | `public/models/Iphone.glb`, one persistent WebGL phone |
| Screens | `public/screens/*.png`, real Pixel 10 captures, 720×1560, Light |
| Pebby | `public/pebby/*.png`, the app's transparent poses |
| Logo | `public/brand/academe_cube.png` (light surfaces), `logo_mark.png` (dark) |
| Fonts | `public/fonts/*.woff2`, converted from the app: Baloo 2 800, Archivo 700, Noto Sans 400/600, ArchivoWordmark |
| CTA | `PLAY_URL` and `PLAY_LIVE` in `src/lib/constants.ts` |
| Legal | `/privacy`, `/terms`, `/support`, `/delete-account` redirect to `api.academe.cc` |

## The film

`src/lib/waypoints.ts` (desktop and phone paths), `src/components/ScrollExperience.tsx` (text fades and `screenFromProgress`), `src/components/ui/ChapterOverlay.tsx` (copy).

| Beat | Scroll | Screens |
|---|---|---|
| Hero | 0 – 0.12 | home |
| Lessons | 0.12 – 0.465 | lesson → courses (swap at 0.32, phone edge-on) |
| Pebby | 0.465 – 0.615 | askme |
| Scan | 0.615 – 0.762 | scan → check |
| Revision | 0.762 – 0.875 | revision (swap at 0.762, phone edge-on) |
| Plan | 0.875 – 0.945 | folder |
| Get the app | 0.945 – 1 | landscape (rotated 90° into a portrait file) |

Screen swaps sit where the phone is edge-on or the text is crossfading. If you move a waypoint, re-check both. Phones in landscape (height ≤ 500px, touch) use the phone path with the text on the left.

After the film: "Made for students in India" (languages, safety) and Pricing, then the footer.

## Product truth

- Class 6–12, CBSE / ICSE / ISC, 2026-27 syllabus. Android first; no iOS yet.
- Only 6 lessons are live (Class 10 CBSE). Never claim every chapter has lessons.
- Pebby answers in English, Hindi, Telugu, Tamil and Bengali; the app's own text is English for now.
- Free: every lesson, revision, folder, reminder; 10 Pebby questions, 3 scans, 1 answer check a day. Pro: ₹200/month (first month ₹100) or ₹1,999/year.

## Forbidden

- Other brands' names, assets, copy or screenshots
- A CSS or image fake of the phone, or a second phone
- Drawn or mocked app screens: capture them from the app
- Flattening the hero into a generic SaaS split
- Code comments
