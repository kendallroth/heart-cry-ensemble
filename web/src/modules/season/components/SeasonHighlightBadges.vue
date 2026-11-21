<template>
  <div v-if="badges.length" class="flex flex-wrap items-center" :class="gapClass">
    <AppBadge
      v-for="badge in badges"
      :key="badge.text"
      :color="badge.color ?? color ?? 'primary'"
      :size="size ?? 'xs'"
      :text="badge.text"
      :variant="badge.variant ?? variant ?? 'tonal'"
    />
  </div>
</template>

<script lang="ts" setup>
import type {AppButtonProps} from "~/components/app-button.types";

export interface SeasonHighlightBadge extends Partial<
  Pick<AppButtonProps, "color" | "iconPrepend" | "iconAppend" | "size" | "variant">
> {
  text: string;
}

interface SeasonHighlightBadgesProps {
  color?: AppButtonProps["color"];
  badges: SeasonHighlightBadge[];
  size?: AppButtonProps["size"];
  variant?: AppButtonProps["variant"];
}

defineProps<SeasonHighlightBadgesProps>();

const attrs = useAttrs();

const gapClass = computed(() => (hasClass(attrs.class, "gap-") ? "" : "gap-2"));
</script>
