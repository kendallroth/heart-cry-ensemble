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
      name: "startDate",
      type: "date",
      title: "Start Date",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "endDate",
      type: "date",
      title: "End Date",
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
  ],
};
