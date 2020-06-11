// Utilities
const config = require("./config");

module.exports = function (api) {
  api.loadSource((store) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
    store.addMetadata("sanityOptions", config.sanity);
  });

  // NOTE: Dynamic pages require a Netlify URL redirect rule from this path
  //         to the (single) generated HTML file.
  //   https://gridsome.org/docs/dynamic-routing/#generating-rewrite-rules
  api.createPages(({ createPage }) => {
    // Members page (optional filter)
    createPage({
      path: "/members/:filter",
      component: "./src/pages/Members.vue",
    });
  });
};
