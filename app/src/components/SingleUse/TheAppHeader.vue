<template>
  <header
    :class="{ 'app__header--transparent': transparent }"
    class="app__header navbar"
  >
    <nav class="header__links">
      <g-link class="header__link" to="/">Home</g-link>
      <g-link class="header__link" to="/about/">About Us</g-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheAppHeader",
  props: {
    /**
     * Whether header is transparent
     */
    transparent: {
      type: Boolean,
      default: false,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
// Header styles
.app__header {
  position: absolute;
  //position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: $theme-primary;
  height: $layout-navbar-height;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.2), 0 4px 5px 0 rgba(0, 0, 0, 0.14),
    0 1px 10px 0 rgba(0, 0, 0, 0.12);
  z-index: 10;

  &.app__header--transparent {
    background-color: transparent;
    box-shadow: none;
  }
}

.header__links {
  text-transform: uppercase;
  font-weight: bold;

  & > *:not(:first-of-type) {
    margin-left: 16px;
  }
}

.header__link {
  padding: 8px;
  color: transparentize(white, 0.25);
  transition: color 0.2s;

  &:hover,
  &.active--exact {
    color: white;
  }
}
</style>
