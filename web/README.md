# Web app

## TODOs

- Project documentation
- Enable linting import order rules (import-x supported by Nuxt already)
- Finish dark theme
  - Implement inversion styling
- Fetch data from Sanity
  - Automatically type data
- Configure for static site generation (vs SSR)
- Display season members

## Caveats

Occasionally recently added Nuxt auto-imports will not be detected by VS Code linting, which may require restarting the ESLint server to pick up the updated types. This will frequently surface as lint errors regarding "unsafe access" or "implicit" any (in VS Code only).
