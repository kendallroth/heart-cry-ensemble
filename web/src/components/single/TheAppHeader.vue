<template>
  <header class="bg-primary text-on-primary">
    <PageWidth align="center" class="flex-row justify-between py-4">
      <div class="flex items-center gap-4">
        <NuxtImg class="rounded-lg" src="/icon-maskable.png" width="48" />
        <h2 class="text-xl font-medium">Heart Cry Ensemble</h2>
      </div>
      <div class="hidden lg:flex gap-8">
        <nav class="flex items-center gap-6">
          <NuxtLink
            v-for="link in appLinks"
            active-class="!opacity-100 font-semibold"
            class="opacity-80 font-medium"
            :key="link.label"
            :to="link.path"
          >
            {{ link.label }}
          </NuxtLink>
        </nav>

        <!-- Stored theme preference is only known client-side (avoids hydration mismatch) -->
        <ClientOnly>
          <button
            class="p-2 rounded-full hover:bg-on-primary/10 transition-colors"
            type="button"
            :aria-label="`${currentTheme.label} (click to change)`"
            :title="currentTheme.label"
            @click="handleThemeToggle"
          >
            <component
              :is="currentTheme.icon"
              :class="appIcons.sizeClasses.md"
            />
          </button>
          <template #fallback>
            <!-- TODO: Render bare button OR the same one if it doesn't cause issues -->
            <span class="block p-2">
              <span class="block" :class="appIcons.sizeClasses.md" />
            </span>
          </template>
        </ClientOnly>

        <button
          class="bg-accent-light hover:bg-accent text-on-accent-light hover:text-on-accent py-2 px-4 rounded-full font-medium transition-colors"
        >
          Host a program
        </button>
      </div>
      <div class="lg:hidden">
        <!-- TODO: Implement mobile menu -->
        <MenuIcon :class="appIcons.sizeClasses.md" />
      </div>
    </PageWidth>
  </header>
</template>

<script lang="ts" setup>
import type { Component } from "vue";

const { MenuIcon } = appIcons;

interface AppLink {
  label: string;
  path: string;
}

const appLinks: AppLink[] = [
  { label: "Home", path: "/" },
  { label: "Seasons", path: "/seasons" },
  { label: "About", path: "/about" },
];

type ThemePreference = "system" | "light" | "dark";

interface ThemeOption {
  icon: Component;
  label: string;
  next: ThemePreference;
}

const themeOptions: Record<ThemePreference, ThemeOption> = {
  system: {
    icon: appIcons.ThemeSystemIcon,
    label: "System theme",
    next: "light",
  },
  light: { icon: appIcons.ThemeLightIcon, label: "Light theme", next: "dark" },
  dark: { icon: appIcons.ThemeDarkIcon, label: "Dark theme", next: "system" },
};

const colorMode = useColorMode();

const currentTheme = computed(
  () =>
    themeOptions[colorMode.preference as ThemePreference] ??
    themeOptions.system,
);

const handleThemeToggle = () => {
  colorMode.preference = currentTheme.value.next;
};
</script>
