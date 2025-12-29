import router from "./router.js";

export const snowballShowdownModule = {
    id: "snowball-showdown",
    name: "Snowball Showdown",
    basePath: "/api/games/snowball-showdown",
    description: "Fast-paced snowball fights with short rounds and quick rematches.",
    min_players: 2,
    max_players: 6,
    display_order: 2,
    router
};

export default snowballShowdownModule;
