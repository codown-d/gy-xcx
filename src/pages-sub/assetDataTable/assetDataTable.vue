<route lang="json5">
{
  layout: 'assetDataTable',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '资产数据入表',
  },
}
</route>

<template>
  <view
    class="relative pt-[100px] container"
    style="background-image: url('/static/images/yjrz-bg.png')"
  >
    <view class="mx-32rpx pb-[80px]">
      <view class="title flex items-start mb-60rpx">
        <image
          class="w-128rpx h-[128rpx] mr-24rpx rounded-[16rpx]"
          src="/static/images/gcqf.png"
          mode="widthFix"
        />
        <view class="right pt-6rpx">
          <view class="text-[#333333] text-[32rpx] font-bold mb-12rpx">广财企服</view>
          <view class="text-[#999999] text-[24rpx] font-400 mb-8rpx">
            深圳数据交易所四川数据要素服务广元分站
          </view>
          <view class="flex items-center">
            <text class="iconfont dingwei text-[#999999] text-24rpx"></text>
            <view class="ml-8rpx text-[#999999] text-[20rpx] font-400">
              四川省广元市利州区利州东路二段509号康隆·财富旺角21楼
            </view>
          </view>
        </view>
      </view>
      <view v-for="(item, index) in arr" :key="index" class="mb-16rpx">
        <pf-assetDataTable-card
          :number="item.id"
          :title="item.resource"
          :desc="item.module"
          :arr="item.resource2"
        />
      </view>
    </view>
  </view>

  <pf-btn
    @click="show = true"
    custom-class="w-424rpx! h-80rpx! fixed! left-164rpx bottom-48rpx text-32rpx rounded-[40rpx] justify-center"
  >
    立即申请
  </pf-btn>
  <wd-overlay :show="show" @click="show = false">
    <view class="flex justify-center items-center h-full">
      <view class="w-[80%] bg-[#fff] p-[16px] rounded-[16px]" @click.stop="">
        <view class="text-xl font-bold mb-4 flex justify-center mb-10">业务申请</view>
        <view class="flex">
          <view class="mb-8 text-[16px]">请您联系：</view>
          <view>
            <view class="text-[#3D5AF5] text-[18px] font-bold">
              <a href="tel:0839-3271399">0839-3271399</a>
            </view>
            <view class="text-[#999] text-[12px]">工作日：09:00-18:00 在线</view>
          </view>
        </view>
      </view>
    </view>
  </wd-overlay>
</template>

<script lang="ts" setup>
import { dataSource } from '@/constant'
const show = ref(false)
const arr = reactive(dataSource)
</script>
<style scope lang="scss">
.bg {
  width: 100%;
  height: 450rpx;
  background: linear-gradient(#ffffff, 0%, #e7ebff 100%);
}
</style>
