import { writable } from "svelte/store";
import { fetchJson } from "../util/apiUtil";

export const gamesStore = writable([]);

export async function loadGames() {
  const games = await fetchJson("/api/games");
  gamesStore.set(games || []);
  return games || [];
}
