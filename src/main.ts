/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

import { createHead } from '@unhead/vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import router from './route'
import VueGtag  from 'vue-gtag'


const app = createApp(App)

const head = createHead()

registerPlugins(app)

app.use(head)
app.use(VueQueryPlugin)
app.use(router)
app.use(VueGtag, {
  config: {
    id: 'G-KK1953NJDK'
  },
  router
})
app.mount('#app')

