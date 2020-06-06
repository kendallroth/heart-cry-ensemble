export default {
  widgets: [
    { name: "project-info" },
    { name: "project-users" },
    {
      name: "netlify",
      options: {
        title: "Netlify Deployments",
        sites: [
          {
            title: "Website",
            apiId: "241083f7-ea19-4159-b091-7b5537b57be6",
            buildHookId:
              "https://api.netlify.com/build_hooks/5edb24f805042bb27d8e17df",
            name: "heart-cry-ensemble-app",
          },
        ],
      },
    },
  ],
};
