// 对外暴露配置路由 (常量路由)
export const constantRoute = [
    {
        path: '/',
        component: () => import('@/components/SwitchRouterViewComponent.vue'),
        name: 'index', // 命名路由
    },
    {
        path: '/element-demo',
        component: () => import('@/views/ElementPlusDemo.vue'),
        name: 'axios', // 命名路由
    },
    {
        path: '/svg-demo',
        component: () => import('@/views/SvgDemo.vue'),
        name: 'svg-demo',
    },
    {
        //登录
        path: '/login',
        component: () => import('@/views/login/index.vue'),
        name: 'Login',
    },
    {
        //登录成功以后展示数据的路由
        path: '/home',
        component: () => import('@/views/home/index.vue'),
        name: 'Home',
    },
    {
        // Pinia 演示页面
        path: '/pinia-demo',
        component: () => import('@/views/pinia-demo/index.vue'),
        name: 'PiniaDemo',
    },
    {
        // 404
        path: '/404',
        component: () => import('@/views/404/index.vue'),
        name: '404', // 命名路由
    },
    {
        // 请求数据
        path: '/request',
        component: () => import('@/components/RequestDataComponent.vue'),
        name: '404', // 命名路由
    },
    {
        path: '/:pathMatch(.*)*',
        redirect: '/404',
        name: 'Any', // 命名路由
    },
]
