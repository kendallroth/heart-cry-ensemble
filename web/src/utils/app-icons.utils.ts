import {
  ArrowTopRightOnSquareIcon,
  Bars3Icon,
  EnvelopeIcon,
  LinkIcon,
  MapPinIcon,
  MoonIcon,
  MusicalNoteIcon,
  PlayIcon,
  SunIcon,
  UsersIcon,
} from "@heroicons/vue/24/outline";

import ThemeSystemIcon from "~/components/icon/ThemeSystem.vue";

const appIconSizeClasses = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
};

/** Heroicon type */
export type IconType = typeof EnvelopeIcon;

export const appIcons = {
  sizeClasses: appIconSizeClasses,

  // Icons
  EmailIcon: EnvelopeIcon,
  LinkIcon,
  MenuIcon: Bars3Icon,
  MusicIcon: MusicalNoteIcon,
  OpenIcon: ArrowTopRightOnSquareIcon,
  PeopleIcon: UsersIcon,
  PlaceIcon: MapPinIcon,
  PlayIcon,
  ThemeLightIcon: SunIcon,
  ThemeDarkIcon: MoonIcon,
  ThemeSystemIcon,
};
