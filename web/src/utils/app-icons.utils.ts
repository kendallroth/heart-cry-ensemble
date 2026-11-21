import {
  IconArrowLeft,
  IconArrowRight,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconExternalLink,
  IconLink,
  IconMail,
  IconMapPin,
  IconMenu2,
  IconMoon,
  IconMusic,
  IconPlayerPlay,
  IconSun,
  IconSunMoon,
  IconUsers,
  IconX,
} from "@tabler/icons-vue";

export const appIconSizeClasses = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

/** Tabler icon type */
export type IconType = typeof IconMail;

export const appIcons = {
  sizeClasses: appIconSizeClasses,

  // Icons
  ArrowLeftIcon: IconArrowLeft,
  ArrowRightIcon: IconArrowRight,
  CloseIcon: IconX,
  EmailIcon: IconMail,
  FacebookIcon: IconBrandFacebook,
  InstagramIcon: IconBrandInstagram,
  LinkIcon: IconLink,
  MenuIcon: IconMenu2,
  MusicIcon: IconMusic,
  OpenIcon: IconExternalLink,
  PeopleIcon: IconUsers,
  PlaceIcon: IconMapPin,
  PlayIcon: IconPlayerPlay,
  ThemeLightIcon: IconSun,
  ThemeDarkIcon: IconMoon,
  ThemeSystemIcon: IconSunMoon,
  YouTubeIcon: IconBrandYoutube,
};
