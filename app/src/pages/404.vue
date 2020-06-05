<template>
  <Layout :includeFooter="false">
    <HeroImage :image="require('@assets/images/HC-Marius-Masalar-Book.jpg')">
      <div class="page-not-found box">
        <h2 class="page-not-found__title has-text-danger">404</h2>
        <div class="page-not-found__subtitle">
          You just hit a page that doesn't exist!
        </div>
        <g-link class="page-not-found__action button is-info is-medium" to="/">
          Go to Home
        </g-link>
      </div>
    </HeroImage>
  </Layout>
</template>

<script>
// Components
import HeroImage from "@components/HeroImage";

export default {
  name: "PageNotFound",
  components: {
    HeroImage,
  },
  metaInfo: {
    title: "Page Not Found",
  },
};
</script>

<style lang="scss" scoped>
.page-not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
  text-align: center;
}

.page-not-found__title {
  margin-bottom: 24px;
  font-size: 8rem;
  line-height: 8rem;
  font-weight: bold;
}

.page-not-found__subtitle {
  font-size: 1.5rem;
}

.page-not-found__action {
  margin-top: 32px;
}
</style>
