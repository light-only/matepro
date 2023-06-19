<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="addTeamData.name" name="name" label="队伍名" placeholder="请输入队伍名"
                :rules="[{ required: true, message: '队伍名不能为空' }]" />
            <van-field v-model="addTeamData.description" type="textarea" name="description" label="队伍描述" placeholder="请输入队伍描述" />
            <van-field
                v-model="addTeamData.expireTime"
                is-link
                readonly
                name="expireTime"
                label="时间选择"
                placeholder="点击选择时间"
                @click="showPicker = true"

            />
            <van-popup v-model:show="showPicker" position="bottom">
                <van-date-picker @confirm="onConfirm" :min-date="minDate" @cancel="showPicker = false" />
            </van-popup>

            <van-field name="maxNum" label="最大人数">
                <template #input>
                    <van-stepper v-model="addTeamData.maxNum" min="3"/>
                </template>
            </van-field>

            <van-field name="status" label="队伍状态">
                <template #input>
                    <van-radio-group v-model="addTeamData.status" direction="horizontal">
                        <van-radio name="0">公开</van-radio>
                        <van-radio name="1">私有</van-radio>
                        <van-radio name="2">加密</van-radio>
                    </van-radio-group>
                </template>
            </van-field>
            <van-field
                v-if="addTeamData.status == 2"
                name="password"
                label="密码"
                v-model="addTeamData.password"
                type="password"
                placeholder="请输入密码"
                :rules="[{required: true,message:'请填写密码'}]"
            />

        </van-cell-group>
        <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
                提交
            </van-button>
        </div>
    </van-form>
</template>

<script setup lang="ts">
import {ref} from 'vue'
import {DatePicker, showFailToast, showSuccessToast} from 'vant';
import {createTeam,getTeamDetail,updateTeam} from "@/api/team";
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import moment from 'moment';
const route = useRoute();
const router = useRouter();

const initFormData = {
    "name":"",
    "description":"",
    "expireTime":null,
    "maxNum":"",
    "password":"",
    "status":0
}
// 展示日期选择器
const showPicker = ref(false);
const minDate = new Date();
//需要用户填写的表单数据
const addTeamData = ref({...initFormData});

//获取路由的id
const {id} = route.query;

onMounted(()=>{
    //发送请求获取队伍详情
    getTeamDetail(id).then(res=>{
        if(res.code === 0){
            console.log(res,'res---');
            addTeamData.value = res.data;
            addTeamData.value.status = res.data.status.toString();
            addTeamData.value.expireTime = moment(res.data.expireTime).format("YYYY-MM-DD");
        }
    })
})
const onSubmit = (values:any) => {
    console.log(values,'values++');
    //处理参数，转换队伍状态为数字
    const postData = {
        ...addTeamData.value,
        status:Number(addTeamData.value.status)
    }
    //判断是否有userId,如果有就是编辑，否则就是新增
    if(addTeamData.value.userId){
        //调取更新接口
        updateTeam(postData).then(res=>{
            if(res.code === 0){
                showSuccessToast('更新成功');
                router.push('/team');
            }else {
                showFailToast(res.description);
            }
        })
    }else {
         //创建队伍接口
        createTeam(postData).then(res=>{
            if(res.code ===0){
                showSuccessToast('创建成功');
                router.push('/team');
            }else {
                showFailToast(res.description);
            }
        })
    }
   
};
/**
 * @description:处理选择器时间格式
 * @param selectedValues
 */
const onConfirm = ({ selectedValues}:any) => {
    addTeamData.value.expireTime = selectedValues.join('-');
    showPicker.value = false;
};

</script>

<style>

</style>
