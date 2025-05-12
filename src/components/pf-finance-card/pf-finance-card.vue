<template>
  <wd-card
    custom-title-class="font-bold"
    custom-footer-class="pt-0!"
    :class="customClass"
    custom-class="px-0!"
  >
    <template #title>
      <view class="flex items-end">
        <view class="pl-[32rpx] pr-[16rpx]">{{ name }}</view>
        <view
          v-if="type"
          class="text-[24rpx] text-[#fff] font-bold flex items-center justify-center px-[16rpx] py-[12rpx]"
          style="
            background: linear-gradient(270deg, #7b9df1 0%, #3c5bf6 100%);
            border-radius: 24rpx 8rpx 24rpx 8rpx;
          "
        >
          {{ type }}
        </view>
      </view>
    </template>
    <view
      class="text-[20rpx] text-[#999] font-[400] px-[32rpx]"
      style="border-top: 2rpx solid #eeeeee"
    >
      <wd-grid :column="3">
        <wd-grid-item use-slot v-for="(item, index) in data" :key="index">
          <view class="flex flex-col mr-[16rpx]">
            <view class="text-left mb-[8rpx] text-[20rpx] ml-[12rpx] text-[#333]">
              {{ item.label }}
            </view>
            <view
              class="flex text-[#3D5AF5] items-center h-[76rpx] text-[44rpx] font-bold bg-[#F9F9F9] rounded-[16rpx] px-[16rpx]"
            >
              <view>{{ item.num }}</view>
              <view class="text-[24rpx] mt-[12rpx] ml-[4rpx]">{{ item.unit }}</view>
            </view>
            <view class="text-[20rpx] text-[#ccc] text-left mt-[8rpx] ml-[12rpx]">
              {{ item?.tips }}
            </view>
          </view>
        </wd-grid-item>
      </wd-grid>
    </view>
    <template #footer>
      <view class="flex justify-between items-center px-[32rpx]">
        <view class="flex items-center text-[24rpx] text-[#999]">
          <wd-img
            :width="32"
            :height="32"
            :src="financial_organs.logo"
            custom-class="rounded-[64rpx] mr-[24rpx] overflow-hidden "
          />
          {{ financial_organs.organs_name }}
        </view>
        <pf-btn @click="handleClick" size="small" plain>
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
