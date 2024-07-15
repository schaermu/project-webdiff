import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";

const MAX_RETRY_COUNT = 1;

class ApiResponse {
    ok = true
    data = {}
    errors = {}
}

class ApiClient {
    _baseUrl = '/api'
    _requiresAuth = true

    constructor(base, requiresAuth = true) {
        this._baseUrl += `/${base}`
        this._requiresAuth = requiresAuth
    }

    _fetch(url, method, data, retryCount = 0) {
        const fetchProm = this._requiresAuth ? this._authFetch(url, method, data, retryCount) : this._anonFetch(url, method, data);
        return fetchProm.then(async res => {
            const jsonRes = await res.json()
            // handle validation errors from DRF
            if (res.status === 400) {
                return {
                    ok: false,
                    errors: jsonRes
                }
            } else if (!res.ok) {
                throw new Error(`Request failed: ${res.statusText}`)
            }
            return { ok: true, data: jsonRes }
        });
    }

    _anonFetch(url, method, data) {
        return fetch(`${this._baseUrl}/${url ?? ''}`, {
            method,
            headers: {
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : undefined
        });
    }

    _authFetch(url, method, data, retryCount = 0) {
        const authStore = useAuthStore();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.accessToken}`
        };

        const body = data ? JSON.stringify(data) : undefined;

        return fetch(`${this._baseUrl}/${url ?? ''}`, { method, headers, body }).then(async res => {
            // if the request fails with a 401, refresh token and try again
            if (res.status === 401 && retryCount === 0) {
                try {
                    await useAuthStore().refresh();
                    return this._authFetch(url, method, data, 1);
                } catch (e) {
                    // if refreshing the token fails, redirect to login
                    useAuthStore().logout();
                    return new Promise((resolve) => {
                        useRouter().push('/login');
                        resolve(res);
                    })
                }
            } else if (retryCount >= MAX_RETRY_COUNT) {
                // to prevent infinite fetch loop, log out after MAX_RETRY_COUNT
                useAuthStore().logout();
                return new Promise((resolve) => {
                    useRouter().push('/login');
                    resolve(res);
                })
            }

            return res;
        });
    }

    async get(id) {
        return await this._fetch(id, 'GET')
    }

    async post(data) {
        return await this._fetch(undefined, 'POST', data);
    }

    async put(url, data) {
        return await this._fetch(url, 'PUT', data);
    }

    async delete(url) {
        return await this._fetch(url, 'DELETE');
    }
}

export default ApiClient