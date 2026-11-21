<template>
  <TheAppHeader />

  <NuxtRouteAnnouncer />
  <!-- Pages must all use root 'PageLayout' component! -->
  <NuxtPage />

  <ClientOnly>
    <div
      v-if="showBreakpointIndicators"
      class="fixed left-2 bottom-2 py-1 px-2 bg-accent-light rounded-full text-xs shadow z-10 pointer-events-none"
    >
      <component :is="breakpointIcon" class="inline w-3 h-3 mr-1" />
      {{ breakpointName || "xs" }}
    </div>
  </ClientOnly>

  <TheAppFooter />
</template>

<script lang="ts" setup>
import {IconDeviceDesktop, IconDeviceMobile} from "@tabler/icons-vue";
import {useMagicKeys, whenever} from "@vueuse/core";

useHead({
  bodyAttrs: {
    // Apply body classes in 'App.vue' vs Nuxt config for Tailwind detection
    class: "bg-background text-on-background",
  },
});

const {mobile, active} = useDisplay();
const breakpointName = active();
const shortKeys = useMagicKeys();

const showBreakpointIndicators = ref(false);
const breakpointKeys = shortKeys["Ctrl+Shift+Alt+KeyM"];
whenever(breakpointKeys!, () => {
  showBreakpointIndicators.value = !showBreakpointIndicators.value;
});
const breakpointIcon = computed(() => (mobile.value ? IconDeviceMobile : IconDeviceDesktop));
</script>
