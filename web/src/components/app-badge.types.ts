import type {AppButtonProps} from "./app-button.types";

export interface AppBadgeProps extends Pick<
  AppButtonProps,
  "color" | "iconPrepend" | "iconAppend" | "rounded" | "size" | "variant"
> {
  text: string;
}
