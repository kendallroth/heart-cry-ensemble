const config = require("../config");

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
            apiId: config.netlify.app.projectId,
            buildHookId: config.netlify.app.buildHookId,
            name: config.netlify.app.projectName,
          },
        ],
      },
    },
  ],
};
