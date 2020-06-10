<template>
  <Layout>
    <PageSection size="xl-10">
      <h2 class="mb-sm">Members</h2>
      <div class="members__filter button-group">
        <button
          v-for="filter in memberListFilters"
          :key="filter.value"
          :class="{ 'is-primary': memberListFilter === filter.value }"
          class="button"
          type="button"
          @click="onFilterSelect(filter)"
        >
          {{ filter.label }}
        </button>
      </div>
      <div class="members__list elevation-2">
        <MemberCard
          v-for="member in members"
          :key="member.id"
          :member="member"
          :selected="selectedMember && selectedMember.id === member.id"
          @select="showModal(member)"
        />
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
  seasons: allSanitySeason(sort: [
    { by: "endDate", order: DESC }
  ]) {
    edges {
      node {
        id
        name
        #startDate
        #endDate
        members {
          member {
            id
          }
        }
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
import MemberCard from "@components/MemberPage/MemberCard";
import MemberModal from "@components/MemberPage/MemberModal";

const memberListFilters = [
  { label: "All", value: "all" },
  { label: "Current", value: "current" },
  { label: "Past", value: "past" },
];

export default {
  name: "Members",
  components: {
    MemberCard,
    MemberModal,
  },
  data() {
    return {
      filterType: "current",
      memberListFilters,
      selectedMember: null,
    };
  },
  computed: {
    isMemberModalShown() {
      return Boolean(this.selectedMember);
    },
    members() {
      const { seasons, siteSettings } = this.$page;
      const { currentSeason } = siteSettings;

      const { edges } = this.$page.members;
      const members = edges.map(({ node: member }) => {
        // Determine whether member is part of the current season
        const isCurrent = currentSeason.members.find(
          (m) => m.member.id === member.id,
        );
        // Find all seasons that the member has been part of
        const memberSeasons = seasons.edges.reduce(
          (accum, { node: season }) =>
            season.members.find((m) => m.member.id === member.id)
              ? [...accum, season.name]
              : accum,
          [],
        );

        return {
          id: member.id,
          bio: member.bio,
          isCurrent,
          seasons: memberSeasons,
          name: `${member.firstName} ${member.lastName}`,
        };
      });

      if (this.memberListFilter === "current") {
        return members.filter((m) => m.isCurrent);
      }
      if (this.memberListFilter === "past") {
        return members.filter((m) => !m.isCurrent);
      }
      return members;
    },
    memberListFilter() {
      return this.$route.params.filter;
    },
  },
  mounted() {
    const { filter } = this.$route.params;
    // Redirect all non-valid member filter type routes
    if (!filter || !memberListFilters.find((f) => f.value === filter)) {
      this.$router.replace("/members/current/");
    }
  },
  methods: {
    /**
     * Close the member modal
     */
    closeModal() {
      this.selectedMember = null;
    },
    /**
     * Show the member modal
     */
    showModal(member) {
      this.selectedMember = member;
    },
    /**
     * Update the selected member filter
     * @param {string} filter - Selected member filter
     */
    onFilterSelect(filter) {
      if (filter.value === this.memberListFilter) return;

      // Avoid cluttering history when switching through filter
      this.$router.replace(`/members/${filter.value}`);
    },
  },
};
</script>

<style lang="scss" scoped>
$items-per-row: 4;
$item-spacing: 8px;

.members__filter {
  margin-bottom: 24px;
}

.members__list {
  display: flex;
  flex-direction: column;
  width: 100%;

  @include xsOnly {
    border-radius: 8px;
    overflow: hidden;
  }

  @include smUp() {
    flex-direction: row;
    flex-wrap: wrap;
    margin: -$item-spacing;
    box-shadow: none;
  }

  > div {
    @include xsOnly() {
      border-radius: 0;
      box-shadow: none;

      &:not(:last-of-type) {
        border-bottom: 1px solid grey;
      }
    }

    @include smUp() {
      margin: 8px;
      width: calc(100% / 2 - #{$item-spacing * 2});
    }

    @include mdUp() {
      width: calc(100% / 3 - #{$item-spacing * 2});
    }

    @include lgUp() {
      width: calc(100% / 4 - #{$item-spacing * 2});
    }
  }
}
</style>
