export const prefixApi = '/v2'

export const port: number = 8000

// redis缓存过期时间
export const redisOvertime = 24 * 60 * 60

export const controllerType: string =
  process.env.NODE_ENV !== 'development' ? 'routes/*Api.js' : 'routes/*Api.ts'

export const EventSourceHeaders = {
  'Content-Type': 'text/event-stream',
  'Cache-Control': 'no-cache'
}
