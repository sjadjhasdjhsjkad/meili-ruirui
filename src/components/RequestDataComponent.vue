<template>
  <div>
    <div>请求数据展示 Request data</div>
    <div>{{ respData }}</div>
  </div>
</template>

<script lang="ts" setup>
// 导入 Vue 3 的 ref 函数，用于创建响应式数据
import {ref} from 'vue'
import {onMounted} from "vue";
import request from "@/utils/request.ts";
import {ElMessage} from "element-plus";

const respData = ref("还没请求呢")

onMounted(() => {
  request.get("/api/list").then((res) => {
    console.log(res)
    ElMessage({
      type: "success",
      message: res.data
    })

    respData.value = res.data
  }).catch((err: Error) => {
    ElMessage({
      type: "error",
      message: "hahahahahah" + err
    })
  })
})
</script>

<style scoped>


</style>