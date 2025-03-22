import { pages } from '@/pages.json'

export const useNavigation = () => {
  const currentPage = getCurrentPages()
  const cur = currentPage.at(-1)
  const getCurrentPage = () => {
    const node = pages.filter((item) => item.path === cur.route)
    return node?.[0]
  }
  return {
    title: getCurrentPage().style.navigationBarTitleText,
    getCurrentPage,
  }
}
