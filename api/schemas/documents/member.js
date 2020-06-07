export default {
  name: "member",
  type: "document",
  title: "Member",
  fields: [
    {
      name: "firstName",
      type: "string",
      title: "First Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "lastName",
      type: "string",
      title: "Last Name",
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
    {
      name: "bio",
      type: "text",
      title: "Biography",
      description: "Short biography about the member",
      rows: 3,
    },
  ],
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
    },
    prepare({ firstName = "", lastName = "" }) {
      return {
        title: `${firstName} ${lastName}`,
      };
    },
  },
  orderings: [
    {
      title: "Name",
      name: "name",
      by: [
        { field: "lastName", direction: "asc" },
        { field: "firstName", direction: "asc" },
      ],
    },
  ],
};
