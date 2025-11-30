import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
  avatar: string
  role: 'admin' | 'user' | 'guest'
  status: 'active' | 'inactive'
}

export interface Todo {
  id: number
  text: string
  completed: boolean
  userId: number
  createdAt: Date
  updatedAt: Date
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const users = ref<User[]>([
    {
      id: 1,
      name: '张三',
      email: 'zhangsan@example.com',
      avatar: '👨‍💼',
      role: 'admin',
      status: 'active'
    },
    {
      id: 2,
      name: '李四',
      email: 'lisi@example.com',
      avatar: '👩‍💼',
      role: 'user',
      status: 'active'
    },
    {
      id: 3,
      name: '王五',
      email: 'wangwu@example.com',
      avatar: '🧑‍💼',
      role: 'guest',
      status: 'inactive'
    }
  ])

  const currentUser = ref<User | null>(null)
  const loading = ref(false)
  const todos = ref<Todo[]>([
    {
      id: 1,
      text: '学习 Pinia 状态管理',
      completed: true,
      userId: 1,
      createdAt: new Date('2024-01-01'),
      updatedAt: new Date('2024-01-01')
    },
    {
      id: 2,
      text: '完成 Vue 项目',
      completed: false,
      userId: 1,
      createdAt: new Date('2024-01-02'),
      updatedAt: new Date('2024-01-02')
    },
    {
      id: 3,
      text: '阅读文档',
      completed: true,
      userId: 2,
      createdAt: new Date('2024-01-03'),
      updatedAt: new Date('2024-01-03')
    },
    {
      id: 4,
      text: '编写代码',
      completed: false,
      userId: 2,
      createdAt: new Date('2024-01-04'),
      updatedAt: new Date('2024-01-04')
    }
  ])

  // 计算属性
  const activeUsers = computed(() => users.value.filter(user => user.status === 'active'))
  const adminUsers = computed(() => users.value.filter(user => user.role === 'admin'))
  const userCount = computed(() => users.value.length)
  const activeUserCount = computed(() => activeUsers.value.length)
  const isLoggedIn = computed(() => currentUser.value !== null)
  const userTodos = computed(() => {
    if (!currentUser.value) return []
    return todos.value.filter(todo => todo.userId === currentUser.value!.id)
  })
  const completedTodosCount = computed(() => userTodos.value.filter(todo => todo.completed).length)
  const uncompletedTodosCount = computed(() => userTodos.value.filter(todo => !todo.completed).length)

  // 方法
  const addUser = (user: Omit<User, 'id'>) => {
    const newUser: User = {
      ...user,
      id: Date.now()
    }
    users.value.push(newUser)
    return newUser
  }

  const updateUser = (id: number, updates: Partial<User>) => {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      users.value[index] = { ...users.value[index], ...updates }
      return users.value[index]
    }
    return null
  }

  const deleteUser = (id: number) => {
    const index = users.value.findIndex(user => user.id === id)
    if (index !== -1) {
      const deletedUser = users.value[index]
      users.value.splice(index, 1)
      return deletedUser
    }
    return null
  }

  const setCurrentUser = (user: User | null) => {
    currentUser.value = user
  }

  const toggleUserStatus = (id: number) => {
    const user = users.value.find(u => u.id === id)
    if (user) {
      user.status = user.status === 'active' ? 'inactive' : 'active'
      return user
    }
    return null
  }

  const fetchUsers = async () => {
    loading.value = true
    try {
      // 模拟 API 调用
      await new Promise(resolve => setTimeout(resolve, 1000))
      // 这里可以添加真实的 API 调用
      return users.value
    } catch (error) {
      console.error('获取用户列表失败:', error)
      throw error
    } finally {
      loading.value = false
    }
  }

  const searchUsers = (query: string) => {
    return users.value.filter(user => 
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase())
    )
  }

  const getUsersByRole = (role: User['role']) => {
    return users.value.filter(user => user.role === role)
  }

  // 登录相关方法
  const login = (userId: number) => {
    const user = users.value.find(u => u.id === userId)
    if (user) {
      setCurrentUser(user)
      return true
    }
    return false
  }

  const logout = () => {
    setCurrentUser(null)
  }

  const updateProfile = (profileData: Partial<Pick<User, 'name' | 'email'>>) => {
    if (!currentUser.value) return null

    const updatedUser = updateUser(currentUser.value.id, profileData)
    if (updatedUser) {
      setCurrentUser(updatedUser)
    }
    return updatedUser
  }

  // 待办事项相关方法
  const addTodo = (text: string) => {
    if (!currentUser.value) return null

    const newTodo: Todo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      userId: currentUser.value.id,
      createdAt: new Date(),
      updatedAt: new Date()
    }

    todos.value.push(newTodo)
    return newTodo
  }

  const toggleTodo = (todoId: number) => {
    const todo = todos.value.find(t => t.id === todoId)
    if (todo) {
      todo.completed = !todo.completed
      todo.updatedAt = new Date()
      return todo
    }
    return null
  }

  const deleteTodo = (todoId: number) => {
    const index = todos.value.findIndex(t => t.id === todoId)
    if (index !== -1) {
      const deletedTodo = todos.value[index]
      todos.value.splice(index, 1)
      return deletedTodo
    }
    return null
  }

  // 重置 store
  const resetStore = () => {
    users.value = []
    currentUser.value = null
    loading.value = false
    todos.value = []
  }

  return {
    // 状态
    users,
    currentUser,
    loading,
    todos,

    // 计算属性
    activeUsers,
    adminUsers,
    userCount,
    activeUserCount,
    isLoggedIn,
    userTodos,
    completedTodosCount,
    uncompletedTodosCount,

    // 方法
    addUser,
    updateUser,
    deleteUser,
    setCurrentUser,
    toggleUserStatus,
    fetchUsers,
    searchUsers,
    getUsersByRole,
    login,
    logout,
    updateProfile,
    addTodo,
    toggleTodo,
    deleteTodo,
    resetStore
  }
})
