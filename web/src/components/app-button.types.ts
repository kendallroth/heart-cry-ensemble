import type {Component} from "vue";
import type {RouteLocationRaw} from "vue-router";

// NOTE: Component prop types live in '.ts' files, as type-aware ESLint cannot resolve named type
//         exports from '.vue' files (they are typed as 'any' via the generic '*.vue' module shim).

export const baseThemeColors = [
  "primary",
  "accent",
  "accent-light",
  "warning",
  "error",
  "background",
  "surface",
] as const;

type BaseThemeColor = (typeof baseThemeColors)[number];
export type AppButtonThemeColor = BaseThemeColor | `on-${BaseThemeColor}`;
export type AppButtonRounded = "none" | "sm" | "md" | "lg" | "full";
export type AppButtonSize = "xs" | "sm" | "md" | "lg";
export type AppButtonVariant = "elevated" | "flat" | "tonal" | "outlined" | "text";

export interface AppButtonProps {
  /** Whether to show active links (defaults to router active link state) */
  active?: boolean;
  /** Additional classes applied to active links (limited to `string` by `NuxtLink`) */
  activeClass?: string;
  block?: boolean;
  /** Theme color (ie. 'primary', 'on-primary') or any CSS color (text color is automatically chosen for contrast) */
  color?: AppButtonThemeColor | (string & {});
  disabled?: boolean;
  /** Icon-only button (ignores text/slot, with text used as accessible label) */
  icon?: Component;
  iconAppend?: Component;
  iconPrepend?: Component;
  /** Keeps appearance but removes all interactions */
  readonly?: boolean;
  rounded?: AppButtonRounded;
  /** Button height (shared by text and icon buttons) */
  size?: AppButtonSize;
  target?: string;
  /** Alternative to default slot */
  text?: string;
  /** Text color override (defaults to theme color pair or automatic contrast for custom colors) */
  textColor?: string;
  /** Internal/router link (rendered with 'NuxtLink') */
  to?: RouteLocationRaw;
  type?: "button" | "submit" | "reset";
  variant?: AppButtonVariant;
}
