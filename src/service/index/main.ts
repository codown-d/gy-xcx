import { http } from '@/utils/http'
import api from './api'

/** GET 请求 */
export const servicePolicy = (data: any) => {
  return http.get<any>(api.servicePolicy, data)
}
export const quit = (data?: any) => {
  return http.get<any>(api.quit, data)
}
export const userRegister = (data: any) => {
  const token = uni.getStorageSync('uniqueToken')
  return http.post<any>(api.userRegister, data, { header: { token } })
}
export const unique = (data?: any) => {
  return http.get<any>(api.unique, data)
}
export const phoneLogin = (data?: any) => {
  const token = uni.getStorageSync('uniqueToken')
  return http.post<any>(api.phoneLogin, data, { header: { token } })
}
export const postImgCode = (body: any) => {
  const uniqueToken = uni.getStorageSync('uniqueToken')
  return http.post<any>(api.imgCode, body, { header: { token: uniqueToken } })
}
export const userLogin = (data?: any) => {
  const token = uni.getStorageSync('uniqueToken')
  return http.post<any>(api.userLogin, data, { header: { token } })
}
export const userInfo = (config?: any) => {
  return http.get<any>(api.userInfo, {}, config)
}
export const phoneCode = (data?: any) => {
  const token = uni.getStorageSync('uniqueToken')
  return http.post<any>(api.phoneCode, data, { header: { token } })
}
export const verifyPhoneCode = (data?: any) => {
  return http.post<any>(api.phoneCode, data)
}
export const verifyRegiste = (data?: any) => {
  const token = uni.getStorageSync('uniqueToken')
  return http.post<any>(api.verifyRegiste, data, { header: { token } })
}
export const userVerify = (data?: any) => {
  return http.post<any>(api.userVerify, data)
}
export const enterpriseVerify = (data?: any) => {
  return http.post<any>(api.enterpriseVerify, data)
}
export const policyDetail = (data?: any) => {
  const { id, ...otherData } = data
  return http.get<any>(`${api.policyDetail}/${id}`, otherData)
}
export const financeList = (data?: any) => {
  return http.get<any>(`${api.financeList}`, data)
}
export const applyList = (data?: any) => {
  return http.get<any>(`${api.applyList}`, data)
}
export const product = (data?: any) => {
  return http.get<any>(`${api.product}`, data)
}
export const productDetail = (data?: any) => {
  const { id } = data
  return http.get<any>(`${api.productDetail}/${id}`, data)
}
export const financeAdd = (data?: any) => {
  return http.post<any>(api.financeAdd, data)
}
export const themeFeature = (data?: any) => {
  return http.get<any>(api.themeFeature, data)
}
export const productApply = (data?: any) => {
  return http.post<any>(api.productApply, data)
}
export const productRecommend = (data?: any) => {
  return http.get<any>(api.productRecommend, data)
}
