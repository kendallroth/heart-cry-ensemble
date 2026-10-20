<template>
  <PageLayout>
    <PageHeader subtitle="Past & Present" title="Seasons">
      <p>
        Each season begins with months of weekly rehearsals, followed by a month
        of programs — some close to home, some much further afield.
      </p>
      <template #media></template>
    </PageHeader>

    <PageWidth align="stretch" class="flex-col py-6 md:py-12">
      <div class="grid lg:grid-cols-2 lg:items-end gap-4 lg:gap-8">
        <TextBlock subtitle="Recent season" :title="recentSeason!.label">
          <p class="text-sm">
            {{ getSeasonDateString(recentSeason!) }}
            <span>&nbsp;&bullet;&nbsp;</span>
            Conducted by Wendell Diefenbacher
          </p>
        </TextBlock>
        <div
          class="flex flex-row items-center justify-center lg:justify-end gap-8"
        >
          <div class="text-center">
            <p class="text-3xl font-serif">{{ recentSeason!.members }}</p>
            <p class="text-sm">singers</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-serif">{{ recentSeason!.programs }}</p>
            <p class="text-sm">programs</p>
          </div>
          <div class="text-center">
            <p class="text-3xl font-serif">{{ recentSeason!.songs }}</p>
            <p class="text-sm">songs</p>
          </div>
        </div>
      </div>
      <div class="grid lg:grid-cols-2 gap-4 lg:gap-8 mt-4 lg:mt-8">
        <div class="p-4 border border-primary/10 rounded-xl">
          <div class="mb-2 uppercase">Programs</div>
          <template
            v-for="(program, programIdx) in seasonPrograms"
            :key="programIdx"
          >
            <hr class="text-primary/10" />
            <ProgramItem :program="program" />
          </template>
        </div>
        <div class="bg-primary/10 p-4 rounded-xl">
          <div class="mb-2 uppercase">Repertoire</div>
          <template v-for="song in seasonSongs" :key="song.title">
            <hr class="text-primary/10" />
            <div class="flex flex-row items-center justify-between py-2">
              <p class="font-medium">{{ song.title }}</p>
              <p class="text-sm">{{ song.composer }}</p>
            </div>
          </template>
        </div>
      </div>
      <!-- TODO: Add season members -->
    </PageWidth>

    <PageWidth class="flex-col py-6 md:py-12">
      <TextBlock title="Past Seasons" />
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div
          v-for="season in seasons"
          :key="season.label"
          class="flex flex-col gap-1 p-4 border border-primary/10 rounded-xl"
        >
          <p class="text-lg font-medium">{{ season.label }}</p>
          <p class="text-sm">{{ getSeasonDateString(season) }}</p>
          <div class="flex items-center gap-1">
            <PeopleIcon :class="appIcons.sizeClasses.sm" class="text-primary" />
            {{ season.members }} singers
            <span class="mx-0.5">&bullet;</span>
            <PlaceIcon :class="appIcons.sizeClasses.sm" class="text-primary" />
            {{ season.programs || "No" }} programs
          </div>
        </div>
      </div>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import dayjs from "dayjs";
import ProgramItem from "~/modules/program/components/ProgramItem.vue";

const { PeopleIcon, PlaceIcon } = appIcons;

const seasons: Season[] = [
  {
    dateStart: new Date("2024-02-01"),
    dateEnd: new Date("2024-05-31"),
    label: "Menno Singers Collaboration",
    members: 17,
    programs: 2,
    songs: 8,
    type: "mixed",
  },
  {
    dateStart: new Date("2023-07-01"),
    dateEnd: new Date("2023-11-30"),
    label: "2023 Fall",
    members: 17,
    programs: 6,
    songs: 14,
    type: "mixed",
  },
  {
    dateStart: new Date("2022-01-01"),
    dateEnd: new Date("2022-04-30"),
    label: "2022 Spring",
    members: 16,
    programs: 6,
    songs: 15,
    type: "mixed",
  },
  {
    dateStart: new Date("2020-07-01"),
    dateEnd: new Date("2020-10-31"),
    label: "2020 Fall",
    members: 16,
    programs: 0,
    songs: 15,
    type: "mixed",
  },
  {
    dateStart: new Date("2019-05-01"),
    dateEnd: new Date("2019-11-30"),
    label: "2019 Fall",
    members: 16,
    programs: 10,
    songs: 15,
    type: "mixed",
  },
  {
    dateStart: new Date("2018-11-01"),
    dateEnd: new Date("2019-03-31"),
    label: "2019 Spring",
    members: 8,
    programs: 8,
    songs: 15,
    type: "mens",
  },
  {
    dateStart: new Date("2017-08-01"),
    dateEnd: new Date("2018-08-31"),
    label: "2018 Spring",
    members: 17,
    programs: 11,
    songs: 15,
    type: "mixed",
  },
];

const recentSeason = seasons[0];

const getSeasonDateString = (season: Season): string => {
  const startYear = dayjs(season.dateStart).year();
  const endYear = dayjs(season.dateEnd).year();
  const startMonth = dayjs(season.dateStart).format("MMM");
  const endMonth = dayjs(season.dateEnd).format("MMM");

  return startYear === endYear
    ? `${startMonth} ${enDash} ${endMonth}, ${startYear}`
    : `${startMonth}, ${startYear} ${enDash} ${endMonth}, ${endYear}`;
};

const seasonPrograms: Program[] = [
  {
    date: new Date(2027, 4, 2),
    venue: "Blessed Sacrament Roman Catholic Church",
    location: "Kitchener, ON",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 4),
    venue: "Elmira Mennonite Church",
    location: "Elmira, ON",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 11),
    venue: "Atwood United Church",
    location: "Atwood, ON",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 15),
    venue: "Talbot Street United Church",
    location: "Port Alma, ON",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 15),
    venue: "Grace Fellowship",
    location: "Detroit, MI",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 17),
    venue: "Hartville Conservative Mennonite",
    location: "Hartville, OH",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 18),
    venue: "Shalom Mennonite Church",
    location: "Hartville, PA",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 4, 18),
    venue: "Seeds of Truth Mennonite Church",
    location: "Leeds, ON",
    time: "7:00 PM",
  },
];

interface SeasonSong {
  title: string;
  composer: string;
}

const seasonSongs: SeasonSong[] = [
  { title: "May Thy Holy Spirit", composer: "Pavel Chesnokov" },
  { title: "All the Way my Saviour Leads Me", composer: "Lyle Stutzman" },
  { title: "Be Thou My Vision", composer: "Jamey Ray" },
  { title: "God Is Seen", composer: "Alice Parker" },
  { title: "God With Me", composer: "Sarah Quartel" },
  { title: "All Will Be Well", composer: "Taizé" },
  { title: "Here I Am", composer: "Craig Courtney" },
  { title: "Walk Together Children", composer: "Robert DeCormier" },
  { title: "This Little Light of Mine", composer: "Jared Zook" },
  { title: "I Believe", composer: "Mark Miller" },
  { title: "I Shall See", composer: "Michael John Trotta" },
  { title: "I Go to the Rock", composer: "Don Huff" },
  { title: "May We Reflect You", composer: "Drew Roth" },
  { title: "Walk With Your God", composer: "Yolanda Lichty" },
  { title: "Still with Thee", composer: "Elaine Hagenberg" },
];
</script>
