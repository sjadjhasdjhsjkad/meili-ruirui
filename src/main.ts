import {createApp} from 'vue'
import {createPinia} from 'pinia'
import App from './App.vue'
import router from './router'  // 引入路由配置
import ElementPlus from 'element-plus'   //引入element-plus  插件
import 'element-plus/dist/index.css'     //引入element css 样式
import zhCn from 'element-plus/es/locale/lang/zh-cn'  //配置element-plus 国际化
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import '@/styles/style.css'
// //svg插件需要配置代码
// import 'virtual:svg-icons-register';

const app = createApp(App)   //获取应用实例对象

//安装 pinia 状态管理
const pinia = createPinia()
app.use(pinia)

//安装路由插件
app.use(router)

//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
})

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')   // 将应用挂载到挂载点上
