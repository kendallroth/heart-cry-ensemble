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
