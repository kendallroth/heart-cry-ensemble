require("dotenv").config();

const merge = require("webpack-merge");
const path = require("path");

// Utilities
const config = require("./config");

const Paths = {
  src: path.join(__dirname, "src"),
  styles: path.join(__dirname, "src", "assets", "styles"),
};

// NOTE: This wa an attempt to load some stylesheets for all Vue components,
//         but it prevented Bulma from working somehow...
// https://gridsome.org/docs/assets-css/#global-preprocessor-files-ie-variables-mixins
/*function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.join(Paths.styles, "_breakpoints.scss")],
    });
}*/

module.exports = {
  siteName: "Heart Cry Ensemble",
  siteUrl: "https://heartcryensemble.org",
  titleTemplate: "%s",
  icon: "./src/assets/images/HCE-Favicon.png",
  plugins: [
    {
      use: "gridsome-source-sanity",
      options: {
        projectId: config.sanity.projectId,
        dataset: config.sanity.dataset,
        overlayDrafts: false,
        watchMode: false,
        graphqlTag: "default",
      },
    },
  ],
  // NOTE: This broke Bulma configuration for some reason (maybe loading first??)
  /*chainWebpack(config) {
    // Load SCSS variables for all Vue files
    const vueTypes = ["vue-modules", "vue", "normal-modules", "normal"];

    vueTypes.forEach((type) => {
      // addStyleResource(config.module.rule("sass").oneOf(type));
      addStyleResource(config.module.rule("scss").oneOf(type));
    });
  },*/
  configureWebpack(config) {
    return merge(
      {
        resolve: {
          alias: {
            "@": Paths.src,
            "@assets": path.join(Paths.src, "assets"),
            "@components": path.join(Paths.src, "components"),
            "@layouts": path.join(Paths.src, "layouts"),
            "@pages": path.join(Paths.src, "pages"),
            "@styles": path.join(Paths.src, "assets", "styles"),
            "@templates": path.join(Paths.src, "templates"),
          },
        },
      },
      config,
    );
  },
};
