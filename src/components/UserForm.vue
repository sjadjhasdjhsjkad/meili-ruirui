<template>
  <div class="user-form">
    <div class="form-header">
      <h3>{{ isEditing ? '编辑用户' : '添加用户' }}</h3>
    </div>

    <form class="form-content" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">姓名 *</label>
        <input
            id="name"
            v-model="formData.name"
            class="form-input"
            placeholder="请输入姓名"
            required
            type="text"
        />
        <span v-if="errors.name" class="form-error">{{ errors.name }}</span>
      </div>

      <div class="form-group">
        <label for="email">邮箱 *</label>
        <input
            id="email"
            v-model="formData.email"
            class="form-input"
            placeholder="请输入邮箱"
            required
            type="email"
        />
        <span v-if="errors.email" class="form-error">{{ errors.email }}</span>
      </div>

      <div class="form-group">
        <label for="avatar">头像</label>
        <select
            id="avatar"
            v-model="formData.avatar"
            class="form-select"
        >
          <option value="👨‍💼">👨‍💼 男职员</option>
          <option value="👩‍💼">👩‍💼 女职员</option>
          <option value="🧑‍💼">🧑‍💼 中性职员</option>
          <option value="👨‍🎓">👨‍🎓 男学生</option>
          <option value="👩‍🎓">👩‍🎓 女学生</option>
          <option value="👨‍⚕️">👨‍⚕️ 男医生</option>
          <option value="👩‍⚕️">👩‍⚕️ 女医生</option>
          <option value="👨‍🏫">👨‍🏫 男老师</option>
          <option value="👩‍🏫">👩‍🏫 女老师</option>
          <option value="🧑‍🎨">🧑‍🎨 艺术家</option>
        </select>
      </div>

      <div class="form-group">
        <label for="role">角色 *</label>
        <select
            id="role"
            v-model="formData.role"
            class="form-select"
            required
        >
          <option value="admin">管理员</option>
          <option value="user">普通用户</option>
          <option value="guest">访客</option>
        </select>
      </div>

      <div class="form-group">
        <label for="status">状态</label>
        <div class="radio-group">
          <label class="radio-label">
            <input
                v-model="formData.status"
                class="radio-input"
                type="radio"
                value="active"
            />
            <span class="radio-text">活跃</span>
          </label>
          <label class="radio-label">
            <input
                v-model="formData.status"
                class="radio-input"
                type="radio"
                value="inactive"
            />
            <span class="radio-text">非活跃</span>
          </label>
        </div>
      </div>

      <div class="form-actions">
        <button
            :disabled="isSubmitting"
            class="btn btn-primary"
            type="submit"
        >
          {{ isSubmitting ? '提交中...' : (isEditing ? '更新' : '添加') }}
        </button>
        <button
            class="btn btn-secondary"
            type="button"
            @click="resetForm"
        >
          重置
        </button>
        <button
            v-if="isEditing"
            class="btn btn-outline"
            type="button"
            @click="cancelEdit"
        >
          取消编辑
        </button>
      </div>
    </form>

    <div v-if="formData.name || formData.email" class="form-preview">
      <h4>预览</h4>
      <div class="preview-card">
        <div class="preview-avatar">{{ formData.avatar || '👤' }}</div>
        <div class="preview-info">
          <div class="preview-name">{{ formData.name || '未填写姓名' }}</div>
          <div class="preview-email">{{ formData.email || '未填写邮箱' }}</div>
          <div class="preview-meta">
            <span :class="`role-${formData.role}`" class="preview-role">
              {{ getRoleLabel(formData.role) }}
            </span>
            <span :class="`status-${formData.status}`" class="preview-status">
              {{ getStatusLabel(formData.status) }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {ref, computed, watch} from 'vue'
import {useUserStore, type User} from '../stores/user'

const resetForm = () => {
  formData.value = {
    name: '',
    email: '',
    avatar: '👨‍💼',
    role: 'user',
    status: 'active'
  }
  errors.value = {}
}

interface UserFormData {
  name: string
  email: string
  avatar: string
  role: User['role']
  status: User['status']
}

interface FormErrors {
  name?: string
  email?: string
}

const props = defineProps<{
  editingUser?: User | null
}>()

const emit = defineEmits<{
  'user-added': [user: User]
  'user-updated': [user: User]
  'edit-cancelled': []
}>()

const userStore = useUserStore()
const isSubmitting = ref(false)
const errors = ref<FormErrors>({})

// 表单数据
const formData = ref<UserFormData>({
  name: '',
  email: '',
  avatar: '👨‍💼',
  role: 'user',
  status: 'active'
})

// 计算属性
const isEditing = computed(() => !!props.editingUser)

// 监听编辑用户的变化
watch(() => props.editingUser, (newUser) => {
  if (newUser) {
    formData.value = {
      name: newUser.name,
      email: newUser.email,
      avatar: newUser.avatar,
      role: newUser.role,
      status: newUser.status
    }
  } else {
    resetForm()
  }
}, {immediate: true})

// 方法
const validateForm = (): boolean => {
  errors.value = {}

  if (!formData.value.name.trim()) {
    errors.value.name = '姓名不能为空'
  } else if (formData.value.name.length < 2) {
    errors.value.name = '姓名至少需要2个字符'
  }

  if (!formData.value.email.trim()) {
    errors.value.email = '邮箱不能为空'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.value.email = '请输入有效的邮箱地址'
  }

  return Object.keys(errors.value).length === 0
}

const handleSubmit = async () => {
  if (!validateForm()) {
    return
  }

  isSubmitting.value = true

  try {
    if (isEditing.value && props.editingUser) {
      // 编辑模式
      const updatedUser = userStore.updateUser(props.editingUser.id, formData.value)
      if (updatedUser) {
        emit('user-updated', updatedUser)
      }
    } else {
      // 添加模式
      const newUser = userStore.addUser(formData.value)
      emit('user-added', newUser)
      resetForm()
    }
  } catch (error) {
    console.error('操作失败:', error)
  } finally {
    isSubmitting.value = false
  }
}

const cancelEdit = () => {
  resetForm()
  emit('edit-cancelled')
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
</script>

<style scoped>
.user-form {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.form-header h3 {
  margin: 0 0 20px 0;
  color: #2c3e50;
}

.form-content {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-weight: 500;
  color: #2c3e50;
  font-size: 14px;
}

.form-input,
.form-select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s;
}

.form-input:focus,
.form-select:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
}

.form-error {
  color: #e74c3c;
  font-size: 12px;
  margin-top: 2px;
}

.radio-group {
  display: flex;
  gap: 16px;
}

.radio-label {
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
}

.radio-input {
  margin: 0;
}

.radio-text {
  font-size: 14px;
  color: #2c3e50;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-primary:hover:not(:disabled) {
  background: #2980b9;
}

.btn-primary:disabled {
  background: #bdc3c7;
  cursor: not-allowed;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn-secondary:hover {
  background: #5a6268;
}

.btn-outline {
  background: transparent;
  border: 1px solid #6c757d;
  color: #6c757d;
}

.btn-outline:hover {
  background: #6c757d;
  color: white;
}

.form-preview {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid #e9ecef;
}

.form-preview h4 {
  margin: 0 0 12px 0;
  color: #2c3e50;
  font-size: 16px;
}

.preview-card {
  display: flex;
  align-items: center;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
  border: 1px solid #e9ecef;
}

.preview-avatar {
  font-size: 24px;
  margin-right: 12px;
  min-width: 32px;
  text-align: center;
}

.preview-info {
  flex: 1;
}

.preview-name {
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 2px;
}

.preview-email {
  font-size: 13px;
  color: #6c757d;
  margin-bottom: 6px;
}

.preview-meta {
  display: flex;
  gap: 6px;
}

.preview-role,
.preview-status {
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 11px;
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
</style>
