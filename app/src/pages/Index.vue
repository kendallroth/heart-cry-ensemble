<template>
  <Layout :headerOffset="false" :headerTransparent="true">
    <HeroImage :image="require('@assets/images/HC-Marius-Masalar-Book.jpg')">
      <g-image
        alt="logo"
        src="~/assets/images/HCE-Logo-Square.png"
        width="500"
      />
    </HeroImage>
    <section class="content-blocks">
      <div class="content-block mission-statement">
        <h3 class="content-block__header">Who We Are</h3>
        <div class="content-block__text">
          {{ $page.homePage.missionStatement }}
        </div>
      </div>
      <hr />
      <div class="content-block upcoming-events">
        <h3 class="content-block__header">Upcoming Events</h3>
        <div class="content-block__text">
          Our next season of programs will begin this fall
          <em>(COVID-19 permitting)</em>.
        </div>
      </div>
    </section>
  </Layout>
</template>

<page-query>
query {
  homePage: sanityHomePage(id: "homePage") {
    missionStatement
  }
}
</page-query>

<script>
// Components
import HeroImage from "@components/HeroImage";

export default {
  name: "IndexPage",
  components: {
    HeroImage,
  },
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all.sass";

$content-block-width: 650px;

// Content block styles
.content-blocks {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 64px 32px;
  border-top: 24px solid $black;

  hr {
    height: 1px;
    width: 100%;
    max-width: $content-block-width;
    background-color: $black;
  }
}

.content-block {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: $content-block-width;
  text-align: center;
}

.content-block__header {
  margin-bottom: 16px;
  font-size: 2.5rem;
  font-weight: bold;
}

.content-block__text {
  color: black;
  font-size: 0.9rem;
  line-height: 2;
}
</style>
