import landscape from "./placeholder_landscape.png";
import landscapeError from "./placeholder_landscape_error.png";
import square from "./placeholder_square.png";
import squareError from "./placeholder_square_error.png";

export type PlaceholderType = "square" | "landscape";

/** Placeholder images (statically imported to guarantee existence at build time) */
const placeholders: Record<PlaceholderType, {default: string; error: string}> = {
  landscape: {default: landscape, error: landscapeError},
  square: {default: square, error: squareError},
};

/**
 * Get placeholder image URL
 *
 * @param type  - Placeholder layout type
 * @param error - Whether to use error placeholder image (red)
 */
export const getPlaceholder = (type: PlaceholderType = "square", error = false): string => {
  return placeholders[type][error ? "error" : "default"];
};
