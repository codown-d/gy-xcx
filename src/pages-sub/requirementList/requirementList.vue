<route lang="json5">
{
  layout: 'common',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '需求列表',
    navigationBarBackgroundColor: '#F5F5F5',
    backgroundColor: '#F5F5F5',
  },
}
</route>

<template>
  <view class="mx-32rpx my-16rpx p-32rpx pb-0 bg-#ffffff rounded-24rpx">
    <template v-for="item in list" :key="item">
      <pf-mine-card
        :apply_money="item.apply_money"
        :term="item.term"
        :purpose="item.purpose"
        :action_status="item.action_status"
        :add_time="item.add_time"
      ></pf-mine-card>
    </template>
  </view>
</template>

<script lang="ts" setup>
import { applyList, financeList } from '@/service/index/main'

const list = ref([])
const getFinanceList = async (type) => {
  const fn = type === 'apply' ? applyList : financeList
  const res = await fn()
  if (res.code === 200) {
    list.value = res.dataList
  }
}
onLoad((options) => {
  options.type && getFinanceList(options.type)
})
</script>
<style scope lang="scss"></style>
