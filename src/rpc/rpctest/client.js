// client.js

const grpc = require('@grpc/grpc-js')

const services = require('./rpctest/user_grpc_pb')
const messages = require('./rpctest/user_pb')

// 使用 services 初始化 Client
const client = new services.UserClient(
  'localhost:8081',
  grpc.credentials.createInsecure()
)

// 发起 login 请求
function login() {
  return new Promise((resolve, reject) => {
    // 使用 message 初始化参数
    const request = new messages.LoginRequest()
    request.setUsername('zhang')
    request.setPassword('123456')

    client.login(request, function (err, response) {
      if (err) {
        reject(err)
      } else {
        resolve(response.toObject())
      }
    })
  })
}

async function main() {
  const res = await login()
  console.log(res)
}

main()
