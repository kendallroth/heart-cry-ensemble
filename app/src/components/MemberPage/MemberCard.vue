<template>
  <div
    :class="{
      'elevation-1': !member.isCurrent,
      'elevation-2': member.isCurrent,
      'is-past': !member.isCurrent,
      'is-selected': selected,
    }"
    class="members-card"
  >
    <div class="members-card__content">
      <p class="members-card__content__title">
        <span class="members-card__content__name can-truncate">
          {{ member.name }}
        </span>
        <button
          :class="{ 'is-primary': member.isCurrent }"
          class="members-card__view button is-icon"
          type="button"
          @click="$emit('select', member)"
        >
          <i class="fas fa-search" />
        </button>
      </p>
    </div>
    <div class="members-card__chips">
      <span class="members-card__chip">
        <i class="fas fa-music mr-xs" />{{ member.seasons.length }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "MemberCard",
  props: {
    /**
     * Member details
     */
    member: {
      type: Object,
      required: true,
    },
    /**
     * Whether the member card is selected
     */
    selected: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.members-card {
  width: 100%;
  background-color: white;
  border-radius: 4px;
  transition: box-shadow 0.2s ease;
  overflow: hidden;
  user-select: none;

  &.is-past {
    color: grey;

    .members-card__chip {
      background-color: transparent;
      color: $theme-secondary;
      border-color: $theme-secondary;
    }

    .members-card__content__name {
      font-weight: 400;
    }
  }
}

.members-card__view {
  flex-shrink: 0;
}

.members-card__content {
  padding: 16px;
  padding-bottom: 8px;
}

.members-card__content__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.members-card__chips {
  padding: 16px;
  padding-top: 0;

  > *:not(:first-of-type) {
    margin-left: 8px;
  }
}

.members-card__chip {
  padding: 4px 8px;
  color: white;
  font-size: 0.8rem;
  background-color: $theme-secondary;
  border: 1px solid $theme-secondary;
  border-radius: 100px;
}

.members-card__content__name {
  font-weight: 500;
}
</style>
