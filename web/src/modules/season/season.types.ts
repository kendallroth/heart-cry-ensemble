export enum SeasonType {
  MIXED = "mixed",
  MENS = "mens",
}

export interface SeasonMember {
  member: Member;
  part: MemberPart;
}

export interface Season {
  slug: string;
  dateStart: Date;
  dateEnd: Date;
  /** Date-based name (ie. 'Fall 2025', etc) */
  dateName: string;
  contentDescription?: string | null;
  contentTitle?: string | null;
  media?: AppMedia | null;
  /** Season title */
  title: string;
  /** Whether season included a tour */
  tour?: boolean;
  type: SeasonType;

  conductor: Member | null;
  members: SeasonMember[];
  programs: Program[];
  releases: MusicRelease[];
  songs: Song[];
}
