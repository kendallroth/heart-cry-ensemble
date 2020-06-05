<template>
  <div class="app__layout">
    <TheAppHeader />
    <!-- Default content slot -->
    <div class="app__content">
      <slot />
    </div>
    <TheAppFooter v-if="includeFooter" />
  </div>
</template>

<static-query>
query {
  metadata {
    siteName
  }
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    contactEmail
    socialMedia {
      icon
      link
      name
      type
    }
  }
}
</static-query>

<script>
// Components
import TheAppFooter from "@components/SingleUse/TheAppFooter";
import TheAppHeader from "@components/SingleUse/TheAppHeader";

export default {
  name: "DefaultLayout",
  components: {
    TheAppFooter,
    TheAppHeader,
  },
  props: {
    /**
     * Whether to include the footer
     * @type {boolean}
     */
    includeFooter: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.app__layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.app__content {
  flex-grow: 1;
  // NOTE: Necessary to properly handle hero images and their content
  z-index: 1;
}
</style>
