<template>
  index文件
</template>

<script setup lang="ts">
import {useStore} from "../store";

const state = useStore();

console.log(state.user,'state++')
</script>

<style>
</style>
