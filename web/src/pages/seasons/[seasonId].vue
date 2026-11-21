<template>
  <PageLayout class="gap-8 pb-8 md:gap-12 md:pb-12">
    <!-- TODO: Consider subtitle "tag" (for men's ensemble, etc) -->
    <PageHeader
      back-text="All seasons"
      :subtitle="seasonDateSpan ?? enDash"
      :title="seasonData?.name ?? enDash"
    >
      <TextStats class="self-start" :stats="seasonStats" />
    </PageHeader>

    <PageWidth v-if="seasonData" align="center" class="grid md:grid-cols-2 gap-8">
      <TextBlock subtitle="About this season" :title="seasonData.contentTitle ?? seasonData.name">
        <template v-if="seasonData.contentDescription">{{ seasonData.contentDescription }}</template>
        <span v-else class="italic">No description available.</span>
      </TextBlock>
      <AppMedia v-if="seasonData.media" :alt="seasonData.media.name" aspect="3/2" class="bg-primary/10">
        <img :alt="seasonData.media.name" :src="seasonData.media.url" />
      </AppMedia>
    </PageWidth>

    <div v-if="seasonRecording" class="lg:px-6">
      <PageWidth
        align="center"
        class="flex-col md:flex-row gap-8 py-6 md:max-lg:py-4 text-on-primary"
        tile-class="lg:before:-inset-x-2 before:bg-primary lg:before:rounded-2xl"
      >
        <AppMedia alt="Album cover" aspect="1/1" class="w-40 bg-on-primary/10 border-2 border-on-primary">
          <img v-if="seasonRecording.thumbnailUrl" alt="Album cover" :src="seasonRecording.thumbnailUrl" />
        </AppMedia>
        <TextBlock
          class="max-sm:items-center"
          subtitle="Season Recording"
          subtitle-class="!text-accent-light"
          :title="seasonRecording.title"
          title-class="!text-on-primary truncate"
        >
          {{ dayjs(seasonRecording.releaseDate).format("YYYY") }}
          <template v-if="(seasonRecording.trackCount ?? 0) > 1">
            &ensp;&bullet;&emsp;{{ seasonRecording.trackCount }} tracks
          </template>
        </TextBlock>
        <div class="flex flex-wrap justify-center md:justify-end gap-4 md:ml-auto">
          <AppButton
            v-for="platform in seasonRecording.platforms"
            :key="platform.type"
            color="on-primary"
            :icon-prepend="appIcons.MusicIcon"
            target="_blank"
            :text="platform.label"
            :to="platform.link"
            variant="tonal"
          />
        </div>
      </PageWidth>
    </div>

    <PageWidth v-if="seasonData" class="flex-col">
      <TextBlock title="Singers" title-append-stack-on-mobile>
        <template v-if="seasonData.conductor" #title-append>
          <ConductorChip :name="seasonData.conductor?.name" />
        </template>
      </TextBlock>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-6">
        <MemberList
          v-for="partList in seasonMemberPartLists"
          :key="partList.label"
          class="bg-surface p-4 rounded-xl border border-primary/10"
          :members="partList.members"
          :part="partList.label"
        />
      </div>
    </PageWidth>

    <PageWidth v-if="seasonData" class="grid lg:grid-cols-2 gap-8 lg:gap-12">
      <div>
        <TextBlock title="Programs" />
        <div class="mt-4 bg-surface border border-primary/10 rounded-xl">
          <template v-for="(program, programIdx) in seasonData.programs" :key="programIdx">
            <hr v-if="programIdx > 0" class="text-primary/10" />
            <ProgramItem :program="program" />
          </template>
        </div>
      </div>
      <div>
        <TextBlock title="Songs" />
        <div class="mt-4 px-4 py-2 bg-primary/5 border border-primary/10 rounded-xl">
          <template v-for="(song, songIdx) in seasonData.songs" :key="song.title">
            <hr v-if="songIdx > 0" class="text-primary/5" />
            <!-- TODO: Extract this to re-usable component (handle mobile) -->
            <SongItem :song="song" />
          </template>
        </div>
      </div>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import type {TextStat} from "~/components/typography/TextStats.vue";
import ConductorChip from "~/modules/member/components/ConductorChip.vue";
import MemberList from "~/modules/member/components/MemberList.vue";
import ProgramItem from "~/modules/program/components/ProgramItem.vue";
import {useQuerySeasonDetails} from "~/modules/season/season.data";
import SongItem from "~/modules/song/components/SongItem.vue";

const route = useRoute();

const {data: seasonData} = await useQuerySeasonDetails(() => route.params.seasonId as string);

const seasonStats = computed<TextStat[]>(() => [
  {label: "singers", value: seasonData.value?.members.length ?? 0},
  {label: "programs", value: seasonData.value?.programs.length ?? 0},
  {label: "songs", value: seasonData.value?.songs.length ?? 0},
]);

const seasonRecording = computed(() => {
  if (!seasonData.value) return null;

  const albumRelease = seasonData.value.releases.find((r) => r.type === MusicReleaseType.ALBUM);
  if (albumRelease) return albumRelease;

  const singleRelease = seasonData.value.releases.find((r) => r.type === MusicReleaseType.SINGLE);
  if (singleRelease) return singleRelease;

  return null;
});

const seasonDateSpan = computed(() =>
  seasonData.value ? formatDateSpan(seasonData.value.dateStart, seasonData.value.dateEnd) : undefined,
);

const seasonMemberPartLists = computed(() => getSeasonMemberPartLists(seasonData.value?.members ?? []));
</script>
