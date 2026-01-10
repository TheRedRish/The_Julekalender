import router from "./router.js";

export const theJulekalenderModule = {
  id: "the-julekalender",
  name: "The Julekalender",
  basePath: "/the-julekalender",
  description:
    "Play as Fritz, Hansi, and Gynther and save Gammel Nok just in time. It’s hard to be a nisseman – especially when everything has to be done by the book.",
  min_players: 1,
  max_players: 3,
  display_order: 1,
  router,
};

export default theJulekalenderModule;
