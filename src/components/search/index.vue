<template>
  <form action="/">
    <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
    />
  </form>

  <van-divider content-position="left">已选标签</van-divider>
  <div class="tag-flex">
    <van-tag style="margin: 5px"  v-for="(item,index) in activeIds" :key="index" closeable size="large" type="primary" @close="close(index)">
      {{ item }}
    </van-tag>
  </div>


  <van-divider content-position="right">选择标签</van-divider>
  <van-tree-select
      v-model:active-id="activeIds"
      v-model:main-active-index="activeIndex"
      :items="realTags"
  />
  <div style="margin: 20px">
    <van-button style="width: 100%;" type="primary">查询</van-button>
  </div>


</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';

const value = ref('');
const onSearch = (val) => {
  console.log(realTags.value.flatMap(item=>item.children));
  realTags.value = realTags.value.map(item=>{
    const tempChildren = [...item.children];
    const tempParent = {...item};
    tempParent.children = tempChildren.filter(it=>it.text.includes(val));
    return tempParent;
  })
};
onMounted(()=>{
  realTags.value = originTag;
})
const onCancel = () => {
  value.value = '';
  realTags.value = originTag;
};
const show = ref(true);

const activeIds = ref([]);
const realTags = ref([]);
const activeIndex = ref(0);
const originTag = [
  {
    text: '性别',
    children: [
      { text: '男', id: '男' },
      { text: '女', id: '女' },
    ],
  },
  {
    text: '学历',
    children: [
      { text: '本科', id: '本科' },
      { text: '硕士', id: '硕士' },
      { text: '博士', id: '博士' },
    ],
  },
  {
    text: '专业',
    children: [
      { text: 'java', id: 'java' },
      { text: 'python', id: 'python' },
      { text: 'js', id: 'js' },
      { text: 'c++', id: 'c++' },
    ],
  },
];

/**
 * 关闭标签
 */
const close = (index) => {
  activeIds.value = activeIds.value.filter((item,idx)=> idx !== index);
};
</script>

<style scoped>
.tag-flex {
  padding: 0 10px;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
</style>
