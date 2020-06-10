<template>
  <Layout :headerOffset="false">
    <HeroImage :image="require('@assets/images/HC-Marius-Masalar-Book.jpg')">
      <g-image
        alt="Logo"
        fit="contain"
        height="500"
        src="~/assets/images/HCE-Logo-Square.png"
        width="500"
      />
    </HeroImage>
    <PageSection class="content-blocks" size="md-10 lg-8">
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
          class="content-block__separator"
        />
      </template>
      <Hover v-slot="{ hover }">
        <SeasonCard
          :class="{ 'elevation-4': hover }"
          :season="currentSeason"
          class="season-preview"
        />
      </Hover>
    </PageSection>
  </Layout>
</template>

<page-query>
query {
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    missionStatement
    currentSeason {
      name
      startDate
      endDate
      groupType
      members {
        _key
      }
      programs {
        _key
      }
    }
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
import HeroImage from "@components/Layout/HeroImage";
import SeasonCard from "@components/Season/SeasonCard";

export default {
  name: "IndexPage",
  components: {
    HeroImage,
    SeasonCard,
  },
  computed: {
    currentSeason() {
      return this.$page.siteSettings.currentSeason;
    },
  },
};
</script>

<style lang="scss" scoped>
$content-block-width: 650px;

// Content block styles
.content-blocks {
  padding: 64px 32px;
  border-top: 24px solid black;

  hr {
    max-width: $content-block-width;
    background-color: $theme-primary;
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
  line-height: 1.6;
}

.content-block__separator {
  margin: 32px 0;
}

// Season preview styles
.season-preview {
  margin-top: 32px;
  max-width: 500px;
  border: 2px solid $theme-primary;
}
</style>
