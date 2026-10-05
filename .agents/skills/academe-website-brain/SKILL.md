---
name: academe-website-brain
description: >
  MASTER brain for the ACADEMe marketing/showcase website repo (this repo).
  Use first when planning, designing, or editing the public site, cinematic
  experience, mascot, tokens, or conversion CTAs. Distinct from academe-brain,
  which is the Flutter/FastAPI product.
---

# ACADEMe website brain

Check this skill first for work in **this** repository.

`academe-brain` is product facts only (what the app does). Do not apply Flutter modules, Rive, or FastAPI folders here.

Also read `AGENTS.md` and `design/agent/GUARDRAILS.md`.

## What this repo is

Public ACADEMe website: showcase + waitlist + QR into the mobile app.

| Layer | Truth |
|---|---|
| Stack | React + Vite + TypeScript, GSAP ScrollTrigger, Lenis, Three.js / R3F |
| Production | `src/` — this is what `/` ships |
| 3D phone | `public/models/Iphone.glb` — one persistent WebGL phone |
| Screens | `public/screens/*.png` (ACADEMe product UI) |
| Mee | `public/mascot/` — narrative character, not a sticker |
| Brand docs | `design/` and `src/design/content/` |
| Primary CTA | `WAITLIST_URL` in `src/lib/constants.ts` |
| Secondary | `DEMO_URL` |

## Product truth

- Solo students / college grads first
- Website is showcase + QR, not the product
- Do not market “all devices” until desktop exists
- Teacher / admin / LMS is later, not homepage
- No fake metrics or invented testimonials

## Art direction

- Type as architecture; the phone can cut through the headline
- One continuous scroll film, not stacked SaaS sections
- Vary composition across chapters
- Palette: `#F6F7FA` `#FFFFFF` `#5B6CFF` `#12141A` `#5C6578` — plus the dark cinematic stage
- Edit what exists. Do not rebuild from scratch

## Forbidden

- Another brand’s assets, wordmark, copy, or screenshots in this repo
- A CSS or image fake of the phone
- A second phone, or teleporting between device meshes
- Flattening the hero into a generic SaaS split
- Applying Flutter architecture to this repo
- Changing waitlist/demo URLs except in `src/lib/constants.ts`
- Committing `.env`, `.claude/settings.local.json`, or plugin copies of `impeccable`

## Read first

1. `AGENTS.md`
2. `src/design/content/00-START-HERE.md`
3. `design/agent/GUARDRAILS.md`
4. `src/components/ScrollExperience.tsx` + `src/lib/waypoints.ts`
5. `src/components/scene/PhoneMesh.tsx`
