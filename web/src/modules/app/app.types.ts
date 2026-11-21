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

export enum MusicReleaseType {
  ALBUM = "album",
  SINGLE = "single",
  VIDEO = "video",
}

export interface MusicRelease {
  title: string;
  type: MusicReleaseType;
  releaseDate: Date;
  thumbnailUrl?: string;
  /** Omitted for videos */
  trackCount?: number;
  /** Platform links point to the specific release */
  platforms: MusicPlatform[];
}

export interface AppMedia {
  name: string;
  type: "image" | "video";
  url: string;
}
