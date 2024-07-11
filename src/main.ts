import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import ViewUIPlus from 'view-ui-plus'
import 'view-ui-plus/dist/styles/viewuiplus.css'; // 使用 CSS
import Vue3SeamlessScroll from 'vue3-seamless-scroll'

const app = createApp(App)
app.use(store)
  .use(router)
  .use(ViewUIPlus)
  .use(Vue3SeamlessScroll, { name: 'SeamlessScroll' })
  .mount('#app')
