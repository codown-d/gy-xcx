import { http } from '@/utils/http'
import api from './api'

/** GET 请求 */
export const servicePolicy = (data: any) => {
  return http.get<any>(api.servicePolicy, data)
}
