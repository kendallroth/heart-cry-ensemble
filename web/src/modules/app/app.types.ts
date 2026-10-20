export interface MusicPlatform {
  code: keyof typeof musicPlatformLinks;
  label: string;
  link: string;
}
