// GENERATED CODE -- DO NOT EDIT!

// Original file comments:
// user.proto
//
'use strict'
var grpc = require('@grpc/grpc-js')
var rpctest_user_pb = require('./user_pb.js')

function serialize_user_LoginRequest(arg) {
  if (!(arg instanceof rpctest_user_pb.LoginRequest)) {
    throw new Error('Expected argument of type user.LoginRequest')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_user_LoginRequest(buffer_arg) {
  return rpctest_user_pb.LoginRequest.deserializeBinary(
    new Uint8Array(buffer_arg)
  )
}

function serialize_user_LoginResponse(arg) {
  if (!(arg instanceof rpctest_user_pb.LoginResponse)) {
    throw new Error('Expected argument of type user.LoginResponse')
  }
  return Buffer.from(arg.serializeBinary())
}

function deserialize_user_LoginResponse(buffer_arg) {
  return rpctest_user_pb.LoginResponse.deserializeBinary(
    new Uint8Array(buffer_arg)
  )
}

// 用户相关接口
var UserService = (exports.UserService = {
  // 登录函数
  login: {
    path: '/user.User/login',
    requestStream: false,
    responseStream: false,
    requestType: rpctest_user_pb.LoginRequest,
    responseType: rpctest_user_pb.LoginResponse,
    requestSerialize: serialize_user_LoginRequest,
    requestDeserialize: deserialize_user_LoginRequest,
    responseSerialize: serialize_user_LoginResponse,
    responseDeserialize: deserialize_user_LoginResponse
  }
})

exports.UserClient = grpc.makeGenericClientConstructor(UserService)
