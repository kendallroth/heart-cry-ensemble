<template>
  <Layout>
    <div class="hero-image">
      <div class="hero-image__overlay" />
      <g-image
        alt="logo"
        src="~/assets/images/HCE-Logo-Square.png"
        width="500"
      />
    </div>
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
export default {
  name: "IndexPage",
};
</script>

<style lang="scss" scoped>
@import "~bulma/sass/utilities/_all.sass";

$content-block-width: 650px;

// Hero image styles
.hero-image {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-image: url("../assets/images/HC-Marius-Masalar-Book.jpg");
  background-position: center center;
  background-size: cover;
  // Move behind other page elements
  z-index: -1;

  // Move above other page elements
  img {
    z-index: 1;
  }
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
  font-size: 250%;
  font-weight: bold;
}

.content-block__text {
  color: black;
  font-size: 90%;
  line-height: 2;
}
</style>
