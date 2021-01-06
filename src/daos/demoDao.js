import baseDao from './base'


export default class DemoDao extends baseDao {
    modelName = 'demo'

    async findPage (params) {
        return [null, 'demo']
    }
}