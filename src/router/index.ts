// 通过 vue-router插件实现模板路由配置

import {createRouter, createWebHistory} from 'vue-router'
import {constantRoute} from "@/router/routes.ts";
// import type {RouteRecordRaw} from 'vue-router'
// import path from "path";
// import component from "element-plus/es/components/tree-select/src/tree-select-option";


// const routes: RouteRecordRaw[] = [
//     {
//         path: '/element-demo',
//         name: 'ElementDemo',
//         component: () => import('@/views/ElementPlusDemo.vue')
//     }
// ]

const router = createRouter({
    history: createWebHistory(),
    routes: constantRoute,
    // 滚动行为
    scrollBehavior() {
        return {
            left: 0,
            top: 0
        }
    }
});

export default router