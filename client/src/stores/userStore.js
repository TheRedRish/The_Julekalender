import { writable } from 'svelte/store';

const initialUser = (() => {
    if (typeof localStorage === 'undefined') return null;

    const storedUser = localStorage.getItem('user');

    if (!storedUser) return null;

    return JSON.parse(storedUser);
})();

export const userStore = writable(initialUser);