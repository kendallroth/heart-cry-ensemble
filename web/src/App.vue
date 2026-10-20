<template>
  <TheAppHeader />

  <NuxtRouteAnnouncer />
  <!-- Pages must all use root 'PageLayout' component! -->
  <NuxtPage />

  <TheAppFooter />
</template>

<script lang="ts" setup>
useHead({
  bodyAttrs: {
    // Apply body classes in 'App.vue' vs Nuxt config for Tailwind detection
    class: "bg-background text-on-background",
  },
});
</script>
