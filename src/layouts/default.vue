<template>
  <wd-config-provider :themeVars="themeVars">
    <slot />
    <wd-toast />
    <wd-message-box />
  </wd-config-provider>
</template>

<script lang="ts" setup>
import type { ConfigProviderThemeVars } from 'wot-design-uni'

const themeVars: ConfigProviderThemeVars = {
  colorTheme: '#3C5BF6',
  buttonPrimaryBgColor: '#3C5BF6',
}
</script>
<style lang="scss">
.btn-bg {
  background: linear-gradient(90deg, #3c5bf6 0%, #7b9df1 100%);
  box-shadow: 0rpx 16rpx 24rpx 0rpx rgba(0, 8, 170, 0.16);
}
</style>
