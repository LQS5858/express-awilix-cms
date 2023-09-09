// 解析数据库文件

const properties = require('properties')

import path from 'path'

const configProperties: string = process.env.CONFIG_PROPERTIES as string

const configPath = path.resolve(process.cwd(), configProperties)

export default function load() {
  return new Promise((resolve, reject) => {
    properties.parse(
      configPath,
      { path: true, sections: true },
      (err: any, obj: unknown) => {
        if (err) {
          reject(err)
          return
        }
        resolve(obj)
      }
    )
  })
}
