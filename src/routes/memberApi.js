import bodyParser from "body-parser";

import { route, POST, before } from 'awilix-express'

@route('/member')


export default class MemberApi {
  constructor({ memberService }) {
    this.memberService = memberService
  }
  @route('/login')
  @POST()
  @before(bodyParser.json())
  async login (req, res) {
    try {
      const { code } = req?.body || {}
      // if (!code) return res.fail(null, 'code is required')
      const { data, success, error } = await this.memberService.login(req?.body)
      if (success) return res.success(data)
      return res.fail(null, error)
    } catch (error) {
      return res.fail(null, error)
    }
  }
}