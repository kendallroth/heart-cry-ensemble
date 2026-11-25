export enum MusicReleaseType {
  ALBUM = "album",
  SINGLE = "single",
  VIDEO = "video",
}

export interface MusicRelease {
  title: string;
  type: MusicReleaseType;
  /** When the release was recorded */
  recordDate: Date;
  /** When the release was made available */
  releaseDate: Date | null;
  thumbnailUrl?: string;
  /** Omitted for videos */
  trackCount?: number;
  /** Platform links point to the specific release */
  platforms: MusicPlatform[];
}
