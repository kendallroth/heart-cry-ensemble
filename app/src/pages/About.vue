<template>
  <Layout>
    <PageSection size="md-10 lg-8">
      <h2 class="about__heading mb-sm">Heart Cry Ensemble</h2>
      <blockquote class="about__mission-statement">
        {{ $page.siteSettings.missionStatement }}
      </blockquote>
      <BlockContent
        :blocks="$page.aboutPage.groupSummaryRaw"
        className="about__description__blocks"
      />
      <hr />
      <h2 class="about__heading mb-sm">Members</h2>
      <div class="about__members__description">
        Members of the current {{ currentSeason.name }} season
      </div>
      <SeasonMemberList :members="currentSeason.members" />
      <g-link
        class="page-not-found__action button is-large is-primary mt-md"
        to="/members/current/"
      >
        Members
      </g-link>
    </PageSection>
  </Layout>
</template>

<page-query>
query {
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    missionStatement
    currentSeason {
      name
      members {
        _key
        part
        member {
          firstName
          lastName
        }
      }
    }
  }
  aboutPage: sanityAboutPage(id: "aboutPage") {
    groupSummaryRaw: _rawGroupSummary
  }
}
</page-query>

<script>
// Components
import SeasonMemberList from "@components/Season/SeasonMemberList";

export default {
  name: "About",
  components: {
    SeasonMemberList,
  },
  computed: {
    currentSeason() {
      return this.$page.siteSettings.currentSeason;
    },
  },
};
</script>

<style lang="scss" scoped>
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

.about__description__blocks {
  > p:not(:first-of-type) {
    margin-top: 16px;
  }
}

.about__members {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  line-height: 1.75;
  background-color: white;
  border-radius: 8px;

  @include xsOnly() {
    > div:not(:last-of-type) {
      border-bottom: 1px solid $theme-primary;
    }
  }

  @include smOnly() {
    > div:nth-of-type(2n) {
      border-left: 1px solid $theme-primary;
    }
    > div:nth-of-type(-n + 2) {
      border-bottom: 1px solid $theme-primary;
    }
  }

  @include mdUp() {
    > div:not(:first-of-type) {
      border-left: 1px solid $theme-primary;
    }
  }
}

.about__members__description {
  margin-bottom: 24px;
  color: $color-grey;
}

.member-list {
  width: 100%;
  padding: 16px;

  @include smUp() {
    width: calc(100% / 2);
  }

  @include mdUp() {
    width: calc(100% / 4);
  }
}

.member-list__title {
  font-weight: 500;
  color: $theme-primary-dark;
}

.member-list__name {
  line-height: 1.75;
}
</style>
