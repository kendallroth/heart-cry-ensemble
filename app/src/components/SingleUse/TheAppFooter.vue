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
      <div class="footer__info__text">
        Copyright &copy; {{ new Date().getFullYear() }} Heart Cry Ensemble
      </div>
      <div class="footer__info__icons">
        <a
          key="email"
          :href="$static.siteSettings.contactEmail"
          class="icon"
          target="_blank"
        >
          <i class="far fa-envelope" />
        </a>
        <a
          v-for="media in $static.siteSettings.socialMedia"
          :key="media.type"
          :href="media.link"
          class="icon"
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
