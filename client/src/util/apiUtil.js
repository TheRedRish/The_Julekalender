const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:8080';

export async function fetchJson(path, options = {}, getResponse = false) {
    const response = await fetch(`${API_BASE}${path}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...(options.headers || {})
        },
        ...options
    });

    if (getResponse) {
        return response;
    }

    if (!response.ok) {
        throw new Error(response.statusText || 'Request failed');
    }

    const data = await response.json();
    return data;
}