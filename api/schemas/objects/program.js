import { format } from "date-fns";

export default {
  name: "program",
  type: "object",
  title: "Program",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "dateTime",
      type: "datetime",
      title: "Date & Time",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "address",
      type: "address",
      title: "Address",
    },
    {
      name: "link",
      type: "url",
      title: "Event Link",
    },
    {
      name: "status",
      type: "string",
      title: "Status",
      options: {
        list: [
          { title: "Scheduled", value: "scheduled" },
          { title: "Tentative", value: "tentative" },
          { title: "Cancelled", value: "cancelled" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "type",
      type: "string",
      title: "Type",
      options: {
        list: [
          { title: "Full", value: "full" },
          { title: "Partial", value: "partial" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
  ],
  preview: {
    select: {
      dateTime: "dateTime",
      name: "name",
    },
    prepare({ dateTime, name }) {
      return {
        title: name,
        subtitle: format(dateTime, "YYYY-MM-DD @ HH:mm"),
      };
    },
  },
};
