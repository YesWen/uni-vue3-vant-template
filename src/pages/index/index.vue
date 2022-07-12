<template>
    <div class="page bg-[#000]">
        <w-navbar :background="{ backgroundColor: '#f4f4f4' }" backText="返回">
            <template #content>
                <div class="w-full u-font-30 flex items-center justify-center">订单支付</div>
            </template>
        </w-navbar>
        <div class="bg-[red] w-[100rpx] h-[200rpx]"></div>
        <div class="w-[80rpx]"></div>
        <van-button @click="$Router.push('/pages/to/index')" type="primary">主要按钮</van-button>
        <div class="mt-[300rpx] m-w-[300rpx]"></div>
        <div>{{ $IMG_URL }}</div>
        {{ store.getters.token }}
        {{ show }}
        123
    </div>
</template>

<script setup>
import { Button } from "vant";
import { ref, reactive, onMounted, toRefs, getCurrentInstance, computed, watchEffect, watch } from "vue";
import { onShow, onReachBottom } from "@dcloudio/uni-app";
import { useStore } from "vuex";

const store = useStore();
console.log(store.getters.token, "------store");
// uni.$u.toast("-------");
const state = reactive({ show: false });

let list = ref([
    "https://cdn.uviewui.com/uview/swiper/swiper1.png",
    "https://cdn.uviewui.com/uview/swiper/swiper2.png",
    "https://cdn.uviewui.com/uview/swiper/swiper3.png",
]);

onReachBottom(() => {
    console.log("----啦啦-----");
});

const { proxy } = getCurrentInstance();

//立即执行
// watchEffect(() => {
//     console.log(state.show);
// });

// watch(
//     () => state.show,
//     (v) => {
//         console.log(v);
//     }
// );

let fooRef = ref("1s");
let barRef = ref("2s");
// 监听多个
watch([fooRef, barRef], ([foo, bar], [prevFoo, prevBar]) => {
    console.log(foo);
    console.log(bar);
});

const query = async () => {
    let res = await proxy.$http("common.login", { code: "1234", phone: "18894017224", distributor: " " });
};

onShow(() => {});
onMounted(() => {});

const showPopup = () => {
    state.show = !state.show;
};

//抛出页面使用
const { show } = toRefs(state);
</script>

<style lang="scss" scoped>
.page {
    width: 100%;
    height: 100vh;
}
</style>
