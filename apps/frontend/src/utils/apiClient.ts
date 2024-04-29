import { useAuthStore } from "@/stores/auth";

class ApiClient {
    _baseUrl = '/api'

    constructor(base: string) {
        this._baseUrl += `/${base}`
    }

    _fetch(url: string | undefined, method: string, data?: any, retryCount = 0) {
        const authStore = useAuthStore();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authStore.accessToken}`
        };

        const body = data ? JSON.stringify(data) : undefined;

        return fetch(`${this._baseUrl}/${url ?? ''}/`, { method, headers, body }).then(async res => {
            if (res.status === 401 && retryCount === 0) {
                await useAuthStore().refresh();
                return this._fetch(url, method, data, 1);
            } else if (retryCount > 0) {
                throw new Error('Unauthorized request');
            }

            return res;
        });
    }

    async get(id: string = '') {
        const res = await this._fetch(id, 'GET')

        if (!res.ok) {
            throw new Error('Request failed');
        }

        return await res.json();
    }

    async post(data: any) {
        const res = await this._fetch(undefined, 'POST', data);

        if (!res.ok) {
            throw new Error('Request failed');
        }

        return await res.json();
    }

    async put(url: string, data: any) {
        const res = await this._fetch(url, 'PUT', data);

        if (!res.ok) {
            throw new Error('Request failed');
        }

        return await res.json();
    }

    async delete(url: string) {
        const res = await this._fetch(url, 'DELETE');

        if (!res.ok) {
            throw new Error('Request failed');
        }
    }
}

export default ApiClient