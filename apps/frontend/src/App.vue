<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="container mx-auto">
    <header class="flex flex-wrap sm:justify-start sm:flex-nowrap w-full bg-white text-sm py-4 dark:bg-neutral-800">
      <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <a class="flex-none text-xl font-semibold dark:text-white" href="#">Brand</a>
        <div class="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          <RouterLink
            class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            exactActiveClass="font-medium text-blue-500" to="/">Home</RouterLink>
          <RouterLink
            class="font-medium text-gray-600 hover:text-gray-400 dark:text-neutral-400 dark:hover:text-neutral-500"
            exactActiveClass="font-medium text-blue-500" to="/login">Login</RouterLink>
        </div>
      </nav>
    </header>
    <RouterView />
  </div>
</template>
