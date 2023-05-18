import bodyParser from "body-parser";

import { route, POST, before } from "awilix-express";
import { ImemberApi } from "../types/memberApi";
import { IexpressRequest, IexpressResponse } from "../types/app";

@route("/member")
export default class MemberApi {
  memberService: string;
  constructor({ memberService }: ImemberApi) {
    this.memberService = memberService;
  }
  @route("/login")
  @POST()
  @before(bodyParser.json())
  async login(req: IexpressRequest, res: IexpressResponse) {
    try {
      const { code } = req?.body || {};
      // if (!code) return res.fail(null, 'code is required')
      const { data, success, error } = await this.memberService.login(
        req?.body
      );
      if (success) return res.success(data);
      return res.fail(null, error);
    } catch (error) {
      return res.fail(null, error);
    }
  }
}
