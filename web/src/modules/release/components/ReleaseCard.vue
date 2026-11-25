<template>
  <div class="flex flex-col items-stretch">
    <AppMedia
      alt="Release media"
      :aspect="videoRelease ? '3/2' : '1/1'"
      class="bg-primary/10 border-2 border-primary"
      :class="mediaClass"
    >
      <img
        v-if="release.thumbnailUrl"
        v-image-fallback="videoRelease ? 'landscape' : 'square'"
        alt="Release media"
        :class="appMediaChildImgClasses"
        :src="release.thumbnailUrl"
      />
    </AppMedia>
    <p class="mt-4 text-lg font-medium">{{ release.title }}</p>
    <ReleaseStats class="mt-0.5 gap-1.5" :release="release" :stats="videoRelease ? ['date'] : undefined" />
    <div v-if="release.platforms.length" class="flex flex-wrap gap-2 mt-2">
      <AppButton
        v-for="platform in release.platforms"
        :key="platform.label"
        color="primary"
        :icon-prepend="appIcons.PlayIcon"
        size="xs"
        target="_blank"
        :text="platform.label"
        :to="platform.link"
        variant="tonal"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {HTMLAttributes} from "vue";

import ReleaseStats from "./ReleaseStats.vue";
import {appMediaChildImgClasses} from "~/assets/images/image.utils";

interface ReleaseCardProps {
  mediaClass?: HTMLAttributes["class"];
  release: MusicRelease;
}

const props = withDefaults(defineProps<ReleaseCardProps>(), {
  mediaClass: undefined,
});

const videoRelease = computed(() => props.release.type === MusicReleaseType.VIDEO);
</script>
