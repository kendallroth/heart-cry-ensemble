<template>
  <component
    :is="tag"
    class="btn relative items-center justify-center shrink-0 font-medium select-none whitespace-nowrap"
    :class="[
      `btn--${variant}`,
      roundedClasses[rounded],
      block ? 'flex w-full' : 'inline-flex',
      sizeClasses[size].height,
      icon ? 'aspect-square' : sizeClasses[size].content,
      {
        'btn--active': active === true,
        'btn--disabled': disabled,
        'btn--readonly': readonly,
      },
    ]"
    :style="colorStyle"
    v-bind="tagAttrs"
  >
    <component :is="icon" v-if="icon" v-bind="iconAttrs" />
    <template v-else>
      <component :is="iconPrepend" v-if="iconPrepend" v-bind="iconAttrs" />
      <slot name="default">{{ text }}</slot>
      <component :is="iconAppend" v-if="iconAppend" v-bind="iconAttrs" />
    </template>
  </component>
</template>

<script lang="ts" setup>
import {
  type AppButtonProps,
  type AppButtonRounded,
  type AppButtonSize,
  baseThemeColors,
} from "./app-button.types";

const NuxtLink = resolveComponent("NuxtLink");

const props = withDefaults(defineProps<AppButtonProps>(), {
  // Must be explicitly 'undefined' to avoid boolean casting (enables router active state)
  active: undefined,
  activeClass: undefined,
  block: false,
  color: "primary",
  disabled: false,
  icon: undefined,
  iconAppend: undefined,
  iconPrepend: undefined,
  readonly: false,
  rounded: "full",
  size: "md",
  target: undefined,
  text: undefined,
  textColor: undefined,
  to: undefined,
  type: "button",
  variant: "elevated",
});

const roundedClasses: Record<AppButtonRounded, string> = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

const sizeClasses: Record<AppButtonSize, {height: string; icon: string; content: string}> = {
  xs: {
    content: "gap-1 px-2 text-xs",
    height: "h-6",
    icon: appIcons.sizeClasses.xs,
  },
  sm: {
    content: "gap-1.5 px-3 text-sm",
    height: "h-8",
    icon: appIcons.sizeClasses.sm,
  },
  md: {
    content: "gap-2 px-4 text-base",
    height: "h-10",
    icon: appIcons.sizeClasses.md,
  },
  lg: {
    content: "gap-2 px-6 text-lg",
    height: "h-12",
    icon: appIcons.sizeClasses.lg,
  },
};

// NOTE: Expects all base theme colors to have a corresponding 'on-' variant (which is reasonable)
const allThemeColors = new Set<string>(baseThemeColors.flatMap((color) => [color, `on-${color}`]));

/** Whether button uses non-theme color (ie. any CSS color) */
const isCustomColor = computed(() => !allThemeColors.has(props.color));

/**
 * Button colors are only set when known, as CSS falls back to automatic text contrast when the
 *   text color is unset (custom colors) or invalid (theme colors missing an 'on-' pair).
 */
const colorStyle = computed(() => {
  if (isCustomColor.value) {
    return {
      "--btn-color": props.color,
      "--btn-on-color": props.textColor,
    };
  }

  // Theme colors are paired with their counterpart (ie. 'primary' <-> 'on-primary')
  const baseColor = props.color.replace(/^on-/, "");
  const pairColor = baseColor === props.color ? `on-${baseColor}` : baseColor;
  return {
    "--btn-color": `var(--color-${props.color})`,
    "--btn-on-color": props.textColor ?? `var(--color-${pairColor})`,
  };
});

const iconAttrs = computed(() => ({
  "aria-hidden": "true",
  class: ["shrink-0", sizeClasses[props.size].icon],
}));

const isLink = computed(() => !!props.to);

/**
 * Disabled/readonly links render without link to prevent navigation, while readonly buttons
 * render without button to prevent focus/clicks.
 */
const tag = computed(() => {
  if (isLink.value) {
    return props.disabled || props.readonly ? "span" : NuxtLink;
  }
  return props.readonly ? "span" : "button";
});

