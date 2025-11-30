<template>
  <div class="user-management">
    <div class="page-header">
      <h1>用户管理系统 - Pinia 演示</h1>
      <div class="header-actions">
        <button 
          @click="toggleViewMode" 
          class="btn btn-outline"
        >
          {{ viewMode === 'grid' ? '📋 列表视图' : '⊞ 网格视图' }}
        </button>
        <button 
          @click="showStoreInfo = !showStoreInfo" 
          class="btn btn-info"
        >
          {{ showStoreInfo ? '📊 隐藏 Store 信息' : '📊 显示 Store 信息' }}
        </button>
      </div>
    </div>

    <!-- Store 信息面板 -->
    <div v-if="showStoreInfo" class="store-info">
      <div class="info-section">
        <h3>🏪 Store 状态</h3>
        <div class="info-grid">
          <div class="info-item">
            <label>总用户数:</label>
            <span>{{ userStore.userCount }}</span>
          </div>
          <div class="info-item">
            <label>当前用户:</label>
            <span>{{ currentUser?.name || '未选择' }}</span>
          </div>
          <div class="info-item">
            <label>加载状态:</label>
            <span :class="loading ? 'status-loading' : 'status-ready'">
              {{ loading ? '加载中...' : '就绪' }}
            </span>
          </div>
          <div class="info-item">
            <label>活跃用户:</label>
            <span>{{ activeUserCount }} / {{ userCount }}</span>
          </div>
        </div>
      </div>

      <div class="info-section">
        <h3>🔧 Store Actions</h3>
        <div class="action-buttons">
          <button @click="testAddUser" class="btn btn-sm btn-primary">
            ➕ 测试添加用户
          </button>
          <button @click="testUpdateUser" class="btn btn-sm btn-warning">
            ✏️ 测试更新用户
          </button>
          <button @click="testDeleteUser" class="btn btn-sm btn-danger">
            🗑️ 测试删除用户
          </button>
          <button @click="testSearch" class="btn btn-sm btn-info">
            🔍 测试搜索功能
          </button>
          <button @click="testReset" class="btn btn-sm btn-secondary">
            🔄 重置 Store
          </button>
        </div>
      </div>
    </div>

    <!-- 主要内容区域 -->
    <div class="main-content" :class="viewMode">
      <!-- 左侧：统计和表单 -->
      <div class="sidebar">
        <UserStats />
        
        <div class="form-section">
          <UserForm 
            :editing-user="editingUser"
            @user-added="onUserAdded"
            @user-updated="onUserUpdated"
            @edit-cancelled="onEditCancelled"
          />
        </div>
      </div>

      <!-- 右侧：用户列表 -->
      <div class="content-area">
        <UserList />
      </div>
    </div>

    <!-- 消息提示 -->
    <div v-if="message" class="message" :class="messageType">
      {{ message }}
      <button @click="clearMessage" class="message-close">×</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUserStore, type User } from '../stores/user'
import UserList from '../components/UserList.vue'
import UserForm from '../components/UserForm.vue'
import UserStats from '../components/UserStats.vue'

const userStore = useUserStore()

// 响应式数据
const viewMode = ref<'grid' | 'list'>('grid')
const showStoreInfo = ref(false)
const editingUser = ref<User | null>(null)
const message = ref('')
const messageType = ref<'success' | 'error' | 'info'>('info')

// 计算属性
const currentUser = computed(() => userStore.currentUser)
const loading = computed(() => userStore.loading)
const userCount = computed(() => userStore.userCount)
const activeUserCount = computed(() => userStore.activeUserCount)

// 方法
const toggleViewMode = () => {
  viewMode.value = viewMode.value === 'grid' ? 'list' : 'grid'
}

const showMessage = (msg: string, type: 'success' | 'error' | 'info' = 'info') => {
  message.value = msg
  messageType.value = type
  setTimeout(() => {
    clearMessage()
  }, 3000)
}

const clearMessage = () => {
  message.value = ''
}

// 事件处理
const onUserAdded = (user: User) => {
  showMessage(`成功添加用户: ${user.name}`, 'success')
}

