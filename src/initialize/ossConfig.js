import oss from 'ali-oss'



export async function initOssConfig () {
    const ossConfig = { id, secret, bucketName, endpoint }
    return new oss({
        accessKeyId: ossConfig?.id,
        accessKeySecret: ossConfig?.secret,
        bucket: ossConfig?.bucketName,
        endpoint: ossConfig?.endpoint
    })
}