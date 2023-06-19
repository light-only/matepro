<template>
    <div class="content">
        <van-card
            v-for="item in props.teamList"
            :key="item?.id"
            :desc="item?.description"
            :title="item?.name"
        >
            <template #tags>
                <van-tag  plain type="primary">{{teamStatusEnum[item.status]}}</van-tag>
            </template>
            <template #bottom>
                <div>
                    {{ '最大人数: ' + item.maxNum }}
                </div>
                <div v-if="item.expireTime">
                    {{ '过期时间: ' + moment(item.expireTime).format("YYYY-MM-DD") }}
                </div>
                <div>
                    {{ '创建时间: ' + moment(item.createTime).format("YYYY-MM-DD") }}
                </div>
            </template>
            <template #footer>
                <van-button size="mini" @click="joinTeam(item)">加入队伍</van-button>
                <van-button size="mini" @click="doUpdateTeam(item)">更新队伍</van-button>
            </template>
        </van-card>
    </div>
</template>

<script setup lang="ts">

import {defineProps} from "vue";
import {teamStatusEnum} from "@/constants/team";
import moment from 'moment'
import {joinTeams,updateTeam} from "@/api/team";
import { showFailToast, showSuccessToast } from "vant";
import { useRouter } from "vue-router";
const router = useRouter();
const props = defineProps({
    teamList:{
        type:Array,
        default:[]
    }
});
/**
 * @description:加入队伍
 */
const joinTeam = (val:any)=>{
    const {password,id,status} = val;
    let  postData;
    if(status === 3){
         postData = {
            teamId:id,
            password
        }
    }else {
        postData = {
            teamId: id
        }
    }
    joinTeams(postData).then(res=>{
        if(res.code === 0){
            showSuccessToast("加入成功");
        }else {
            showFailToast(res.description);
        }
    })
}
/**
 * @description:更新队伍
 * @param val 
 */
const doUpdateTeam = (val:any)=>{
    console.log(val,'val0000');
    router.push({path:'/team/update',query:{id:val.id}});
}
</script>

<style scoped>
.content {
    margin-bottom: 60px;
}
</style>
