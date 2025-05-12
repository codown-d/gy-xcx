<route lang="json5">
{
  layout: 'finance',
  style: {
    navigationBarTitleText: '个人中心',
    navigationStyle: 'custom',
  },
  needLogin: true,
  isTab: true,
}
</route>

<template>
  <view>
    <view class="pl-[56rpx]">
      <wd-cell
        :label="phoneFmt"
        custom-class="bg-transparent! pl-0!"
        custom-title-class="font-bold! text-[32rpx]"
      >
        <template #title>
          <view @click="goLogin" class="font-bold">
            {{ title }}
          </view>
        </template>
        <wd-icon name="setting1" size="22px" @click="navigateToSub('/setting/setting')"></wd-icon>
      </wd-cell>
      <view class="flex">
        <view class="flex py-[10rpx] px-[20rpx] bg-[#fff] rounded-[16rpx] items-center mr-[16rpx]">
          <wd-img :width="16" :height="16" :src="`/static/images${getUserStatus.imgUrl}`" />
          <text class="ml-[8rpx] text-[24rpx] text-[#ccc]" :style="getUserStatus.style">
            {{ getUserStatus.label }}
            <text
              v-if="getUserStatus.type == 1"
              class="text-[#3C5BF6]"
              @click="navigateToSub('/userVerify/userVerify')"
            >
              去认证
            </text>
          </text>
        </view>
        <view class="flex py-[10rpx] px-[20rpx] bg-[#fff] rounded-[16rpx] items-center">
          <wd-img :width="16" :height="16" :src="`/static/images${getEnterpriseStatus.imgUrl}`" />
          <text class="ml-[8rpx] text-[24rpx] text-[#ccc]" :style="getEnterpriseStatus.style">
            {{ getEnterpriseStatus.label }}
            <text
              v-if="getEnterpriseStatus.type == 1"
              class="text-[#3C5BF6]"
              @click="navigateToSub('/enterpriseVerify/enterpriseVerify')"
            >
              去认证
            </text>
          </text>
        </view>
      </view>
    </view>
    <wd-grid custom-class="bg-transparent!" bg-color="transparent">
      <wd-grid-item use-slot v-for="item in infoList" :key="item.title">
        <view class="text-[60rpx] font-bold">{{ item.num }}</view>
        <view class="text-[24rpx]">{{ item.title }}</view>
      </wd-grid-item>
    </wd-grid>
    <view class="px-[32rpx] h-[144rpx] relative">
      <view
        class="py-[14rpx] px-[32rpx] flex justify-between items-center bg-[#fff] mb-[16rpx] rounded-[24rpx]"
      >
        <view class="flex items-center">
          <wd-img
            width="100rpx"
            height="116rpx"
            :src="`/static/images/yjrz.png`"
            mode="aspectFit"
          />
          <view class="ml-[32rpx]">
            <view class="text-[38rpx] text-[#333] font-bold mb-1">一键融资</view>
            <view class="text-[24rpx] text-[#999]">一键触达，快速响应</view>
          </view>
        </view>
        <wd-button
          custom-class="btn-bg mr-[10rpx]"
          type="primary"
          @click="navigateTo('/finance/finance')"
          block
        >
          一键融资
        </wd-button>
      </view>
    </view>
    <view class="pt-[16rpx]">
      <wd-card custom-class="p-0!" custom-content-class="pb-[16rpx]" custom-footer-class="p-0!">
        <template #title>
          <view class="flex justify-between px-[30rpx]">
            <view class="flex items-center">
              <wd-icon name="goods" size="20px"></wd-icon>
              <view class="text-[32rpx] text-[#333] ml-2 font-bold">我的需求</view>
            </view>
            <view
              class="text-[#999] text-[24rpx] flex items-center"
              @click="() => handleClick('demand')"
            >
              全部
              <wd-icon name="arrow-right" size="24rpx"></wd-icon>
            </view>
          </view>
        </template>
        <view style="border-top: 2rpx solid #eeeeee" class="px-[30rpx] pt-[22rpx]">
          <template v-if="list.length !== 0">
            <template v-for="item in list" :key="item.id">
              <pf-mine-card
                :apply_money="item.apply_money"
                :term="item.term"
                :purpose="item.purpose"
                :action_status="item.action_status"
                :add_time="item.add_time"
              ></pf-mine-card>
            </template>
          </template>
          <wd-status-tip image="content" tip="暂无内容" v-else />
        </view>
      </wd-card>
      <wd-card custom-class="p-0!" custom-content-class="pb-[16rpx]" custom-footer-class="p-0!">
        <template #title>
          <view class="flex justify-between px-[30rpx]">
            <view class="flex items-center">
              <wd-icon name="list" size="20px"></wd-icon>
              <view class="text-[32rpx] text-[#333] ml-2 font-bold">我的申请</view>
            </view>
            <view
              class="text-[#999] text-[24rpx] flex items-center"
              @click="() => handleClick('apply')"
            >
              全部
              <wd-icon name="arrow-right" size="24rpx"></wd-icon>
            </view>
          </view>
        </template>
        <view style="border-top: 2rpx solid #eeeeee" class="px-[30rpx] pt-[22rpx]">
          <template v-if="apply.length !== 0">
            <template v-for="item in apply" :key="item.id">
              <pf-mine-card
                :apply_money="item.apply_money"
                :term="item.term"
                :purpose="item.purpose"
                :action_status="item.action_status"
                :add_time="item.add_time"
                :org="item.financial_organs.organs_name"
              ></pf-mine-card>
            </template>
          </template>
          <wd-status-tip image="content" tip="暂无内容" v-else />
        </view>
      </wd-card>
      <view>
        <pf-title title="智能匹配" customClass="ml-[68rpx]"></pf-title>
        <view class="pt-16rpx">
          <template v-for="item in dataList" :key="item.id">
            <pf-mfinance-card
              v-bind="item"
              @click="() => handleFinanceClick(item)"
            ></pf-mfinance-card>
          </template>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { goLogin, navigateTo, navigateToSub, replacePhoneNumber } from '@/utils'
