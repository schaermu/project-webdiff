import { useAuthStore } from "@/stores/auth";

class ApiClient {
    _baseUrl = '/api'

    constructor(base: string) {
        this._baseUrl += `/${base}`
    }

    _fetch(url: string | undefined, method: string, data?: any) {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${useAuthStore().accessToken}`
        };

        const body = data ? JSON.stringify(data) : undefined;

        return fetch(`${this._baseUrl}/${url ?? ''}`, { method, headers, body });
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