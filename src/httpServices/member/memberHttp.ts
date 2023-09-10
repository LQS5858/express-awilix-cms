import { IhttpConstructorParams, IserviceFnReturn } from '../../types/common'
import { axiosCatch } from '../../utils/axiosError'

export default class MemberHttp {
  $http: any
  constructor({ $http }: IhttpConstructorParams) {
    this.$http = $http
  }
  async login(): Promise<IserviceFnReturn> {
    try {
      return await this.$http.post('/trade/symbols', {})
    } catch (error) {
      return axiosCatch(error as string)
    }
  }
}
