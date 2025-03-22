import { ConfigProviderThemeVars } from 'wot-design-uni/components/wd-config-provider/types'

export const tabList = [
  { id: 'wydk', img: 'wydk.png', label: '我要贷款' },
  { id: 'wyzd', img: 'wyzd.png', label: '我要转贷' },
  { id: 'wydb', img: 'wydb.png', label: '我要担保' },
  { id: 'wybh', img: 'wybh.png', label: '我要保函' },
  { id: 'gqrz', img: 'gqrz.png', label: '股权融资' },
]

export const themeVars: ConfigProviderThemeVars = {
  colorTheme: '#3C5BF6',
  buttonPrimaryBgColor: '#3C5BF6',
}
export const purposeOp = [
  {
    label: '生产经营',
    value: '1',
  },
  {
    label: '创业助业',
    value: '2',
  },
  {
    label: '购买资产',
    value: '3',
  },
  {
    label: '归还贷款',
    value: '4',
  },
]
export const termOp = [3, 12, 24, 36].map((item, index) => ({
  label: item + '个月内',
  value: index + 1,
}))
export enum GuaranteeMethodEmu {
  /** 信用 */
  Credit = '1',
  /**  抵质押 */
  LoanPledge = '2',
  /**  保证 */
  Guarantee = '3',
  /**  组合 */
  Combination = '4',
  /**  电子保函 */
  ElectronicGuarantee = 'electronicGuarantee',
  /**  纸质保函 */
  PaperGuarantee = 'paperGuarantee',
}
export const selectOp = [
  {
    label: '信用',
    value: GuaranteeMethodEmu.Credit,
  },
  {
    label: '抵质押',
    value: GuaranteeMethodEmu.LoanPledge,
  },
  {
    label: '保证',
    value: GuaranteeMethodEmu.Guarantee,
  },
  {
    label: '组合',
    value: GuaranteeMethodEmu.Combination,
  },
]
