export enum MusicPlatformType {
  YOUTUBE = "youtube",
  SPOTIFY = "spotify",
  APPLE_MUSIC = "appleMusic",
  YOUTUBE_MUSIC = "youtubeMusic",
}

export interface MusicPlatform {
  label: string;
  link: string;
  type: MusicPlatformType;
}

export interface AppMedia {
  name: string;
  type: "image" | "video";
  url: string;
}
