<template>
  <PageLayout>
    <PageHeader
      subtitle="Choral Ensemble • Ontario"
      title="Sacred music, sung from the heart"
    >
      <template #title>
        <span>Sacred music,</span>
        <br />
        <span class="text-accent-light">sung from the heart</span>
      </template>
      <template #default>
        <p>
          We are a choral ensemble dedicated to preserving the quality of our
          spiritual heritage by impacting our community through the heart cry of
          music.
        </p>
        <div class="flex flex-col lg:flex-row items-center gap-4">
          <button
            class="bg-on-primary text-primary px-4 py-2 font-medium rounded-full"
          >
            <PlayIcon
              class="inline text-primary"
              :class="appIcons.sizeClasses.md"
            />
            Listen to our music
          </button>
          <NuxtLink
            class="border border-on-primary px-4 py-2 font-medium rounded-full"
            to="/seasons"
          >
            See past seasons
          </NuxtLink>
        </div>
      </template>
      <template #media>
        <div class="bg-primary brightness-125 w-full aspect-3/2 rounded-xl" />
      </template>
    </PageHeader>

    <PageWidth class="grid md:grid-cols-3 gap-2 py-4">
      <template v-for="(stat, idx) in heroStats" :key="stat.label">
        <hr v-if="idx > 0" class="md:hidden text-primary/10" />
        <div
          class="flex flex-row md:flex-col items-center justify-center gap-2 md:gap-1"
        >
          <div class="font-serif text-4xl font-medium">{{ stat.value }}</div>
          <div class="">{{ stat.label }}</div>
        </div>
      </template>
    </PageWidth>
    <hr class="w-full text-primary/25" />

    <PageWidth class="grid md:grid-cols-2 gap-8 py-6 md:py-12">
      <TextBlock subtitle="Latest news" title="Upcoming 2026 album">
        Our 2026 season wrapped up in May with recording and filming sessions,
        so stay tuned for our upcoming album release!
      </TextBlock>
      <div>
        <div class="bg-primary/10 w-full aspect-3/2 rounded-xl" />
      </div>
    </PageWidth>

    <div class="bg-primary/5">
      <PageWidth class="flex flex-col gap-6 py-8 md:py-12">
        <TextBlock subtitle="Upcoming programs" title="Come and hear us sing" />
        <!-- TODO: Handle no upcoming programs (maybe link to previous season?) -->
        <div
          class="bg-surface text-on-surface rounded-xl divide-y-2 divide-background"
        >
          <ProgramItem
            v-for="(program, programIdx) in upcomingPrograms"
            :key="programIdx"
            :program="program"
          />
        </div>
      </PageWidth>
    </div>

    <PageWidth class="grid md:grid-cols-2 gap-8 py-6 md:py-12">
      <TextBlock subtitle="Our music" title="Listen anywhere">
        We've been blessed to record several albums in recent seasons. Stream
        them on the major platforms, or pick up a CD at a program or by
        contacting a member.
      </TextBlock>
      <div class="grid lg:grid-cols-2 gap-4">
        <div
          v-for="platform in musicPlatforms"
          :key="platform.code"
          class="bg-surface flex flex-row items-center p-4 rounded-lg border border-primary/25"
        >
          <div class="bg-primary/10 mr-2 p-2 rounded-full">
            <MusicIcon :class="appIcons.sizeClasses.sm" />
          </div>
          <div class="font-medium">{{ platform.label }}</div>
          <NuxtLink
            class="hover:bg-primary/10 block ml-auto p-1 rounded-full transition-colors"
            rel="noopener noreferrer"
            target="_blank"
            :to="platform.link"
          >
            <LinkIcon class="ml-auto" :class="appIcons.sizeClasses.sm" />
          </NuxtLink>
        </div>
      </div>
    </PageWidth>

    <div class="lg:pb-12">
      <div
        class="bg-primary text-on-primary w-fit mx-auto md:p-4 lg:rounded-2xl"
      >
        <PageWidth
          align="center"
          class="grid md:grid-cols-2 gap-8 py-6 md:py-12"
        >
          <TextBlock
            title="Invite us to your church"
            title-class="!text-on-primary"
          >
            Our heart is to bring encouragement — especially to congregations
            with few young people — but we welcome any opportunity to share our
            message in song.
          </TextBlock>
          <div class="flex flex-col gap-4">
            <button
              class="bg-accent-light text-on-accent-light px-4 py-2 rounded-full"
            >
              Contact us
            </button>
            <p class="text-sm">We usually plan programs 6 months in advance.</p>
          </div>
        </PageWidth>
      </div>
    </div>
  </PageLayout>
</template>

<script lang="ts" setup>
import ProgramItem from "~/modules/program/components/ProgramItem.vue";

const { LinkIcon, MusicIcon, PlayIcon } = appIcons;

interface HeroStat {
  label: string;
  value: string | number;
}

const heroStats: HeroStat[] = [
  { label: "seasons of singing", value: 8 },
  { label: "all-time members", value: 38 },
  { label: "programs given", value: "50+" },
];

const upcomingPrograms: Program[] = [
  {
    date: new Date(2027, 5, 10),
    location: "Baden, ON",
    venue: "St. James Luthern Church",
    time: "7:00 PM",
  },
  {
    date: new Date(2027, 5, 15),
    location: "St Agatha, ON",
    venue: "St. Agatha Catholic Church",
    time: "3:30 PM",
  },
  {
    date: new Date(2027, 5, 15),
    location: "Brussels, ON",
    venue: "Zion Mennonite Fellowship",
    time: "7:00 PM",
  },
];
</script>
