import { ConfigProviderThemeVars } from 'wot-design-uni/components/wd-config-provider/types'

export const tabList = [
  { id: 'wydk', img: 'wydk.png', label: '我要贷款', product_type: 2 },
  { id: 'wyzd', img: 'wyzd.png', label: '我要转贷', product_type: 4 },
  { id: 'wydb', img: 'wydb.png', label: '我要担保', product_type: 3 },
  { id: 'wybh', img: 'wybh.png', label: '我要保函', product_type: 7 },
  { id: 'gqrz', img: 'gqrz.png', label: '股权融资', product_type: 5 },
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
export const action_status_filter = {
  // 1已申请，2未受理，3办理中，4谢绝，5完成
  1: {
    text: '已申请',
    status: 'Default',
    style:
      'background: linear-gradient( 90deg, #F6913C 0%, #FFC673 100%);border-radius: 0rpx 24rpx 0rpx 21rpx;',
  },
  2: {
    text: '未受理',
    status: 'Processing',
    style:
      'background: linear-gradient( 90deg, #F6913C 0%, #FFC673 100%);border-radius: 0rpx 24rpx 0rpx 21rpx;',
  },
  3: {
    text: '办理中',
    status: 'Success',
    style:
      'background: linear-gradient( 90deg, #F6913C 0%, #FFC673 100%);border-radius: 0rpx 24rpx 0rpx 21rpx;',
  },
  4: {
    text: '谢绝',
    status: 'Error',
    style:
      'background: linear-gradient( 90deg, #F63C3C 0%, #FF9C7E 100%);border-radius: 0rpx 24rpx 0rpx 21rpx;',
  },
  5: {
    text: '完成',
    status: 'Success',
    style:
      'background: linear-gradient(90deg, #3c5bf6 0%, #7b9df1 100%);border-radius: 0rpx 24rpx 0rpx 21rpx;',
  },
}
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
export enum SendType {
  Login = 'login',
  UserLogin = 'user_login',
  Register = 'register',
  Verify = 'verify',
}
export const Verify = {
  1: '未实名',
  2: '未实名',
  3: '已实名',
}
export enum FinancingEntityEmu {
  All = 1,
  /** 企业 */
  Enterprise = 2,
  /** 个人 */
  Personal = 3,
  OneOf = 4,
}
export const applicationFormOp = [
  {
    label: '企业',
    value: FinancingEntityEmu.Enterprise,
  },
  {
    label: '个人',
    value: FinancingEntityEmu.Personal,
  },
]

export enum FinanceDataTypeEmu {
  /** 银行贷款 */
  BankLoans = 1,
  /** 小额贷款 */
  Microloans = 2,
  /** 融资担保 */
  FinanceGuarantee = 3,
  /** 应急转贷 */
  EquityFinancing = 4,
  /** 股权融资 基金 */
  EmergencyRefinancing = 5,
  /* 保险 */
  Insurance = 6,
  /** 电子保函 */
  ElectronicGuarantee = 7,
}
export enum FinancingTypeEmu {
  /** 政策性 */
  Policy = 2,
  /**  商业性 */
  Commercial = 1,
}
export enum InstitutionTypeEmu {
  /** 银行 */
  Bank = 1,
  /**  担保 */
  Guaranteed = 3,
  /**  小额贷款 */
  SmallLoan = 2,
  /**  基金 */
  Fund = 5,
}
export enum TabType {
  service = 'service',
  credit = 'credit',
}
export interface FinanceItemProps {
  tabType: TabType
  add_time?: number
  id: string | number
  fo_id?: number
  logoUrl: string // logo
  financial_organs: {
    organs_name: string
    logo: string
    area_desc: string
  }
  // 产品类型
  product_type: FinanceDataTypeEmu
  application_form: 0 | 1 | 2 | 3 | 4
  application_info: string
  application_condition: string
  productType: FinanceDataTypeEmu
  name: string
  rateDown: string
  rateUp: string
  rate: number | string
  term: number // 贷款期限
  term_desc: string
  term_unit: 1 | 2
  amount: number
  success_count: number
  // 融资主体
  financingEntity: FinancingEntityEmu
  // 融资类型
  financingType: FinancingTypeEmu
  // 机构类型
  institutionType: InstitutionTypeEmu
  // 担保类型
  dataType: GuaranteeMethodEmu[] | GuaranteeFormEmu[]
  // 产品介绍
  productIntroduction?: string
  repayment_method?: string[]
  // 服务对象
  serviceObjects?: string
  applicationConditions?: string[]
  // 担保额度
  guaranteeAmount?: string
  // 担保期限
  guaranteePeriod?: string
  // 受益人
  beneficiary?: string
  // 申请资料
  applicationInformation?: string
  // 基金介绍
  product_intro?: string
  // 基金公司介绍
  fund_company_intro?: string
  // 位置
  application_info_user: string // 个人
  application_info_enterprise: string // 企业
}
export const insurance_type = {
  1: {
    text: '财产险',
  },
  2: {
    text: '责任险',
  },
  3: {
    text: '寿险',
  },
  4: {
    text: '意外险',
  },
  5: {
    text: '保证险',
  },
  6: {
    text: '综合险',
  },
}
export enum GuaranteeFormEmu {
  /**  电子保函 */
  ElectronicGuarantee = '1',
  /**  纸质保函 */
  PaperGuarantee = '2',
}
export const collateralOp = [
  {
    label: '电子保函',
    value: GuaranteeFormEmu.ElectronicGuarantee,
  },

  {
    label: '纸质保函',
    value: GuaranteeFormEmu.PaperGuarantee,
  },
]
export const repaymentMethodOp = [
  {
    label: '按周期付息,到期还本',
    value: '1',
  },
  {
    label: '分期还款',
    value: '2',
  },
  {
    label: '一次性还本付息',
    value: '3',
  },
  {
    label: '随借随还',
    value: '4',
  },
]
export const sortEmu = {
  '1': 'asc',
  '0': '',
  '-1': 'desc',
}

export const applicationForm = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '企业',
    value: 2,
  },
  {
    label: '个人',
    value: 3,
  },
]
export const financeType = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '政策性',
    value: 2,
  },
  {
    label: '商业性',
    value: 1,
  },
]
export const productType = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '银行',
    value: FinanceDataTypeEmu.BankLoans,
  },
  {
    label: '担保',
    value: FinanceDataTypeEmu.FinanceGuarantee,
  },
  {
    label: '小额贷款',
    value: FinanceDataTypeEmu.Microloans,
  },
  {
    label: '基金',
    value: FinanceDataTypeEmu.EmergencyRefinancing,
  },
  {
    label: '转贷',
    value: FinanceDataTypeEmu.EquityFinancing,
  },
  {
    label: '保函',
    value: FinanceDataTypeEmu.ElectronicGuarantee,
  },
  {
    label: '保险',
    value: FinanceDataTypeEmu.Insurance,
  },
]
export const dataType = [
  {
    label: '全部',
    value: 0,
  },
  ...selectOp,
]
export const highestMoney = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '0-50万（含）',
    value: 1,
  },
  {
    label: '50万-100万（含）',
    value: 2,
  },
  {
    label: '100万-500万（含）',
    value: 3,
  },
  {
    label: '500万以上',
    value: 4,
  },
]
export const termEmu = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '6个月以下',
    value: 1,
  },
  {
    label: '12个月及以下',
    value: 2,
  },
  {
    label: '36个月及以下',
    value: 3,
  },
  {
    label: '60个月及以下',
    value: 4,
  },
]

