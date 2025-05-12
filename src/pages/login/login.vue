<route lang="json5">
{
  layout: 'login',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="form">
    <!-- 选择登录方式 -->
    <view class="mt-[280rpx] flex justify-between items-center flex-col">
      <view
        class="phone text-[#333333] text-[48rpx] font-bold mb-[64rpx]"
        v-if="userStore.userInfo.phone"
      >
        {{ phone }}
      </view>
      <wd-button custom-class="btn-bg! w-[550rpx] h-[80rpx]! text-[28rpx]" @click="login">
        手机号快捷登录
      </wd-button>
      <wd-button
        custom-class="mb-[32rpx] mt-[32rpx] w-[550rpx] h-[80rpx]! text-[28rpx] bg-[#F0F3FF]! text-[#3C5BF6]!"
      >
        微信一键登录
      </wd-button>
      <view
        class="flex justify-between items-center w-[518rpx] mb-[128rpx] ml-[116rpx] mr-[116rpx]"
      >
        <text
          class="text-[24rpx] text-[#3C5BF6]"
          @click="redirectTo('/other-login/other-login?step=1')"
        >
          账号密码登录
        </text>
        <text
          class="text-[24rpx] text-[#3C5BF6]"
          @click="redirectTo('/other-login/other-login?step=2')"
        >
          其他手机号
        </text>
      </view>
    </view>
    <!-- 协议 -->
    <view class="flex justify-center items-center">
      <wd-checkbox v-model="readAgreement">
        <view class="text-[24rpx] text-[#333333]">
          我已阅读并同意
          <text class="text-[#3D5AF5]">《用户协议》</text>
          、
          <text class="text-[#3D5AF5]">《隐私协议》</text>
        </view>
      </wd-checkbox>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store'
import { navigateTo, redirectTo, replacePhoneNumber } from '@/utils'
const readAgreement = ref(false)
const userStore = useUserStore()
const phone = ref(replacePhoneNumber(userStore.userInfo.phone, '****'))
const login = () => {
  // if (!userStore.userInfo.phone) {
  //   redirectTo('/other-login/other-login?step=1')
  // }
}
</script>
