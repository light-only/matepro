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
                    {{ '队伍人数: ' + item.hasJoinNum +'/' + item.maxNum }}
                </div>
                <div v-if="item.expireTime">
                    {{ '过期时间: ' + moment(item.expireTime).format("YYYY-MM-DD") }}
                </div>
                <div>
                    {{ '创建时间: ' + moment(item.createTime).format("YYYY-MM-DD") }}
                </div>
            </template>
            <template #footer>
                <van-button size="mini" v-if="currentUser?.id !== item.userId && !item.hasJoin" @click="joinTeam(item)">加入队伍</van-button>
                <van-button v-if="currentUser?.id === item.userId" size="mini" @click="doUpdateTeam(item)">更新队伍</van-button>
                <van-button v-if="item.userId !== currentUser?.id && item.hasJoin == true"  size="mini" @click="doQuitTeam(item)">退出队伍</van-button>
                <van-button type="danger" v-if="currentUser?.id === item.userId" size="mini" @click="doCloseTeam(item)">解散队伍</van-button>
            </template>
        </van-card>
    </div>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
        <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>

</template>

<script setup lang="ts">

import {defineEmits, defineProps, onMounted, ref} from "vue";
import {teamStatusEnum} from "@/constants/team";
import moment from 'moment'
import {joinTeams,updateTeam,quitTeam, releaseTeam} from "@/api/team";
import {showDialog, showFailToast, showSuccessToast} from "vant";
import { useRouter } from "vue-router";
import {getLoginUser} from "../../services/user";
const router = useRouter();
const currentUser = ref();
const showPasswordDialog = ref(false);
const password = ref('');
const teamId = ref(0);
const emit = defineEmits(['refreshList']);
const props = defineProps({
    teamList:{
        type:Array,
        default:[]
    }
});
onMounted(async ()=>{
    currentUser.value = await  getLoginUser();
})

/**
 * @description:加密队伍确认密码
 */
const doJoinTeam = ()=>{
    let obj = {
        password:password.value,
        teamId:teamId.value
    }
    join(obj);
}
/**
 * @description:加密队伍取消确认密码
 */
const doJoinCancel = ()=>{
    showPasswordDialog.value = false;
    password.value = "";
}
/**
 * @description:加入队伍
 */
const joinTeam = (val:any)=>{
    const {password,id,status} = val;
    teamId.value = id;
    let  postData;
    //status等于2 是加密队伍
    if(status === 2){
        showPasswordDialog.value = true;
    }else {
        postData = {
            teamId: id
        }
        join(postData);
    }

}
/**
 * @description:封装加入队伍接口
 * @param postData
 */
const join = (postData)=>{
    //调用加入队伍接口
    joinTeams(postData).then(res=>{
        if(res.code === 0){
            showSuccessToast("加入成功");
            emit('refreshList');
        }else {
            showFailToast(res.description?res.description:res.message);
        }
    })
}
/**
 * @description:更新队伍
 * @param val
 */
const doUpdateTeam = (val:any)=>{
    router.push({path:'/team/update',query:{id:val.id}});
}
/**
 * @description:退出队伍
 * @param val
 */
const doQuitTeam = (val:any)=>{
    //调用退出接口
    quitTeam(val.id).then(res=>{
        if(res.code === 0){
            showSuccessToast("退出成功");
            emit('refreshList');
        }else{
            showFailToast("退出失败");
        }
    })
}
/**
 * @description:解散队伍
 * @param val
 */
const doCloseTeam = (val:any)=>{
    //解散队伍接口
    releaseTeam(val.id).then(res=>{
        if(res.code === 0){
            showSuccessToast("成功解散队伍");
            emit('refreshList');
        }
    })
}
</script>

<style scoped>
.content {
    margin-bottom: 60px;
}
</style>
