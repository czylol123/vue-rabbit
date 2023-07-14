import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/styles/common.scss'

import App from './App.vue'
import router from './router'

//引入懒加载指令插件并且注册
import { lazyPlugin } from '@/directives/index'
import { componentsPlugin } from '@/components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(lazyPlugin)
app.use(componentsPlugin)

app.mount('#app')
