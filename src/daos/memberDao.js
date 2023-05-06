import { extend } from 'lodash'
import Base from './base'


export default class MemberDao extends Base {
  modelName = 'member'
  async login (params) {
    try {
      return await this.insert(params)
    } catch (error) {
      return [error]
    }
  }
}