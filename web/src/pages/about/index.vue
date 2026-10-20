<template>
  <PageLayout>
    <PageHeader
      subtitle="About Us"
      title="A love of singing"
      title-class="lg:flex lg:flex-col"
    >
      <template #title>
        <span>Two families, a love of singing, and a&nbsp;</span>
        <span class="text-accent-light">tradition worth keeping.</span>
      </template>
    </PageHeader>

    <PageWidth class="grid md:grid-cols-2 gap-8 py-6 md:py-12">
      <TextBlock title="Our Story">
        <p>
          Heart Cry Ensemble was founded in 2017 by friends from two families,
          the Diefenbachers and the Roths. Having grown up singing, they wanted
          to continue that tradition in a more organized, small-group setting.
        </p>
        <p>
          Though founded as a mixed ensemble, we've also sung a season of men's
          music. Each season begins with several months of weekly rehearsals
          before a month of programs, both near and far — in churches from
          Markham, ON to Detroit, MI.
        </p>
        <p>
          In 2025 we were privileged to tour around Lake Erie and record our
          first music video.
        </p>
      </TextBlock>
      <div class="flex flex-col gap-4">
        <div class="bg-primary/10 w-full aspect-3/2 rounded-xl" />
        <TextBlock
          class="bg-primary text-on-primary flex-col-reverse px-6 py-4 rounded-xl"
          subtitle="Our Mission"
          subtitle-class="text-accent-light"
          title="Our primary focus is bringing encouragement to churches with a small youth presence — and we welcome any opportunity to share our message."
          title-class="!text-on-primary text-xl"
        />
      </div>
    </PageWidth>

    <div class="bg-primary/5">
      <PageWidth class="flex-col py-6 md:py-12">
        <TextBlock
          class="w-full"
          :subtitle="currentSeason.label"
          title="The Voices"
          title-append-stack-on-mobile
        >
          <template #title-append>
            <div
              class="bg-surface outline-primary/10 mt-4 md:mt-0 md:ml-auto w-full md:w-fit px-6 py-2 rounded-full"
            >
              <div class="text-sm">Conductor</div>
              <div class="text-md font-medium">
                {{ currentSeason.conductor }}
              </div>
            </div>
          </template>
        </TextBlock>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-6">
          <MemberList
            v-for="(members, part) in currentSeason.members"
            :key="part"
            class="bg-surface p-4 rounded-xl"
            :members="members"
            :part="part"
          />
        </div>
      </PageWidth>
    </div>

    <PageWidth align="center" class="flex-col gap-8 py-6 md:py-12">
      <TextBlock class="text-center" title="Get in touch">
        <p>
          To host a program, order a CD, or ask about singing with us, send us a
          note.
        </p>
        <button
          class="bg-primary text-on-primary self-center px-4 py-2 rounded-full"
        >
          {{ publicConfig.email }}
        </button>
      </TextBlock>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import MemberList from "~/modules/member/components/MemberList.vue";

const publicConfig = useRuntimeConfig().public;

interface CurrentSeason {
  conductor: string;
  label: string;
  members: {
    soprano: Member[];
    alto: Member[];
    tenor: Member[];
    bass: Member[];
  };
}

const currentSeason: CurrentSeason = {
  conductor: "Wendell Diefenbacher",
  label: "2026 Season",
  members: {
    soprano: [
      { name: "Dorothy Carr" },
      { name: "Lauren Diefenbacher" },
      { name: "Yolanda Lichty" },
      { name: "Callie Shantz" },
      { name: "Brianna Burden" },
    ],
    alto: [
      { name: "Natalie Martin" },
      { name: "Sherlyn Martin" },
      { name: "Alyssa Roth" },
      { name: "Carolyn Roth" },
      { name: "Tanya Streicher" },
    ],
    tenor: [
      { name: "Greg Horst" },
      { name: "Kyle Roth" },
      { name: "Phil Roth" },
      { name: "Brendon Weber" },
      { name: "Caleb Weber" },
    ],
    bass: [
      { name: "Curtis Cressman" },
      { name: "Christopher Good" },
      { name: "Dezhan Good" },
      { name: "Kendall Roth" },
      { name: "Kenton Shantz" },
    ],
  },
};
</script>
