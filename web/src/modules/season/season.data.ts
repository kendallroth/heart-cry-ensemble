import {loadTempDatabase} from "~/database-loader.temp";

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

export const useQuerySeasonDetails = (slug: MaybeRefOrGetter<string>) => {
  return useAsyncData(
    () => `season-${toValue(slug)}`,
    async () => {
      const {seasonList} = await loadTempDatabase();
      // NOTE: Nuxt warns in development when a handler resolves to 'undefined'
      return seasonList.find((season) => season.slug === toValue(slug)) ?? null;
    },
  );
};
