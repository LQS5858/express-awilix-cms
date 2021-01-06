import db from '../models'
import { promiseCatch } from '../utils'
import logger from '../utils/logger'
import _ from 'lodash'
import { get, set } from '../utils/cache'
import { remove } from '../utils/cache'


export default class BaseDao {
    constructor(modules) {
        this.request = modules ? modules?.request : {}
        // this.sequelize = db.sequelize
    }

    // 增加
    async insert (params) {
        // 参数是一个对象
        const Model = db?.[this.modelName]
        const [err, data] = await promiseCatch(
            Model.sync().then(async () => {
                return await Model.create(params)
            })
        )
        if (err) {
            logger.err(err)
        }
    }
    //删除
    async delete (params) {
        // 参数是一个对象
        const Model = db?.[this.modelName]
        const [err, data] = promiseCatch(
            Model.sync().then(async () => {
                return await Mode.destroy({
                    ...params
                })
            })
        )
        if (!err) {
            const { id } = this.request?.body || {}
            remove(this.modelName, 'findOne', { id })
        }
        return [err, data]
    }
    // 改
    async update (params, query) {
        const Model = db?.[this.modelName]
        const [err, data] = await promiseCatch(
            Model.sync().then(async () => {
                return await Model.update(params, {
                    ...query
                })
            })
        )
        if (!err) {
            const { id } = this.request?.body || {}
            remove(this.modelName, 'findOne', { id })
        }
        return [err, data]
    }
    // 查找某个元素
    async findOne (params, nocache = false) {
        const Model = db?.[this.modelName]
        const { id } = this.request?.body || {}
        const cacheData = await get(this.modelName, 'findOne', this.request?.body)
        if (!_.isEmpty(cacheData) && !nocache) return [null, JSON.parse(cacheData)]
        const [err, data] = await promiseCatch(
            Model.findOne(params).then(models => {
                return models || null
            })
        )
        if (!err) {
            set(data, this.modelName, 'findOne', { id })
        }
        return [err, data]
    }
    //查找所有数据
    async findAll (params, nocache = false) {
        const Model = db?.[this.modelName]
        const cacheData = await get(this.modelName, 'findAll', params)
        if (!_.isEmpty(cacheData) && !nocache) return [null, JSON.parse(cacheData)]
        const [err, data] = await promiseCatch(Model.findAll(params))
        if (!err) {
            set(data, this.modelName, 'findAll', params)
        }
        return [err, data]
    }
    // 分页查数据
    async findAndCountAll (params, nocache = false) {
        const Model = db?.[this.modelName]
        const cacheData = await get(this.modelName, 'findAndCountAll', params)
        if (!_.isEmpty(cacheData) && !nocache) return [null, JSON.parse(cacheData)]
        const [err, data] = await promiseCatch(Model.findAndCountAll(params))
        if (!err) {
            set(data, this.modelName, 'findAndCountAll', params)
        }
        return [err, data]
    }
}