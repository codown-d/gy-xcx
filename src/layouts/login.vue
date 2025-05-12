<template>
  <wd-config-provider :themeVars="theme">
    <view class="relative overflow-hidden h-[100vh]">
      <image
        class="w-full h-[588rpx] absolute top-0 z-[-1]"
        src="/static/images/login_bg.png"
        mode="widthFix"
      />
      <view class="h-full" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
        <wd-navbar
          :bordered="false"
          customClass="bg-transparent!"
          left-arrow
          @click-left="handleClickLeft"
        ></wd-navbar>
        <view class="flex items-center justify-center flex-col mt-[64rpx] mb-[130rpx]">
          <text class="text-[48rpx] text-[#333] font-bold">欢迎登录</text>
          <text class="text-[48rpx] mt-[14rpx] text-[#333] font-bold">广元市综合金融服务平台</text>
        </view>
        <slot></slot>
      </view>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/constant'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { getSystemInfoSync } from '@/utils/system'
const theme: ConfigProviderThemeVars = { ...themeVars }
const { safeAreaInsets } = getSystemInfoSync()

onLoad(() => {})
const handleClickLeft = () => {
  uni.navigateBack()
}
</script>
