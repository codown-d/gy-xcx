<route lang="json5" type="page">
{
  layout: 'authentication',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '实名认证',
  },
  bgType: 1,
  needLogin: true,
}
</route>

<template>
  <view class="px-[32rpx] pt-[200rpx] h-full overflow-auto">
    <wd-form ref="formIns" :model="form" :errorType="'toast'">
      <wd-cell-group border custom-class="form">
        <wd-input
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
          label="姓名"
          label-width="100px"
          prop="name"
          v-model="form.name"
          placeholder="请输入姓名"
          :rules="[{ required: true, message: '请填写姓名' }]"
        />
        <wd-input
          placeholder-style="font-weight: 400;font-size: 28rpx;color: #999999;"
          label="身份证号"
          label-width="100px"
          prop="idcard"
          v-model="form.idcard"
          placeholder="请输入身份证号"
          :rules="[{ required: true, message: '请填写身份证号' }]"
        />
      </wd-cell-group>
      <wd-cell-group border custom-class="form mt-[16rpx]">
        <wd-cell title="身份证正面照片" vertical>
          <wd-upload
            name="image"
            :multiple="false"
            :limit="1"
            accept="image"
            v-model="form.fileList"
            prop="fileList"
            image-mode="aspectFill"
            :action="uploadUrl"
            @change="onSuccess"
            :rules="[{ required: true, message: '请上传身份证照片' }]"
          >
            <image class="w-[128rpx] h-[128rpx]" src="/static/images/add.png" />
          </wd-upload>
        </wd-cell>
        <wd-col-picker
          label="详细地址"
          v-model="form.area"
          prop="area"
          :columns="area"
          @confirm="confirm"
          :column-change="columnChange"
          :rules="[{ required: true, message: '请填写详细地址' }]"
        ></wd-col-picker>
        <wd-textarea
          no-border
          auto-height
          v-model="form.address"
          placeholder="XXXXXX街道XXX办公楼B座XXX楼"
        />
      </wd-cell-group>
      <wd-cell-group border custom-class="form mt-[16rpx] mb-[138rpx]">
        <wd-input
          label="手机号"
          type="text"
          disabled
          v-model="form.phone"
          prop="phone"
          placeholder="请输入手机号"
        />
        <wd-input
          label="验证码"
          type="text"
          v-model="form.verify_phone_code"
          prop="verify_phone_code"
          placeholder="请填写验证码"
          :rules="[{ required: true, message: '请填写验证码' }]"
        >
          <template #suffix>
            <wd-count-down :time="60000" ref="countDown" :auto-start="false" @finish="onFinish">
              <template #default="{ current }">
                <wd-button
                  custom-class="ml-4"
                  type="text"
                  @click="postPhoneCodeFn"
                  :disabled="!!current.seconds"
                >
                  {{ current.seconds ? `${current.seconds}秒后可以重发` : '发送验证码' }}
                </wd-button>
              </template>
            </wd-count-down>
          </template>
        </wd-input>
      </wd-cell-group>
      <view class="footer">
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
import { SendType } from '@/constant'
import { useColPickerData } from '@/hooks/useColPickerData'
import api from '@/service/index/api'
import { userVerify, verifyPhoneCode } from '@/service/index/main'
import { useUserStore } from '@/store'
import { getEnvBaseUrl, navigateBack, showToast } from '@/utils'
const { colPickerData, findChildrenByCode } = useColPickerData()
const countDown = ref<any>(null)
const formIns = ref<any>(null)

const userStore = useUserStore()
const form = reactive({
  name: '',
  idcard: '',
  address: '',
  area: [],
  idcard_img: '',
  fileList: undefined,
  prov_id: '',
  city_id: '',
  area_id: '',
  phone: userStore.userInfo.phone || userStore.userInfo.user_name,
  verify_phone_code: '',
  click_protocol: true,
})
const area = ref<any[]>([
  colPickerData.map((item) => {
    return {
      value: item.value,
      label: item.text,
    }
  }),
])
const uploadUrl = `${getEnvBaseUrl()}${api.uploadImage}`
const onSuccess = ({ file, fileList, formData }) => {
  const response = JSON.parse(fileList[0]?.response || JSON.stringify({ file: '' }))
  form.idcard_img = response.file
}
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
const postPhoneCodeFn = async () => {
  const res = await verifyPhoneCode({
    phone: form.phone,
    send_type: SendType.Verify,
  })
  if (res.code === 200) {
    showToast('手机验证码已发送')
    countDown.value.start()
  }
}
const submit = async () => {
  const resForm = await formIns.value.validate()
  if (!resForm.valid) return
  const res = await userVerify(form)
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
