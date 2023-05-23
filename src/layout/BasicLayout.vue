<template>
  <van-nav-bar title="标题" left-text="返回" left-arrow>
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
    <template v-if="active==='index'">
      <Index/>
    </template>
    <template v-if="active==='team'">
      <Team/>
    </template>
    <template v-if="active==='user'">
      <User/>
    </template>
  </div>
  <van-tabbar v-model="active" @change="onChange">
    <van-tabbar-item icon="home-o" name="index">首页</van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="team">队伍</van-tabbar-item>
    <van-tabbar-item icon="user-o" name="user">个人信息</van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import Index from '../pages/Index.vue'
import Team from '../pages/Team.vue'
import User from '../pages/User.vue'
import {showToast, Tabbar, TabbarItem} from 'vant';

const active = ref(0);
const onChange = (index) => showToast(`标签 ${index}`);
</script>

<style scoped>

</style>
