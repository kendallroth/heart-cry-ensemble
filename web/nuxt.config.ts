import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";

const getAliasPath = (path: string) =>
  fileURLToPath(new URL(path, import.meta.url));

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/fonts", "@nuxt/image", "@nuxtjs/color-mode"],

  // Path aliases are automatically added to TypeScript. However, some non-JS imports still require
  //   '~' prefix, rendering alternative formats (ie. '#') less useful.
  alias: {
    "#": getAliasPath("/src"),
  },
  app: {
    head: {
      link: [{ rel: "icon", href: "/favicon.png" }],
      title: "Heart Cry Ensemble",
    },
    rootAttrs: {
      class: "flex flex-col w-full min-h-screen",
    },
  },
  compatibilityDate: "2025-07-15",
  components: [
    {
      path: "~/components",
      // Path prefixing gets rather rigid quickly...
      pathPrefix: false,
    },
  ],
  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  imports: {
    dirs: ["~/modules/**"],
  },
  srcDir: "src/",
  // Must enable SSR for pre-rendered static routes/pages
  ssr: true,
  runtimeConfig: {
    // Client-side runtime configuration
    public: {
      email: "info@heartcryensemble.ca",
    },
  },
  typescript: {
    strict: true,
    // NOTE: Enabling type checking during development causes version errors with vitest
    typeCheck: "build",
  },
  vite: {
    plugins: [tailwindcss()],
  },

  //////////////////////////////////////////////////////////////////////////////////////////////////
  // Module configuration
  //////////////////////////////////////////////////////////////////////////////////////////////////

  colorMode: {
    preference: "system",
    fallback: "light",
    storage: "localStorage",
    storageKey: "hce-color-mode",
  },
  fonts: {
    families: [
      // Variable weight font (only supports 400 - 700)
      { name: "Instrument Sans", weights: ["400 700"], provider: "google" },
    ],
  },
});
