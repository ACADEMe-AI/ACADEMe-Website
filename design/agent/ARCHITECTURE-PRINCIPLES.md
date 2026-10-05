# Architecture Principles — Principal Engineer Mindset

**Context:** Solo (or tiny) team building ACADEMe toward a serious company — not a weekend vibe-coded demo.  
**Law:** These principles are **mandatory** for agents and humans. Speed without structure is technical debt that kills scale.

**Companion:** `GUARDRAILS.md` (product + design law) · this file (engineering + architecture law)

---

## 0. North-star engineering culture

| We are | We are not |
|--------|------------|
| Building a **platform** that can grow features for years | Shipping a pile of screens that “kind of work” |
| Making **every move intentional** | YOLO prompts into production |
| Optimizing for **clarity, boundaries, and change** | Clever one-off hacks |
| Thinking “what breaks at 10× / 100× users?” | Only “does it work on my phone once?” |
| Documenting decisions | Tribal knowledge in chat |

**Billion-dollar mindset (practical, not fantasy):**

1. **Trust** — data durability, privacy, integrity (students’ materials never “disappear”).  
2. **Repeatable quality** — same patterns for every feature.  
3. **Leverage** — one architecture serves chat, cards, quizzes, exams.  
4. **Optionality** — can add growth (P2), desktop, school OS (P3+) without rewrite.  
5. **Operability** — logs, metrics, errors you can diagnose alone at 2am.

---

## 1. Anti–vibe-code rules (hard)

| # | Rule |
|---|------|
| V1 | **No feature without a home** — domain module, screen inventory ID, and API contract (or explicit local-only note) |
| V2 | **No god files** — screens don’t call network + parse + business rules + widgets in one 2k-line file |
| V3 | **No copy-paste domains** — shared study entities (`Material`, `Deck`, `QuizSession`) live once |
| V4 | **No silent failures** — errors typed, logged, surfaced to UI |
| V5 | **No secret env in repo** — keys via env / secrets manager |
| V6 | **No “temporary” architecture that lasts forever** — if temporary, ticket + expiry in comment `// TEMP(P1): remove by …` |
| V7 | **No random dependencies** — every package has a one-line why in docs or PR |
| V8 | **No UI tokens invented in widgets** — design tokens only |
| V9 | **No feature flag chaos** — flags named, defaulted, removed after rollout |
| V10 | **No AI-generated dump merged unread** — agent output is reviewed against this doc |

---

## 2. Layered architecture (Flutter app)

```
┌─────────────────────────────────────────┐
│  Presentation  (screens, widgets)       │  dumb UI, tokens, navigation
├─────────────────────────────────────────┤
│  Application   (controllers / cubits /  │  use-cases, orchestration
│                 notifiers)              │
├─────────────────────────────────────────┤
│  Domain        (entities, rules)        │  pure Dart; no Flutter imports
├─────────────────────────────────────────┤
│  Data          (repos, DTOs, APIs,      │  maps network ↔ domain
│                 local cache)            │
└─────────────────────────────────────────┘
```

| Layer | May depend on | Must not |
|-------|---------------|----------|
| Presentation | Application, Domain (types), Design tokens | Raw HTTP, Firestore SDK, JSON maps |
| Application | Domain, repository **interfaces** | Widgets, BuildContext |
| Domain | Nothing (pure) | Flutter, HTTP, storage |
| Data | Domain, external SDKs | Widgets |

**Solo exception:** You may start with fewer packages, but **folder boundaries** still exist from day one (`lib/features/...`, `lib/core/...`).

---

## 3. Feature module template (every Phase 1 feature)

```
lib/features/<feature>/
  domain/          # entities, failures, repository interfaces
  data/            # api clients, models, repository impl
  application/     # state + use cases
  presentation/    # screens + widgets
```

**Examples:** `chat`, `materials`, `flashcards`, `quizzes`, `practice_test`, `study_plan`, `auth`, `mascot`

**Core (shared):**

```
lib/core/
  theme/           # AppColors, typography, ThemeData
  network/         # API client, interceptors, errors
  storage/         # secure storage, cache policy
  analytics/       # event names (typed)
  di/              # composition root
  routing/         # go_router (or chosen) routes
```

---

## 4. Domain model (study companion — scale spine)

These entities are the **product spine**. New features attach here; they don’t invent parallel worlds.

| Entity | Responsibility |
|--------|----------------|
| `User` | Identity, prefs, locale, mascot enabled |
| `Material` | Uploaded/captured source of truth |
| `MaterialArtifact` | Summary, notes, deck, quiz set, practice config derived from material |
| `Deck` / `Card` | Flashcards + SRS fields (`dueAt`, `stability`, …) |
| `Quiz` / `Question` / `Attempt` | Formative checks |
| `PracticeTest` / `TestAttempt` | Timed exams + weak spots |
| `ChatThread` / `Message` | Tutor conversations; optional `materialId` ground |
| `StudyPlan` / `PlanTask` | Goals and daily tasks |
| `ProgressEvent` | Append-only learning signals (analytics + recommendations later) |

**Rules**

- IDs stable (UUID/ULID); never reuse.  
- Soft-delete or tombstone for user content when possible (trust).  
- Artifacts **link to** `materialId` (material-first UX = data model, not just UI).  
- Timestamps: `createdAt`, `updatedAt` always; attempts have `completedAt`.

---

