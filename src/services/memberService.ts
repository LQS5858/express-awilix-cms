import { ImemberServiceDao, ImemberServicelogin } from '../types/memberService'
import Base from './base'

export default class MemberService extends Base {
  memberDao: ImemberServicelogin
  constructor({ memberDao }: ImemberServiceDao) {
    super()
    this.memberDao = memberDao
  }
  async login(params: object) {
    try {
      const [err, data] = await this.memberDao.login(params)
      if (err) return this.fail(null, err)
      return this.success(data)
    } catch (error) {
      return this.fail(null, error)
    }
  }
}
