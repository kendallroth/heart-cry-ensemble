import {loadTempDatabase} from "~/database-loader.temp";

export const useQueryGroupStats = async () => {
  return useAsyncData("groupStats", async () => {
    const {memberList, seasonList} = await loadTempDatabase();
    return {
      members: memberList.length,
      programs: seasonList.reduce((accum, s) => accum + s.programs.length, 0),
      seasons: seasonList.length,
    };
  });
};

export const useQueryMusicPlatforms = async () => {
  return useAsyncData("musicPlatforms", async () => {
    const {musicPlatformList} = await loadTempDatabase();
    return musicPlatformList;
  });
};
