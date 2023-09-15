import express from 'express'
import createError from 'http-errors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { Lifetime, asClass } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-express'
import container from './container'
import baseMiddle from './middleware/base'
import httpMiddle from './middleware/http'
import path from 'path'
import { authMiddleware } from './middleware/auth'
import initialize from './initialize'
import { prefixApi, port, controllerType } from './config'
import chalk from 'chalk'
import { nDiv, nMinus, nPlus, nTimes } from './math'
const app = express()
app.use(logger('dev'))
app.use(cookieParser())
app.use(
  bodyParser.json({
    limit: '50mb'
  })
)
app.use(bodyParser.urlencoded({ extended: true }))
app.use(scopePerRequest(container))
app.use(httpMiddle as any)
app.use(baseMiddle(app) as any)
app.use(authMiddleware as any)
app.use(express.static(path.join(__dirname, '../static')))
app.use(
  prefixApi,
  loadControllers(controllerType, {
    cwd: __dirname,
    lifetime: Lifetime.SINGLETON
  })
)
app.use(function (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  next(createError(404))
})
app.use(function (err: any, req: any, res: any) {
  try {
    console.log(chalk.yellow('>>error>>'), chalk.red(err))
    res.locals.message = err?.message
    res.locals.error = req?.app?.get('env') === 'development' ? err : {}
    res.status(err?.status || 500)
    res.fail(null, err?.message, err?.message, err?.status)
  } catch (error) {
    res.fail(null, error)
  }
})

export default async () => {
  await initialize()
  container.loadModules(
    [
      './services/*Service.ts',
      './services/*Service.js',
      './daos/*Dao.js',
      './daos/*Dao.ts',
      './httpServices/**/*Http.ts',
      './httpServices/**/*Http.js'
    ],
    {
      formatName: 'camelCase',
      register: asClass,
      cwd: path.resolve(__dirname)
    } as any
  )
  app.listen(port, '0.0.0.0', () => {
    console.log(chalk.blue('Listening at http://localhost:'), port)
  })
}
