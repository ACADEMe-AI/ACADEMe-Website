# UI/UX Principles — Beat KnowUnity on Craft

**Product feel (locked):** Fast + clean · Instagram/TikTok smoothness · light playful celebrations  
**Parity:** Features can match KnowUnity · **UI must feel one generation sharper**

---

## 1. What “better than KnowUnity” means (measurable)

| Dimension | KnowUnity-class baseline | ACADEMe target |
|-----------|--------------------------|----------------|
| Time to first useful action | Browse then decide | **≤ 2 taps** from home to Chat / Camera / Upload |
| Navigation thinking | Multiple hubs | **One thumb grammar** — everyone learns in 30s |
| Feedback | Functional | **Instant** visual + haptic on every primary control |
| Empty states | Generic | **Guided** (one clear next action + mascot optional) |
| Study loop cohesion | Separate tools | **Material-centric**: one upload → all tools in one place |
| Visual noise | Feature-dense marketing bleed | **Calm dark surfaces**, one accent |
| Celebrations | Sparse or generic | **Rive mascot** moments that feel earned, not spammy |
| Typography / spacing | Typical app | **Consistent tokens**, optical hierarchy |
| Mistakes | Dead ends | **Always a next step** (retry, re-crop, simplify) |

If a design can’t claim one row in the right column, it is not “better” — it’s just different.

---

## 2. Core interaction grammar (TikTok/IG lessons)

| Pattern | How we use it |
|---------|----------------|
| **Thumb zone** | Primary CTAs, capture, “check answer” live bottom-center/right |
| **Horizontal rails** | Home: “Continue”, “Due flashcards”, “Subjects” — swipe cards, not deep menus |
| **Vertical feed** | Optional “For you” study cards later (P2); P1 = personal feed of *your* work |
| **Gesture fluency** | Flashcards: swipe know/don’t; sheets: drag to dismiss |
| **Zero mode switch** | From chat: chips to “Flashcards / Quiz / Summary” without leaving context |
| **Progressive disclosure** | Advanced settings buried; core path always 1 screen deep |

---

## 3. Information density rules

1. **One primary action per screen** (visually dominant).  
2. Secondary actions as icons or text buttons — never two equal blue buttons.  
3. Lists: title + one meta line max before expand.  
4. Chat: max bubble width ~80%; long answers collapse with “Show more”.  
5. Dashboard: max **3** metric widgets above fold.

---

## 4. Material-first architecture (UX moat)

KnowUnity sells tools separately. We unify:

```
Upload / Capture
    → Material detail
        → Summary | Notes | Flashcards | Quiz | Practice test | Chat about this
```

**Principle:** Student never asks “which menu was quizzes in?” — they open **the thing they studied**.

---

## 5. Navigation model (proposed)

**Bottom tabs (4 max for P1):**

| Tab | Role |
|-----|------|
| **Home** | Continue + rails + streak + quick actions |
| **Library** | Materials + decks + quizzes you own |
| **AI** | Chat hub + camera FAB or center action |
| **You** | Profile, goals, plan, settings |

Optional: **center elevated FAB** = Camera / Add (homework solve + upload).

**Avoid:** 5+ tabs, hamburger-only IA, teacher shells in P1.

---

## 6. Screen quality checklist (every screen)

- [ ] Uses design tokens only  
- [ ] Loading skeleton (not only spinner)  
- [ ] Empty state with 1 CTA  
- [ ] Error state with retry  
- [ ] Safe area respected  
- [ ] Tap targets ≥ 44  
- [ ] Works at large Dynamic Type / font scale  
- [ ] No horizontal overflow at 320pt width  
- [ ] Dark surfaces pass text contrast (body on bg ≥ 4.5:1)  

---

## 7. Microcopy principles

| Do | Don’t |
|----|-------|
| “Scan homework” | “Initiate multimodal ingestion” |
| “Got it” / “Still learning” | “Incorrect. Fail.” |
| “3 cards due” | “You have pending spaced repetition units” |
| Short celebration: “Nailed it” | Paragraph of praise |

---

## 8. Accessibility & inclusion

- Color never sole indicator of right/wrong (icon + text).  
- Captions for any UI video.  
- Mascot not required to understand UI.  
- Reduce motion path for all Rive celebrations.

---

## 9. Explicit anti-patterns (agents: reject PRs that do these)

- Onboarding with 8 screens before value  
- Paywall before first success  
- Nested navigation stacks > 3 deep for core loop  
- Auto-playing sound celebrations without mute respect  
- Mascot blocking the next study action  
- Copying KnowUnity screenshots pixel-for-pixel (legal + brand)  

---

## 10. Success metric for UI (Phase 1 usability)

| Metric | Target |
|--------|--------|
| First-session completion of: upload → flashcards review (5 cards) | ≥ 70% of new users who grant onboarding |
| Time to first AI answer | &lt; 30s including first query |
| SUS or informal “I knew what to tap” | Founder dogfood + 5 students qualitative |

---

*Phase 0.7 core. Update when navigation is locked in Figma/implementation.*
