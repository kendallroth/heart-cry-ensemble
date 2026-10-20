<template>
  <footer class="border-t border-primary/20">
    <PageWidth
      align="center"
      class="flex-col md:flex-row md:justify-between gap-2 py-4"
    >
      <div class="text-center md:text-left">
        <p class="text-xl font-serif">Heart Cry Ensemble</p>
        <p class="text-sm text-primary/75">
          &copy; {{ currentYear }} Heart Cry Ensemble&ensp;&bullet;&ensp;Kendall
          Roth
        </p>
      </div>
      <div class="flex flex-row items-center gap-2">
        <NuxtLink
          v-for="link in socialLinks"
          :key="link.label"
          :aria-label="link.label"
          class="hover:bg-primary/10 block p-1.5 rounded-full transition-colors"
          rel="noopener noreferrer"
          target="_blank"
          :to="link.link"
        >
          <component :is="link.icon" :class="appIcons.sizeClasses.md" />
        </NuxtLink>
      </div>
    </PageWidth>
  </footer>
</template>

<script lang="ts" setup>
const publicConfig = useRuntimeConfig().public;
const currentYear = new Date().getFullYear();

interface SocialLink {
  icon: IconType;
  label: string;
  link: string;
}

// TODO: Figure out social link icons
const socialLinks: SocialLink[] = [
  /*{
    icon: appIcons.EmailIcon,
    label: "Facebook",
    link: "https://www.facebook.com/heartcryensemble",
  },*/
  /*{
    icon: appIcons.EmailIcon,
    label: "Instagram",
    link: "https://www.instagram.com/heartcryensemble",
  },*/
  {
    icon: appIcons.EmailIcon,
    label: "Email",
    link: `mailto:${publicConfig.email}`,
  },
];
</script>
