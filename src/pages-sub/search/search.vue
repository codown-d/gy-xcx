<route lang="json5">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '搜索',
  },
}
</route>

<template>
  <view class="h-[100vh]">
    <view
      class="bg-[#FFFFFF]"
      :style="{
        paddingTop: safeAreaInsets?.top + 'px',
      }"
    >
      <wd-navbar
        customClass="bg-transparent! nav-search-input"
        :bordered="false"
        left-arrow
        @click-left="handleClickLeft"
      >
        <template #title>
          <view class="flex items-center justify-center h-full">
            <wd-search
              custom-class="w-[440rpx] h-[64rpx] text-left p-[0]!"
              v-model="keyword"
              hide-cancel
              placeholder-left
              placeholder="请输入"
            ></wd-search>
          </view>
        </template>
      </wd-navbar>
    </view>
    <view
      class="container bg-[#F8F8F8] overflow-y-auto"
      :style="{
        height: `calc(100vh - var(--wot-navbar-height, 44px) - ${safeAreaInsets?.top}px)`,
      }"
    >
      <view class="pl-[32rpx] pt-[40rpx] font-500 text-[#333333] text-[32rpx]">热搜词</view>
      <view class="flex flex-wrap gap-x-[56rpx] gap-y-[10rpx] pl-[32rpx] mt-[44rpx]">
        <text class="font-400 text-[#999999] text-[28rpx]">企业</text>
        <text class="font-400 text-[#999999] text-[28rpx]">个人</text>
        <text class="font-400 text-[#999999] text-[28rpx]">银行</text>
        <text class="font-400 text-[#999999] text-[28rpx]">担保</text>
        <text class="font-400 text-[#999999] text-[28rpx]">小额贷款</text>
        <text class="font-400 text-[#999999] text-[28rpx]">基金</text>
        <text class="font-400 text-[#999999] text-[28rpx]">小额贷款</text>
        <text class="font-400 text-[#999999] text-[28rpx]">担保</text>
        <text class="font-400 text-[#999999] text-[28rpx]">企业</text>
        <text class="font-400 text-[#999999] text-[28rpx]">企业</text>
        <text class="font-400 text-[#999999] text-[28rpx]">企业</text>
        <text class="font-400 text-[#999999] text-[28rpx]">企业</text>
        <text class="font-400 text-[#999999] text-[28rpx]">企业</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getSystemInfoSync } from '@/utils/system'
const { safeAreaInsets } = getSystemInfoSync()

const keyword = ref<string>('')
const handleClickLeft = () => {
  uni.navigateBack()
}
</script>

<style lang="scss" scoped>
:deep().nav-search-input {
  .wd-navbar__title {
    margin-left: 96rpx;
  }
}
</style>
