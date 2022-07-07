import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import all from '@/components/MyItem.vue'
import topNav from '@/components/Search/Search-topNav.vue'
import drag from './js/directive.js'
import ElementPlus from 'element-plus'
import Vant from 'vant';
import 'vant/lib/index.css';
import '@/assets/icon/index.css'
const app = createApp(App)
app.component(topNav.name,topNav)
app.directive('drag',drag)

app.use(ElementPlus, { size: 'small', zIndex: 3000 })
app.use(store).use(Vant).use(router).mount('#app')

