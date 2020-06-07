export default {
  name: "program",
  type: "object",
  title: "Program",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      type: "address",
      title: "Address",
    },
    {
      name: "link",
      type: "url",
      title: "Event Link",
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "scheduled", value: "Scheduled" },
          { title: "tentative", value: "Tentative" },
          { title: "cancelled", value: "Cancelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "Partial", value: "partial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "status",
    },
  },
};
