<template>
  <van-button type="primary" @click="toAddTeam">主要按钮</van-button>
</template>

<script setup lang="ts">
import router from '../router';


/**
 * 点击跳转新增队伍页面
 */
const toAddTeam = ()=>{
  router.push('/team/add');
}
</script>

<style>
</style>
