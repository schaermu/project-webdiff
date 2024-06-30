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
    userState.value = (await apiClient.get('me')).data
  }

  async function register(email: string, password: string, password2: string, captcha: string) {
    const apiClient = new ApiClient('users/register', false)
    return await apiClient.post({
      email,
      password,
      password2,
      captcha
    })
  }

  async function verifyEmail(token: string) {
    const apiClient = new ApiClient('users/verify-email', false)
    return await apiClient.post({
      token
    })
  }

  async function resendVerifyEmail(token: string) {
    const apiClient = new ApiClient('users/resend-verification-email', false)
    return await apiClient.post({
      token
    })
  }

  async function login(email: string, password: string, captcha: string) {
    const apiClient = new ApiClient('token', false)
    const loginRes = await apiClient.post({
      email,
      password,
      captcha
    })

    authState.value = loginRes.data
    await fetchUser()
  }

  async function refresh() {
    const refreshToken = authState.value?.refresh
    if (!refreshToken) {
      throw new Error('No refresh token')
    }

    const apiClient = new ApiClient('token/refresh', false)
    const res = await apiClient.post({
      refresh: refreshToken
    });

    const jsonRes = res.data
    authState.value = {
      access: jsonRes.access,
      refresh: refreshToken
    }
  }

  function logout() {
    authState.value = userState.value = undefined
  }

  return { authState, userState, accessToken, refreshToken, isAuthenticated, user, fetchUser, login, register, verifyEmail, resendVerifyEmail, logout, refresh }
}, { persist: true })

interface AuthState {
  access: string
  refresh: string
}

interface UserState {
  firstname: string
}