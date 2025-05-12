<template>
  <wd-config-provider :themeVars="theme">
    <scroll-view
      :scroll-y="true"
      class="h-100vh bg-#F8F8F8"
      @scroll="handleScroll"
      @scrolltolower="scrolltolower"
    ></scroll-view>
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
    <view class="w-full h-[376rpx]">
      <image class="w-full h-[full]" src="/static/images/zcfw.png" mode="widthFix" />
      <view class="relative top--157rpx left-80rpx z-1">
        <view class="font-normal text-52rpx text-#333333">政策服务</view>
        <view class="font-400 text-24rpx text-#333333 mt-4rpx">国家级 | 升级 | 市级</view>
      </view>
    </view>
    <slot></slot>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/constant'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useNavigation } from '@/hooks'
const theme: ConfigProviderThemeVars = { ...themeVars }
const { getCurrentPage } = useNavigation()
const { isTab = false } = getCurrentPage()
const slotRef = ref()
const handleClickLeft = () => {
  uni.navigateBack()
}

const slotProps = ref({})
const scrolltolower = () => {}

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
