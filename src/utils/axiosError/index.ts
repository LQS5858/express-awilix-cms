import { IserviceFnReturn } from './../../types/common/index'
import { IaxiosError } from '../../types/common'

export const axiosErrorFormat = (
  err: Record<string, any> | string
): IaxiosError | string => {
  if (typeof err === 'string') return err
  let error: IaxiosError = {} as IaxiosError
  error.message = (err as Record<string, any>)?.message
  error.code = (err as Record<string, any>)?.response?.status
  return error
}

export const axiosCatch = (
  err: Record<string, any> | string
): IserviceFnReturn => {
  const error: IaxiosError | string = axiosErrorFormat(err)
  return {
    data: null,
    msg: (error as any)?.message ? (error as any)?.message : error,
    code: 500
  }
}
