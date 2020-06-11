export default {
  name: "address",
  type: "object",
  title: "Address",
  fields: [
    {
      name: "street",
      type: "string",
      title: "Street Name",
    },
    {
      name: "city",
      type: "string",
      title: "City",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "province",
      type: "string",
      title: "Province",
      options: {
        list: [
          { title: "ON", value: "ON" },
          { title: "MI", value: "MI" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "country",
      type: "string",
      title: "Country",
      options: {
        list: [
          { title: "Canada", value: "canada" },
          { title: "United States", value: "unitedStates" },
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: "postalCode",
      type: "string",
      title: "Postal Code",
    },
  ],
};
