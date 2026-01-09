import SnowballShowdown from "./SnowballShowdown/index.js";
import TheJulekalender from "./TheJulekalender/index.js";

export const gameModules = [TheJulekalender, SnowballShowdown];

export const gameRoutes = gameModules.flatMap((game) => {
    const basePath = game.basePath;
    return game.routes.map((route) => ({
        ...route,
        path: `${basePath}${route.path}`,
    }));
});

export function getBasePathByGameId(gameId) {
    return gameModules.find((game) => game.id === gameId).basePath;
}
