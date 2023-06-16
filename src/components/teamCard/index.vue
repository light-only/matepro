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
            </template>
        </van-card>
    </div>
</template>

<script setup lang="ts">

import {defineProps} from "vue";
import {teamStatusEnum} from "@/constants/team";
import moment from 'moment'
import {joinTeams} from "@/api/team";
const props = defineProps({
    teamList:{
        type:Array,
        default:[]
    }
});
/**
 * @description:加入队伍
 */
const joinTeam = (val)=>{
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
        console.log(res,'res----')
    })
}
</script>

<style scoped>
.content {
    margin-bottom: 60px;
}
</style>
