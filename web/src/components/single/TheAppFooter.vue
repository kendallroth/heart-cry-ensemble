<template>
  <footer class="bg-surface border-t border-primary/20">
    <PageWidth align="center" class="flex-col md:flex-row md:justify-between gap-2 py-4">
      <div class="text-center md:text-left">
        <p class="text-xl font-serif">Heart Cry Ensemble</p>
        <p class="text-sm text-primary/75">
          &copy; {{ currentYear }} Heart Cry Ensemble&ensp;&bullet;&ensp;Kendall Roth
        </p>
      </div>
      <div class="flex flex-row items-center gap-2">
        <p v-if="showHydratedNow" class="text-sm text-primary/75">
          {{ currentNowTime }}
        </p>
        <AppButton
          v-for="link in socialLinks"
          :key="link.label"
          :icon="link.icon"
          target="_blank"
          :to="link.link"
          variant="text"
        />
      </div>
    </PageWidth>
  </footer>
</template>

<script lang="ts" setup>
import {useMagicKeys, whenever} from "@vueuse/core";
import dayjs from "dayjs";

const publicConfig = useRuntimeConfig().public;

const now = useNow();
const currentYear = computed(() => dayjs(now.value).year());
const currentNowTime = computed(() => dayjs(now.value).format("YYYY-MMM-DD HH:mm:ss"));

interface SocialLink {
  icon: IconType;
  label: string;
  link: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: appIcons.FacebookIcon,
    label: "Facebook",
    link: "https://www.facebook.com/heartcryensemble",
  },
  {
    icon: appIcons.InstagramIcon,
    label: "Instagram",
    link: "https://www.instagram.com/heartcryensemble",
  },
  {
    icon: appIcons.EmailIcon,
    label: "Email",
    link: `mailto:${publicConfig.email}`,
  },
];

const shortKeys = useMagicKeys();

const showHydratedNow = ref(false);
const breakpointKeys = shortKeys["Ctrl+Shift+Alt+KeyT"];
whenever(breakpointKeys!, () => {
  showHydratedNow.value = !showHydratedNow.value;
});
</script>
