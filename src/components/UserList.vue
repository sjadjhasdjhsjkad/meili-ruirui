<template>
  <div class="user-list">
    <div class="user-list-header">
      <h3>用户列表</h3>
      <div class="user-stats">
        <span class="stat">总用户数: {{ userCount }}</span>
        <span class="stat">活跃用户: {{ activeUserCount }}</span>
      </div>
    </div>
    
    <div class="search-box">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="搜索用户..."
        class="search-input"
      />
    </div>

    <div class="loading-overlay" v-if="loading">
      <div class="loading-spinner">加载中...</div>
    </div>

    <div class="user-grid" v-else>
      <div
        v-for="user in filteredUsers"
        :key="user.id"
        class="user-card"
        :class="{ 'user-inactive': user.status === 'inactive' }"
      >
        <div class="user-avatar">{{ user.avatar }}</div>
        <div class="user-info">
          <h4 class="user-name">{{ user.name }}</h4>
          <p class="user-email">{{ user.email }}</p>
          <div class="user-meta">
            <span class="user-role" :class="`role-${user.role}`">
              {{ getRoleLabel(user.role) }}
            </span>
            <span class="user-status" :class="`status-${user.status}`">
              {{ getStatusLabel(user.status) }}
            </span>
          </div>
        </div>
        <div class="user-actions">
          <button
            @click="setCurrentUser(user)"
            class="btn btn-sm"
            :class="{ 'btn-primary': currentUser?.id === user.id }"
          >
            {{ currentUser?.id === user.id ? '当前用户' : '选择' }}
          </button>
          <button
            @click="toggleStatus(user.id)"
            class="btn btn-sm btn-outline"
          >
            {{ user.status === 'active' ? '禁用' : '启用' }}
          </button>
          <button
            @click="deleteUser(user.id)"
            class="btn btn-sm btn-danger"
          >
            删除
          </button>
        </div>
      </div>
    </div>

    <div class="empty-state" v-if="filteredUsers.length === 0 && !loading">
      <p>没有找到用户</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore, type User } from '../stores/user'

const userStore = useUserStore()
const searchQuery = ref('')

// 计算属性
const users = computed(() => userStore.users)
const currentUser = computed(() => userStore.currentUser)
const loading = computed(() => userStore.loading)
const userCount = computed(() => userStore.userCount)
const activeUserCount = computed(() => userStore.activeUserCount)

// 过滤后的用户列表
const filteredUsers = computed(() => {
  if (!searchQuery.value) return users.value
  return userStore.searchUsers(searchQuery.value)
})

// 方法
const setCurrentUser = (user: User) => {
  userStore.setCurrentUser(user)
}

const toggleStatus = (userId: number) => {
  userStore.toggleUserStatus(userId)
}

const deleteUser = (userId: number) => {
  if (confirm('确定要删除这个用户吗？')) {
    userStore.deleteUser(userId)
  }
}

const getRoleLabel = (role: User['role']) => {
  const labels = {
    admin: '管理员',
    user: '用户',
    guest: '访客'
  }
  return labels[role]
}

const getStatusLabel = (status: User['status']) => {
  const labels = {
    active: '活跃',
    inactive: '非活跃'
  }
  return labels[status]
}

// 生命周期
onMounted(() => {
  userStore.fetchUsers()
})
</script>

<style scoped>
.user-list {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.user-list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.user-list-header h3 {
  margin: 0;
  color: #2c3e50;
}

.user-stats {
  display: flex;
  gap: 15px;
}

.stat {
  font-size: 14px;
  color: #6c757d;
  background: #f8f9fa;
  padding: 4px 8px;
  border-radius: 4px;
}

.search-box {
  margin-bottom: 20px;
}

.search-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.search-input:focus {
  border-color: #3498db;
}

.loading-overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
}

.loading-spinner {
  color: #6c757d;
  font-size: 16px;
}

.user-grid {
  display: grid;
  gap: 15px;
}

.user-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.user-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
}

.user-inactive {
  opacity: 0.6;
  background: #f8f9fa;
}

.user-avatar {
  font-size: 32px;
  margin-right: 15px;
  min-width: 40px;
  text-align: center;
}

.user-info {
  flex: 1;
}

.user-name {
  margin: 0 0 5px 0;
  color: #2c3e50;
  font-size: 16px;
  font-weight: 600;
}

.user-email {
  margin: 0 0 10px 0;
  color: #6c757d;
  font-size: 14px;
}

.user-meta {
  display: flex;
  gap: 8px;
}

.user-role,
.user-status {
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.role-admin {
  background: #ffe6e6;
  color: #c0392b;
}

.role-user {
  background: #e6f3ff;
  color: #2980b9;
}

.role-guest {
  background: #f0f0f0;
  color: #7f8c8d;
}

.status-active {
  background: #e8f5e8;
  color: #27ae60;
}

.status-inactive {
  background: #ffe6cc;
  color: #e67e22;
}

.user-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.3s;
}

.btn-sm {
  padding: 4px 8px;
  font-size: 11px;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-outline {
  background: transparent;
  border: 1px solid #3498db;
  color: #3498db;
}

.btn-outline:hover {
  background: #3498db;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-danger:hover {
  background: #c0392b;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
}
</style>
