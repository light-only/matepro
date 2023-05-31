<template>
  <div class="content">
    <van-card
        v-for="item in props.userList"
        :key="item?.id"
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
</template>

<script setup lang="ts">

import {defineProps} from "vue";

const props = defineProps({
  userList:{
    type:Array,
    default:[]
  }
})
</script>

<style scoped>
.content {
  margin-bottom: 60px;
}
</style>
