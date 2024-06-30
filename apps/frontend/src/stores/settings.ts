import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

import ApiClient from '@/utils/apiClient'

export const useSettingsStore = defineStore('settings', () => {
    const settingsState = ref<Record<string, string>>()

    const turnstileSiteKey = computed(() => settingsState.value?.turnstile_sitekey)

    async function load() {
        const apiClient = new ApiClient('settings', false)
        settingsState.value = (await apiClient.get('')).data
    }

    return { turnstileSiteKey, load }
}, { persist: true })