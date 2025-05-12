<route lang="json5">
{
  layout: 'common',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '上一级标题',
    navigationBarBackgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
}
</route>

<template>
  <view class="ml-[32rpx] mr-[32rpx]">
    <wd-input
      custom-input-class="h-[120rpx]! text-[32rpx]!"
      type="text"
      v-model="value"
      placeholder="请输入"
    />
    <wd-button
      custom-class="w-[360rpx] h-[80rpx]!  ml-[164rpx] mt-[78rpx] text-[28rpx]! bg-[#3C5BF6]!"
    >
      保存
    </wd-button>
  </view>
</template>

<script lang="ts" setup>
const value = ref<string>('')
</script>
