import express from 'express'

type Icode = 10000 | 401 | 500 | 400 | number

interface IexpressResponse extends express.Response {
  fail: (
    data: Record<string, any> | any[] | null,
    message?: string | null,
    code?: Icode
  ) => void
  success: (
    data: Record<string, any> | any[] | null,
    message?: string | null,
    code?: Icode
  ) => void
  unLogin: () => void
}

interface IexpressRequest extends express.Request {
  container: any
}
