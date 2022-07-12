<template>
    <div @tap="$Router.back(1)">点我返回</div>
</template>

<script setup>
import { ref, reactive, onMounted, getCurrentInstance } from "vue";
import { onLoad } from "@dcloudio/uni-app";

const { proxy } = getCurrentInstance();

console.log(proxy)

// console.log(getCurrentInstance().attrs, "----------");

onLoad((options) => {
    console.log("接收传值：", options);
});
</script>

<style lang="scss" scoped></style>
