<template>
  <header class="theme-dark bg-background">
    <PageWidth align="center" class="flex-row justify-between py-4">
      <div class="flex items-center gap-4">
        <NuxtImg class="rounded-lg" src="/icon-maskable.png" width="48" />
        <h2 class="text-xl font-medium">Heart Cry Ensemble</h2>
      </div>
      <div class="hidden lg:flex items-center gap-8">
        <nav class="flex items-center gap-2">
          <AppButton
            v-for="link in appLinks"
            :key="link.label"
            active-class="font-semibold"
            color="primary"
            :text="link.label"
            :to="link.path"
            variant="text"
          />
        </nav>

        <ThemeToggleButton v-if="isDev" />

        <AppButton
          color="accent"
          target="_blank"
          text="Host a program"
          :to="`mailto:${publicConfig.email}?subject=Host a program`"
        />
      </div>
      <div class="lg:hidden">
        <AppButton
          :aria-expanded="mobileMenuOpen"
          aria-haspopup="dialog"
          color="primary"
          :icon="MenuIcon"
          text="Open menu"
          variant="text"
          @click="mobileMenuOpen = true"
        />
      </div>
    </PageWidth>

    <TheMobileMenu v-model:open="mobileMenuOpen" :links="appLinks" />
  </header>
</template>

<script lang="ts" setup>
import {routeLinks} from "~/utils/routes.utils";

export interface AppLink {
  label: string;
  path: string;
}

const publicConfig = useRuntimeConfig().public;

const {MenuIcon} = appIcons;

const appLinks: AppLink[] = [
  {label: "Home", path: routeLinks.home()},
  {label: "Seasons", path: routeLinks.seasons.index()},
  {label: "About", path: routeLinks.about()},
];

const mobileMenuOpen = ref(false);
const isDev = import.meta.dev;
</script>
