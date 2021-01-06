import Redis from "ioredis";
import loadDbConfig from './dbConfig'

import { initSequelize } from './sequelize'
import { initModel } from '../models'
import { asValue } from 'awilix'

import container from '../container'
import { initOssConfig } from './ossConfig'


export default async function initialize () {
    const config = await loadDbConfig()
    const { mysql: mysqlConfig, redis: redisConfig } = config || {}
    const redis = new Redis(redisConfig)
    global.redis = redis
    global.db = mysql.database
    const sequelize = initSequelize(mysqlConfig)
    initModel(sequelize)
    const ossClient = await initOssConfig()
    container.register({
        ossClient: asValue(ossClient),
        globalConfig: asValue(config),
        sequelize: asValue(sequelize)
    })
}
