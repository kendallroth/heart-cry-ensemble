<template>
  <div
    class="relative flex flex-col rounded-xl overflow-hidden"
    :class="[{'rounded-xl': rounded}, aspectClassMap[aspect]]"
  >
    <span
      v-if="alt"
      class="absolute -z-1 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 text-center"
    >
      {{ alt }}
    </span>
    <slot name="default">
      <template v-if="media">
        <img v-if="media.type === 'image'" :alt="alt" :src="media.url" />
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
    </slot>
  </div>
</template>

<script lang="ts" setup>
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

const aspectClassMap: Record<AppMediaAspect, string> = {
  "1/1": "aspect-1/1",
  "3/2": "aspect-3/2",
  "4/3": "aspect-4/3",
};
</script>
