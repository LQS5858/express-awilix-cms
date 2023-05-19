/**
 *
 * @param {*} options {prefix:接口前缀,n:随机字符长度}
 * @returns
 */
export function random(options = {}) {
  const { prefix, n } = options || {}
  if (!n) return
  let str = '0123456789abcdefghijklmopqrstuvwxyz'
  let result = ''
  for (let i = 0; i < n; i++) {
    result += str?.charAt(Math.round(Math.random() * str?.length))
  }
  return `${prefix}${result}`
}
