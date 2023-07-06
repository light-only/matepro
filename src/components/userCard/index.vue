<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="item in props.userList" :key="item?.id">
    <div class="content">
    <van-card
        :desc="item?.profile"
        :title="item?.userName"
        :thumb="item?.avatarUrl?item?.avatarUrl:DEFAULT_AVATAR"
    >
      <template #tags v-if="item.tags">
        <van-tag v-for="(it,index) in JSON.parse(item?.tags)" :key="index" plain type="primary">{{it}}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini" @click="handleClick">联系我</van-button>
      </template>
    </van-card>
  </div>
</van-skeleton>
</template>

<script setup lang="ts">
import { showDialog } from 'vant';
import {defineProps,withDefaults} from "vue";
import {UserType} from "../../models/user";
interface UserCardListProps {
    loading:boolean,
    userList:UserType[]
}
//默认头像
const DEFAULT_AVATAR = 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png';

//父级组件传递过来的数据
const props = withDefaults<UserCardListProps>(defineProps<UserCardListProps>(),{
    userList:[] as UserType[],
    loading:true
})
/**
 * 联系我
 */
const handleClick = ()=>{
    showDialog({
        message: '此功能暂未开发，有兴趣的话可以联系我的电话：15555555555',
    }).then(() => {
        // on close
    });
}
</script>

<style scoped>
.content {
  margin-bottom: 10px;
}
.van-tag--primary.van-tag--plain {
    margin: 2px 5px 2px 0;
}
</style>
