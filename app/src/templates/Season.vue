<template>
  <Layout>
    <PageSection size="md-10 lg-8">
      <h2 class="season__title mb-xs">{{ season.name }}</h2>
      <h3 class="season__subtitle mb-sm">{{ season.subtitle }}</h3>
      <div class="season__dates">
        <span>{{ season.startDate }}</span>
        <i class="material-icons mx-xs">event</i>
        <span>{{ season.endDate }}</span>
      </div>
      <h3 class="mt-md mb-sm">Members</h3>
      <SeasonMemberList :members="season.members" />
    </PageSection>
    <PageSection class="pt-no" size="sm-10 md-8 lg-6">
      <h3 class="mb-sm">Songs</h3>
      <SeasonSongList :songs="season.songs" />
    </PageSection>
  </Layout>
</template>

<page-query>
query ($id: ID!) {
  season: sanitySeason(id: $id) {
    id
    name
    startDate
    endDate
    groupType
    members {
      part
      member {
        firstName
        lastName
      }
    }
    songs {
      _key
      name
      arranger
    }
    programs {
      _key
      name
      dateTime
      link
      type
      status
      address {
        city
        province
      }
    }
  }
}
</page-query>

<script>
import { format } from "date-fns";

// Components
import SeasonMemberList from "@components/Season/SeasonMemberList";
import SeasonSongList from "@components/Season/SeasonSongList";

export default {
  name: "Season",
  components: {
    SeasonMemberList,
    SeasonSongList,
  },
  computed: {
    season() {
      let subtitle = "";
      switch (this.$page.season.groupType) {
        case "Male":
          subtitle = "Heart Cry Men's Ensemble";
          break;
        case "Mixed":
        default:
          subtitle = "Heart Cry Ensemble";
      }

      return {
        ...this.$page.season,
        subtitle,
      };
    },
    seasonDates() {
      let { startDate, endDate } = this.season;
      if (!startDate && !startDate) return "";

      const dateFormat = "yyyy-MMM-dd";
      startDate = format(new Date(startDate), dateFormat);
      endDate = format(new Date(endDate), dateFormat);
      return `${startDate} – ${endDate}`;
    },
  },
};
</script>

<style lang="scss" scoped>
.season__subtitle {
  color: $color-grey;
}

.season__dates {
  display: flex;
  align-items: center;
  font-weight: 500;

  .material-icons {
    color: $theme-secondary-dark;
    font-size: 1.5em;
  }
}
</style>
