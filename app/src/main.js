require("typeface-montserrat");

import BlockContent from "sanity-blocks-vue-component";

// Components
import DefaultLayout from "@layouts/Default";
import PageSection from "@components/PageSection";

// Styles
import "@styles/styles.scss";

export default (Vue) => {
  Vue.component("BlockContent", BlockContent);
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("PageSection", PageSection);
};
