<template>
  <wd-card :title="title" custom-title-class="font-bold" :class="customClass">
    <view class="mb-[20rpx] text-[20rpx] text-[#999] font-[400]">
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
</script>
<style></style>
