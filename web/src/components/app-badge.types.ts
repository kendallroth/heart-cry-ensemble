import type {AppButtonProps} from "./app-button.types";

// NOTE: Must be a type alias (not 'interface extends Pick<...>'), as the Vue SFC compiler cannot
//         resolve utility types in 'extends' clauses of externally imported prop interfaces.
export type AppBadgeProps = Pick<
  AppButtonProps,
  "color" | "iconPrepend" | "iconAppend" | "rounded" | "size" | "variant"
> & {
  text: string;
};
