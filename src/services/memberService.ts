import { IaxiosError, IserviceFnReturn } from '../types/common'
import { ImemberServiceDao, ImemberServicelogin } from '../types/memberService'
import { axiosErrorFormat } from '../utils/axiosError'
import Base from './base'

export default class MemberService extends Base {
  memberDao: ImemberServicelogin
  $http: any
  memberHttp: any
  constructor({ memberDao, $http, memberHttp }: ImemberServiceDao) {
    super()
    this.memberDao = memberDao
    this.$http = $http
    this.memberHttp = memberHttp
  }
  async login(): Promise<IserviceFnReturn> {
    try {
      // const [err, data] = await this.memberDao.login(params)
      const { data, msg, code } = await this.memberHttp.login()
      if (code !== 200) return this.fail(null, msg, code)
      return this.success(data, null, code)
    } catch (error) {
      const err = axiosErrorFormat(error as any) as IaxiosError
      return this.fail(null, err?.message, err?.code)
    }
  }
}
