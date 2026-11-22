<template>
  <PageLayout class="gap-8 pb-0 md:gap-12 lg:pb-12">
    <div>
      <PageHeader subtitle="Choral Ensemble • Ontario" title="Sacred music, sung from the heart">
        <template #title>
          <span>Sacred music,</span>
          <br />
          <span class="text-accent-light">sung from the heart</span>
        </template>
        <template #default>
          <p v-if="homePageData">{{ homePageData.header.description }}</p>
          <div class="flex flex-col lg:flex-row items-center gap-4">
            <AppButton
              color="on-primary"
              :icon-prepend="PlayIcon"
              size="lg"
              text="Listen to our music"
              :to="`#${headerIdListenAnywhere}`"
            />
            <AppButton
              color="on-primary"
              text="See past seasons"
              :to="routeLinks.seasons.index()"
              variant="outlined"
            />
          </div>
        </template>
        <template #media>
          <AppMedia
            alt="Group photo"
            aspect="3/2"
            class="bg-on-primary/10"
            :media="homePageData?.header.media"
          />
        </template>
      </PageHeader>

      <PageWidth class="grid md:grid-cols-3 gap-2 py-4 bg-surface">
        <template v-for="(stat, idx) in heroStats" :key="stat.label">
          <hr v-if="idx > 0" class="md:hidden text-primary/10" />
          <div class="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1">
            <div class="font-serif text-4xl font-medium">{{ stat.value }}</div>
            <div class="">{{ stat.label }}</div>
          </div>
        </template>
      </PageWidth>
      <hr class="w-full text-primary/25" />
    </div>

    <PageWidth align="center" class="grid md:grid-cols-2 gap-8">
      <template v-if="homePageData">
        <TextBlock :subtitle="homePageData.news.subtitle || 'Latest news'" :title="homePageData.news.title">
          {{ homePageData.news.description }}
        </TextBlock>
        <AppMedia alt="News media" aspect="3/2" class="bg-primary/10" :media="homePageData.news.media" />
      </template>
      <TextBlock v-else subtitle="Latest news" title="No news available">
        Stay tuned for upcoming updates and announcements!
      </TextBlock>
    </PageWidth>

    <div class="bg-primary/5">
      <PageWidth class="flex flex-col gap-6 py-8">
        <TextBlock
          :subtitle="seasonPrograms.subtitle"
          :title="seasonPrograms.title"
          title-append-stack-on-mobile
        >
          <template #title-append>
            <AppButton
              class="w-fit"
              :icon-append="appIcons.ArrowRightIcon"
              :text="currentSeason ? 'See current season' : 'See past seasons'"
              :to="
                currentSeason ? routeLinks.seasons.details(currentSeason.slug) : routeLinks.seasons.index()
              "
              variant="tonal"
            />
          </template>
        </TextBlock>
        <div class="bg-surface text-on-surface rounded-xl divide-y-2 divide-primary/5">
          <template v-if="seasonPrograms.programs.length">
            <ProgramItem
              v-for="(program, programIdx) in seasonPrograms.programs"
              :key="programIdx"
              :program="program"
            />
          </template>
          <ProgramListEmpty v-else class="p-4" text="No programs yet; check again soon!" />
        </div>
      </PageWidth>
    </div>

    <PageWidth class="grid md:grid-cols-2 gap-8">
      <TextBlock subtitle="Our music" title="Listen anywhere" :title-id="headerIdListenAnywhere">
        We've been blessed to record several albums in recent seasons. Stream them on the major platforms, or
        pick up a CD at a program or by contacting a member.
      </TextBlock>
      <div class="grid lg:grid-cols-2 gap-4">
        <div
          v-for="platform in musicPlatformData"
          :key="platform.type"
          class="bg-surface flex flex-row items-center p-4 rounded-lg border border-primary/25"
        >
          <div class="bg-primary/10 mr-2 p-2 rounded-full">
            <MusicIcon :class="appIcons.sizeClasses.sm" />
          </div>
          <div class="font-medium">{{ platform.label }}</div>
          <AppButton
            class="ml-auto"
            :icon="LinkIcon"
            size="sm"
            target="_blank"
            :to="platform.link"
            variant="text"
          />
        </div>
      </div>
    </PageWidth>

    <div class="lg:px-8">
      <PageWidth
        align="center"
        class="grid md:grid-cols-2 gap-8 py-6 lg:py-10 text-on-primary"
        tile-class="lg:before:-inset-x-4 before:bg-primary lg:before:rounded-2xl"
      >
        <TextBlock title="Invite us to your church" title-class="!text-on-primary">
          Our heart is to bring encouragement — especially to congregations with few young people — but we
          welcome any opportunity to share our message in song.
        </TextBlock>
        <div class="flex flex-col gap-4">
          <AppButton color="accent-light" size="lg" text="Contact Us" :to="`mailto:${publicConfig.email}`" />
          <p class="text-sm text-center">We usually plan programs 6 months in advance.</p>
        </div>
      </PageWidth>
    </div>
  </PageLayout>
</template>

<script lang="ts" setup>
import {useQueryGroupStats, useQueryMusicPlatforms} from "~/modules/app/app.data";
import {useQueryHomePageData} from "~/modules/app/app-page.data";
import ProgramItem from "~/modules/program/components/ProgramItem.vue";
import {useQueryCurrentSeason} from "~/modules/season/season.data";
import ProgramListEmpty from "~/modules/program/components/ProgramListEmpty.vue";
import dayjs from "dayjs";

const {LinkIcon, MusicIcon, PlayIcon} = appIcons;

const publicConfig = useRuntimeConfig().public;

const {data: homePageData} = await useQueryHomePageData();

const {data: groupStats} = await useQueryGroupStats();

const {data: musicPlatformData} = await useQueryMusicPlatforms();

const {data: currentSeason} = await useQueryCurrentSeason();

const headerIdListenAnywhere = "listen-anywhere";

interface HeroStat {
  label: string;
  value: string | number;
}

const heroStats = computed<HeroStat[]>(() => [
  {label: "seasons of singing", value: groupStats.value?.seasons ?? 0},
  {label: "all-time members", value: groupStats.value?.members ?? 0},
  {label: "programs given", value: groupStats.value?.programs ?? 0},
]);

const now = useNow();

const seasonPrograms = computed<{title: string; subtitle: string; programs: Program[]}>(() => {
  const hasUpcomingPrograms =
    currentSeason.value?.programs.some((program) => dayjs(program.date).isAfter(now.value, "day")) ?? false;

  return {
    programs: currentSeason.value?.programs ?? [],
    subtitle: "Programs",
    title: hasUpcomingPrograms ? "Come and hear us sing" : "Our recent programs",
  };
});
</script>
