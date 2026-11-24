# Heart Cry Ensemble

## Stack

The website is created with [Vue](https://vuejs.org), compiled into a static site using [Nuxt](https://nuxt.com), and deployed with [Netlify](https://netlify.com). The content is currently hardcoded but will eventually be managed with [Sanity](https://sanity.io).

## Development

### Prerequisites

- Node (NPM)
- _Netlify CLI (deployment)_

### Overview

After cloning the repository, install the dependencies in the web project with `npm install`. The web project can be started (from its respective folder) with `npm run dev`, or `npm run dev:host` to expose on the local network.

## Deployment

Netlify automatically deploys the website whenever a `push` is made to `staging`/`production` (via GitHub Action that triggers a Netlify build hook).

> While deployments can also be created manually from the Netlify CLI, they should preferably be created via pull requests.
