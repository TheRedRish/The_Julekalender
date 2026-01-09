import snowballShowdownModule from "./SnowballShowdown/index.js";
import theJulekalenderModule from "./TheJulekalender/index.js";

export const gameModules = [theJulekalenderModule, snowballShowdownModule];

export function registerGameRouters(app) {
    for (const module of gameModules) {
        if (!module.router || !module.basePath) {
            continue;
        }
        app.use(module.basePath, module.router);
    }
}
