import bodyParser from 'body-parser'
import { route, POST, befor, before } from 'awilix-express'


@route('/demo')
export default class DemoApi {
    constructor({ demoService }) {
        this.demoService = demoService
    }
    @route('/test')
    @POST()
    @before(bodyParser.json())
    async findPage (req, res) {
        const { data, success, error } = await this.demoService.findPage(req?.body)
        if (success) {
            return res.success(data)
        }
        return res.fail(null, error)
    }
    //定义接口。。。
}