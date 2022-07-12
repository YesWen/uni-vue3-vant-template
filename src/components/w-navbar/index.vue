<template>
    <view class="cu-custom" :style="[{ height: customBar + 'px' }]">
        <view class="cu-bar fixed flex justify-between" :style="[style]">
            <view class="action flex" @tap="goBack" v-if="isBack">
                <!-- <u-icon v-if="backIcon" name="arrow-left" color="#333" size="45rpx" style="margin-right: 10rpx;"></u-icon> -->
                <view class="u-back-text truncate" v-if="backText" :style="[backTextStyle]">{{ backText || "" }}</view>
            </view>
            <view class="content" :style="[{ top: statusBarHeight + 'px' }]"><slot name="content"></slot></view>
            <slot name="right"></slot>
        </view>
    </view>
</template>

<script setup>
import { reactive, toRefs, computed } from "vue";
// 获取系统状态栏的高度
let systemInfo = uni.getSystemInfoSync();
let menuButtonInfo = {};
// #ifdef MP-WEIXIN || MP-BAIDU || MP-TOUTIAO || MP-QQ
menuButtonInfo = uni.getMenuButtonBoundingClientRect();
// #endif

const props = defineProps({
    isBack: {
        type: Boolean,
        default: true,
    },
    backIcon: {
        type: Boolean,
        default: true,
    },
    background: {
        type: Object,
        default() {
            return {
                background: "#ffffff",
            };
        },
    },
    // 返回箭头的颜色
    backIconColor: {
        type: String,
        default: "#606266",
    },
    // 左边返回的图标
    backIconName: {
        type: String,
        default: "arrow-left",
    },
    // 左边返回图标的大小，rpx
    backIconSize: {
        type: [String, Number],
        default: "44",
    },
    // 返回的文字提示
    backText: {
        type: String,
        default: "",
    },
    // 返回的文字的 样式
    backTextStyle: {
        type: Object,
        default() {
            return {
                color: "#606266",
            };
        },
    },
});

const state = reactive({
    statusBarHeight: systemInfo.statusBarHeight,
});

const goBack = () => {
    uni.navigateBack();
};

const customBar = computed(() => {
    let statusBarHeight = systemInfo.statusBarHeight;
    // #ifndef MP
    return systemInfo.platform == "android" ? statusBarHeight + 50 : statusBarHeight + 45;
    // #endif
    // #ifdef MP-WEIXIN
    return menuButtonInfo.bottom + menuButtonInfo.top - statusBarHeight;
    // #endif
    // #ifdef MP-ALIPAY
    return statusBarHeight + systemInfo.titleBarHeight;
    // #endif
});

const style = computed(() => {
    let statusBarHeight = systemInfo.statusBarHeight;
    let style = {};
    style.height = `${customBar.value}px`;
    style.paddingTop = `${statusBarHeight}px`;
    Object.assign(style, props.background);
    return style;
});

const { statusBarHeight } = toRefs(state);
</script>

<style lang="scss" scoped>
@import url("./nav.less");
.cu-custom,
.container {
    width: 100%;
}

.cu-bar {
    width: 100%;
    align-items: center;
    .content {
        width: 560rpx;
        height: 100%;
        display: flex;
        flex-direction: row;
        flex: 1;
        align-items: center;
        pointer-events: auto;
        justify-content: center;
    }
    image {
        width: 37rpx;
        height: 38rpx;
        margin-right: 30rpx;
    }
}
.u-back-text {
    padding-left: 4rpx;
    font-size: 30rpx;
}
</style>
