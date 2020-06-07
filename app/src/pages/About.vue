<template>
  <Layout>
    <PageSection size="md-10 lg-8">
      <h2 class="about__title">Heart Cry Ensemble</h2>
      <blockquote class="about__mission-statement">
        {{ $page.siteSettings.missionStatement }}
      </blockquote>
      <BlockContent
        :blocks="$page.aboutPage.groupSummaryRaw"
        className="about__content__blocks"
      />
    </PageSection>
  </Layout>
</template>

<page-query>
query {
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    missionStatement
  }
  aboutPage: sanityAboutPage(id: "aboutPage") {
    groupSummaryRaw: _rawGroupSummary
  }
}
</page-query>

<script>
export default {
  name: "About",
};
</script>

<style lang="scss" scoped>
.about__title {
  text-align: center;
  margin-bottom: 24px;
}

.about__mission-statement {
  margin-bottom: 32px;
  padding: 8px 16px;
  font-weight: 500;
  color: $color-pink-dark;
  border: 4px solid $color-pink-light;
  border-top: none;
  border-bottom: none;
  border-radius: 4px;
}

.about__content__blocks {
  > p:not(:first-of-type) {
    margin-top: 16px;
  }
}
</style>
