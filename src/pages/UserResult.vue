<template>
  <van-card
      v-for="item in userList"
      :key="item?.id"
      :desc="item?.profile"
      :title="item?.userName"
      :thumb="item?.avatarUrl"
  >
    <template #tags >
      <van-tag v-for="(it,index) in JSON.parse(item?.tags)" :key="index" plain type="primary">{{it}}</van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>

</template>

<script setup lang="ts">

import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import {getSearchUserByTags} from "../api";
import qs from 'qs';
import {showFailToast} from "vant";
const route = useRoute();
const userList = ref([]);

console.log(route.query,'query');
const {tags} = route.query;

onMounted(()=>{
  getSearchUserByTags(tags).then(res=>{
    if(res.code == 0){
      userList.value = res.data;
    }else {
      showFailToast('获取数据失败，请重试');
    }

  })
})

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
