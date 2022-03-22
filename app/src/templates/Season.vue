<template>
  <Layout>
    <PageSection class="pb-no" size="md-10 lg-8">
      <h2 class="season__title mb-xs">{{ season.name }}</h2>
      <h3 class="season__subtitle mb-sm">{{ season.subtitle }}</h3>
      <div class="season__dates">
        <span>{{ season.startDate }}</span>
        <i class="material-icons mx-xs">event</i>
        <span>{{ season.endDate }}</span>
      </div>
      <h3 class="mt-md mb-sm">Members</h3>
      <SeasonMemberList
        :conductor="season.conductor"
        :members="season.members"
      />
    </PageSection>
    <PageSection class="pt-no" size="sm-10 md-8 lg-6">
      <h3 class="mt-md mb-sm">Programs</h3>
      <SeasonProgramList
        v-if="season.programs && season.programs.length > 0"
        :programs="season.programs"
      />
      <div v-else class="is-empty">No programs entered for this season yet</div>
      <h3 class="mt-md mb-sm">Songs</h3>
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
    conductor {
      firstName
      lastName
    }
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
import { format, parseISO } from "date-fns";

// Components
import SeasonMemberList from "@components/Season/SeasonMemberList";
import SeasonProgramList from "@components/Season/SeasonProgramList";
import SeasonSongList from "@components/Season/SeasonSongList";

export default {
  name: "Season",
  components: {
    SeasonMemberList,
    SeasonProgramList,
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

      let { startDate, endDate } = this.$page.season;
      const dateFormat = "yyyy-MMM-dd";
      startDate = startDate ? format(parseISO(startDate), dateFormat) : null;
      endDate = endDate ? format(parseISO(endDate), dateFormat) : null;

      return {
        ...this.$page.season,
        endDate,
        startDate,
        subtitle,
      };
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
