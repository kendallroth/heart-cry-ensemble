export default {
  name: "aboutPage",
  type: "document",
  title: "About Page",
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
