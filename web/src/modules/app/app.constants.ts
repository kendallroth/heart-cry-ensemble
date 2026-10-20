export const musicPlatformLinks = {
  youtube: "https://www.youtube.com/@heartcryensemble",
  spotify: "https://open.spotify.com/artist/01Qe21qMrNiIpvwjfhtOnN",
  appleMusic: "https://music.apple.com/us/artist/heart-cry-ensemble/1630628505",
  youtubeMusic: "https://music.youtube.com/channel/UC6w3WwrgdefV4HLvkA3BUTA",
} as const;

export const musicPlatforms: MusicPlatform[] = [
  { code: "youtube", label: "YouTube", link: musicPlatformLinks.youtube },
  { code: "spotify", label: "Spotify", link: musicPlatformLinks.spotify },
  {
    code: "appleMusic",
    label: "Apple Music",
    link: musicPlatformLinks.appleMusic,
  },
  {
    code: "youtubeMusic",
    label: "YouTube Music",
    link: musicPlatformLinks.youtubeMusic,
  },
];
