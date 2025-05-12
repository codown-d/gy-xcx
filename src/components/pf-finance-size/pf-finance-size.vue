<template>
  <view>
    <view
      class="w-full min-h-124rpx rounded-16rpx pt-12rpx pb-11rpx px-16rpx flex justify-center flex-col"
      style="background: linear-gradient(180deg, #f5f6ff 0%, #f9f9f9 100%)"
    >
      <view v-for="(item, index) in data" :key="index">
        <view class="flex flex-col">
          <view class="text-left text-[20rpx] text-[#333]">
            {{ item.label }}
          </view>
          <view class="flex text-[#3D5AF5] items-center text-[32rpx] font-bold rounded-[16rpx]">
            <view>{{ item.num }}</view>
            <view class="text-[20rpx] mt-[12rpx] ml-[4rpx]">{{ item.unit }}</view>
          </view>
        </view>
      </view>
    </view>
    <view
      class="w-full text-26rpx text-#333333 font-500 mt-20rpx pb-20rpx ellipsis mb-20rpx"
      style="border-bottom: 2rpx solid #eeeeee"
    >
      {{ name }}
    </view>
    <view class="text-left">
      <pf-btn
        @click="handleClick"
        size="small"
        plain
        custom-class="w-184rpx! h-48rpx! p-0! flex items-center justify-center"
      >
        查看详情
        <template #icon>
          <wd-icon name="arrow-right" size="20rpx" color="#3D5AF5"></wd-icon>
        </template>
      </pf-btn>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits } from 'vue'

const props = defineProps({
  customClass: String, // Vue 3 setup 模式，接收 class
  name: String,
  size: String,
  financial_organs: Object,
})
const emits = defineEmits(['click']) // 定义 click 事件
const { data, type } = useFinanceCard(props)
const handleClick = () => {
  emits('click') // 触发父组件传递的 click 事件
}
</script>
<style></style>
