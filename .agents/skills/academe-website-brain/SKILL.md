---
name: academe-website-brain
description: >
  MASTER brain for the ACADEMe marketing/showcase website repo (this repo).
  Use first when planning, designing, or editing the public site, v2/v3
  cinematic experience, mascot, tokens, or conversion CTAs. Distinct from
  academe-brain, which is the Flutter/FastAPI product.
---

# ACADEMe website brain

Check this skill first for work in **this** repository.

The Flutter + FastAPI product brain is `academe-brain`. Use it for *what the product is*. Do not apply Flutter module rules, Rive, or FastAPI folders to this Vite/React site.

Also read `AGENTS.md` (repo contract) and `design/agent/GUARDRAILS.md` (product/design law).

## What this repo is

Public ACADEMe website: showcase + waitlist + QR into the mobile app.

| Layer | Truth |
|---|---|
| Stack | React + Vite + TypeScript, GSAP ScrollTrigger, Lenis, Three.js / R3F |
| Production app | `src/` — this is what `/` ships |
| 3D phone | Sketchfab chassis at `public/models/Iphone.glb` — one persistent WebGL phone |
| Screens | Baked product UI in `public/screens/*.png` |
| Mee | `public/mascot/` — narrative character, not a sticker |
| Brand docs | `design/` and `src/design/content/` |
| Guardrails | `design/agent/GUARDRAILS.md` |
| Primary CTA | Join waitlist (`src/lib/constants.ts` `WAITLIST_URL`) |
| Secondary | See how it works (`DEMO_URL`) |

## Product truth

- Solo students / college grads first
- Mobile-first app; website is showcase + QR, not the product
- Do not market “all devices” until desktop exists
- Teacher / admin / LMS = later phase, not homepage
- No fake metrics or invented testimonials

## Art direction

- Flowty-grade composition: type as architecture, phone cuts through the headline
- One continuous scroll film, not stacked SaaS sections
- Vary composition across chapters (do not repeat text-left / phone-right)
- Palette: `#F6F7FA` `#FFFFFF` `#5B6CFF` `#12141A` `#5C6578` — plus the dark cinematic stage
- Preserve the good 70%. Do not rebuild from scratch

## Forbidden (stop and ask)

- Replacing `src/`, `index.html`, or `public/brand/` with a cloned third-party site
- Shipping Flowty (or any other brand) assets, wordmark, or copy as ACADEMe
- A CSS or image fake of the phone when the GLB is the device
- Adding a second phone, or teleporting between multiple device meshes
- Flattening the hero into a generic SaaS split (copy column + device column)
- Applying `academe-brain` Flutter architecture to this repo
- Changing waitlist/demo URLs except in `src/lib/constants.ts`
- Committing `.env`, `.claude/settings.local.json`, `.codex/`, or plugin copies of `impeccable`

## Where to read first

1. `AGENTS.md`
2. `src/design/content/00-START-HERE.md`
3. `design/agent/GUARDRAILS.md`
4. `src/components/ScrollExperience.tsx` + `src/lib/waypoints.ts`
5. `src/components/scene/PhoneMesh.tsx`

## Related skills

| Need | Skill |
|---|---|
| Product UI quality | `frontend-ui-engineering` |
| Flutter/API product facts | `academe-brain` |
| Visual craft / critique | `impeccable` (local plugin) |
