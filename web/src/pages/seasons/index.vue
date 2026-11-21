<template>
  <PageLayout class="gap-8 pb-8 md:gap-12 md:pb-12">
    <PageHeader subtitle="Past & Present" title="Seasons">
      <p v-if="seasonsPageData">{{ seasonsPageData.header.description }}</p>
      <template #media>
        <!-- Empty media slot keeps header layout consistent (ie. not full width) -->
      </template>
    </PageHeader>

    <PageWidth class="flex-col">
      <div v-if="currentSeason" class="grid lg:grid-cols-2 lg:items-end gap-4 lg:gap-8">
        <TextBlock :subtitle="currentSeasonTitle" :title="currentSeason.title">
          <p class="text-sm">
            <span class="font-medium">
              {{ formatDateSpan(currentSeason.dateStart, currentSeason.dateEnd) }}
            </span>
            <template v-if="currentSeason.conductor">
              <span>&nbsp;&bullet;&nbsp;</span>
              Conducted by {{ currentSeason.conductor.name }}
            </template>
          </p>
          <AppButton
            class="w-fit"
            :icon-append="appIcons.ArrowRightIcon"
            text="View season details"
            :to="routeLinks.seasons.details(currentSeason.slug)"
          />
        </TextBlock>
        <div class="flex flex-col items-center lg:items-end gap-4">
          <SeasonHighlightBadges :badges="seasonBadges" class="max-md:hidden gap-4" />
          <TextStats :stats="seasonStats" />
        </div>
      </div>
      <div v-if="currentSeason" class="grid lg:grid-cols-2 items-start gap-6 lg:gap-8 mt-4 lg:mt-8">
        <div class="bg-surface border border-primary/10 rounded-xl divide-y-2 divide-primary/5">
          <div class="py-3 px-4 uppercase">Programs</div>
          <template v-if="currentSeason.programs.length">
            <ProgramItem
              v-for="(program, programIdx) in currentSeason.programs"
              :key="programIdx"
              :program="program"
            />
          </template>
          <ProgramListEmpty v-else class="p-4" />
        </div>
        <div class="px-4 bg-primary/5 border border-primary/10 rounded-xl divide-y divide-primary/5">
          <div class="py-3 uppercase">Songs</div>
          <SongItem v-for="song in currentSeason.songs" :key="song.title" :song="song" />
        </div>
      </div>
    </PageWidth>

    <PageWidth class="flex-col">
      <TextBlock title="All Seasons" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        <SeasonCard
          v-for="season in seasonList"
          :key="season.slug"
          :season="season"
          :to="routeLinks.seasons.details(season.slug)"
        />
      </div>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import type {TextStat} from "~/components/typography/TextStats.vue";
import {useQuerySeasonsPageData} from "~/modules/app/app-page.data";
import ProgramItem from "~/modules/program/components/ProgramItem.vue";
import ProgramListEmpty from "~/modules/program/components/ProgramListEmpty.vue";
import SeasonCard from "~/modules/season/components/SeasonCard.vue";
import SeasonHighlightBadges from "~/modules/season/components/SeasonHighlightBadges.vue";
import {useQueryCurrentSeason, useQuerySeasonList} from "~/modules/season/season.data";
import {
  getSeasonHighlightBadges,
  getSeasonRelativity,
  type SeasonRelativity,
} from "~/modules/season/season.utils";
import SongItem from "~/modules/song/components/SongItem.vue";

const {data: seasonsPageData} = await useQuerySeasonsPageData();

const {data: currentSeason} = await useQueryCurrentSeason();

const {data: seasonList} = await useQuerySeasonList();

const now = useNow();

const currentSeasonTitle = computed<string>(() => {
  const relativityMap: Record<SeasonRelativity, string> = {
    past: "Recent Season",
    present: "Current Season",
    future: "Upcoming Season",
  };
  if (!currentSeason.value) {
    return relativityMap["past"];
  }
  const relativity = getSeasonRelativity(currentSeason.value.dateStart, currentSeason.value.dateEnd, now.value);
  return relativityMap[relativity];
});

const seasonBadges = computed(() =>
  currentSeason.value ? getSeasonHighlightBadges(currentSeason.value) : [],
);

const seasonStats = computed<TextStat[]>(() => [
  {label: "singers", value: currentSeason.value?.members.length ?? 0},
  {label: "programs", value: currentSeason.value?.programs.length ?? 0},
  {label: "songs", value: currentSeason.value?.songs.length ?? 0},
]);
</script>
