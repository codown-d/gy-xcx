<!-- 使用 type="home" 属性设置首页，其他页面不需要设置，默认为page；推荐使用json5，更强大，且允许注释 -->
<route lang="json5" type="home">
{
  layout: 'default',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '首页',
  },
}
</route>
<template>
  <view class="bg-[#F5F5F5] overflow-hidden">
    <view class="relative">
      <image src="/static/images/sybg.png" alt="" class="w-full h-[588rpx]" />
      <image
        src="/static/images/sybt.svg"
        class="absolute right-[80rpx] top-[50%] w-[308rpx] h-[100rpx]"
      />
      <wd-button
        @click="goPage('/finance/index')"
        custom-class="btn-bg! absolute! right-[156rpx] bottom-[118rpx]"
      >
        立即匹配
      </wd-button>
    </view>
    <view class="px-[32rpx] h-[440rpx] flex justify-between">
      <pf-image-card
        custom-class="w-[336rpx] h-full relative"
        @goto="goto"
        img="/static/images/yjrz.png"
        title="一键融资"
        subTitle="数据资源纳入资产管理体系"
      ></pf-image-card>
      <view class="w-[336rpx] flex flex-col justify-between">
        <pf-image-card
          custom-class="w-[336rpx] h-[212rpx] relative"
          @goto="goto"
          img="/static/images/zclrb.png"
          title="数据资产入表"
          subTitle="数据资源纳入资产管理体系"
        ></pf-image-card>
        <pf-image-card
          custom-class="w-[336rpx] h-[212rpx] relative"
          @goto="goto"
          img="/static/images/gyljr.png"
          title="供应链金融"
          subTitle="数据资源纳入资产管理体系"
        ></pf-image-card>
      </view>
    </view>

    <view class="flex w-full justify-between mt-[64rpx] px-[32rpx]">
      <view v-for="item in tabList" :key="item.id" class="flex flex-col items-center">
        <image
          :src="`/static/images/${item.img}`"
          mode="scaleToFill"
          class="w-[112rpx] h-[112rpx]"
        />
        <view class="mt-[16rpx] text-[24rpx] text-[#666]">{{ item.label }}</view>
      </view>
    </view>
    <view class="relative w-full h-[162rpx] mt-[40rpx] px-[32rpx]">
      <view class="absolute left-[40rpx] top-[40rpx] w-full h-full">
        <view class="flex items-end">
          <view class="w-[240rpx] ml-[46rpx]">
            <pf-explain title="政策服务" subTitle="原文+解读，快速了解时事"></pf-explain>
          </view>
          <pf-btn>
            去了解
            <template #icon>
              <wd-icon name="arrow-right" size="20rpx" color="#fff"></wd-icon>
            </template>
          </pf-btn>
        </view>
      </view>
      <image src="/static/images/zffwbg.png" mode="widthFix" />
    </view>
    <view class="px-[56rpx] mt-[38rpx] mb-[16rpx]">
      <pf-title title="法律服务">
        <view class="text-[20rpx] text-[#999]">
          全部
          <wd-icon name="arrow-right" size="20rpx" color="#999"></wd-icon>
        </view>
      </pf-title>
    </view>

    <view>
      <template v-for="item in policyList" :key="item.id">
        <pf-policy-card :title="item.title" :desc="item.summary">
          <template #footer>
            <view class="flex justify-between text-[] text-[20rpx]">
              <view>发布时间：{{ timeFormat(item.add_time, 'YYYY年MM月DD日') }}</view>
              <view>信息来源：{{ item.area_type_desc }}</view>
            </view>
          </template>
        </pf-policy-card>
      </template>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { TestEnum } from '@/typings'
import PLATFORM from '@/utils/platform'
import { getSystemInfoSync } from '@/utils/system'
import { tabList } from '@/constant'
import { servicePolicy } from '@/service/index/main'
import { timeFormat, goPage } from '@/utils'

defineOptions({
  name: 'Home',
})

// 获取屏幕边界到安全区域距离
const { safeAreaInsets } = getSystemInfoSync()
const author = ref('菲鸽')
const description = ref(
  'unibest 是一个集成了多种工具和技术的 uniapp 开发模板，由 uniapp + Vue3 + Ts + Vite4 + UnoCss + UniUI + VSCode 构建，模板具有代码提示、自动格式化、统一配置、代码片段等功能，并内置了许多常用的基本组件和基本功能，让你编写 uniapp 拥有 best 体验。',
)
const goto = () => {
  console.log(123)
  // uni.navigateTo({ url: '/pages/demo3/index' })
  // uni.switchTab({
  //   url: '/pages/demo1/index', // 必须是 tabBar 里配置的页面
  // })
}
// 测试 uni API 自动引入
const policyList = ref([])
const getServicePolicy = async () => {
  const res = await servicePolicy({ theme_id: 0, page: 1, feature_id: 0, start: 0, limit: 10 })
  policyList.value = res?.dataList
}
onLoad(() => {
  getServicePolicy()
  console.log(author)
  console.log(TestEnum.A)
})
</script>

<style>
.main-title-color {
  color: #d14328;
}
</style>
