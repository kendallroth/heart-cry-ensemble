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
      <h2 class="about__heading mb-sm">Music</h2>
      <p>
        Heart Cry has been blessed to be able to record and produce several
        recordings in recent seasons. CDs can be obtained by contacting the
        group/members or at programs ($10). Recordings can also be found on the
        major streaming platforms!
      </p>
      <div class="about__music-platforms">
        <a
          v-for="platform in $page.siteSettings.streamingPlatforms"
          :key="platform.type"
          :aria-label="platform.name"
          :href="platform.link"
          class="about__music-platforms__platform"
          rel="noreferrer"
          target="_blank"
        >
          <!-- TODO: Change to "icon" -->
          <SvgIcon :icon="platform.type" />
          <div>{{ platform.name }}</div>
        </a>
      </div>
      <hr />
      <h2 class="about__heading mb-sm">Members</h2>
      <div class="about__members__description">
        Members of the {{ currentSeason.name }} season
      </div>
      <SeasonMemberList
        :conductor="currentSeason.conductor"
        :members="currentSeason.members"
      />
      <g-link class="button is-large is-primary mt-md" to="/members/current/">
        Member Bios
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
      conductor {
        firstName
        lastName
      }
      members {
        _key
        part
        member {
          firstName
          lastName
        }
      }
    }
    streamingPlatforms {
      icon
      link
      name
      type
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

.about__music-platforms {
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  @include smDown {
    width: 100%;

    > :not(:first-child) {
      margin-top: 0.8rem;
    }
  }

  @include mdUp {
    flex-direction: row;
    align-items: center;

    > :not(:first-child) {
      margin-left: 1rem;
    }
  }

  .about__music-platforms__platform {
    display: flex;
    align-items: center;
    color: $theme-primary-dark;
    font-size: 1rem;

    svg {
      margin-right: 8px;
      font-size: 1.5rem;
    }
  }
}
</style>
