<template>
  <wd-config-provider :themeVars="theme">
    <view class="relative overflow-hidden h-[100vh]">
      <image
        class="w-full h-[588rpx] absolute top-0 z-[-1]"
        src="/static/images/yjrz-bg.png"
        mode="widthFix"
      />
      <view class="h-full" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
        <wd-navbar
          :bordered="false"
          customClass="bg-transparent!"
          left-arrow
          @click-left="handleClickLeft"
        ></wd-navbar>
        <slot></slot>
      </view>
      <wd-toast />
      <wd-message-box />
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
const { title } = useNavigation()
const handleClickLeft = () => {
  uni.navigateBack()
}
onLoad(() => {})
</script>
