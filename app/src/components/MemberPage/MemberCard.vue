<template>
  <div
    :class="{ 'is-past': !member.isCurrent }"
    class="members-card card elevation-2"
  >
    <div class="members-card__title">
      <span class="members-card__title__name can-truncate">
        {{ member.name }}
      </span>
      <button
        :class="{ 'is-primary': member.isCurrent }"
        class="button is-icon ml-auto"
        type="button"
        @click="$emit('select', member)"
      >
        <i class="material-icons">search</i>
      </button>
    </div>
    <div class="chips">
      <span class="chip">
        <i class="material-icons">music_note</i>
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
  },
};
</script>

<style lang="scss" scoped>
.members-card {
  width: 100%;
  padding: 16px;
  transition: box-shadow 0.2s ease;
  overflow: hidden;

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

.members-card__title {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.members-card__title__name {
  font-weight: 500;
}
</style>
