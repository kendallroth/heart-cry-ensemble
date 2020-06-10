<template>
  <div class="season-card card elevation-2">
    <div class="season-card__title">
      <span class="season-card__title__left">
        <span class="season-card__title__name">
          {{ season.name }}
        </span>
        <span class="season-card__title__date">
          {{ seasonDate }}
        </span>
      </span>
      <button
        class="button is-icon is-primary"
        disabled
        type="button"
        @click="$emit('select', season)"
      >
        <i class="material-icons">search</i>
      </button>
    </div>
    <div class="chips">
      <span class="chip">
        <i class="material-icons">face</i>
        <span>{{ season.members.length }}</span>
      </span>
      <span class="chip">
        <i class="material-icons">location_on</i>
        <span>{{ season.programs.length }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { format } from "date-fns";

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
    seasonDate() {
      let { startDate, endDate } = this.season;
      const dateFormat = "yyyy-MMM-dd";
      startDate = format(new Date(startDate), dateFormat);
      endDate = format(new Date(endDate), dateFormat);
      return `${startDate} – ${endDate}`;
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
  user-select: none;
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
  font-weight: 500;
}

.season-card__title__date {
  font-style: italic;
  color: grey;
}
</style>
