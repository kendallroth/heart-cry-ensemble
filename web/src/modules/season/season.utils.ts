import dayjs from "dayjs";
import type {SeasonMember} from "~/modules/season/season.types";

export const getSeasonMemberPartLists = (members: SeasonMember[]): {label: string; members: Member[]}[] => {
  const partMap = members.reduce<Record<string, Member[]>>((accum, seasonMember) => {
    const partString = seasonMember.part as string;
    accum[partString] ??= [];
    accum[partString].push(seasonMember.member);
    return accum;
  }, {});

  return Object.entries(partMap).map(([label, members]) => ({label, members}));
};

export type SeasonRelativity = "past" | "present" | "future";

/**
 * Check the relativity of a season (past, present, or future) based on the current time
 *
 * NOTE: Requires hydrated 'now' time to handle both static generation and dynamic hydration.
 */
export const getSeasonRelativity = (seasonStart: Date, seasonEnd: Date, now: number): SeasonRelativity => {
  if (dayjs(seasonEnd).isBefore(now)) return "past";
  if (dayjs(seasonStart).isAfter(now)) return "future";
  return "present";
};

export interface SeasonHighlightBadgeConfig {
  color?: string;
  text: string;
}

const seasonHighlightBadgeTypes = {
  tour: {
    color: "accent",
    text: "Tour",
    condition: (season: Season) => !!season.tour,
  },
  mens: {
    color: "accent",
    text: "TTBB",
    condition: (season: Season) => season.type === SeasonType.MENS,
  },
  album: {
    color: "primary",
    text: "Album",
    condition: (season: Season) => season.releases.some((r) => r.type === MusicReleaseType.ALBUM),
  },
  single: {
    color: "primary",
    text: "Single",
    condition: (season: Season) => season.releases.some((r) => r.type === MusicReleaseType.SINGLE),
  },
  video: {
    color: "primary",
    text: "Video",
    condition: (season: Season) => season.releases.some((r) => r.type === MusicReleaseType.VIDEO),
  },
} as const satisfies Record<string, SeasonHighlightBadgeConfig & {condition: (season: Season) => boolean}>;

export type SeasonHighlightBadgeType = keyof typeof seasonHighlightBadgeTypes;

/** Season highlight badges indicate memorable aspects of a season (ie. tours, releases, etc) */
export const getSeasonHighlightBadges = (season: Season, badgeTypes?: SeasonHighlightBadgeType[]) => {
  const result: SeasonHighlightBadgeConfig[] = [];
  for (const [key, badgeDefinition] of Object.entries(seasonHighlightBadgeTypes)) {
    if (badgeTypes && !badgeTypes.includes(key as SeasonHighlightBadgeType)) continue;

    if (badgeDefinition.condition(season)) {
      const {condition: _condition, ...badgeProps} = badgeDefinition;
      result.push({...badgeProps});
    }
  }
  return result;
};
