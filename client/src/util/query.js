export function getQueryParam(name) {
    return new URLSearchParams(window.location.search).get(name);
}

export function clearUrlQuery() {
    const url = new URL(window.location.href);
    url.searchParams.forEach((value, key) => url.searchParams.delete(key));
    window.history.replaceState({}, "", url.toString());
}
