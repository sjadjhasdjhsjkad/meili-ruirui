<!--
  Element Plus 组件示例页面
  这个文件展示了 Element Plus 中最常用的各种组件
  包含详细的中文注释，适合前端新手学习

  包含的组件类型：
  1. 基础组件 - 按钮、图标、标签
  2. 表单组件 - 输入框、选择器、日期选择器、开关
  3. 数据展示 - 表格、分页、进度条、树形控件
  4. 反馈组件 - 消息提示、对话框、抽屉
  5. 导航组件 - 菜单、面包屑
-->
<template>
  <div class="demo-container">
    <!-- 页面标题 -->
    <h1>Element Plus 组件示例大全</h1>
    <p>这是一个展示 Element Plus 常用组件的示例页面，包含详细注释</p>

    <!-- 1. 基础组件区域 -->
    <el-card class="demo-section" shadow="hover">
      <template #header>
        <div class="section-header">
          <el-icon>
            <Star/>
          </el-icon>
          <span>基础组件</span>
        </div>
      </template>

      <div class="component-group">
        <!--
          按钮组件 (el-button)
          type 属性：按钮类型 - primary(主要)、success(成功)、warning(警告)、danger(危险)、info(信息)
          size 属性：按钮大小 - large(大)、default(默认)、small(小)
          plain 属性：朴素按钮，只有边框和文字
          round 属性：圆角按钮
          circle 属性：圆形按钮
          disabled 属性：禁用状态
          loading 属性：加载中状态
        -->
        <div class="sub-group">
          <h3>按钮 (Button)</h3>
          <el-button type="primary" @click="handleButtonClick">主要按钮</el-button>
          <el-button type="success" @click="abc">成功按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
          <el-button type="info">信息按钮</el-button>
          <br/>
          <el-button plain>朴素按钮</el-button>
          <el-button round>圆角按钮</el-button>
          <el-button circle>
            <el-icon>
              <Search/>
            </el-icon>
          </el-button>
          <el-button :loading="true">加载中</el-button>
          <el-button disabled>禁用按钮</el-button>
        </div>

        <!--
          标签组件 (el-tag)
          type 属性：标签类型
          effect 属性：主题效果 - plain(朴素)、light(明亮，默认)、dark(深色)
          closable 属性：可关闭
        -->
        <div class="sub-group">
          <h3>标签 (Tag)</h3>
          <el-tag>默认标签</el-tag>
          <el-tag type="success">成功</el-tag>
          <el-tag type="warning">警告</el-tag>
          <el-tag type="danger">危险</el-tag>
          <el-tag type="info">信息</el-tag>
          <el-tag closable @close="handleTagClose">可关闭标签</el-tag>
        </div>

        <!--
          进度条组件 (el-progress)
          percentage 属性：进度百分比 (0-100)
          status 属性：进度条状态 - success(成功)、exception(异常)、warning(警告)
          stroke-width 属性：进度条宽度
          text-inside 属性：进度条内显示百分比文字
        -->
        <div class="sub-group">
          <h3>进度条 (Progress)</h3>
          <el-progress :percentage="50"/>
          <el-progress :percentage="75" status="success"/>
          <el-progress :percentage="25" status="exception"/>
          <el-progress :percentage="90" status="warning"/>
          <el-progress :percentage="60" stroke-width="18" text-inside/>
        </div>
      </div>
    </el-card>

    <!-- 2. 表单组件区域 -->
    <el-card class="demo-section" shadow="hover">
      <template #header>
        <div class="section-header">
          <el-icon>
            <Edit/>
          </el-icon>
          <span>表单组件</span>
        </div>
      </template>

      <!--
        表单组件 (el-form)
        :model 属性：绑定的表单数据对象
        :rules 属性：表单验证规则
        ref 属性：表单引用，用于获取表单实例
        label-width 属性：标签宽度
      -->
      <el-form ref="formRef" :model="formData" :rules="formRules" label-width="120px">
        <el-row :gutter="20">
          <el-col :span="12">
            <!--
              输入框组件 (el-input)
              v-model：双向数据绑定
              placeholder：占位符文本
              clearable：可清空
              show-password：显示密码切换按钮
              disabled：禁用状态
              type：输入类型 - text、textarea、password、number 等
            -->
            <el-form-item label="用户名" prop="username">
              <el-input
                  v-model="formData.username"
                  clearable
                  placeholder="请输入用户名"
                  prefix-icon="User"
              />
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input
                  v-model="formData.password"
                  placeholder="请输入密码"
                  prefix-icon="Lock"
                  show-password
                  type="password"
              />
            </el-form-item>

            <!--
              选择器组件 (el-select)
              v-model：选中的值
              multiple：是否多选
              filterable：是否可搜索
              placeholder：占位符
              clearable：可清空
            -->
            <el-form-item label="城市" prop="city">
              <el-select
                  v-model="formData.city"
                  clearable
                  filterable
                  placeholder="请选择城市"
              >
                <el-option
                    v-for="item in cityOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                />
              </el-select>
            </el-form-item>

            <!--
              日期选择器组件 (el-date-picker)
              v-model：选中的日期
              type：选择器类型 - date、dates、datetime、week、month、year
              format：显示格式
              value-format：绑定值的格式
              placeholder：占位符
            -->
            <el-form-item label="生日" prop="birthday">
              <el-date-picker
                  v-model="formData.birthday"
                  format="YYYY-MM-DD"
                  placeholder="选择日期"
                  type="date"
                  value-format="YYYY-MM-DD"
              />
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <!--
              单选框组件 (el-radio)
              v-model：绑定的值
              label：单选框的值
              disabled：是否禁用
            -->
            <el-form-item label="性别" prop="gender">
              <el-radio-group v-model="formData.gender">
                <el-radio label="male">男</el-radio>
                <el-radio label="female">女</el-radio>
                <el-radio disabled label="other">其他</el-radio>
              </el-radio-group>
            </el-form-item>

            <!--
              多选框组件 (el-checkbox)
              v-model：绑定的值（数组）
              label：多选框的值
              disabled：是否禁用
              indeterminate：不确定状态（用于全选功能）
            -->
            <el-form-item label="兴趣爱好" prop="hobbies">
              <el-checkbox-group v-model="formData.hobbies">
                <el-checkbox label="reading">阅读</el-checkbox>
                <el-checkbox label="sports">运动</el-checkbox>
                <el-checkbox label="music">音乐</el-checkbox>
                <el-checkbox disabled label="travel">旅游</el-checkbox>
              </el-checkbox-group>
            </el-form-item>

            <!--
              开关组件 (el-switch)
              v-model：开关状态
              active-text：开启时显示的文字
              inactive-text：关闭时显示的文字
              active-value：开启时的值
              inactive-value：关闭时的值
              disabled：是否禁用
            -->
            <el-form-item label="接收通知">
              <el-switch
                  v-model="formData.notification"
                  active-text="开启"
                  inactive-text="关闭"
              />
            </el-form-item>

            <!--
              滑块组件 (el-slider)
              v-model：滑块的值
              min：最小值
              max：最大值
              step：步长
              show-stops：显示间断点
              show-tooltip：显示提示
            -->
            <el-form-item label="年龄">
              <el-slider
                  v-model="formData.age"
                  :max="100"
                  :min="18"
                  :step="1"
                  show-tooltip
              />
            </el-form-item>
          </el-col>
        </el-row>

        <!--
          文本域组件 (el-input type="textarea")
          v-model：绑定的值
          rows：显示的行数
          maxlength：最大字符数
          show-word-limit：显示字数统计
          resize：调整大小 - none(不可调整)、both(可调整)、horizontal(水平)、vertical(垂直)
        -->
        <el-form-item label="个人简介" prop="description">
          <el-input
              v-model="formData.description"
              :rows="4"
              maxlength="200"
              placeholder="请输入个人简介"
              show-word-limit
              type="textarea"
          />
        </el-form-item>

        <!-- 表单按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">提交表单</el-button>
          <el-button @click="resetForm">重置表单</el-button>
          <el-button type="danger" @click="validateForm">验证表单</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <!-- 3. 数据展示组件区域 -->
    <el-card class="demo-section" shadow="hover">
      <template #header>
        <div class="section-header">
          <el-icon>
            <Grid/>
          </el-icon>
          <span>数据展示</span>
        </div>
      </template>

      <div class="component-group">
        <!--
          表格组件 (el-table)
          :data：表格数据数组
          :border：是否显示边框
          :stripe：是否显示斑马纹
          :highlight-current-row：是否高亮当前行
          height：表格高度
          @selection-change：选择变化时的回调
        -->
        <div class="sub-group">
          <h3>表格 (Table)</h3>
          <el-table
              :data="tableData"
              border
              stripe
              style="width: 100%"
              @selection-change="handleSelectionChange"
          >
            <!-- 多选列 -->
            <el-table-column type="selection" width="55"/>

            <!-- 索引列 -->
            <el-table-column label="序号" type="index" width="50"/>

            <!-- 普通列 -->
            <el-table-column label="姓名" prop="name" width="120"/>

            <!-- 带格式化的列 -->
            <el-table-column label="年龄" prop="age" sortable width="80"/>

            <!-- 带自定义模板的列 -->
            <el-table-column label="性别" prop="gender" width="80">
              <template #default="scope">
                <el-tag :type="scope.row.gender === '男' ? 'primary' : 'success'">
                  {{ scope.row.gender }}
                </el-tag>
              </template>
            </el-table-column>

            <!-- 带操作的列 -->
            <el-table-column label="操作" width="180">
              <template #default="scope">
                <el-button
                    size="small"
                    type="primary"
                    @click="handleEdit(scope.$index, scope.row)"
                >
                  编辑
                </el-button>
                <el-button
                    size="small"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                >
                  删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>

          <!--
            分页组件 (el-pagination)
            v-model:current-page：当前页码
            v-model:page-size：每页显示条数
            :page-sizes：每页显示条数的选项
            :total：总条数
            :layout：布局组件
            @size-change：每页条数变化时的回调
            @current-change：当前页变化时的回调
          -->
          <div class="pagination-container">
            <el-pagination
                v-model:current-page="pagination.currentPage"
                v-model:page-size="pagination.pageSize"
                :page-sizes="[10, 20, 50, 100]"
                :total="pagination.total"
                layout="total, sizes, prev, pager, next, jumper"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
            />
          </div>
        </div>
      </div>
    </el-card>

    <!-- 4. 反馈组件区域 -->
    <el-card class="demo-section" shadow="hover">
      <template #header>
        <div class="section-header">
          <el-icon>
            <Bell/>
          </el-icon>
          <span>反馈组件</span>
        </div>
      </template>

      <div class="component-group">
        <h3>消息提示和对话框</h3>

        <!-- 消息提示按钮组 -->
        <el-space wrap>
          <el-button @click="showSuccessMessage">成功消息</el-button>
          <el-button @click="showWarningMessage">警告消息</el-button>
          <el-button @click="showErrorMessage">错误消息</el-button>
          <el-button @click="showInfoMessage">信息消息</el-button>
          <el-button @click="showConfirmDialog">确认对话框</el-button>
          <el-button @click="showPromptDialog">输入对话框</el-button>
          <el-button @click="showDrawer">打开抽屉</el-button>
        </el-space>
      </div>
    </el-card>

    <!-- 5. 导航组件区域 -->
    <el-card class="demo-section" shadow="hover">
      <template #header>
        <div class="section-header">
          <el-icon>
            <Menu/>
          </el-icon>
          <span>导航组件</span>
        </div>
      </template>

      <div class="component-group">
        <el-row :gutter="20">
          <el-col :span="12">
            <!--
              菜单组件 (el-menu)
              :default-active：当前激活菜单的 index
              mode：菜单模式 - horizontal(水平)、vertical(垂直)
              @select：菜单选择时的回调
            -->
            <h3>菜单 (Menu)</h3>
            <el-menu
                :default-active="activeMenu"
                mode="vertical"
                @select="handleMenuSelect"
            >
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <Setting/>
                  </el-icon>
                  <span>系统管理</span>
                </template>
                <el-menu-item index="1-1">用户管理</el-menu-item>
                <el-menu-item index="1-2">角色管理</el-menu-item>
                <el-menu-item index="1-3">权限管理</el-menu-item>
              </el-sub-menu>

              <el-sub-menu index="2">
                <template #title>
                  <el-icon>
                    <Document/>
                  </el-icon>
                  <span>内容管理</span>
                </template>
                <el-menu-item index="2-1">文章管理</el-menu-item>
                <el-menu-item index="2-2">分类管理</el-menu-item>
                <el-menu-item index="2-3">标签管理</el-menu-item>
              </el-sub-menu>
            </el-menu>
          </el-col>

          <el-col :span="12">
            <!--
              面包屑组件 (el-breadcrumb)
              separator：分隔符
            -->
            <h3>面包屑 (Breadcrumb)</h3>
            <el-breadcrumb separator="/">
              <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item><a href="/">组件示例</a></el-breadcrumb-item>
              <el-breadcrumb-item>Element Plus</el-breadcrumb-item>
              <el-breadcrumb-item>导航组件</el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<!--
  Vue 3 Composition API 脚本部分
  使用 <script setup> 语法糖，让代码更简洁
