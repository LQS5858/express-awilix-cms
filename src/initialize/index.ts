import loadDbConfig from './dbConfig'

import { initSequelize } from './sequelize'
import { initModel } from '../models'
import { asValue } from 'awilix'

import container from '../container'
import { Idbconfig } from './types/dbConfig'
import { initRpc } from '../rpc'

export default async function initialize() {
  const config: Idbconfig = (await loadDbConfig()) as Idbconfig
  const { mysql: mysqlConfig, redis: redisConfig } = config || {}
  ;(global as any).db = mysqlConfig.database
  const sequelize = initSequelize(mysqlConfig)
  initModel(sequelize)
  initRpc()
  container.register({
    globalConfig: asValue(config),
    sequelize: asValue(sequelize)
  })
}
