import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  // 状态
  const count = ref(0)
  const name = ref('用户')

  // 计算属性
  const doubleCount = computed(() => count.value * 2)
  const greeting = computed(() => `你好，${name.value}！`)

  // 方法
  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = 0
  }

  function setCount(newCount: number) {
    count.value = newCount
  }

  function updateName(newName: string) {
    name.value = newName
  }

  return {
    // 状态
    count,
    name,
    // 计算属性
    doubleCount,
    greeting,
    // 方法
    increment,
    decrement,
    reset,
    setCount,
    updateName
  }
})