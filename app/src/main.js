require("typeface-montserrat");

// Components
import DefaultLayout from "@layouts/Default";

// Styles
import "@styles/_variables-bulma.scss";
import "@styles/index.scss";

export default (Vue) => {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
};
