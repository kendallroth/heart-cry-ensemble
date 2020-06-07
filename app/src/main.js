require("typeface-montserrat");

import BlockContent from "sanity-blocks-vue-component";

// Components
import DefaultLayout from "@layouts/Default";

// Styles
import "@styles/_variables.scss";
import "@styles/index.scss";

export default (Vue) => {
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("BlockContent", BlockContent);
};