## 5. API & contracts

| Principle | Practice |
|-----------|----------|
| Contract first | Define request/response types before UI polish |
| Consistent errors | `{ code, message, details? }` + HTTP semantics |
| Validate at boundary | Client input + server input; trust internal domain |
| Pagination | Any list that can grow (threads, materials, library) |
| Idempotency | Uploads and “generate artifacts” safe to retry |
| Versioning | Prefer additive fields; avoid breaking renames |
| Auth | Access + refresh strategy explicit; logout revokes |

Agents: follow skill mindset of **stable interfaces** — don’t casually change response shapes.

---

## 6. State, data flow, offline

| Concern | Standard |
|---------|----------|
| Client state | One pattern app-wide (e.g. Riverpod **or** Bloc — pick one, document in app README) |
| Loading | Explicit: `idle | loading | data | error` — no boolean soup |
| Cache | Materials/decks readable offline if already fetched; mark stale |
| Sync | Server wins on conflict unless product says otherwise (document) |
| Optimistic UI | Allowed for reactions; not for destructive deletes without confirm |

---

## 7. AI features as a subsystem (not spaghetti)

```
UI → Application use case → AiGateway → provider (Gemini/etc.) → normalized Result
                              ↓
                     ArtifactStore / MessageStore
```

| Rule | Why |
|------|-----|
| Single `AiGateway` (or per-modality agents behind one facade) | Swap models without rewriting screens |
| Prompts versioned / named | Reproducibility |
| Outputs validated | Models lie about JSON |
| Cost/latency logged | Solo economics + scale |
| Safety policy centralized | Academic integrity, abuse |

---

## 8. Quality gates (definition of “structured”)

Before merging a feature (human or agent):

| Gate | Requirement |
|------|-------------|
| **Boundaries** | Feature lives in module template |
| **Types** | Domain entities not raw `Map` in UI |
| **Errors** | User-visible + logged |
| **Tokens** | No hard-coded colors/spacing outside theme |
| **Screen ID** | Matches `design/screens/screen-inventory.md` |
| **Analytics** | Events from typed catalog if user-visible action |
| **Tests** | At least: domain rule unit test **or** golden/widget for critical path (expand over time) |
| **Observability** | Failure path identifiable in logs |
| **Docs** | If public API or new package: short note in `docs/` or feature README |

**Solo pragmatism:** 100% coverage is not required. **Zero structure** is forbidden. Prefer one good test on SRS scheduling over twenty useless widget tests.

---

## 9. Growth without rewrite (design for 10×)

When building P1, leave **hooks**, not unused frameworks:

| Future | P1 hook |
|--------|---------|
| P2 UGC library | `visibility: private \| unlisted \| public` on materials/decks |
| P2 creators | `ownerId`, content reports table/API stub |
| Desktop later | Domain pure; UI not phone-only forever |
| School OS P3+ | Don’t hardcode “only student” into every table — `role` exists but unused paths stay dark |
| Multi-region | No hard-coded single-region assumptions in client strings only |
| Billing | Entitlement check behind interface; free-complete core loop |

**YAGNI with teeth:** Don’t build the school OS. **Do** avoid making it impossible.

---

## 10. Security, privacy, trust

| Rule | Detail |
|------|--------|
| Least privilege | Tokens scoped; no long-lived secrets on client |
| PII | Minimize; encryption in transit; secure storage for tokens |
| Student content | Export/delete path exists (legal + trust) |
| Prompt injection | Treat uploads and notes as untrusted input to tools |
| Dependencies | Pin versions; audit high-risk packages |

---

## 11. Decision records (lightweight ADR)

For any decision that is expensive to reverse (state management, backend host, auth vendor, SRS algorithm):

Create `docs/adr/NNNN-title.md`:

```md
# NNNN Title
Status: Accepted
Context: …
Decision: …
Consequences: …
```

Solo: 10-line ADRs beat “I forget why.”

---

## 12. Agent execution protocol (architecture)

When implementing a feature, agents **must** in order:

1. **Locate** domain home + screen IDs + phase checklist item  
2. **Write/update contracts** (types, API)  
3. **Implement domain + data**  
4. **Wire application state**  
5. **Build UI from tokens**  
6. **Handle loading/empty/error**  
7. **Analytics + logs on critical path**  
8. **Update checklist** (done / deferred + reason)  

**Refuse** (or stop and document) if asked to:

- Dump all logic into one screen file  
- Bypass repository for “just this once” production path  
- Add a second state-management framework  
- Ship without error states  
- Invent parallel user/content models  

---

## 13. Code review bar (even if self-review)

Ask every PR:

1. Would a new engineer find the right folder in 60 seconds?  
2. Can we add “public library” later without rewriting chat?  
3. Are failures diagnosable?  
4. Is this the simplest design that preserves boundaries?  
5. Does this look like a product company or a hackathon?

If (5) = hackathon → restructure before merge.

---

## 14. Related docs

| Doc | Role |
|-----|------|
| `GUARDRAILS.md` | Product + design + agent behavior |
| `ARCHITECTURE-PRINCIPLES.md` | This file |
| `usp/academe-product-roadmap.md` | What we build when |
| `design/PHASES-0.6-0.8.md` | Design phase checklists |
| ACADEMe brain / backend services | Existing platform knowledge when integrating |

---

*Version 1.0 — 2026-07-30 · Phase 0.6 extension*
