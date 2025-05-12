<route lang="json5">
{
  layout: 'login',
  style: {
    navigationStyle: 'custom',
    navigationBarTitleText: '登录',
  },
}
</route>

<template>
  <view class="form">
    <!-- 账号密码 -->
    <wd-form ref="form" :model="model" :errorType="'toast'">
      <view class="flex flex-col ml-[56rpx] mr-[56rpx]" v-if="step == 1">
        <view class="mb-[40rpx]">
          <wd-input
            custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
            type="text"
            v-model="model.user_name"
            prop="user_name"
            placeholder="账号"
            :rules="[{ required: true, message: '请填写账号' }]"
          />
        </view>
        <view class="mb-[40rpx]">
          <wd-input
            custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
            clearable
            show-password
            v-model="model.user_pass"
            prop="user_pass"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
        </view>
        <view>
          <wd-input
            custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
            type="text"
            v-model="model.verify_img_code"
            prop="verify_img_code"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #suffix>
              <view class="w-[256rpx] h-[84rpx]" @click="postImgCodeFn(SendType.UserLogin)">
                <img :src="imgCode" alt="" />
              </view>
            </template>
          </wd-input>
        </view>
      </view>
      <!-- 手机号 验证码 -->
      <view class="flex flex-col ml-[56rpx] mr-[56rpx]" v-if="step == 2">
        <view class="mb-[40rpx]">
          <wd-input
            custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
            type="text"
            prop="phone"
            v-model="model.phone"
            placeholder="手机号"
            :rules="[{ required: true, message: '请填写手机号' }]"
          />
        </view>
        <view>
          <wd-input
            custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
            type="text"
            v-model="model.verify_phone_code"
            prop="verify_phone_code"
            placeholder="验证码"
            :rules="[{ required: true, message: '请填写验证码' }]"
          >
            <template #suffix>
              <wd-count-down :time="60000" ref="countDown" :auto-start="false" @finish="onFinish">
                <template #default="{ current }">
                  <wd-button
                    custom-class="w-[240rpx] h-[80rpx]!"
                    type="primary"
                    @click="postPhoneCodeFn(SendType.Login)"
                    :disabled="!!current.seconds"
                  >
                    {{ current.seconds ? `${current.seconds}秒后可以重发` : '发送验证码' }}
                  </wd-button>
                </template>
              </wd-count-down>
            </template>
          </wd-input>
        </view>
      </view>
      <!-- 忘记密码  账号登录 短信登录 -->
      <view
        class="flex flex-col justify-center items-center ml-[56rpx] mr-[56rpx] mt-[30rpx] mb-[168rpx]"
        v-if="step == 1 || step == 2"
      >
        <view class="h-[136rpx] w-full">
          <view class="h-[32rpx] w-full flex justify-between items-center">
            <text class="text-[24rpx] text-[#3C5BF6]">忘记密码？</text>
            <text class="text-[24rpx] text-[#3C5BF6]" @click="handleStep(1)" v-show="step == 2">
              账号登录
            </text>
            <text class="text-[24rpx] text-[#3C5BF6]" @click="handleStep(2)" v-show="step == 1">
              短信登录
            </text>
          </view>
        </view>
        <wd-button custom-class="btn-bg! w-[550rpx] h-[80rpx]!" @click="handSubmit">
          立即登录
        </wd-button>
        <view class="text-[#333333] text-[24rpx] mt-[24rpx]">
          还没有账号？
          <text class="text-[#3D5AF5]" @click="handleStep(3)">立即注册</text>
        </view>
      </view>
    </wd-form>
    <wd-form ref="formReg" :model="modelReg" :errorType="'toast'">
      <view v-if="step == 3 || step == 4">
        <!-- 注册1 -->
        <view class="flex flex-col ml-[56rpx] mr-[56rpx]" v-show="step == 3">
          <view class="mb-[40rpx]">
            <wd-input
              custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
              type="text"
              v-model="modelReg.phone"
              prop="phone"
              placeholder="手机号"
              :rules="[{ required: true, message: '请填写手机号' }]"
            />
          </view>
          <view class="mb-[164rpx]">
            <wd-input
              custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
              type="text"
              v-model="modelReg.verify_phone_code"
              prop="verify_phone_code"
              placeholder="验证码"
              :rules="[{ required: true, message: '请填写验证码' }]"
            >
              <template #suffix>
                <wd-count-down
                  :time="time"
                  ref="countDownReg"
                  :auto-start="false"
                  @finish="onFinish"
                >
                  <template #default="{ current }">
                    <wd-button
                      custom-class="w-[240rpx] h-[80rpx]!"
                      type="primary"
                      @click="postPhoneCodeFn(SendType.Register)"
                      :disabled="!!current.seconds"
                    >
                      {{ current.seconds ? `${current.seconds}秒后可以重发` : '发送验证码' }}
                    </wd-button>
                  </template>
                </wd-count-down>
              </template>
            </wd-input>
          </view>
          <wd-button custom-class="btn-bg! w-[550rpx] h-[80rpx]!" @click="handRegister">
            下一步
          </wd-button>
          <view class="text-[#333333] text-[24rpx] mt-[24rpx] text-center">
            我有账号，
            <text class="text-[#3D5AF5]" @click="handleStep(1)">返回登录</text>
          </view>
        </view>
        <!-- 注册2 -->
        <view class="flex flex-col ml-[56rpx] mr-[56rpx]" v-show="step == 4">
          <view class="mb-[40rpx]">
            <wd-input
              custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
              type="text"
              clearable
              show-password
              v-model="modelReg.pass"
              placeholder="设置密码"
            />
          </view>
          <view class="mb-[40rpx]">
            <wd-input
              custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
              type="text"
              v-model="modelReg.pass_two"
              clearable
              show-password
              placeholder="确认密码"
            />
          </view>
          <view class="mb-[98rpx]">
            <wd-input
              custom-input-class="h-[112rpx]! pl-[24rpx]! text-[32rpx]!"
              type="text"
              v-model="modelReg.verify_img_code"
              placeholder="验证码"
            >
              <template #suffix>
                <view class="w-[256rpx] h-[84rpx]" @click="postImgCodeFn(SendType.Register)">
                  <img :src="imgCode" alt="" />
                </view>
              </template>
            </wd-input>
          </view>
          <wd-button custom-class="btn-bg! w-[550rpx] h-[80rpx]!" @click="handRegister">
            注册
          </wd-button>
          <view class="text-[#333333] text-[24rpx] mt-[24rpx] text-center">
            我有账号，
            <text class="text-[#3D5AF5]" @click="handleStep(1)">返回登录</text>
          </view>
          <!-- 协议 -->
          <view class="flex justify-center items-center mt-[120rpx]">
            <wd-checkbox v-model="modelReg.click_protocol" prop="readAgreement">
              <view class="text-[24rpx] text-[#333333]">
                我已阅读并同意
                <text class="text-[#3D5AF5]">《用户协议》</text>
                、
                <text class="text-[#3D5AF5]">《隐私协议》</text>
              </view>
            </wd-checkbox>
          </view>
        </view>
      </view>
    </wd-form>
  </view>
