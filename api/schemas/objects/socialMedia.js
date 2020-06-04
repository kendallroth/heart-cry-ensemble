export default {
  name: "socialMedia",
  type: "object",
  title: "Social Media",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      type: "string",
      title: "Type",
      description: "Type of social media",
      validation: (Rule) => Rule.required().lowercase(),
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      validation: (Rule) =>
        Rule.required().uri({ scheme: ["http", "https", "mailto"] }),
    },
    {
      name: "icon",
      type: "string",
      title: "Icon",
      description: "Icon name (for CSS)",
      validation: (Rule) => Rule.required(),
    },
  ],
};
