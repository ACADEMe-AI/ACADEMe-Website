---
name: academe-website-brain
description: >
  MASTER brain for the ACADEMe marketing/showcase website repo (this repo).
  Use first when planning, designing, or editing the public site, v2/v3
  cinematic experience, mascot, tokens, or conversion CTAs. Distinct from
  academe-brain, which is the Flutter/FastAPI product.
---

# ACADEMe website brain

Check this skill first for work in **this** repository (marketing / showcase site).

The Flutter + FastAPI product brain is `academe-brain` (same pack, or the `albany` app repo). Do not apply Flutter module rules to this Vite/React site.

## What this repo is

Public ACADEMe website: showcase + waitlist + QR into the mobile app.

| Layer | Truth |
|---|---|
| Stack | React + Vite + TypeScript, GSAP ScrollTrigger, Lenis, Three.js / R3F |
| 3D phone | Sketchfab chassis at `public/models/Iphone.glb` — one persistent WebGL phone, never a CSS fake |
| Screens | Baked product UI in `public/screens/*.png` |
| Mee | `public/mascot/` — narrative character, not a sticker |
| Brand docs | `design/` and `src/design/content/` |
| Guardrails | `design/agent/GUARDRAILS.md` + `ARCHITECTURE-PRINCIPLES.md` |
| Primary CTA | Join waitlist (`src/lib/constants.ts` `WAITLIST_URL`) |
| Secondary | See how it works (`DEMO_URL`) |

## Product truth that the site must not break

- Solo students / college grads first
- Mobile-first app; website is showcase + QR, not the product
- Do not market “all devices” until desktop exists
- Teacher / admin / LMS = later phase, not homepage
- No fake metrics or invented testimonials

## Art direction (current cinematic surface)

- Flowty-grade composition: type as architecture, phone cuts through the headline
- One continuous scroll film, not stacked SaaS sections
- Vary composition across chapters (do not repeat text-left / phone-right)
- Palette: `#F6F7FA` `#FFFFFF` `#5B6CFF` `#12141A` `#5C6578` — plus the dark cinematic stage
- Preserve the good 70%. Do not rebuild from scratch

## Where to read first

1. `src/design/content/00-START-HERE.md`
2. `design/agent/GUARDRAILS.md`
3. `src/components/ScrollExperience.tsx` + `src/lib/waypoints.ts`
4. `src/components/scene/PhoneMesh.tsx`

## Related skills in this repo

| Need | Skill |
|---|---|
| Visual craft / critique | `impeccable` (`.claude/skills` or `.cursor/skills`) |
| Award-level motion / type | `top-design` |
| Product UI quality | `frontend-ui-engineering` |
| Clone a reference site | `clone-website` |
| Flutter/API product facts | `academe-brain` |
