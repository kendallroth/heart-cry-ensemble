<template>
  <header class="bg-primary text-on-primary">
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
            color="on-primary"
            :text="link.label"
            :to="link.path"
            variant="text"
          />
        </nav>

        <!-- Stored theme preference is only known client-side (avoids hydration mismatch) -->
        <ClientOnly>
          <AppButton
            color="on-primary"
            :icon="currentTheme.icon"
            :title="currentTheme.label"
            variant="text"
            @click="handleThemeToggle"
          />
          <template #fallback>
            <!-- TODO: Render bare button OR the same one if it doesn't cause issues -->
            <!-- Matches 'md' icon button size -->
            <span class="block h-10 aspect-square" />
          </template>
        </ClientOnly>

        <AppButton
          color="accent-light"
          target="_blank"
          text="Host a program"
          :to="`mailto:${publicConfig.email}?subject=Host a program`"
        />
      </div>
      <div class="lg:hidden">
        <!-- TODO: Implement mobile menu -->
        <MenuIcon :class="appIcons.sizeClasses.md" />
      </div>
    </PageWidth>
  </header>
</template>

<script lang="ts" setup>
import type {Component} from "vue";

const publicConfig = useRuntimeConfig().public;

const {MenuIcon} = appIcons;

interface AppLink {
  label: string;
  path: string;
}

const appLinks: AppLink[] = [
  {label: "Home", path: "/"},
  {label: "Seasons", path: "/seasons"},
  {label: "About", path: "/about"},
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
  light: {icon: appIcons.ThemeLightIcon, label: "Light theme", next: "dark"},
  dark: {icon: appIcons.ThemeDarkIcon, label: "Dark theme", next: "system"},
};

const colorMode = useColorMode();

const currentTheme = computed(
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  () => themeOptions[colorMode.preference as ThemePreference] ?? themeOptions.system,
);

const handleThemeToggle = () => {
  colorMode.preference = currentTheme.value.next;
};
</script>
