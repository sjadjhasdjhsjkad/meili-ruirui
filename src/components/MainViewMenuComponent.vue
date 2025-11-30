<script lang="ts" setup>

import {Connection, House, Star, DataBoard, User} from "@element-plus/icons-vue";
</script>

<template>
  <el-menu
      :default-active="$route.path"
      mode="horizontal"
      router
      style="margin: 20px 0;">
    <!-- 首页 -->
    <el-menu-item index="/">
      <el-icon>
        <House/>
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/request">
      <el-icon>
        <DataBoard/>
      </el-icon>
      <span>请求数据</span>
    </el-menu-item>
    <!-- element-demo -->
    <el-menu-item index="/element-demo">
      <el-icon>
        <Connection/>
      </el-icon>
      <span>Element Plus Demo</span>
    </el-menu-item>
    <!-- svg-demo -->
    <el-menu-item index="/svg-demo">
      <el-icon>
        <Star/>
      </el-icon>
      <span>SVG  Demo</span>
    </el-menu-item>
    <!-- 404 -->
    <el-menu-item index="/404">
      <el-icon>
        <Star/>
      </el-icon>
      <span>404 页面</span>
    </el-menu-item>
    <!-- home -->
    <el-menu-item index="/home">
      <el-icon>
        <Star/>
      </el-icon>
      <span>home页面</span>
    </el-menu-item>
    <!-- login -->
    <el-menu-item index="/login">
      <el-icon>
        <Star/>
      </el-icon>
      <span>login页面</span>
    </el-menu-item>
    <!-- pinia-demo -->
    <el-menu-item index="/pinia-demo">
      <el-icon>
        <DataBoard/>
      </el-icon>
      <span>Pinia Demo</span>
    </el-menu-item>
    <!-- user-management -->
    <el-menu-item index="/user-management">
      <el-icon>
        <User/>
      </el-icon>
      <span>用户管理系统</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>