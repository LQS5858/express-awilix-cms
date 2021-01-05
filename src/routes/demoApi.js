import bodyParser from 'body-parser'
import { route, POST, befor, before } from 'awilix-express'


@route('/demo')
export default class DemoApi {
    constructor() {

    }
    @route('/test')
    @POST()
    @before(bodyParser.json())
    async findPage (req, res) {
        res.success('成功')
    }
}