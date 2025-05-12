<route lang="json5">
{
  layout: 'finance',
  style: {
    navigationStyle: 'custom',
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
        <wd-form ref="form" :model="model">
          <wd-cell-group border>
            <view class="px-[30rpx] py-[20rpx]">
              <wd-input
                v-model="model.apply_money"
                no-border
                type="text"
                prop="apply_money"
                placeholder-class="text-[#bfbfbf]"
                placeholder="金额"
                :rules="[{ required: true, message: '请填写金额' }]"
              >
                <template #suffix>万元</template>
              </wd-input>
            </view>
            <wd-select-picker
              prop="purpose"
              placeholder="用途"
              v-model="model.purpose"
              :columns="purposeOp"
              :rules="[{ required: true, message: '请填写用途' }]"
            ></wd-select-picker>
            <wd-select-picker
              prop="term"
              placeholder="期限"
              v-model="model.term"
              :columns="termOp"
              :rules="[{ required: true, message: '请填写期限' }]"
            ></wd-select-picker>
            <wd-select-picker
              prop="guarantee_method"
              placeholder="担保方式"
              v-model="model.guarantee_method"
              :columns="selectOp"
              :rules="[{ required: true, message: '请填写担保方式' }]"
            ></wd-select-picker>
          </wd-cell-group>
        </wd-form>
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
import { financeAdd } from '@/service/index/main'

const { success, error } = useToast()

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
    .then(async ({ valid, errors }) => {
      if (valid) {
        const res = await financeAdd(model)
        if (res.code === 200) {
          success({
            msg: '发布成功',
          })
        }
      }
    })
    .catch((e) => {
      error({
        msg: '发布失败',
      })
    })
}
</script>

<style lang="scss"></style>
