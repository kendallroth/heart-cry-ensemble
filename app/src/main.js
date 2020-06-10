require("typeface-montserrat");

import BlockContent from "sanity-blocks-vue-component";

// Components
import Modal from "@components/Layout/Modal";
import PageSection from "@components/Layout/PageSection";
import Hover from "@components/Hover";
import SvgIcon from "@components/SvgIcon";
import DefaultLayout from "@layouts/Default";

// Utilities
import { breakpointMixin } from "@utilities/breakpoints";
import { dateFilter } from "@utilities/filters";

// Styles
import "@styles/styles.scss";

export default (Vue) => {
  Vue.component("BlockContent", BlockContent);
  // Set default layout as a global component
  Vue.component("Layout", DefaultLayout);
  Vue.component("Hover", Hover);
  Vue.component("SvgIcon", SvgIcon);
  Vue.component("Modal", Modal);
  Vue.component("PageSection", PageSection);

  Vue.filter("formatDate", dateFilter);

  Vue.mixin(breakpointMixin);
};
