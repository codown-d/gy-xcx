<template>
  <wd-card
    custom-footer-class="!p-[12rpx]"
    custom-title-class="!py-[20rpx]"
    :class="customClass"
    custom-class="px-0! w-[352rpx]"
  >
    <template #title>
      <view class="flex items-end pl-[32rpx] pr-[16rpx] font-bold text-[28rpx] ellipsis">
        {{ name }}
      </view>
    </template>
    <view class="text-[20rpx] text-[#999] font-[400] px-[12rpx] flex">
      <view
        v-for="(item, index) in data.slice(0, 2)"
        :key="index"
        class="flex flex-col mr-[16rpx] bg-[#F9F9F9] rounded-[16rpx] p-[12rpx] w-[50%]"
      >
        <view class="text-left text-[20rpx] text-[#999]">
          {{ item.label }}
        </view>
        <view class="flex text-[#3D5AF5] items-center text-[32rpx] font-bold">
          <view>{{ item.num }}</view>
          <view class="text-[20rpx] mt-[12rpx] ml-[4rpx]">{{ item.unit }}</view>
        </view>
      </view>
    </view>
    <template #footer>
      <view class="flex justify-between items-center">
        <view class="flex items-center text-[20rpx] text-[#999]">
          <wd-img
            :width="16"
            :height="16"
            :src="financial_organs.logo"
            custom-class="rounded-[32rpx] overflow-hidden mr-[4rpx]"
          />
          {{ financial_organs.organs_name }}
        </view>
        <pf-btn @click="handleClick" size="small" plain customClass="!text-[20rpx] !h-[48rpx]">
          查看详情
          <template #icon>
            <wd-icon name="arrow-right" size="20rpx" color="#3D5AF5"></wd-icon>
          </template>
        </pf-btn>
      </view>
    </template>
  </wd-card>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  customClass: String, // Vue 3 setup 模式，接收 class
  name: String,
  size: String,
  financial_organs: Object,
})
const customClass = computed(() => props.customClass)
const emits = defineEmits(['click']) // 定义 click 事件
const { data, type } = useFinanceCard(props)
const handleClick = () => {
  emits('click') // 触发父组件传递的 click 事件
}
</script>
<style></style>
