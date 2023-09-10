import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface IAxiosRequestConfig extends AxiosRequestConfig {
  showError?: boolean
  resType?: string
}

export interface IresponseConfig {
  showError?: boolean
  headers: any
}
export interface IResponse extends AxiosResponse {
  config: IresponseConfig
}

export interface Ioptions {
  uri: string
  body?: object
  showError?: boolean
  key?: string
  resType?: string
}
