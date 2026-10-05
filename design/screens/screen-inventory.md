# Screen Inventory — Phase 1 Student App

Every screen needs: **Default · Loading · Empty · Error · Success** (as applicable).  
Components from `tokens/design-tokens.md` primitives.

---

## Auth & onboarding

| ID | Screen | Primary action | Notes |
|----|--------|----------------|-------|
| A0 | Splash | — | Logo + mascot idle optional |
| A1 | Welcome | Get started / Sign in | 1–2 value slides max |
| A2 | Sign up | Create account | Email + Google |
| A3 | Sign in | Sign in | |
| A4 | Forgot password | Send link | |
| A5 | Onboarding subjects | Continue | Multi-select chips |
| A6 | Onboarding goals | Finish | Exam date optional |

**Checklist**
- [ ] A0–A6 default layouts  
- [ ] Validation errors inline  
- [ ] Skip onboarding after subjects min 1  

---

## Tabs

### Home (H)

| ID | Screen | Primary action |
|----|--------|----------------|
| H1 | Home feed | Continue last / Quick action |
| H2 | Rail: Due flashcards | Start review |
| H3 | Rail: Recent materials | Open material |

**Checklist**
- [ ] H1 with streak chip  
- [ ] Pull to refresh  
- [ ] Skeleton for rails  

### Library (L)

| ID | Screen | Primary action |
|----|--------|----------------|
| L1 | Library root (segments) | Open item / Add |
| L2 | Materials list | Open material |
| L3 | Decks list | Start review |
| L4 | Search library | Open result |

**Checklist**
- [ ] Empty: “Upload notes to start”  
- [ ] Swipe actions optional (delete)  

### AI (C)

| ID | Screen | Primary action |
|----|--------|----------------|
| C1 | Chat hub / threads | New chat |
| C2 | Chat thread | Send |
| C3 | Attachment sheet | Photo / PDF / file |
| C4 | Prompt chips row | Insert prompt |

**Checklist**
- [ ] Streaming bubble  
- [ ] Long response collapse  
- [ ] “Make flashcards” / “Quiz me” action chips on AI messages  
- [ ] Image preview in bubble  

### You (Y)

| ID | Screen | Primary action |
|----|--------|----------------|
| Y1 | Profile | Edit |
| Y2 | Study plan | Open day task |
| Y3 | Stats | — |
| Y4 | Settings | — |
| Y5 | Language | Save |
| Y6 | Privacy / delete data | Confirm |

---

## Capture & ingest

| ID | Screen | Primary action |
|----|--------|----------------|
| I1 | Camera capture | Shutter |
| I2 | Crop / confirm | Use photo |
| I3 | Upload progress | — |
| I4 | Generate choices | Pick outputs (summary, cards, quiz…) |
| I5 | Generation progress | Open when ready |

**Checklist**
- [ ] Permission denied state  
- [ ] Blurry / failed OCR message  
- [ ] Multi-output selection default smart set  

---

## Material-centric

| ID | Screen | Primary action |
|----|--------|----------------|
| M1 | Material detail hub | Open tool |
| M2 | Summary viewer | Save / to cards |
| M3 | AI Notes viewer | Edit |
| M4 | Chat with material | Send |

**M1 tool grid:** Summary · Notes · Flashcards · Quiz · Practice test · Chat  

---

## Flashcards

| ID | Screen | Primary action |
|----|--------|----------------|
| F1 | Deck detail | Review |
| F2 | Review session | Know / Still learning |
| F3 | Session complete | Celebration + done |
| F4 | Card editor | Save |

**Gestures:** swipe right = know, left = still learning (with buttons for a11y).  

---

## Quiz

| ID | Screen | Primary action |
|----|--------|----------------|
| Q1 | Quiz setup | Start |
| Q2 | Question | Submit |
| Q3 | Answer feedback | Next |
| Q4 | Results | Review / retry |

---

## Practice test

| ID | Screen | Primary action |
|----|--------|----------------|
| P1 | Setup (topic, time, length) | Start exam |
| P2 | Timed exam | Submit |
| P3 | Results + weak spots | Targeted practice |
| P4 | Question review | Back to list |

---

## Overlays

| ID | Overlay | Trigger |
|----|---------|---------|
| O1 | Celebration Rive | Session complete, streak, first upload |
| O2 | Toast | Soft errors / saved |
| O3 | Confirm delete | Destructive |

---

## Nested checklist template (per screen)

```
Screen ID: __
- [ ] Layout matches tokens
- [ ] Loading skeleton
- [ ] Empty state + CTA
- [ ] Error + retry
- [ ] Success path
- [ ] Haptics mapped
- [ ] Reduce-motion OK
- [ ] Analytics event names listed
```

---

## Analytics events (minimum)

`auth_signup` · `onboarding_complete` · `material_upload` · `chat_send` · `homework_scan` · `flashcard_review` · `quiz_complete` · `practice_complete` · `celebration_shown` · `tab_open`
