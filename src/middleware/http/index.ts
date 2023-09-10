import { IexpressRequest, IexpressResponse } from '../../types/app'
import { Request, Response, NextFunction } from 'express'
import axios, { AxiosResponse } from 'axios'
import { IAxiosRequestConfig, IResponse, Ioptions } from './types'
import { asValue } from 'awilix'

export default function (
  req: IexpressRequest,
  res: IexpressResponse,
  next: NextFunction
) {
  const service = axios.create({
    timeout: 30000,
    baseURL: process.env.SERVICE_URI
  })
  service.interceptors.request.use((config: any) => {
    return config
  })
  // 统一service层处理响应
  service.interceptors.response.use(
    (axiosRes: IResponse) => {
      const { data: result } = axiosRes || {}
      return result
    },
    error => {
      if (error?.message) {
        return { data: null, msg: error?.message, code: 500 }
      }
      return { data: null, msg: error, code: 500 }
    }
  )

  /**
   * @description 同时提供单独定义一个get方法
   * @method get
   * @params url -接口地址
   * @params params -参数
   * @params resType -响应数据类型，针对二进制流文件
   * @params key -获取返回数据动态key
   */

  function get(options: Ioptions) {
    const { uri: url, body: params, key, resType } = options || {}
    let config = resType ? { params, resType } : { params }
    return service
      .get(url, config)
      .then((res: any) => res)
      .catch(err => err)
  }

  /**
   * @description 同时单独提供一个post方法
   * @method post
   * @params url -接口地址
   * @params body -参数
   * @params resType -响应数据类型，针对二进制流文件
   * @params key -获取返回数据动态key
  
   */

  function post(options: Ioptions) {
    const { uri: url, body, key, resType } = options || {}

    let config: IAxiosRequestConfig = resType ? { resType } : {}
    return service
      .post(url, body, config)
      .then((res: any) => res)
      .catch(err => err)
  }
  req.container.register({
    $http: asValue(service),
    $post: asValue(post),
    $get: asValue(get)
  })
  next()
}
