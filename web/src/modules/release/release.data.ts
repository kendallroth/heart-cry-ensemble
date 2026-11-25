import {sort} from "fast-sort";

import {loadTempDatabase} from "~/database-loader.temp";

/**
 * All albums/videos (including unpublished)
 *
 * NOTE: Sorted by release date (treating unreleased as "newest"), then record date (both newest first)
 */
export const useQueryReleaseList = async () => {
  return useAsyncData("releases", async () => {
    const {releaseList} = await loadTempDatabase();
    return sort(releaseList).by([
      // Unreleased (no date) are upcoming, so treated as newest (fast-sort always sorts nullish values last)
      {desc: (release) => release.releaseDate?.getTime() ?? Infinity},
      {desc: (release) => release.recordDate.getTime()},
    ]);
  });
};
