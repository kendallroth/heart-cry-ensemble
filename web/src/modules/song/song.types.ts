export enum SongVoicing {
  SATB = "satb",
  MEN = "men",
  WOMEN = "women",
}

export interface Song {
  title: string;
  composer: string;
  /** Defaults to {@link SongVoicing.SATB} */
  voicing?: SongVoicing;
}
