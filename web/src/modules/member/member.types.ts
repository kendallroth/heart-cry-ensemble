export interface Member {
  name: string;
  location?: string | null;
}

export enum MemberPart {
  SOPRANO = "soprano",
  ALTO = "alto",
  /** NOTE: Only intended for use with TTBB groups */
  LEAD = "lead",
  TENOR = "tenor",
  /** NOTE: Only intended for use with TTBB groups */
  BARITONE = "baritone",
  BASS = "bass",
}
