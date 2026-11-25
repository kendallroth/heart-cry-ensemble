<template>
  <PageLayout class="gap-8 pb-8 md:gap-12 md:pb-12">
    <div>
      <PageHeader subtitle="Recordings & Video" title="Our Music" title-class="lg:flex lg:flex-col" />
      <div class="theme-dark bg-surface/90 border-b border-primary/25">
        <PageWidth class="flex-wrap justify-center p-4 gap-4">
          <AppButton
            v-for="platform in musicPlatformData"
            :key="platform.label"
            class="max-md:zoom-80"
            :icon-prepend="appIcons.MusicIcon"
            size="md"
            target="_blank"
            :text="platform.label"
            :to="platform.link"
            variant="tonal"
          />
        </PageWidth>
      </div>
    </div>

    <PageWidth v-if="recentRelease" class="flex-col md:flex-row items-center gap-6 md:gap-8">
      <AppBadge class="md:hidden w-fit" color="accent" size="sm" text="Latest Release" variant="tonal" />
      <AppMedia
        alt="Release art"
        :aspect="recentReleaseIsVideo ? '3/2' : '1/1'"
        class="max-w-[90vw] bg-primary/10 border-2 border-primary"
        :class="recentReleaseIsVideo ? 'w-96' : 'w-64'"
      >
        <img
          v-if="recentRelease.thumbnailUrl"
          v-image-fallback="recentReleaseIsVideo ? 'landscape' : 'square'"
          alt="Release art"
          :class="appMediaChildImgClasses"
          :src="recentRelease.thumbnailUrl"
        />
      </AppMedia>
      <div class="flex flex-col max-md:items-center gap-4">
        <AppBadge
          class="max-md:hidden w-fit"
          color="accent"
          size="sm"
          text="Latest Release"
          variant="tonal"
        />
        <h3 class="text-4xl font-serif text-primary">{{ recentRelease.title }}</h3>
        <ReleaseStats :release="recentRelease" />
        <div
          v-if="recentRelease.platforms.length"
          class="flex flex-wrap items-center max-md:justify-center gap-2"
        >
          <AppButton
            v-for="platform in recentRelease.platforms"
            :key="platform.label"
            :icon-prepend="appIcons.PlayIcon"
            size="sm"
            target="_blank"
            :text="platform.label"
            :to="platform.link"
            variant="flat"
          />
        </div>
      </div>

      <hr class="md:hidden" />
    </PageWidth>

    <PageWidth class="flex-col gap-4">
      <TextBlock title="All Music" />

      <div class="grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 md:gap-8">
        <ReleaseCard
          v-for="release in publishedStreamingReleases"
          :key="release.title"
          class="max-md:items-center"
          media-class="max-w-[65vw] "
          :release="release"
        />
      </div>
    </PageWidth>

    <PageWidth v-if="publishedVideoReleases.length" class="flex-col gap-4">
      <TextBlock title="All Videos" />

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <ReleaseCard v-for="release in publishedVideoReleases" :key="release.title" :release="release" />
      </div>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import {appMediaChildImgClasses} from "~/assets/images/image.utils";
import ReleaseCard from "~/modules/release/components/ReleaseCard.vue";
import ReleaseStats from "~/modules/release/components/ReleaseStats.vue";
import {useQueryReleaseList} from "~/modules/release/release.data";
import {isReleasePublished} from "~/modules/release/release.utils";

const {data: musicPlatformData} = await useQueryMusicPlatforms();

// Must fetch all releases (including unpublished) for them to appear once published (due to static generation)
const {data: releaseListData} = await useQueryReleaseList();

const now = useNow();

const publishedReleases = computed(
  () => releaseListData.value?.filter((release) => isReleasePublished(release, now.value)) ?? [],
);
const recentRelease = computed(() => publishedReleases.value[0] ?? null);
const recentReleaseIsVideo = computed(() => recentRelease.value?.type === MusicReleaseType.VIDEO);

const streamingReleaseTypes = [MusicReleaseType.ALBUM, MusicReleaseType.SINGLE];
const publishedStreamingReleases = computed(() =>
  publishedReleases.value.filter((release) => streamingReleaseTypes.includes(release.type)),
);

const publishedVideoReleases = computed(() =>
  publishedReleases.value.filter((release) => release.type === MusicReleaseType.VIDEO),
);
</script>
