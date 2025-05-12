import { defineStore } from 'pinia'
import { ref } from 'vue'

const initState = {
  nickname: '',
  avatar: '',
  phone: null,
  enterprise_verify_status: 1,
  verify_status: 1,
  user_name: '',
  user_pass: '',
  user_pass_view: '',
  token: '',
}

export const useUserStore = defineStore(
  'user',
  () => {
    const userInfo = ref<IUserInfo>({ ...initState })

    const setUserInfo = (val: IUserInfo) => {
      userInfo.value = val
    }

    const clearUserInfo = () => {
      userInfo.value = { ...initState }
    }
    // 一般没有reset需求，不需要的可以删除
    const reset = () => {
      userInfo.value = { ...initState }
    }
    const isLogined = computed(() => !!userInfo.value.token)

    return {
      userInfo,
      setUserInfo,
      clearUserInfo,
      isLogined,
      reset,
    }
  },
  {
    persist: true,
  },
)
