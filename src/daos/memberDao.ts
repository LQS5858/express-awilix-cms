import Base from './base'

export default class MemberDao extends Base {
  modelName = 'member'
  async login(params: object) {
    try {
      let [err, data] = await this.insert(params)
      if (err) {
        return [err?.errors]
      }
      return [null, data]
    } catch (error) {
      return [error]
    }
  }
}
