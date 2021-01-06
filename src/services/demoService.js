
import baseService from './base'
export default class DemoService extends baseService {
    constructor({ demoDao }) {
        super()
        this.demoDao = demoDao
    }
    async findPage (params) {
        const [err, data] = await this.demoDao.findPage(params)
        if (!err) return this.success(null, data)
        return this.success(err)
    }
}