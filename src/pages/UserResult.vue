<template>
  <user-card v-if="userList.length>0" :userList="userList" :loading="loading"></user-card>
    <van-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getSearchUserByTags} from "../api";
import {showFailToast} from "vant";
const route = useRoute();
const userList = ref([]);

const {tags} = route.query;
const loading = ref(true);

onMounted(()=>{
   getList();
})

const getList = ()=>{
    loading.value = true;
    getSearchUserByTags(tags).then(res=>{
        if(res.code == 0){
            userList.value = res.data;
            loading.value = false;
        }else {
            showFailToast('获取数据失败，请重试');
        }

    })
}

const mockUser = {
  id:123,
  userAccount:'admin',
  userName:'张三',
  avatarUrl:'https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg',
  gender:0,
  phone:13949533280,
  email:'1480418586@qq.com',
  userStatus:0,
  userRole:1,
  planetCode:12,
  tags:["男","java"],
  createTime:'2023-05-26',
  profiles:'福津大街房贷卡就飞快的加咖啡接口对接AFK就飞快的',
}
</script>

<style>
</style>
