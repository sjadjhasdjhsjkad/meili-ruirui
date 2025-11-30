<template>
  <div class="user-stats">
    <div class="stats-header">
      <h3>用户统计</h3>
      <button @click="refreshStats" class="btn-refresh" :disabled="loading">
        {{ loading ? '刷新中...' : '🔄 刷新' }}
      </button>
    </div>
    
    <div class="stats-grid">
      <!-- 总用户数 -->
      <div class="stat-card stat-primary">
        <div class="stat-icon">👥</div>
        <div class="stat-content">
          <div class="stat-value">{{ userCount }}</div>
          <div class="stat-label">总用户数</div>
        </div>
      </div>
      
      <!-- 活跃用户 -->
      <div class="stat-card stat-success">
        <div class="stat-icon">✅</div>
        <div class="stat-content">
          <div class="stat-value">{{ activeUserCount }}</div>
          <div class="stat-label">活跃用户</div>
        </div>
      </div>
      
      <!-- 管理员数量 -->
      <div class="stat-card stat-warning">
        <div class="stat-icon">👑</div>
        <div class="stat-content">
          <div class="stat-value">{{ adminCount }}</div>
          <div class="stat-label">管理员</div>
        </div>
      </div>
      
      <!-- 活跃率 -->
      <div class="stat-card stat-info">
        <div class="stat-icon">📊</div>
        <div class="stat-content">
          <div class="stat-value">{{ activeRate }}%</div>
          <div class="stat-label">活跃率</div>
        </div>
      </div>
    </div>
    
    <!-- 角色分布 -->
    <div class="stats-section">
      <h4>角色分布</h4>
      <div class="role-distribution">
        <div class="role-item" v-for="count in roleCounts" :key="count.role">
          <div class="role-bar">
            <div 
              class="role-fill"
              :style="{ width: count.percentage + '%' }"
              :class="`role-${count.role}`"
            ></div>
          </div>
          <div class="role-info">
            <span class="role-label">{{ getRoleLabel(count.role) }}</span>
            <span class="role-count">{{ count.count }}人</span>
            <span class="role-percentage">{{ count.percentage }}%</span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 状态分布 -->
    <div class="stats-section">
      <h4>状态分布</h4>
      <div class="status-distribution">
        <div class="status-item" v-for="count in statusCounts" :key="count.status">
          <div class="status-chart">
            <div 
              class="status-circle"
              :class="`status-${count.status}`"
              :style="{ 
                background: 'conic-gradient(' + count.color + ' 0deg ' + (count.percentage * 3.6) + 'deg, #e9ecef ' + (count.percentage * 3.6) + 'deg 360deg)'
              }"
            >
              <span class="status-percentage">{{ count.percentage }}%</span>
            </div>
          </div>
          <div class="status-info">
            <div class="status-label">{{ getStatusLabel(count.status) }}</div>
            <div class="status-count">{{ count.count }}人</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- 最近活动 -->
    <div class="stats-section">
      <h4>快速操作</h4>
      <div class="quick-actions">
        <button @click="addRandomUser" class="action-btn" :disabled="loading">
          🎲 添加随机用户
        </button>
        <button @click="clearAllUsers" class="action-btn action-danger" :disabled="loading || userCount === 0">
          🗑️ 清空所有用户
        </button>
        <button @click="toggleAllStatus" class="action-btn" :disabled="loading || userCount === 0">
          🔄 切换所有状态
        </button>
        <button @click="exportUsers" class="action-btn" :disabled="loading || userCount === 0">
          📤 导出用户数据
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useUserStore, type User } from '../stores/user'

const userStore = useUserStore()
const loading = computed(() => userStore.loading)

// 计算属性
const users = computed(() => userStore.users)
const userCount = computed(() => userStore.userCount)
const activeUserCount = computed(() => userStore.activeUserCount)
const adminCount = computed(() => userStore.adminUsers.length)
const activeRate = computed(() => {
  return userCount.value > 0 
    ? Math.round((activeUserCount.value / userCount.value) * 100)
    : 0
})

// 角色统计
const roleCounts = computed(() => {
  const roles: User['role'][] = ['admin', 'user', 'guest']
  return roles.map(role => {
    const count = userStore.getUsersByRole(role).length
    return {
      role,
      count,
      percentage: userCount.value > 0 ? Math.round((count / userCount.value) * 100) : 0
    }
  })
})

// 状态统计
const statusCounts = computed(() => {
  const statuses: User['status'][] = ['active', 'inactive']
  return statuses.map(status => {
    const count = status === 'active' 
      ? activeUserCount.value 
      : userCount.value - activeUserCount.value
    const color = status === 'active' ? '#27ae60' : '#e67e22'
    return {
      status,
      count,
      percentage: userCount.value > 0 ? Math.round((count / userCount.value) * 100) : 0,
      color
    }
  })
})

