/**
 * Shared "current time" (epoch milliseconds), safe for static generation
 *
 * NOTE: Statically generated pages are rendered at build time, so any `new Date()` in a render is
 *         baked into the HTML. Hydration does not correct mismatched classes/attributes, so this value
 *         is serialized in the payload (build time) to ensure hydration matches, and then updated to
 *         the real time once the app has mounted (see 'now.client.ts' plugin), triggering a re-render.
 */
export const useNow = () => useState<number>("now", () => Date.now());
