import { Icode } from '../types/app'

export default class baseService {
  success<T, E>(data: T, msg: E | null = null, code: Icode = 200) {
    return {
      code,
      msg,
      data
    }
  }
  fail<T, E>(data: T | null = null, msg: E, code: Icode = 400) {
    return {
      code,
      msg,
      data
    }
  }
}
