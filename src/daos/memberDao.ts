import Base from './base'

export default class MemberDao extends Base {
  modelName = 'member'
  async login(params: object) {
    try {
      let result = await this.insert(params)
      return result
    } catch (error) {
      return [error]
    }
  }
}
