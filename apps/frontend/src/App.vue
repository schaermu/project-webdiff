<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavigationBar from '@/components/shared/NavigationBar.vue';
</script>

<template>
  <div class="flex flex-col w-full h-auto">
    <Suspense>
      <NavigationBar />
    </Suspense>
    <main class="bg-gray-50 dark:bg-gray-900 h-full">
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
