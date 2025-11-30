import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

interface User {
  id: number
  name: string
  email: string
  avatar?: string
}

interface Todo {
  id: number
  text: string
  completed: boolean
  userId: number
}

export const useUserStore = defineStore('user', () => {
  // 状态
  const currentUser = ref<User | null>(null)
  const users = ref<User[]>([
    { id: 1, name: '张三', email: 'zhangsan@example.com' },
    { id: 2, name: '李四', email: 'lisi@example.com' },
    { id: 3, name: '王五', email: 'wangwu@example.com' }
  ])
  const todos = ref<Todo[]>([
    { id: 1, text: '学习 Vue 3', completed: true, userId: 1 },
    { id: 2, text: '学习 Pinia', completed: false, userId: 1 },
    { id: 3, text: '构建一个项目', completed: false, userId: 2 },
    { id: 4, text: '写文档', completed: false, userId: 3 }
  ])

  // 计算属性
  const isLoggedIn = computed(() => currentUser.value !== null)
  const userTodos = computed(() => {
    if (!currentUser.value) return []
    return todos.value.filter(todo => todo.userId === currentUser.value!.id)
  })
  const completedTodosCount = computed(() => {
    return userTodos.value.filter(todo => todo.completed).length
  })
  const uncompletedTodosCount = computed(() => {
    return userTodos.value.filter(todo => !todo.completed).length
  })

  // 方法
  function login(userId: number) {
    const user = users.value.find(u => u.id === userId)
    if (user) {
      currentUser.value = user
      return true
    }
    return false
  }

  function logout() {
    currentUser.value = null
  }

  function addUser(user: Omit<User, 'id'>) {
    const newUser: User = {
      id: Math.max(...users.value.map(u => u.id)) + 1,
      ...user
    }
    users.value.push(newUser)
    return newUser
  }

  function addTodo(text: string) {
    if (!currentUser.value) return null

    const newTodo: Todo = {
      id: Math.max(...todos.value.map(t => t.id)) + 1,
      text,
      completed: false,
      userId: currentUser.value.id
    }
    todos.value.push(newTodo)
    return newTodo
  }

  function toggleTodo(todoId: number) {
    const todo = todos.value.find(t => t.id === todoId)
    if (todo) {
      todo.completed = !todo.completed
    }
  }

  function deleteTodo(todoId: number) {
    const index = todos.value.findIndex(t => t.id === todoId)
    if (index > -1) {
      todos.value.splice(index, 1)
    }
  }

  function updateProfile(updates: Partial<User>) {
    if (currentUser.value) {
      Object.assign(currentUser.value, updates)
      // 同时更新用户列表中的信息
      const userIndex = users.value.findIndex(u => u.id === currentUser.value!.id)
      if (userIndex > -1) {
        Object.assign(users.value[userIndex], updates)
      }
    }
  }

  return {
    // 状态
    currentUser,
    users,
    todos,
    // 计算属性
    isLoggedIn,
    userTodos,
    completedTodosCount,
    uncompletedTodosCount,
    // 方法
    login,
    logout,
    addUser,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateProfile
  }
})