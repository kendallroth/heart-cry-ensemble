export enum ProgramStatus {
  CONFIRMED = "confirmed",
  TENTATIVE = "tentative",
  CANCELLED = "cancelled",
}

export enum ProgramType {
  FULL = "full",
  PARTIAL = "partial",
  /** Livestream-only */
  LIVESTREAM = "livestream",
}

export interface Program {
  /** Full address */
  address?: string | null;
  /** Date and time */
  date: Date;
  /** Event link (livestream, etc) */
  eventLink?: string | null;
  /** Short location (city, etc) */
  location: string | null;
  /** Defaults to {@link ProgramStatus.CONFIRMED} */
  status?: ProgramStatus;
  /** Defaults to {@link ProgramType.FULL} */
  type?: ProgramType;
  venue: string;
}
