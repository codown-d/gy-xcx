<route lang="json5">
{
  layout: 'common',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '实名认证',
    navigationBarBackgroundColor: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
}
</route>

<template>
  <view>
    <view class="text-center font-500 text-[#333333] text-[40rpx] pt-[80rpx]">
      您即将进行实名核身验证
    </view>
    <view class="text-center font-500 text-[#333333] text-[28rpx] pt-[20rpx]">
      请保持正脸在取景框中根据屏幕提示完成识别
    </view>
    <view class="flex justify-center items-center pt-[84rpx]">
      <image class="w-[344rpx]" src="/static/images/renlian.png" mode="widthFix" />
    </view>
    <view class="flex justify-between items-center pt-[80rpx] pl-[54rpx] pr-[50rpx]">
      <view class="flex flex-col justify-center items-center">
        <image class="w-[148rpx]" src="/static/images/renlian1.png" mode="widthFix" />
        <view class="font-500 text-[#333333] text-[24rpx] pt-[18rpx]">请保持光线充足</view>
      </view>
      <view class="flex flex-col justify-center items-center">
        <image class="w-[148rpx]" src="/static/images/renlian2.png" mode="widthFix" />
        <view class="font-500 text-[#333333] text-[24rpx] pt-[18rpx]">请保持在取景框内</view>
      </view>
      <view class="flex flex-col justify-center items-center">
        <image class="w-[148rpx]" src="/static/images/renlian3.png" mode="widthFix" />
        <view class="font-500 text-[#333333] text-[24rpx] pt-[18rpx]">请不要遮挡脸部</view>
      </view>
    </view>
    <view class="footer mt-[120rpx]">
      <wd-button custom-class="btn-bg w-[424rpx] h-[80rpx]" type="primary" block>下一步</wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
const value = ref<string>('')
</script>
