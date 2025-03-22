<route lang="json5">
{
  layout: 'finance',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '一键融资',
  },
}
</route>

<template>
  <view class="flex justify-center flex-col items-center h-full">
    <view class="overflow-hidden w-[100vw] flex justify-center flex-col items-center">
      <view class="w-[214rpx] mb-[60rpx]">
        <image src="/static/images/yjrz-txt.svg" mode="widthFix" />
      </view>
      <image src="/static/images/rzbz.svg" mode="widthFix" />
    </view>
    <view class="mt-[44rpx] w-full h-0 flex-1 p-[32rpx] bg-[#F8F8F8]">
      <view class="bg-[#fff] px-[24rpx] rounded-[24rpx] pb-[48rpx]">
        <wd-cell-group border>
          <pf-input v-model="model.apply_money" type="text" placeholder="金额">
            <template #right>万元</template>
          </pf-input>
          <wd-select-picker
            prop="purpose"
            placeholder="用途"
            v-model="model.purpose"
            :columns="purposeOp"
          ></wd-select-picker>
          <wd-select-picker
            prop="term"
            placeholder="期限"
            v-model="model.term"
            :columns="termOp"
          ></wd-select-picker>
          <wd-select-picker
            prop="guarantee_method"
            placeholder="担保方式"
            v-model="model.guarantee_method"
            :columns="selectOp"
          ></wd-select-picker>
        </wd-cell-group>
        <view class="footer px-[108rpx] mt-[128rpx]">
          <wd-button custom-class="btn-bg" type="primary" @click="handleSubmit" block>
            快速发布
          </wd-button>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useToast } from 'wot-design-uni'
import { purposeOp, termOp, selectOp } from '@/constant'

const { success: showSuccess } = useToast()

const model = reactive<{
  apply_money: string
  guarantee_method: string
  purpose: string
  term: string
}>({
  apply_money: '',
  guarantee_method: '',
  purpose: '',
  term: '',
})

const form = ref()

function handleSubmit() {
  form.value
    .validate()
    .then(({ valid, errors }) => {
      if (valid) {
        showSuccess({
          msg: '校验通过',
        })
      }
    })
    .catch((error) => {
      console.log(error, 'error')
    })
}
</script>

<style lang="scss"></style>
