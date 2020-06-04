export default {
  name: "member",
  type: "document",
  title: "Member",
  fields: [
    {
      name: "name",
      type: "string",
      title: "Name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "email",
      type: "string",
      title: "Email",
    },
    {
      name: "phone",
      type: "string",
      title: "Phone",
    },
    {
      name: "address",
      type: "address",
      title: "Address",
    },
  ],
};
