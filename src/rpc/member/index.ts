import grpc from 'grpc' //引入grpc
import path from 'path'
import Rpcmethod from './method'

export async function initMemberRPc() {
  const PROTO_PATH = path.join(__dirname, './index.proto') //定义.proto文件的路径，我的.proto文件在根目录下，所以写成这样

  const myProto: any = grpc.load(PROTO_PATH).myservices

  const server = new grpc.Server() //创建一个grpc的服务

  server.addProtoService(myProto.assetService.service, {
    ...Rpcmethod
  })
  //将方法加入到grpc的服务中                       //前面一个getAsset指的是上面定义的getAsset方法，后面一个getAsset指的是my.proto中注册的rpc方法

  server.bind('127.0.0.1:17042', grpc.ServerCredentials.createInsecure())
  //讲服务绑定端口，这里绑定的是本机的17041端口，这个端口可以自行修改
  server.start()
  console.log('[member Rpc done]')
  //服务启动
}
