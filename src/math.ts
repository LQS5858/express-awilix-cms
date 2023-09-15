import Decimal from 'decimal.js'

/**
 * @description 加法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */
export function nPlus(x1: number, x2: number): number {
  if (typeof x1 !== 'number' || typeof x2 !== 'number') {
    new Error('arguments is not number')
    return 0
  }
  try {
    let temp1 = new Decimal(x1)
    let temp2 = new Decimal(x2)
    return temp1.plus(temp2).toNumber()
  } catch (error) {
    return 0
  }
}

/**
 * @description 减法
 * @param {} x1
 * @param {*} x2
 * @returns
 */

export function nMinus(x1: number, x2: number): number {
  if (typeof +x1 !== 'number' || typeof +x2 !== 'number') {
    new Error('arguments is not number')
    return 0
  }
  try {
    let temp1 = new Decimal(+x1)
    let temp2 = new Decimal(+x2)
    return temp1.minus(temp2).toNumber()
  } catch (error) {
    return 0
  }
}

/**
 * @description 乘法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */
export function nTimes(x1: number, x2: number): number {
  if (typeof +x1 !== 'number' || typeof +x2 !== 'number') {
    new Error('arguments is not number')
    return 0
  }
  try {
    let temp1 = new Decimal(x1)
    let temp2 = new Decimal(x2)
    return temp1.times(temp2).toNumber()
  } catch (error) {
    return 0
  }
}

/**
 * @description 除法
 * @param {*} x1
 * @param {*} x2
 * @returns
 */

export function nDiv(x1: number, x2: number): number {
  if (typeof x1 !== 'number' || typeof x2 !== 'number') {
    new Error('arguments is not number')
    return 0
  }
  try {
    let temp1 = new Decimal(x1)
    let temp2 = new Decimal(x2)
    return temp1.div(temp2).toNumber()
  } catch (error) {
    return 0
  }
}

/**
 * @description  -数字千分位不补0
 * @param {*} x
 * @param {*} precision -保留小数位数
 * @param {*} round -为1-向上四舍五入,为0向下舍入
 * @returns
 */
export const toDecimal = (
  x: number,
  precision: number = 2,
  round: number = 0
): string => {
  if (typeof x !== 'number') {
    new Error('arguement is not number')
    return '0'
  }
  let precision_ = Math.pow(10, precision)
  let mulNum = nTimes(+x, +precision_)
  let divNum = +round ? Math.round(mulNum) : Math.floor(mulNum)
  let f = +precision_ ? nDiv(+divNum, +precision_) : 0
  var num = f.toString()
  var res = num.toString().replace(/\d+/, function (n) {
    // 先提取整数部分
    return n.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
      return $1 + ','
    })
  })
  return res
}

/**
 * @description 保留小数数字不补0
 * @param {*} num
 * @param {*} precision -保留小数位数
 * @param {*} round -为1-向上四舍五入,为0向下舍入
 * @returns
 */

export const toNumTrunc = (
  num: number,
  precision: number = 2,
  round: number = 0
): string => {
  if (typeof num !== 'number') {
    new Error('arguement is not number')
    return '0'
  }
  let precision_ = Math.pow(10, precision)
  let temp = nTimes(num, precision_)
  var divtemp = +round ? Math.round(temp) : Math.floor(temp)
  let f = precision_ ? nDiv(divtemp, precision_) : 0
  const result: string = f.toString()
  return result
}

/**
 * 数字保留小数位数补0且千分位格式化
 * @param value
 * @param precision
 * @returns
 */
export const numToFixed = (value: number, precision: number = 2): string => {
  try {
    if (!value) return '0'
    const num: string = value?.toFixed(precision)
    const res: string = num?.toString()?.replace(/\d+/, function (n) {
      // 先提取整数部分
      return n?.replace(/(\d)(?=(\d{3})+$)/g, function ($1) {
        return $1 + ','
      })
    })
    return res
  } catch (error) {
    return '0'
  }
}
