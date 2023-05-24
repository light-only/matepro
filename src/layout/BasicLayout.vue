<template>
  <van-nav-bar title="标题" @click-left="onClickLeft" left-arrow>
    <template #right>
      <van-icon name="search" size="18" @click="searchTeam"/>
    </template>
  </van-nav-bar>
  <div id="content">
   <router-view/>
  </div>
  <van-tabbar v-model="active" @change="onChange" v-if="isShow">
    <van-tabbar-item icon="home-o" name="index">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user">个人信息</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref, watch} from 'vue';
import router from "../router";
import {useRoute} from "vue-router";
const route = useRoute();
const active = ref(0);
/**
 * 标签栏触发事件
 * @param index
 */
const onChange = (index) => {
  router.push(index);
}
/**
 * 搜索队伍
 */
const searchTeam = ()=>{
  router.push('/search')
}

const onClickLeft = ()=>{
  history.back();
}

const isShow = ref(true);
const navList = ['/index','/team','/user']
watch(() => route.path,newRoute=> {
  console.log(newRoute,'newRoute');
  if(navList.includes(newRoute)){
    isShow.value = true;
  }else {
    isShow.value = false;
  }
})
</script>

<style scoped>

</style>
