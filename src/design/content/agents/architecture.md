# Architecture

Full text: `design/agent/ARCHITECTURE-PRINCIPLES.md` in this repo.

## The app (Flutter)

MVVM in two layers, from the app's `AGENTS.md`:

```
ui/<feature>/widgets       views, dumb
ui/<feature>/view_models   ChangeNotifier per feature
data/repositories          source of truth, business logic
data/services              one per outside source (API, storage)
domain/models              immutable models shared by both
ui/core/themes             app_theme.dart, the only place for colours, type, radii
ui/core/ui                 shared widgets: AppButton, Keycap, Pebby, ...
```

Backend: Go in `server/`, at `api.academe.cc`.

## This site (React + Vite)

```
src/                  marketing site: 3D phone scroll story, loader, sections
src/design/           this design system, mounted at /design
src/design/content/   the markdown pages you're reading
public/brand/         academe_cube.png, logo_mark.png (copied from the app)
public/pebby/         10 Pebby poses
public/fonts/         the app's fonts as woff2
```

## Quality gate

- `pnpm typecheck` and `pnpm build` pass
- No colours or fonts outside the app's set
- No comments, no other app names
- Pages render without console errors and every image loads
