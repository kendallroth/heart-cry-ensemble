<template>
  <Layout>
    <PageSection size="sm-8 md-6 lg-4">
      <h2 class="mb-md">Seasons</h2>
      <div class="season__list elevation-2">
        <template v-for="season in seasons">
          <Hover v-slot="{ hover }" :key="season.id">
            <SeasonCard
              :class="{ 'elevation-4': hover, 'is-current': season.isCurrent }"
              :season="season"
            />
          </Hover>
        </template>
      </div>
    </PageSection>
  </Layout>
</template>

<page-query>
query {
  seasons: allSanitySeason(sort: [
    { by: "endDate", order: DESC }
  ]) {
    edges {
      node {
        id
        path
        name
        startDate
        endDate
        groupType
        members {
          member {
            id
          }
        }
        programs {
          _key
        }
      }
    }
  }
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    currentSeason {
      id
    }
  }
}
</page-query>

<script>
// Components
import SeasonCard from "@components/Season/SeasonCard";

export default {
  name: "Seasons",
  components: {
    SeasonCard,
  },
  computed: {
    seasons() {
      const { siteSettings } = this.$page;
      const { currentSeason } = siteSettings;

      const { edges } = this.$page.seasons;
      const seasons = edges.map(({ node: season }) => {
        // Determine whether season is the current season
        const isCurrent = currentSeason.id === season.id;

        return {
          ...season,
          isCurrent,
        };
      });

      return seasons;
    },
  },
};
</script>

<style lang="scss" scoped>
$items-per-row: 4;
$item-spacing: 8px;

.season__list {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  border: 2px solid $theme-primary;

  @include xsOnly {
    border-radius: 8px;
    overflow: hidden;
  }

  @include smUp() {
    flex-wrap: wrap;
    margin: -$item-spacing;
    border: none;
    box-shadow: none;
  }

  // Season list cards
  > div {
    @include xsOnly() {
      border-radius: 0;
      border: none;
      box-shadow: none;

      &:not(:last-of-type) {
        border-bottom: 2px solid $theme-primary;
      }
    }

    &.is-current {
      @include smUp() {
        margin-bottom: 8px;
        transform: scale(1.05);
        border-color: $theme-secondary;
      }
    }

    &:not(:first-child) {
      @include smUp() {
        margin-top: 16px;
      }
    }
  }
}
</style>