const tagAttrs = computed(() => {
  // Icon-only buttons use text as accessible label
  const baseAttrs = {"aria-label": props.icon ? props.text : undefined};

  if (tag.value === NuxtLink) {
    return {
      ...baseAttrs,
      // Router active state is only used when not explicitly controlled
      activeClass:
        props.active === undefined ? ["btn--active", props.activeClass].filter(Boolean).join(" ") : undefined,
      to: props.to,
      target: props.target,
    };
  }
  if (tag.value === "button") {
    return {
      ...baseAttrs,
      disabled: props.disabled,
      type: props.type,
    };
  }
  return {
    ...baseAttrs,
    "aria-disabled": props.disabled || undefined,
    role: isLink.value ? "link" : undefined,
  };
});
</script>

<style scoped>
/*
 * Button color CSS variables ('--btn-color', '--btn-on-color') are set by bound 'style' attribute
 *   to provide the usable color values, which are used to set the CSS variables ('--btn-bg',
 *   '--btn-fg', '--btn-border') that are actually used by markup (based on variant, etc).
 */

.btn {
  /* Automatic black/white text based on lightness (used when '--btn-on-color' is unset/invalid) */
  --btn-on-color-auto: var(--color-on-primary, white);

  background-color: var(--btn-bg, transparent);
  /* Border always present (transparent when unused) to keep variant sizes consistent */
  border: 1px solid var(--btn-border, transparent);
  color: var(--btn-fg);
  cursor: pointer;
  /* Avoid Tailwind transition due to specific properties required */
  transition-duration: 150ms;
  transition-property: background-color, border-color, box-shadow, color;
  transition-timing-function: ease;
}
@supports (color: oklch(from red l c h)) {
  .btn {
    --btn-on-color-auto: oklch(from var(--btn-color) clamp(0, (0.65 - l) * 1000, 1) 0 0);
  }
}

/* Variants */
.btn--elevated,
.btn--flat {
  --btn-bg: var(--btn-color);
  --btn-fg: var(--btn-on-color, var(--btn-on-color-auto));
}
.btn--elevated:not(.btn--disabled, .btn--readonly):hover {
  box-shadow:
    0 10px 16px -4px rgb(0 0 0 / 0.25),
    0 4px 6px -4px rgb(0 0 0 / 0.2);
}
/* Pressing settles back to resting shadow (must follow hover to override it) */
.btn--elevated,
.btn--elevated:not(.btn--disabled, .btn--readonly):active {
  box-shadow:
    0 4px 8px -2px rgb(0 0 0 / 0.2),
    0 2px 4px -2px rgb(0 0 0 / 0.15);
}
.btn--tonal {
  --btn-bg: color-mix(in srgb, var(--btn-color) 15%, transparent);
  --btn-fg: var(--btn-color);
}
.btn--outlined {
  --btn-border: currentColor;
  --btn-fg: var(--btn-color);
}
.btn--text {
  --btn-fg: var(--btn-color);
}

/* Interaction overlay (uses text color to remain visible across all variants) */
.btn::before {
  background-color: currentColor;
  border-radius: inherit;
  content: "";
  inset: 0;
  opacity: 0;
  pointer-events: none;
  position: absolute;
  transition: opacity 150ms ease;
}
.btn--active:not(.btn--disabled, .btn--readonly)::before,
.btn:not(.btn--disabled, .btn--readonly):hover::before,
.btn:not(.btn--disabled, .btn--readonly):focus-visible::before {
  opacity: 0.15;
}
.btn:not(.btn--disabled, .btn--readonly):active::before {
  opacity: 0.25;
}
.btn:focus-visible {
  outline: 2px solid var(--btn-color);
  outline-offset: 2px;
}

/* Disabled (gray derived from surrounding text color to remain visible on any background) */
.btn--disabled {
  /* 'currentColor' within 'color' resolves to the inherited (parent) text color */
  --btn-fg: color-mix(in srgb, currentColor 40%, transparent);
  box-shadow: none;
  cursor: not-allowed;
}
.btn--disabled.btn--elevated,
.btn--disabled.btn--flat,
.btn--disabled.btn--tonal {
  /* Relative to the (already 40%) text color, giving ~12% of the context color */
  --btn-bg: color-mix(in srgb, currentColor 30%, transparent);
}
.btn--disabled.btn--outlined {
  /* ~20% of the context color */
  --btn-border: color-mix(in srgb, currentColor 50%, transparent);
}

.btn--readonly {
  cursor: default;
  pointer-events: none;
}
</style>
