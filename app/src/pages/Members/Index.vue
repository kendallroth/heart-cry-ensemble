<template>
  <Layout>
    <PageSection size="xl-10">
      <h2 class="mb-sm">Members</h2>
      <div class="members-list elevation-2">
        <MemberCard
          v-for="member in members"
          :key="member.id"
          :member="member"
          :selected="selectedMember && selectedMember.id === member.id"
          @select="showModal(member)"
        >
          <p class="members-list__item__title">
            <span class="members-list__item__name">{{ member.name }}</span>
            <span class="members-list__item__seasons">
              <i class="far fa-calendar-alt mr-xs" />{{ member.seasons }}
            </span>
          </p>
        </MemberCard>
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
import MemberCard from "./MemberCard";
import MemberModal from "./MemberModal";

const validMemberFilters = ["all"];

export default {
  name: "Members",
  components: {
    MemberCard,
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
      const { seasons, siteSettings } = this.$page;
      const { currentSeason } = siteSettings;

      const { edges } = this.$page.members;
      const members = edges.map(({ node }) => {
        // Determine whether member is part of the current season
        const isCurrent = currentSeason.members.find(
          (m) => m.member.id === node.id,
        );
        // Find all seasons that the member has been part of
        const memberSeasons = seasons.edges.reduce(
          (accum, { node: season }) =>
            season.members.find((m) => m.member.id === node.id)
              ? [...accum, season.name]
              : accum,
          [],
        );

        return {
          id: node.id,
          bio: node.bio,
          isCurrent,
          seasons: memberSeasons,
          name: `${node.firstName} ${node.lastName}`,
        };
      });

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

.members-selector {
  margin-bottom: 24px;
}

.members-list {
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
