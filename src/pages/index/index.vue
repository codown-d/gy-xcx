<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="bg-[#F5F5F5] overflow-hidden">
    <view class="relative">
      <image src="/static/images/sybg.png" alt="" class="w-full h-[588rpx]" />
      <image
        src="/static/images/sybt.svg"
        class="absolute right-[80rpx] top-[50%] w-[308rpx] h-[100rpx]"
      />
      <wd-button
        @click="navigateToSub('/smartMatching/smartMatching')"
        custom-class="btn-bg! absolute! right-[156rpx] bottom-[118rpx]"
      >
        立即匹配
      </wd-button>
    </view>
    <view class="px-[32rpx] h-[440rpx] flex justify-between">
      <pf-image-card
        custom-class="w-[336rpx] h-full relative"
        @goto="navigateTo('/finance/finance')"
        img="/static/images/yjrz.png"
        title="一键融资"
        subTitle="数据资源纳入资产管理体系"
      ></pf-image-card>
      <view class="w-[336rpx] flex flex-col justify-between">
        <pf-image-card
          custom-class="w-[336rpx] h-[212rpx] relative"
          @goto="navigateToSub('/assetDataTable/assetDataTable')"
          img="/static/images/zclrb.png"
          title="数据资产入表"
          subTitle="数据资源纳入资产管理体系"
        ></pf-image-card>
        <pf-image-card
          custom-class="w-[336rpx] h-[212rpx] relative"
          @goto="navigateToSub('/supplyTrade/supplyTrade')"
          img="/static/images/gyljr.png"
          title="供应链金融"
          subTitle="数据资源纳入资产管理体系"
        ></pf-image-card>
      </view>
    </view>

    <view class="flex w-full justify-between mt-[64rpx] px-[32rpx]">
      <view
        v-for="item in tabList"
        :key="item.id"
        class="flex flex-col items-center"
        @click="gotoPage(item)"
      >
        <image
          :src="`/static/images/${item.img}`"
          mode="scaleToFill"
          class="w-[112rpx] h-[112rpx]"
        />
        <view class="mt-[16rpx] text-[24rpx] text-[#666]">{{ item.label }}</view>
      </view>
    </view>
    <view
      class="mt-[64rpx] mx-[32rpx]"
      style="background: linear-gradient(180deg, #3c5bf6 0%, #7b86f1 100%); border-radius: 24rpx"
    >
      <view class="flex h-[88rpx] pr-[32rpx] pl-[8rpx] items-center justify-between">
        <view class="flex relative">
          <image
            src="/static/images/sybg.png"
            class="absolute left-8rpx top-[-40rpx] w-[92rpx] h-[92rpx]"
          />
          <view class="text-[32rpx] text-[#fff] mr-[18rpx] ml-[96rpx]">热门产品</view>
          <view
            class="mt-[2rpx] text-[#EAEEFF] text-[20rpx] px-[12rpx] h-[36rpx] leading-[32rpx]"
            style="
              background: rgba(255, 255, 255, 0.08);
              border: 2rpx solid #bdc8ff;
              border-radius: 18rpx 18rpx 18rpx 0rpx;
            "
          >
            小贷丨担保丨转贷丨保函丨基金
          </view>
        </view>
        <view
          class="text-[#fff] text-[24rpx]"
          @click="() => switchTab(`/finance-center/finance-center`)"
        >
          全部
          <wd-icon name="arrow-right" size="20rpx" color="#fff"></wd-icon>
        </view>
      </view>
      <scroll-view :scroll-x="true">
        <view class="flex">
          <view class="w-[352rpx] mr-[16rpx]" v-for="item in productList" :key="item.id">
            <pf-product-card
              v-bind="item"
              @click="() => handleProductClick(item)"
            ></pf-product-card>
          </view>
        </view>
      </scroll-view>
    </view>
    <view class="relative w-full h-[162rpx] mt-[16rpx] px-[32rpx]">
      <view class="absolute left-[40rpx] top-[40rpx] w-full h-full">
        <view class="flex items-end">
          <view class="w-[240rpx] ml-[46rpx]">
            <pf-explain title="政策服务" subTitle="原文+解读，快速了解时事"></pf-explain>
          </view>
          <pf-btn
            size="small"
            @click="switchTab('/policy/policy')"
            custom-class="btn-bg! h-[36rpx]! text-[20rpx]! px-[12rpx]!"
          >
            去了解
            <template #icon>
              <wd-icon name="arrow-right" size="20rpx" color="#fff"></wd-icon>
            </template>
          </pf-btn>
        </view>
      </view>
      <image src="/static/images/zffwbg.png" mode="widthFix" />
    </view>
    <view class="px-[56rpx] mt-[38rpx] mb-[16rpx]">
      <pf-title title="法律服务">
        <view class="text-[20rpx] text-[#999]" @click="switchTab('/policy/policy')">
          全部
          <wd-icon name="arrow-right" size="20rpx" color="#999"></wd-icon>
        </view>
      </pf-title>
    </view>
    <view>
      <template v-for="item in policyList" :key="item.id">
        <view @click="handleClick(item)">
          <pf-policy-card :title="item.title" :desc="item.summary">
            <template #footer>
              <view class="flex justify-between text-[#999] text-[20rpx]">
                <view>发布时间：{{ timeFormat(item.add_time, 'YYYY年MM月DD日') }}</view>
                <view>信息来源：{{ item.area_type_desc }}</view>
              </view>
            </template>
          </pf-policy-card>
        </view>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { getSystemInfoSync } from '@/utils/system'
import { tabList } from '@/constant'
import { product, servicePolicy } from '@/service/index/main'
import { timeFormat, navigateTo, navigateToSub, switchTab } from '@/utils'

defineOptions({
  name: 'Home',
})

const gotoPage = (item) => {
  uni.setStorageSync('financeCenterId', item.id)
  switchTab('/finance-center/finance-center?id=' + item.id)
}
const { safeAreaInsets } = getSystemInfoSync()
onMounted(() => {})
const policyList = ref([])
const productList = ref([])
const getServicePolicy = async () => {
  const res = await servicePolicy({ theme_id: 0, page: 1, feature_id: 0, start: 0, limit: 10 })
  policyList.value = res?.dataList
  const resProd = await product({
    page: 1,
    limit: 10,
  })
  productList.value = resProd?.dataList
}
const handleProductClick = (item) => {
  navigateToSub('/productDetail/productDetail?id=' + item.id)
}
const handleClick = (item) => {
  navigateToSub(`/policyDetails/policyDetails?id=${item.id}`)
}
onLoad(() => {
  getServicePolicy()
})
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
