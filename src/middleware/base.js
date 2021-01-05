import { asValue } from 'awilix'
import { } from ''



export default (app) => {
    return (req, res, next) => {
        res.success = (data, error = null, message = '成功', status = 0) => {
            res.json({
                error,
                message,
                data,
                status,
                success: true,
                timestamp: Date.now(),
                type: 'SUCCESS'
            })
        }
        res.fail = (data, error = null, message = '失败', status = 0) => {
            res.json({
                error,
                message,
                data,
                status,
                success: false,
                timestamp: Date.now(),
                type: 'FAIL'
            })
        }
        const userAgent = ''
        res.setHeader('access-control-allow-credentials', true)
        res.setHeader('access-control-allow-headers', 'content-type')
        res.setHeader('access-control-methods', 'POST,GET')
        res.setHeader('access-control-allow-origin', '*')
        res.setHeader('access-control-expose-headers', 'X-forwared-port,X-forwarded-host')
        res.setHeader('access-control-max-age', 2592000)
        req.app = app
        req.container = req.container.createScope()
        req.container.register({
            request: asValue(req),
            response: asValue(res),
            userAgent: asValue(userAgent)
        })
        next()
    }
}