// @ts-check
import withNuxt from "./.nuxt/eslint.config.mjs";

import skipFormattingConfig from "@vue/eslint-config-prettier/skip-formatting";

export default withNuxt(
  // Nuxt already excludes files listed in .gitignore
  // includeIgnoreFile(gitignorePath, { gitignoreResolution: true }),

  skipFormattingConfig,

  // TypeScript rules must be scoped to TS-capable files (plain JS files lack TS parser)
  // NOTE: Enabling type-aware linting rules enables more powerful linting, but can significantly slow
  //         down the linting process (typically only affects CLI execution, as IDEs cache results).
  {
    files: ["**/*.ts", "**/*.vue"],
    rules: {
      // Types should be imported inline with other imports but with 'type' specifier
      "@typescript-eslint/consistent-type-imports": ["warn", {fixStyle: "inline-type-imports"}],
      // While explicitly using 'any' is permissible, it should be avoided whenever possible (ignores type safety)
      "@typescript-eslint/no-explicit-any": "warn",
      // Type-only imports must use top-level `import type`, as an inline `{type X}` will still load the module
      "@typescript-eslint/no-import-type-side-effects": "warn",
      "@typescript-eslint/no-inferrable-types": "warn",
      "@typescript-eslint/no-unused-vars": ["warn", {argsIgnorePattern: "^_"}],
      "@typescript-eslint/prefer-nullish-coalescing": [
        "warn",
        {
          // Allow empty strings to bypass nullish coalescing check
          ignorePrimitives: {string: true},
        },
      ],
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/restrict-template-expressions": ["warn", {allowNumber: true}],
      // Returning an async call within try/catch requires an 'await' keyword to be able to handle errors!
      "@typescript-eslint/return-await": ["error", "in-try-catch"],
      // Disabled to avoid rule conflict with '@typescript-eslint/return-await'
      "no-return-await": "off",
    },
  },
  {
    rules: {
      // Console statements should be avoided where possible (prefer explicit logging)
      "no-console": "warn",
      "no-useless-assignment": "warn",
      "prefer-const": "warn",
      "vue/attributes-order": ["warn", {alphabetical: true}],
      "vue/html-self-closing": "off",
      "vue/no-unused-vars": "warn",
      // Avoid "overriding" props with locally declared variables
      "vue/no-props-shadow": "warn",
    },
  },
);
