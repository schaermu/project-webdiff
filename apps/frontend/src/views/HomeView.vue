<script setup lang="ts">
import userService from '@/services/user'

const me = await userService.me()
</script>

<template>
  {{ me }}
</template>
