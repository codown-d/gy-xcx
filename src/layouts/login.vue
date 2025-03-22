<template>
  <wd-config-provider :themeVars="theme">
    <view class="relative overflow-hidden h-[100vh]">
      <image
        class="w-full h-[588rpx] absolute top-0 z-[-1]"
        src="/static/images/login-bg.png"
        mode="widthFix"
      />
      <view class="h-full" :style="{ marginTop: safeAreaInsets?.top + 'px' }">
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
</script>
