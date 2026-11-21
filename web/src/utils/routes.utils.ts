// eslint-disable-next-line @typescript-eslint/no-explicit-any
type RouteLink = (...args: any[]) => string;

export const routeLinks = {
  about: () => "/about",
  home: () => "/",
  seasons: {
    index: () => "/seasons",
    details: (slug: string) => `/seasons/${slug}`,
  },
} as const satisfies Record<string, RouteLink | Record<string, RouteLink>>;
