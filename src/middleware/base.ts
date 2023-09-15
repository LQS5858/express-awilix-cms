import { asValue } from 'awilix'
import { Request, Response, NextFunction } from 'express'
import { Application } from 'express-serve-static-core'
import { Icode, IexpressRequest, IexpressResponse } from '../types/app'

export default (app: Application<Record<string, any>>) => {
  return (req: IexpressRequest, res: IexpressResponse, next: NextFunction) => {
    res.success = (data, msg = null, code: Icode = 200) => {
      res.json({
        data,
        code,
        msg,
        timestamp: new Date().toISOString()
      })
    }
    res.fail = (data, msg = null, code: Icode = 400) => {
      res.json({
        msg,
        data,
        code,
        timestamp: new Date().toISOString()
      })
    }
    res.unLogin = () => {
      res.json({
        msg: '登录失效',
        data: null,
        code: 401,
        timestamp: new Date().toISOString()
      })
    }
    const userAgent = req.headers?.['user-agent']
    const device = req.headers?.['x-request-device']
    res.setHeader('access-control-allow-credentials', '*')
    res.setHeader('access-control-allow-headers', 'content-type')
    res.setHeader('access-control-allow-headers', 'x-request-device')
    res.setHeader('access-control-allow-headers', 'x-request-language')
    res.setHeader('access-control-methods', 'POST,GET')
    res.setHeader('access-control-allow-origin', '*')
    res.setHeader(
      'access-control-expose-headers',
      'X-forwared-port,X-forwarded-host'
    )
    res.setHeader('access-control-max-age', 2592000)
    req.app = app
    req.container = req.container.createScope()
    req.container.register({
      request: asValue(req),
      response: asValue(res),
      userAgent: asValue(userAgent),
      device: asValue(device)
    })
    next()
  }
}
