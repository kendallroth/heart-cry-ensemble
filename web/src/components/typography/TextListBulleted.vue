<template>
  <ul class="flex items-center" :class="[gapClass]">
    <template v-for="(child, childIdx) in getChildren()" :key="childIdx">
      <li v-if="childIdx > 0" aria-hidden="true">&bullet;</li>
      <li><component :is="child" /></li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
import {Comment, Fragment, Text, type VNode} from "vue";

const slots = useSlots();
const attrs = useAttrs();

/** Only apply 'gap' class if parent does not provide one */
const gapClass = computed<string>(() => (hasClass(attrs.class, "gap-") ? "" : "gap-2"));

/**
 * Flatten slot children so 'v-for'/'<template>' fragments count as individual items, while dropping
 *   unrendered children ('v-if="false"' renders a comment node) to avoid stray bullets.
 */
const flattenChildren = (nodes: VNode[]): VNode[] =>
  nodes.flatMap((node) => {
    if (node.type === Comment) {
      return [];
    }
    if (node.type === Text) {
      return typeof node.children === "string" && node.children.trim() ? [node] : [];
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      return flattenChildren(node.children as VNode[]);
    }
    return [node];
  });

// NOTE: Must be called during render (not a 'computed'), as slots are not reactive
const getChildren = () => flattenChildren(slots.default?.() ?? []);
</script>
