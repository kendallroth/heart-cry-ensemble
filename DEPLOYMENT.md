## Deployment

> [!Note]
> Only intended for human/manual deployments; AI agents should never attempt any changes documented in this file!

- Web is deployed on Netlify

### Environment Provisioning

#### GitHub

- Add environment-specific secrets
  - `NETLIFY_BUILD_HOOK_URL`: Netlify build hook URL

#### Netlify

- Setup custom domain and SSL (may require DNS modifications)
- Configure build settings
  - Generate build URL for CI
- Configure branch-based deploy settings
  - However, these should be largely "ignored" in favour of CI-triggered builds

### Deployments

> [!Tip]
> Regardless of auto/manual deployment, consider backing up Pocketbase instance prior to releases with migrations! Backups should be uploaded to GCP backup bucket.

#### Deployment Pipeline

Pushing to `staging`/`production` automatically deploys web (via [`GitHub Action`](.github/workflows/deployment.yaml)). _This workflow can also be manually triggered._

- Triggers Netlify build and deployment
  - Uses configured build hook URL
  - _Disabled Netlify auto-builds (via `netlify.toml`) since they occasionally skip branch-based auto-deployments!_

#### Manual Updates

##### Web

- Build website with `npm run generate`
  - Set `TZ=America/Toronto` environment variable for `npm run generate` command to use most common visitor timezone for pregenerated/static time-based content
- Publish website with `netlify` CLI
  - ie. `netlify deploy --dir=web/.output --prod --no-build`
