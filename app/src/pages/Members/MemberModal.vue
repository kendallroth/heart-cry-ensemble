<template>
  <Modal
    v-show="show"
    :persistent="false"
    :title="member && member.name"
    @close="close"
  >
    <p v-if="member && member.bio" class="member-modal__bio">
      {{ member.bio }}
    </p>
    <p v-else class="member-modal__bio is-empty">
      No bio for {{ member && member.name }}
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
  &.is-empty {
    color: #999999;
  }
}
</style>
