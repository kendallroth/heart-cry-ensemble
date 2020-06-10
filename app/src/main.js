require("typeface-montserrat");

import BlockContent from "sanity-blocks-vue-component";

// Components
import Modal from "@components/Modal";
import PageSection from "@components/PageSection";
import SvgIcon from "@components/SvgIcon";
import DefaultLayout from "@layouts/Default";

// Styles
import "@styles/styles.scss";

export default (Vue) => {
  Vue.component("BlockContent", BlockContent);
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("SvgIcon", SvgIcon);
  Vue.component("Modal", Modal);
  Vue.component("PageSection", PageSection);
};
