import { writable } from "svelte/store";
import { fetchJson } from "../util/apiUtil";

export const gamesStore = writable([]);

export async function loadGames() {
  try {
    const games = await fetchJson("/api/games");
    gamesStore.set(games || []);
    return games || [];
  } catch (error) {
    console.error("Failed to load games.", error);
    throw error;
  }
}
