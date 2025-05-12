<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '融资中心',
  },
}
</route>

<template>
  <scroll-view
    :scroll-y="true"
    class="h-100vh bg-#F8F8F8"
    @scroll="handleScroll"
    @scrolltolower="scrolltolower"
  >
    <wd-navbar
      :bordered="false"
      fixed
      safeAreaInsetTop
      customClass="search-navbar-layout"
      :custom-style="`background-color: rgba(255,255,255, ${opacity})!important`"
    >
      <template #title>
        <wd-search
          custom-class=" w-[320rpx] h-[64rpx] p-0! text-left bg-transparent!"
          :light="opacity > 0.5 ? false : true"
          placeholder="请输入"
          v-model="keyword"
          hide-cancel
          placeholder-left
        ></wd-search>
      </template>
    </wd-navbar>
    <view class="w-full h-[562rpx] relative">
      <image class="w-full h-[full]" src="/static/images/yjrz-bg.png" />
      <view class="absolute top-228rpx left-80rpx z-1">
        <view class="font-normal text-52rpx text-#333333">产品超市</view>
        <view class="font-400 text-24rpx text-#333333 mt-4rpx">小贷丨担保丨转贷丨保函丨基金</view>
      </view>

      <image
        class="absolute right-[44rpx] z-1 w-[270rpx] h-[270rpx]"
        src="/static/images/yjrz-bg.png"
        :style="'top:' + (safeAreaInsets?.top + 44) + 'px'"
      />
      <view
        class="absolute top-376rpx z-1 mx-[32rpx] match flex items-center w-[calc(100% - 62rpx)] py-[24rpx] px-[40rpx]"
        style="
          background: linear-gradient(180deg, rgba(240, 246, 255, 0.8) 0%, #ffffff 100%);
          border: 2rpx solid #ffffff;
          border-radius: 16rpx;
        "
      >
        <image class="w-84rpx h-84rpx mr-28rpx" src="/static/images/zcfw.png" />
        <view class="mr-32rpx">
          <view class="font-400 text-32rpx text-#333333">智能匹配</view>
          <view class="font-400 text-20rpx text-#999999">一键筛选您可能感兴趣的服务</view>
        </view>
        <wd-button
          custom-class="btn-bg! w-184rpx! h-64rpx! m-0! p-0! min-w-184rpx!"
          @click="navigateToSub('/smartMatching/smartMatching')"
          size="small"
        >
          立即匹配
        </wd-button>
      </view>
    </view>
    <view class="flex justify-between items-center px-48rpx bg-#ffffff rounded-b-32rpx">
      <view>
        <wd-sort-button
          custom-class="h-84rpx! leading-84rpx! mr-48rpx text-red!"
          v-model="rate_sort"
          :line="false"
          title="利率"
          :allow-reset="true"
          @change="
            ({ value }) => {
              change({ rate_sort: sortEmu[value] })
            }
          "
        />
        <wd-sort-button
          custom-class="h-84rpx! leading-84rpx! mr-48rpx"
          v-model="term_sort"
          :line="false"
          title="期限"
          :allow-reset="true"
          @change="
            ({ value }) => {
              change({ term_sort: sortEmu[value] })
            }
          "
        />
        <wd-sort-button
          custom-class="h-84rpx! leading-84rpx!"
          v-model="highest_money_sort"
          :line="false"
          title="最高额度"
          :allow-reset="true"
          @change="
            ({ value }) => {
              change({ highest_money_sort: sortEmu[value] })
            }
          "
        />
      </view>
      <view class="flex items-center justify-center" @click="show = true">
        <text class="iconfont shaixuan"></text>
        <view class="ml-12rpx font-400 text-#333333 text-28rpx">筛选</view>
      </view>
    </view>
    <view class="pt-16rpx overflow-hidden">
      <template v-for="item in dataList" :key="item.id">
        <pf-finance-card v-bind="item" @click="() => handleClick(item)"></pf-finance-card>
      </template>
    </view>
    <wd-loadmore :state="state" />
  </scroll-view>
  <wd-popup
    v-model="show"
    :z-index="9999"
    position="bottom"
    custom-style="border-top-left-radius:21rpx;border-top-right-radius:21rpx;"
  >
    <view class="h-128rpx flex justify-between items-center pl-32rpx pr-40rpx">
      <view class="font-500 text-32rpx text-#333333">筛选</view>
      <wd-icon name="close" size="32rpx" color="#EEEEEE" @click="show = false"></wd-icon>
    </view>
    <view class="h-714rpx overflow-y-auto px-32rpx">
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">融资主体</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="application_form"
            @change="
              ({ value }) => {
                change({
                  application_form: value,
                })
              }
            "
          >
            <wd-radio :value="item.value" v-for="item in applicationForm" :key="item.value">
              <view class="text-[24rpx]">
                {{ item.label }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">融资类型</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="finance_type"
            @change="
              ({ value }) => {
                change({
                  finance_type: value,
                })
              }
            "
          >
            <wd-radio :value="item.value" v-for="item in financeType" :key="item.value">
              <view class="text-[24rpx]">
                {{ item.label }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">机构类型</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="product_type"
            @change="
              ({ value }) => {
                change({
                  product_type: value,
                })
              }
            "
          >
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.value"
              v-for="item in productType"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.label }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">担保类型</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="data_type"
            @change="
              ({ value }) => {
                change({
                  data_type: value,
                })
              }
            "
          >
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.value"
              v-for="item in dataType"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.label }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">融资额度</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            :max-width="160"
            v-model="highest_money"
            @change="
              ({ value }) => {
                change({
                  highest_money: value,
                })
              }
            "
          >
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.value"
              v-for="item in highestMoney"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.label }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">融资期限</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="term"
            @change="
              ({ value }) => {
                change({
                  term: value,
                })
              }
            "
          >
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.value"
              v-for="item in termEmu"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.label }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
    </view>
    <view class="h-112rpx flex items-center justify-between px-32rpx">
      <wd-button plain custom-class="w-292rpx! h-80rpx! m-0" @click="rest">重置</wd-button>
      <wd-button custom-class="w-360rpx! h-80rpx! m-0" @click="submit">筛选</wd-button>
    </view>
  </wd-popup>
