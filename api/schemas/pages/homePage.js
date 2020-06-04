export default {
  name: "homePage",
  type: "document",
  title: "Home Page",
  fields: [
    {
      name: "missionStatement",
      type: "text",
      title: "Mission Statement",
      description: "Short description of the group's vision",
      rows: 3,
    },
  ],
  preview: {
    // NOTE: Override the default page title in the editor
    prepare: () => ({ title: "Home" }),
  },
};
