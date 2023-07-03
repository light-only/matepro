<template>
    <van-cell center title="心动模式" >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
            <van-switch v-model="isMatchModel" @change="handleChange" size="24"/>
        </template>
    </van-cell>

    <user-card v-if="userList.length>0" :userList="userList" :loading="loading"></user-card>
    <van-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import {onMounted, ref} from "vue";
import {getMayLikeUser, getRecommendUser} from "../api";
import {showFailToast} from "vant";
//存放用户列表
const userList = ref([]);
//心动状态是否开启
const isMatchModel = ref<boolean>(false);

const loading = ref(true);

onMounted(()=>{
    getDate();
})


//获取列表用户数据
const getDate = ()=>{
    const getParams = {
        pageSize:10,
        pageNum:1,
        num:undefined
    }
    if(isMatchModel.value){
        loading.value = true;
        getParams.num = 10;
        //获取心动模式下的用户
        getMayLikeUser(getParams).then(res=>{
            userList.value = res.data;
            loading.value = false;
        })
    }else {
        //获取全部用户
        getRecommendUser(getParams).then(res=>{
            if(res.code === 0){
                userList.value = res.data?.records;
                loading.value = false;
            }else {
                showFailToast('请求失败，请重试！');
            }
        })
    }
}

const handleChange = ()=>{
    getDate();
}

</script>

<style>
</style>
