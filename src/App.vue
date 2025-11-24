<!--
  Vue 单文件组件的模板部分
  这里定义了组件的 HTML 结构
  当前是空的，可以添加 HTML 元素和其他 Vue 组件
-->
<template>
  <div class="app-container">
    <h1>APP根组件</h1>
    <h2>SB-RUIRUI - FOR V2</h2>

    <!-- 导航按钮 -->
    <el-row style="margin: 30px 0;">
      <el-col :span="24" style="text-align: center;">
        <el-button type="primary" size="large" @click="showDemo = !showDemo">
          <el-icon><Star /></el-icon>
          {{ showDemo ? '隐藏' : '查看' }} Element Plus 组件示例
        </el-button>
      </el-col>
    </el-row>

    <!-- Element Plus 测试组件 -->
    <el-divider content-position="left">基础测试</el-divider>

    <el-row :gutter="20" class="test-row">
      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>按钮组件测试</span>
            </div>
          </template>
          <el-button type="primary">主要按钮</el-button>
          <el-button type="success">成功按钮</el-button>
          <el-button type="warning">警告按钮</el-button>
          <el-button type="danger">危险按钮</el-button>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>其他组件测试</span>
            </div>
          </template>
          <el-tag type="success">标签组件</el-tag>
          <el-icon><Star /></el-icon>
          <el-progress :percentage="50" />
        </el-card>
      </el-col>
    </el-row>

    <!-- Element Plus Demo 组件显示区域 -->
    <ElementPlusDemo v-if="showDemo" />
  </div>
</template>

<!--
  Vue 单文件组件的脚本部分
  lang="ts" 表示使用 TypeScript 语言
  setup 是 Vue 3 的 Composition API 语法糖
  这里可以定义组件的响应式数据、方法、计算属性等
-->
<script lang="ts" setup>
// 导入 Vue 3 的 ref 函数，用于创建响应式数据
import { ref } from 'vue'

// 导入组件
import ElementPlusDemo from "./views/ElementPlusDemo.vue"

// 创建响应式数据：控制是否显示 Element Plus 示例组件
// ref 函数会将普通值包装成响应式对象，当值变化时，视图会自动更新
const showDemo = ref(false)
</script>


<!--
  Vue 单文件组件的样式部分
  scoped 表示这些样式只在当前组件内生效，不会影响其他组件
  这样可以避免样式污染和冲突
-->
<style scoped>
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.test-row {
  margin: 20px 0;
}

.box-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.el-button {
  margin-right: 10px;
  margin-bottom: 10px;
}

/*
  .logo 类的样式定义
  用于设置 logo 图片的基本样式
*/
.logo {
  height: 6em; /* 设置高度为 6 个字符大小单位 */
  padding: 1.5em; /* 设置内边距为 1.5 个字符大小 */
  will-change: filter; /* 告诉浏览器 filter 属性将会变化，优化性能 */
  transition: filter 300ms; /* filter 属性变化时的过渡动画，持续 300 毫秒 */
}

/*
  鼠标悬停在 .logo 元素上时的样式
  使用 drop-shadow 滤镜添加阴影效果
  #646cffaa 是颜色值，最后两位 aa 表示透明度
*/
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa); /* 添加 2em 模糊半径的蓝色阴影 */
}

/*
  当元素同时有 .logo 和 .vue 类时，鼠标悬停的样式
  使用不同的颜色（绿色）阴影
  #42b883aa 是 Vue 标志的绿色
*/
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa); /* 添加 2em 模糊半径的绿色阴影 */
}
</style>
