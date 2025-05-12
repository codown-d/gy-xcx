import { FinanceDataTypeEmu } from '@/constant'
import { pages, subPackages } from '@/pages.json'
import { formatNumber } from '@/utils'

export const useNavigation = () => {
  const newSubPackages = subPackages.flatMap((item) =>
    item.pages.map((page) => ({
      ...page,
      path: `${item.root}/${page.path}`,
    })),
  )
  const currentPage = getCurrentPages()
  const cur = currentPage.at(-1)
  const getCurrentPage = (): any => {
    const node = [...pages, ...newSubPackages].filter((item) => item.path === cur.route)
    return node?.[0]
  }
  return {
    title: getCurrentPage().style.navigationBarTitleText,
    getCurrentPage,
  }
}

export const useFinanceCard = (props) => {
  const obj = {
    [FinanceDataTypeEmu.BankLoans]: '银行贷款',
    [FinanceDataTypeEmu.FinanceGuarantee]: '融资担保',
    [FinanceDataTypeEmu.Microloans]: '小额贷款',
    [FinanceDataTypeEmu.EquityFinancing]: '应急转贷',
    [FinanceDataTypeEmu.Insurance]: '保险',
  }
  return {
    data: computed(() => {
      const data = formatNumber(props.highest_money * 10000, 0)
      if (
        [
          FinanceDataTypeEmu.BankLoans,
          FinanceDataTypeEmu.Microloans,
          FinanceDataTypeEmu.FinanceGuarantee,
        ].includes(props.product_type)
      ) {
        return [
          {
            label: '最高额度',
            num: data.num,
            unit: data.unit,
          },
          {
            label: '最低费率',
            num: props.rate,
            unit: '%',
          },
          {
            label: '期限',
            num: `1-${props.term}`,
            unit: props.term_unit == 1 ? '天' : '个月',
          },
        ]
      } else if ([FinanceDataTypeEmu.EmergencyRefinancing].includes(props.product_type)) {
        return [
          {
            label: '认缴规模',
            num: data.num,
            unit: data.unit,
          },
        ]
      } else if ([FinanceDataTypeEmu.EquityFinancing].includes(props.product_type)) {
        return [
          {
            label: '最低费率',
            num: props.rate,
            unit: '%',
          },
        ]
      } else if ([FinanceDataTypeEmu.ElectronicGuarantee].includes(props.product_type)) {
        return [
          {
            label: '收费标准',
            tips: '以审批结果为准',
            num: props.rate,
            unit: '%',
          },
        ]
      } else {
        return [
          {
            label: '保额',
            num: data.num,
            unit: data.unit,
          },
          {
            label: '期限',
            num: `1-${props.term}`,
            unit: props.term_unit == 1 ? '天' : '个月',
          },
        ]
      }
    }),
    type: computed(() => {
      return obj[props.product_type]
    }),
    getType: (product_type) => {
      return obj[product_type]
    },
  }
}
