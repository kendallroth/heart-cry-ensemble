<template>
  <Layout>
    <h2 class="about__title">Heart Cry Ensemble</h2>
    <section class="columns is-centered">
      <div class="about__content column is-10-tablet is-8-desktop is-6-fullhd">
        <blockquote class="about__mission-statement">
          {{ $page.siteSettings.missionStatement }}
        </blockquote>
        <BlockContent
          :blocks="$page.aboutPage.groupSummaryRaw"
          className="about__content__blocks"
        />
      </div>
    </section>
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
@import "@styles/_variables";

.about__title {
  text-align: center;
  margin: 24px 0;
}

.about__content {
  padding: 0 32px;
  margin-bottom: 32px;
}

.about__mission-statement {
  margin-bottom: 32px;
  padding: 8px 16px;
  font-weight: 500;
  color: $pink-dark;
  border: 4px solid $pink-light;
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
