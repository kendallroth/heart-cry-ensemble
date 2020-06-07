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
    // NOTE: This has been deemed unnecessary currently
    /*{
      name: "programsDate",
      type: "date",
      title: "Programs Start Date",
      validation: (Rule) => Rule.required(),
    },*/
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
