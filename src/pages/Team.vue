<template>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
        <van-tabs v-model:active="active" @change="handleChange">
            <van-tab title="公开" name="public"></van-tab>
            <van-tab title="加密" name="private"></van-tab>
        </van-tabs>
    </form>
    <div class="add-team">
        <van-button type="primary" icon="plus" @click="toAddTeam" class="add-button"></van-button>
    </div>
    <team-card v-if="teamList.length>0" @refreshList="getList" :teamList="teamList"></team-card>
    <van-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import {ref} from 'vue';
import router from '../router';
import teamCard from '@/components/teamCard/index.vue'
import {onMounted} from "vue";
import {getTeamList} from "../api/team";
import {showFailToast,showToast} from "vant";
import { reactive } from 'vue';

const teamList = ref([]);
const value = ref('');

const active = ref();

//定义队伍列表的请求参数
const queryParams = reactive({
    pageNum:1,
    pageSize:10,
    name:undefined
});

/**
 * @description:切换队伍状态
 * @param name 状态
 */
const handleChange = (name)=>{
    if(name === 'public'){
        queryParams.status = 0;
        getList(queryParams);
    }else {
        queryParams.status = 2;
        getList(queryParams);
    }
}

/**
 * @description:查询队伍
 * @param val
 */
const onSearch = (val:any) => {
    queryParams.name = val;
    getList(queryParams);
}

/**
 * @description:取消查询队伍
 */
const onCancel = () => {
    //重置页码和name
    queryParams.pageNum = 1;
    queryParams.name = undefined;
    getList(queryParams);
}
/**
 * 点击跳转新增队伍页面
 */
const toAddTeam = ()=>{
  router.push('/team/add');
}
/**
 * @description:获取队伍列表数据
 */
const getList = ()=>{
    //获取队伍列表接口数据
    getTeamList(queryParams).then(res=>{
        if(res.code === 0){
            teamList.value = res.data;
        }else {
            showFailToast('请求失败，请重试')
        }
    })
}
</script>

<style scoped>
    .add-team {
        margin: 20px;
    }
</style>
