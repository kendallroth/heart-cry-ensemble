export default {
  name: "streamingPlatform",
  type: "object",
  title: "Streaming Platforms",
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
      description: "Type of streaming platform",
      validation: (Rule) => Rule.required().lowercase(),
    },
    {
      name: "link",
      type: "url",
      title: "Link",
      validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }),
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
