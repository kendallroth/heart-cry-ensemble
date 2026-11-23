/** Refresh interval for shared "now" (keeps long-lived pages accurate across day boundaries) */
const NOW_REFRESH_INTERVAL_MS = import.meta.dev ? 5000 : 5 * 60 * 1000;

export default defineNuxtPlugin((nuxtApp) => {
  // Must only update after hydration (build-time value is used for hydration to avoid mismatches)
  nuxtApp.hook("app:mounted", () => {
    const now = useNow();
    now.value = Date.now();
    setInterval(() => {
      now.value = Date.now();
    }, NOW_REFRESH_INTERVAL_MS);
  });
});
