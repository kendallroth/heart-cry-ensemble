export default {
  name: "homePageContent",
  type: "object",
  title: "Home Page Content",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "text",
      type: "array",
      title: "Text",
      of: [{ type: "block" }],
    },
  ],
};
