import {loadTempDatabase} from "~/database.temp";

/** Get current (or most recent) season */
export const useQueryCurrentSeason = async () => {
  return useAsyncData("currentSeason", async () => {
    const {seasonList} = await loadTempDatabase();
    return seasonList[0];
  });
};

export const useQuerySeasonList = async () => {
  return useAsyncData("seasons", async () => {
    const {seasonList} = await loadTempDatabase();
    return seasonList;
  });
};

/** @throws Nuxt error if season is not found */
export const useQuerySeasonDetails = async (slug: MaybeRefOrGetter<string>) => {
  // TODO: Is this the correct way for reactivity?
  return useAsyncData(`season-${toValue(slug)}`, async () => {
    const {seasonList} = await loadTempDatabase();
    const season = seasonList.find((season) => season.slug === toValue(slug));
    if (!season) {
      throw createError({
        fatal: true,
        status: 404,
        statusText: "Season not found",
        message: "Season not found",
      });
    }
    return season;
  });
};
