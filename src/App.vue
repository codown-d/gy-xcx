<script setup lang="ts">
import { onLaunch, onShow, onHide } from '@dcloudio/uni-app'
import 'abortcontroller-polyfill/dist/abortcontroller-polyfill-only'
import { unique } from './service/index/main'

onLaunch(() => {
  const uniqueToken = uni.getStorageSync('uniqueToken')
  if (!uniqueToken) {
    unique().then((res) => {
      uni.setStorageSync('uniqueToken', res.token)
    })
  }
})
onShow(() => {
  // console.log('App Show')
})
onHide(() => {
  // console.log('App Hide')
})
</script>

<style lang="scss">
/* stylelint-disable selector-type-no-unknown */
button::after {
  border: none;
}

swiper,
scroll-view {
  flex: 1;
  height: 100%;
}
.scroll-container {
  height: 100vh; /* 设置高度限制 */
  overflow-y: scroll; /* 启用垂直方向滚动 */
}
image {
  width: 100%;
  height: 100%;
  vertical-align: middle;
}
view {
  box-sizing: border-box;
}
// 单行省略，优先使用 unocss: text-ellipsis
.ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

// 两行省略
.ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

// 三行省略
.ellipsis-3 {
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}

.btn-bg {
  background: linear-gradient(90deg, #3c5bf6 0%, #7b9df1 100%) !important;
  box-shadow: 0rpx 16rpx 24rpx 0rpx rgba(0, 8, 170, 0.16) !important;
}

.search-navbar-layout {
  .wd-navbar__content {
    .wd-navbar__title {
      padding-top: 12rpx;
      margin-left: 216rpx !important;
      .wd-search__input {
        font-weight: 400;
      }
    }
  }
}
.product-tab {
  .wd-tabs__nav {
    height: 92rpx !important;
    border-bottom: 2rpx solid #eeeeee;
  }
  .wd-tabs__nav-item {
    height: 92rpx !important;
    &.is-active {
      .wd-tabs__nav-item-text {
        font-size: 32rpx;
        font-weight: 500;
        color: #333333;
      }
    }
    .wd-tabs__nav-item-text {
      font-size: 32rpx;
      font-weight: 400;
      color: #999999;
    }
  }
  .wd-tabs__line {
    bottom: 0 !important;
    width: 60rpx !important;
    height: 4rpx !important;
  }
}

.policy-tab {
  .wd-tabs__nav {
    height: 80rpx !important;
    border-bottom: 2rpx solid #eeeeee;
  }
  .wd-tabs__nav-item {
    height: 80rpx !important;
    &.is-active {
      .wd-tabs__nav-item-text {
        font-size: 32rpx;
        font-weight: 500;
        color: #3c5bf6;
      }
    }
    .wd-tabs__nav-item-text {
      font-size: 32rpx;
      font-weight: 400;
      color: #999999;
    }
  }
  .wd-tabs__line {
    bottom: 0 !important;
    width: 48rpx !important;
    height: 4rpx !important;
  }
}
.container {
  width: 100vw;
  min-height: 100vh;
  overflow: hidden;
  background-color: #f8f8f8;
  background-repeat: no-repeat; /* 不重复 */
  background-position: top; /* 居中对齐 */
  background-size: 100% auto; /* 覆盖整个页面 */
}
</style>
