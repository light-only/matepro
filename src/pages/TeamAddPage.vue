<template>
    <van-form @submit="onSubmit">
        <van-cell-group inset>
            <van-field v-model="addTeamData.name" name="name" label="队伍名" placeholder="请输入队伍名"
                :rules="[{ required: true, message: '队伍名不能为空' }]" />
            <van-field v-model="addTeamData.description" type="textarea" name="description" label="队伍描述" placeholder="请输入队伍描述" />
            <van-field
            is-link
            readonly
            name="datetimePicker"
            label="过期时间"
            :placeholder="addTeamData.expireTime ?? '点击选择过期时间'"
            @click="showPicker = true"
        />
        <van-popup v-model:show="showPicker" position="bottom">
          <van-datetime-picker
              v-model="addTeamData.expireTime"
              @confirm="showPicker = false"
              type="datetime"
              title="请选择过期时间"
              :min-date="minDate"
          />
          </van-popup>
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
const onSubmit = (values:any) => {
    console.log('submit', values);
};

</script>
  
<style></style>
  