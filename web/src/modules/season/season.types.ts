import type {AppMedia} from "../app/app.types";
import type {MemberPart} from "../member/member.types";

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
  contentDescription?: string | null;
  contentTitle?: string | null;
  media?: AppMedia | null;
  name: string;
  theme?: string | null;
  type: SeasonType;

  conductor: Member | null;
  members: SeasonMember[];
  programs: Program[];
  releases: MusicRelease[];
  songs: Song[];
}
