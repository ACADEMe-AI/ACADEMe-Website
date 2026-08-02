# How to create the ACADEMe mascot (production)

Research-backed pipeline for a **solo / tiny team**. Goal: app-ready character with Rive motion — not a one-off Midjourney wallpaper.

---

## 1. What “good” mascots do (product research)

| Pattern | Example class | Lesson for us |
|---------|----------------|---------------|
| **Relationship layer** | Duo, Finch | Character carries emotion; UI still works if hidden |
| **Simple geometry** | Duolingo Rive redesign | Cylinders/soft shapes animate cheaper than fur |
| **One silhouette** | App icon test | Readable at 64px |
| **State machine** | Duo / Brilliant | Idle → react → celebrate in **one** `.riv` file |
| **Adult tone** | Brilliant (path > baby pet) | College users: competence + humor > cuteness |
| **Avoid clones** | KnowUnity fox, Duo owl | Different metaphor entirely |

**Our constraints (locked product):**

- Scheme **B** dark + **D** light  
- Optional hide in settings  
- Celebrations skippable + reduce-motion  
- Not vibe-coded: final art has a brief, expression sheet, and Rive contract  

---

## 2. Decide *before* spending money

Answer these (founder):

1. **One hero character** vs **small cast** vs **no character (logo motion only)**?  
2. Object metaphor (plant, plane, lamp…) or abstract blob?  
3. Face style: eyes+mouth vs faceless (lantern can be faceless)?  
4. Budget: DIY / AI-assisted / freelance / studio?

If unsure after Round 2: **ship kinetic logo first**, add mascot in v1.x — valid principal-engineer choice (don’t block Phase 1).

---

## 3. Creation paths (how teams actually do it)

### Path A — Freelance character designer (recommended quality)

1. Write a **1-page brief** (template below).  
2. Hire on Contra / Dribbble / Upwork / X (portfolio with **app mascots** or stickers).  
3. Deliverables: turnaround, expression sheet, color on B+D, 1024 PNG, optional Figma.  
4. Engineer or motion designer builds **Rive** from stills (or hire Rive specialist).  

**Cost ballpark:** stills $200–1500; Rive $300–2500 depending on complexity.  
**Time:** 1–3 weeks.

### Path B — AI concept → human cleanup (fast solo)

1. Generate concepts (what we did Round 2).  
2. Shortlist 1 direction.  
3. Generate **expression sheet** + 3/4 views with `image_edit` consistency.  
4. Trace in **Figma / Illustrator / Affinity** into clean vectors (mandatory — AI edges are messy for Rive).  
5. Import paths to **Rive**; build state machine.  
6. Flutter `rive` package.

**Risk:** AI looks “samey”; always vector-trace for production.

### Path C — Full Rive-native from start

1. Designer works **in Rive** (or After Effects → less ideal).  
2. State machine = source of truth.  
3. Export `.riv` + still poster frames for store screenshots.

**Best** if you already found a Rive freelancer (Duolingo/Brilliant pattern).

### Path D — No character

1. Animated **A / spark logo** only.  
2. Confetti + haptics for celebrations.  
3. Add character later without rewriting app (keep `MascotSlot` empty).

---

## 4. Brief template (copy when commissioning)

```
Product: ACADEMe — AI study companion for students / college
Tone: peer coach, sharp, not babyish, not guilt-trip Duo
Colors: Dark primary #5B6CFF, accent #7CFFB2, bg #0B0C0F;
        Light bg #F6F7FA, same primary
Metaphor: [Pip cactus / Fold plane / …]
Must: simple shapes, readable 64px, works light+dark
Must not: look like Duo owl or KnowUnity fox
Deliverables:
  - Front + 3/4 + side
  - Expressions: idle, celebrate, encourage, think, empty-invite
  - Color + mono versions
  - PNG 1024 + SVG or layered Figma
Nice: Rive-ready layers named for eyes/mouth/body
```

---

## 5. Rive production checklist

See also `design/motion/rive-celebrations.md`.

- [ ] One artboard, state machine `MascotSM`  
- [ ] Inputs: idle, celebrate_small/big, encourage, think, empty_invite, hide, reduce_motion  
- [ ] Events: celebration_end, haptic_success  
- [ ] File size budget: aim &lt; 200KB–1MB for companion  
- [ ] Test on mid Android 60fps  
- [ ] Light + dark background QA  

**Flutter**

```yaml
dependencies:
  rive: # pin current stable
```

`assets/rive/mascot.riv` → `MascotView` widget only (single integration point).

---

## 6. Suggested solo timeline

| Week | Action |
|------|--------|
| 0 | Pick Round 2 (or 2b) direction or “logo only” |
| 1 | Commission or vector-trace final design |
| 1–2 | Expression sheet approved |
| 2–3 | Rive state machine v0 |
| 3 | Wire Flutter `MascotSlot` + one celebration |

**Do not** block Phase 1 core study loop on perfect mascot (guardrails E7).

---

## 7. Legal / brand

- Don’t train production mark on copyrighted mascots.  
- Concept AI images = **exploration only**; redraw for trademark filing later.  
- Name check (USPTO / app stores) before shipping “Pip/Fold/…” as brand.

---

## 8. If founder still dislikes all characters

Valid outcomes:

1. **Logo motion only** at launch  
2. **Round 2b** with vibe keywords you *do* like (e.g. “more premium,” “more weird,” “more Indian campus,” “more abstract,” “more 3D clay”)  
3. **User avatar pack** (pick your study buddy) instead of one corporate mascot  

Tell the agent the vibe in one sentence; generate Round 2b.
