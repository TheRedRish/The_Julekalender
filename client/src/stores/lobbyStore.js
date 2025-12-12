import { writable } from "svelte/store";

export const lobbies = writable([
    {
        id: "1",
        name: "Nissemand",
        status: "waiting",
        players: [{ name: "GU" }]
    },
    {
        id: "2",
        name: "Another lobby",
        status: "waiting",
        players: [{ name: "GU" }]
    }
]);
