<route lang="json5">
{
  layout: 'common',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '智能匹配',
    navigationBarBackgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
}
</route>

<template>
  <view class="bg-[#F8F8F8] pt-[24rpx] h-full pb-[4rpx]">
    <template v-for="item in dataList" :key="item.id">
      <pf-finance-card v-bind="item" @click="() => handleClick(item)"></pf-finance-card>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { productRecommend } from '@/service/index/main'
import { navigateToSub } from '@/utils'

const dataList = ref([])
const handleClick = (item) => {
  navigateToSub('/productDetail/productDetail?id=' + item.id)
}
const productRecommendFn = async () => {
  const res: any = await productRecommend()
  dataList.value = res.data
}
onLoad((options) => {
  productRecommendFn()
})
</script>
