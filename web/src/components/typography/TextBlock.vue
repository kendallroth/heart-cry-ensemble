<template>
  <div class="flex flex-col items-stretch gap-4">
    <h5
      v-if="subtitle"
      class="text-accent text-sm font-semibold uppercase"
      :class="subtitleClass"
    >
      {{ subtitle }}
    </h5>
    <div
      class="flex"
      :class="[
        titleAppendStackOnMobile
          ? 'flex-col md:flex-row items-start md:items-center'
          : 'items-center',
      ]"
    >
      <h4 class="text-primary text-4xl font-serif grow" :class="titleClass">
        {{ title }}
      </h4>
      <slot name="title-append" />
    </div>
    <slot name="default" />
    <slot name="append" />
  </div>
</template>

<script lang="ts" setup>
import type { HTMLAttributes } from "vue";

export interface TextBlockProps {
  subtitle?: string;
  subtitleClass?: HTMLAttributes["class"];
  title: string;
  /** NOTE: Applied to text element (not to parent title element!) */
  titleClass?: HTMLAttributes["class"];
  /** Whether to stack title append section on mobile */
  titleAppendStackOnMobile?: boolean;
}

withDefaults(defineProps<TextBlockProps>(), {
  subtitle: undefined,
  subtitleClass: undefined,
  titleClass: undefined,
});

defineSlots<{
  append: () => unknown;
  default: () => unknown;
  "title-append": () => unknown;
}>();
</script>
