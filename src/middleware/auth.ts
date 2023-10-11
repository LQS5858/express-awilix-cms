import jwt from 'jsonwebtoken'
import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { asValue } from 'awilix'
import { IexpressRequest, IexpressResponse } from '../types/app'
import { UN_AUTH_API_URI } from '../constant'

export function authMiddleware(
  req: IexpressRequest,
  res: IexpressResponse,
  next: NextFunction
) {
  req.container = req.container.createScope()

  if (
    UN_AUTH_API_URI?.indexOf(req?.path) !== -1 ||
    req.path?.startsWith('/static')
  ) {
    next()
    return
  }
  const token = req.headers.authorization
  if (token === 'null') {
    res.fail(null, '用户未登录', 401)
    return
  }
  const publicKey = fs.readFileSync(
    path.resolve(__dirname, '../../keys/jwt_pub.pem')
  )
  try {
    const decode: any = jwt.verify(token as string, publicKey)
    req.container.register({
      user: asValue(decode.data)
    })
  } catch (error) {
    return res.fail(null, '用户未登录', 401)
  }
  next()
}
