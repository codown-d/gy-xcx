<route lang="json5" type="page">
{
  layout: 'authentication',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '企业认证',
  },
  bgType: 2,
  needLogin: true,
}
</route>

<template>
  <view class="px-[32rpx] pt-[200rpx] h-full">
    <wd-form ref="formIns" :model="form" :errorType="'toast'">
      <wd-cell-group border custom-class="form">
        <wd-input
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
          label="企业名称"
          label-width="100px"
          prop="name"
          v-model="form.name"
          placeholder="请输入企业名称"
          :rules="[{ required: true, message: '请填写企业名称' }]"
        />
        <wd-input
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
          label="统一信用代码"
          label-width="100px"
          prop="idcard"
          v-model="form.idcard"
          placeholder="请输入统一信用代码"
          :rules="[{ required: true, message: '请填写信用代码' }]"
        />
        <wd-cell title="营业执照上传" vertical>
          <wd-upload
            image-mode="aspectFill"
            name="image"
            :multiple="false"
            :limit="1"
            accept="image"
            v-model="form.fileList"
            prop="fileList"
            :action="uploadUrl"
            @change="onSuccess"
            :rules="[{ required: true, message: '请上传身份证照片' }]"
          >
            <image class="w-[128rpx] h-[128rpx]" src="/static/images/add.png" />
          </wd-upload>
        </wd-cell>
        <wd-input
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
          label="企业开户银行"
          label-width="100px"
          prop="bank_name"
          v-model="form.bank_name"
          placeholder="请输入企业开户银行"
          :rules="[{ required: true, message: '请填写企业开户银行' }]"
        />
        <wd-input
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
          label="企业开户账号"
          label-width="100px"
          prop="bank_no"
          v-model="form.bank_no"
          placeholder="请输入企业开户账号"
          :rules="[{ required: true, message: '请填写企业开户账号' }]"
        />
        <wd-col-picker
          label="详细地址"
          v-model="form.area"
          :columns="area"
          prop="area"
          :column-change="columnChange"
          @confirm="confirm"
          :rules="[{ required: true, message: '请填写详细地址' }]"
        ></wd-col-picker>
        <wd-textarea
          no-border
          auto-height
          v-model="form.address"
          placeholder="XXXXXX街道XXX办公楼B座XXX楼"
        />
      </wd-cell-group>
      <view class="footer mt-[20rpx]">
        <wd-button
          @click="submit"
          custom-class="btn-bg! w-[424rpx]! h-[80rpx]!"
          type="primary"
          size="large"
          block
        >
          提交
        </wd-button>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { useColPickerData } from '@/hooks/useColPickerData'
import api from '@/service/index/api'
import { enterpriseVerify } from '@/service/index/main'
import { getEnvBaseUrl, navigateBack, showToast } from '@/utils'
const { colPickerData, findChildrenByCode } = useColPickerData()
const formIns = ref<any>(null)

const form = reactive({
  name: '',
  idcard: '',
  click_protocol: true,
  fileList: [],
  bank_name: '',
  area: [],
  bank_no: '',
  address: '',
  prov_id: '',
  city_id: '',
  area_id: '',
  idcard_img: '',
})
const uploadUrl = `${getEnvBaseUrl()}${api.uploadImage}`
const onSuccess = ({ file, fileList, formData }) => {
  const response = JSON.parse(fileList[0]?.response || JSON.stringify({ file: '' }))
  form.idcard_img = response.file
}
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])

const columnChange = ({ selectedItem, resolve, finish }) => {
  const areaData = findChildrenByCode(colPickerData, selectedItem.value)
  if (areaData && areaData.length) {
    resolve(
      areaData.map((item) => {
        return {
          value: item.value,
          label: item.text,
        }
      }),
    )
  } else {
    finish()
  }
}

const confirm = ({ value, selectedItems }) => {
  form.prov_id = value[0]
  form.city_id = value[1]
  form.area_id = value[2]
}
const submit = async () => {
  const resForm = await formIns.value.validate()
  if (!resForm.valid) return
  const res = await enterpriseVerify(form)
  if (res.code === 200) {
    showToast('资料提交成功等待审核')
    navigateBack()
  }
}
</script>

<style scope lang="scss">
.form {
  overflow: hidden;
  border-radius: 24rpx;
  .wd-input {
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
          .wd-icon {
            font-size: 24rpx !important;
          }
        }
      }
    }
    &::after {
      left: 0 !important;
    }
  }
  .wd-cell {
    padding-left: 0 !important;
    .wd-cell__wrapper {
      padding: 32rpx !important;
      .wd-cell__right {
        margin-top: 24rpx;
      }
    }
  }
  .wd-col-picker {
    .wd-col-picker__field {
      .wd-col-picker__cell {
        padding: 32rpx 32rpx 24rpx !important;
        .wd-col-picker__label {
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
        .wd-col-picker__value {
          margin-right: 16rpx;
          text-align: right;
        }
        .wd-col-picker__value--placeholder {
          font-size: 28rpx;
          font-weight: 400;
          color: #999999;
        }
        &::after {
          left: 0 !important;
        }
      }
    }
  }
  .wd-textarea {
    padding: 0 32rpx 32rpx !important;

    .wd-textarea__inner {
      width: 622rpx;
      padding: 14rpx 32rpx;
      font-size: 28rpx;
      background: #f3f3f3;
      border-radius: 12rpx;
    }
    .wd-textarea__placeholder {
      font-size: 30rpx;
    }
  }
}
</style>
