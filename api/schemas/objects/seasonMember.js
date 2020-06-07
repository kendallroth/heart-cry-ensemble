export default {
  name: "seasonMember",
  type: "object",
  title: "Season Member",
  fields: [
    {
      name: "member",
      type: "reference",
      title: "Member",
      to: [{ type: "member" }],
      options: {
        // Prevent selecting the same member twice in a season
        filter: ({ document }) => {
          if (!document.members) return;

          const selectedMemberIds = document.members
            .filter((m) => m.member)
            .map((m) => m.member._ref);

          if (selectedMemberIds.length <= 0) return;

          return {
            filter: "!(_id in $selectedMembers)",
            params: {
              selectedMembers: selectedMemberIds,
            },
          };
        },
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "part",
      type: "string",
      title: "Part",
      options: {
        list: [
          { title: "Soprano", value: "soprano" },
          { title: "Alto", value: "alto" },
          { title: "Tenor", value: "tenor" },
          { title: "Bass", value: "bass" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      memberFirstName: "member.firstName",
      memberLastName: "member.lastName",
      part: "part",
    },
    prepare({ memberFirstName, memberLastName, part }) {
      return {
        title: `${memberFirstName} ${memberLastName}`,
        subtitle: part,
      };
    },
  },
};
