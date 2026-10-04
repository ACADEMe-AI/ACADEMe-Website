# Architecture principles

## The app

The ACADEMe app is Flutter, with a Go backend at `api.academe.cc`. Its rules are in the app repo's `AGENTS.md`. In short:

- **MVVM, two layers.** UI: a view (widgets) and a view model (`ChangeNotifier`) per feature. Data: repositories (source of truth) and services (one per outside source)
- **Domain models** are immutable and shared by both layers
- **Data flows one way:** data layer → view model → view. Events go back as method calls
- **Theme in one place:** `ui/core/themes/app_theme.dart`. No hex literals or raw font sizes in screens
- **Shared widgets** in `ui/core/ui/`: `AppButton`, `Keycap`, `OptionTile`, `Pebby`, `AcademeWordmark`, `Celebration` and others
- **No comments.** Names carry the meaning
- **Done** means analyze, format, tests and a Pixel 10 run all pass

```
lib/
  ui/core/themes/      app_theme.dart
  ui/core/ui/          shared widgets
  ui/<feature>/        view_models/ and widgets/
  domain/models/       immutable models
  data/repositories/   source of truth
  data/services/       API, storage, platform
```

## This website

```
src/                   marketing site: loader, 3D phone scroll story, sections
src/design/            design system app, mounted at /design
src/design/content/    markdown pages, registered in src/design/lib/nav.ts
public/brand/          the app's logo files
public/pebby/          Pebby poses
public/fonts/          the app's fonts as woff2
```

- One persistent WebGL phone; screens are textures from real app captures
- CTA links (the Play URL, support email) live in `src/lib/constants.ts`, not scattered through components
- Keep components small and boring. Add a dependency only when a few lines won't do
- No comments, no other app names, no colours outside the app's set
