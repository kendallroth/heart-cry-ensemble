<template>
  <header class="app__header">
    <nav class="header__links">
      <g-link class="header__link" to="/">Home</g-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: "TheAppHeader",
};
</script>

<style lang="scss" scoped>
$header-height: 80px;

// Header styles
.app__header {
  position: absolute;
  //position: fixed;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: $header-height;
  // Place above any hero images
  z-index: 10;
}

.header__links {
  text-transform: uppercase;
  font-weight: bold;
}

.header__link {
  padding: 8px;
  color: white;
  transition: color 0.2s;

  &:hover {
    color: lightgrey;
  }
}
</style>
