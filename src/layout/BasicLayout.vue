<template>
  <van-nav-bar title="标题"  v-if="isShowTitle">
    <template #left v-if="isShowArrow">
      <van-icon @click="onClickLeft" name="arrow-left" size="18"/>
    </template>

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
//控制title的显示
const isShowTitle = ref(true);
//控制底部导航栏的显示
const isShow = ref(true);
//控制左侧箭头显示
const isShowArrow = ref(false);
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

/**
 * 点击左侧返回按钮
 */
const onClickLeft = ()=>{
  console.log(111)
  history.back();
}

//底部导航栏的路由地址
const navList = ['/index','/team','/user'];

//不需要显示顶部导航栏的路由地址
const whiteList = ['/login','/register'];
watch(() => route.path,newRoute=> {
  //不显示底部顶部左侧返回按钮，显示底部导航栏
  if(navList.includes(newRoute)){
    isShow.value = true;
    isShowArrow.value = false;
  }else {
    //不显示底部导航栏，显示左侧返回按钮
    isShow.value = false;
    isShowArrow.value = true;
  }
  if(whiteList.includes(newRoute)){
    //不显示顶部导航
    isShowTitle.value = false;
  }else {
    isShowTitle.value = true;
  }
})
</script>

<style scoped>

</style>
