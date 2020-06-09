<template>
  <Modal
    v-show="show"
    :closable="false"
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
    <p v-if="member && member.seasons.length > 0" class="member-modal__seasons">
      <i class="material-icons">music_note</i>
      <span class="member-modal__seasons__text">
        {{ member.seasons.join(",&ensp;") }}
      </span>
    </p>
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
    color: #999999;
  }
}

.member-modal__seasons {
  display: flex;
  align-items: center;
  margin-top: 16px;

  .material-icons {
    color: $theme-secondary;
  }
}

.member-modal__seasons__text {
  margin-left: 8px;
}
</style>
