<script lang="ts" setup>

import {Connection, House, Star} from "@element-plus/icons-vue";
</script>

<template>
  <el-menu
      :default-active="$route.path"
      mode="horizontal"
      router
      style="margin: 20px 0;">
    <el-menu-item index="/">
      <el-icon>
        <House/>
      </el-icon>
      <span>首页</span>
    </el-menu-item>
    <el-menu-item index="/axios-demo">
      <el-icon>
        <Connection/>
      </el-icon>
      <span>Axios Demo</span>
    </el-menu-item>
    <el-menu-item index="/element-demo">
      <el-icon>
        <Star/>
      </el-icon>
      <span>Element Plus Demo</span>
    </el-menu-item>
  </el-menu>
</template>

<style scoped>

</style>