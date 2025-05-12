<route lang="json5">
{
  layout: 'assetDataTable',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '供应链贸易',
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
          src="/static/images/gfct.png"
          mode="widthFix"
        />
        <view class="right pt-6rpx">
          <view class="text-[#333333] text-[32rpx] font-bold mb-12rpx">广发创投</view>
          <view class="text-[#333333] text-[28rpx] mt-8rpx">产业赋能，多元发现</view>
          <view class="flex items-center mt-[8rpx]">
            <text class="iconfont dingwei text-[#999999] text-24rpx"></text>
            <view class="ml-8rpx text-[#999999] text-[20rpx]">
              地址：四川省广元市利州区利州东路二段509号康隆·财富旺角21楼
            </view>
          </view>
        </view>
      </view>
      <view>
        <view class="text-[24rpx] mb-8rpx">
          &nbsp;&nbsp;&nbsp;&nbsp;
          供应链贸易业务，通过有效地整合和管理供应链上的各个环节，实现产品从生产到销售的无缝衔接和协同运作，提高供应链的效率、降低成本和提升服务质量，实现企业间的合作共赢，促进我市经济发展。
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;目前公司主要业务板块聚焦建材及粮油贸易，上游覆盖我市众多生产型中小微企业，下游链接成都铁路局、中铁五局、蜀道集团下属公司及昭化京兆集团等大中型国有企业。资金来源有保证，账期较短，坏账风险小。
        </view>
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
const show = ref(false)
</script>
<style scope lang="scss"></style>
