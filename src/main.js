import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Default from './layouts/Default.vue'
import StoreLayout from './layouts/StoreLayout.vue'
import App from './App.vue'
import router from './router'
import Toast, { TYPE } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)

const options = {
  toastDefaults: {
    [TYPE.ERROR]: {
      timeout: 10000,
      closeButton: false
    },
    [TYPE.SUCCESS]: {
      timeout: 3000,
      hideProgressBar: true
    }
  }
}

app.use(Toast, options)

//adding template layout component
app.component('layout-default', Default)
app.component('layout-store', StoreLayout)

app.use(createPinia())
app.use(router)

app.mount('#app')
