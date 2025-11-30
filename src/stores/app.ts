import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 侧边栏状态
  const sidebarCollapsed = ref(false)
  const theme = ref('light') // 'light' | 'dark'

  // 页面加载状态
  const loading = ref(false)

  // 面包屑导航
  const breadcrumbs = ref<Array<{ name: string; path?: string }>>([])

  // 侧边栏控制
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value
  }

  const setSidebarCollapsed = (collapsed: boolean) => {
    sidebarCollapsed.value = collapsed
  }

  // 主题切换
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
    // 可选：将主题设置保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme.value)
    }
  }

  const setTheme = (newTheme: 'light' | 'dark') => {
    theme.value = newTheme
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  // 加载状态控制
  const setLoading = (status: boolean) => {
    loading.value = status
  }

  // 面包屑导航控制
  const setBreadcrumbs = (newBreadcrumbs: Array<{ name: string; path?: string }>) => {
    breadcrumbs.value = newBreadcrumbs
  }

  // 添加面包屑项
  const addBreadcrumb = (item: { name: string; path?: string }) => {
    breadcrumbs.value.push(item)
  }

  // 清空面包屑
  const clearBreadcrumbs = () => {
    breadcrumbs.value = []
  }

  // 初始化时从 localStorage 恢复主题设置
  const initTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
      if (savedTheme) {
        theme.value = savedTheme
      }
    }
  }

  return {
    // 状态
    sidebarCollapsed,
    theme,
    loading,
    breadcrumbs,

    // 方法
    toggleSidebar,
    setSidebarCollapsed,
    toggleTheme,
    setTheme,
    setLoading,
    setBreadcrumbs,
    addBreadcrumb,
    clearBreadcrumbs,
    initTheme
  }
})