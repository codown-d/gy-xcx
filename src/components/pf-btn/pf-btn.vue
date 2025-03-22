<template>
  <button
    class="w-fit inline px-[10rpx] py-[2rpx] rounded-[32rpx] flex btn-bg text-[#fff] items-center text-[20rpx] h-[32rpx]"
    :class="customClass"
  >
    <slot></slot>
    <slot name="icon"></slot>
  </button>
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
