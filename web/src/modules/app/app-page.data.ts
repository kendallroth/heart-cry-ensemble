import type {AppPageAbout, AppPageHome, AppPageSeasons} from "./app-page.types";

export const useQueryHomePageData = async () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return useAsyncData("homeData", async (): Promise<AppPageHome> => {
    return {
      header: {
        description:
          "We are a choral ensemble dedicated to preserving the quality of our spiritual heritage by impacting our community through the heart cry of music.",
        media: {
          name: "Group photo",
          type: "image",
          url: "/photos/group/hce_2025.jpg",
        },
      },
      news: {
        description:
          "Our 2026 season wrapped up in May with recording and filming sessions, so stay tuned for our upcoming album release!",
        title: "Upcoming music videos",
        subtitle: "Latest news",
        link: {
          label: "View season",
          url: "/seasons/2026-spring",
        },
        media: {
          name: "You Are My Hiding Place",
          type: "video",
          url: "https://www.youtube.com/embed/zLRb9iOCqlw?si=ML5pzKSoyDXYDkO_&amp;controls=0",
        },
      },
    };
  });
};

export const useQueryAboutPageData = async () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return useAsyncData("aboutData", async (): Promise<AppPageAbout> => {
    return {
      content: {
        description:
          "Heart Cry Ensemble was founded in 2017 by friends from two families, the Diefenbachers and the Roths. Having grown up singing, they wanted to continue that tradition in a more organized, small-group setting.\n\nThough founded as a mixed ensemble, we've also sung a season of men's music. Each season begins with several months of weekly rehearsals before a month of programs, both near and far — in churches from Markham, ON to Detroit, MI.\n\nIn 2025 we were privileged to tour around Lake Erie and record our first music video.",
        media: {
          name: "Group photo",
          type: "image",
          url: "/photos/group/hce_2025.jpg",
        },
        mission:
          "Our primary focus is bringing encouragement to churches with a small youth presence — and we welcome any opportunity to share our message.",
      },
    };
  });
};

export const useQuerySeasonsPageData = async () => {
  // eslint-disable-next-line @typescript-eslint/require-await
  return useAsyncData("seasonsData", async (): Promise<AppPageSeasons> => {
    return {
      header: {
        description:
          "Each season begins with months of weekly rehearsals, followed by a month of programs — some close to home, some much further afield.",
      },
    };
  });
};
