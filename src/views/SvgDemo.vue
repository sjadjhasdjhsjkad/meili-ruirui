<template>
  <div class="svg-demo">
    <h2>SVG 图标使用示例</h2>

    <el-row :gutter="20">
      <el-col :span="12">
        <el-card class="demo-card">
          <template #header>
            <div class="card-header">
              <span>SvgIcon 组件使用</span>
            </div>
          </template>

          <div class="icon-examples">
            <!-- 基础使用 -->
            <div class="example-item">
              <Cloud/>
              <span>基础图标 (24px)</span>
            </div>

            <!-- 自定义大小 -->
            <div class="example-item">
              <HomeIcon class="icon"/>
              <span>自定义大小 (32px, 蓝色)</span>
            </div>

            <!-- 可点击图标 -->
            <div class="example-item">
              <HomeIcon @click="handleIconClick" style="color: red"
              />
              <span>可点击图标 (点击试试)</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="12">
        <el-card class="demo-card">
          <template #header>
            <div class="card-header">
              <span>SVG 文件直接导入</span>
            </div>
          </template>

          <div class="direct-import-example">
            <component :is="importedSvg" :size="24" />
            <span>直接导入的 SVG 组件</span>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-card class="demo-card" style="margin-top: 20px;">
      <template #header>
        <div class="card-header">
          <span>使用说明</span>
        </div>
      </template>

      <el-collapse>
        <el-collapse-item title="1. SVG 图标组件使用" name="1">
          <pre><code>&lt;!-- 基础使用 --&gt;
&lt;SvgIcon src="图标文件名" /&gt;

&lt;!-- 自定义大小和颜色 --&gt;
&lt;SvgIcon src="图标文件名" :size="32" color="#409EFF" /&gt;

&lt;!-- 可点击 --&gt;
&lt;SvgIcon src="图标文件名" clickable @click="handleClick" /&gt;</code></pre>
        </el-collapse-item>

        <el-collapse-item title="2. 直接导入 SVG 文件" name="2">
          <pre><code>import myIcon from '@/assets/icons/my-icon.svg'

// 在模板中使用
&lt;component :is="myIcon" :size="24" /&gt;</code></pre>
        </el-collapse-item>

        <el-collapse-item title="3. Vite 原生 SVG 支持" name="3">
          <pre><code>&lt;!-- 直接使用 SVG 作为背景图 --&gt;
&lt;div class="icon" :style="{ backgroundImage: \`url(\${iconUrl})\` }"&gt;&lt;/div&gt;

// 在 script 中导入
import iconUrl from '@/assets/icons/icon.svg?url'</code></pre>
        </el-collapse-item>
      </el-collapse>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import HomeIcon from '@/assets/icons/home.svg'
import { ref, onMounted } from 'vue'
import Cloud from '@/assets/icons/cloud.svg'
import {ElMessage} from "element-plus";

// 动态导入 SVG 示例
const importedSvg = ref<any>(null)

const handleIconClick = () => {
  ElMessage.success('图标被点击了！')
}

onMounted(async () => {
  try {
    // 尝试导入示例 SVG
    importedSvg.value = (await import('@/assets/icons/example.svg')).default
    console.log('SVG 导入成功')
  } catch (error) {
    console.error('SVG 导入失败:', error)
  }
})
</script>

<style scoped>

.icon {
  color: #e58cfd;
  width: 32px;
  height: 32px;
}

.svg-demo {
  padding: 20px;
}

.demo-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.icon-examples {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.example-item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.example-item:hover {
  background-color: #f5f7fa;
}

.direct-import-example {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px;
  background-color: #f5f7fa;
  border-radius: 4px;
}

pre {
  background-color: #f5f7fa;
  padding: 16px;
  border-radius: 4px;
  overflow-x: auto;
}

code {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
}
</style>