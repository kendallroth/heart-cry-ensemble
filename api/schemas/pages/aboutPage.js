export default {
  name: "aboutPage",
  type: "document",
  title: "About Page",
  // NOTE: This is experimental and not recommended! However, the other approach (custom actions)
  //         does not disable adding new documents of this type from the "Add New" menu...
  __experimental_actions: ["update", "publish"],
  fields: [
    {
      name: "groupSummary",
      type: "array",
      title: "Group Summary",
      description: "Summary of the group's history and mission",
      of: [{ type: "block" }],
    },
  ],
  preview: {
    // NOTE: Override the default page title in the editor
    prepare: () => ({ title: "About Us" }),
  },
};
