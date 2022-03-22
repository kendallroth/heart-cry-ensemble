<template>
  <div class="season-card card elevation-2">
    <div class="season-card__title">
      <span class="season-card__title__left">
        <span class="season-card__title__name">
          {{ season.name }}
          <span class="season-card__title__type">
            ({{ season.groupType }})
          </span>
        </span>
        <span class="season-card__title__date">
          {{ seasonDates }}
        </span>
      </span>
      <g-link :to="season.path" class="button is-icon is-primary">
        <i class="material-icons">search</i>
      </g-link>
    </div>
    <div class="chips">
      <span class="chip">
        <i class="material-icons">face</i>
        <span>{{ season.members.length }}</span>
      </span>
      <span class="chip">
        <i class="material-icons">location_on</i>
        <span>{{ seasonPrograms }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { format, parseISO } from "date-fns";

export default {
  name: "SeasonCard",
  props: {
    /**
     * Season details
     */
    season: {
      type: Object,
      required: true,
    },
  },
  computed: {
    seasonDates() {
      let { startDate, endDate } = this.season;
      if (!startDate && !startDate) return "";

      const dateFormat = "yyyy-MMM-dd";
      startDate = format(parseISO(startDate), dateFormat);
      endDate = format(parseISO(endDate), dateFormat);
      return `${startDate} – ${endDate}`;
    },
    seasonPrograms() {
      const { programs = [] } = this.season;
      return programs.filter((p) => p.status !== "cancelled").length;
    },
  },
};
</script>

<style lang="scss" scoped>
.season-card {
  width: 100%;
  padding: 16px;
  transition: box-shadow 0.2s ease;
  overflow: hidden;
  border: 2px solid $theme-primary;
}

.season-card__title {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 8px;
}

.season-card__title__left {
  display: flex;
  flex-direction: column;

  > .season-card__title__name {
    margin-bottom: 6px;
  }
}

.season-card__title__name {
  display: flex;
  font-weight: 500;
}

.season-card__title__type {
  margin-left: 8px;
  color: grey;
  font-size: 0.9em;
}

.season-card__title__date {
  color: grey;
  font-size: 0.9em;
}
</style>
