export default {
  name: "homePage",
  type: "document",
  title: "Home Page",
  fields: [
    {
      name: "contentBlocks",
      type: "array",
      title: "Content Blocks",
      description: "Content blocks beneath main hero image",
      of: [{ type: "homePageContent" }],
    },
  ],
  preview: {
    // NOTE: Override the default page title in the editor
    prepare: () => ({ title: "Home" }),
  },
};
