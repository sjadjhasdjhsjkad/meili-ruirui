<template>
  <div class="pinia-demo">
    <el-card class="demo-card" header="Pinia 状态管理演示">
      <!-- 计数器示例 -->
      <el-card class="counter-demo" header="1. 计数器 Store 演示">
        <div class="counter-section">
          <el-row :gutter="20" align="middle">
            <el-col :span="8">
              <el-statistic title="当前计数" :value="counterStore.count" />
            </el-col>
            <el-col :span="8">
              <el-statistic title="双倍计数" :value="counterStore.doubleCount" />
            </el-col>
            <el-col :span="8">
              <el-input
                v-model="counterStore.name"
                placeholder="输入您的名字"
                style="width: 200px"
              />
            </el-col>
          </el-row>

          <div class="greeting">
            <el-tag type="success" size="large">
              {{ counterStore.greeting }}
            </el-tag>
          </div>

          <div class="counter-buttons">
            <el-button @click="counterStore.decrement" type="danger" :icon="Minus">-</el-button>
            <el-button @click="counterStore.reset" type="warning" :icon="Refresh">重置</el-button>
            <el-button @click="counterStore.increment" type="primary" :icon="Plus">+</el-button>
          </div>

          <div class="set-count">
            <el-input-number
              v-model="newCount"
              :min="0"
              :max="100"
              placeholder="设置计数"
            />
            <el-button @click="setCounterCount" type="success" style="margin-left: 10px">
              设置计数
            </el-button>
          </div>
        </div>
      </el-card>

      <!-- 用户管理示例 -->
      <el-card class="user-demo" header="2. 用户管理 Store 演示">
        <div v-if="!userStore.isLoggedIn" class="login-section">
          <h3>请选择用户登录：</h3>
          <el-space wrap>
            <el-button
              v-for="user in userStore.users"
              :key="user.id"
              @click="handleLogin(user.id)"
              type="primary"
            >
              {{ user.name }}
            </el-button>
          </el-space>
        </div>

        <div v-else class="user-section">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card header="当前用户信息">
                <p><strong>姓名：</strong>{{ userStore.currentUser?.name }}</p>
                <p><strong>邮箱：</strong>{{ userStore.currentUser?.email }}</p>
                <div class="user-actions">
                  <el-button @click="showEditDialog = true" type="primary" :icon="Edit">
                    编辑资料
                  </el-button>
                  <el-button @click="handleLogout" type="danger" :icon="SwitchButton">
                    退出登录
                  </el-button>
                </div>
              </el-card>
            </el-col>

            <el-col :span="12">
              <el-card header="待办事项统计">
                <el-statistic
                  title="已完成"
                  :value="userStore.completedTodosCount"
                  suffix="个"
                />
                <el-statistic
                  title="未完成"
                  :value="userStore.uncompletedTodosCount"
                  suffix="个"
                />
              </el-card>
            </el-col>
          </el-row>

          <!-- 待办事项列表 -->
          <el-card header="我的待办事项" style="margin-top: 20px">
            <div class="add-todo">
              <el-input
                v-model="newTodoText"
                placeholder="输入新的待办事项"
                @keyup.enter="addTodo"
                style="width: 300px"
              >
                <template #append>
                  <el-button @click="addTodo" type="primary">添加</el-button>
                </template>
              </el-input>
            </div>

            <el-table :data="userStore.userTodos" style="margin-top: 20px">
              <el-table-column prop="text" label="待办事项" />
              <el-table-column prop="completed" label="状态" width="100">
                <template #default="{ row }">
                  <el-tag :type="row.completed ? 'success' : 'warning'">
                    {{ row.completed ? '已完成' : '未完成' }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="操作" width="200">
                <template #default="{ row }">
                  <el-button
                    @click="toggleTodo(row.id)"
                    size="small"
                    :type="row.completed ? 'warning' : 'success'"
                  >
                    {{ row.completed ? '标记未完成' : '标记完成' }}
                  </el-button>
                  <el-button
                    @click="deleteTodo(row.id)"
                    size="small"
                    type="danger"
                  >
                    删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-card>
        </div>
      </el-card>
    </el-card>

    <!-- 编辑用户资料对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑用户资料" width="400px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="姓名">
          <el-input v-model="editForm.name" />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button @click="updateProfile" type="primary">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Plus,
  Minus,
  Refresh,
  Edit,
  SwitchButton
} from '@element-plus/icons-vue'
import { useCounterStore } from '@/stores/counter'
import { useUserStore } from '@/stores/user'

// 获取 store 实例
const counterStore = useCounterStore()
const userStore = useUserStore()

// 响应式数据
const newCount = ref(0)
const newTodoText = ref('')
const showEditDialog = ref(false)
const editForm = reactive({
  name: '',
  email: ''
})

// 计数器相关方法
function setCounterCount() {
  counterStore.setCount(newCount.value)
  ElMessage.success(`计数已设置为 ${newCount.value}`)
}

// 用户管理相关方法
function handleLogin(userId: number) {
  const success = userStore.login(userId)
  if (success) {
    ElMessage.success('登录成功！')
    // 初始化编辑表单
    if (userStore.currentUser) {
      editForm.name = userStore.currentUser.name
      editForm.email = userStore.currentUser.email
    }
  } else {
    ElMessage.error('登录失败，用户不存在')
  }
}

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
}

function addTodo() {
  if (!newTodoText.value.trim()) {
    ElMessage.warning('请输入待办事项内容')
    return
  }

  const todo = userStore.addTodo(newTodoText.value)
  if (todo) {
    ElMessage.success('待办事项添加成功！')
    newTodoText.value = ''
  } else {
    ElMessage.error('请先登录')
  }
}

function toggleTodo(todoId: number) {
  userStore.toggleTodo(todoId)
  ElMessage.success('待办事项状态已更新')
}

function deleteTodo(todoId: number) {
  userStore.deleteTodo(todoId)
  ElMessage.success('待办事项已删除')
}

function updateProfile() {
  userStore.updateProfile(editForm)
  ElMessage.success('用户资料已更新')
  showEditDialog.value = false
}
</script>

<style scoped>
.pinia-demo {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.demo-card {
  margin-bottom: 20px;
}

.counter-demo, .user-demo {
  margin-top: 20px;
}

.counter-section {
  text-align: center;
}

.greeting {
  margin: 20px 0;
}

.counter-buttons {
  margin: 20px 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.set-count {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-section {
  text-align: center;
  padding: 40px 0;
}

.user-section {
  margin-top: 20px;
}

.user-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}

.add-todo {
  margin-bottom: 20px;
}
</style>