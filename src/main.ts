import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'   //引入element-plus  插件
import 'element-plus/dist/index.css'     //引入element css 样式
import zhCn from 'element-plus/es/locale/lang/zh-cn'  //配置element-plus 国际化
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)   //获取应用实例对象

//安装element-plus插件
app.use(ElementPlus, {
    locale: zhCn,
})


// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.mount('#app')   // 将应用挂载到挂载点上
