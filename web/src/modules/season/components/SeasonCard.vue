<template>
  <component
    :is="to ? NuxtLink : 'div'"
    class="flex flex-col gap-1 p-4 rounded-xl transition-shadow"
    :class="{
      'bg-surface border border-primary/10 hover:bg-primary/5 hover:ring-2 hover:ring-primary ': !omitStyles,
    }"
    :to="to"
  >
    <p class="text-lg font-medium text-primary truncate">{{ season.title || "N/A" }}</p>
    <p>{{ formatDateSpan(season.dateStart, season.dateEnd) }}</p>
    <SeasonHighlightBadges :badges="badges" class="my-1" />
    <TextListBulleted class="mt-auto text-sm">
      <div class="flex items-center gap-1">
        <PeopleIcon class="text-accent" :class="appIcons.sizeClasses.sm" />
        {{ season.members.length }} singers
      </div>
      <div class="flex items-center gap-1">
        <PlaceIcon class="text-accent" :class="appIcons.sizeClasses.sm" />
        {{ season.programs.length || "No" }} programs
      </div>
    </TextListBulleted>
  </component>
</template>

<script lang="ts" setup>
import type {RouteLocationRaw} from "vue-router";
import {getSeasonHighlightBadges} from "../season.utils";
import SeasonHighlightBadges from "./SeasonHighlightBadges.vue";

const NuxtLink = resolveComponent("NuxtLink");

interface SeasonCardProps {
  /** Omit default styles (background, border, hover, etc) */
  omitStyles?: boolean;
  season: Season;
  to?: RouteLocationRaw;
}

const props = defineProps<SeasonCardProps>();

const {PeopleIcon, PlaceIcon} = appIcons;

const badges = computed(() => getSeasonHighlightBadges(props.season));
</script>
