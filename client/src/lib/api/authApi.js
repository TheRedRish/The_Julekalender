import { fetchJson } from '../../util/apiUtil.js';

export function registerUser(email, password) {
  return fetchJson('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export function loginUser(email, password) {
  return fetchJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
}

export function requestPasswordReset(email) {
  return fetchJson('/api/auth/forgot', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

export function logoutUser() {
  return fetchJson('/api/auth/logout', { method: 'POST' });
}

export function fetchSession() {
  return fetchJson('/api/auth/session');
}