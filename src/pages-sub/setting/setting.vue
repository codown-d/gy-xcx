<route lang="json5">
{
  layout: 'common',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '账号设置',
    navigationBarBackgroundColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
  },
  needLogin: true,
}
</route>

<template>
  <view class="ml-[32rpx] mr-[32rpx] pt-[16rpx]">
    <wd-cell-group border custom-class="mb-[16rpx]">
      <wd-cell
        title="手机号"
        :value="phoneFmt"
        clickable
        is-link
        @click="showToastFn(phone)"
        custom-title-class="text-[#333333]! font-400! text-[28rpx]!"
        custom-value-class="text-[#cccccc]! font-400! text-[28rpx]!"
      />
      <wd-cell
        title="密码"
        value="******"
        clickable
        is-link
        @click="showToastFn(userStore.userInfo.user_pass_view)"
        custom-title-class="text-[#333333]! font-400! text-[28rpx]!"
        custom-value-class="text-[#cccccc]! font-400! text-[28rpx]!"
      ></wd-cell>
    </wd-cell-group>
    <wd-cell-group border custom-class="mb-[16rpx]">
      <wd-cell
        title="实名认证"
        :value="verifyStatus"
        :is-link="verify_status != 3"
        to="/pages-sub/userVerify/userVerify"
        custom-title-class="text-[#333333]! font-400! text-[28rpx]!"
        custom-value-class="text-[#cccccc]! font-400! text-[28rpx]!"
      />
      <wd-cell
        title="企业认证"
        :value="enterpriseVerifyStatus"
        :is-link="enterprise_verify_status != 3"
        to="/pages-sub/enterpriseVerify/enterpriseVerify"
        custom-title-class="text-[#333333]! font-400! text-[28rpx]!"
        custom-value-class="text-[#cccccc]! font-400! text-[28rpx]!"
      />
    </wd-cell-group>
    <wd-cell-group border>
      <wd-cell title="退出登录" clickable custom-class="other" @click="quitFn" />
      <!-- <wd-cell title="注销账号" clickable custom-class="other" /> -->
    </wd-cell-group>
  </view>
</template>

<script lang="ts" setup>
import { Verify } from '@/constant'
import { quit } from '@/service/index/main'
import { useUserStore } from '@/store'
import { replacePhoneNumber, showToast, switchTab } from '@/utils'

const userStore = useUserStore()
const { verify_status, enterprise_verify_status } = userStore.userInfo
const showToastFn = (title: any) => {
  title && showToast(title)
}
const quitFn = () => {
  quit().then((res) => {
    if (res.code === 200) {
      userStore.clearUserInfo()
      showToast('退出成功')
      switchTab('/index/index')
    }
  })
}
const phone = userStore.userInfo.phone || userStore.userInfo.user_name
const phoneFmt = replacePhoneNumber(phone)
const verifyStatus = Verify[verify_status]
const enterpriseVerifyStatus = Verify[enterprise_verify_status]
</script>
<style scope lang="scss">
.wd-cell-group {
  overflow: hidden;
  border-radius: 20rpx;
}
.wd-cell {
  padding-left: 0 !important;
}
.wd-cell__wrapper {
  padding: 28rpx 32rpx !important;
}
:deep().other {
  .wd-cell__wrapper {
    .wd-cell__left {
      width: 100% !important;
      margin-right: 0;
      text-align: center;
    }
    .wd-cell__right {
      display: none;
    }
  }
}
</style>
