export interface Season {
  dateStart: Date;
  dateEnd: Date;
  label: string;
  members: number;
  programs: number;
  songs: number;
  type: "mixed" | "mens";
}
