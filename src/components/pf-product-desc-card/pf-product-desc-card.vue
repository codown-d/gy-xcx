<template>
  <view class="w-686rpx bg-#ffffff rounded-32rpx">
    <view
      v-show="isTitle"
      class="flex items-center px-32rpx py-26rpx border-b-solid border-b-2rpx border-b-#EEEEEE"
    >
      <image :src="img" class="w-40rpx h-40rpx mr-12rpx" />
      <view class="font-500 text-#333333 text-32rpx">{{ title }}</view>
    </view>
    <slot></slot>
  </view>
</template>

<script lang="ts" setup>
import { defineProps, withDefaults } from 'vue'
// 明确 props 类型，并确保 isTitle 是 boolean 类型
interface Props {
  img: string
  title: string
  isTitle?: boolean // 确保类型为 boolean
}
const props = withDefaults(defineProps<Props>(), {
  img: '',
  title: '',
  isTitle: true, // 默认值为布尔值
})
</script>
<style lang="scss" scope>
.box:last-child {
  margin-bottom: 0;
}
</style>
