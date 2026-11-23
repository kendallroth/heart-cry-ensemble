<template>
  <div class="flex flex-row items-center justify-center" :class="[$props.class, gapClass]">
    <div v-for="stat in stats" :key="stat.label" class="text-center">
      <p class="text-3xl font-serif">{{ stat.value }}</p>
      <p class="text-sm">{{ stat.label }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {HTMLAttributes} from "vue";

export interface TextStat {
  label: string;
  value: string | number;
}

interface TextStatsProps {
  class?: HTMLAttributes["class"];
  stats: TextStat[];
}

const props = defineProps<TextStatsProps>();

/** Only apply 'gap' class if parent does not provide one */
const gapClass = computed(() => (hasClass(props.class, "gap-") ? "" : "gap-8"));
</script>
