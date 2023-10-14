const grpc = require('@grpc/grpc-js')

const services = require('./rpctest/user_grpc_pb')
const messages = require('./rpctest/user_pb')

const userServiceImpl = {
  login: (call, callback) => {
    const { request } = call

    // 使用 request 里的方法获取请求的参数
    const username = request.getUsername()
    const password = request.getPassword()

    // 使用 message 设置响应结果
    const response = new messages.LoginResponse()
    response.setAccessToken(`username = ${username}; password = ${password}`)
    response.setExpires(7200)

    callback(null, response)
  }
}

function main() {
  const server = new grpc.Server()

  // 使用 services.UserService 添加服务
  server.addService(services.UserService, userServiceImpl)
  server.bindAsync(
    '0.0.0.0:8081',
    grpc.ServerCredentials.createInsecure(),
    () => {
      server.start()
      console.log('grpc server started')
    }
  )
}

main()
