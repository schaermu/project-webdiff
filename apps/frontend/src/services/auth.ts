import { useAuthStore } from '@/stores/auth'

export default {
    isLoggedIn: () => {
        const store = useAuthStore()
        return store.isAuthenticated
    },
    login: async (username: string, password: string) => {
        const res = await fetch('/api/token/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        if (!res.ok) {
            throw new Error('Login failed')
        }

        const store = useAuthStore()
        const data = await res.json()
        store.setAuthState({
            accessToken: data.access,
            refreshToken: data.refresh
        })
    },
    logout: () => {
        const store = useAuthStore()
        store.setAuthState(null)
    }
}