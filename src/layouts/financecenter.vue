<template>
  <wd-config-provider :themeVars="theme">
    <scroll-view :scroll-y="true" class="h-100vh bg-#F8F8F8" @scroll="handleScroll">
      <wd-navbar
        @click-left="handleClickLeft"
        :bordered="false"
        fixed
        :left-arrow="!isTab"
        safeAreaInsetTop
        customClass="search-navbar-layout"
        :custom-style="`background-color: rgba(255,255,255, ${opacity})!important`"
      >
        <template #title>
          <wd-search
            custom-class=" w-[320rpx] h-[64rpx] p-0! text-left bg-transparent!"
            :light="opacity > 0.5 ? false : true"
            placeholder="请输入"
            v-model="keyword"
            hide-cancel
            placeholder-left
          ></wd-search>
        </template>
      </wd-navbar>
      <view class="w-full h-[562rpx] relative">
        <image class="w-full h-[full]" src="/static/images/yjrz-bg.png" />
        <view class="absolute top-228rpx left-80rpx z-1">
          <view class="font-normal text-52rpx text-#333333">产品超市</view>
          <view class="font-400 text-24rpx text-#333333 mt-4rpx">小贷丨担保丨转贷丨保函丨基金</view>
        </view>
        <view class="absolute top-376rpx left-32rpx z-1 match flex items-center">
          <image class="w-84rpx h-84rpx mr-32rpx" src="/static/images/zcfw.png" />
          <view class="mr-50rpx">
            <view class="font-400 text-32rpx text-#333333">智能匹配</view>
            <view class="font-400 text-20rpx text-#999999">一键筛选您可能感兴趣的服务</view>
          </view>
          <wd-button
            custom-class="btn-bg! w-184rpx! h-64rpx! m-0! p-0! min-w-184rpx!"
            @click="navigateToSub('/smartMatching/smartMatching')"
          >
            立即匹配
          </wd-button>
        </view>
      </view>
      <slot></slot>
    </scroll-view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/constant'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useNavigation } from '@/hooks'
import { timeFormat, navigateTo, navigateToSub, switchTab } from '@/utils'
const theme: ConfigProviderThemeVars = { ...themeVars }
const { getCurrentPage } = useNavigation()
const { isTab = false } = getCurrentPage()
const handleClickLeft = () => {
  uni.navigateBack()
}
const opacity = ref(0)
const handleScroll = (e: any) => {
  if (e.detail.scrollTop > 100) {
    opacity.value = 1
  } else {
    opacity.value = e.detail.scrollTop / 100
  }
}
const keyword = ref('')
</script>
<style lang="scss" scope>
.match {
  width: 686rpx;
  padding: 24rpx 40rpx;
  background: linear-gradient(180deg, rgba(240, 246, 255, 0.8) 0%, #ffffff 100%);
  border: 2rpx solid #ffffff;
  border-radius: 16rpx;
}
</style>
