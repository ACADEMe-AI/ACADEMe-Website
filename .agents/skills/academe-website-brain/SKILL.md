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

academe.cc: a single scroll film that shows the real app, then invites students to join.

| Layer | Truth |
|---|---|
| Stack | React + Vite + TypeScript, GSAP ScrollTrigger, Lenis, Three.js / R3F |
| 3D phone | `public/models/Iphone.glb`, one persistent WebGL phone |
| Screens | `public/screens/*.webp`, real Pixel 10 captures, 720×1560, Light; the last one is the original `waitlist.png` |
| Mascot | `public/mascot/*.png`, one image per section (keep them) |
| Look | Archivo, white pill buttons, "Study smarter. In your pocket." Don't restyle |
| CTA | Start For Free + QR in the hero, Join the community at the end; `WAITLIST_URL` in `src/lib/constants.ts` |
| Legal | `/privacy`, `/terms`, `/support`, `/delete-account` redirect to `api.academe.cc` |

## The film

`src/lib/waypoints.ts` (desktop and phone paths), `src/components/ScrollExperience.tsx` (text fades and `screenFromProgress`), `src/components/ui/ChapterOverlay.tsx` (copy). The scroll timing is the original one: change screenshots and text, not the motion. More sections can be added after the film (`AppDetails`).

| Beat | Scroll | Screens |
|---|---|---|
| Hero | 0 – 0.12 | home |
| Lessons | 0.12 – 0.44 | lesson → courses |
| Pebby | 0.44 – 0.58 | askme |
| Scan | 0.58 – 0.74 | scan → check |
| Revision | 0.74 – 0.86 | revision |
| Plan | 0.86 – 0.94 | folder |
| Join | 0.94 – 1 | waitlist (sideways) |

## Product truth

- Class 6–12, CBSE / ICSE / ISC, 2026-27 syllabus. Android first; no iOS yet.
- Only 6 lessons are live (Class 10 CBSE). Never claim every chapter has lessons.
- Pebby answers in English, Hindi, Telugu, Tamil and Bengali; the app's own text is English for now.
- Free: every lesson, revision, folder, reminder; 10 Pebby questions, 3 scans, 1 answer check a day. Pro: ₹200/month (first month ₹100) or ₹1,999/year.

## Forbidden

- Other brands' names, assets, copy or screenshots
- A CSS or image fake of the phone, or a second phone
- Drawn or mocked app screens: capture them from the app
- Restyling the site's headline, buttons, mascot images or last screen
- Flattening the hero into a generic SaaS split
- Code comments
