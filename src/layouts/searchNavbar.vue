<template>
  <wd-config-provider :themeVars="theme">
    <scroll-view :scroll-y="true" class="h-100vh bg-#F8F8F8" @scroll="handleScroll">
      <wd-navbar
        @click-left="handleClickLeft"
        :bordered="false"
        fixed
        left-arrow
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
      <slot></slot>
    </scroll-view>
  </wd-config-provider>
</template>

<script lang="ts" setup>
import { themeVars } from '@/constant'
import type { ConfigProviderThemeVars } from 'wot-design-uni'
const theme: ConfigProviderThemeVars = { ...themeVars }

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
