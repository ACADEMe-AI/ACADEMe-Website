# ACADEMe design

The design system lives in `src/design/content/` and is served at `/design` (`pnpm dev`, then http://localhost:3010/design). Start at `src/design/content/00-START-HERE.md`.

The ACADEMe app is the source of truth for colours, fonts, logos, Pebby and product facts:

| What | Where in the app repo |
|------|-----------------------|
| Colours, radii, keycap, text styles | `lib/ui/core/themes/app_theme.dart` |
| Fonts and engineering rules | `AGENTS.md` |
| USPs, pillars, pricing | `tasks/strategy.md` |
| What's built and what's next | `tasks/roadmap.md` |
| Logo files, Pebby art | `assets/academe/` |

## This folder

```
design/
  README.md                        this file
  agent/GUARDRAILS.md              product, design and agent rules
  agent/ARCHITECTURE-PRINCIPLES.md how the app and this site are built
```

Older planning docs (colour scheme options, mascot explorations, the upload-product roadmap and USPs, screen inventories) were removed. They described a product that no longer exists. The current versions are the pages in `src/design/content/`.
