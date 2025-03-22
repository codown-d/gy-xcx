<template>
  <view class="relative flex" :class="customClass">
    <view class="text-[32rpx] font-bold text-[#333]">
      <view class="flex items-center">
        {{ title }}
      </view>
      <view class="text-[#999] text-[20rpx] font-500">{{ subTitle }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  customClass: String, // Vue 3 setup 模式，接收 class
  title: String,
  subTitle: String,
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
