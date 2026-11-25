import dayjs from "dayjs";

export const releaseLabelMap: Record<MusicReleaseType, string> = {
  [MusicReleaseType.ALBUM]: "Album",
  [MusicReleaseType.SINGLE]: "Single",
  [MusicReleaseType.VIDEO]: "Video",
};

/**
 * Whether release has been published.
 *
 * NOTE: Requires hydrated 'now' time to handle both static generation and dynamic hydration.
 */
export const isReleasePublished = (release: MusicRelease, now: number) =>
  !!release.releaseDate && !dayjs(release.releaseDate).isAfter(now, "day");
