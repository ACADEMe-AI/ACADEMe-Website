# Rules

Full text: `design/agent/GUARDRAILS.md` in this repo.

## The app is the source of truth

- Colours, fonts, radii and the keycap come from the app's `app_theme.dart`. Logos and Pebby come from the app's assets
- Phone screens on the site are real captures from the app
- If the app changes, update this site to match. Never the other way round

## No other names

- No competitor, social network, video site or other study app named in code, copy, docs, file names or comments
- Say "other study apps" when a comparison is needed
- Google Play is fine; it's where we ship

## No code comments

None, in any file you create or change: no `//`, `/* */`, `{/* */}` or HTML comments. Names carry the meaning. Notes that matter go in the docs.

## Honest claims

- Only 6 lessons are live. Don't say every chapter has lessons
- The app is Android first, on Google Play. No iOS app yet
- No made-up numbers, reviews or testimonials
- Pebby can be unavailable when the AI service is out of credits. Don't build a live Pebby demo on the site

## Product scope

- One user: the student, Class 6 to 12, CBSE / ICSE / ISC
- No teacher or school product, no social feed, no ads
- Free core, one Pro plan

## Writing

Plain, short, human. No marketing fluff. See [Voice](/design/foundations/voice).
