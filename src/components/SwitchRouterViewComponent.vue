<template>
  <div v-if="$route.path === '/'">
    <!-- 导航按钮 -->
    <el-row style="margin: 30px 0;">
      <el-col :span="12" style="text-align: center;">
        <el-button size="large" type="primary" @click="showDemo = !showDemo">
          <el-icon>
            <Star/>
          </el-icon>
          {{ showDemo ? '隐藏' : '查看' }} Element Plus 组件示例
        </el-button>
      </el-col>
      <el-col :span="12" style="text-align: center;">
        <el-button size="large" type="success" @click="showSvgDemo = !showSvgDemo">
          <el-icon>
            <Picture/>
          </el-icon>
          {{ showSvgDemo ? '隐藏' : '查看' }} SVG 图标示例
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
          <el-icon>
            <Star/>
          </el-icon>
          <el-progress :percentage="50"/>
        </el-card>
      </el-col>
    </el-row>

    <!-- Element Plus Demo 组件显示区域 -->
    <ElementPlusDemo v-if="showDemo"/>

    <!-- SVG Demo 组件显示区域 -->
    <SvgDemo v-if="showSvgDemo"/>
  </div>
</template>

<script lang="ts" setup>

import {Picture, Star} from "@element-plus/icons-vue";
import ElementPlusDemo from "@/views/ElementPlusDemo.vue";
import SvgDemo from "@/views/SvgDemo.vue";
import {ref} from "vue";

// 创建响应式数据：控制是否显示示例组件
// ref 函数会将普通值包装成响应式对象，当值变化时，视图会自动更新
const showDemo = ref(false)
const showSvgDemo = ref(false)
</script>

<style scoped>
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

</style>