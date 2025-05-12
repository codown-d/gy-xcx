// 全局要用的类型放到这里

declare global {
  interface ApiResponse<T> {
    code: number
    desc: string
    data: T
  }
  type IResData<T> = {
    code: number
    msg: string
    data: ApiResponse<T>
    [x: string]: any
  }

  // uni.uploadFile文件上传参数
  type IUniUploadFileOptions = {
    file?: File
    files?: UniApp.UploadFileOptionFiles[]
    filePath?: string
    name?: string
    formData?: any
  }

  type IUserInfo = {
    nickname?: string
    avatar?: string
    /** 微信的 openid，非微信没有这个字段 */
    openid?: string
    token?: string
    phone?: number
    user_name: string
    user_pass: string
    user_pass_view: string
    verify_status: number
    enterprise_verify_status: number
    realname: { name: string; idcard: string }
    enterprise: { name: string; idcard: string }
    user_name: string
  }
}

export {} // 防止模块污染
