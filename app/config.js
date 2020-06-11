const nodeEnv = process.env.NODE_ENV || "development";

module.exports = {
  isDevelopment: nodeEnv === "development",
  google: {
    analyticsId: process.env.GOOGLE_ANALYTICS_ID || "",
  },
  node: {
    env: nodeEnv,
  },
  sanity: {
    projectId: process.env.SANITY_PROJECT_ID || "",
    dataset: process.env.SANITY_DATASET || "production",
  },
};
