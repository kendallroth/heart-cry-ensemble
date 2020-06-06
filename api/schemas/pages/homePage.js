export default {
  name: "homePage",
  type: "document",
  title: "Home Page",
  // NOTE: This is experimental and not recommended! However, the other approach (custom actions)
  //         does not disable adding new documents of this type from the "Add New" menu...
  __experimental_actions: ["update", "publish"],
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
