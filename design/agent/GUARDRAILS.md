# Guardrails

Rules for anyone, human or agent, working on ACADEMe's website and design docs.

## 1. The app is the source of truth

| Rule | Detail |
|------|--------|
| S1 | Colours, fonts, radii and the keycap come from the app's `lib/ui/core/themes/app_theme.dart` |
| S2 | Logos are the app's `academe_cube.png` and `logo_mark.png`, copied byte for byte into `public/brand/` |
| S3 | Pebby art comes from the app. The web uses the poses in `public/pebby/` |
| S4 | Phone screens are real captures from the app on a Pixel 10. No drawn or generated screens |
| S5 | If the app and the site disagree, fix the site |

## 2. Product truth

| Rule | Detail |
|------|--------|
| P1 | A study app for Class 6 to 12, CBSE, ICSE and ISC, 2026-27 syllabus |
| P2 | Five pillars: Pebby tutor (ASKMe), swipe lessons (Courses), Scan with board-style marking, Folders and planner, Revision |
| P3 | Tabs: Home · ASKMe · Study · Me, plus the Scan key |
| P4 | Only 6 lessons are live (Class 10 CBSE). Never say every chapter has lessons |
| P5 | Android first, on Google Play. No iOS app, no App Store badge |
| P6 | Free: every lesson, revision, folder and reminder; 10 Pebby questions, 3 scans and 1 answer check a day. ACADEMe Pro: ₹200 a month (first month ₹100) or ₹1,999 a year |
| P7 | One user: the student. No teacher, school or social product |
| P8 | No ads, ever. Photos never stored |

## 3. No other names

| Rule | Detail |
|------|--------|
| N1 | No competitor, social network, video site or other study app named in code, copy, docs, file names or comments |
| N2 | Say "other study apps" when a comparison is needed |
| N3 | No other brand's assets, copy or screenshots |
| N4 | Google Play is fine: it's where we ship |

## 4. Code

| Rule | Detail |
|------|--------|
| C1 | No code comments of any kind in files you create or change |
| C2 | No colours or fonts outside the app's set |
| C3 | `pnpm typecheck` and `pnpm build` pass before you call it done |
| C4 | Respect `prefers-reduced-motion` |

## 5. Writing

| Rule | Detail |
|------|--------|
| T1 | Plain, short, human. No marketing fluff |
| T2 | Pebby is the tutor's name; use it |
| T3 | No fake numbers, ratings or testimonials |
| T4 | Pebby answers in five languages; the app's menus are English for now |
| T5 | Errors say what happened and what to do next |

## 6. This website repo

| Rule | Detail |
|------|--------|
| W1 | React + Vite + GSAP + Lenis + Three / R3F |
| W2 | One persistent WebGL phone (`public/models/Iphone.glb`). No CSS fake, no second phone |
| W3 | Keep the 3D scroll story. Don't flatten it into a text-left, device-right template |
| W4 | CTA URLs only in `src/lib/constants.ts` |
| W5 | Agents start at `AGENTS.md` and `academe-website-brain` |
| W6 | The design system is `src/design/`; its pages are `src/design/content/` |
