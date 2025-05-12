<route lang="json5">
{
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '政策中心',
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
      @click-left="handleClickLeft"
      :bordered="false"
      fixed
      safeAreaInsetTop
      customClass="search-navbar-layout"
      :custom-style="`background-color: rgba(255,255,255, ${opacity})!important`"
    >
      <template #title>
        <wd-search
          custom-class="w-[320rpx] h-[64rpx] p-0! text-left bg-transparent!"
          :light="opacity > 0.5 ? false : true"
          placeholder="请输入"
          placeholderStyle="color:#ccc;font-size:24rpx"
          v-model="keyword"
          hide-cancel
          placeholder-left
        ></wd-search>
      </template>
    </wd-navbar>
    <view class="w-full h-[376rpx]">
      <image class="w-full h-[full]" src="/static/images/zcfw.png" mode="widthFix" />
      <view class="relative top--157rpx left-80rpx z-1" v-if="false">
        <view class="font-normal text-52rpx text-#333333">政策服务</view>
        <view class="font-400 text-24rpx text-#333333 mt-4rpx">国家级 | 升级 | 市级</view>
      </view>
    </view>
    <wd-tabs
      custom-class="policy-tab"
      @change="
        ({ index }) => {
          change({
            area_type: index,
          })
        }
      "
    >
      <block v-for="item in areaTypeOp" :key="item.value">
        <wd-tab :title="item.label">
          <scroll-view :scroll-x="true">
            <view class="py-8rpx flex items-center px-16rpx" v-if="item.children">
              <view
                v-for="item1 in item.children"
                :key="item1.value"
                @click="sendData.area_type = item1.value"
                :class="{ active: sendData.area_type == item1.value }"
                class="label mr-[32rpx] py-16rpx px-20rpx bg-#F5F5F5 rounded-12rpx font-400 text-#666666 text-24rpx min-w-112rpx flex items-center justify-center"
              >
                {{ item1.label }}
              </view>
            </view>
          </scroll-view>
        </wd-tab>
      </block>
    </wd-tabs>
    <view class="flex justify-between items-center px-48rpx bg-#ffffff rounded-b-32rpx">
      <wd-sort-button
        custom-class="h-84rpx! leading-84rpx!"
        v-model="add_time_sort"
        :line="false"
        title="发布时间"
      />
      <view class="flex items-center justify-center" @click="show = true">
        <text class="iconfont shaixuan"></text>
        <view class="ml-12rpx font-400 text-#333333 text-28rpx">筛选</view>
      </view>
    </view>
    <view class="pt-16rpx">
      <template v-for="item in policyList" :key="item.id">
        <view @click="handleClick(item)">
          <pf-policy-card :title="item.title" :desc="item.summary">
            <template #footer>
              <view class="flex justify-between text-[#999] text-[20rpx]">
                <view>发布时间：{{ timeFormat(item.add_time, 'YYYY年MM月DD日') }}</view>
                <view>信息来源：{{ item.area_type_desc }}</view>
              </view>
            </template>
          </pf-policy-card>
        </view>
      </template>
      <wd-loadmore :state="state" />
    </view>
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
        <view class="font-500 text-28rpx text-#CCCCCC">按主题</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="sendData.theme_id"
            @change="
              ({ value }) => {
                change({
                  theme_id: value,
                })
              }
            "
          >
            <wd-radio custom-class="mb-[8rpx]" :value="0">
              <view class="text-[24rpx]">全部</view>
            </wd-radio>
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.id"
              v-for="item in termEmu?.theme"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.name }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">按特色</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="sendData.feature_id"
            @change="
              ({ value }) => {
                change({
                  feature_id: value,
                })
              }
            "
          >
            <wd-radio custom-class="mb-[8rpx]" :value="0">
              <view class="text-[24rpx]">全部</view>
            </wd-radio>
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.id"
              v-for="item in termEmu?.feature"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.name }}
              </view>
            </wd-radio>
          </wd-radio-group>
        </view>
      </view>
      <view class="mb-32rpx">
        <view class="font-500 text-28rpx text-#CCCCCC">按时间</view>
        <view class="mt-16rpx flex gap-16rpx flex-wrap">
          <wd-radio-group
            shape="button"
            v-model="sendData.start"
            @change="
              ({ value }) => {
                change({
                  start: value,
                })
              }
            "
          >
            <wd-radio custom-class="mb-[8rpx]" :value="0">
              <view class="text-[24rpx]">全部</view>
            </wd-radio>
            <wd-radio
              custom-class="mb-[8rpx]"
              :value="item.id"
              v-for="item in termEmu?.start"
              :key="item.value"
            >
              <view class="text-[24rpx]">
                {{ item.name }}
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
import { areaTypeOp } from '@/constant'
import { servicePolicy, themeFeature } from '@/service/index/main'
import { navigateToSub, timeFormat } from '@/utils'
import { debounce } from 'wot-design-uni/components/common/util'
import { LoadMoreState } from 'wot-design-uni/components/wd-loadmore/types'
const opacity = ref(0)
const keyword = ref('')
const handleScroll = (e: any) => {
  if (e.detail.scrollTop > 100) {
    opacity.value = 1
  } else {
    opacity.value = e.detail.scrollTop / 100
  }
}
const handleClickLeft = () => {
  uni.navigateBack()
}
const scrolltolower = () => {
  getData()
}
const show = ref(false)
const termEmu = ref({ feature: [], theme: [], start: [] })
const state = ref<LoadMoreState>('loading')
const page = ref<number>(1)
const add_time_sort = ref<number>(0)
const sendData = ref({
  theme_id: 0,
  feature_id: 0,
  start: 0,
  area_type: 0,
})
const rest = () => {
  change({
    theme_id: 0,
    feature_id: 0,
    start: 0,
    area_type: 0,
  })
}

const submit = () => {
  show.value = false
}
const change = (data) => {
  sendData.value = Object.assign({}, sendData.value, data)
}
const getPolicyDetail = async () => {
  const res: any = await themeFeature()
  if (res.code === 200) {
    const { theme, feature } = res
    termEmu.value = {
      theme,
      feature,
      start: new Array(5).fill('').map((item, index) => {
        return {
          id: new Date().getFullYear() - index,
          name: new Date().getFullYear() - index,
        }
      }),
    }
  }
}
const policyList = ref([])
const getData = async () => {
  if (state.value !== 'loading') return
  const res = await servicePolicy({
    ...sendData.value,
    page: page.value,
    limit: 10,
    keyword: keyword.value,
    add_time_sort: add_time_sort.value === 0 ? 'desc' : 'asc',
  })
  if (res?.dataList.length === 10) {
    page.value = page.value + 1
  } else {
    state.value = 'finished'
  }
  policyList.value = policyList.value.concat(res?.dataList)
}
const handleClick = (item) => {
  navigateToSub(`/policyDetails/policyDetails?id=${item.id}`)
}
onLoad((options) => {
  getPolicyDetail()
  getData()
})
const refresh = debounce(() => {
  page.value = 1
  state.value = 'loading'
  policyList.value = []
  getData()
}, 300)
watch(add_time_sort, (newVal, oldVal) => {
  refresh()
})
watch(keyword, (newVal, oldVal) => {
  refresh()
})
</script>

<style lang="scss" scoped>
.label.active {
  color: #ffffff;
  background: #3c5bf6;
}
.wd-search__placeholder-txt {
  color: #ccc;
}
</style>
