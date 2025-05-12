<template>
  <view class="relative mt-[8rpx] overflow-hidden" :class="customClass">
    <view class="relative rounded-[24rpx] pl-[34rpx] bg-[#F8F8F8] flex justify-between h-[112rpx]">
      <view class="text-[60rpx] text-[#3C5BF6] flex items-center">
        <view>{{ amount.num }}</view>
        <view class="text-[24rpx] mt-[24rpx]">{{ '万元' || amount.unit }}</view>
      </view>
      <view class="text-[60rpx] text-[#3C5BF6] flex items-center">
        <view>{{ term }}</view>
        <view class="text-[24rpx] mt-[24rpx]">{{ '个月' }}</view>
      </view>
      <view class="text-[60rpx] flex flex-col justify-between items-end">
        <view
          :style="type.style"
          class="w-[112rpx] flex items-center justify-center h-[40rpx] text-[#fff] text-[20rpx]"
        >
          {{ type.text }}
        </view>
        <view class="text-[24rpx] text-[#999] pr-[24rpx] mb-[20rpx]">用途：{{ purpose }}</view>
      </view>
    </view>
    <view class="flex justify-between items-center pl-[32rpx] mt-[8rpx] mb-[16rpx]">
      <view class="font-400 text-24rx text-#CCCCCC">{{ time }}</view>
      <view v-if="org" class="pr-[24rpx]">{{ org }}</view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { action_status_filter, purposeOp } from '@/constant'
import { formatNumber, timeFormat } from '@/utils'
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps<{
  customClass: string // Vue 3 setup 模式，接收 class
  apply_money: number
  term: number
  purpose: string | number
  add_time: number
  action_status: number
  org?: string
}>()
const amount = computed(() => formatNumber(props.apply_money))
const term = computed(() => props.term)
const time = computed(() => timeFormat(props.add_time, 'YYYY年MM月DD'))
const type = computed(() => action_status_filter[props.action_status])
const org = computed(() => props.org)
const purpose = computed(() => purposeOp.find((item) => item.value === props.purpose + '')?.label)

const customClass = computed(() => props.customClass)
</script>
