import { fetchJson } from '../util/apiUtil.js';
import { userStore } from '../stores/userStore.js';
import { navigate } from 'svelte-routing';

// TODO HANDLE ERRORS

export async function registerUser(email, username, password) {
  const user = await fetchJson('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify({ email, username, password })
  });
  handleUserLogin(user);
  return user;
}

export async function loginUser(email, password) {
  const user = await fetchJson('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  handleUserLogin(user);
  return user;
}

export async function requestPasswordReset(email) {
  await fetchJson('/api/auth/forgot', {
    method: 'POST',
    body: JSON.stringify({ email })
  });
}

export async function logoutUser() {
  try {
    await fetchJson('/api/auth/logout', { method: 'POST' });
    handleUserLogout();
  } catch (error) {
    // TODO handle error
  }
}

export async function checkSession() {
  const response = await fetchJson('/api/auth/session', {}, true)

  if (response.status === 200) {
    const userStorage = localStorage.getItem("user");
    const user = JSON.parse(userStorage);
    userStore.set(user);
  } else if (response.status === 401) {
    localStorage.removeItem("user");
    userStore.set(null);
  }
}

function handleUserLogin(user) {
  userStore.set(user);
  localStorage.setItem('user', JSON.stringify(user));
}

function handleUserLogout() {
  userStore.set(null);
  localStorage.removeItem('user');
}