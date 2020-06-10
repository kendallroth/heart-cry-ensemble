require("dotenv").config();

const merge = require("webpack-merge");
const path = require("path");

// Utilities
const config = require("./config");

const Paths = {
  src: path.join(__dirname, "src"),
  styles: path.join(__dirname, "src", "assets", "styles"),
};

const siteName = "Heart Cry Ensemble";

// Provide the "_vars" SCSS file to all components
// Taken from: https://gridsome.org/docs/assets-css/#global-preprocessor-files-ie-variables-mixins
const globalScssFiles = ["_vars", "_breakpoints", "_mixins"];
const globalScssPaths = globalScssFiles.map((f) =>
  path.resolve(`./src/assets/styles/${f}.scss`),
);
function addStyleResource(rule) {
  rule.use("style-resource").loader("style-resources-loader").options({
    patterns: globalScssPaths,
  });
}

module.exports = {
  siteName,
  siteUrl: "https://heartcryensemble.org",
  titleTemplate: "%s",
  icon: "./src/favicon.png",
  plugins: [
    {
      use: "gridsome-source-sanity",
      options: {
        projectId: config.sanity.projectId,
        dataset: config.sanity.dataset,
        // NOTE: This seems to not work for some reason
        overlayDrafts: false,
        // NOTE: Running this in production will cause builds to fail (hang)
        watchMode: process.env.NODE_ENV === "development",
        graphqlTag: "default",
      },
    },
    {
      use: "gridsome-plugin-pwa",
      options: {
        title: siteName,
        shortName: "Heart Cry",
        categories: ["choral"],
        lang: "en-US",
        //startUrl: "/",
        //display: "standalone",
        //statusBarStyle: "default",
        disableServiceWorker: false,
        //cachedFileTypes: "js,json,css,html,png,jpg,jpeg,svg",
        themeColor: "#444444",
        backgroundColor: "#ffffff",
        // Must be provided like "src/favicon.png"
        icon: "src/favicon.png",
        maskableIcon: true,
      },
    },
  ],
  chainWebpack(config) {
    const types = ["vue-modules", "vue", "normal-modules", "normal"];

    types.forEach((type) => {
      addStyleResource(config.module.rule("scss").oneOf(type));
      addStyleResource(config.module.rule("sass").oneOf(type));
    });
  },
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
            "@utilities": path.join(Paths.src, "utilities"),
          },
        },
      },
      config,
    );
  },
};
