<template>
  <view class="w-686rpx p-32rpx pt-0 bg-#ffffff rounded-32rpx">
    <wd-grid :column="3">
      <wd-grid-item use-slot v-for="(item, index) in data" :key="index" custom-class="pb-0!">
        <view class="flex flex-col mr-[16rpx]">
          <view class="text-left mb-[8rpx] text-[20rpx] ml-[12rpx] text-[#333]">
            {{ item.label }}
          </view>
          <view
            class="flex text-[#3D5AF5] items-center h-[76rpx] text-[44rpx] font-bold bg-[#F9F9F9] rounded-[16rpx] px-[16rpx]"
          >
            <view>{{ item.num }}</view>
            <view class="text-[24rpx] mt-[12rpx] ml-[4rpx] whitespace-nowrap">{{ item.unit }}</view>
          </view>
          <view class="text-[20rpx] text-[#ccc] text-left mt-[8rpx] ml-[12rpx]">
            {{ item?.tips }}
          </view>
        </view>
      </wd-grid-item>
    </wd-grid>
    <view
      v-if="
        FinanceDataTypeEmu.EmergencyRefinancing != props.product_type &&
        FinanceDataTypeEmu.Insurance != props.product_type
      "
      :class="`${data.length == 0 ? 'pt-32rpx' : ''}`"
    >
      <view
        v-if="FinanceDataTypeEmu.ElectronicGuarantee === props.product_type"
        class="mb-[16rpx] w-full h-44rpx border-2rpx border-#DDDDDD border-solid flex items-center rounded-12rpx overflow-hidden"
      >
        <view class="font-500 text-#999999 text-20rpx py-12rpx px-16rpx bg-#EEEEEE w-[112rpx]">
          保函形式
        </view>
        <view class="font-500 text-#333333 text-20rpx py-12rpx px-16rpx flex-1">
          {{ guaranteeFormStr }}
        </view>
      </view>
      <view v-else>
        <view
          class="mb-[16rpx] w-full h-44rpx border-2rpx border-#DDDDDD border-solid flex items-center rounded-12rpx overflow-hidden"
        >
          <view class="font-500 text-#999999 text-20rpx py-12rpx px-16rpx bg-#EEEEEE w-[112rpx]">
            担保方式
          </view>
          <view class="font-500 text-#333333 text-20rpx py-12rpx px-16rpx flex-1">
            {{ dataTypeStr }}
          </view>
        </view>
        <view
          class="mb-[16rpx] w-full h-44rpx border-2rpx border-#DDDDDD border-solid flex items-center rounded-12rpx overflow-hidden"
        >
          <view class="font-500 text-#999999 text-20rpx py-12rpx px-16rpx bg-#EEEEEE w-[112rpx]">
            还款方式
          </view>
          <view class="font-500 text-#333333 text-20rpx py-12rpx px-16rpx flex-1">
            {{ repaymentMethodStr }}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { repaymentMethodOp, selectOp, FinanceDataTypeEmu, collateralOp } from '@/constant'
import { computed, defineProps } from 'vue'
const props = defineProps({
  highest_money: Number,
  product_type: Number,
  rate: Number,
  term: Number,
  data_type: Array,
  term_unit: Number,
  repayment_method: Array,
  guarantee_form: Array,
})
const { data } = useFinanceCard(props)
const dataTypeStr = computed(() => {
  return props.data_type
    ?.map((value) => selectOp.find((item) => item.value === value)?.label)
    .filter(Boolean)
    .join('/')
})
const repaymentMethodStr = computed(() => {
  return props.repayment_method
    ?.map((value) => repaymentMethodOp.find((item) => item.value === value)?.label)
    .filter(Boolean)
    .join('/')
})
const guaranteeFormStr = computed(() => {
  return props.guarantee_form
    ?.map((value) => collateralOp.find((item) => item.value == value)?.label)
    .filter(Boolean)
    .join('/')
})
</script>
