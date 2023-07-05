<template>
    <van-notice-bar
        left-icon="volume-o"
        text="本软件只有基本的功能，暂时不能满足使用需要，仅供参考。"
    />
    <van-cell center title="心动模式" >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
            <van-switch v-model="isMatchModel" @change="handleChange" size="24"/>
        </template>
    </van-cell>

    <user-card v-if="userList.length>0" :userList="userList" :loading="loading"></user-card>
    <van-back-top v-if="userList.length>0" />
    <van-empty v-else description="暂无数据" />
</template>

<script setup lang="ts">
import { NoticeBar } from 'vant';
import { BackTop } from 'vant';
import {onMounted, reactive, ref, watch} from "vue";
import {getMayLikeUser, getRecommendUser} from "../api";
import {showFailToast} from "vant";
//存放用户列表
const userList = ref([]);
//心动状态是否开启
const isMatchModel = ref<boolean>(false);

const queryParams = reactive({
    pageNum:1,
    pageSize:10,
    num:undefined
})

const loading = ref(true);
const scrollHeight = ref(0);
onMounted(()=>{
    window.addEventListener('scroll',()=>{
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let targetHeight = document.documentElement.offsetHeight;
        let clientTargetHeight = document.documentElement.clientHeight;
        if(scrollTop + clientTargetHeight >targetHeight - 80){
            queryParams.pageNum +=1;
            getDate(queryParams);
        }
    })
    getDate();
})
/**
 * @description:获取列表用户数据
 */
const getDate = ()=>{
    if(isMatchModel.value){
        loading.value = true;
        //num:心动模式下的用户数
        queryParams.num = 10;
        //获取心动模式下的用户
        getMayLikeUser(queryParams).then(res=>{
            userList.value = res.data;
            loading.value = false;
        })
    }else {
        //获取全部用户
        getRecommendUser(queryParams).then(res=>{
            if(res.code === 0){
                userList.value = userList.value.concat(res.data?.records);
                loading.value = false;
            }else {
                showFailToast('请求失败，请重试！');
            }
        })
    }
}
/**
 * @description:心动模式开关控制
 */
const handleChange = ()=>{
    getDate();
}

</script>

<style>
.van-back-top {
    right: 4px!important;
    bottom:80px!important;
}
</style>
