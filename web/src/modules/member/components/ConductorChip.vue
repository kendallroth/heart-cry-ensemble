<template>
  <div class="bg-surface outline outline-primary/10 px-6 py-2 rounded-full">
    <div class="text-sm">Conductor</div>
    <div class="text-md font-medium">
      {{ name }}
    </div>
  </div>
</template>

<script lang="ts" setup>
interface ConductorChipProps {
  name: string;
}

defineProps<ConductorChipProps>();
</script>
