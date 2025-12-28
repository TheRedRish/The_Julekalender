import { theJulekalenderQueries } from "./queries.js";

export async function getGameStatus() {
  return {
    id: "the-julekalender",
    message: "The Julekalender backend is up and running."
  };
}
