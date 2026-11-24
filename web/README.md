# Heart Cry Ensemble (web)

## Setup

> [!NOTE]
> Work in progress

```bash
# Install dependencies
npm install
```

## Development

```bash
# Start web dev server
npm run dev

# View local production build
npm run preview

# Generate static site
npm run generate
```

## TODOs

- Add music/releases page (see Claude design)
- Investigate Netlify integration with Nuxt
- Project documentation
  - Update overhaul PRs
- Enable linting import order rules (import-x supported by Nuxt already)
- Fetch data from Sanity
  - Automatically type data
- Consider displaying _current_ season member locations (past seasons will get out-of-date)

## Caveats

Occasionally recently added Nuxt auto-imports will not be detected by VS Code linting, which may require restarting the ESLint server to pick up the updated types. This will frequently surface as lint errors regarding "unsafe access" or "implicit" any (in VS Code only).
