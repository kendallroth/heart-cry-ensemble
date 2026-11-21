<template>
  <AppButton :color="color" readonly :rounded="rounded" :size="size" :text="text" :variant="variant" />
</template>

<script lang="ts" setup>
import type {AppButtonProps} from "./AppButton.vue";

export interface AppBadgeProps extends Pick<
  AppButtonProps,
  "color" | "iconPrepend" | "iconAppend" | "rounded" | "size" | "variant"
> {
  text: string;
}

defineProps<AppBadgeProps>();
</script>
