<template>
  <div
    class="relative flex flex-col rounded-xl overflow-hidden"
    :class="[{'rounded-xl': rounded}, aspectConfig[aspect].class]"
  >
    <slot name="default">
      <template v-if="media">
        <img
          v-if="media.type === 'image'"
          v-image-fallback="aspectConfig[aspect].placeholder"
          :alt="alt"
          :src="media.url"
        />
        <iframe
          v-if="media.type === 'video'"
          allow="clipboard-write; encrypted-media; web-share"
          allowfullscreen
          frameborder="0"
          height="100%"
          referrerpolicy="strict-origin-when-cross-origin"
          :src="media.url"
          :title="media.name"
          width="100%"
        ></iframe>
      </template>
      <img v-else :alt="alt" :src="getPlaceholder(aspectConfig[aspect].placeholder)" />
    </slot>
  </div>
</template>

<script lang="ts" setup>
import {getPlaceholder, type PlaceholderType} from "~/assets/images/image.utils";

type AppMediaAspect = "1/1" | "3/2" | "4/3";

interface AppMediaProps {
  alt?: string;
  aspect: AppMediaAspect;
  media?: AppMedia;
  rounded?: boolean;
}

withDefaults(defineProps<AppMediaProps>(), {
  alt: undefined,
  media: undefined,
  rounded: true,
});

const aspectConfig: Record<AppMediaAspect, {class: string; placeholder: PlaceholderType}> = {
  "1/1": {class: "aspect-1/1", placeholder: "square"},
  "3/2": {class: "aspect-3/2", placeholder: "landscape"},
  "4/3": {class: "aspect-4/3", placeholder: "landscape"},
};
</script>
