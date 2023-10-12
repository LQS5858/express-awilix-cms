import grpc from 'grpc'
import path from 'path'

const PROTO_PATH = path.join(__dirname, './my.proto') //定义.proto文件的路径，我的.proto文件在根目录下，所以写成这样
const assetProto: any = grpc.load(PROTO_PATH).myservices
//前面三步与服务端一样

const client = new assetProto.assetService(
  '127.0.0.1:17042',
  grpc.credentials.createInsecure()
)
//这里直接创建一个客户端，端口可以修改

client.getAsset({}, (err: any, res: any) => {
  console.log('grpc->', res.message)
})
//客户端调用声明在proto文件中的getAsset方法，因为proto文件中声明的传入assetRequest的定义是空白，也就是说不需要传入参数，所以getAsset()的第一个参数是{}，getAsset()的第二个参数是个回调函数，这里没有对发生错误的时候进行处理，只是当未发生错误时打印'grpc->'加上服务端的访问次数
