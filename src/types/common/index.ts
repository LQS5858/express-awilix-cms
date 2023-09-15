export interface IaxiosError {
  message: string
  code: number
}

export interface IserviceFnReturn {
  msg: string | null
  code: number
  data: Record<string, any> | null
}

export interface IhttpConstructorParams {
  $http: any
}
