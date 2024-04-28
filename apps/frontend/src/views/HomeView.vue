<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore()
</script>

<template>
  <pre>
  {{ authStore.user }}
  </pre>
</template>
