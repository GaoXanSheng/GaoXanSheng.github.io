import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { initTheme } from '@/composables/useTheme'

initTheme()

createApp(App).mount('#app')
