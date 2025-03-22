<script setup lang="ts">
import { computed, useSlots } from 'vue'
import { useCell } from 'wot-design-uni/components/composables/useCell'

const slots = useSlots()
const cell = useCell()
const props = defineProps<{
  modelValue: string | number
  label?: string
  placeholder?: string
  type: 'text' | 'number' | 'idcard' | 'digit' | 'password' // ✅ 修正 `type` 仅限 UniBest 允许的值
}>()

const emit = defineEmits(['update:modelValue'])

const inputValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
})
// 判断右侧 slot 是否存在
const hasRightSlot = computed(() => !!slots.right)
</script>

<template>
  <view
    :class="`${cell.border.value ? 'is-border' : ''}`"
    class="flex justify-between items-center py-[20rpx] px-[30rpx]"
  >
    <view class="flex-1 w-0 flex">
      <label v-if="label" class="text-gray-700">{{ label }}</label>
      <input
        v-model="inputValue"
        placeholder-style="color:#bfbfbf;font-size:14px"
        :type="'text'"
        :placeholder="placeholder || ''"
        class="w-0 flex-1 pr-[24rpx] h-[24rpx]"
      />
    </view>
    <view v-if="hasRightSlot">
      <slot name="right"></slot>
    </view>
  </view>
</template>
