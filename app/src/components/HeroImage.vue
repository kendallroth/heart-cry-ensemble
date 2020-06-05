<template>
  <div class="hero-image" :style="{ backgroundImage: `url(${this.image})` }">
    <div class="hero-image__overlay" />
    <div v-if="this.$slots.default" class="hero-image__content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: "HeroImage",
  props: {
    /**
     * Hero image
     * @type {string}
     */
    image: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
// Hero image styles
.hero-image {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  // NOTE: Background image is specified by props
  // background-image: url("");
  background-position: center center;
  background-size: cover;
  // Move behind overlay
  z-index: 0;
}

// Move content above other hero background
.hero-image__content {
  z-index: 1;
}

.hero-image__overlay {
  background-color: #000000;
  opacity: 0.5;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
}
</style>
