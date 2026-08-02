# Competitive UI Reference — KnowUnity (+ Duolingo motion notes)

**Date:** 2026-07-30  
**Sources:** KnowUnity product screenshots (blog/Play), knowunity.com, store listings/reviews; Duolingo/Rive industry patterns.  
**Use:** Phase 0.6–0.7 craft bar. Do not copy assets or trademarks.

---

## 1. KnowUnity visual identity

| Element | What they do |
|---------|----------------|
| Mode | **Dark-first** — near-black canvas |
| Accents | Green/teal Pro pill; orange streak flame; multicolor tool chips; lavender suggestion chips |
| Marketing | Purple gradient heroes, sticker badges (#1, AP/SAT) — **split** from in-app black/green |
| Type | Friendly sans; short greetings (“Good morning… Let’s get started!”) |
| Mascot | **Cartoon fox** (orange/purple, large eyes) + “Knowie” on web |
| Vibe | Gen-Z consumer AI (ChatGPT-like home) + light Duolingo gamification |

---

## 2. KnowUnity navigation

**~5 bottom areas (product captures):** Chat · Search · Center + · Challenges/Trophy · Library · Profile  

**Home = chat-first**

- Top: camera · Pro · streak · more  
- Center: fox + greeting  
- Mid: horizontal **tool chips** (Explain · Flashcards · Essay · Summarize…)  
- Bottom: composer (+ attach, ask anything, mic)

Study tools are **chips into chat**, not separate deep apps.

---

## 3. Core patterns

| Surface | Pattern |
|---------|---------|
| Chat | Empty = mascot + chips; voice + attachments; personalization by courses |
| Flashcards | Chip → topic prompt → generate (review/SRS UX less visible in sources) |
| Camera | Always reachable; Grade / Explain / Solve / Summarise actions |
| Quiz / exams | Marketing-heavy; AP/SAT framing |
| Library | Peer notes historically strong; reviews note AI pivot reduced community feel |

---

## 4. Strengths (respect these)

1. Chat-as-home = low friction  
2. Mascot + name greeting = warmth  
3. Tool chips teach AI affordances  
4. Scan → Solve/Explain action bar is clear  
5. Dark rounded consumer UI feels current  
6. Course-aligned exam framing (where present)

---

## 5. Weaknesses (our openings)

1. Brand split: purple marketing vs black/green app  
2. **5-tab clutter**  
3. Generation polished; **practice/SRS loop less hero**  
4. Trust scar: AI pivot reviews (lost sets, community gone)  
5. Pure black density can fatigue  
6. Generic “black void + chips” = ChatGPT clone risk  
7. Pro vs “free” tension can feel dirty

---

## 6. How ACADEMe beats them (locked targets)

| # | We beat them by… |
|---|------------------|
| 1 | **4 tabs max** + streak in header, not a tab |
| 2 | **Material-first hub** (upload → all tools) + chat, not only chat-first chaos |
| 3 | **Flashcard product** = flip, haptics, visible SRS — not just “generate prompt” |
| 4 | **Calm premium dark** (Scheme B) — less sticker spam, consistent brand web↔app |
| 5 | **Trust:** your materials persist, export, never “disappear after update” story |
| 6 | **Camera as craft moment** — crop, steps, progressive reveal |
| 7 | **Mascot optional** + college tone; celebrations rare & skippable |
| 8 | **≤2 taps** to Chat / Scan / Upload from home |

---

## 7. Duolingo / Rive lessons (motion only)

| Lesson | Our rule |
|--------|----------|
| Mascot = relationship layer | Coach, not needy pet |
| Tier celebrations | Micro / session / milestone |
| Rive state machines | One `.riv`, inputs from app |
| Guilt | Soft optional; no shame-on-open |
| Skip + reduce motion | Always |
| College tone | Restrained squash/stretch; dry wit |

Full detail: `motion/rive-celebrations.md` + research merge 2026-07-30.

---

## 8. Screenshot / research backlog

- [ ] Capture official App Store screenshot set (legal fair use internal only)  
- [ ] Note iOS vs Android version differences  
- [ ] Re-check tab labels after their next major release  
