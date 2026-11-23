# Web app

## TODOs

- Configure for static site generation (vs SSR)
  - Investigate using Nuxt route registration for all season routes (vs relying on hardcoded links)
- Handle images failing to load
- Project documentation
- Enable linting import order rules (import-x supported by Nuxt already)
- Fetch data from Sanity
  - Automatically type data
- Consider displaying _current_ season member locations (past seasons will get out-of-date)

## Caveats

Occasionally recently added Nuxt auto-imports will not be detected by VS Code linting, which may require restarting the ESLint server to pick up the updated types. This will frequently surface as lint errors regarding "unsafe access" or "implicit" any (in VS Code only).
