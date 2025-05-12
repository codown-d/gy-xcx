import { CustomRequestOptions } from '@/interceptors/request'
import { goLogin, showToast } from '.'
import { useUserStore } from '@/store'

export type CustomRequestOptionsProps = CustomRequestOptions & {
  config?: Record<string, any>
}
export const http = <T>(options: CustomRequestOptionsProps) => {
  const userStore = useUserStore()
  // 1. 返回 Promise 对象
  return new Promise<IResData<T>>((resolve, reject) => {
    const { config, ...otherOptions } = options
    uni.request({
      ...otherOptions,
      ...config,
      dataType: 'json',
      // #ifndef MP-WEIXIN
      responseType: 'json',
      // #endif
      // 响应成功
      success(res) {
        // 状态码 2xx，参考 axios 的设计
        if (res.statusCode >= 200 && res.statusCode < 300) {
          // 2.1 提取核心数据 res.data

          const data = res.data as ApiResponse<{ code: number }>
          if (data.code !== 200) {
            !options.hideErrorToast && showToast(data.desc)
            if (data.code === 401) {
              userStore.clearUserInfo()
              goLogin()
            }
          }
          resolve(res.data as IResData<T>)
        } else if (res.statusCode === 401) {
          // 401错误  -> 清理用户信息，跳转到登录页
          userStore.clearUserInfo()
          goLogin()
          reject(res)
        } else {
          // 其他错误 -> 根据后端错误信息轻提示
          !options.hideErrorToast && showToast((res.data as ApiResponse<T>).desc)
          reject(res)
        }
      },
      // 响应失败
      fail(err) {
        showToast('网络错误，换个网络试试')
        reject(err)
      },
    })
  })
}

/**
 * GET 请求
 * @param url 后台地址
 * @param query 请求query参数
 * @returns
 */
export const httpGet = <T>(
  url: string,
  query?: Record<string, any>,
  config?: Record<string, any>,
) => {
  return http<T>({
    url,
    query,
    method: 'GET',
    config,
  })
}

/**
 * POST 请求
 * @param url 后台地址
 * @param data 请求body参数
 * @param query 请求query参数，post请求也支持query，很多微信接口都需要
 * @returns
 */
export const httpPost = <T>(
  url: string,
  data?: Record<string, any>,
  config?: Record<string, any>,
) => {
  return http<T>({
    url,
    query: data,
    data,
    method: 'POST',
    config,
  })
}

http.get = httpGet
http.post = httpPost
