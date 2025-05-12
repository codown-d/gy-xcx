<template>
  <view class="w-686rpx px-32rpx py-24rpx bg-#ffffff rounded-32rpx">
    <view class="flex items-center mb-12rpx">
      <view class="font-bold text-#3D5AF5 text-32rpx mr-8rpx">{{ number }}</view>
      <view class="font-500 text-#333333 text-32rpx">{{ title }}</view>
    </view>
    <view class="leading-40rpx text-24rpx text-#999999 mb-32rpx">{{ desc }}</view>
    <view class="w-622rpx px-24rpx py-20rpx bg-#F6F6F6 rounded-16rpx">
      <view v-for="(item, index) in arr" :key="index" class="box flex items-center mb-14rpx">
        <view class="bg-#3D5AF5 w-12rpx h-12rpx rounded-100% mr-12rpx"></view>
        <view class="font-bold text-#333333 text-24rpx">{{ item }}</view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue'

const props = defineProps({
  number: [String, Number],
  title: String,
  desc: String,
  arr: Array,
})
</script>
<style lang="scss" scope>
.box:last-child {
  margin-bottom: 0;
}
</style>
