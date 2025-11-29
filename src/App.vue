<template>
  <div class="app-container">
    <!-- 测试tailwindcss 样式组件 -->
    <TitleDemoComponent></TitleDemoComponent>

    <!-- 导航菜单 -->
    <MainViewMenuComponent></MainViewMenuComponent>

    <!-- 路由视图 -->
    <router-view/>

    <!-- 原有的组件（用于向后兼容） -->
    <SwitchRouterViewComponent></SwitchRouterViewComponent>

    <!-- 网络请求数据组件 -->
    <RequestDataComponent></RequestDataComponent>
  </div>
</template>

<script lang="ts" setup>
import MainViewMenuComponent from "@/components/MainViewMenuComponent.vue";
import SwitchRouterViewComponent from "@/components/SwitchRouterViewComponent.vue";
import RequestDataComponent from "@/components/RequestDataComponent.vue";
import TitleDemoComponent from "@/components/TitleDemoComponent.vue";
</script>

<style lang="scss" scoped>
.app-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
