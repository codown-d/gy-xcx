<template>
  <view class="relative" :class="customClass">
    <view class="flex justify-between items-center">
      <view class="text-[32rpx] flex flex-col font-bold text-[#333]">
        {{ title }}
        <view class="bg-bottom mt-[-14rpx]"></view>
      </view>
      <slot></slot>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  customClass: String, // Vue 3 setup 模式，接收 class
  title: String,
})
// 定义一个事件，用于触发父组件的方法
const emit = defineEmits<{
  goto: []
}>()

// 方法：点击按钮触发父组件的方法
const goto = () => {
  emit('goto') // 触发名为 'trigger' 的事件
}
const customClass = computed(() => props.customClass)
</script>
<style>
.bg-bottom {
  width: 136rpx;
  height: 14rpx;
  background: linear-gradient(90deg, rgba(60, 91, 246, 0.4) 0%, rgba(123, 157, 241, 0) 100%);
  border-radius: 7rpx;
}
</style>
