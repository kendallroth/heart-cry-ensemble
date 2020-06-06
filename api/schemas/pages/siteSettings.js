export default {
  name: "siteSettings",
  type: "document",
  title: "Site Settings",
  fields: [
    {
      name: "title",
      type: "string",
      title: "Title",
      description: "Site title",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "keywords",
      type: "array",
      of: [{ type: "string" }],
      title: "Keywords",
      description: "Keywords that describe the site.",
      options: {
        layout: "tags",
      },
    },
    {
      name: "missionStatement",
      type: "text",
      title: "Mission Statement",
      description: "Short description of the group's vision",
      rows: 3,
    },
    {
      name: "contactEmail",
      type: "email",
      title: "Contact Email",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "socialMedia",
      type: "array",
      of: [{ type: "socialMedia" }],
    },
    {
      name: "currentSeason",
      type: "reference",
      to: [{ type: "season" }],
      title: "Current Season",
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    // NOTE: Override the default page title in the editor
    prepare: () => ({ title: "Site Settings" }),
  },
};
