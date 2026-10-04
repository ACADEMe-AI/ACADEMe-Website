---
name: academe-brain
description: Product facts for ACADEMe, the study app the website sells. Use for what the app does, who it is for, pricing and what is live. The app's code and plans live in the academe-mobile repo (academe/), not here.
---

# ACADEMe product facts

The source of truth is the app repo: `academe/tasks/strategy.md` (vision, USPs, pricing), `academe/tasks/roadmap.md` (what is built), `academe/lib/ui/core/themes/app_theme.dart` (colours, type).

## What it is

A study app for Indian school students, Class 6 to 12, CBSE / ICSE / ISC, built on the 2026-27 syllabus. Flutter client, Go API, PostgreSQL. Android package `com.academe.flutter`. iOS later.

## Five pillars

1. **Pebby (ASKMe)**: Explain · Solve with hints first · Quiz me. Answers in English, Hindi, Telugu, Tamil or Bengali.
2. **Swipe lessons (Courses)**: every syllabus chapter for the student's class and board; lessons are short card decks with a quick check every few cards. Only 6 lessons are live today (Class 10 CBSE); the rest show as "Coming soon".
3. **Scan**: Solve homework, Check my answer (marks by the CBSE / ICSE scheme, point by point), Notes to a folder, Ask about a photo. Photos are never stored.
4. **Folders and planner**: a test date becomes a plan, a Today checklist and reminders.
5. **Revision**: kept cards and missed questions return on a spaced schedule; chapter tests.

App tabs: Home · ASKMe · Study · Me, plus a separate Scan key.

## Seven USPs

Knows your syllabus · Learn by swiping · Pebby, a tutor with personality · Check my answer, board-style · Your language · Fair (free core, no paywall in sign-up) · Safe for students (no ads, no advertising ID, photos never stored, Report on every AI answer, real account deletion).

## Pricing

| | Free | ACADEMe Pro |
|---|---|---|
| Lessons, revision, folders, reminders | all | all |
| Pebby | 10 a day | unlimited |
| Scan reads | 3 a day | unlimited |
| Check my answer | 1 a day | unlimited |
| Lesson from your notes | — | yes |
| Price | ₹0 | ₹200/month (first month ₹100) or ₹1,999/year |

## Brand

Primary `#564CF1`, selected amber `#F5A800`, dark surfaces `#0B0C0F` / `#14161C` / `#1C1F28`. Baloo 2 800 headlines, Archivo 700 subheads, Noto Sans body, ArchivoWordmark for the wordmark. Pebby is the mascot's product name.
