import loadDbConfig from './dbConfig'

import { initSequelize } from './sequelize'
import { initModel } from '../models'
import { asValue } from 'awilix'

import container from '../container'


export default async function initialize () {
    const config = await loadDbConfig()
    const { mysql: mysqlConfig, redis: redisConfig } = config || {}
    global.db = mysqlConfig.database
    const sequelize = initSequelize(mysqlConfig)
    initModel(sequelize)
    container.register({
        globalConfig: asValue(config),
        sequelize: asValue(sequelize)
    })
}
