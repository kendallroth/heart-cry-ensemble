# Heart Cry Ensemble

Website for the Heart Cry Ensemble

## Stack

The project utilizes the [JAMstack](https://jamstack.org) idealogy to provide a modern web experience. The website is created with [Vue](https://vuejs.org), compiled into a static site using [Gridsome](https://gridsome.org), and deployed with [Netlify](https://netlify.com). The content is managed with [Sanity](https://sanity.io) and deployed with [Netlify](https://netlify.com).

## Development

Developing the Heart Cry Ensemble website requires a few prerequisites:

- Node (NPM)
- Gridsome CLI
- Sanity CLI
- _Netlify CLI (deployment)_

The repository consists of 3 "projects," each representing a different portion of the site. The root project handles everything related to shared development (linting, etc). The `app` project handles the actual website app and deployment, while the `api` project handles the API schema and deployment.

After cloning the repository, install the dependencies in all 3 projects with `npm install`. Ensure that a local `.env` file exists in the `app`, while a local `.env.development` exists in the `api`. These environment files are necessary to provide configuration variables to the projects! Both projects can be started (from their respective folders) with `npm start`, which will compile the scripts and start a local instance of the website and data studio. Changes will be automatically handled and synced to the browser.

> **NOTE:** The GraphQL API must be compiled and deployed after every change to the Sanity models!

## Deployment

Netlify automatically deploys both the website and content management portal whenever a `push` is made to `main`. This means that the deployment process simply involves merging changes into `main`, resulting in a new deployment. All new production deployments should increase the version number, via semantic versioning, of all 3 `package.json` files.

> While deployments can also be created manually from the Netlify CLI, they should only be created via merge requests.

> Additionally, merge requests will create a preview deployment to validate changes before merging. However, if the API is not up to date it may cause presentation issues or unexpected behaviour!

### GraphQL API

The GraphQL API is managed separately (by [Sanity.io](https://sanity.io)) and must be deployed separately as a result. After a production release, run the following script to deploy the GraphQL API. This will deploy the GraphQL API to a Sanity.io endpoint and create a GraphQL Playground environment.

```bash
npm run graphql:deploy
```
