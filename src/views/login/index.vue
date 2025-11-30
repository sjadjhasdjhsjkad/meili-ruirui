<template>
  <div class="login-container">

    <el-row :gutter="20">
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login-from">
          <h1>神秘的召唤者啊</h1>
          <h2>欢迎降临 —— 王者荣耀</h2>
          <el-form-item>
            <el-input v-model="loginFrom.username" :prefix-icon="User"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="loginFrom.password" :prefix-icon="Lock" :show-password="true"
                      type="password"></el-input>
          </el-form-item>
          <!-- <el-form-item> -->
          <!--   <el-input v-model="loginFrom.username" :maxlength="100" :prefix-icon="Lock" -->
          <!--             :show-word-limit="true" :word-limit-position="'outside'" -->
          <!--             type="textarea"></el-input> -->
          <!-- </el-form-item> -->
          <el-form-item>
            <el-button class="login_bth" size="default" type="primary" @click="login">登录</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import {User, Lock} from "@element-plus/icons-vue";
import {reactive} from "vue";
// 收集账号与密码的数据
const loginFrom = reactive({username: "admin", password: "123456"});
// 登录按钮回调
const login = () => {
  console.log(123);
  //点击登录按钮以后干什么？
  //通知仓库发登录请求
  //请求成功->首页展示数据的地方
  //请求失败->弹出失败信息
}
</script>

<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100vh;
  background: url("@/assets/images/background.png") no-repeat;
  background-size: cover;

  .login-from {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login-form.png") no-repeat;
    background-size: cover;
    padding: 50px;


    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0;
    }

    .login_bth {
      width: 100%;
    }
  }
}
</style>