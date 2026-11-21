<template>
  <section class="page-width relative flex w-full mx-auto" :class="[props.class, classString, tileClass]">
    <slot />
  </section>
</template>

<script lang="ts" setup>
import type {HTMLAttributes} from "vue";

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
  /**
   * Classes for background "tile" pseudo-element (still requires `before:` class prefix!)
   *
   * NOTE: Applying `before:` classes to primary `class` prop will not trigger the tile pseudo-element!
   *
   * @example 'before:bg-primary lg:before:inset-x-2 lg:before:rounded-2xl'
   */
  tileClass?: HTMLAttributes["class"];
  /** Maximum width */
  width?: PageWidth;
}

const props = withDefaults(defineProps<PageWidthProps>(), {
  align: undefined,
  class: undefined,
  padding: "md",
  tileClass: undefined,
  width: "md",
});

const pageAlignClasses: Record<PageAlign, string> = {
  center: "items-center",
  stretch: "items-stretch",
};

const classString = computed(() => {
  const classes = [];
  if (props.align) {
    classes.push(pageAlignClasses[props.align]);
  }
  classes.push(pagePaddingClasses[props.padding]);
  classes.push(pageWidthClasses[props.width]);
  if (props.tileClass) {
    // Isolate class keeps z-index of the pseudo-element below the content but still within the section
    classes.push(
      "isolate before:content-[''] before:absolute before:-z-1 before:inset-0 before:pointer-events-none",
    );
  }
  return classes.join(" ");
});
</script>
