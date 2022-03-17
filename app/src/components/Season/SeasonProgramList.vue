<template>
  <div class="program-list elevation-3">
    <div v-for="program in seasonPrograms" :key="program._key" class="program">
      <div
        :class="{
          'program__header--cancelled': program.status === 'cancelled',
        }"
        class="program__header"
      >
        <div class="program__name can-truncate">
          {{ program.name }}
          <i v-if="program.type === 'partial'" class="material-icons ml-xs">
            help_outline
          </i>
        </div>
        <div :class="{ 'is-future': program.isFuture }" class="program__date">
          {{ program.dateTime | formatDate("MMM dd, yyyy @ HH:mm") }}
        </div>
      </div>
      <div class="program__details">
        <div class="program__address">
          <i class="material-icons mr-xs">location_on</i>
          <template v-if="program.address">
            {{ program.address.city }}, {{ program.address.province }}
          </template>
          <template v-else>N/A</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { isAfter } from "date-fns";

export default {
  name: "SeasonProgramList",
  props: {
    /**
     * Season programs
     */
    programs: {
      type: Array,
      required: true,
    },
  },
  computed: {
    seasonPrograms() {
      return this.programs.map((p) => {
        return {
          ...p,
          isFuture: !isAfter(new Date(), new Date(p.dateTime)),
        };
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.program-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  line-height: 1.5;
  background-color: white;
  border-radius: 8px;

  > .program:not(:last-of-type) {
    border-bottom: 1px solid $color-grey-light;
  }
}

.program {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 8px 12px;
}

.program__header {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 4px;

  @include smUp() {
    flex-direction: row;
    justify-content: space-between;
  }
}

.program__header--cancelled {
  text-decoration: line-through;
  opacity: 0.6;
}

.program__name {
  display: flex;
  font-weight: 500;
  color: $theme-primary-dark;

  @include xsOnly() {
    margin-bottom: 4px;
  }
}

.program__date {
  font-weight: 300;

  &.is-future {
    font-weight: 500;
  }
}

.program__details {
  display: flex;
  align-items: center;
}

.program__address {
  display: flex;
  align-items: center;
  color: $color-grey-dark;
  font-size: 0.9rem;

  .material-icons {
    color: $theme-secondary;
  }
}
</style>
