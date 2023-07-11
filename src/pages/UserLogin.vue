<template>
  <div style="background-color: lightblue;width: 100vw;height: 100vh">
    <div class="login-content">
      <div class="login-title">
        <img src="../assets/vue.svg" alt="">
        <div>登录页面</div>
      </div>
      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="userAccount"
              name="用户名"
              label="用户名"
              placeholder="用户名"
              :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
              v-model="userPassword"
              type="password"
              name="密码"
              label="密码"
              placeholder="密码"
              :rules="[{ required: true, message: '请填写密码' }]"
          />
        </van-cell-group>
          <div class="register-button" @click="handleRegister">还没有账号？点击去注册</div>
        <div style="margin: 16px;">
          <van-button round block type="primary" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
    </div>
  </div>


</template>

<script setup lang="ts">
import {ref} from 'vue'
import {userLogin} from "../api";
import router from "../router";
const userAccount = ref('');
const userPassword = ref('');
import { useUsersStore } from "@/store/index.ts";
import {storeToRefs} from "pinia";
import {setCurrentUserState} from "../states/user";

/**
 * @description:跳转注册页面
 */
const handleRegister = ()=>{
    router.replace('/register');
}

/**
 * @description:表单提交
 * @param values
 */
const onSubmit = (values) => {
  //调取登录接口
  userLogin({userAccount:userAccount.value,userPassword:userPassword.value}).then(res=>{
    if(res.code === 0){
        const store = useUsersStore();
        const {user} = storeToRefs(store);
        store.user = res.data;
        setCurrentUserState(JSON.stringify(res.data));
        router.replace('/index');
    }
  })
};
</script>

<style scoped>
  .login-content {
    width: 100vw;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .login-title {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 10px;
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    font-family: "Microsoft Himalaya";

  }
  .login-title img {
    height: 20px;
    padding-right: 5px;
  }
  .register-button {
      text-align: right;
      margin: 10px 20px 0 0;
      color: blue;
      font-size: 14px;
  }
</style>
