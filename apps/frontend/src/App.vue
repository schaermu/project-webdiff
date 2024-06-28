<script setup>
import { useSettingsStore } from '@/stores/settings'
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/shared/NavigationBar.vue';

// load settings
const settingsStore = useSettingsStore()
settingsStore.load()
</script>

<template>
  <div class="flex flex-col w-full h-screen">
    <Suspense>
      <NavigationBar />
    </Suspense>
    <main class="bg-gray-50 dark:bg-gray-900 h-full prose max-w-full">
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Transition mode="out-in">
            <KeepAlive>
              <Suspense>
                <!-- main content -->
                <component :is="Component"></component>

                <!-- loading state -->
                <template #fallback>
                  Loading...
                </template>
              </Suspense>
            </KeepAlive>
          </Transition>
        </template>
      </RouterView>
    </main>
  </div>
</template>
