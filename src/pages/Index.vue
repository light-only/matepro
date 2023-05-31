<template>
  <user-card :userList="userList"></user-card>
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getRecommendUser} from "../api";
import {showFailToast} from "vant";
const userList = ref([]);

onMounted(()=>{
  getRecommendUser().then(res=>{
    if(res.code === 0){
      userList.value = res.data?.records;
    }else {
      showFailToast('请求失败，请重试！');
    }
  })
})

</script>

<style>
</style>
