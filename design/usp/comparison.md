# ACADEMe vs KnowUnity — Full Comparison

*Based on academe-mobile-usp.md (authoritative) vs knowunity-usp.md*

---

## Core Identity

| Dimension | ACADEMe | KnowUnity |
|---|---|---|
| **What it is** | AI-tutored LMS for K-12 **schools** (B2B) | AI study assistant for **individual** students (B2C) |
| **Users** | Students + Teachers + Admins (3 roles) | Students only (single role) |
| **Content model** | Structured curriculum (Course→Topic→Subtopic→Materials+Quizzes) | Upload anything → AI generates flashcards/quizzes/summaries |
| **AI brand** | ASKMe (multimodal tutor) | Knowunity AI / SchoolGPT |
| **Language** | 7 languages, auto-translated | Multi-language (33 markets, count unclear) |
| **Open source** | Yes (AGPL-3.0) | No (proprietary) |
| **Reach** | Early stage | 30M+ students, 20+ countries |

---

## Feature Comparison

| Feature | ACADEMe | KnowUnity |
|---|---|---|
| AI Chat / Tutor | ✅ ASKMe — text, image, audio, video, documents (Gemini 2.0 Flash) | ✅ AI Chat — text-based Q&A |
| AI Flashcards | ✅ (part of learning system) | ✅ Upload PDF/image → AI generates + spaced repetition |
| AI Quizzes | ✅ (within course hierarchy) | ✅ Upload content → AI generates + adaptive difficulty |
| AI Summaries | ❌ Not a dedicated feature | ✅ Upload docs → AI summary (key points, multiple lengths) |
| AI Practice Tests | ❌ (has exam system, not AI-generated tests) | ✅ AI-generates realistic practice exams + score predictions |
| AI Recommendations | ✅ Gemini analyzes progress → suggests materials | ❌ Not present |
| Structured LMS | ✅ Full hierarchical content engine | ❌ Just study tools |
| Class-based filtering | ✅ Students see only assigned class content | ❌ N/A (single-user) |
| Live Classes | ✅ Schedule, start/stop, recording sharing | ❌ |
| Progress Tracking | ✅ Per-action granular + visual charts + study time | ✅ Quiz analytics |
| Teacher Analytics | ✅ Per-class dashboards, student-level detail | ❌ |
| Admin Dashboard | ✅ Institution-wide analytics, teacher lifecycle | ❌ |
| Dual Exam System | ✅ MCQ + Subjective with rubrics | ❌ (quizzes only) |
| Community Chat | ✅ Topic-threaded chat (Firebase) | ❌ |
| Multimodal AI | ✅ Text, image, audio, video, document | ❌ Text only (likely) |
| Creator Program | ❌ | ✅ Creators upload notes, earn |
| Spaced Repetition | ❌ Not implemented | ✅ In flashcards |
| Offline/Library | ✅ Materials stored, browseable | ✅ Content library with subjects |
| Web Landing | ✅ tarawa (React) | ✅ knowunity.com |

---

## ACADEMe Advantages

1. **3-role architecture** — student/teacher/admin in one app
2. **Structured LMS** — Course→Topic→Subtopic tree maps to real pedagogy
3. **Class-based content filtering** — schools control what students see
4. **Live class management** — schedule, run, record hybrid classes
5. **Teacher analytics suite** — per-class dashboards, who's falling behind
6. **Admin intelligence** — institution health in one screen
7. **Dual exam system** — MCQ + subjective with rubrics, publish/unpublish
8. **Multimodal ASKMe** — images, audio, video, documents in one chat
9. **AI-powered recommendations** — Gemini fills individual learning gaps
10. **Open source** — self-hostable, auditable, customizable

---

## KnowUnity Advantages (ACADEMe Gaps)

1. **AI Summaries** — upload any doc → instant key points + study guide
2. **AI Practice Tests** — realistic exam simulation + score predictions
3. **AI Flashcards with Spaced Repetition** — dedicated, adaptive flashcard engine
4. **Creator Program** — user-generated content ecosystem (viral growth engine)
5. **Scale & Social Proof** — 30M users, 75k reviews, 33 markets
6. **Brand & Trust** — 4.9 stars, 12 testimonials on landing page
7. **Market Coverage** — 33 countries vs ACADEMe's India focus

---

## Overlap (Similarities)

- Mobile-first (iOS + Android)
- K-12 / college student focus
- AI chat tutor
- Multi-language support
- Quiz / assessment features
- Progress tracking / analytics
- Freemium model (or implied free)
- 4.9 rating

---

## Similarity Score: ~40%

| Factor | Weight | Score | Reason |
|---|---|---|---|
| Core problem | 20% | 70% | Both: "students need better learning tools" |
| AI tutor concept | 15% | 80% | Both have AI chat Q&A |
| Target user | 20% | 30% | ACADEMe = schools (3 roles), KnowUnity = individuals (1 role) |
| Product architecture | 15% | 20% | ACADEMe = structured LMS, KnowUnity = AI generation tools |
| Feature set overlap | 15% | 40% | AI chat + quizzes overlap; rest diverges |
| Platform | 15% | 0% | ACADEMe = Flutter/FastAPI open stack, KnowUnity = proprietary |
| **Total** | **100%** | **~40%** | **Fundamentally different direction** |

---

## Recommended Approach

**Don't copy KnowUnity — lean into institutional moat.**

| Priority | Action | Why |
|---|---|---|
| P0 | Ship AI Summaries | Low effort, high impact — KnowUnity's #1 engagement driver |
| P0 | Ship AI Practice Tests | Dual exam system needs this — makes exams feel personalized |
| P1 | Add spaced repetition to flashcards | KnowUnity's retention mechanic — implement with FSRS algorithm |
| P1 | Add social proof to landing page | Testimonials, user count, rating badges — ACADEMe has none |
| P2 | Build creator/influencer program | UGC is KnowUnity's growth engine — teachers as creators |
| P2 | Expand language markets | 7 languages is good; 33 markets is better |
| P3 | Gamify recommendations | "Weak spot alerts" + "next best action" keeps retention high |
| ❌ | Don't remove 3-role architecture | It's your moat — consumer-only is crowded |
| ❌ | Don't drop structured LMS | Schools need curriculum hierarchy, not just AI tools |

**Key insight:** KnowUnity is a **study tool**. ACADEMe is a **school operating system**. Don't compete on their terms — build the bridge between AI tools and institutional needs that only you have.
