<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="editUser.editValue"
          :label="editUser.editName"
          :placeholder="'请输入' + editUser.editName"
          :rules="[{ required: true, message: `请输入${editUser.editName}` }]"
      >
        <template #input  v-if="editUser.editKey === 'avatarUrl'">
          <van-uploader v-model="avatarArray" max-count="1"/>
        </template>
        <template #input v-if="editUser.editKey === 'gender'">
          <van-radio-group v-model="editUser.editValue" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {useRoute} from "vue-router";
import {updateUser} from "../api";
import {getLoginUser} from "../services/user";
import {showFailToast, showSuccessToast} from "vant";
import router from "../router";
import {setCurrentUserState} from "../states/user";
const route = useRoute();
onMounted(()=>{
  if(editUser.value.editKey === 'avatarUrl'){
    avatarArray.value.push({url:editUser.value.editValue})
  }
})
const avatarArray = ref([]);
const editUser = ref({
  editKey:route.query.editKey,
  editValue:route.query.editValue,
  editName:route.query.name
});
/**
 * 提交表单
 * @param values 表单项数据
 */
const onSubmit = async (values) => {
  const currentUser = await getLoginUser();
  updateUser({id:currentUser.id,[editUser.value.editKey]:editUser.value.editValue}).then(res=>{
    if(res.code === 0){
      showSuccessToast('修改成功');
      router.replace('/user');
    }else {
      showFailToast('修改失败，请重试');
    }
  })
};
</script>

<style>
</style>
