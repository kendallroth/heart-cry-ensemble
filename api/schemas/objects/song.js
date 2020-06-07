export default {
  name: "song",
  type: "object",
  title: "Song",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "arranger",
      type: "string",
      title: "Arranger",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "arranger",
    },
  },
};
