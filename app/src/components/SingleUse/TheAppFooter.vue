<template>
  <footer class="app__footer">
    <div class="footer__contact">
      <h4 class="footer__contact__title">Contact Us</h4>
      <a
        :href="`mailto:${$static.siteSettings.contactEmail}`"
        class="footer__contact__email"
      >
        {{ $static.siteSettings.contactEmail }}
      </a>
    </div>
    <div class="footer__info">
      <div class="footer__info__developer is-aligned-left">
        Created with <i class="fa fa-heart has-text-love" />&ensp;|&ensp;View
        at&nbsp;
        <a
          aria-label="GitLab"
          class="has-text-gitlab"
          href="https://gitlab.com/kendallroth/heart-cry-ensemble"
          rel="noreferrer"
          target="_blank"
        >
          <i class="fab fa-gitlab" />
        </a>
      </div>
      <div class="footer__info__text is-aligned-center">
        Copyright &copy; {{ new Date().getFullYear() }} Heart Cry Ensemble
      </div>
      <div class="footer__info__icons is-aligned-right">
        <a
          key="email"
          :href="$static.siteSettings.contactEmail"
          aria-label="Email"
          class="icon"
          rel="noreferrer"
          target="_blank"
        >
          <i class="far fa-envelope" />
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
          <i :class="media.icon" />
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
$text-grey-light: #bfbfbf;

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
  font-size: 1.2rem;
  font-weight: bold;
}

.footer__contact__title {
  color: $text-grey-light;
}

.footer__contact__email {
  margin-top: 16px;
  color: white;
}

// Bottom footer section
.footer__info {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: $footer-padding;
  font-size: 0.9rem;
  border-top: 1px solid grey;

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

.footer__info__text,
.footer__info__developer {
  color: $text-grey-light;

  .has-text-love {
    color: #f14668;
  }
  .has-text-gitlab {
    color: #ff9238;
  }
}

.footer__info__icons {
  .icon {
    font-size: 1.4rem;
    color: white;

    &:not(:first-of-type) {
      margin-left: 16px;
    }
  }
}
</style>
