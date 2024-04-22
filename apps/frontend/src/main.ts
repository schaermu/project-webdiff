import { createApp } from 'vue'
import { createPinia } from 'pinia'

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

app.use(createPinia())
app.use(router)

app.mount('#app')