-->
<script lang="ts" setup>
import {ref, reactive} from 'vue';
import {ElMessage, ElMessageBox, ElNotification} from 'element-plus';
import {
  Bell, Document,
  Edit, Grid, Menu,
  Search, Setting,
  Star,
} from '@element-plus/icons-vue';

// ==================== 响应式数据定义 ====================

// 按钮点击次数
const clickCount = ref(0)

// 表单数据对象 - 使用 reactive 创建响应式对象
const formData = reactive({
  username: '',
  password: '',
  city: '',
  birthday: '',
  gender: 'male',
  hobbies: [],
  notification: false,
  age: 25,
  description: ''
})

// 表单引用 - 用于表单操作
const formRef = ref()

// 当前激活的菜单
const activeMenu = ref('1-1')

// 城市选择选项
const cityOptions = [
  {value: 'beijing', label: '北京'},
  {value: 'shanghai', label: '上海'},
  {value: 'guangzhou', label: '广州'},
  {value: 'shenzhen', label: '深圳'},
  {value: 'hangzhou', label: '杭州'},
  {value: 'shandong', label: '山东'},
  {value: 'chongqing', label: '重庆'}
]

// 表单验证规则
const formRules = reactive({
  username: [
    {required: true, message: '请输入用户名', trigger: 'blur'},
    {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
  ],
  password: [
    {required: true, message: '请输入密码', trigger: 'blur'},
    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
  ],
  city: [
    {required: true, message: '请选择城市', trigger: 'change'}
  ],
  birthday: [
    {required: true, message: '请选择生日', trigger: 'change'}
  ]
})

// 表格数据
const tableData = reactive([
  {
    name: '张三',
    age: 25,
    gender: '男',
    email: 'zhangsan@example.com'
  },
  {
    name: '李四',
    age: 30,
    gender: '女',
    email: 'lisi@example.com'
  },
  {
    name: '王五',
    age: 28,
    gender: '男',
    email: 'wangwu@example.com'
  }
])

// 分页数据
const pagination = reactive({
  currentPage: 1,
  pageSize: 10,
  total: 100
})

// ==================== 方法定义 ====================

// 按钮点击处理
const handleButtonClick = () => {
  clickCount.value++
  ElMessage.success(`按钮被点击了 ${clickCount.value} 次！`)
}
const abc = () => {
  clickCount.value++
  ElMessage.success(`按钮被点击了 ${clickCount.value} 次！`)
}

// 标签关闭处理
const handleTagClose = () => {
  ElMessage.info('标签已关闭')
}

// 提交表单
const submitForm = () => {
  if (!formRef.value) return

  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('表单提交成功！')
      console.log('提交的表单数据：', formData)
      return true
    } else {
      ElMessage.error('表单验证失败，请检查输入！')
      return false
    }
  })
}

