import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import ApiClient from '@/utils/apiClient'

export const useAuthStore = defineStore('auth', () => {
  const authState = ref<AuthState>(), userState = ref<UserState>()

  const accessToken = computed(() => authState.value?.access)
  const refreshToken = computed(() => authState.value?.refresh)
  const isAuthenticated = computed(() => !!authState.value?.access)
  const user = computed(() => userState.value)

  async function fetchUser() {
    const apiClient = new ApiClient('users')
    userState.value = await apiClient.get('me')
  }

  async function login(username: string, password: string) {
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

    authState.value = await res.json()
    await fetchUser()
  }

  async function refresh() {
    const refreshToken = authState.value?.refresh
    if (!refreshToken) {
      throw new Error('No refresh token')
    }

    const res = await fetch('/api/token/refresh/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        refresh: refreshToken
      })
    })

    if (!res.ok) {
      throw new Error('Refresh token failed')
    }

    const jsonRes = await res.json()
    authState.value = {
      access: jsonRes.access,
      refresh: refreshToken
    }
  }

  function logout() {
    authState.value = userState.value = undefined
  }

  return { authState, userState, accessToken, refreshToken, isAuthenticated, user, fetchUser, login, logout, refresh }
}, { persist: true })

interface AuthState {
  access: string
  refresh: string
}

interface UserState {
  username: string
}