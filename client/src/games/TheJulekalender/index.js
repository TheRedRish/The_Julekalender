import TheJulekalender from "./TheJulekalender.svelte";

export default {
  id: "the-julekalender",
  basePath: "/games/the-julekalender",
  isGame: true,
  routes: [
    {
      path: "/:id",
      Component: TheJulekalender,
      requiresAuth: true,
      requiresLobbyMember: true,
      params: true,
    },
  ],
};
