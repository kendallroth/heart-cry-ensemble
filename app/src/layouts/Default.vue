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
@import "@styles/_breakpoints";

$header-height: 80px;
$footer-padding: 32px;

.app__layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

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
}

.header__links {
  text-transform: uppercase;
  font-weight: bold;

  a {
    padding: 8px;
    color: white;
    transition: color 0.2s;

    &:hover {
      color: lightgrey;
    }
  }
}

.app__content {
  flex-grow: 1;
  // NOTE: Necessary to properly handle hero images and their content
  z-index: 1;
}

// Footer styles
.app__footer {
  color: white;
  background-color: #3b3b3b;
}

.footer__contact {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: calc(#{$footer-padding} * 1.5);
  font-size: 120%;
  font-weight: bold;
}

.footer__contact__title {
  color: #bfbfbf;
}

.footer__contact__email {
  margin-top: 16px;
  color: white;
}

.footer__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: $footer-padding;
  border-top: 1px solid grey;

  @include tabletUp {
    flex-direction: row;
  }
}

.footer__info__text {
  font-size: 80%;

  @include phoneDown {
    margin-bottom: 24px;
  }
}

.footer__info__icons {
  .icon {
    font-size: 20px;
    color: white;

    &:not(:first-of-type) {
      margin-left: 16px;
    }
  }
}
</style>
