<route lang="json5">
{
  style: {
    navigationBarTitleText: 'home',
  },
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  ></view>
</template>

<script lang="ts" setup>
import { getSystemInfoSync } from '@/utils/system'

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = getSystemInfoSync()
</script>

<style lang="scss" scoped>
.test-css {
  // mt-4=>1rem=>16px;
  margin-top: 16px;
}
</style>
