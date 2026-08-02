# ACADEMe Design System Site

Agent-first design docs (pattern: [design.duolingo.com](https://design.duolingo.com/)).

## Run

```bash
# from monorepo root
pnpm dev:design

# or
cd design-site && pnpm install && node node_modules/esbuild/install.js && pnpm dev
```

Open **http://localhost:5174**

Marketing site remains root app on **5173**.

## Agents

Start at **`AGENTS.md`**, then **`content/00-START-HERE.md`**.

## Structure

```
design-site/
  AGENTS.md           ← agent entry
  content/            ← source of truth (markdown)
  src/                ← browse UI
```

## Build

```bash
cd design-site && pnpm build
```
