import { defineUniPages } from '@uni-helper/vite-plugin-uni-pages'

export default defineUniPages({
  globalStyle: {
    navigationStyle: 'default',
    navigationBarTitleText: 'unibest',
    navigationBarBackgroundColor: '#f8f8f8',
    navigationBarTextStyle: 'black',
    backgroundColor: '#FFFFFF',
  },
  easycom: {
    autoscan: true,
    custom: {
      '^wd-(.*)': 'wot-design-uni/components/wd-$1/wd-$1.vue',
      '^(?!z-paging-refresh|z-paging-load-more)z-paging(.*)':
        'z-paging/components/z-paging$1/z-paging$1.vue',
      '^pf-(.*)': '@/components/pf-$1/pf-$1.vue',
    },
  },
  tabBar: {
    color: '#999',
    selectedColor: '#018d71',
    backgroundColor: '#F8F8F8',
    borderStyle: 'black',
    height: '50px',
    fontSize: '10px',
    iconWidth: '24px',
    spacing: '3px',
    list: [
      {
        iconPath: 'static/tabbar/home.png',
        selectedIconPath: 'static/tabbar/homeHL.png',
        pagePath: 'pages/index/index',
        text: '首页',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/about/about',
        text: '关于',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/home/index',
        text: 'home',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/demo1/index',
        text: 'demo1',
      },
      {
        iconPath: 'static/tabbar/example.png',
        selectedIconPath: 'static/tabbar/exampleHL.png',
        pagePath: 'pages/demo2/index',
        text: 'demo2',
      },
    ],
  },
})
