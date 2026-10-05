# Information Architecture — ACADEMe Mobile (P1)

## Top-level

```
App
├── Auth
│   ├── Splash
│   ├── Welcome
│   ├── Sign in / Sign up
│   └── Onboarding (subjects, goals, exam date optional)
│
├── Main (Tab shell)
│   ├── Home
│   ├── Library
│   ├── AI (Chat hub)
│   └── You (Profile)
│
├── Global overlays
│   ├── Camera / Capture sheet
│   ├── Upload picker
│   ├── Celebration overlay (Rive)
│   └── System toasts
│
└── Stacks (pushed from tabs)
    ├── Material detail
    ├── Flashcard review
    ├── Quiz session
    ├── Practice test session
    ├── Summary / AI Notes viewer
    ├── Study plan
    └── Settings / Privacy / Delete data
```

## Home rails (horizontal)

1. **Continue** — last material / last chat  
2. **Due now** — SRS cards due  
3. **Quick actions** — Chat · Scan · Upload · Practice test  
4. **Recent materials**  
5. **Streak + daily goal** (compact)

## Library segments

- Materials  
- Flashcard decks  
- Quizzes  
- Practice tests  
- Summaries / Notes  

Filter: subject, recent, favorites.

## AI hub

- Open chat (blank + prompt chips)  
- Recent threads  
- Shortcut: Chat with material…  
- FAB: Camera solve  

## You

- Goals / study plan  
- Stats  
- Language  
- Notifications  
- Account / logout  
- Legal  

## Deep links (later)

`academe://material/{id}` · `academe://review` · `academe://chat` · store QR → install → optional deferred deep link
