<template>
  <view :class="customClass" v-if="productType !== FinanceDataTypeEmu.EmergencyRefinancing">
    <view class="mt-3 text-left leading-[14px]">
      {{
        productType === FinanceDataTypeEmu.Insurance
          ? '种类'
          : productType === FinanceDataTypeEmu.ElectronicGuarantee
            ? '保函形式'
            : '担保方式'
      }}：{{ dataTypeLabel }}
    </view>
  </view>
  <view v-else></view>
</template>

<script lang="ts" setup>
import { computed, defineProps, defineEmits, PropType } from 'vue'
import { FinanceDataTypeEmu, FinanceItemProps, collateralOp, insurance_type } from '@/constant'

const props = defineProps({
  customClass: String, // Vue 3 setup 模式，接收 class
  productType: {
    type: Number as unknown as PropType<FinanceDataTypeEmu>, // ✅ workaround，TS 允许
    required: false,
  },
  dataType: {
    type: Array as PropType<string[]>,
    required: false,
  },
})
const useDataType = (dataInfo: any) => {
  if (FinanceDataTypeEmu.Insurance === dataInfo?.productType) {
    return Object.keys(insurance_type)
      .map((item) => {
        return {
          label: insurance_type[item].text,
          value: item + '',
        }
      })
      .reduce((pre: any[], item) => {
        if (dataInfo?.dataType?.includes(item.value)) {
          pre?.push?.(item.label)
        }
        return pre
      }, [])
      .join('/')
  } else {
    return collateralOp
      .reduce((pre: any[], item) => {
        if (dataInfo?.dataType?.includes(item.value)) {
          pre?.push?.(item.label)
        }
        return pre
      }, [])
      .join('/')
  }
}
const dataTypeLabel = computed(() => useDataType(props))
const customClass = computed(() => props.customClass)
</script>
<style></style>
