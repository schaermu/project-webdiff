import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import { v4 as uuidv4 } from 'uuid';

import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)
app.mixin({
    data() {
        return {
            componentId: uuidv4()
        }
    }
})

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
