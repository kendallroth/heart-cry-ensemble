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
const publicConfig = useRuntimeConfig().public;
const now = useNow();
const currentYear = computed(() => new Date(now.value).getFullYear());

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
</script>
