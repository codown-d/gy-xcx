<route lang="json5" type="page">
{
  layout: 'authentication',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '产品申请',
  },
  bgType: 3,
}
</route>

<template>
  <view class="px-[32rpx] pt-[124rpx] h-full pb-[200px]">
    <wd-cell-group custom-class="form">
      <wd-picker
        v-if="product_type != FinanceDataTypeEmu.ElectronicGuarantee"
        label="类型"
        :columns="newMicroloansOp"
        v-model="form.verify_type"
        prop="verify_type"
        @confirm="confirm"
      />
      <wd-input
        custom-class="custom-wd-input"
        :label="
          product_type == FinanceDataTypeEmu.ElectronicGuarantee ? '客户名称' : '公司名称/姓名'
        "
        :disabled="true"
        prop="name"
        v-model="form.name"
        placeholder="请输入"
        suffix-icon="arrow-right"
        placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
      />
      <wd-input
        custom-class="custom-wd-input"
        label="证件号码"
        :disabled="true"
        v-model="form.idcard"
        placeholder="请输入证件号码"
        suffix-icon="arrow-right"
        placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
      />
      <wd-cell
        custom-class="pl-32rpx! custom-wd-cell"
        title="申请金额"
        custom-value-class="cell-left"
      >
        <view class="flex items-center justify-end">
          <wd-input
            no-border
            custom-style="display: inline-block; width: 70px; vertical-align: middle"
            placeholder="请输入金额"
            v-model="form.apply_money"
          />
          <view class="inline-txt text-[#000] pl-2">万元</view>
          <wd-icon name="arrow-right" size="22px"></wd-icon>
        </view>
      </wd-cell>
      <wd-cell
        custom-class="pl-32rpx! custom-wd-cell"
        title="申请期限"
        custom-value-class="cell-left"
      >
        <view class="flex items-center justify-end">
          <wd-input
            no-border
            custom-style="display: inline-block; width: 70px; vertical-align: middle"
            placeholder="请输入"
            v-model="form.term"
          />
          <view class="inline-txt text-[#000] pl-2">月</view>
          <wd-icon name="arrow-right" size="22px"></wd-icon>
        </view>
      </wd-cell>
      <wd-picker label="反担保措施" :columns="selectOp" v-model="form.guarantee_method" />
      <view v-if="product_type == FinanceDataTypeEmu.ElectronicGuarantee">
        <wd-input
          custom-class="custom-wd-input"
          label="项目名称"
          v-model="form.project_name"
          placeholder="请输入项目名称"
          suffix-icon="arrow-right"
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
        />
        <wd-input
          custom-class="custom-wd-input"
          label="保函受益人名称"
          v-model="form.beneficiary"
          placeholder="请输入保函受益人名称"
          suffix-icon="arrow-right"
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
        />
      </view>
      <view v-else>
        <wd-picker label="用途" :columns="purposeOp" v-model="form.purpose" />
        <wd-picker label="还款方式" :columns="repaymentMethodOp" v-model="form.repayment_method" />
        <wd-input
          custom-class="custom-wd-input"
          label="联系方式"
          v-model="form.user_name"
          :disabled="true"
          placeholder="请输入联系方式"
          suffix-icon="arrow-right"
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
        />
      </view>
    </wd-cell-group>
    <view class="footer mt-[122rpx]">
      <wd-button
        custom-class="btn-bg! w-[424rpx]! h-[80rpx]!"
        type="primary"
        size="large"
        block
        @click="submit"
      >
        提交申请
      </wd-button>
    </view>
  </view>
</template>

<script lang="ts" setup>
import {
  MicroloansOp,
  selectOp,
  purposeOp,
  repaymentMethodOp,
  FinanceDataTypeEmu,
} from '@/constant'
import { productApply } from '@/service/index/main'
import { useUserStore } from '@/store'
import { navigateBack, showToast } from '@/utils'

const { userInfo } = useUserStore()
const form = ref({
  verify_type: undefined,
  name: '',
  idcard: '',
  apply_money: '',
  term: '',
  term_unit: 2,
  guarantee_method: '',
  purpose: '',
  repayment_method: '',
  user_name: '',

  beneficiary: '',
  project_name: '',
})

const newMicroloansOp = computed(() => {
  return MicroloansOp.map((item) => {
    if (item.value === '2') {
      return {
        ...item,
        disabled: userInfo?.enterprise_verify_status !== 3,
        label: item.label,
      }
    } else if (item.value === '1') {
      return {
        ...item,
        disabled: userInfo?.verify_status !== 3,
        label: item.label,
      }
    } else {
      return {}
    }
  })
})
const confirm = (value) => {
  const { verify_type } = form.value
  if (verify_type == 1) {
    form.value = Object.assign({}, form.value, {
      name: userInfo?.realname.name,
      idcard: userInfo?.realname.idcard,
      user_name: userInfo?.user_name,
    })
  } else if (verify_type == 2) {
    form.value = Object.assign({}, form.value, {
      name: userInfo?.enterprise.name,
      idcard: userInfo?.enterprise.idcard,
      user_name: userInfo?.user_name,
    })
  }
}

const product_id = ref()
const product_type = ref()
const submit = () => {
  productApply({
    product_id: product_id.value,
    product_type: product_type.value,
    ...form.value,
  }).then((res) => {
    if (res.code == 200) {
      showToast(res.desc)
      navigateBack()
    }
  })
}

onLoad((options) => {
  product_id.value = options.product_id
  product_type.value = options.product_type
  if (product_type.value == FinanceDataTypeEmu.ElectronicGuarantee) {
    form.value = Object.assign({}, form.value, {
      name: userInfo?.enterprise.name,
      idcard: userInfo?.enterprise.idcard,
    })
  }
})
</script>

<style scope lang="scss">
.form {
  overflow: hidden;
  border-radius: 24rpx;
  .wd-picker {
    .wd-picker__field {
      .wd-picker__cell {
        padding: 28rpx 32rpx !important;
        .wd-picker__label {
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
        .wd-picker__body {
          .wd-picker__value-wraper {
            .wd-picker__value {
              margin-right: 0;
              text-align: right;
            }
            .wd-picker__placeholder {
              font-size: 28rpx;
              font-weight: 400;
              color: #999999;
            }
          }
        }
      }
    }
  }

  :deep(.custom-wd-cell) {
    padding-left: 32rpx !important;
    .wd-cell__wrapper {
      padding-top: 28rpx;
      padding-bottom: 28rpx;
      .wd-cell__left {
        margin-right: 0;
        .wd-cell__title {
          view {
            font-size: 28rpx;
            font-weight: 400;
            color: #333333;
          }
        }
      }
      .wd-input__inner {
        text-align: right;
      }
    }
  }
  .custom-wd-input {
    padding: 28rpx 32rpx !important;
    .wd-input__label {
      .wd-input__label-inner {
        font-size: 28rpx;
        font-weight: 400;
        color: #333333;
      }
    }
    .wd-input__body {
      .wd-input__value {
        .wd-input__inner {
          text-align: right;
        }
        .wd-input__suffix {
          margin-left: 0 !important;
        }
      }
    }
  }
  .wd-icon {
    margin-left: 20rpx;
    font-size: 32rpx !important;
    color: rgba(0, 0, 0, 0.3);
  }
  .inline-txt {
    display: inline-block;
    margin-left: 5rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #999999;
    vertical-align: middle;
  }
}
</style>