</template>

<script lang="ts" setup>
import { onShow } from '@dcloudio/uni-app'
import { product } from '@/service/index/main'
import {
  sortEmu,
  applicationForm,
  financeType,
  productType,
  dataType,
  highestMoney,
  termEmu,
  tabList,
} from '@/constant'
import { navigateTo, navigateToSub } from '@/utils'
import { LoadMoreState } from 'wot-design-uni/components/wd-loadmore/types'
import { debounce } from 'wot-design-uni/components/common/util'
import { getSystemInfoSync } from '@/utils/system'

const { safeAreaInsets } = getSystemInfoSync()
const show = ref(false)
const sendData = ref({})
const rate_sort = ref<number>(0)
const term_sort = ref<number>(0)
const highest_money_sort = ref<number>(0)
const dataList = ref([])

const application_form = ref()
const finance_type = ref()
const product_type = ref()
const data_type = ref()
const highest_money = ref()
const term = ref()
const opacity = ref(0)
const keyword = ref('')
const state = ref<LoadMoreState>('loading')
const page = ref<number>(1)
const handleScroll = (e: any) => {
  if (e.detail.scrollTop > 100) {
    opacity.value = 1
  } else {
    opacity.value = e.detail.scrollTop / 100
  }
}

const rest = () => {
  application_form.value = undefined
  finance_type.value = undefined
  product_type.value = undefined
  data_type.value = undefined
  highest_money.value = undefined
  term.value = undefined
  change({
    application_form: '',
    finance_type: '',
    product_type: '',
    data_type: '',
    highest_money: '',
    term: '',
  })
}
const submit = () => {
  show.value = false
}
const productFn = async () => {
  if (state.value !== 'loading') return
  const res = await product({
    ...sendData.value,
    page: page.value,
    limit: 10,
    keyword: keyword.value,
  })
  if (res?.dataList.length === 10) {
    page.value = page.value + 1
  } else {
    state.value = 'finished'
  }
  dataList.value = dataList.value.concat(res?.dataList)
}
const change = (data) => {
  page.value = 1
  keyword.value = ''
  sendData.value = Object.assign({}, sendData.value, data)
}

onShow(() => {
  const id = uni.getStorageSync('financeCenterId')
  uni.setStorageSync('financeCenterId', '')
  const node = tabList.find((item) => item.id === id)?.product_type
  product_type.value = node
  change({ product_type: node })
})
const scrolltolower = () => {
  productFn()
}
const handleClick = (item) => {
  navigateToSub('/productDetail/productDetail?id=' + item.id)
}
const refresh = debounce(() => {
  page.value = 1
  state.value = 'loading'
  dataList.value = []
  productFn()
}, 300)
watch(sendData, (val) => {
  refresh()
})
watch(keyword, (newVal, oldVal) => {
  refresh()
})
</script>