import { applyList, financeList, productRecommend, userInfo } from '@/service/index/main'
import { useUserStore } from '@/store'
const userData = ref<any>(null!)
const financeApply = ref<any>(null!)
const list = ref<any>([])
const apply = ref<any>([])
const phoneFmt = computed(() => {
  if (!userData.value) return ''
  const phone = userData.value.phone || userData.value.user_name
  return replacePhoneNumber(phone, '****')
})
const getUserStatus = computed(() => {
  const obj = {
    1: {
      type: 1,
      label: '未实名认证',
      color: '#EEEEEE',
      imgUrl: '/wsmrz-icon.png',
      style: { color: '#999' },
    },
    2: {
      type: 2,
      label: '认证审核中',
      color: '#EEEEEE',
      imgUrl: '/wsmrz-icon.png',
      style: { color: '#999' },
    },
    3: {
      type: 3,
      label: '实名',
      imgUrl: '/smrz-icon.png',
      color: '#FFEEE3',
      style: { color: '#FF9958', fontWeight: 'bold' },
    },
  }
  return obj[userData.value?.verify_status || 1]
})
const getEnterpriseStatus = computed(() => {
  const obj = {
    1: {
      type: 1,
      label: '未企业认证',
      color: '#EEEEEE',
      imgUrl: '/wqyrz-icon.png',
      style: { color: '#999' },
    },
    2: {
      type: 2,
      label: '认证审核中',
      color: '#EEEEEE',
      imgUrl: '/wqyrz-icon.png',
      style: { color: '#999' },
    },
    3: {
      type: 3,
      label: '企业',
      imgUrl: '/qyrz-icon.png',
      color: '#FFEEE3',
      style: { color: '#3D5AF5', fontWeight: 'bold' },
    },
  }
  return obj[userData.value?.enterprise_verify_status || 1]
})

const infoList = computed(() => [
  {
    title: '总需求',
    num: financeApply.value?.apply_count || 0,
    imgUrl: '/images/zxq.png',
  },
  {
    title: '待受理需求',
    num: financeApply.value?.apply_count_not || 0,
    imgUrl: '/images/dslxq.png',
  },
  {
    title: '总申请',
    num: financeApply.value?.finance_count || 0,
    imgUrl: '/images/zsq.png',
  },
  {
    title: '待受理申请',
    num: financeApply.value?.finance_count_not || 0,
    imgUrl: '/images/dslsq.png',
  },
])
const getFinanceList = async () => {
  const res = await financeList()
  if (res.code === 200) {
    list.value = res.dataList.slice(0, 2)
  }
  const res1 = await applyList()
  if (res1.code === 200) {
    apply.value = res1.dataList.slice(0, 2)
  }
}
const userStore = useUserStore()

const title = computed(() => {
  return userStore.isLogined ? '用户名' : '未登录'
})
const dataList = ref([])
const productRecommendFn = async () => {
  const res: any = await productRecommend()
  dataList.value = res.data
}
onLoad((options) => {
  productRecommendFn()
})
onShow(async () => {
  if (userStore.isLogined) {
    const resUserInfo = await userInfo()
    if (resUserInfo.code === 200) {
      userData.value = resUserInfo.data
      financeApply.value = resUserInfo.finance_apply
    }
    getFinanceList()
  }
})
const handleClick = (type) => {
  navigateToSub('/requirementList/requirementList?type=' + type)
}
const handleFinanceClick = (item) => {
  navigateToSub('/productDetail/productDetail?id=' + item.id)
}
</script>
