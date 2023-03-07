import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// CSS
import './assets/uikit.css'
import './assets/main.css'

// Frontend Scripts
import "./assets/js/uikit.js"
import "./assets/js/uikit-icons.js"
import "https://cdn.jsdelivr.net/npm/web3@latest/dist/web3.min.js"

const app = createApp(App)

app.use(router)
app.mount('#app')