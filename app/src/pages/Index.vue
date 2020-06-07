<template>
  <Layout :headerOffset="false">
    <HeroImage :image="require('@assets/images/HC-Marius-Masalar-Book.jpg')">
      <g-image
        alt="logo"
        src="~/assets/images/HCE-Logo-Square.png"
        width="500"
      />
    </HeroImage>
    <section class="content-blocks">
      <template v-for="(contentBlock, idx) in $page.homePage.contentBlocks">
        <div :key="`${contentBlock.title}_div`" class="content-block">
          <h3 class="content-block__header">{{ contentBlock.title }}</h3>
          <BlockContent
            :blocks="contentBlock.textRaw"
            className="content-block__text"
            renderContainerOnSingleChild
          />
        </div>
        <hr
          v-if="idx < $page.homePage.contentBlocks.length - 1"
          :key="`${contentBlock.title}_hr`"
        />
      </template>
    </section>
  </Layout>
</template>

<page-query>
query {
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    missionStatement
  }
  homePage: sanityHomePage(id: "homePage") {
    contentBlocks {
      title
      textRaw: _rawText
    }
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
@import "@styles/_variables";

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
    background-color: $primary;
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
  font-size: 0.95rem;
  line-height: 2;
}
</style>
