import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

// Document models
import member from "./documents/member";
import season from "./documents/season";
// Object models
import address from "./objects/address";
import homePageContent from "./objects/homePageContent";
import seasonMember from "./objects/seasonMember";
import socialMedia from "./objects/socialMedia";
// Singleton (page) models
import aboutPage from "./pages/aboutPage";
import homePage from "./pages/homePage";
import siteSettings from "./pages/siteSettings";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    // Documents
    member,
    season,
    // Objects
    address,
    homePageContent,
    seasonMember,
    socialMedia,
    // Pages
    aboutPage,
    homePage,
    siteSettings,
  ]),
});
