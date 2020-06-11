<template>
  <Modal
    v-show="show"
    :closable="true"
    :persistent="false"
    :title="member && member.name"
    @close="close"
  >
    <p class="member-modal__bio">
      <span v-if="member && member.bio">{{ member.bio }}</span>
      <span v-else class="is-empty">
        No bio for {{ member && member.name }}
      </span>
    </p>
    <div class="member-modal__details">
      <p v-if="member" class="member-modal__detail">
        <i class="material-icons">account_balance</i>
        <span class="member-modal__detail__text">
          {{ member.church || "Unknown" }}
        </span>
      </p>
      <p v-if="member" class="member-modal__detail">
        <i class="material-icons">location_on</i>
        <span class="member-modal__detail__text">
          {{ member.address || "Unknown" }}
        </span>
      </p>
      <p
        v-if="member && member.seasons.length > 0"
        class="member-modal__detail"
      >
        <i class="material-icons">music_note</i>
        <span class="member-modal__detail__text">
          {{ member.seasons.join(",&ensp;") }}
        </span>
      </p>
    </div>
  </Modal>
</template>

<script>
export default {
  name: "MemberModal",
  props: {
    /**
     * Selected member
     */
    member: {
      type: Object,
      default: null,
    },
    /**
     * Whether modal is shown
     */
    show: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    /**
     * Close the modal
     */
    close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss" scoped>
.member-modal__bio {
  .is-empty {
    color: $color-grey;
  }
}

.member-modal__details {
  display: flex;
  flex-direction: column;
  margin-top: 16px;

  > .member-modal__detail:not(:first-child) {
    margin-top: 12px;
  }
}

.member-modal__detail {
  display: flex;
  align-items: center;

  .material-icons {
    margin-right: 8px;
    color: $theme-secondary;
  }
}
</style>
