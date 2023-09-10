import { Icode } from '../app'

export interface ImemberApi {
  memberService: ImemberService
}

export interface Ilogin {
  data: object
  msg: string | null
  code?: Icode
}

export interface ImemberService {
  login(body: object): Ilogin
}
