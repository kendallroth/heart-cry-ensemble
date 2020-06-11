<template>
  <div class="season-members elevation-3">
    <div v-for="(part, name) in partMembers" :key="name" class="member-list">
      <div class="member-list__title">{{ name }}</div>
      <div
        v-for="member in part"
        :key="member.key"
        class="member-list__name can-truncate"
      >
        {{ member.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SeasonMembersList",
  props: {
    /**
     * Season members
     */
    members: {
      type: Array,
      required: true,
    },
  },
  computed: {
    partMembers() {
      const members = this.members.reduce((accum, m) => {
        const part = m.part.charAt(0).toUpperCase() + m.part.substring(1);
        const member = {
          key: m._key,
          name: `${m.member.firstName} ${m.member.lastName}`,
          part,
        };
        const partMembers = accum[part] || [];
        partMembers.push(member);

        return { ...accum, [part]: partMembers };
      }, {});

      return members;
    },
  },
};
</script>

<style lang="scss" scoped>
.season-members {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  line-height: 1.75;
  background-color: white;
  border-radius: 8px;

  @include xsOnly() {
    > div:not(:last-of-type) {
      border-bottom: 1px solid $theme-primary;
    }
  }

  @include smOnly() {
    > div:nth-of-type(2n) {
      border-left: 1px solid $theme-primary;
    }
    > div:nth-of-type(-n + 2) {
      border-bottom: 1px solid $theme-primary;
    }
  }

  @include mdUp() {
    > div:not(:first-of-type) {
      border-left: 1px solid $theme-primary;
    }
  }
}

.member-list {
  width: 100%;
  padding: 16px;

  @include smUp() {
    width: calc(100% / 2);
  }

  @include mdUp() {
    width: calc(100% / 4);
  }
}

.member-list__title {
  font-weight: 500;
  color: $theme-primary-dark;
}

.member-list__name {
  @include xsOnly() {
    line-height: 1.5;
  }
}
</style>
