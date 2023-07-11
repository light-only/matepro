<template>
    <div style="background-color: lightblue;width: 100vw;height: 100vh">
        <div class="login-content">
            <div class="login-title">
                <img src="../assets/vue.svg" alt="">
                <div>注册页面</div>
            </div>
            <van-form @submit="onSubmit">
                <van-cell-group inset>
                    <van-field
                        v-model="userAccount"
                        name="userAccount"
                        label="用户名"
                        placeholder="用户名"
                        :rules="[{ required: true, message: '请填写用户名' }]"
                    />
                    <van-field
                        v-model="userPassword"
                        type="password"
                        name="userPassword"
                        label="密码"
                        placeholder="密码"
                        :rules="[{ required: true, message: '请填写密码' }]"
                    />
                    <van-field
                        v-model="checkPassword"
                        type="password"
                        name="checkPassword"
                        label="重复密码"
                        placeholder="重复密码"
                        :rules="[{ required: true, message: '请重复上述密码' }]"
                    />
                    <van-field
                        v-model="planetCode"
                        type="number"
                        name="planetCode"
                        label="星球码"
                        placeholder="星球码"
                        :rules="[{ required: true, message: '请输入星球码' }]"
                    />
                </van-cell-group>
                <div class="register-button" @click="handleLogin">已有账号？点击去登录</div>
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
import {userRegister} from "../api";
import router from "../router";
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');
const planetCode = ref('');
import { useUsersStore } from "@/store/index.ts";
import {storeToRefs} from "pinia";
import {setCurrentUserState} from "../states/user";
import {showSuccessToast} from "vant";

/**
 * @description:点击跳转登录页面
 */
const handleLogin = ()=>{
    router.replace('/login');
}

/**
 * @description:注册提交
 * @param values
 */
const onSubmit = (values) => {
    //调取注册接口
    userRegister(values).then(res=>{
        if(res.code === 0){
            showSuccessToast("注册账号成功");
            router.replace('/login');
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
