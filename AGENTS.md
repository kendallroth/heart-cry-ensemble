# Agent Guide for Heart Cry

> Last reviewed: 2026-11-23

This is the first file an AI agent (Claude, Copilot, Cursor, etc.) should read when working in this repo. It's a map, not an exhaustive manual, intended to point in the correct direction for specific followup; use the links to the files that own them.

## Major Rules

1. **Don't invent repository facts.** If you're not sure how something works, say what must be checked rather than guess. Read the file, check types, use grep, etc. The code is the source of truth; these docs only point at it!
2. **Prefer existing patterns over inventing new ones.** Most partial features/work already have a canonical implementation.
3. **Be concise, specific, implementation-oriented.** A short response with a file path beats a long response with a paraphrase.
4. **Comments capture WHY, not WHAT.** Comments should not simply explain what the code does, but rather why it is required. Hidden constraints and surprising behaviour get a comment; easily understandable variables and workflows do not.
5. **Match the surrounding code's voice.** Naming, file layout, error handling, logging, and idiom should be locally consistent.

### Ask-First Constraints

Things the agent must not do without explicit user approval. These would be inferred incorrectly from the codebase alone, so they need to be stated.

- **Never edit an applied migration.** Once a migration has run on staging or another dev's machine it is considered immutable, as edits introduce silent divergence across environments. Add a new migration instead.
- **Never push to `main`, `staging`, `production`, or a shared feature branch without approval.** The first push of your own new branch is fine as it creates an isolated remote ref.
- **Never force-push, `git reset --hard`, or delete branches without approval.** Even on your own branch as the user may have local context you can't see.
- **Don't bypass git hooks (`--no-verify`).** If a hook fails, fix the underlying issue.
- **Don't open PRs or send any external message on behalf of the user** without instruction.

## Where to go next

These are the files an agent will need to read in the course of work (linked to avoid duplication).

> [!Warning]
> Work in progress!

| For…        | Read…    |
| ----------- | -------- |
| _something_ | _a link_ |

## Working with these docs

Two ways an agent should interact with this guide.

1. **As a reader, lazily.** Don't load everything on first contact. Read this file plus the author-instruction file that matches the work at hand. Follow other links only when the current task hits a question they would answer.
2. **As a writer, on prompt.** At natural checkpoints (ie. end of a meaningful unit of work, before a commit) propose doc updates when:
   - A new pattern was introduced that other features will likely follow.
   - A non-obvious bug was debugged.
   - A user decision resolved an ambiguity future agents will hit (suggest documenting it).
   - File or directory moves invalidated paths referenced here (flag the stale paths).

**Default is don't auto-update.** Surface the opportunity in one sentence; let the user decide.

## Stack at a glance

There is one primary top-level codebase (`web`).

- **`web/`:** Frontend app (Nuxt, Vue 3, TypeScript, TailwindCSS)

## Common commands

Subproject common commands can be found in their respective files, such as `web/package.json`.

- **Web**
  - `npm run dev`, `npm run code:type`, `npm run code:format`, `npm run code:lint`, `npm run build`, etc.

## Before proposing a commit

Run these locally before suggesting `git commit`. Each is fast and catches the bulk of pre-PR issues:

- **Web changes:** run `npm run code:type`, `npm run code:lint:fix`, and `npm run code:format`.
- **Any changes:** grep the diff for stray `console.log`, `debugger`, and commented-out blocks introduced by the change.
- **Confirm the branch** before staging changes (never assume).
