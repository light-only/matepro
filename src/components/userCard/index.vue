<template>
    <van-skeleton title avatar :row="3" :loading="props.loading" v-for="item in props.userList" :key="item?.id">
    <div class="content">
    <van-card
        :desc="item?.profile"
        :title="item?.userName"
        :thumb="item?.avatarUrl"
    >
      <template #tags v-if="item.tags">
        <van-tag v-for="(it,index) in JSON.parse(item?.tags)" :key="index" plain type="primary">{{it}}</van-tag>
      </template>
      <template #footer>
        <van-button size="mini">联系我</van-button>
      </template>
    </van-card>
  </div>
</van-skeleton>
</template>

<script setup lang="ts">

import {defineProps,withDefaults} from "vue";
import {UserType} from "../../models/user";
interface UserCardListProps {
    loading:boolean,
    userList:UserType[]
}

const props = withDefaults<UserCardListProps>(defineProps<UserCardListProps>(),{
    userList:[] as UserType[],
    loading:true
})
</script>

<style scoped>
.content {
  margin-bottom: 10px;
}
</style>
