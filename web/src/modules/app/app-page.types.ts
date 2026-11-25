import type {AppMedia} from "./app.types";

export interface AppPageHome {
  header: {
    description: string;
    media: AppMedia;
  };
  news: {
    description: string;
    title: string;
    subtitle?: string;
    link?: {label: string; url: string} | null;
    media: AppMedia;
  };
}

export interface AppPageAbout {
  content: {
    description: string;
    media: AppMedia;
    mission: string;
  };
}

export interface AppPageSeasons {
  header: {
    description: string;
  };
}
