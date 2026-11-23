<template>
  <TheAppHeader />

  <PageLayout class="relative justify-center">
    <StaffBackground
      class="absolute top-1/2 w-[300%] md:w-[150%] lg:w-full -translate-y-1/2 -z-1 text-primary/10"
    />

    <PageWidth align="center" class="flex-col max-w-2xl gap-4" width="custom">
      <h1 class="text-9xl font-serif">Uh oh!</h1>
      <h2 class="text-6xl font-serif text-balance">
        This page has <span class="italic text-accent">taken a rest.</span>
      </h2>
      <p class="text-center text-balance">
        We couldn't find the page you were looking for. It may have moved when we refreshed the site, or the
        link may be mistyped.
      </p>
      <div class="flex items-center gap-4">
        <AppButton :icon-prepend="appIcons.ArrowLeftIcon" @click="handleBack">Back</AppButton>
        <AppButton :icon-prepend="appIcons.HomeIcon" variant="tonal" @click="handleHome">Home</AppButton>
      </div>
    </PageWidth>
  </PageLayout>

  <TheAppFooter />
</template>

<script lang="ts" setup>
import type {NuxtError} from "#app";

interface ErrorProps {
  error: NuxtError;
}

defineProps<ErrorProps>();

const router = useRouter();

const handleBack = () => {
  router.back();
};

const handleHome = async () => {
  await clearError({redirect: "/"});
};
</script>
