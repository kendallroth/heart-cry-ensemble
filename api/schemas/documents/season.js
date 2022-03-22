import { isAfter } from "date-fns";

export default {
  name: "season",
  type: "document",
  title: "Season",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      description: "Short description of the season (ie. '2019 Fall').",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "slug",
      type: "slug",
      title: "URL Slug",
      description:
        "Slug used for the season page URL (DO NOT CHANGE FREQUENTLY!)",
      options: {
        source: "name",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "groupType",
      type: "string",
      title: "Group Type",
      options: {
        list: ["Mixed", "Male"],
        layout: "radio",
        direction: "horizontal",
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "startDate",
      type: "date",
      title: "Start Date",
      description: "End of season (including practices)",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      type: "date",
      title: "End Date",
      description: "End of season (including scheduled programs)",
      validation: (Rule) =>
        Rule.required().custom(
          (value, context) =>
            isAfter(context.document.endDate, context.document.startDate) ||
            "End date must be after start date",
        ),
    },
    {
      name: "theme",
      type: "text",
      title: "Theme",
      description: "Theme of the season music",
      rows: 3,
    },
    {
      name: "conductor",
      type: "reference",
      title: "Conductor",
      to: [{ type: "member" }],
    },
    {
      name: "members",
      type: "array",
      title: "Members",
      validation: (Rule) =>
        Rule.unique().error("Member can only be added to a season once"),
      of: [{ type: "seasonMember" }],
    },
    {
      name: "songs",
      type: "array",
      title: "Songs",
      of: [{ type: "song" }],
    },
    {
      name: "programs",
      type: "array",
      title: "Programs",
      of: [{ type: "program" }],
    },
  ],
  orderings: [
    {
      title: "Season Date",
      name: "seasonDate",
      by: [{ field: "startDate", direction: "desc" }],
    },
  ],
};
