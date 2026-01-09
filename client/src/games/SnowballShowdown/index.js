import SnowballShowdown from "./SnowballShowdown.svelte";

export default {
  id: "snowball-showdown",
  basePath: "/games/snowball-showdown",
  routes: [
    {
      path: "/:id",
      Component: SnowballShowdown,
      requiresAuth: true,
      requiresLobbyMember: true,
      params: true,
    },
  ],
};
