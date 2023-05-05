import express from 'express'
import createError from 'http-errors'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import { Lifetime, asClass } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-express'
import container from './container'
import baseMiddle from './middleware/base'
import path from 'path'
import { authMiddleware } from './middleware/auth'
import initialize from './initialize'
import { prefixApi, port } from './config/index'
import chalk from 'chalk'
const app = express()
app.use(logger('dev'))
app.use(cookieParser())
app.use(bodyParser.json({
    limit: '50mb'
}))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(scopePerRequest(container))
app.use(baseMiddle(app))
app.use(authMiddleware)
app.use(express.static(path.join(__dirname, '../static')))

app.use(prefixApi, loadControllers('routes/*Api.js', {
    cwd: __dirname,
    lifetime: Lifetime.SINGLETON
}))

app.use(function (req, res, next) {
    next(createError(404))
})
app.use(function (err, req, res, next) {
    console.log(chalk.yellow('>>error>>'), chalk.red(err));
    res.locals.message = err?.message
    res.locals.error = req?.app?.get('env') === 'development' ? err : {}
    res.status(err?.status || 500)
    res.send(err)
})

export default async () => {
    await initialize()
    container.loadModules(['./services/*Service.js', './daos/*Dao.js'], {
        formatName: 'camelCase',
        register: asClass,
        cwd: path.resolve(__dirname)
    })
    app.listen(port, '0.0.0.0', err => {
        if (err) {
            console.log(chalk.red('>>>启动服务失败'), err);
        }
        console.log(chalk.blue('Listening at http://localhost:'), port);
    })
}
