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
        <TextBlock subtitle="Recent season" :title="currentSeason.name">
          <p class="text-sm">
            {{ formatDateSpan(currentSeason.dateStart, currentSeason.dateEnd) }}
            <span>&nbsp;&bullet;&nbsp;</span>
            <template v-if="currentSeason.conductor">
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
        <TextStats class="lg:justify-end" :stats="seasonStats" />
      </div>
      <div v-if="currentSeason" class="grid lg:grid-cols-2 items-start gap-6 lg:gap-8 mt-4 lg:mt-8">
        <div class="bg-surface border border-primary/10 rounded-xl">
          <div class="py-3 px-4 uppercase">Programs</div>
          <template v-for="(program, programIdx) in currentSeason.programs" :key="programIdx">
            <hr class="text-primary/10" />
            <ProgramItem :program="program" />
          </template>
        </div>
        <div class="px-4 bg-primary/5 border border-primary/10 rounded-xl">
          <div class="py-3 uppercase">Songs</div>
          <template v-for="song in currentSeason.songs" :key="song.title">
            <hr class="text-primary/5" />
            <SongItem :song="song" />
          </template>
        </div>
      </div>
    </PageWidth>

    <PageWidth class="flex-col">
      <TextBlock title="Past Seasons" />
      <div class="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6">
        <NuxtLink
          v-for="season in seasonList"
          :key="season.slug"
          class="flex flex-col gap-1 p-4 bg-surface border border-primary/10 rounded-xl hover:bg-primary/5 hover:ring-2 hover:ring-primary transition-shadow"
          :to="routeLinks.seasons.details(season.slug)"
        >
          <p class="text-lg font-medium truncate">{{ season.name }}</p>
          <p class="text-sm">{{ formatDateSpan(season.dateStart, season.dateEnd) }}</p>
          <div class="flex items-center gap-1">
            <PeopleIcon class="text-primary" :class="appIcons.sizeClasses.sm" />
            {{ season.members.length }} singers
            <span class="mx-0.5">&bullet;</span>
            <PlaceIcon class="text-primary" :class="appIcons.sizeClasses.sm" />
            {{ season.programs.length || "No" }} programs
          </div>
        </NuxtLink>
      </div>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import type {TextStat} from "~/components/typography/TextStats.vue";
import {useQuerySeasonsPageData} from "~/modules/app/app-page.data";
import ProgramItem from "~/modules/program/components/ProgramItem.vue";
import {useQueryCurrentSeason, useQuerySeasonList} from "~/modules/season/season.data";
import SongItem from "~/modules/song/components/SongItem.vue";

const {data: seasonsPageData} = await useQuerySeasonsPageData();

const {data: currentSeason} = await useQueryCurrentSeason();

const {data: seasonList} = await useQuerySeasonList();

const {PeopleIcon, PlaceIcon} = appIcons;

const seasonStats = computed<TextStat[]>(() => [
  {label: "singers", value: currentSeason.value?.members.length ?? 0},
  {label: "programs", value: currentSeason.value?.programs.length ?? 0},
  {label: "songs", value: currentSeason.value?.songs.length ?? 0},
]);
</script>