// 重置表单
const resetForm = () => {
  if (!formRef.value) return
  formRef.value.resetFields()
  ElMessage.info('表单已重置')
}

// 验证表单
const validateForm = () => {
  if (!formRef.value) return
  formRef.value.validate((valid: boolean) => {
    if (valid) {
      ElMessage.success('表单验证通过！')
    } else {
      ElMessage.error('表单验证失败！')
    }
  })
}

// 表格选择变化处理
const handleSelectionChange = (selection: any[]) => {
  ElMessage.info(`选择了 ${selection.length} 条数据`)
}

// 编辑行处理
const handleEdit = (index: number, row: any) => {
  ElMessage.info(`编辑第 ${index + 1} 行：${row.name}`)
}

// 删除行处理
const handleDelete = (index: number, row: any) => {
  ElMessage.warning(`删除第 ${index + 1} 行：${row.name}`)
}

// 分页大小变化处理
const handleSizeChange = (val: number) => {
  pagination.pageSize = val
  ElMessage.info(`每页显示 ${val} 条数据`)
}

// 当前页变化处理
const handleCurrentChange = (val: number) => {
  pagination.currentPage = val
  ElMessage.info(`当前第 ${val} 页`)
}

// 菜单选择处理
const handleMenuSelect = (index: string) => {
  activeMenu.value = index
  ElMessage.info(`选择了菜单项：${index}`)
}

