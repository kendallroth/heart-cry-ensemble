import {breakpointsTailwind, useBreakpoints} from "@vueuse/core";

/**
 * Display breakpoints (matches Tailwind default breakpoints)
 *
 * NOTE: Must be kept in sync with Tailwind breakpoints (ie. if overriding '--breakpoint-*' theme
 *         variables in 'main.css')!
 */
export const displayBreakpoints = breakpointsTailwind;

/**
 * Reactive display breakpoints (based on Tailwind breakpoints)
 *
 * NOTE: Breakpoints are always 'false' during SSR (no 'matchMedia'), so prefer responsive classes
 *         for layout and use this for logic (watchers, handlers) to avoid hydration mismatches.
 */
export const useDisplay = () => {
  const breakpoints = useBreakpoints(displayBreakpoints);

  /** Whether display is below 'lg' breakpoint (matches 'lg:hidden' mobile layout) */
  const mobile = breakpoints.smaller("lg");

  return {...breakpoints, mobile};
};
