// import jwt from "jsonwebtoken";
import fs from 'fs'
import path from 'path'
import { Request, Response, NextFunction } from 'express'
import { asValue } from 'awilix'
import { IexpressRequest } from '../types/app'

export function authMiddleware(
  req: IexpressRequest,
  res: Response,
  next: NextFunction
) {
  req.container = req.container.createScope()
  if (req?.path?.indexOf('static') !== -1) {
    next()
    return
  }
  // const token = req.headers.authorization
  // if (token === 'null') {
  //      res.fail(null, '用户未登录', '失败', 11)
  //      return
  // }
  // const publicKey = fs.readFileSync(path.resolve(__dirname, '../../keys/jwt_pub.pem'))
  // try {
  //      const decode = jwt.verify(token, publicKey)
  //      req.container.register({
  //           user: asValue(decode.data)
  //      })
  // } catch (error) {
  //      return res.fail(null, '用户未登录', '失败', 11)
  // }
  next()
}
