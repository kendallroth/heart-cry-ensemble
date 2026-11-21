<template>
  <AppButton :color="color" readonly :rounded="rounded" :size="size" :text="text" :variant="variant" />
</template>

<script lang="ts" setup>
import type {AppBadgeProps} from "./app-badge.types";

defineProps<AppBadgeProps>();
</script>
