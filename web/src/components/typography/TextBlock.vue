<template>
  <div class="text-block flex flex-col items-stretch" :class="gapClass">
    <component
      :is="slots['title-append'] ? 'div' : SlotPassthrough"
      class="flex gap-[inherit]"
      :class="[titleAppendStackOnMobile ? 'flex-col md:flex-row md:items-end' : 'items-end']"
    >
      <component
        :is="slots['title-append'] ? 'div' : SlotPassthrough"
        class="flex flex-col gap-[inherit] grow"
      >
        <h5 v-if="subtitle" class="text-accent text-sm font-semibold uppercase" :class="subtitleClass">
          {{ subtitle }}
        </h5>
        <h4
          :id="titleId"
          class="text-primary text-4xl font-serif"
          :class="[titleClass, {grow: slots['title-append']}]"
        >
          {{ title }}
        </h4>
      </component>
      <slot name="title-append" />
    </component>

    <slot name="default" />
  </div>
</template>

<script lang="ts" setup>
import type {HTMLAttributes} from "vue";
import SlotPassthrough from "../layout/SlotPassthrough";

export interface TextBlockProps {
  subtitle?: string;
  subtitleClass?: HTMLAttributes["class"];
  title: string;
  /** Whether to stack title append section on mobile */
  titleAppendStackOnMobile?: boolean;
  /** NOTE: Applied to text element (not to parent title element!) */
  titleClass?: HTMLAttributes["class"];
  titleId?: string;
}

withDefaults(defineProps<TextBlockProps>(), {
  subtitle: undefined,
  subtitleClass: undefined,
  titleClass: undefined,
  titleId: undefined,
});

const slots = defineSlots<{
  append: () => unknown;
  default: () => unknown;
  "title-append": () => unknown;
}>();

const attrs = useAttrs();

const gapClass = computed<string>(() => (hasClass(attrs.class, "gap-") ? "" : "gap-4"));
</script>
