module.exports = {
  google: {
    analyticsId: process.env.GOOGLE_ANALYTICS_ID || "",
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
  },
};