// 显示成功消息
const showSuccessMessage = () => {
  ElMessage({
    message: '恭喜你，操作成功！',
    type: 'success',
    duration: 3000
  })
}

// 显示警告消息
const showWarningMessage = () => {
  ElMessage({
    message: '警告，请注意检查！',
    type: 'warning'
  })
}

// 显示错误消息
const showErrorMessage = () => {
  ElMessage({
    message: '错误，操作失败！',
    type: 'error'
  })
}

// 显示信息消息
const showInfoMessage = () => {
  ElMessage({
    message: '这是一条信息提示！',
    type: 'info'
  })
}

// 显示确认对话框
const showConfirmDialog = () => {
  ElMessageBox.confirm(
      '此操作将永久删除该文件, 是否继续?',
      '警告',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
  )
      .then(() => {
        ElMessage({
          type: 'success',
          message: '删除成功!',
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '已取消删除',
        })
      })
}

// 显示输入对话框
const showPromptDialog = () => {
  ElMessageBox.prompt('请输入你的邮箱', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
    inputErrorMessage: '邮箱格式不正确',
  })
      .then(({value}) => {
        ElMessage({
          type: 'success',
          message: `你的邮箱是: ${value}`,
        })
      })
      .catch(() => {
        ElMessage({
          type: 'info',
          message: '取消输入',
        })
      })
}

