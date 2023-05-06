
import Base from './base'
export default class MemberService extends Base {
  constructor({ memberDao }) {
    super()
    this.memberDao = memberDao
  }
  async login (params) {
    try {
      const [err, data] = await this.memberDao.login(params)
      if (err) return this.fail(null, err)
      return this.success(data)
    } catch (error) {
      return this.fail(null, error)
    }
  }
}