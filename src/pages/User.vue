<template>
  <van-cell-group>
    <van-cell title="昵称" :value="user.userName" @click="toEdit('userName','昵称',user.userName)" to="/edit" is-link/>
    <van-cell title="账号" is-link :value="user.userAccount" @click="toEdit('userAccount','账号',user.userAccount)"  />
    <van-cell title="头像" is-link @click="toEdit('avatarUrl','头像',user.avatarUrl)">
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #value>
        <van-image
            width="50"
            height="50"
            :src="user.avatarUrl"
        />
      </template>
    </van-cell>
    <van-cell title="性别" is-link @click="toEdit('gender','性别',user.gender)">
      <template #value>
        {{ user.gender == 0 ? '男' : '女' }}
      </template>

    </van-cell>
    <van-cell title="电话" :value="user.phone" is-link @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" :value="user.email" is-link @click="toEdit('email','邮箱',user.email)"/>
    <van-cell title="星球编号" :value="user.planetCode" />
    <van-cell title="注册时间" :value="moment(user.createTime).format('YYYY-MM-DD HH:mm')" />
    <van-cell title="我创建的队伍"  is-link  to="/user/team/create"/>
    <van-cell title="我加入的队伍"  is-link to="/user/team/join"/>
  </van-cell-group>
    <div style="margin: 20px" v-if="user">
        <van-button style="width: 100%" type="default" @click="layout">退出登录</van-button>
    </div>

</template>

<script setup lang="ts">

import router from "../router";
import {onMounted, ref} from "vue";
import moment from 'moment'
import {getLoginUser} from "../services/user";
import {layoutUser} from "../api";
import {showFailToast, showSuccessToast} from "vant";
import {setCurrentUserState} from "../states/user";

const user = ref({});
onMounted(async ()=>{
  user.value = await getLoginUser();
})
/**
 * 编辑用户信息
 * @param editKey
 * @param name
 * @param editValue
 */
const toEdit = (editKey:string,name:string,editValue:string,)=>{
  router.push({
    path:'/edit',
    query:{
      editKey,
      name,
      editValue,
    }
  })
}

/**
 * @description:退出登录
 */
const layout = ()=>{
    //调用退出接口
    layoutUser().then(res=>{
        if(res.code === 0){
            showSuccessToast("退出成功");
            router.replace('/login');
            setCurrentUserState(null);
        }else {
            showFailToast("退出失败，请重试！")
        }
    })
}
</script>

<style scoped>

.van-cell {
  align-items: center;
}
</style>
