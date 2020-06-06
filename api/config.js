module.exports = {
  netlify: {
    app: {
      buildHookId: process.env.SANITY_STUDIO_NETLIFY_APP_BUILD_HOOK_ID || "",
      projectId: process.env.SANITY_STUDIO_NETLIFY_APP_PROJECT_ID || "",
      projectName: process.env.SANITY_STUDIO_NETLIFY_APP_PROJECT_NAME || "",
    },
  },
};
