export function getQueryParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}

export function buildRedirectQuery(redirectPath) {
  const path = redirectPath ?? `${window.location.pathname}${window.location.search}`;
  return `?redirect=${encodeURIComponent(path)}`;
}

export function getRedirectQueryParam() {
  const redirect = getQueryParam("redirect");
  return redirect ? `?redirect=${encodeURIComponent(redirect)}` : "";
}

export function getSafeRedirect(fallbackPath = "/") {
  const redirect = getQueryParam("redirect");
  if (redirect && redirect.startsWith("/")) {
    return redirect;
  }
  return fallbackPath;
}

export function clearUrlQuery() {
  const url = new URL(window.location.href);
  url.searchParams.forEach((value, key) => url.searchParams.delete(key));
  window.history.replaceState({}, "", url.toString());
}