// 显示抽屉
const showDrawer = () => {
  ElNotification({
    title: '通知',
    message: '抽屉功能演示，实际项目中需要结合 el-drawer 组件使用',
    type: 'info',
  })
}
</script>

<!--
  样式部分
  scoped 表示样式只在当前组件内生效，避免样式污染
  使用了 Element Plus 的 CSS 变量来保持主题一致性
-->
<style scoped>
.demo-container {
  padding: 20px;
  background-color: var(--el-bg-color-page);
  min-height: 100vh;
}

.demo-container h1 {
  text-align: center;
  color: var(--el-text-color-primary);
  margin-bottom: 10px;
}

.demo-container p {
  text-align: center;
  color: var(--el-text-color-regular);
  margin-bottom: 30px;
}

.demo-section {
  margin-bottom: 30px;
  border-radius: 8px;
}

.section-header {
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  color: var(--el-text-color-primary);
}

.section-header .el-icon {
  margin-right: 8px;
  color: var(--el-color-primary);
}

.component-group {
  padding: 20px 0;
}

.sub-group {
  margin-bottom: 30px;
  padding: 20px;
  background-color: var(--el-fill-color-light);
  border-radius: 6px;
}

.sub-group h3 {
  margin-bottom: 15px;
  color: var(--el-text-color-primary);
  border-bottom: 2px solid var(--el-color-primary);
  padding-bottom: 8px;
}

/* 按钮组样式 */
.sub-group .el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

/* 标签组样式 */
.sub-group .el-tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

/* 进度条样式 */
.sub-group .el-progress {
  margin-bottom: 15px;
  max-width: 400px;
}

/* 表单样式调整 */
.el-form-item {
  margin-bottom: 22px;
}

/* 表格样式 */
.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

/* 菜单样式 */
.el-menu {
  border-right: none;
  max-width: 250px;
}

/* 面包屑样式 */
.el-breadcrumb {
  margin-top: 10px;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .demo-container {
    padding: 10px;
  }

  .sub-group {
    padding: 15px;
  }

  .el-form-item {
    margin-bottom: 18px;
  }
}

/* 动画效果 */
.demo-section {
  transition: all 0.3s ease;
}

.demo-section:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}
</style>