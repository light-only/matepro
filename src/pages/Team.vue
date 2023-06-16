<template>
  <van-button type="primary" @click="toAddTeam">主要按钮</van-button>
    <team-card :teamList="teamList"></team-card>
</template>

<script setup lang="ts">
import {ref} from 'vue';
import router from '../router';
import teamCard from '@/components/teamCard/index.vue'
import {onMounted} from "vue";
import {getTeamList} from "../api/team";
import {showFailToast, showSuccessToast} from "vant";

const teamList = ref([]);
/**
 * 点击跳转新增队伍页面
 */
const toAddTeam = ()=>{
  router.push('/team/add');
}
onMounted(()=>{
    //获取队伍列表接口数据
    getTeamList({pageSize:10,pageNum:1}).then(res=>{
        console.log(res,'+++')
        if(res.code === 0){
            teamList.value = res.data.records;
        }else {
            showFailToast('请求失败，请重试')
        }
    })
})
</script>

<style>
</style>
