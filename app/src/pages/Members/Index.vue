<template>
  <Layout>
    <PageSection size="xl-10">
      <h2 class="mb-md">Members</h2>
      <div class="members-list">
        <div
          v-for="member in members"
          :key="member.id"
          :class="{
            'elevation-1': !member.isCurrent,
            'elevation-2': member.isCurrent,
            'is-past': !member.isCurrent,
            'is-selected': selectedMember && selectedMember.id === member.id,
          }"
          class="members-list__item"
          @click="showModal(member)"
        >
          <p class="members-list__item__name">{{ member.name }}</p>
        </div>
      </div>
      <MemberModal
        :member="selectedMember"
        :show="isMemberModalShown"
        @close="closeModal"
      />
    </PageSection>
  </Layout>
</template>

<page-query>
query {
  members: allSanityMember(sort: [
    { by: "lastName", order: ASC },
    { by: "firstName", order: ASC }
  ]) {
    edges {
      node {
        id
        firstName
        lastName
        bio
      }
    }
  }
  siteSettings: sanitySiteSettings(id: "siteSettings") {
    currentSeason {
      name
      members {
        member {
          id
        }
      }
    }
  }
}
</page-query>

<script>
// Components
import MemberModal from "./MemberModal";

const validMemberFilters = ["all"];

export default {
  name: "Members",
  components: {
    MemberModal,
  },
  data() {
    return {
      selectedMember: null,
    };
  },
  computed: {
    isMemberModalShown() {
      return Boolean(this.selectedMember);
    },
    isViewAll() {
      const { filter } = this.$route.params;
      if (!filter) return false;

      return filter === "all";
    },
    members() {
      const { currentSeason } = this.$page.siteSettings;

      const { edges } = this.$page.members;
      const members = edges.map(({ node }) => ({
        id: node.id,
        bio: node.bio,
        isCurrent: currentSeason.members.find((m) => m.member.id === node.id),
        name: `${node.firstName} ${node.lastName}`,
      }));

      return this.isViewAll ? members : members.filter((m) => m.isCurrent);
    },
  },
  mounted() {
    const { filter } = this.$route.params;
    if (!filter) return;
    if (!validMemberFilters.includes(filter)) {
      this.$router.replace("/members");
    }
  },
  methods: {
    showModal(member) {
      this.selectedMember = member;
    },
    closeModal() {
      this.selectedMember = null;
    },
  },
};
</script>

<style lang="scss" scoped>
$items-per-row: 4;
$item-spacing: 8px;

.members-list {
  display: flex;
  flex-wrap: wrap;
  margin: -$item-spacing;
}

.members-list__item {
  width: 100%;
  margin: 8px;
  padding: 16px;
  cursor: pointer;
  background-color: white;
  border-radius: 4px;
  transition: box-shadow 0.2s ease;

  @include smUp() {
    width: calc(100% / 2 - #{$item-spacing * 2});
  }

  @include mdUp() {
    width: calc(100% / 3 - #{$item-spacing * 2});
  }

  @include lgUp() {
    width: calc(100% / 4 - #{$item-spacing * 2});
  }

  &.is-past {
    color: grey;
    opacity: 0.95;

    .members-list__item__name {
      font-weight: 400;
    }
  }

  &:hover,
  &.is-selected {
    box-shadow: 0 0 1px 2px #{transparentize($theme-primary, 0.5)};
  }
}

.members-list__item__name {
  font-weight: 500;
}
</style>
