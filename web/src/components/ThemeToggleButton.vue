<template>
  <!-- Stored theme preference is only known client-side (avoids hydration mismatch) -->
  <ClientOnly>
    <AppButton
      :color="color"
      :icon="currentTheme.icon"
      :text="currentTheme.label"
      variant="text"
      @click="toggleTheme"
    />
    <template #fallback>
      <!-- Matches 'md' icon button size -->
      <span class="block h-10 aspect-square" />
    </template>
  </ClientOnly>
</template>

<script lang="ts" setup>
import type {Component} from "vue";
import type {AppButtonThemeColor} from "./app-button.types";

interface ThemeToggleButtonProps {
  color?: AppButtonThemeColor;
}

withDefaults(defineProps<ThemeToggleButtonProps>(), {
  color: "primary",
});

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

/** Cycle through theme preferences (system -> light -> dark) */
const toggleTheme = () => {
  colorMode.preference = currentTheme.value.next;
};
</script>
