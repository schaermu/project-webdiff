import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useAuthStore = defineStore('auth', () => {
  const authState = ref<AuthState | null>(null)
  useLocalStorage('authState', authState)

  const accessToken = computed(() => authState.value?.accessToken)
  const refreshToken = computed(() => authState.value?.refreshToken)
  const isAuthenticated = computed(() => !!authState.value?.accessToken)

  function setAuthState(state: AuthState | null) {
    authState.value = state
  }

  return { authState, accessToken, refreshToken, setAuthState, isAuthenticated }
})

interface AuthState {
  accessToken: string | null,
  refreshToken: string | null,
}
