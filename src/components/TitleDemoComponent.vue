<template>
  <div>
    <h1 class="bg-amber-300 p-3 font-bold">APP根组件</h1>
    <h2 class="font-medium font-mono">SB-RUIRUI - FOR V2</h2>
    <h1 class="font-mono p-3 bg-cyan-100">
      русский язык, российсий продукт, Китайская локистика
      предприятель преподователь </h1>
  </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
h2 {
  //color: $text-color;
  padding: $padding-base;
  background: $primary-color;
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
  #646clean 是颜色值，最后两位 aa 表示透明度
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