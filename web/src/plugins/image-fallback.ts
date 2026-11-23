import type {Directive} from "vue";

import {getPlaceholder, type PlaceholderType} from "~/assets/images/image.utils";

/**
 * Store placeholder type on element (`data-placeholder`) for shared error handler
 *
 * NOTE: Shared handler is required for a stable listener reference (removal), and reading type from
 *         element ensures binding value changes are respected.
 */
const setPlaceholderType = (el: HTMLImageElement, type: PlaceholderType | undefined) => {
  el.dataset.placeholder = type ?? "square";
};

const applyFallback = (el: HTMLImageElement) => {
  const fallback = getPlaceholder(el.dataset.placeholder as PlaceholderType | undefined, true);
  // Avoid infinite error loop if placeholder itself fails to load
  if (el.src === fallback || el.getAttribute("src") === fallback) return;

  el.src = fallback;
};

const onError = (e: Event) => {
  applyFallback(e.target as HTMLImageElement);
};

/**
 * Replace image with placeholder if it fails to load
 *
 * NOTE: Handles failures before hydration (SSR), where Vue `@error` listeners are not yet attached
 *         and missed `error` events are not replayed.
 *
 * @example <img v-image-fallback="'landscape'" :src="url" />
 */
const imageFallback: Directive<HTMLImageElement, PlaceholderType | undefined> = {
  mounted(el, {value}) {
    setPlaceholderType(el, value);
    el.addEventListener("error", onError);

    // Image may have already failed before hydration (SSR)
    if (el.complete && el.naturalWidth === 0 && el.getAttribute("src")) {
      applyFallback(el);
    }
  },
  updated(el, {value}) {
    setPlaceholderType(el, value);
  },
  beforeUnmount(el) {
    el.removeEventListener("error", onError);
  },
};

// NOTE: Must be registered universally (not client-only) so SSR can resolve the directive
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("image-fallback", imageFallback);
});

declare module "vue" {
  interface GlobalDirectives {
    vImageFallback: typeof imageFallback;
  }
}
