<template>
  <footer class="app__footer">
    <div class="footer__contact">
      <p class="footer__contact__title">Contact Us</p>
      <a
        :href="`mailto:${$static.siteSettings.contactEmail}`"
        class="footer__contact__email"
      >
        {{ $static.siteSettings.contactEmail }}
      </a>
    </div>
    <div class="footer__info">
      <div class="footer__info__developer">
        Created with
        <i class="material-icons has-text-love">favorite</i>&ensp;|&ensp;View at
        <a
          aria-label="GitLab"
          class="has-text-gitlab"
          href="https://gitlab.com/kendallroth/heart-cry-ensemble"
          rel="noreferrer"
          target="_blank"
        >
          <SvgIcon icon="gitlab" />
        </a>
      </div>
      <div class="footer__info__text">
        Copyright &copy; {{ new Date().getFullYear() }} Heart Cry Ensemble
      </div>
      <div class="footer__info__icons">
        <a
          v-for="platform in $static.siteSettings.streamingPlatforms"
          :key="platform.type"
          :aria-label="platform.name"
          :href="platform.link"
          class="icon"
          rel="noreferrer"
          target="_blank"
        >
          <!-- TODO: Change to "icon" -->
          <SvgIcon :icon="platform.type" />
        </a>
        <div class="footer__info__icons__divider" />
        <a
          key="email"
          :href="`mailto:${$static.siteSettings.contactEmail}`"
          aria-label="Email"
          class="icon"
          rel="noreferrer"
          target="_blank"
        >
          <i class="material-icons">mail_outline</i>
        </a>
        <a
          v-for="media in $static.siteSettings.socialMedia"
          :key="media.type"
          :aria-label="media.name"
          :href="media.link"
          class="icon"
          rel="noreferrer"
          target="_blank"
        >
          <!-- TODO: Change to "icon" -->
          <SvgIcon :icon="media.type" />
        </a>
      </div>
    </div>
  </footer>
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
    streamingPlatforms {
      icon
      link
      name
      type
    }
  }
}
</static-query>

<script>
export default {
  name: "TheAppFooter",
};
</script>

<style lang="scss" scoped>
@import "@styles/_breakpoints";

$footer-padding: 32px;

.app__footer {
  color: $color-light;
  background-color: $color-dark;
}

.footer__contact {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: calc(#{$footer-padding} * 1.5);
  font-weight: bold;
}

.footer__contact__title {
  color: $color-grey-light;
}

.footer__contact__email {
  margin-top: 16px;
  color: white;
  font-size: 1.2rem;

  &:hover {
    color: $theme-secondary-light;
  }
}

// Bottom footer section
.footer__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $footer-padding;
  font-size: 0.9rem;
  border-top: 1px solid $color-grey;

  @include smDown {
    > *:not(:first-child) {
      margin-top: 16px;
    }
  }

  @include mdUp {
    flex-direction: row;

    > * {
      width: calc(100% / 3);
    }
  }
}

.footer__info__developer,
.footer__info__text {
  color: $color-grey-light;
}

.footer__info__developer {
  display: flex;
  align-items: center;

  .has-text-love {
    margin-left: 4px;
    color: #ff6f8c;
  }

  .has-text-gitlab {
    // NOTE: Necessary to properly center "a" tag
    display: flex;
    margin-left: 6px;
    color: #ff9238;

    svg {
      width: $icon-font-size;
      height: $icon-font-size;
    }
  }
}

.footer__info__text {
  text-align: center;
}

.footer__info__icons {
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > :not(:first-child) {
    margin-left: 16px;
  }

  .icon {
    display: flex;
    color: white;
    font-size: 1.25em;

    &:hover {
      color: $theme-secondary-light;
    }
  }
}

.footer__info__icons__divider {
  align-self: stretch;
  width: 1px;
  background-color: white;
}
</style>
