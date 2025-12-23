import { toastInfo } from "../util/toast";

export function copyLobbyLink(lobbyId) {
    navigator.clipboard.writeText(
        window.location.origin + `/lobby/${lobbyId}`
    );
    toastInfo("Copied lobby link to clipboard");
}