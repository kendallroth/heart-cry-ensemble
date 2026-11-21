<template>
  <PageLayout class="gap-8 pb-8 md:gap-12 md:pb-12">
    <PageHeader subtitle="About Us" title="A love of singing" title-class="lg:flex lg:flex-col">
      <template #title>
        <span>Two families, a love of singing, and a&nbsp;</span>
        <span class="text-accent-light">tradition worth keeping.</span>
      </template>
    </PageHeader>

    <PageWidth class="grid md:grid-cols-2 gap-8">
      <TextBlock title="Our Story">
        <p v-if="aboutPageData" class="whitespace-pre-wrap">{{ aboutPageData.content.description }}</p>
      </TextBlock>
      <div class="flex flex-col gap-4">
        <AppMedia alt="Group photo" aspect="3/2" class="bg-primary/10">
          <img
            v-if="aboutPageData?.content.media"
            :alt="aboutPageData.content.media.name"
            :src="aboutPageData.content.media.url"
          />
        </AppMedia>
        <TextBlock
          class="bg-primary text-on-primary flex-col-reverse px-6 py-4 rounded-xl"
          subtitle="Our Mission"
          subtitle-class="text-accent-light"
          :title="aboutPageData?.content.mission ?? enDash"
          title-class="!text-on-primary text-xl"
        />
      </div>
    </PageWidth>

    <div class="bg-primary/5">
      <PageWidth class="flex-col py-6 md:py-8">
        <TextBlock
          class="w-full"
          :subtitle="currentSeason?.dateName"
          title="The Voices"
          title-append-stack-on-mobile
        >
          <template v-if="currentSeason?.conductor" #title-append>
            <ConductorChip :name="currentSeason.conductor.name" />
          </template>
        </TextBlock>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8 mt-6">
          <MemberList
            v-for="partList in seasonMemberPartLists"
            :key="partList.label"
            class="bg-surface p-4 border border-primary/10 rounded-xl"
            :members="partList.members"
            :part="partList.label"
          />
        </div>
      </PageWidth>
    </div>

    <PageWidth align="center" class="flex-col gap-8">
      <TextBlock class="text-center" title="Get in touch">
        <p>To host a program, order a CD, or ask about singing with us, send us a note.</p>
        <AppButton
          class="self-center"
          color="primary"
          target="_blank"
          :text="publicConfig.email"
          :to="`mailto:${publicConfig.email}?subject=Get in touch`"
        />
      </TextBlock>
    </PageWidth>
  </PageLayout>
</template>

<script lang="ts" setup>
import {useQueryAboutPageData} from "~/modules/app/app-page.data";
import {useQueryCurrentSeason} from "~/modules/season/season.data";
import ConductorChip from "~/modules/member/components/ConductorChip.vue";
import MemberList from "~/modules/member/components/MemberList.vue";

const publicConfig = useRuntimeConfig().public;

const {data: aboutPageData} = await useQueryAboutPageData();

const {data: currentSeason} = await useQueryCurrentSeason();

const seasonMemberPartLists = computed(() => getSeasonMemberPartLists(currentSeason.value?.members ?? []));
</script>
