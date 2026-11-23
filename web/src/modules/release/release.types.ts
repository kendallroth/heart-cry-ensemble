export enum MusicReleaseType {
  ALBUM = "album",
  SINGLE = "single",
  VIDEO = "video",
}

export interface MusicRelease {
  title: string;
  type: MusicReleaseType;
  releaseDate: Date | null;
  thumbnailUrl?: string;
  /** Omitted for videos */
  trackCount?: number;
  /** Platform links point to the specific release */
  platforms: MusicPlatform[];
}
