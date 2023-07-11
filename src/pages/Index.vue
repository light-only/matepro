<template>
    <van-notice-bar
        left-icon="volume-o"
        text="心动模式下，可以筛选出跟自己标签最接近的用户。"
    />
    <van-cell center title="心动模式" >
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #right-icon>
            <van-switch v-model="isMatchModel" @change="handleChange" size="24"/>
        </template>
    </van-cell>

    <van-list
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <user-card v-if="userList.length>0" :userList="userList" :loading="loading"></user-card>
        <van-back-top v-if="userList.length>0" />
        <van-empty v-else description="暂无数据" />
    </van-list>



</template>

<script setup lang="ts">
import { NoticeBar } from 'vant';
import { BackTop } from 'vant';
import { onMounted, reactive, ref} from "vue";
import {getMayLikeUser, getRecommendUser} from "../api";
import {showFailToast} from "vant";
import {useRoute} from "vue-router";
const route = useRoute();
//存放用户列表
const userList = ref([]);
//心动状态是否开启
const isMatchModel = ref<boolean>(false);

const queryParams = reactive({
    pageNum:1,
    pageSize:10,
    num:undefined
});
const pages = ref(0);

const loading = ref(true);
const finished = ref(false);
onMounted(()=>{
    getDate();
})

const onLoad = () => {
    queryParams.pageNum +=1;
    // 异步更新数据
    getDate();
};
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
                pages.value = res.data.pages;
                userList.value = userList.value.concat(res.data?.records);
                loading.value = false;

                //加载状态结束
                if(queryParams.pageNum>pages.value){
                    finished.value = true;
                }
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
