import {normalizeClass, type HTMLAttributes} from "vue";

/**
 * Check whether a `class` prop contains a specific class
 *
 * @param {string} check - Whether to check for exact match or prefix match (default: `startsWith`)
 */
export const hasClass = (
  classProp: HTMLAttributes["class"],
  className: string,
  check: "equals" | "startsWith" = "startsWith",
) => {
  const resolvedClass = normalizeClass(classProp);
  const splitClasses = resolvedClass.split(/\s+/);

  return check === "equals"
    ? splitClasses.includes(className)
    : splitClasses.some((c) => c.startsWith(className));
};