// 方法
const refreshStats = async () => {
  try {
    await userStore.fetchUsers()
  } catch (error) {
    console.error('刷新统计失败:', error)
  }
}

const getRoleLabel = (role: User['role']) => {
  const labels = {
    admin: '管理员',
    user: '普通用户',
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

const addRandomUser = () => {
  const randomNames = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '周九', '吴十']
  const randomEmails = ['gmail.com', 'qq.com', '163.com', 'outlook.com']
  const randomAvatars = ['👨‍💼', '👩‍💼', '🧑‍💼', '👨‍🎓', '👩‍🎓']
  const randomRoles: User['role'][] = ['admin', 'user', 'guest']
  const randomStatuses: User['status'][] = ['active', 'inactive']
  
  const randomName = randomNames[Math.floor(Math.random() * randomNames.length)] + Math.floor(Math.random() * 100)
  const randomEmail = 'user' + Date.now() + '@' + randomEmails[Math.floor(Math.random() * randomEmails.length)]
  const randomAvatar = randomAvatars[Math.floor(Math.random() * randomAvatars.length)]
  const randomRole = randomRoles[Math.floor(Math.random() * randomRoles.length)]
  const randomStatus = randomStatuses[Math.floor(Math.random() * randomStatuses.length)]
  
  userStore.addUser({
    name: randomName,
    email: randomEmail,
    avatar: randomAvatar,
    role: randomRole,
    status: randomStatus
  })
}

const clearAllUsers = () => {
  if (confirm('确定要清空所有用户吗？此操作不可恢复！')) {
    userStore.resetStore()
  }
}

const toggleAllStatus = () => {
  users.value.forEach(user => {
    userStore.toggleUserStatus(user.id)
  })
}

const exportUsers = () => {
  const exportData = JSON.stringify(users.value, null, 2)
  const blob = new Blob([exportData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'users_' + new Date().toISOString().split('T')[0] + '.json'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.user-stats {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.stats-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.stats-header h3 {
  margin: 0;
  color: #2c3e50;
}

.btn-refresh {
  background: #3498db;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.3s;
}

.btn-refresh:hover:not(:disabled) {
  background: #2980b9;
}

.btn-refresh:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  border-radius: 8px;
  color: white;
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(-100%);
  transition: transform 0.3s;
}

.stat-card:hover::before {
  transform: translateX(0);
}

.stat-primary {
  background: linear-gradient(135deg, #3498db, #2980b9);
}

.stat-success {
  background: linear-gradient(135deg, #27ae60, #229954);
}

.stat-warning {
  background: linear-gradient(135deg, #f39c12, #e67e22);
}

.stat-info {
  background: linear-gradient(135deg, #9b59b6, #8e44ad);
}

.stat-icon {
  font-size: 32px;
  margin-right: 16px;
  opacity: 0.9;
}

.stat-content {
  flex: 1;
  z-index: 1;
}

.stat-value {
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 14px;
  opacity: 0.9;
}

.stats-section {
  margin-bottom: 24px;
}

.stats-section h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 16px;
}

.role-distribution {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.role-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.role-bar {
  flex: 1;
  height: 8px;
  background: #e9ecef;
  border-radius: 4px;
  overflow: hidden;
}

.role-fill {
  height: 100%;
  transition: width 0.3s ease;
}

.role-admin {
  background: #c0392b;
}

.role-user {
  background: #2980b9;
}

.role-guest {
  background: #7f8c8d;
}

.role-info {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 120px;
}

.role-label {
  font-size: 12px;
  color: #2c3e50;
  min-width: 60px;
}

.role-count {
  font-size: 12px;
  color: #6c757d;
}

.role-percentage {
  font-size: 12px;
  font-weight: 600;
  color: #2c3e50;
}

.status-distribution {
  display: flex;
  gap: 24px;
}

.status-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  flex: 1;
}

.status-chart {
  position: relative;
  width: 80px;
  height: 80px;
}

.status-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  color: white;
  position: relative;
}

.status-circle::before {
  content: '';
  position: absolute;
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 50%;
  z-index: 0;
}

.status-percentage {
  position: relative;
  z-index: 1;
  color: #2c3e50;
}

.status-info {
  text-align: center;
}

.status-label {
  font-size: 14px;
  color: #2c3e50;
  margin-bottom: 4px;
}

.status-count {
  font-size: 18px;
  font-weight: bold;
  color: #2c3e50;
}

.quick-actions {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
}

.action-btn {
  background: #3498db;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.action-btn:hover:not(:disabled) {
  background: #2980b9;
  transform: translateY(-1px);
}

.action-btn:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
  transform: none;
}

.action-danger {
  background: #e74c3c;
}

.action-danger:hover:not(:disabled) {
  background: #c0392b;
}
</style>
