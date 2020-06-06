export default {
  name: "member",
  type: "document",
  title: "Member",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      type: "string",
      title: "Address",
      description: "Short address (city, province)",
    },
    {
      name: "socialMedia",
      type: "array",
      description: "Social media links",
      of: [{ type: "socialMedia" }],
    },
  ],
};
