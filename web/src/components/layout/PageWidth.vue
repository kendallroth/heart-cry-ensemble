<template>
  <section :class="[props.class, classString]">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

type PageAlign = "center" | "stretch";

type PageWidth = keyof typeof pageWidthClasses;

type PagePadding = keyof typeof pagePaddingClasses;

/** Flex-based props (ie. direction, etc) should use Tailwind classes for better responsive design */
interface PageWidthProps {
  /**
   * Child item alignment
   *
   * NOTE: Only intended to be set if identical in desktop/mobile (otherwise use raw classes)!
   */
  align?: PageAlign;
  class?: HTMLAttributes["class"];
  /** Horizontal padding */
  padding?: PagePadding;
  /** Maximum width */
  width?: PageWidth;
}

const props = withDefaults(defineProps<PageWidthProps>(), {
  align: undefined,
  padding: "md",
  width: "md",
});

const pageAlignClasses: Record<PageAlign, string> = {
  center: "items-center",
  stretch: "items-stretch",
};

const classString = computed(() => {
  const classes = ["flex w-full mx-auto"];
  if (props.align) {
    classes.push(pageAlignClasses[props.align]);
  }
  classes.push(pagePaddingClasses[props.padding]);
  classes.push(pageWidthClasses[props.width]);
  return classes.join(" ");
});
</script>
