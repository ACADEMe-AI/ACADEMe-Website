# Source

This skill is adapted from:

- Repo: https://github.com/JCodesMore/ai-website-cloner-template
- Upstream skill: `.claude/skills/clone-website/SKILL.md` on `master`
- License: MIT

The Grok copy maps Claude-specific conventions (`$ARGUMENTS`, native worktrees, Chrome MCP) onto Grok tools (`spawn_subagent` with `isolation: "worktree"`, Chrome DevTools MCP via `search_tool` / `use_tool`). The extraction pipeline, isolation rules, and spec contract stay the same.

When the upstream skill changes, re-read the raw file and update `SKILL.md` — do not let this note become a second copy of the workflow.
