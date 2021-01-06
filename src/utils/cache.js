import { redisOvertime } from "../config";

const getDeepKey = keyValue => {
    let key = ''
    if (Object.prototype.toString.call(keyValue) === '[object Object]') {
        Object.keys(keyValue).forEach(paramsKey => {
            let miniKey = ''
            const minKeyValue = getDeepKey(keyValue[paramsKey])
            miniKey = '_' + paramsKey + '_' + minKeyValue
            key = key + miniKey
        })
        Object.getOwnPropertySymbols(keyValue).forEach(symbolKey => {
            let miniKey = getDeepKey(keyValue[symbolKey])
            const desc = symbolKey.description ? symbolKey.description + '_' : ''
            key = key + '_' + desc + miniKey
        })
    } else if (Object.prototype.toString.call(keyValue) === '[object Array]') {
        // const minKeyValue = getDeepKey(keyValue[paramsKey]);
        keyValue.forEach(paramsKey => {
            const minKeyValue = getDeepKey(paramsKey)
            let miniKey = ''
            if (minKeyValue) {
                miniKey = '_' + minKeyValue
            }
            key = key + miniKey
        })
    } else {
        key = keyValue
    }
    return key
}

export const getCacheKey = (tableName, type, params) => {
    let key = `${global.db}_${tableName}_${type}`
    Object.keys(params).forEach(item => {
        const subKey = getDeepKey(params?.[item])
        key = key + '_' + item + '_' + subKey
    })
    return key
}
export const set = (data, tableName, type, params = {}) => {
    const cacheKey = getCacheKey(tableName, type, params)
    global.redis.set(cacheKey, JSON.stringify(data), 'EX', redisOvertime)
}

export const get = (tableName, type, params = {}) => {
    const cacheKey = getCacheKey(tableName, type, params)
    return global.redis.get(cacheKey)
}

export const remove = (tableName, type, params = {}) => {
    const cacheKey = getCacheKey(tableName, type, params)
    global.redis.del(cacheKey)
}


