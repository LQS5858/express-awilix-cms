export interface ImemberApi {
  memberService: ImemberService
}

export interface Ilogin {
  data: object
  success: boolean
  error: string | object
}

export interface ImemberService {
  login(body: object): Ilogin
}
