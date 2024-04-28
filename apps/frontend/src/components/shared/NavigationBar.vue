<template>
  <div class="navbar bg-base-300">
    <div class="navbar-start">
      <div class="dropdown">
        <div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </div>
        <ul tabindex="0" class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          v-if="authStore.isAuthenticated">
          <NavigationItems />
        </ul>
      </div>
      <div class="flex-1">
        <RouterLink class="btn btn-ghost text-xl" to="/">webdiff</RouterLink>
      </div>
    </div>
    <div class="navbar-center hidden lg:flex flex-none" v-if="authStore.isAuthenticated">
      <ul class="menu menu-horizontal px-1">
        <NavigationItems />
      </ul>
    </div>
    <div class="navbar-end">
      <RouterLink class="btn btn-ghost" v-if="!authStore.isAuthenticated" to="/">Login</RouterLink>
      <div class="dropdown dropdown-end" v-if="authStore.isAuthenticated">
        <div tabindex="0" role="button" class="btn btn-ghost">
          Hello {{ authStore.user?.username }}
        </div>
        <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box">
          <li><a>Profile</a></li>
          <li><a>Settings</a></li>
          <li><a @click.prevent="logout">Logout</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth';

import NavigationItems from '@/components/shared/NavigationItems.vue'

const router = useRouter()
const authStore = useAuthStore()

const logout = () => {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>