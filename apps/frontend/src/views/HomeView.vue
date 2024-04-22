<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const me = fetch('/api/users/me', {
  headers: {
    'Authorization': `Bearer ${authStore.accessToken}`
  }
}).then(response => {
  if (response.ok) {
    return response.json()
  } else {
    console.error('Failed to fetch user data')
  }
}).catch(error => {
  console.error('Failed to fetch user data:', error)
})
</script>

<template>
  {{ me }}
</template>
