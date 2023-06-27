<template>
    <form action="/">
        <van-search
            v-model="value"
            show-action
            placeholder="请输入搜索关键词"
            @search="onSearch"
            @cancel="onCancel"
        />
    </form>
    <team-card v-if="teamList.length>0" :teamList="teamList"></team-card>
    <van-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import {ref} from 'vue';
import router from '../router';
import teamCard from '@/components/teamCard/index.vue'
import {onMounted} from "vue";
import {getTeamCreate} from "../api/team";
import {showFailToast,showToast} from "vant";
import { reactive } from 'vue';
import {useStore} from "../store";
import {getLoginUser} from "../services/user";

const store = useStore();
const teamList = ref([]);
const value = ref('');

//定义队伍列表的请求参数
const queryParams = reactive({
    pageNum:1,
    pageSize:10,
    name:undefined,
    userId:undefined
});

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
onMounted(()=>{
    getList();
})

/**
 * @description:获取队伍列表数据
 */
const getList = ()=>{
    //获取队伍列表接口数据
    getTeamCreate(queryParams).then(res=>{
        if(res.code === 0){
            teamList.value = res.data;
        }else {
            showFailToast('请求失败，请重试')
        }
    })
}
</script>

<style scoped>
</style>
