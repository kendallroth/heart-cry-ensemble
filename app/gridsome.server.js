// Utilities
const config = require("./config");

module.exports = function (api) {
  api.loadSource((store) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    store.addMetadata("sanityOptions", config.sanity);
  });

  api.createPages(({ createPage }) => {
    // Members page (optional filter)
    createPage({
      path: "/members/:filter",
      component: "./src/pages/Members.vue",
    });
  });
};
