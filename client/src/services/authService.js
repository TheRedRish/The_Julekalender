import { fetchJson } from "../util/apiUtil.js";
import { userStore } from "../stores/userStore.js";
import { authLoadingStore } from "../stores/loadingStore.js";
import { connectSocket, disconnectSocket } from "../sockets/socket.js";

export async function registerUser(email, username, password) {
  try {
    const user = await fetchJson("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, username, password }),
    });
    handleUserLogin(user);
    return user;
  } catch (error) {
    console.error("Failed to register user.", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const user = await fetchJson("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    handleUserLogin(user);
    return user;
  } catch (error) {
    console.error("Failed to log in user.", error);
    throw error;
  }
}

export async function requestPasswordReset(email) {
  try {
    await fetchJson("/api/auth/forgot", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  } catch (error) {
    console.error("Failed to request password reset.", error);
    throw error;
  }
}

export async function logoutUser() {
  try {
    await fetchJson("/api/auth/logout", { method: "POST" });
    handleUserLogout();
  } catch (error) {
    console.error("Failed to log out user.", error);
    throw error;
  }
}

export async function checkSession() {
  const minTimeoutMs = 500;
  const startTime = Date.now();

  authLoadingStore.set(true);

  try {
    const response = await fetchJson("/api/auth/session", {}, true);

    if (response.ok) {
      const user = await response.json();
      handleUserLogin(user.user);
    } else {
      handleUserLogout();
    }
  } catch {
    handleUserLogout();
  } finally {
    const endTime = Date.now();
    const timeout = Math.max(minTimeoutMs - (endTime - startTime), 0);
    setTimeout(() => authLoadingStore.set(false), timeout);
  }
}

function handleUserLogin(user) {
  connectSocket();
  userStore.set(user);
  localStorage.setItem("user", JSON.stringify(user));
}

function handleUserLogout() {
  disconnectSocket();
  userStore.set(null);
  localStorage.removeItem("user");
}
