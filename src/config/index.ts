export const prefixApi = '/v1'

export const port: number = 9999

// redis缓存过期时间
export const redisOvertime = 24 * 60 * 60

export const controllerType: string =
  process.env.NODE_ENV !== 'development' ? 'routes/*Api.js' : 'routes/*Api.ts'