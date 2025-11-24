<!--
  Vue 单文件组件的模板部分
  这里定义了组件的 HTML 结构
  当前是空的，可以添加 HTML 元素和其他 Vue 组件
-->
<template>
  <!-- 这里可以放置你的 HTML 内容和 Vue 组件 -->
  <h1>APP根组件</h1>
  <h2>SB-RUIRUI - FOR V2</h2>
</template>

<!--
  Vue 单文件组件的脚本部分
  lang="ts" 表示使用 TypeScript 语言
  setup 是 Vue 3 的 Composition API 语法糖
  这里可以定义组件的响应式数据、方法、计算属性等
-->
<script lang="ts" setup>

</script>


<!--
  Vue 单文件组件的样式部分
  scoped 表示这些样式只在当前组件内生效，不会影响其他组件
  这样可以避免样式污染和冲突
-->
<style scoped>
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
