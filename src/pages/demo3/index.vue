<route lang="json5">
{
  style: {
    navigationBarTitleText: 'demo3',
  },
  needLogin: true,
}
</route>

<template>
  <view
    class="bg-white overflow-hidden pt-2 px-4"
    :style="{ marginTop: safeAreaInsets?.top + 'px' }"
  >
    <view class="text-center text-3xl mt-8">
      鸽友们好，我是
      <text class="text-red-500">菲鸽</text>
    </view>
  </view>
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
