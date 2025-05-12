<route lang="json5">
{
  layout: 'common',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '政策详情',
    navigationBarBackgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
}
</route>

<template>
  <view class="content pt20rpx pl-[30rpx] pr-[34rpx]">
    <view class="font-500 text-[#333333]! text-[32rpx] lh-[48rpx] mb-32rpx">
      {{ data?.title }}
    </view>
    <view class="flex justify-between items-center time mb-22rpx">
      <view class="font-500 text-[#999999]! text-[24rpx]">
        信息来源： {{ data?.area_type_desc }}
      </view>
      <view class="font-500 text-[#999999]! text-[24rpx]">
        发布时间： {{ data?.add_time_desc }}
      </view>
    </view>
    <view class="mb-60rpx">
      <rich-text :nodes="data?.body"></rich-text>
    </view>
  </view>
  <view class="w-full h-16rpx bg-#F5F5F5"></view>
  <view class="p-32rpx">
    <view class="rounded-24rpx bg-blue">
      <view class="pt-16rpx px-24rpx pb-22rpx flex justify-between items-end">
        <view class="font-bold text-32rpx text-#ffffff">关联产品</view>
        <view>
          <text
            class="font-400 text-24rpx text-#ffffff"
            @click="switchTab('/finance-center/finance-center')"
          >
            全部
          </text>
          <wd-icon name="arrow-right" size="24rpx" color="#ffffff"></wd-icon>
        </view>
      </view>
      <view class="flex items-center justify-between px-8rpx pb-16rpx">
        <view
          class="rounded-20rpx pt-12rpx px-12rpx pb-20rpx bg-#FFFFFF flex-1 w-0 mx-1"
          v-for="(item, index) in dataList"
          :key="index"
        >
          <pf-finance-size v-bind="item" @click="() => handleClick(item)"></pf-finance-size>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { policyDetail, product } from '@/service/index/main'
import { navigateToSub, switchTab } from '@/utils'
import { ref } from 'vue'
const data = ref()
const dataList = ref([])
const getPolicyDetail = async (id) => {
  const res: any = await policyDetail({ id })
  if (res.code === 200) {
    data.value = res.data
  }
}
const productFn = async (data = {}) => {
  const res = await product(data)
  dataList.value = (res.dataList as any[]).slice(0, 3)
}
onLoad((options) => {
  options.id && getPolicyDetail(options.id)
  productFn()
})
const handleClick = (item) => {
  navigateToSub('/productDetail/productDetail?id=' + item.id)
}
</script>
<style scope lang="scss">
.time {
  border-bottom: 1px solid #eeeeee;
}
</style>
