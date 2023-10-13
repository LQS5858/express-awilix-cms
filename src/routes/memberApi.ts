import bodyParser from 'body-parser'

import { route, POST, before, GET } from 'awilix-express'
import { ImemberApi, ImemberService } from '../types/memberApi'
import { IexpressRequest, IexpressResponse } from '../types/app'

@route('/member')
export default class MemberApi {
  memberService: ImemberService
  constructor({ memberService }: ImemberApi) {
    this.memberService = memberService
  }
  @route('/login')
  @POST()
  @before(bodyParser.json())
  async login(req: IexpressRequest, res: IexpressResponse) {
    try {
      const { data, msg, code } = await this.memberService.login(req?.body)
      if (code === 200) return res.success(data)
      return res.fail(null, msg, code)
    } catch (error: any) {
      return res.fail(null, error, 500)
    }
  }
  @route('/event')
  @GET()
  async eventData(req: IexpressRequest, res: IexpressResponse) {
    this.memberService.event(res)
  }
}
