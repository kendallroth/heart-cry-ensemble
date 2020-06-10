<template>
  <Layout>
    <PageSection size="sm-8 md-6 lg-4">
      <h2 class="mb-md">Seasons</h2>
      <div class="season__list elevation-2">
        <SeasonCard
          v-for="season in seasons"
          :key="season.id"
          :class="{ 'is-current': season.isCurrent }"
          :season="season"
        />
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
        name
        #startDate
        #endDate
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
      name
      members {
        member {
          id
        }
      }
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
          id: season.id,
          isCurrent,
          members: season.members,
          name: season.name,
          programs: season.programs,
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

  > div {
    opacity: 0.9;

    @include xsOnly() {
      border-radius: 0;
      border: none;
      box-shadow: none;

      &:not(:last-of-type) {
        border-bottom: 2px solid $theme-primary;
      }
    }

    &.is-current {
      box-shadow: 0 0 1px 3px $theme-primary;
      opacity: 1;
    }

    &:not(:first-child) {
      @include smUp() {
        margin-top: 16px;
      }
    }
  }
}
</style>
