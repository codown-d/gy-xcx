<template>
  <wd-card :title="title" custom-title-class="font-bold" :class="customClass" @click="handleClick">
    <view class="text-[20rpx] text-[#999] font-[400]" @click="handleClick">
      {{ desc }}
    </view>
    <template #footer>
      <slot name="footer"></slot>
    </template>
  </wd-card>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  customClass: String, // Vue 3 setup 模式，接收 class
  title: String,
  desc: String,
})
const customClass = computed(() => props.customClass)
const emits = defineEmits(['click']) // 定义 click 事件
const handleClick = () => {
  emits('click') // 触发父组件传递的 click 事件
}
</script>
<style></style>
