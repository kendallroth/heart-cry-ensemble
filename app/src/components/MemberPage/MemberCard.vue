<template>
  <div
    :class="{ 'is-past': !member.isCurrent }"
    class="members-card elevation-2"
  >
    <div class="members-card__title">
      <span class="members-card__title__name can-truncate">
        {{ member.name }}
      </span>
      <button
        :class="{ 'is-primary': member.isCurrent }"
        class="members-card__view button is-icon"
        type="button"
        @click="$emit('select', member)"
      >
        <i class="material-icons">search</i>
      </button>
    </div>
    <div class="members-card__chips">
      <span class="members-card__chip">
        <i class="material-icons mr-xs">music_note</i>
        <span>{{ member.seasons.length }}</span>
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
  padding: 16px;
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

  // Override ".is-icon" weight
  &.is-icon {
    padding: 6px;
  }
}

.members-card__title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
}

.members-card__title__name {
  font-weight: 500;
}

.members-card__chips {
  > *:not(:first-of-type) {
    margin-left: 8px;
  }
}

.members-card__chip {
  display: flex;
  // Necessary to prevent full-width from flex
  width: fit-content;
  padding: 4px 8px;
  color: white;
  font-size: 0.8rem;
  background-color: $theme-secondary;
  border: 1px solid $theme-secondary;
  border-radius: 100px;
}
</style>
