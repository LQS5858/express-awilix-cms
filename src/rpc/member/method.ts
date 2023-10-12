import grpc from 'grpc' //引入grpc
import path from 'path'

function rpcMethod() {
  let sum: number = 0
  const getAsset = (call: any, callback: (e: null, data: any) => void) => {
    //定义一个getAsset方法
    callback(null, { message: (sum++).toString() })
  }
  return {
    getAsset
  }
}

export default rpcMethod()
