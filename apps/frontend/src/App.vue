<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from './components/shared/NavigationBar.vue';
</script>

<template>
  <div class="flex flex-col w-full h-auto">
    <NavigationBar />
    <main class="bg-gray-50 dark:bg-gray-900 h-full">
      <RouterView />
    </main>
  </div>
</template>