const onUserUpdated = (user: User) => {
  showMessage(`成功更新用户: ${user.name}`, 'success')
  editingUser.value = null
}

const onEditCancelled = () => {
  editingUser.value = null
  showMessage('已取消编辑', 'info')
}

// 测试方法
const testAddUser = () => {
  const testUser = userStore.addUser({
    name: '测试用户-' + Date.now().toString().slice(-4),
    email: 'test' + Date.now() + '@example.com',
    avatar: '🧪',
    role: 'user',
    status: 'active'
  })
  showMessage('测试用户添加成功!', 'success')
}

const testUpdateUser = () => {
  if (userStore.users.length > 0) {
    const firstUser = userStore.users[0]
    const updated = userStore.updateUser(firstUser.id, {
      name: firstUser.name + ' (已更新)',
      status: firstUser.status === 'active' ? 'inactive' : 'active'
    })
    if (updated) {
      showMessage('用户更新测试成功!', 'success')
    } else {
      showMessage('更新失败', 'error')
    }
  } else {
    showMessage('没有用户可以更新', 'error')
  }
}

const testDeleteUser = () => {
  if (userStore.users.length > 1) {
    const firstUser = userStore.users[0]
    const deleted = userStore.deleteUser(firstUser.id)
    if (deleted) {
      showMessage('用户删除测试成功!', 'success')
    } else {
      showMessage('删除失败', 'error')
    }
  } else {
    showMessage('用户数量太少，无法删除测试', 'error')
  }
}

const testSearch = () => {
  const results = userStore.searchUsers('测试')
  showMessage(`搜索 "测试" 找到 ${results.length} 个结果`, 'info')
}

const testReset = () => {
  if (confirm('确定要重置所有数据吗？')) {
    userStore.resetStore()
    showMessage('Store 已重置', 'info')
  }
}

// 生命周期
onMounted(async () => {
  try {
    await userStore.fetchUsers()
    showMessage('用户数据加载完成!', 'success')
  } catch (error) {
    showMessage('数据加载失败', 'error')
  }
})
</script>

<style scoped>
.user-management {
  padding: 20px;
  max-width: 1400px;
  margin: 0 auto;
  min-height: 100vh;
  background: #f5f7fa;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.page-header h1 {
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
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

.btn-info {
  background: #17a2b8;
  color: white;
}

.btn-info:hover {
  background: #138496;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-warning {
  background: #f39c12;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-sm {
  padding: 6px 12px;
  font-size: 12px;
}

.store-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.info-section {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.info-section h3 {
  margin: 0 0 16px 0;
  color: #2c3e50;
  font-size: 18px;
}

.info-grid {
  display: grid;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  background: #f8f9fa;
  border-radius: 4px;
}

.info-item label {
  font-weight: 500;
  color: #2c3e50;
}

.status-loading {
  color: #f39c12;
  font-weight: 600;
}

.status-ready {
  color: #27ae60;
  font-weight: 600;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
}

.main-content {
  display: grid;
  gap: 24px;
}

.main-content.grid {
  grid-template-columns: 1fr 2fr;
}

.main-content.list {
  grid-template-columns: 1fr;
}

.sidebar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.content-area {
  min-height: 0;
}

.form-section {
  background: white;
  border-radius: 8px;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.message {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 16px 20px;
  border-radius: 8px;
  color: white;
  font-weight: 500;
  z-index: 1000;
  display: flex;
  align-items: center;
  gap: 12px;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.message.success {
  background: #27ae60;
}

.message.error {
  background: #e74c3c;
}

.message.info {
  background: #3498db;
}

.message-close {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  border-radius: 4px;
  width: 24px;
  height: 24px;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: auto;
}

.message-close:hover {
  background: rgba(255, 255, 255, 0.3);
}

@media (max-width: 1024px) {
  .main-content.grid {
    grid-template-columns: 1fr;
  }
  
  .store-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .page-header {
    flex-direction: column;
    gap: 16px;
    align-items: stretch;
  }
  
  .header-actions {
    justify-content: center;
  }
  
  .action-buttons {
    grid-template-columns: 1fr;
  }
  
  .user-management {
    padding: 12px;
  }
}
</style>