export const areaTypeOp = [
  {
    label: '全部',
    value: 0,
  },
  {
    label: '国家级',
    value: 1,
  },
  {
    label: '省级',
    value: 2,
  },
  {
    label: '市级',
    value: 3,
  },
  {
    label: '县级',
    value: 4,
    children: [
      {
        label: '利州区',
        value: 510802,
      },
      {
        label: '昭化区',
        value: 510811,
      },
      {
        label: '朝天区',
        value: 510812,
      },
      {
        label: '旺苍县',
        value: 510821,
      },
      {
        label: '青川县',
        value: 510822,
      },
      {
        label: '剑阁县',
        value: 510823,
      },
      {
        label: '苍溪县',
        value: 510824,
      },
    ],
  },
]
export const MicroloansOp = [
  {
    label: '公司',
    value: '2',
  },
  {
    label: '自然人',
    value: '1',
  },
]

export const dataSource = [
  {
    id: 1,
    resource: '数据资源梳理盘点',
    module:
      '根据企业的实际情况，制定访谈问卷及调研计划并开展调研工作，对企业所持有的数据资源进行全面梳理和盘点，明确待入表数据资源的来源、类型、权属、数量、质量、使用情况等信息，帮助甲方更有效更直观的反应拟入表的企业数据资源整体情况。',
    resource2: ['数据资源清单', '数据资源盘点报告'],
  },
  {
    id: 2,
    resource: '数据资源合规确权咨询',
    module:
      '根据相关法律法规和政策要求，对企业持有的企业数据资源的合规性进行评估，并根据评估结果帮助企业明确数据资源持有权、数据加工使用权、数据产品经营权等权利归属，对可能通过整改取得的权属给出合规指引，对不合规的情形提出整改建议，确保企业数据资源的合规使用和保护。',
    resource2: ['数据资源合规评估报告', '及整改建议'],
  },
  {
    id: 3,
    resource: '数据资源价值挖掘',
    module:
      '通过专业的场景化应用分析方法和技术手段，从内部使用或对外交付客户使用的潜在收益角度，深入挖掘企业合法拥有并控制的企业数据资源的潜在价值，帮助企业更好地认识和理解自身数据资源的价值，明确企业数据资源价值落地路径。',
    resource2: ['数据资源价值评估报告'],
  },
  {
    id: 4,
    resource: '数据产品开发咨询',
    module:
      '根据《企业数据资源相关会计处理暂行规定》(财会〔2023〕11号)，结合企业工作规划，梳理出企业财务部门可以确认为无形资产或存货的企业数据资源清单，通过专业的场景化应用分析方法和技术对本合同服务期内企业可能通过数据产品开发形成可以确认为无形资产或存货的数据产品清单，经与企业协商确认后，帮助甲方明晰企业数据产品开发路径。',
    resource2: ['数据产品开发指引'],
  },
  {
    id: 5,
    resource: '数据资产存证登记',
    module:
      '为企业提供一套“"数据资产管理系统(单机版软件)"供企业管理本咨询服务范围内可以确认为无形资产或存货的数据资源;依托工作站基于互联网的“数据要素服务工作站网站”和“数据产品存证登记系统”为企业确认为无形资产或存货的数据资源提供上链存证和登记，并向企业发放“数据产品存证登记凭证/证书”。',
    resource2: ['数据产品存证登记凭证/证书'],
  },
  {
    id: 6,
    resource: '数据资源会计处理咨询',
    module:
      '根据《企业数据资源相关会计处理暂行规定》(财会〔2023〕11号)，结合企业的实际情况，通过深入调研分析，帮助企业财务部门对拟入表的数据资源的相关交易和事项进行会计确认、计量和报告包括对拟确认为无形资产的数据资源进行初始计量、后续计量、处置和报废的实务指引，对拟确认头存货的数据资源进行初始计量和后续计量的实务指引，对相关数据资源的列示和披露的实务指引。',
    resource2: ['数据资源会计处理指引'],
  },
]
