<template>
  <wd-config-provider :themeVars="theme">
    <view class="relative overflow-hidden h-[100vh] bg-[#F8F8F8]">
      <!-- <view v-show="bgType === 1" class="w-full h-[480rpx] relative">
        <image class="w-full h-full" src="/static/images/smrz.png" mode="widthFix" />
        <view class="absolute top-0">实名认证</view>
      </view> -->
      <image
        v-show="bgType === 1"
        class="w-full h-[480rpx] absolute top-0"
        src="/static/images/smrz.png"
        mode="widthFix"
      />
      <view
        v-show="bgType === 1"
        class="absolute top-210rpx left-112rpx text-#333333 text-52rpx font-normal"
      >
        实名认证
      </view>
      <image
        v-show="bgType === 2"
        class="w-full h-[480rpx] absolute top-0"
        src="/static/images/qyrz.png"
        mode="widthFix"
      />
      <view
        v-show="bgType === 2"
        class="absolute top-210rpx left-112rpx text-#333333 text-52rpx font-normal"
      >
        企业认证
      </view>
      <image
        v-show="bgType === 3"
        class="w-full h-[574rpx] absolute top-0"
        src="/static/images/gyljr.png"
        mode="widthFix"
      />
      <view
        v-show="bgType === 3"
        class="absolute top-176rpx left-270rpx text-#333333 text-52rpx font-normal"
      >
        产品申请
      </view>
      <view class="h-full" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
        <wd-navbar
          :bordered="false"
          customClass="bg-transparent!"
          left-arrow
          @click-left="handleClickLeft"
        ></wd-navbar>
        <slot></slot>
      </view>
    </view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/constant'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { getSystemInfoSync } from '@/utils/system'
import { useNavigation } from '@/hooks'
const theme: ConfigProviderThemeVars = { ...themeVars }
const { safeAreaInsets } = getSystemInfoSync()

const { getCurrentPage } = useNavigation()
const { bgType } = getCurrentPage()

onLoad(() => {})
const handleClickLeft = () => {
  uni.navigateBack()
}
</script>