</template>

<script lang="ts" setup>
import { SendType } from '@/constant'
import {
  phoneCode,
  phoneLogin,
  postImgCode,
  userInfo,
  userLogin,
  userRegister,
  verifyRegiste,
} from '@/service/index/main'
import { useUserStore } from '@/store'
import { showToast } from '@/utils'
const userStore = useUserStore()
const form = ref()
const formReg = ref()
const countDown = ref<any>(null)
const countDownReg = ref<any>(null)
const time = ref<number>(60 * 1000)

const model = ref({
  user_name: '',
  user_pass: '',
  verify_img_code: '',
  phone: '',
  verify_phone_code: '',
})
const modelReg = ref({
  phone: '',
  verify_phone_code: '',
  pass: '',
  pass_two: '',
  verify_img_code: '',
  click_protocol: false,
  send_type: 'register',
})

// 1：账号密码
// 2：手机号
// 3：注册1
// 4 ：注册2
const step = ref(1)
onLoad((option) => {
  step.value = Number(option.step) || 1
})
const handleStep = (val) => {
  step.value = Number(val)
}
const imgCode = ref('')

const onFinish = () => {
  countDown.value.reset()
}
const postPhoneCodeFn = async (type) => {
  const res = await phoneCode({
    phone: type === SendType.Login ? model.value.phone : modelReg.value.phone,
    send_type: type,
  })
  if (res.code === 200) {
    showToast('手机验证码已发送')
    countDown.value.start()
  }
}
const postImgCodeFn = (type?: SendType) =>
  postImgCode({
    send_type: type || SendType.UserLogin,
  }).then((res) => {
    imgCode.value = res.img
  })
onMounted(() => {
  postImgCodeFn()
})
watch(step, (newValue, oldValue) => {
  if (newValue === 1) {
    postImgCodeFn(SendType.UserLogin)
  } else if (newValue === 4) {
    postImgCodeFn(SendType.Register)
  }
})
const handSubmit = async () => {
  const res = await form.value.validate()
  if (!res.valid) return
  const resLogin =
    step.value === 1
      ? await userLogin({
          user_name: model.value.user_name,
          user_pass: model.value.user_pass,
          verify_img_code: model.value.verify_img_code,
        })
      : await phoneLogin({
          phone: model.value.phone,
          verify_phone_code: model.value.verify_phone_code,
          send_type: SendType.Login,
        })
  if (resLogin.code === 200) {
    showToast(resLogin.desc)
    uni.setStorageSync('token', resLogin.token)
  } else {
    return
  }
  const resUserInfo = await userInfo({ header: { token: resLogin.token } })
  if (resUserInfo.code === 200) {
    userStore.setUserInfo(
      Object.assign({ token: resLogin.token as string }, resUserInfo.data as any),
    )
    uni.navigateBack()
  }
}
const handRegister = async () => {
  const res = await formReg.value.validate()
  if (!res.valid) return
  if (step.value === 3) {
    const res = await verifyRegiste({
      phone: modelReg.value.phone,
      send_type: SendType.Register,
      verify_phone_code: modelReg.value.verify_phone_code,
    })
    if (res.code === 200) {
      step.value = 4
    }
  } else {
    const res = await userRegister(modelReg.value)
    if (res.code === 200) {
      step.value = 1
      showToast('注册成功')
    }
  }
}
</script>
