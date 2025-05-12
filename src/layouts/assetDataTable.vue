<template>
  <wd-config-provider :themeVars="theme">
    <scroll-view :scroll-y="true" class="h-100vh bg-#F8F8F8" @scroll="handleScroll">
      <wd-navbar
        @click-left="handleClickLeft"
        :bordered="false"
        fixed
        :left-arrow="!isTab"
        safeAreaInsetTop
        :custom-style="`background-color: rgba(255,255,255, ${opacity})!important`"
      >
        <template #title>
          <text class="font-normal! text-[34rpx]">{{ title }}</text>
        </template>
      </wd-navbar>
      <slot></slot>
    </scroll-view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/constant'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
import { useNavigation } from '@/hooks'
const { title, getCurrentPage } = useNavigation()
const { isTab = false } = getCurrentPage()
const theme: ConfigProviderThemeVars = { ...themeVars }
const handleClickLeft = () => {
  uni.navigateBack()
}
const opacity = ref(0)
const handleScroll = (e: any) => {
  if (e.detail.scrollTop > 100) {
    return (opacity.value = 1)
  } else {
    opacity.value = e.detail.scrollTop / 100
  }
}
</script>
<style scope lang="scss"></style>
