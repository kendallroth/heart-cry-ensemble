require("typeface-montserrat");

import BlockContent from "sanity-blocks-vue-component";

// Components
import Modal from "@components/Layout/Modal";
import PageSection from "@components/Layout/PageSection";
import SvgIcon from "@components/SvgIcon";
import DefaultLayout from "@layouts/Default";

// Utilities
import Breakpoints from "@utilities/breakpoints";
import { dateFilter } from "@utilities/filters";

// Styles
import "@styles/styles.scss";

export default (Vue) => {
  Vue.component("BlockContent", BlockContent);
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("SvgIcon", SvgIcon);
  Vue.component("Modal", Modal);
  Vue.component("PageSection", PageSection);

  Vue.filter("formatDate", dateFilter);

  Vue.prototype.$breakpoint = new Breakpoints({
    xs: 600,
    sm: 960,
    md: 1280,
    lg: 1920,
  });
};
