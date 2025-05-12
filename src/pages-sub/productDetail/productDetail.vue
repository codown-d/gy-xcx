<route lang="json5">
{
  layout: 'searchNavbar',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '产品详情',
  },
}
</route>

<template>
  <image
    class="w-full h-562rpx"
    src="https://q4.itc.cn/images01/20241017/4cf3fe55a9584eb0b2c111f9e0baabfd.jpeg"
  />
  <view class="px-32rpx relative top--348rpx pb-32rpx">
    <view class="bg-#ffffff w-686rpx pt-20rpx px-32rpx pb-40rpx rounded-24rpx">
      <view class="flex items-center mb-40rpx">
        <view class="flex flex-col items-center pr-32rpx left mr-30rpx">
          <image class="w-116rpx h-116rpx mb-28rpx" :src="dataInfo.financial_organs?.logo" />
          <view class="font-bold text-#585858 text-24rpx leading-36rpx">
            {{ dataInfo.financial_organs?.organs_name }}
          </view>
        </view>
        <view class="flex-1">
          <view class="flex items-start mb-36rpx">
            <text class="font-bold text-#333333 text-40rpx mr-16rpx max-w-[67%]">
              {{ dataInfo.name }}
            </text>
            <view class="marker-bg" v-if="type">{{ type }}</view>
          </view>
          <view class="flex items-center">
            <text class="iconfont dingwei text-[#3D5AF5] text-24rpx"></text>
            <view class="ml-8rpx text-[#3D5AF5] text-[24rpx] font-400">
              {{ dataInfo.financial_organs?.area_desc }}
            </view>
          </view>
        </view>
      </view>
      <pf-btn
        custom-class="w-622rpx! h-80rpx! text-32rpx rounded-[40rpx] justify-center"
        @click="clickApply"
      >
        立即申请
      </pf-btn>
    </view>
    <view class="mt-20rpx" v-if="FinanceDataTypeEmu.EmergencyRefinancing != dataInfo.product_type">
      <pf-product-time-card v-bind="dataInfo" />
    </view>
    <view
      v-if="
        dataInfo.product_type === FinanceDataTypeEmu.BankLoans ||
        dataInfo.product_type === FinanceDataTypeEmu.Microloans ||
        dataInfo.product_type === FinanceDataTypeEmu.FinanceGuarantee ||
        dataInfo.product_type === FinanceDataTypeEmu.EquityFinancing
      "
    >
      <view class="mt-16rpx">
        <pf-product-desc-card title="服务对象" img="/static/images/fwdx.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.service_object }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="产品介绍" img="/static/images/cpjs.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.product_intro }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="申请条件" img="/static/images/sqtj.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.application_condition }}
          </view>
        </pf-product-desc-card>
      </view>

      <view class="mt-16rpx">
        <wd-tabs customClass="product-tab rounded-24rpx overflow-hidden" color="#3C5BF6">
          <block v-for="item in tabs" :key="item.title">
            <wd-tab :title="item.title">
              <view class="px-32rpx py-32rpx text-[24rpx]">{{ item.desc }}</view>
            </wd-tab>
          </block>
        </wd-tabs>
      </view>
    </view>
    <view v-if="dataInfo.product_type === FinanceDataTypeEmu.EmergencyRefinancing">
      <view class="mt-16rpx">
        <pf-product-desc-card :isTitle="false">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.fund_company_intro }}
          </view>
          <view class="pb-40rpx px-32rpx flex items-center">
            <image class="w-48rpx h-48rpx mr-16rpx" src="/static/images/dbed.png" />
            <view class="text-28rpx text-#333333 font-400">
              地址：{{ dataInfo.financial_organs.area_desc }}{{ dataInfo.financial_organs.address }}
            </view>
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="基金简介" img="/static/images/cpjs.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.product_intro }}
          </view>
        </pf-product-desc-card>
      </view>
    </view>
    <view v-if="dataInfo.product_type === FinanceDataTypeEmu.ElectronicGuarantee">
      <view class="mt-16rpx">
        <pf-product-desc-card title="担保期限" img="/static/images/dbed.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.term_desc }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="服务对象" img="/static/images/fwdx.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.service_object }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="受益人" img="/static/images/dbed.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">{{ dataInfo.beneficiary || '-' }}</view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="产品介绍" img="/static/images/cpjs.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.product_intro }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="申请资料" img="/static/images/dbed.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.application_info }}
          </view>
        </pf-product-desc-card>
      </view>
    </view>
    <view v-if="dataInfo.product_type === FinanceDataTypeEmu.Insurance">
      <view class="mt-16rpx">
        <pf-product-desc-card title="服务对象" img="/static/images/fwdx.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.service_object }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="产品介绍" img="/static/images/cpjs.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.product_intro }}
          </view>
        </pf-product-desc-card>
      </view>
      <view class="mt-16rpx">
        <pf-product-desc-card title="申请资料" img="/static/images/dbed.png">
          <view class="px-32rpx py-32rpx text-[24rpx]">
            {{ dataInfo.application_info }}
          </view>
        </pf-product-desc-card>
      </view>
    </view>
    <wd-overlay :show="show" @click="show = false">
      <view class="flex justify-center items-center h-full">
        <view class="w-[80%] bg-[#fff] p-[16px] rounded-[16px]" @click.stop="">
          <view class="text-xl font-bold mb-4 flex justify-center mb-10">业务申请</view>
          <view class="flex">
            <view class="mb-8 text-[16px]">请您联系：</view>
            <view>
              <view class="text-[#3D5AF5] text-[18px] font-bold">
                <a href="tel:0839-3271399">0839-3271399</a>
              </view>
              <view class="text-[#999] text-[12px]">工作日：09:00-18:00 在线</view>
            </view>
          </view>
        </view>
      </view>
    </wd-overlay>
  </view>
