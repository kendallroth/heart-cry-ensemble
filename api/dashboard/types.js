/*
 * Define various types for dashboard utilities
 */

// NOTE: Order here defines order in dashboard
const pages = ["homePage", "aboutPage"];
const lists = [
  { label: "Members", value: "member" },
  { label: "Seasons", value: "season" },
];
const listValues = lists.map((l) => l.value);

export default {
  // List (collection) types
  collectionTypes: listValues,
  collectionTypesExtended: lists,
  // Page types (subset of singleton types)
  pageTypes: pages,
  // Types that cannot be created/deleted (should only be one)
  singletonTypes: ["siteSettings", ...pages],
};
