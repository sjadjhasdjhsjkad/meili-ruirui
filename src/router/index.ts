import {createRouter, createWebHistory} from 'vue-router'
import type {RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/element-demo',
        name: 'ElementDemo',
        component: () => import('@/views/ElementPlusDemo.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router