</template>

<script lang="ts" setup>
import { productDetail } from '@/service/index/main'
import { FinanceDataTypeEmu, FinancingEntityEmu } from '@/constant'
import { navigateTo, navigateToSub, redirectTo, showToast } from '@/utils'
import { useUserStore } from '@/store'

const tabs = ref([])
const show = ref(false)
const dataInfo = ref<any>({ financial_organs: undefined, product_type: 0 })
const type = ref()
const { userInfo } = useUserStore()
const clickApply = () => {
  const { token, verify_status, enterprise_verify_status } = userInfo
  if (
    [FinanceDataTypeEmu.EmergencyRefinancing, FinanceDataTypeEmu.Insurance].includes(
      dataInfo.value?.product_type,
    )
  ) {
    show.value = true
    return
  }
  if (!token) {
    redirectTo('/other-login/other-login?step=1')
  } else if (verify_status === 3 || enterprise_verify_status === 3) {
    const { id, product_type } = dataInfo.value
    if (FinanceDataTypeEmu.ElectronicGuarantee == product_type && enterprise_verify_status !== 3) {
      return showToast('暂无权限请企业实名之后申请！')
    }
    navigateToSub(
      `/productApplication/productApplication?product_id=${id}&product_type=${product_type}`,
    )
  } else {
    showToast('暂无权限请实名之后申请！')
  }
}
const { getType } = useFinanceCard(dataInfo.value)
const productDetailFn = async (id) => {
  const res: any = await productDetail({ id })
  if (res.code === 200) {
    dataInfo.value = res.data
    type.value = getType(res.data?.product_type)
    if (
      [
        FinanceDataTypeEmu.BankLoans,
        FinanceDataTypeEmu.Microloans,
        FinanceDataTypeEmu.FinanceGuarantee,
        FinanceDataTypeEmu.EquityFinancing,
      ].includes(res.data.product_type)
    ) {
      if (res.data?.application_form === FinancingEntityEmu.Enterprise) {
        tabs.value.push({
          title: '企业申请资料',
          desc: res.data?.application_info_enterprise,
        })
      } else if (res.data?.application_form === FinancingEntityEmu.Personal) {
        tabs.value.push({
          title: '个人申请资料',
          desc: res.data?.application_info_user,
        })
      } else if (res.data?.application_form === FinancingEntityEmu.All) {
        tabs.value = [
          {
            title: '企业申请资料',
            desc: res.data?.application_info,
          },
          {
            title: '个人申请资料',
            desc: res.data?.application_info,
          },
        ]
      }
    }
  }
}
onLoad((options) => {
  options.id && productDetailFn(options.id)
})
</script>
<style lang="scss" scoped>
.marker-bg {
  padding: 8rpx 20rpx;
  font-size: 24rpx;
  font-weight: bold;
  color: #ffffff;
  background: linear-gradient(270deg, #7b9df1 0%, #3c5bf6 100%);
  border-radius: 24rpx 8rpx 24rpx 8rpx;
}
.left {
  position: relative;
  &::after {
    position: absolute;
    top: 16rpx;
    right: 0;
    width: 2rpx;
    height: 160rpx;
    content: '';
    background: #eeeeee;
  }
}
.wd-tabs__nav-item {
  height: 92rpx;
}
</style>
